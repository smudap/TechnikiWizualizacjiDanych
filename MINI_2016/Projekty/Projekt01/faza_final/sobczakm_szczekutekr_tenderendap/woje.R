source("install.R")
source("libs.R")

load("allVotes.RData")
load("allStatements.RData")
load("poslowie.RData")
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

poslowie <- read.csv2("poslowie.csv", sep =",", encoding = "UTF-8");
poslowie$ImieNazwisko <- as.character(poslowie$ImieNazwisko)

poslowie <- join(poslowie, WypowiedziPoslow, type = "left",  by=c("ImieNazwisko"))
poslowie <- join(poslowie, PrzerwaniaWykonanePoslow, type = "left",  by=c("ImieNazwisko"))
poslowie <- join(poslowie, PrzerwaniaOtrzymanePoslow, type = "left",  by=c("ImieNazwisko"))

poslowie[is.na(poslowie$LiczbaWypowiedzi),]$LiczbaWypowiedzi <- 0
poslowie[is.na(poslowie$LiczbaPrzerwanWykonanych),]$LiczbaPrzerwanWykonanych <- 0
poslowie[is.na(poslowie$LiczbaPrzerwanOtrzymanych),]$LiczbaPrzerwanOtrzymanych <- 0

okregiMiejscowosci <- as.data.frame(table(poslowie$OkregMiejscowość))

WojewodztwaDoOkregow = c("podlaskie", "slaskie", "kujawsko-pomorskie", "lubelskie", "malopolskie", 
                         "slaskie", "warminsko-mazurskie", "pomorskie", "pomorskie", "slaskie", 
                         "wielkopolskie", "slaskie", "swietokrzyskie", "wielkopolskie", "zachodniopomorskie", 
                         "malopolskie", "podkarpackie", "dolnoslaskie", "lubelskie", "lodzkie", 
                         "malopolskie", "warminsko-mazurskie", "opolskie", "wielkopolskie", "lodzkie", 
                         "mazowieckie", "wielkopolskie", "mazowieckie", "slaskie", "podkarpackie", 
                         "mazowieckie", "lodzkie", "slaskie", "zachodniopomorskie", "malopolskie", 
                         "kujawsko-pomorskie", "dolnoslaskie", "mazowieckie", "dolnoslaskie", "lubuskie")

okregiMiejscowosci$wojewodztwo <- WojewodztwaDoOkregow

colnames(okregiMiejscowosci)[colnames(okregiMiejscowosci)=="Var1"] <- "OkregMiejscowość"

poslowie <- join(poslowie, okregiMiejscowosci, type = "inner", by=c("OkregMiejscowość"))

#przerwanNaWojewodztwo <- poslowie[,c("wojewodztwo", "LiczbaPrzerwanWykonanych")]

poslowieBezNA <- poslowie[complete.cases(poslowie),]

# Liczba posłów na województwo (suma/ilość posłów z danego województwa)
poslowNaWojewodztwo <- as.data.frame(table(poslowie$wojewodztwo))

# Liczba przerwań na województwo (suma)
przerwanWykonanychNaWojewodztwo <- aggregate(poslowieBezNA$LiczbaPrzerwanWykonanych, by=list(Category=poslowieBezNA$wojewodztwo), FUN=sum)
colnames(przerwanWykonanychNaWojewodztwo) <- c("Województwo", "LiczbaPrzerwańWykonanych")
przerwanOtrzymanychNaWojewodztwo <- aggregate(poslowieBezNA$LiczbaPrzerwanOtrzymanych, by=list(Category=poslowieBezNA$wojewodztwo), FUN=sum)
colnames(przerwanOtrzymanychNaWojewodztwo) <- c("Województwo", "LiczbaPrzerwańOtrzymanych")

# Średnia przerwań na województwo
sredniaPrzerwanWykonanychNaWojewodztwo <- przerwanWykonanychNaWojewodztwo
sredniaPrzerwanWykonanychNaWojewodztwo$ŚredniaPrzerwańWykonanych <- przerwanWykonanychNaWojewodztwo$LiczbaPrzerwańWykonanych/poslowNaWojewodztwo$Freq

sredniaPrzerwanOtrzymanychNaWojewodztwo <- przerwanOtrzymanychNaWojewodztwo
sredniaPrzerwanOtrzymanychNaWojewodztwo$ŚredniaPrzerwańOtrzymanych <- przerwanOtrzymanychNaWojewodztwo$LiczbaPrzerwańOtrzymanych/poslowNaWojewodztwo$Freq

# Liczba przerwań na województwo (suma)
wypowiedziNaWojewodztwo <-aggregate(poslowieBezNA$LiczbaWypowiedzi, by=list(Category=poslowieBezNA$wojewodztwo), FUN=sum)
colnames(wypowiedziNaWojewodztwo) <- c("Województwo", "LiczbaWypowiedzi")

