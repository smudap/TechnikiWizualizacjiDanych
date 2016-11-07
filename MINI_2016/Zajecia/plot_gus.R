# wykres plot_gus

library(ggplot2)

dane <- data.frame(miejsce= c("Urodzeni w Polsce","Urodzeni w Polsce", "Polacy urodzeni za grania", "Cudzoziemcy urodzeni za granicą", "Brak informacji"),
                   procent_x_min = c(0  ,0  ,82 ,98,99),
                   procent_x_max = c(100,82 ,98 ,99,100),
                   procent_y_min = c(0, 90,90,90,90),
                   procent_y_max = c(90,100,100,100,100))

ggplot(dane,aes(xmin=procent_x_min,xmax=procent_x_max,ymin=procent_y_min,ymax=procent_y_max))+
  geom_rect(aes(fill=miejsce))+
  geom_vline(xintercept = seq(0,100,10), color="grey80")+
  geom_hline(yintercept = seq(0,100,10), color="grey80")+
  scale_x_continuous(breaks=seq(0,100,10),labels = seq(0,10,1),expand = c(0,0.2))+
  scale_y_continuous(breaks=seq(0,100,10),labels = seq(0,10,1),expand = c(0,0.2))+
  theme(panel.background=element_rect(fill="white"))+
  ggtitle("Ludność według miejsca urodzenia w 2011 roku")
  
