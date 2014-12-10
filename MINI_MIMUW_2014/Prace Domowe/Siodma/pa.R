library(ggplot2)
head(dane)
dane2 <- dane[dane$Partia=="PiS" | dane$Partia=="PO",]
rok <- substr(dane2[,4],1, 4)
#rok <- as.numeric(rok)
partia <- dane2[,2]
koszt <- dane2[,6]
d2 <- data.frame(rok, partia, koszt)

library(dplyr)

sre <- d2 %>% group_by(partia, rok) %>% summarise(sr=mean(koszt))
sre2<- sre[sre$rok!=2014 & sre$rok!=2011,]

ggplot(sre2,aes(x=rok,y=sr,fill=partia)) + geom_bar(stat="identity", position="dodge")  + 
  labs(title = "Znaczący wzrost wydatków \n posłów PO w stosunku do PiS", x='Rok', y='Średni koszt (zł)') +
  theme_bw() +
  scale_fill_manual(values=c("cornflowerblue","red3"))+
  theme( axis.text.x = element_text( size = 17),
         axis.text.y = element_text(size = 17),
         axis.title.x= element_text(size = 20),
         axis.title.y= element_text(size = 20),
         title =element_text(size = 25),
         legend.title=element_text(size = 15),
         legend.text = element_text(size = 15))