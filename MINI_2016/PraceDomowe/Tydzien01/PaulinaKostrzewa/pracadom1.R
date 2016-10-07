#install.packages('ggplot2')
library(ggplot2)


tabela<-read.csv(file="C:\\Users\\kp\\Desktop\\Techniki wizualizacji danych\\cenynieruch.csv", sep=';', dec=',')
tabela



ggplot(tabela, aes(x=Miasto, y=srednia,color=Metraz), label())+  
   geom_area(aes(fill = Metraz), size=6)

