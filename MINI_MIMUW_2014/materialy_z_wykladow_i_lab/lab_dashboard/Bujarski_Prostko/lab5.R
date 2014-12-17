renew <- c(0.36,0.08,0.086,0.064,0.037)
CO2 <- c(814,178.5,86.19,20.26,307.9) #mln
prod <- c(526.6,365.7,56.71,12.9,153.4) #mld
cons <- c(582.5,323.3,52.36,7.948,155) #mld

kraj=as.factor(c('GER','UK',"ROM",'EST','PL'))
dane <- data.frame(prod,cons,CO2,renew,kraj)

library("ggplot2")
library("dplyr")
library(reshape2)
library(scales)

dane.melt <- melt(dane, "kraj")
dane2 <- dane.melt[1:10,]

wyk1 <- ggplot(dane2,aes(x=kraj,y=value,fill=variable))+
  geom_bar(stat='identity',position='dodge')+
  scale_fill_discrete(name="",labels=c('produkcja','zużycie'))+
  labs(y='mld kWh')+
  ggtitle("Produkcja vs zuzycie")+
  theme(axis.text.y = element_text(colour="grey20",size=16,face="plain"),
        axis.text.x = element_text(colour="grey20",size=16,face="plain"),
        axis.title.x = element_blank(),
        axis.title.y = element_text(size=18),
        plot.title=element_text(size=18))


wyk2 <- ggplot(dane, aes(x=kraj, y=100*renew, fill = kraj, label=paste0(100*renew, "%"))) +
  geom_bar(stat="identity") +
  geom_text(vjust=-0.5, fontface=2) +
  labs(title="% energii ze źródeł odnawialnych", x = NULL, y = NULL) +
  theme(
    axis.text.x = element_text(size=14),
    axis.title = element_text(size=16),
    plot.title = element_text(size=18),
    legend.position = "none")

wyk3 <- ggplot(dane, aes(x=kraj, y=CO2, fill = kraj, label=CO2)) +
  geom_bar(stat="identity") +
  geom_text(vjust=-0.5, fontface=2) +
  labs(title = "Zużycie CO2", y="mln Mt", x = NULL) +
  theme(
    axis.text.x = element_text(size=14),
    axis.title = element_text(size=16),
    plot.title = element_text(size=18),
    legend.position = "none")


library(gridExtra)
grid.newpage() 
print(wyk1, vp=viewport(x=0.5, y = 0.75, 
                      width=1, height=0.5))
print(wyk2, vp=viewport(x=0.25, y = 0.25, 
                        width=0.5, height=0.5))
print(wyk3, vp=viewport(x=0.75, y = 0.25, 
                        width=0.5, height=0.5))

