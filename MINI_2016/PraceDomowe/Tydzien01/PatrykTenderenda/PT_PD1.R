# Autor: Patryk Tenderenda

# url: http://pulsinwestora.pb.pl/foto/4633970,3571,176118,743310,6-miast-zagrozonych-peknieciem-banki-na-rynku-nieruchomosci-wykres-dnia
# wykres: http://static.pb.pl/filtered/f6/176118,743310,f_663_663.jpg
# 6 miast zagrożonych pęknięciem bańki na rynku nieruchomości (WYKRES DNIA)
# Wartość obliczanego przez UBS Group indeksu bańki na rynku nieruchomości dla poszczególnych miast. 
# Wskaźnik przekraczający 0,5 oznacza przewartościowanie, a wyższy niż 1,5 - bańkę. 
# Na niedowartościowanie na rynku nieruchomości wskazuje wskaźnik niższy niż minus 0,5.

if(!require(ggplot2)){
  install.packages("ggplot2");
}
if(!require(ggrepel)){
  install.packages("ggrepel");
}

library(ggplot2)
library(ggrepel)

dane <- data.frame(miasto = c("Vancouver", "San Francisco", "Chicago", "Boston", "New York", "London", "Paris", "Stockholm", "Amsterdam", "Geneva", "Frankfurt", "Zurich", "Milan", "Munich", "Singapore", "Tokyo", "Hong Kong", "Sydeny"),
                   wartość = c(2.14, 1.27, -0.7, 0.29, 0.13, 2.06, 0.82, 1.92, 1.22, 0.75, 0.66, 1.03, -0.09, 1.59, 0.45, 0.68, 1.52, 1.70))
dane$miasto <- reorder(dane$miasto, dane$wartość)

dane$klasa <- ifelse(dane$wartość > 1.5,"ryzyko bańki", 
                     ifelse(dane$wartość > 0.5, "przewartościowanie",
                            ifelse(dane$wartość > -0.5, "wartość prawidłowa", "niedowartościowanie")))

wartość_średnia <- round(mean(dane$wartość), digits = 2)

ggplot(dane, aes(x = miasto)) +
  geom_bar(aes(weight = wartość, fill = klasa), position = "identity") +
  geom_text(aes(x=miasto, y=wartość, ymax=wartość, label=wartość, 
                hjust=ifelse(sign(wartość)>0, 1, 0))) + 
  coord_flip() +
  scale_fill_manual(
                values=c("lightblue", "orange1", "lightcoral", "forestgreen"), 
                name = "Klasa indeksu",
                breaks= c("niedowartościowanie", "wartość prawidłowa", 'przewartościowanie', "ryzyko bańki")) +
  geom_hline(aes(yintercept = 1.5), col="lightcoral") + 
  geom_hline(aes(yintercept = 0.5), col="orange1") + 
  geom_hline(aes(yintercept = -0.5), col="forestgreen") + 
  #geom_hline(aes(yintercept = -1a.5), col="lightblue") + 
  geom_hline(aes(yintercept = mean(dane$wartość)), col="blue") +
  annotate("text", x = 1, y = wartość_średnia, col="blue", 
           label = paste("średnia = ", wartość_średnia, sep=""),
           vjust = 1, hjust = 0)+
  
  scale_y_continuous(breaks= seq(-1.5, 2.5, 0.5)) +
  labs(title = "Wartość indeksu bańki spekulacyjnej na rynku nieruchomości", 
       x = "Miasto", 
       y = "Wartość indeksu") +
  theme(axis.text.x = element_text(angle = 90, hjust = 1, vjust = 0.5),
        legend.position="bottom")
