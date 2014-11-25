

con <- url("http://biecek.pl/MIMUW/PISAeurope.rda")
print(load(con))

kraj <- pisa$CNT
matka <- pisa$ST13Q01
ojciec <- pisa$ST17Q01

wyk <- as.numeric(matka) + as.numeric(ojciec)
wyk2 <- character(length(wyk))
for (i in 1:length(wyk)){
  if (!is.na(wyk[i])) {
    if (wyk[i]>=6 ) wyk2[i] <- "podstawowe"
    if (wyk[i]>=4 & wyk[i]<=5) wyk2[i] <- "średnie"
    if (wyk[i]<=3) wyk2[i] <- "wyższe"
  }
  else wyk2[i] <- NA}



kraj2 <- rep("reszta świata",length(kraj)) 
kraj2[kraj=="Poland"]=kraj[kraj=="Poland"]


odp11 <- pisa$ST55Q01
odp12 <- pisa$ST55Q02
odp13 <- pisa$ST55Q03

levels(odp11) <- c("Wcale", "Mniej niż 2 godziny", "Od 2 do 4 godzin", "Od 4 do 6 godzin", "Więcej niż 6 godzin")
levels(odp12) <- c("Wcale", "Mniej niż 2 godziny", "Od 2 do 4 godzin", "Od 4 do 6 godzin", "Więcej niż 6 godzin")
levels(odp13) <- c("Wcale", "Mniej niż 2 godziny", "Od 2 do 4 godzin", "Od 4 do 6 godzin", "Więcej niż 6 godzin")

levels(ojciec) <- c("3A", "3B-3C","2","1","brak")
levels(matka) <- c("3A", "3B-3C","2","1","brak")

dane0 <- data.frame(odp11, odp12, odp13, matka, ojciec, wyk2, kraj)
dane <- dane0[dane0$kraj=="Poland",]
dane1 <- dane0[dane0$kraj!="Poland",]

library(ggplot2)

czcionki <- theme( axis.text.x = element_text( size = 2*17),
                   axis.text.y = element_text(size = 2*17),
                   axis.title.x= element_text(size = 2*20, vjust=-1.3),
                   #axis.title.y= element_text(size = 2*20, vjust=1.3),
                   title =element_text(size = 2*25),
                   legend.title=element_text(size = 2*15),
                   legend.text = element_text(size = 2*15),
                   legend.position="none",
                   legend.background = element_rect(colour = "grey50")) 



# install.packages("ggplot2")

#install.packages("scales")
library(scales)


pol1 <- ggplot(na.omit(dane), aes(x=wyk2, fill=odp11)) + 
  scale_fill_manual(values=c( "PeachPuff","LightSalmon", "Coral", "Tomato", "Black")) +
  geom_bar(position="fill", colour="Black") + 
  czcionki +labs(y="",x="wykształcenie rodziców") +scale_y_continuous(labels=percent) +
  theme( panel.background = element_rect(colour = "Black", fill="white"), 
         panel.grid.major = element_line(colour = "grey90"),
         panel.grid.major.x = element_blank(), panel.grid.minor.x = element_blank())

# pol1 <- ggplot(na.omit(dane), aes(x=wyk2, fill=odp11)) + 
#   geom_bar(position="fill") + 
#   czcionki +labs(y="",x="wykształcenie rodziców") +scale_y_continuous(labels=percent)

pol2 <- ggplot(na.omit(dane), aes(x=wyk2, fill=odp12)) + 
  scale_fill_manual(values=c( "PeachPuff","LightSalmon", "Coral", "Tomato", "Black")) +
  geom_bar(position="fill", colour="Black") + 
  czcionki +labs(y="",x="wykształcenie rodziców") +scale_y_continuous(labels=percent) +
  theme( panel.background = element_rect(colour = "Black", fill="white"), 
         panel.grid.major = element_line(colour = "grey90"),
         panel.grid.major.x = element_blank(), panel.grid.minor.x = element_blank())

pol3 <- ggplot(na.omit(dane), aes(x=wyk2, fill=odp13)) + 
  scale_fill_manual(values=c( "PeachPuff","LightSalmon", "Coral", "Tomato", "Black")) +
  geom_bar(position="fill", colour="Black") + 
  czcionki +labs(y="",x="wykształcenie rodziców") +scale_y_continuous(labels=percent) +
  theme( panel.background = element_rect(colour = "Black", fill="white"), 
         panel.grid.major = element_line(colour = "grey90"),
         panel.grid.major.x = element_blank(), panel.grid.minor.x = element_blank())

reszta1 <- ggplot(na.omit(dane1), aes(x=wyk2, fill=odp11)) + 
  scale_fill_manual(values=c( "PeachPuff","LightSalmon", "Coral", "Tomato", "Black")) +
  geom_bar(position="fill", colour="Black") + 
  czcionki +labs(y="",x="wykształcenie rodziców") +scale_y_continuous(labels=percent) +
  theme( panel.background = element_rect(colour = "Black", fill="white"), 
         panel.grid.major = element_line(colour = "grey90"),
         panel.grid.major.x = element_blank(), panel.grid.minor.x = element_blank())

