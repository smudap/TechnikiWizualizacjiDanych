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
    
    sset$time <- as.character(sset$time)
    
    summed <- aggregate(values ~ geo + time, sset, sum)
    summed$values <- summed$values/10000
    summedJoin <- as.data.frame(summed %>% inner_join(countryArea, by=c("geo" = "Country")))
    
    
    summedRatio <- data.frame(summedJoin$geo,summedJoin$time,100*as.numeric(summedJoin$values)/as.numeric(stri_replace_all(summedJoin$Area,'', regex=',')))
    names(summedRatio) <- c("Country","time", "areaRatio")
    
    
    ggplot(summedRatio, aes(x=time, y=areaRatio, group=Country, color=Country)) +
      geom_line(size=2) +  ylab("Ratio of total agricultural area to total country area [promiles]") 
    
  
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
    wybrane_pola <- c("Euro: Standard output (SO)", "ha: Utilised agricultural area")
    sset <- subset(labeled, geo %in% input$variable
                   & indic_ef %in% wybrane_pola
                   & agrarea %in% input$size
                   & legtype == "Total")
    
    sset$time <- as.character(sset$time)
    # Sumowanie wartości z grupowaniem po typie (euro/hektar) i kraju
    summed <- aggregate(values ~ indic_ef + geo, sset, sum)
    # Zamiana par rzędów z euro i hektarami na kolumny
    wide <- spread(summed, indic_ef, values)
    wide$avg <- wide[,2] / wide[,3]
    
    ggplot(wide, aes(x=geo, y=avg)) +
      labs(x = "Country", y = "Euro / ha: Average output / area") +
      geom_point(shape=1)
    
    
  })
  
})
