library(dplyr)
library(ggplot2)
library(Hmisc)
library(gridExtra)
library(ggthemes)
# 
# pisa <- url("http://biecek.pl/MIMUW/PISAeurope.rda")
#print(load(pisa))


############################################################################
############################################################################
########################################### wykres 5 #######################

#### przygotowanie danych ####
#head(pisa)
#02 moze byc
#dane <- pisa[,c("CNT","ST29Q07","PV1MATH","W_FSTUWT")]
#head(dane)
#dane
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
head(dane4)
for (i in 1:nrow(dane2)){
   kraj <- levels(dane2$CNT)[dane2$CNT[i]]
   dane4[i,3]<- dane3[dane3$CNT==kraj,2]
   dane4[i,4] <- dane2$liczba[i]/dane3[dane3$CNT==kraj,3]
}

names(dane2)[2] <- "ODP"


dane4$CNT <- dane2$CNT
dane4$ODP <- dane2$ODP


dane4$reorder <- rep(c(1,2,3,4),10)


#as.factor(dane4$ODP)
#tmp <- subset(x, value=="Extremely Familiar")
#x$variable <- factor(x$variable, levels=levels(x$variable)[order(-tmp$freq)])

tmp <- subset(dane4, ODP=="Strongly agree")
tmp
dane5 <- dane4
dane5$CNT <- factor(dane4$CNT, levels=levels(dane4$CNT)[order(-tmp$liczba)])

dane5$ODP <- reorder(dane5$ODP, -dane5$reorder)
dane5$reorder <- NULL


wykres <- ggplot(dane5, aes(x = CNT, y = liczba * 100, fill = ODP) ) +
  geom_bar(stat = "identity") + 
  ggtitle("Mathematics is an important subject for me because I need it for what I want to study later on") +
  theme_solarized(light = FALSE) +
  scale_fill_brewer(name = "How strongly student agrees", palette = 5) +
  scale_y_continuous(name = "Percents") +
  theme(
    plot.title = element_text(face="bold",size=22),
    axis.title.x = element_blank(),
    axis.title.y = element_text(size = 18),
    axis.text.x  = element_text(angle = 20, hjust=1.0,size=18),
    axis.text.y  = element_text(size=18),
    axis.ticks = element_blank(),
    legend.text = element_text(size=14),
    legend.title = element_text(size=16)
  ) 

wykres
