#
# This is the server logic of a Shiny web application. You can run the 
# application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
# 
#    http://shiny.rstudio.com/
#

library(shiny)
library(eurostat)
library(ggplot2)
library(countrycode)
library(data.table)
library(tidyr)
library(XML)
library(httr)
library(dplyr)
library(stringi)

wybrane_kraje <- c("Hungary","Bulgaria","Poland","Italy","Finland","Spain","Germany","France", "United Kingdom")
  
  
shinyServer(function(input, output) {
   
  output$distPlot <- renderPlot({
    
    # generate bins based on input$bins from ui.R
    
    countryArea <-readHTMLTable(rawToChar(GET("http://en.wikipedia.org/wiki/List_of_European_countries_by_area")$content),which=1)
    countryArea <- countryArea[,1:3]
    names(countryArea) <- c("Position", "Country", "Area")
    
    estat <- get_eurostat("ef_kvaareg")
    # Chcemy tylko kraje, nie regiony
    estat$geo <- substr(estat$geo, 1, 2)
    # Kody na kraje
    labeled <- label_eurostat(estat)
    labeled <- na.omit(labeled)
    labeled[labeled$geo %like% 'Germany',]$geo <- "Germany"
    
    #'%!in%' <- function(x,y)!('%in%'(x,y))
    sset <- subset(labeled, indic_ef == "ha: Utilised agricultural area"
                   &  geo  %in% input$variable
                   & legtype == "Total")
    
    sset$time <- substr(as.character(sset$time),1,4)
    
    summed <- aggregate(values ~ geo + time, sset, sum)
    summed$values <- summed$values/10000
    summedJoin <- as.data.frame(summed %>% inner_join(countryArea, by=c("geo" = "Country")))
    
    
    summedRatio <- data.frame(summedJoin$geo,summedJoin$time,100*as.numeric(summedJoin$values)/as.numeric(stri_replace_all(summedJoin$Area,'', regex=',')))
    names(summedRatio) <- c("Country","time", "areaRatio")
    
    
    ggplot(summedRatio, aes(x=time, y=areaRatio, group=Country, color=Country)) +
      geom_line(size=2) +  
      ylab("Total Agricultural area to Total Country Area [%]") + 
      theme(axis.title.x=element_blank()) +
      ylim(c(0,3))
  
  
  })
  output$distPlot2 <- renderPlot({
    
    # generate bins based on input$bins from ui.R
    
    estat <- get_eurostat("ef_kvaareg")
    # Chcemy tylko kraje, nie regiony
    estat$geo <- substr(estat$geo, 1, 2)
    # Kody na kraje
    labeled <- label_eurostat(estat)
    labeled <- na.omit(labeled)
    # Tylko wybrane kraje i pola
    labeled[labeled$geo %like% 'Germany',]$geo <- "Germany"
    wybrane_pola <- c("Euro: Standard output (SO)", "ha: Utilised agricultural area")
    
    '%!in%' <- function(x,y)!('%in%'(x,y))
    sset <- subset(labeled, geo %in% input$variable
                   & indic_ef %in% wybrane_pola
                   & agrarea != 'Zero ha'
                   & legtype == "Total")
    
    sset$time <- as.character(sset$time)
    # Sumowanie wartości z grupowaniem po typie (euro/hektar) i kraju
    summed <- aggregate(values ~ indic_ef + geo + agrarea, sset, sum)
    # Zamiana par rzędów z euro i hektarami na kolumny
    wide <- spread(summed, indic_ef, values)
    wide$avg <- wide[,4] / wide[,3]
    
      poziomy <- c("Less than 2 ha","From 2 to 4.9 ha","From 5 to 9.9 ha",
                   "From 10 to 19.9 ha","From 20 to 29.9 ha","From 30 to 49.9 ha",
                   "From 50 to 99.9 ha","100 ha or over","Total")
      wide$agrarea <- factor(wide$agrarea, levels =poziomy)

    ggplot(wide, aes(x=geo, y=avg, fill=agrarea)) +
      geom_bar(position="dodge",stat="identity") +
      labs(x = "Country", y = "Euro / ha: Average output / area")
    
    
  })
  
})
