source("install.R")
source("libs.R")

#rozkłady w partiach na przykłądzie PiS

PartiaBase <- filter(dane,
              Lista == "Prawo i Sprawiedliwość")
#head(PartiaBase)

PartiaS <- filter(allStatements,
                  Lista == "Prawo i Sprawiedliwość")
#head(PartiaS)

PartiaN <- filter(allVotes,
                  Lista == "Prawo i Sprawiedliwość",
                  vote =="Nieobecny")
#head(PartiaN)

#rozkład wykształcenia posłów
dane11 <- as.data.frame(table(PartiaBase$Wyksztalcenie))
#Ilość wypowiedzi względem wykształcenia
dane12 <- as.data.frame(table(PartiaS$Wyksztalcenie))

#Średnia ilość wypowiedzi względem wykształcenia
# ilość wypowiedzi podzielona przez ilość posłów w danej grupie
dane13 <- dane11
dane13$Freq <- dane12$Freq/dane11$Freq

#rozkład posłóW względem okręgów wyborczych
dane14 <- as.data.frame(table(PartiaBase$OkregMiejscowość))

#Ilość wypowiedzi względem okręgów wyborczych
dane15 <- as.data.frame(table(PartiaS$OkregMiejscowość))

#Średnia ilość wypowiedzi względem okręgu wyborczego
# ilość wypowiedzi podzielona przez ilość posłów w danej grupie
dane16 <- dane14
dane16$Freq <- dane15$Freq/dane14$Freq


#Ilość nieobecności względem wykształcenia
dane17 <- as.data.frame(table(PartiaN$Wyksztalcenie))

#Średnia ilość nieobecności względem wykształcenia
# ilość nieobecności podzielona przez ilość posłów w danej grupie
dane18 <- dane11
dane18$Freq <- dane17$Freq/dane11$Freq

#Ilość nieobecności względem okręgów wyborczych
dane19 <- as.data.frame(table(PartiaN$OkregMiejscowość))

#Średnia ilość nieobecności względem okręgu wyborczego
# ilość nieobecności podzielona przez ilość posłów w danej grupie
dane20 <- dane14
dane20$Freq <- dane19$Freq/dane14$Freq


#prosty podstawowy wykres |DO ROZBÓDOWY|
# wystarczy zmienić numer w danych poniżej do zmiany wykresu
ggplot(dane17, aes(y=Freq,x = Var1, width=.75)) +
  geom_bar(stat="identity") 

#prosty podstawowy wykres 2 |DO ROZBÓDOWY|
# wystarczy zmienić numer w danych poniżej do zmiany wykresu
wojewodztwo <- c("podlaskie", "ślaskie", "kujawsko-pomorskie", "lubelskie", "małopolskie", 
                "ślaskie", "warmińsko-mazurskie", "pomorskie", "pomorskie", "ślaskie", 
                "wielkopolskie", "ślaskie", "świętokrzyskie", "wielkopolskie", "zachodniopomorskie", 
                "małopolskie", "podkarpackie", "dolnoślaskie", "lubelskie", "łódzkie", 
                "małopolskie", "warmińsko-mazurskie", "opolskie", "wielkopolskie", "łódzkie", 
                "mazowieckie", "wielkopolskie", "mazowieckie", "ślaskie", "podkarpackie", 
                "mazowieckie", "łódzkie", "ślaskie", "zachodniopomorskie", "małopolskie", 
                "kujawsko-pomorskie", "dolnoślaskie", "mazowieckie", "dolnoślaskie", "lubuskie")
okregi <- c("Białystok", "Bielsko", "Bydgosz", "Chełm", "Chrzanów", 
                 "Częstochowa", "Elbląg", "Gdańsk", "Gdynia", "Gliwice", 
                 "Kalisz", "Katowice", "Kielce", "Konin", "Koszalin", 
                 "Kraków", "Krosno", "Legnica", "Lublin", "Łódź", 
                 "Nowy", "Olsztyn", "Opole", "Piła", "Piotrków", 
                 "Płock", "Poznań", "Radom", "Rybnik", "Rzeszów", 
                 "Siedlce", "Sieradz", "Sosnowiec", "Szczecin", "Tarnów", 
                 "Toruń", "Wałbrzych", "Warszawa", "Wrocław", "Zielona")
