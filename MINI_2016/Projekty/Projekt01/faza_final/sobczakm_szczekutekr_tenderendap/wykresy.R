source("install.R")
source("libs.R")

load("allVotes.RData")
load("allStatements.RData")
load("dane.RData")
load("przerwania.RData")

WypowiedziPoslow <- as.data.frame(table(allStatements$ImieNazwisko))
colnames(WypowiedziPoslow)[1] = "ImieNazwisko";
colnames(WypowiedziPoslow)[2] = "LiczbaWypowiedzi";

PrzerwaniaWykonanePoslow <- as.data.frame(table(przerwania$kto))
colnames(PrzerwaniaWykonanePoslow)[1] = "ImieNazwisko";
colnames(PrzerwaniaWykonanePoslow)[2] = "LiczbaPrzerwanWykonanych";

PrzerwaniaOtrzymanePoslow <- as.data.frame(table(przerwania$komu))
colnames(PrzerwaniaOtrzymanePoslow)[1] = "ImieNazwisko";
colnames(PrzerwaniaOtrzymanePoslow)[2] = "LiczbaPrzerwanOtrzymanych";

dane <- join(dane, WypowiedziPoslow, type = "left",  by=c("ImieNazwisko"))
dane <- join(dane, PrzerwaniaWykonanePoslow, type = "left",  by=c("ImieNazwisko"))
dane <- join(dane, PrzerwaniaOtrzymanePoslow, type = "left",  by=c("ImieNazwisko"))

dane[is.na(dane$LiczbaWypowiedzi),]$LiczbaWypowiedzi <- 0
dane[is.na(dane$LiczbaPrzerwanWykonanych),]$LiczbaPrzerwanWykonanych <- 0
dane[is.na(dane$LiczbaPrzerwanOtrzymanych),]$LiczbaPrzerwanOtrzymanych <- 0

dane$Wyksztalcenie <- factor(dane$Wyksztalcenie, levels = c(
    "zasadnicze zawodowe",
    "średnie zawodowe",
    "średnie ogólne",
    "średnie policelane/pomaturalne",
    "wyższe"
))
dane2 <- melt(dane, id.vars=c("ImieNazwisko", "Wyksztalcenie", "Klub", "KlubSkrot"), 
              measure.vars=c("LiczbaWypowiedzi", "LiczbaPrzerwanWykonanych", "LiczbaPrzerwanOtrzymanych"))

# Liczba wypowiedzi --------------------------------------------------------------

## Liczba wypowiedzi wzgledem wyksztalcenia (grupowanie po partii) --------
ggplot(na.omit(dane), 
       aes(x = reorder(Wyksztalcenie, LiczbaWypowiedzi, function(x) -sum(x)),
           shape=c("Liczba wypowiedzi posła"),
           width=.75)) +
  geom_bar(aes(y = LiczbaWypowiedzi, fill=Wyksztalcenie), stat="identity") +
  geom_jitter(aes(y = LiczbaWypowiedzi), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Liczba wypowiedzi ze względu na wykształcenie posła", 
       x = "", 
       y = "") + 
  facet_wrap(~Klub, ncol = 2) +
  theme_bw() +
  coord_flip()


## Liczba wypowiedzi wzgledem wyksztalcenia (grupowanie po wyksztalceniu) --------
ggplot(na.omit(dane), 
       aes(x = reorder(KlubSkrot, LiczbaWypowiedzi, function(x) -sum(x)),
           shape=c("Liczba wypowiedzi posła"),
           width=.75)) +
  geom_bar(aes(y = LiczbaWypowiedzi, fill=Klub), stat="identity") +
  geom_jitter(aes(y = LiczbaWypowiedzi), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Liczba wypowiedzi ze względu na wykształcenie posła", 
       x = "", 
       y = "") + 
  facet_wrap(~Wyksztalcenie, ncol = 2) +
  theme_bw() +
  coord_flip()
  

