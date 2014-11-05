tak <- c(89, 70, 73, 71, 68)
nie <- c(6, 25, 17, 21, 21)
wiek <- factor(c("18-24", "25-34", "35-44", "45-54", "55-64"))
dane <- data.frame(tak, wiek, nmz = 100-tak-nie, nie)

library("ggplot2")
library("dplyr")
library(reshape2)
library(scales)

dane.melt <- melt(dane, "wiek")
names(dane.melt)[3] <- "frakcja"
dane.melt[,2] <- factor(dane.melt[,2], levels=c("nie", "nmz", "tak"))

frak=seq(0.25,0.75,by=0.25)
ggplot(dane.melt, aes(x=wiek, y=frakcja, fill=variable)) +
  geom_bar(stat='identity', position='fill', alpha=1) +
  geom_hline(aes(yintercept=frak),linetype=2,col='blue',size=0.1,alpha=0.4)+
  scale_fill_brewer(palette = "Spectral", name=" ") +
  coord_flip() + 
  ggtitle("Czy jesteś zadowolony ze swojej pracy?") +
  scale_y_continuous(labels = percent)+
  theme(
    plot.title = element_text( colour ="blue3", size =25),   
    axis.title = element_text(size = 21),
    axis.text.y = element_text(colour="grey20",size=16,face="plain"),
    axis.text.x = element_text(colour="grey20",size=16,face="plain"),
    panel.grid.major = element_blank(), 
    panel.grid.minor = element_blank(),
    panel.background=element_rect(fill='pink')
)


