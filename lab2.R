wybraneAuta = wybraneAuta %>%
  filter(Kraj.pochodzenia %in% c("Polska", "Niemcy", "Francja"))


ggplot(wybraneAuta, aes(x=Marka)) + geom_bar()

ggplot(wybraneAuta, aes(x=Marka,
                        colour=Kraj.pochodzenia)) + geom_bar()
ggplot(wybraneAuta, aes(x=Marka,
                        fill=Kraj.pochodzenia)) + geom_bar()


ggplot(wybraneAuta, aes(x=Marka,
                        fill=Kraj.pochodzenia)) + 
  geom_bar(position="fill")
ggplot(wybraneAuta, aes(x=Marka,
                        fill=Kraj.pochodzenia)) + 
  geom_bar(position="stack")
ggplot(wybraneAuta, aes(x=Marka,
                        fill=Kraj.pochodzenia)) + 
  geom_bar(position="dodge")


agregaty <- wybraneAuta %>% 
  group_by(Marka, Kraj.pochodzenia) %>%
  summarise(cena = median(Cena.w.PLN, na.rm=TRUE))

ggplot(agregaty, aes(x=Marka, y =cena,
                        fill=Kraj.pochodzenia)) + 
  geom_bar(position="dodge", stat="identity")


ggplot(agregaty, aes(x=Marka, y =cena,
                     fill=Kraj.pochodzenia)) + 
  geom_bar(position="dodge", stat="identity") +
  coord_flip()

agregaty$Marka <-
  reorder(agregaty$Marka, 
        agregaty$cena, 
        mean)

ggplot(agregaty, aes(x=Marka, y =cena,
                     fill=Kraj.pochodzenia)) + 
  geom_bar(position="dodge", stat="identity") +
  coord_flip() +
  ggtitle("tytul") +
  xlab("Marka") +
  ylab("cena w PLN") + 
  ylim(-20000,60000)


agregaty <- cenyAutI2012 %>% 
  group_by(Marka) %>%
  summarise(cena = median(Cena.w.PLN, na.rm=TRUE))
agregaty$Marka <-
  reorder(agregaty$Marka, 
          agregaty$cena, 
          mean)
ggplot(agregaty, aes(x=Marka, y =cena)) + 
  geom_bar(position="dodge", stat="identity") +
  coord_flip() + scale_y_continuous(trans="log2")

ggplot(wybraneAuta, aes(x=Marka, y=Cena.w.PLN)) + 
  geom_boxplot() +
  coord_flip() + scale_y_continuous(trans="log2")






avgs <- wybraneAuta %>% 
  group_by(Marka, Rok.produkcji) %>%
  summarise(cena = median(Cena.w.PLN, na.rm=TRUE),
            przebieg = median(Przebieg.w.km, na.rm=TRUE),
            liczba = n()) %>%
  filter(liczba >= 10)

tylkoAudi <- avgs %>%
  filter(Marka == "Audi")

ggplot(avgs, aes(x=przebieg, y=Rok.produkcji, label=Rok.produkcji, size=liczba, colour=liczba)) +
  geom_text()  +
  scale_color_continuous(low = "red", high = "green")+
  facet_wrap(~Marka, scales = "free")



ggplot(avgs, aes(x=przebieg, 
                 y=Rok.produkcji, 
                 shape=Marka)) +
  geom_point()  


wybrane <- cenyAutI2012 %>%
  filter(Rok.produkcji == 2008,
         Marka %in% c("Audi", "Opel")) %>%
  group_by(Marka,Rodzaj.paliwa) %>%
  summarise(cena = median(Cena.w.PLN, na.rm=TRUE),
            przebieg = median(Przebieg.w.km, na.rm=TRUE))

ggplot(wybrane, aes(x=przebieg, y=cena, fill=Marka,
                    label=Rodzaj.paliwa)) + 
  geom_text()

ggplot(wybrane, aes(x=przebieg, y=cena, fill=Marka,
                    label=Rodzaj.paliwa)) + 
  geom_bar(stat="identity") +
  geom_text(vjust=-1) 