reszta2 <- ggplot(na.omit(dane1), aes(x=wyk2, fill=odp12)) + 
  scale_fill_manual(values=c( "PeachPuff","LightSalmon", "Coral", "Tomato", "Black")) +
  geom_bar(position="fill", colour="Black") + 
  czcionki +labs(y="",x="wykształcenie rodziców") +scale_y_continuous(labels=percent) +
  theme( panel.background = element_rect(colour = "Black", fill="white"), 
         panel.grid.major = element_line(colour = "grey90"),
         panel.grid.major.x = element_blank(), panel.grid.minor.x = element_blank())

reszta3 <- ggplot(na.omit(dane1), aes(x=wyk2, fill=odp13)) + 
  scale_fill_manual(values=c( "PeachPuff","LightSalmon", "Coral", "Tomato", "Black")) +
  geom_bar(position="fill", colour="Black") + 
  czcionki +labs(y="",x="wykształcenie rodziców") +scale_y_continuous(labels=percent) +
  theme( panel.background = element_rect(colour = "Black", fill="white"), 
         panel.grid.major = element_line(colour = "grey90"),
         panel.grid.major.x = element_blank(), panel.grid.minor.x = element_blank())

wykszt <- ggplot(na.omit(dane0), aes(x=ojciec, y=matka, col=wyk2)) + 
  geom_point(size=2*10) +
  ggtitle("Objaśnienie \n grupowania wykształcenia ") +
  theme( axis.text.x = element_text( size = 2*17, angle=-90, hjust=),
         axis.text.y = element_text(size = 2*17),
         axis.title.x= element_text(size = 2*20),
         axis.title.y= element_text(size = 2*20),
         title =element_text(size = 2*20),
         legend.title=element_text(size = 2*15),
         legend.text = element_text(size = 2*15),
         legend.position="bottom",
         legend.background = element_rect(colour = "grey90", fill="white"),
         panel.background = element_rect(colour = "Black", fill="white"), 
         panel.grid.major = element_line(colour = "grey90"),
         panel.grid.major.x = element_blank(), panel.grid.minor.x = element_blank()) +
  guides(col = guide_legend(title="wykształcenie \n rodziców", nrow = 3)) 


leg <- theme( legend.title=element_text(size = 45),
              legend.text = element_text(size = 40),
              legend.background = element_rect(colour = "white"),
              panel.background = element_rect(colour ="white", fill="white"),
              axis.title.x = element_blank(),
              axis.title.y = element_blank(),
              axis.text.x = element_blank(),
              axis.text.y = element_blank(),
              axis.line.x=element_blank(),
              legend.position="left") 

legenda <- ggplot(na.omit(dane0), aes(x=wyk2, y=odp11, col=odp11)) + 
  geom_point(pch=15, size=2*10) + geom_point(pch=15, size=2*10, col="white") +
  scale_color_manual(values=c( "PeachPuff","LightSalmon", "Coral", "Tomato", "Black")) +
  leg + theme(legend.key = element_rect(fill = "white")) +
  guides(col = guide_legend(title=" Ile godzin uczniowie \n spędzają poza szkołą \n na nauce danego \n przedmiotu w tygodniu \n", reverse=TRUE))

#install.packages("gridExtra")
library("gridExtra")
grid.newpage() 
grid.text("Porównanie czasu nauki w domu w Polsce \n i innych krajach według wykształcenia rodziców", vp = viewport(x=0.5, y=0.95), gp=gpar(fontsize=2*40,  fontface="bold"))
grid.text("Polska", vp = viewport(x=0.2, y=0.88), gp=gpar(fontsize=65, fontface="bold"))
grid.text("Reszta Świata", vp = viewport(x=0.53, y=0.88), gp=gpar(fontsize=65,  fontface="bold"))
grid.text("Testy językowe", vp = viewport(x=0.36, y=0.84), gp=gpar(fontsize=50))
grid.text("Matematyka", vp = viewport(x=0.36, y=0.56), gp=gpar(fontsize=50))
grid.text("Nauki przyrodnicze", vp = viewport(x=0.36, y=0.28), gp=gpar(fontsize=50))

print(pol1, vp=viewport(x=0.17, y = 0.71, 
                        width=0.33, height=0.24))
print(pol2, vp=viewport(x=0.17, y = 0.43, 
                        width=0.33, height=0.24))
print(pol3, vp=viewport(x=0.17, y = 0.15, 
                        width=0.33, height=0.24))

print(reszta1, vp=viewport(x=0.5, y = 0.71, 
                           width=0.33, height=0.24))
print(reszta2, vp=viewport(x=0.5, y = 0.43, 
                           width=0.33, height=0.24))
print(reszta3, vp=viewport(x=0.5, y = 0.15, 
                           width=0.33, height=0.24))

print(wykszt, vp=viewport(x=0.81, y = 0.16, 
                          width=0.25, height=0.29)) 

print(legenda, vp=viewport(x=1.03, y = 0.71, 
                           width=0.66, height=0.33)) 
grid.text("Reszta Świata:", 
          vp = viewport(x=0.81, y=0.535), gp=gpar(fontsize=45, fontface="bold"))
grid.text(" - Belgia, \n - Czechy, \n - Finlandia, \n - Francja, \n - Grecja, \n - Japonia, \n - Korea, \n - Niemcy, \n - Wielka Brytania. ", 
          vp = viewport(x=0.81, y=0.44), gp=gpar(fontsize=40))

