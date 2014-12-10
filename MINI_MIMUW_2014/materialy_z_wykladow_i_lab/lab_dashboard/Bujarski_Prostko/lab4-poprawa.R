

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

dane2$kraj <- factor(dane2$kraj,levels=c("GER","UK","PL","ROM","EST"))
dane$kraj <- factor(dane$kraj,levels=c("GER","UK","PL","ROM","EST"))






wyk1 <- ggplot(dane2,aes(x=kraj,y=value,fill=variable))+
  geom_bar(stat='identity',position='dodge',colour="black")+
  scale_fill_discrete(name="",labels=c('produkcja','zu¿ycie'))+
  labs(y='mld kWh')+
  ggtitle("Produkcja vs zu¿ycie energii")+
  theme(axis.text.y = element_text(colour="grey20",size=16,face="plain"),
        axis.text.x = element_text(colour="grey20",size=16,face="plain"),
        axis.title.x = element_blank(),
        axis.title.y = element_text(size=16),
        plot.title=element_text(size=18))+
  guides(fill = guide_legend( title =NULL))+
  scale_fill_manual(values=c("blue4","dodgerblue1"),labels=c('produkcja','zu¿ycie'))


  



wyk2 <- ggplot(dane, aes(x=kraj, y=100*renew, fill = kraj, label=paste0(100*renew, "%"))) +
  geom_bar(stat="identity",colour="black") +
  geom_text(vjust=-0.5, fontface=2) +
  labs(title="% energii ze Ÿróde³ odnawialnych", x = NULL, y =  "% energii") +
  theme(
    axis.text.x = element_text(size=14,colour="grey20"),
    axis.text.y = element_text(colour="grey20"),
    axis.title = element_text(size=16),
    plot.title = element_text(size=18),
    legend.position = "none")+
  coord_cartesian(ylim=c(0,40))

wyk3 <- ggplot(dane, aes(x=kraj, y=CO2, fill = kraj, label=CO2)) +
  geom_bar(stat="identity",colour="black") +
  geom_text(vjust=-0.5, fontface=2) +
  labs(title = "Zu¿ycie CO2", y="mln Mt", x = NULL) +
  theme(
    axis.text.x = element_text(size=14,colour="grey20"),
    axis.text.y = element_text(colour="grey20"),
    axis.title = element_text(size=16),
    plot.title = element_text(size=18),
    legend.position = "none")+
  coord_cartesian(ylim=c(0,900))


#library(gridExtra)

grid.newpage()
print(wyk1, vp=viewport(x=0.5, y = 0.75,
                        width=1, height=0.5))
print(wyk2, vp=viewport(x=0.25, y = 0.25,
                        width=0.5, height=0.50))
print(wyk3, vp=viewport(x=0.75, y = 0.25,
                        width=0.5, height=0.50))






