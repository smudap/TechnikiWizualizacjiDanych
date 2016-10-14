library(ggplot2)
data<-read.csv("C:/Users/Agnieszka/Desktop/dane_mecz.csv",h=T,sep=";")

cols <- c("Strzelone"="#44ef61","Stracone"="#f04546","punkty"="black")
ggplot(data,aes(x = DRUZYNA,width=.5)) + 
  geom_bar(stat="identity",aes(y=GOLE_STRZELONE+GOLE_STRACONE,fill="Strzelone")) +
  geom_bar(stat="identity",aes(y=GOLE_STRACONE,fill="Stracone"))+
  scale_fill_manual(name="Bramki",values=cols)+
  scale_color_manual(name="",values=cols)+
  geom_point(aes(y=PKT,color="punkty"))+
  geom_text(aes(y=PKT,label=PKT),hjust=1, vjust=1)+
  ylab("Bramki")+
  theme(axis.text.x = element_text(angle = 90, hjust = 1))

cols2 <- c("Wygrana"="#44ef61","Remis"="#efe444","Przegrana"="#f04546")
ggplot(data,aes(x = DRUZYNA,width=.5)) + 
  geom_bar(stat="identity",aes(y=W+R+P,fill="Wygrana")) +
  geom_bar(stat="identity",aes(y=R+P,fill="Remis"))+
  geom_bar(stat="identity",aes(y=P,fill="Przegrana"))+
  scale_fill_manual(name="Rezultat",values=cols2)+
  ylab("Liczba meczów")+
  scale_y_continuous("Liczba meczów", c(0,2,4,6,8,10))+
  theme(axis.text.x = element_text(angle = 90, hjust = 1))