# Średnia przerwań na województwo
sredniaWypowiedziNaWojewodztwo <- wypowiedziNaWojewodztwo
sredniaWypowiedziNaWojewodztwo$ŚredniaWypowiedzi <- wypowiedziNaWojewodztwo$LiczbaWypowiedzi/poslowNaWojewodztwo$Freq

# Rysowanie na mapce
library(maptools)
#poland.map <- readShapeSpatial('./wojewodztwa/województwa.shp')
poland.map <- readShapePoly('./wojewodztwa/województwa.shp',
                            proj4string=CRS("+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs"))

poland.map@data <- poland.map@data[ , c(6,16)]
names(poland.map@data) <- c("nazwa", "powierzchnia") 
poland.map@data$nazwa <- c("opolskie", "swietokrzyskie", "kujawsko-pomorskie", "mazowieckie", "pomorskie", "slaskie",
                           "warminsko-mazurskie", "zachodniopomorskie", "dolnoslaskie", "wielkopolskie", "lodzkie",
                           "podlaskie", "malopolskie", "lubuskie", "podkarpackie", "lubelskie")

poland.map.gg <- fortify(poland.map, region="nazwa")

ggplot(sredniaPrzerwanWykonanychNaWojewodztwo, aes(fill = LiczbaPrzerwańWykonanych)) +
  geom_map(aes(map_id = Województwo), map = poland.map.gg) +
  expand_limits(x = poland.map.gg$long, y = poland.map.gg$lat) +
  scale_fill_continuous(name = "Liczba przerwań \n [per poseł]") +
  ggtitle("Liczba przerwań wykonanych na dane województwo") +
  theme(axis.title=element_blank(),
        axis.text=element_blank(),
        axis.ticks=element_blank())

ggplot(sredniaPrzerwanWykonanychNaWojewodztwo, aes(fill = ŚredniaPrzerwańWykonanych)) +
  geom_map(aes(map_id = Województwo), map = poland.map.gg) +
  expand_limits(x = poland.map.gg$long, y = poland.map.gg$lat) +
  scale_fill_continuous(name = "Średnia przerwań \n [per poseł]") +
  ggtitle("Średnia przerwań wykonanych per województwo") +
  theme(axis.title=element_blank(),
        axis.text=element_blank(),
        axis.ticks=element_blank())

ggplot(sredniaPrzerwanOtrzymanychNaWojewodztwo, aes(fill = LiczbaPrzerwańOtrzymanych)) +
  geom_map(aes(map_id = Województwo), map = poland.map.gg) +
  expand_limits(x = poland.map.gg$long, y = poland.map.gg$lat) +
  scale_fill_continuous(name = "Liczba przerwań \n [per poseł]") +
  ggtitle("Liczba przerwań otrzymanych na dane województwo") +
theme(axis.title=element_blank(),
      axis.text=element_blank(),
      axis.ticks=element_blank())

ggplot(sredniaPrzerwanOtrzymanychNaWojewodztwo, aes(fill = ŚredniaPrzerwańOtrzymanych)) +
  geom_map(aes(map_id = Województwo), map = poland.map.gg) +
  expand_limits(x = poland.map.gg$long, y = poland.map.gg$lat) +
  scale_fill_continuous(name = "Średnia przerwań \n [per poseł]") +
  ggtitle("Średnia przerwań otrzymanych per województwo") +
  theme(axis.title=element_blank(),
        axis.text=element_blank(),
        axis.ticks=element_blank())

ggplot(sredniaWypowiedziNaWojewodztwo, aes(fill = LiczbaWypowiedzi)) +
  geom_map(aes(map_id = Województwo), map = poland.map.gg) +
  expand_limits(x = poland.map.gg$long, y = poland.map.gg$lat) +
  scale_fill_continuous(name = "Liczba wypowiedzi \n [per poseł]") +
  ggtitle("Liczba wypowiedzi posła per województwo") +
  theme(axis.title=element_blank(),
        axis.text=element_blank(),
        axis.ticks=element_blank())

ggplot(sredniaWypowiedziNaWojewodztwo, aes(fill = ŚredniaWypowiedzi)) +
  geom_map(aes(map_id = Województwo), map = poland.map.gg) +
  expand_limits(x = poland.map.gg$long, y = poland.map.gg$lat) +
  scale_fill_continuous(name = "Średnia wypowiedzi \n [per poseł]") +
  ggtitle("Średnia wypowiedzi posła per województwo") +
  theme(axis.title=element_blank(),
        axis.text=element_blank(),
        axis.ticks=element_blank())


# Miejsca urodzenia posłów
miejscaUrodzenia <- as.data.frame(table(poslowie$MiejsceUrodzenia))

