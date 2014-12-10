PIS <- dane[dane$Partia == 'PiS', ]
PO <- dane[dane$Partia == 'PO', ]


par(mfrow=c(2,1))
hist(PO[, 6], freq = FALSE)
hist(PIS[, 6], freq = FALSE)


length(unique(PO[,1]))
length(unique(PIS[,1]))



ktorzy <- dane[dane[, 2] %in% c("PO", "PiS"), ]

ktorzy <- ktorzy[ order(ktorzy[, 6], decreasing = TRUE),   c(2,6)]
ktorzy


library(ggplot2)
to <- as.data.frame(t(table(ktorzy[ktorzy[, 2]>6400, 1])))[,2:3]
names(to) <- c("Partia", "Ilu_wygodnickich")


ladne_kolory <- sample(c("#00008B", "#8B3E2F", "#8B6508", "#66CD00", "#8B0000"))

m1 <- ggplot(to, aes(x=Partia, y=Ilu_wygodnickich) ) +geom_bar(stat="identity", fill = rev(c("#FF7F00" , "#00008B")), width=.4)+
  ggtitle("Ilu wygodnickich podróżowało za państwowe pieniądze za więcej niż 6400 zł 
          - średnie miesięczne zarobki w warszawie brutto \n a w dodatku bezprawnie GŁOSOWALI!")+
  theme( panel.background=element_rect(fill='white'),  
         axis.text.x = element_text(family = "mono", size = 15),
         axis.text.y = element_text(family = "mono", size = 15),
         axis.title.x= element_text(family = "mono", size = 20),
         axis.title.y= element_text(family = "mono", size = 20),
         title =element_text(family = "mono", size = 25)
)+
  coord_flip()+
  labs(x="Partia", y="Wygodni przedstawiciele władzy i ludu")+
  annotate("text", x = 2:1, y = c(2,6), label = c("Tylko 4 :*", "AŻ 10!!!!! Skandal"), color="white", size=12,
           size=12,family = "mono")



#### EMMA
load("Emma/dane.rda")
popis <- dane[dane$Partia%in%c("PO","PiS"),]
names(popis)
vec=c("Posel","Partia","Miejsce","Data","Glosowanie","Koszt")
names(popis)<-vec
library(ggplot2)
library(dplyr)

ggplot(popis, aes(y=Koszt, x=Partia)) +
  geom_boxplot(alpha=0.5) #+ xlim(0,300000)

a <- popis %>%
  arrange(Koszt)

popis5 <- popis[popis$Koszt>=5000,]

ggplot(popis5, aes(y=Koszt, x=Partia)) +
  geom_boxplot(alpha=0.5)


ggplot(popis5, aes(x=Koszt, fill=Partia)) +
  ggtitle("Gęstość kosztów w podziale na partie (wyjazdy powyżej 5000zł)")+
  geom_density(alpha=0.4) + xlim(4000,12000)


popis6 <- popis[popis$Koszt>=6300&popis$Koszt<14000,]

table(popis6$Partia)

m2 <- ggplot(popis6, aes(y=Koszt, x=Partia)) +
  theme( panel.background=element_rect(fill='white'),  
         axis.text.x = element_text(family = "mono", size = 15),
         axis.text.y = element_text(family = "mono", size = 15),
         axis.title.x= element_text(family = "mono", size = 20),
         axis.title.y= element_text(family = "mono", size = 20),
         title =element_text(family = "mono", size = 22)
  )+
  ggtitle("Rozkład kosztów w podziale na partie \n (wyjazdy powyżej 6300zł)")+
  geom_boxplot(  fill=rev(c("#FF7F00" , "#00008B")), colour="#3366ff") +
  coord_flip()+
  annotate("text", x = c(2,1), y = c(7500,7500), label = c("Wierni Polsce", "Cwaniaki"), color="#3366ff", 
           size=12,family = "mono")



library("gridExtra")
?gpar
gpar(fill="black")

par(bg="black")
plot.new()

print(m1, vp=viewport( x= 0.5, y = 0.75, width = 1, height = 0.48))
print(m2, vp=viewport( x= 0.5, y = 0.25, width = 1, height = 0.48))



dev.off()





ggplot(popis6, aes(Partia,Koszt)) +
  ggtitle("Rozkład kosztów w podziale na partie (wyjazdy powyżej 6300zł)")+
  geom_boxplot(alpha=0.5) +
  geom_jitter() +
  coord_flip()
