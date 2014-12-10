library(ggplot2)
life_exp <- c(81.66, 82.07, 51.35, 76.65)
obesity <-c(18.2, 26.8, 3.5, 25.3)
hiv <- c(0.4, 0.1, 4.7, 0.1)
literacy <- c(3.38,0.05,3.85,2.07) #liczba/1000
kraje = c('FRA','AUS',"RŚA",'POL')
dane <- data.frame(life_exp, obesity, hiv, literacy)

obesity <- ggplot(dane,aes(x=kraje,y=obesity))+
  geom_bar(stat="identity", fill="yellow", colour="black", width=1)+
  theme( axis.text.x = element_text(family = "mono", size = 10),
         axis.title.x= element_text(family = "mono", size = 10),
         title =element_text(family = "mono", size = 10)
  ) + ggtitle("Liczba ludzi otyłych") + ylab("Procent") + xlab("Kraj")
obesity <- obesity + coord_polar()

hiv <- ggplot(dane,aes(x=kraje,y=hiv))+
  geom_bar(stat="identity", fill="pink", colour="black", width=1)+
  theme( axis.text.x = element_text(family = "mono", size = 10),
         axis.title.x= element_text(family = "mono", size = 10),
         title =element_text(family = "mono", size = 10)
  ) + ggtitle("Liczba ludzi z hiv") + ylab("Procent") + xlab("Kraj")
hiv <- hiv + coord_polar()

literacy <- ggplot(dane,aes(x=kraje,y=literacy))+
  geom_bar(stat="identity", fill="red", colour="black", width=1)+
  theme( axis.text.x = element_text(family = "mono", size = 10),
         axis.title.x= element_text(family = "mono", size = 10),
         title =element_text(family = "mono", size = 10)
  ) + ggtitle("Liczba analfabetów") + ylab("Procent") + xlab("Kraj")
literacy <- literacy + coord_polar()

life_exp <- ggplot(dane,aes(x=kraje,y=life_exp))+
  geom_bar(stat="identity", fill="palegreen3", colour="black", width=1)+
  theme( axis.text.x = element_text(family = "mono", size = 10),
         axis.title.x= element_text(family = "mono", size = 10),
         title =element_text(family = "mono", size = 10)
  ) + ggtitle("Przewidywana długość życia") + ylab("Lata") + xlab("Kraj")




grid.newpage()
print(life_exp, vp=viewport(x=0.25, y = 0.75, 
                            width=0.5, height=0.5))
print(literacy, 
      vp=viewport(x=0.25, y = 0.25, 
                  width=0.5, height=0.5))


print(hiv, 
      vp=viewport(x=0.75, y = 0.25, 
                  width=0.5, height=0.5))

print(obesity, 
      vp=viewport(x=0.75, y = 0.75, 
                  width=0.5, height=0.5))