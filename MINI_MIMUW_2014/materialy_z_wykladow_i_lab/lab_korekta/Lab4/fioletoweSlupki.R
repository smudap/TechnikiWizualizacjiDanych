dane<-data.frame(x=c(139,57,27,25,10),y=c("TVN24","TVPinfo","TVN24 Biznes i Œwiat","TVN","TVP2"))


dane$y=reorder(dane$y,dane$x,mean)


pal=brewer.pal(n=9,name="BuPu")[5:9]

ggplot(dane,aes(x=y,y=x,fill=factor(x)))+geom_bar(stat="identity")+
  geom_text(aes(label=x),hjust=1.2,colour="white",size=7)+
  coord_flip()+scale_fill_manual(values=pal,name="Liczba \npowo³añ",guide=FALSE)+
  ggtitle(expression(atop("TV",atop("Najbardziej opiniotwórcze stacje telewizyjne"),"") ) )+
  theme(plot.title=element_text(face="bold",size=rel(2)))+labs(y="Liczba powo³añ",x="")