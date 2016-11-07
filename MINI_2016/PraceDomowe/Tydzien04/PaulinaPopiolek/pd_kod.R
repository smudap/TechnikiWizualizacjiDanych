library(ggplot2)

dane <- data.frame(opis= c("bez dzieci (41.8%)","bez dzieci (41.8%)", "z 1 dzieckiem (36.5%)" ,
                           "z 1 dzieckiem (36.5%)", "z 1 dzieckiem (36.5%)", 
                           "z 2 dzieci (18.1%)", "z 2 dzieci (18.1%)", "z 2 dzieci (18.1%)",
                           "z 3 dzieci (2.9%)", "z 4 dzieci lub wiêcej (0.7%)" ),
                   procent_x_min = c(0, 0, 18, 0, 0, 83, 0, 0, 64, 93),
                   procent_x_max = c(100, 18, 100, 100, 83, 100, 100, 64, 93, 100),
                   procent_y_min = c(0, 40,40, 50, 70, 70, 80, 90, 90, 90),
                   procent_y_max = c(40,50,50, 70, 80, 80, 90, 100, 100, 100))


ggplot(dane,aes(xmin=procent_x_min,xmax=procent_x_max,ymin=procent_y_min,ymax=procent_y_max))+
  geom_rect(aes(fill=opis))+
  scale_fill_manual(name="", values=c("#ebff6e", "#ffb430", "#ff7d00", "#ee4000", "#b40100"))+
  geom_vline(xintercept = seq(0,100,10), color="grey80")+
  geom_hline(yintercept = seq(0,100,10), color="grey80")+
  scale_x_continuous(breaks=seq(0,100,10),labels = seq(0,10,1),expand = c(0,0.2))+
  scale_y_continuous(breaks=seq(0,100,10),labels = seq(0,10,1),expand = c(0,0.2))+
  theme(panel.background=element_rect(fill="white"), 
        plot.title = element_text(size=26, hjust = 0), legend.text=element_text(size=16),
        axis.text=element_text(size=10))+
  ggtitle("Rozwody wed³ug liczby ma³oletnich dzieci w 2015 roku")