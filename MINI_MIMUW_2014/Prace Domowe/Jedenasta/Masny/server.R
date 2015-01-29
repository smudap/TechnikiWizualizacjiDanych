
library(dplyr)
library(ggplot2)
library(Hmisc)
library(gridExtra)
library(ggthemes)
library(shiny)
library(rCharts)

con <- url("http://biecek.pl/MIMUW/PISAeurope.rda")

load(con)

############################################################################
############################################################################
########################################### wykres 5 #######################

#### przygotowanie danych ####
#head(pisa)
#02 moze byc
dane <- pisa[,c("CNT","ST29Q07","PV1MATH","W_FSTUWT")]
#head(dane)

dane1 <- dane[!is.na(dane[,2]),]
#head(dane1)

dane2 <- dane1 %>%
  group_by(CNT,ST29Q07) %>%
  summarise(math = weighted.mean(PV1MATH, W_FSTUWT, na.rm = TRUE),
            liczba=n()) 
#head(dane2)

dane3 <- dane1 %>%
  group_by(CNT) %>%
  summarise(math = weighted.mean(PV1MATH, W_FSTUWT, na.rm = TRUE),
            calosc=n()) 
#head(dane3)

dane4 <- data.frame(matrix(0,nrow(dane2),4))
names(dane4)<-c("CNT","ODP","math","liczba")
for (i in 1:nrow(dane2)){
  kraj <- levels(dane2$CNT)[dane2$CNT[i]]
  dane4[i,3]<- dane3[dane3$CNT==kraj,2]
  dane4[i,4] <- dane2$liczba[i]/dane3[dane3$CNT==kraj,3]
}

names(dane2)[2] <- "ODP"
dane4$CNT <- dane2$CNT
dane4$ODP <- dane2$ODP

dane4$reorder <- rep(c(1,2,3,4),10)
dane4$CNT <- reorder(dane4$CNT,-dane4$math)
dane4$ODP <- reorder(dane4$ODP,-dane4$reorder)
dane4$reorder <- NULL
#as.factor(dane4$ODP)

# hihi<-as.data.frame(cbind(CNT=dane4$CNT,ODP=dane4$ODP))
# hihi$math<-dane4$math
# hihi$liczba<-dane4$liczba
# 
# 
# w6 <-  ggplot(dane4, aes(x=ODP, y=liczba, group=CNT)) + 
#   ggtitle("Mathematics is an important subject for me because I need it
#           for what I want to study later on") +
#   theme(
#     plot.title=element_text(face="bold",size=19),
#     axis.title=element_blank(),
#     axis.text.x  = element_text(angle=32, hjust=0.8,size=16),
#     axis.text.y  = element_text(size=15),
#     axis.ticks = element_blank()
#   ) + 
#   theme_solarized(light=FALSE) +
#  geom_line(aes(colour=CNT,size=math))

options(RCHART_WIDTH = 500)

shinyServer(function(input, output) {
  
  output$chart <- renderChart2({
      selected <- input$cnt
      country <- subset(dane4, CNT %in% selected)
      h1 <- hPlot(
        x = "ODP", 
        y = "liczba",
        group = "CNT", 
        data = country,
        type = "line")
      h1$yAxis(title = list(enabled = TRUE, text = 'Percentage of answers'))
      h1
      return(h1)
    })
})