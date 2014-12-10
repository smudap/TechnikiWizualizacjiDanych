
library("reshape")
library(ggplot2)
library(gridExtra)


#pierwszy wykres
r <- c("Katolicy","Prawoslawni",
       "Protestanci","Inni",
       "Ateisci","Brak danych","Muzlumanie")
Polska <- c(87.2,1.3,0.4,0.4,0,10.8,0)
Estonia <- c(2.2,0,9.9,0.9,54.1,0,0)
Rumunia <- c(4.3,81.9,6.4,0.9,0.2,6.3,0)
Wielka_Brytania <- c(0,0,59.5,2,0,25.7,4.4)
Niemcy <- c(34,0,34,28.3,0,0,3.7)
rel <- data.frame(r,Polska, Estonia, Rumunia, Wielka_Brytania, Niemcy)
a <- melt(rel)

rel=ggplot(a, aes(x=variable,y=r,size=value ,col=value,
                  label=value))+
  geom_point()+
  geom_text(size=5, col="black",vjust=2)+
  scale_size_continuous(range=c(3,20))+
  labs(list(title="Dominuj¹ce religie", x="Pañstwa", y="Religie"))+
  theme(title=element_text(colour="grey20",size=13))+
  theme(axis.title.x = element_text(colour="grey20",size=15))+
  theme(axis.title.y = element_text(colour="grey20",size=15))+
  theme(legend.position='none')





#drugi wykres
panstwa=c("Polska", "Estonia", "Niemcy", "Rumunia", "Anglia")
czyt=c(99.7 , 99.8, 99, 97.7, 99)
dane=data.frame(panstwa,czyt)

czyt=ggplot(dane, aes( x=panstwa,y=czyt))+
  geom_bar(stat="identity",fill="grey40", colour="black",width=.6)+
  labs(list(title="Procent ludzi umiej¹cych czytaæ (%)", x="Pañstwa", y="% ludnoœci"))+
  theme(title=element_text(colour="grey20",size=13))+
  theme(axis.title.x = element_text(colour="grey20",size=15))+
  theme(axis.title.y = element_text(colour="grey20",size=15))+
  coord_cartesian(ylim=c(90,100))+
  theme(panel.grid.major.x=element_line(size=0.5),axis.text=element_text(size=8))


#razem
grid.newpage() 
print(rel, 
      vp=viewport(x=0.67, y = 0.5, 
                  width=0.65, height=1))
print(czyt, vp=viewport(x=0.20, y = 0.5, 
                      width=0.3, height=0.8))
 
      
      









  












