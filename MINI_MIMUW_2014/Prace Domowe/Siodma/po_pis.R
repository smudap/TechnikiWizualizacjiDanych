load("H:\\twd\\dane.rda")
library(ggplot2)

dane$rok <- substr(dane[,4],1, 4)
dane2 <- dane[dane$Partia=="PiS" | dane$Partia=="PO",c(2,6,7,1)]

boxplot(koszt~., data=dane2)
names(dane2)[2] <- "koszt"
names(dane2)[4] <- "posel"
?boxplot
library(dplyr)

sre <- dane2 %>% group_by(Partia) %>% summarise(sr=mean(koszt))

s <- dane2 %>% group_by(Partia) %>% summarise(suma=sum(koszt))

maks <- dane2 %>% group_by(Partia,rok ) %>% summarise(mak=max(koszt))




ggplot(sre,aes(x=Partia,y=sr,fill=Partia)) + geom_bar(stat="identity",colour="black") +
   coord_cartesian(ylim=c(4350, 4600))+
   scale_fill_manual(values=c("cornflowerblue","red3"))+
   theme(axis.text.y = element_text(colour="grey20",
                                   size=16, face="plain",family='mono'),
        axis.text.x = element_blank(),
        plot.title=element_text(size=18,family='mono'),
        legend.position='none')+
  ggtitle('Œrednia wydatków na wyjazdy s³u¿bowe')+
  labs(y='', x='')+
  geom_text(aes(label=Partia, y=c(4400, 4480)), size=20)

pos <- dane2 %>% group_by(posel) %>% summarise(suma=sum(koszt), parta=Partia[1]) %>% arrange(suma)
pos <- pos[1:11,]
pos$posel <- reorder(pos$posel,pos$suma)

ggplot(pos,aes(x=posel,y=suma,fill=parta)) + 
  geom_bar(stat="identity",colour="black")+
  scale_fill_manual(values=c("cornflowerblue","red3"))+
  ggtitle('Top 11 najtañszych wyjazdów') +
  scale_y_reverse()+
  theme(axis.text.y = element_text(colour="grey20",
                                   size=16, face="plain"),
        axis.text.x = element_text(colour="grey20",
                                   size=16, face="plain",angle=45,vjust=1,hjust=1),
        plot.title=element_text(size=18))+
  labs(y='', x='')

sre <- d2 %>% group_by(partia, rok) %>% summarise(sr=mean(koszt))
sre2<- sre[sre$rok!=2014 & sre$rok!=2011,]

ggplot(sre2,aes(x=rok,y=sr,fill=partia)) + geom_bar(stat="identity", position="dodge")  + 
  labs(title = "Znacz¹cy wzrost wydatków \n pos³ów PO w stosunku do PiS", x='Rok', y='Œredni koszt (z³)') +
  theme_bw() +
  scale_fill_manual(values=c("cornflowerblue","red3"))+
  theme( axis.text.x = element_text( size = 17),
         axis.text.y = element_text(size = 17),
         axis.title.x= element_text(size = 20),
         axis.title.y= element_text(size = 20),
         title =element_text(size = 25),
         legend.title=element_text(size = 15),
         legend.text = element_text(size = 15))

