

library(ggplot2)


dane <- data.frame(kraj = c("Niemcy","Litwa", "Rosja", "ZSRR", "Kazachstan", "Chiny",
                            "Francja", "USA", "Pozostałe", "Ukraina", "Białoruś"),
                   proc = c(7.9,7.5,4.1,3.0,3.0,2.7,2.2,1.4,17.5,37.5,13.2))

dane <- dane[order(dane$proc, decreasing = T),]



dane$labelki <- paste(dane$kraj,"\n", dane$proc,"%", sep = "")
dane$labelki <-reorder(dane$labelki,dane$proc,I)


ggplot(dane, aes(x=labelki, y=proc))+ geom_bar(stat="identity", fill="#76ac00") + coord_flip()+
  ggtitle("Mieszkańcy obiektów zbiorowego zakwaterowania w % urodzeni\nza granicą według kraju urodzenia (stan na 2011 rok)")+
  xlab("")+ylab("")+ theme(panel.background = element_blank(),
                           panel.grid.major.x = element_blank(),
                           axis.text.x=element_blank(),
                           axis.ticks=element_blank(), axis.text.y = element_text(size=13),
                           plot.title = element_text(size=16, hjust = 0), plot.margin = unit(c(1,1,1,1),"cm")
                           
  )+scale_y_continuous(expand=c(0,0), limits = c(0,45))







