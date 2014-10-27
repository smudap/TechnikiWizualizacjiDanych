load("MINI_MIMUW_2014\\Prace Domowe\\Trzecia\\kosinski\\konkursPAZUR.RData")
head(skiJumps2013)
head(variableDictionary)
variableDictionary

library(dplyr)  
library(ggplot2)
library(lubridate)
wiek <- -as.numeric((ymd(skiJumps2013$jumperDateOfBirth) - ymd("2014-01-01"))/365)
summary(wiek)

# wybrano skocznie, dla ktorych rozegrano tylko jeden konkurs
# skladajacy sie z dwoch rund skokow.
# zobrazowano wyniki skoczkow w drugiej rundzie, bez 4 skoczkow
# z wyraznie odstajacymi wynikami (czyli zapewne wywrotki)
table(skiJumps2013$compName)

dane <- cbind(skiJumps2013,wiek)


skocznia_srednie <- dane %>%
  filter(compName %in% c("Bischofshofen", "Oberstdorf", "Kuopio", "Oslo", 
                         "Trondheim", "Falun", "Kuusamo", "Wisla", "Garmisch-Partenkirchen")) %>%
filter(jumpSeries==2) %>%
  filter(compTotalPoints>175)  %>%
  group_by(compName) %>%
  summarize(srednia=mean(compTotalPoints))


skocznia <- dane %>%
  filter(compName %in% c("Bischofshofen", "Oberstdorf", "Kuopio", "Oslo", 
                         "Trondheim", "Falun", "Kuusamo", "Wisla", "Garmisch-Partenkirchen")) %>%
  filter(jumpSeries==2) %>%
  filter(compTotalPoints>175) 


ggplot(skocznia, aes(wiek,compTotalPoints, color = as.factor(jumperCountry))) +
  facet_wrap(~compName) + geom_point( color="grey20", aes(fill=as.factor(jumperCountry)),
                                      shape=21, size=3)  +    
   geom_smooth(method="lm", col="#E69F00") +
   ylab("Wynik po udanej drugiej serii") +
   xlab("Wiek skoczka") +
   labs(colour = "Cylinders") +
   ggtitle("Wybrano skocznie, dla których rozegrano tylko jeden konkurs
składający się z dwóch rund skoków.
Zobrazowano wyniki skoczków w drugiej rundzie, bez 4 skoczków
z wyraźnie odstającymi wynikami (czyli zapewne wywrotki).") + 
   theme(
      plot.title = element_text( colour = "#b4dd09"),
      axis.text = element_text( colour = "#dd3209"),
      axis.title.x = element_text( colour = "#E69F00"),
      axis.title.y = element_text( colour = "#E69F00"),
   # dark background to legend
   legend.background = element_rect(colour = "white", fill = "black"),
   legend.key = element_rect(fill = "black", colour = F),
   # text and border in white
   legend.title = element_text(color="white"),
   legend.text = element_text(color="white"),
   # dark background
   panel.background = element_rect(fill = "black"),
   plot.background = element_rect(fill="black")
   # removing axis lines and ticks
)+ scale_fill_discrete(name="   Kraj")
   