ggplot(dane20, aes(y=Freq,x = Var1, width=.75, fill=wojewodztwo))+ ylab("srednia") + xlab("okreg") + 
  geom_bar(stat="identity") + coord_flip() + ggtitle("Srednie ilosci wystopien z okregow wyborczych")

wojewodztwo2 <- matrix(c(wojewodztwo,okregi), ncol=2)
colnames(wojewodztwo2) <- c('Województwo', 'OkregMiejscowość')
wojewodztwo2.frame <- as.data.frame(wojewodztwo2)
wypowiedzi_i_przerwania_poslow2 <- join(dane, wojewodztwo2.frame,
                                       type = "left",  by=c("OkregMiejscowość"))
ggplot(na.omit(wypowiedzi_i_przerwania_poslow2), aes(x = Województwo)) +
  geom_bar(aes(y = LiczbaWypowiedzi, fill = Województwo), stat="identity") +
  labs(title = "Liczba wypowiedzi ze względu na wykształcenie i okręg wyborczy posła", 
       x = "Okręg Wyborczy", 
       y = "Liczba wypowiedzi") + coord_flip()  + 
  facet_wrap(~Wyksztalcenie, ncol = 2)


tmpd <- as.data.frame(table(wypowiedzi_i_przerwania_poslow2$Wyksztalcenie, wypowiedzi_i_przerwania_poslow2$Województwo))

colnames(tmpd)[1] = "Wyksztalcenie";
colnames(tmpd)[2] = "Województwo";
tmpd <- join(tmpd, wypowiedzi_i_przerwania_poslow2, type = "left",  by=c("Województwo", "Wyksztalcenie"))
tmpd$SredniaPrzerwanWykonanych <- tmpd$LiczbaPrzerwanWykonanych/tmpd$Freq
tmpd$SredniaPrzerwanOtrzymanych <- tmpd$LiczbaPrzerwanOtrzymanych/tmpd$Freq
tmpd$SredniaWypowiedzi <- tmpd$LiczbaWypowiedzi/tmpd$Freq

ggplot(na.omit(tmpd), aes(x = Województwo)) +
  geom_bar(aes(y = SredniaPrzerwanWykonanych, fill = Województwo), stat="identity") +
  labs(title = "Średnia liczba wykonanych przerwań ze względu na wykształcenie i okręg wyborczy posła", 
       x = "Okręg Wyborczy (Wojewodztwo)", 
       y = "Średnia liczba wykonanych przerwań") + coord_flip()  + 
  facet_wrap(~Wyksztalcenie, ncol = 2)

ggplot(na.omit(tmpd), aes(x = Województwo)) +
  geom_bar(aes(y = SredniaPrzerwanOtrzymanych, fill = Województwo), stat="identity") +
  labs(title = "Średnia liczba otrzymanych przerwań ze względu na wykształcenie i okręg wyborczy posła", 
       x = "Okręg Wyborczy (Wojewodztwo)", 
       y = "Średnia liczba otrzymanych przerwań") + coord_flip()  + 
  facet_wrap(~Wyksztalcenie, ncol = 2)

ggplot(na.omit(tmpd), aes(x = Województwo)) +
  geom_bar(aes(y = SredniaWypowiedzi, fill = Województwo), stat="identity") +
  labs(title = "Średnia liczba wypowiedzi ze względu na wykształcenie i okręg wyborczy posła", 
       x = "Okręg Wyborczy (Wojewodztwo)", 
       y = "Średnia liczba wypowiedzi") + coord_flip()  + 
  facet_wrap(~Wyksztalcenie, ncol = 2)

