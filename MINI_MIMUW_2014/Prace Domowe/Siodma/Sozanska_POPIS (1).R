load("C:\\Users\\Basia\\Desktop\\Dropbox\\STUDIA\\TWD\\dane.rda")
library(ggplot2)

### I wykres ###

PIS <- dane[dane$Partia == 'PiS', ]
PO <- dane[dane$Partia == 'PO', ]

ktorzy <- dane[dane[, 2] %in% c("PO", "PiS"), ]

ktorzy <- ktorzy[ order(ktorzy[, 6], decreasing = TRUE),   c(2,6)]
ktorzy

to <- as.data.frame(t(table(ktorzy[ktorzy[, 2]>6400, 1])))[,2:3]
names(to) <- c("Partia", "Ilu_wygodnickich")

m1 <- ggplot(to[2:3,], aes(x=Partia, y=Ilu_wygodnickich) ) +
  geom_bar(stat="identity", fill = rev(c("#FF7F00" , "#00008B")), width=.4) +
  ggtitle("Ilu posłów z PO i PiS posiada umiejętność bilokacji")+
  theme( panel.background=element_rect(fill='white'),  
         axis.text.x = element_text(family = "mono", size = 17),
         axis.text.y = element_text(family = "mono", size = 20, face="bold"),
         axis.title.x= element_text(family = "mono", size = 23),
         axis.title.y= element_text(family = "mono", size = 23),
         title =element_text(family = "mono", size = 25))+
  coord_flip()+
  labs(x="Partia", y="Liczba przedstawicieli władzy") + 
  scale_y_continuous(breaks=seq(0,10,2))

### II wykres ###

popis <- dane[dane$Partia%in%c("PO","PiS"),]
names(popis)
vec=c("Posel","Partia","Miejsce","Data","Glosowanie","Koszt")
names(popis)<-vec

library(dplyr)

popis6 <- popis[popis$Koszt>=6300&popis$Koszt<14000,]

table(popis6$Partia)

m2 <- ggplot(popis6, aes(y=Koszt, x=Partia)) +
  theme( panel.background=element_rect(fill='white'),  
         axis.text.x = element_text(family = "mono", size = 17),
         axis.text.y = element_text(family = "mono", size = 20, face="bold"),
         axis.title.x= element_text(family = "mono", size = 23),
         axis.title.y= element_text(family = "mono", size = 23),
         title =element_text(family = "mono", size = 22))+
  ggtitle("Rozkład kosztów w podziale na partie \n (wyjazdy powyżej 6300zł)")+
  geom_boxplot(  fill=rev(c("#FF7F00" , "#00008B")), colour="#3366ff") +
  coord_flip()+
  geom_jitter(size=3, col='red')+
  scale_y_continuous(breaks=seq(6000,9000,1000))
  

### połączenie ###

library("gridExtra")
gpar(fill="black")

par(bg="black")
plot.new()

print(m1, vp=viewport( x= 0.5, y = 0.75, width = 1, height = 0.48))
print(m2, vp=viewport( x= 0.5, y = 0.25, width = 1, height = 0.48))

dev.off()
