setwd("/Users/admin/Documents/WizualizacjaDanych/plotly")
install.packages("devtools")  # so we can install from GitHub
devtools::install_github("ropensci/plotly")  # plotly is part of rOpenSci

library(plotly)
library(ggplot2)
library(dplyr)


# http://www.mortality.org/Public/ExplanatoryNotes.php#CompleteDataSeries

kobiety <- read.table("fltper_1x1.txt", skip=2, header=T) 
mezczyzni <- read.table("mltper_1x1.txt", skip=2, header=T) 

#dane z http://data.worldbank.org/indicator/SH.XPD.PUBL.ZS/countries/1W?display=default
#wydatki podstawowy mnoznik to 10^9 USD
wydatki <- c(7.61 , 9.21, 8.81, 10.2, 9.62, 9.46, 11.2, 12.6, 13.5, 15.7, 18.9, 21.2 ,26.9, 36.4, 31)
Gender  <- c( "Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD","Wydatki * 5 * 10^9 USD")
Year   <-  c(1995, 1996, 1997, 1998, 1999, 2000,  2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009)
wydatki= wydatki/5
sluzbaZdrowia <- data.frame(wydatki, Gender, Year)

names
names(sluzbaZdrowia.melt)[3] <- "value"
kobiety2 <- kobiety %>%
  filter(Age == 0) %>%
  mutate(Age = as.numeric(as.character(Age)),
         Gender = "F", Year=as.numeric(Year))
         
mezczyzni2 <- mezczyzni %>%
           filter(Age == 0) %>%
           mutate(Age = as.numeric(as.character(Age)),
                  Gender = "M",
                  Year=as.numeric(Year))
         
km2 <- rbind(kobiety2, mezczyzni2)
         
g1 <- ggplot(km2, aes(x=Year, y=qx, group=Gender, fill=Gender)) +
           geom_histogram(stat="identity", position = "dodge") +
           geom_line(data=sluzbaZdrowia,aes(x=Year, y=wydatki)) +
           annotate("text", x=2003, y=0.05, size=3, label="Wydatki w Polsce na służbe zdrowia")+
           scale_x_continuous(breaks=(seq(1958, 2050, 5))) +
           scale_fill_discrete(name = element_blank(),
                               labels=c("Dziewczynki",
                                        "Chłopcy")) +
           ylab("Prawdopodobieństwo zgonu w 1 roku życia") + xlab("Rok") + theme(axis.text.x = element_text(angle = 90, hjust = 1))
require(shiny)
require(rCharts)

load("mmG.rda")

km3 = km2
km3[4] = km3[4]*100

km3 
km4 <- km3 %>% mutate()
km4 <- km3[,c("Year", "Gender", "qx")]
names(sluzbaZdrowia)[1] <- "qx"
sluzbaZdrowia[1] = sluzbaZdrowia[1] * 100
names(sluzbaZdrowia)

bb = rbind(km4, sluzbaZdrowia)
bb

x1 <- merge(km3, sluzbaZdrowia, all=TRUE)
shinyServer(function(input, output, session) {
  
  output$dekompozycja <- renderChart({
    p1 <- nPlot(qx ~ Year, group = "Gender", data = bb, type = "lineWithFocusChart")
    
    p1$chart(stacked = TRUE)
    p1$addParams(dom = 'dekompozycja')
    p1
    p1$set(width=input$szerokosc)
    return(p1)
  })
  
})