## Srednia liczba wypowiedzi wzgledem wyksztalcenia (grupowanie po wyksztalceniu) --------
ggplot(na.omit(dane), 
       aes(x = reorder(KlubSkrot, LiczbaWypowiedzi, function(x) -mean(x)),
           y = LiczbaWypowiedzi, shape=c("Liczba wypowiedzi posła"),
           width=.75)) +
  stat_summary(fun.y="mean", geom="bar", aes(fill=Klub)) +
  geom_jitter(aes(y = LiczbaWypowiedzi), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Średnia liczba wypowiedzi ze względu na wykształcenie posła", 
       x = "", 
       y = "") + 
  facet_wrap(~Wyksztalcenie, ncol = 2) +
  theme_bw() +
  coord_flip()


## Srednia liczba wypowiedzi wzgledem wyksztalcenia (grupowanie po partii) --------
ggplot(na.omit(dane), 
       aes(x = reorder(Wyksztalcenie, LiczbaWypowiedzi, function(x) -mean(x)),
           y = LiczbaWypowiedzi, shape=c("Liczba wypowiedzi posła"),
           width=.75)) +
  stat_summary(fun.y="mean", geom="bar", aes(fill=Wyksztalcenie)) +
  geom_jitter(aes(y = LiczbaWypowiedzi), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Średnia liczba wypowiedzi ze względu na wykształcenie posła", 
       x = "", 
       y = "") + 
  facet_wrap(~Klub, ncol = 2) +
  theme_bw() +
  coord_flip()


# Liczba przewań wykonanych --------------------------------------------------------------

## Liczba przerwan wykonanych przez poslow wzgledem wyksztalcenia (grupowanie po partii) --------
ggplot(na.omit(dane), 
       aes(x = reorder(Wyksztalcenie, LiczbaPrzerwanWykonanych, function(x) -sum(x)),
           shape=c("Liczba przerwań wykonanych\n przez posła"),
           width=.75)) +
  geom_bar(aes(y = LiczbaPrzerwanWykonanych, fill=Wyksztalcenie), stat="identity") +
  geom_jitter(aes(y = LiczbaPrzerwanWykonanych), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Liczba przerwań wykonanych przez posłów ze względu na wykształcenie", 
       x = "", 
       y = "") + 
  facet_wrap(~Klub, ncol = 2) +
  theme_bw() +
  coord_flip()


## Liczba przerwan wykonanych przez poslow wzgledem wyksztalcenia (grupowanie po wyksztalceniu) --------
ggplot(na.omit(dane), 
       aes(x = reorder(KlubSkrot, LiczbaPrzerwanWykonanych, function(x) -sum(x)),
           shape=c("Liczba przerwań wykonanych\n przez posła"),
           width=.75)) +
  geom_bar(aes(y = LiczbaPrzerwanWykonanych, fill=Klub), stat="identity") +
  geom_jitter(aes(y = LiczbaPrzerwanWykonanych), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Liczba przerwań wykonanych przez posłów ze względu na wykształcenie", 
       x = "", 
       y = "") + 
  facet_wrap(~Wyksztalcenie, ncol = 2) +
  theme_bw() +
  coord_flip()

## Srednia liczba przerwan wykonanych przez poslow wzgledem wyksztalcenia (grupowanie po wyksztalceniu) --------
ggplot(na.omit(dane), 
       aes(x = reorder(KlubSkrot, LiczbaPrzerwanWykonanych, function(x) -mean(x)),
           y = LiczbaPrzerwanWykonanych, shape=c("Liczba przerwań wykonanych\n przez posła"),
           width=.75)) +
  stat_summary(fun.y="mean", geom="bar", aes(fill=Klub)) +
  geom_jitter(aes(y = LiczbaPrzerwanWykonanych), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Średnia liczba przerwań wykonanych przez posłów ze względu na wykształcenie", 
       x = "", 
       y = "") + 
  facet_wrap(~Wyksztalcenie, ncol = 2) +
  theme_bw() +
  coord_flip()


## Srednia liczba przerwan wykonanych przez poslow wyksztalcenia (grupowanie po partii) --------
ggplot(na.omit(dane), 
       aes(x = reorder(Wyksztalcenie, LiczbaPrzerwanWykonanych, function(x) -mean(x)),
           y = LiczbaPrzerwanWykonanych, shape=c("Liczba przerwań wykonanych\n przez posła"),
           width=.75)) +
  stat_summary(fun.y="mean", geom="bar", aes(fill=Wyksztalcenie)) +
  geom_jitter(aes(y = LiczbaPrzerwanWykonanych), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Średnia liczba przerwań wykonanych przez posłów ze względu na wykształcenie", 
       x = "", 
       y = "") + 
  facet_wrap(~Klub, ncol = 2) +
  theme_bw() +
  coord_flip()

  
# Liczba przewań otrzymanych --------------------------------------------------------------
  
## Liczba przerwan otrzymanych przez poslow wzgledem wyksztalcenia (grupowanie po partii) --------
ggplot(na.omit(dane), 
       aes(x = reorder(Wyksztalcenie, LiczbaPrzerwanOtrzymanych, function(x) -sum(x)),
           shape=c("Liczba przerwań otrzymanych\n przez posła"),
           width=.75)) +
  geom_bar(aes(y = LiczbaPrzerwanOtrzymanych, fill=Wyksztalcenie), stat="identity") +
  geom_jitter(aes(y = LiczbaPrzerwanOtrzymanych), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Liczba przerwań otrzymanych przez posłów ze względu na wykształcenie", 
       x = "", 
       y = "") + 
  facet_wrap(~Klub, ncol = 2) +
  theme_bw() +
  coord_flip()


## Liczba przerwan otrzymanych przez poslow wzgledem wyksztalcenia (grupowanie po wyksztalceniu) --------
ggplot(na.omit(dane), 
       aes(x = reorder(KlubSkrot, LiczbaPrzerwanOtrzymanych, function(x) -sum(x)),
           shape=c("Liczba przerwań otrzymanych\n przez posła"),
           width=.75)) +
  geom_bar(aes(y = LiczbaPrzerwanOtrzymanych, fill=Klub), stat="identity") +
  geom_jitter(aes(y = LiczbaPrzerwanOtrzymanych), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Liczba przerwań otrzymanych przez posłów ze względu na wykształcenie", 
       x = "", 
       y = "") + 
  facet_wrap(~Wyksztalcenie, ncol = 2) +
  theme_bw() +
  coord_flip()


## Srednia liczba przerwan otrzymanych przez poslow wzgledem wyksztalcenia (grupowanie po wyksztalceniu) --------
ggplot(na.omit(dane), 
       aes(x = reorder(KlubSkrot, LiczbaPrzerwanOtrzymanych, function(x) -mean(x)),
           y = LiczbaPrzerwanOtrzymanych, shape=c("Liczba przerwań otrzymanych\n przez posła"),
           width=.75)) +
  stat_summary(fun.y="mean", geom="bar", aes(fill=Klub)) +
  geom_jitter(aes(y = LiczbaPrzerwanOtrzymanych), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Średnia liczba przerwań otrzymanych przez posłów ze względu na wykształcenie", 
       x = "", 
       y = "") + 
  facet_wrap(~Wyksztalcenie, ncol = 2) +
  theme_bw() +
  coord_flip()


## Srednia liczba przerwan otrzymanych przez poslow wyksztalcenia (grupowanie po partii) --------
ggplot(na.omit(dane), 
       aes(x = reorder(Wyksztalcenie, LiczbaPrzerwanOtrzymanych, function(x) -mean(x)),
           y = LiczbaPrzerwanOtrzymanych, shape=c("Liczba przerwań otrzymanych\n przez posła"),
           width=.75)) +
  stat_summary(fun.y="mean", geom="bar", aes(fill=Wyksztalcenie)) +
  geom_jitter(aes(y = LiczbaPrzerwanOtrzymanych), size=0.8, alpha = 0.5) + 
  scale_shape_manual(name="Oznaczenia", values=c(16)) +
  labs(title = "Średnia liczba przerwań otrzymanych przez posłów ze względu na wykształcenie", 
       x = "", 
       y = "") + 
  facet_wrap(~Klub, ncol = 2) +
  theme_bw() +
  coord_flip()
