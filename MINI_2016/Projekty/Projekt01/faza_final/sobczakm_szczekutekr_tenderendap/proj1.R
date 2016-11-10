source("install.R")
source("libs.R")

dane <- read.csv2("poslowie.csv", sep =",", encoding = "UTF-8");
dane$ImieNazwisko <- as.character(dane$ImieNazwisko)

load("przerwania.RData")
load("allVotes.RData")
load("allStatements.RData")

#rozkład wykształcenia posłów
dane1 <- as.data.frame(table(dane$Wyksztalcenie))
dd<-dane1
dd[order(dd$Var1),]
#Ilość wypowiedzi względem wykształcenia
dane2 <- as.data.frame(table(allStatements$Wyksztalcenie))
x <- dane2[2:nrow(dane2),]
y <-matrix(c(dane1[3,1],dane1[4,1],dane1[2,1],dane1[5,1],dane1[1,2],dane1[3,2],dane1[4,2],dane1[2,2],dane1[5,2],dane1[1,2]), nrow=5)
colnames(y) <- c('Var1', 'Freq') 
y.frame <- as.data.frame(y)

#Średnia ilość wypowiedzi względem wykształcenia
# ilość wypowiedzi podzielona przez ilość posłów w danej grupie
dane3 <- x
dane3$Freq <- x$Freq/y.frame$Freq

#rozkład posłóW względem okręgów wyborczych
dane4 <- as.data.frame(table(dane$OkregMiejscowość))

#Ilość wypowiedzi względem okręgów wyborczych
dane5 <- as.data.frame(table(allStatements$OkregMiejscowość))

#Średnia ilość wypowiedzi względem okręgu wyborczego
# ilość wypowiedzi podzielona przez ilość posłów w danej grupie
dane6 <- dane4
dane6$Freq <- dane5$Freq/dane4$Freq


nieobecni <- filter(allVotes,
            vote == "Nieobecny")
head(nieobecni)

#rozkład wykształcenia posłów
dane01 <- as.data.frame(table(dane$Wyksztalcenie))
#Ilość nieobecnosi względem wykształcenia
dane02 <- as.data.frame(table(nieobecni$Wyksztalcenie))
x2 <- dane02[2:nrow(dane02),]

#Średnia ilość niobecnosci względem wykształcenia
# ilość wypowiedzi podzielona przez ilość posłów w danej grupie
dane03 <- x2
dane03$Freq <- x2$Freq/y.frame$Freq

#rozkład posłóW względem okręgów wyborczych
dane04 <- as.data.frame(table(dane$OkregMiejscowość))

#Ilość niobecnosci względem okręgów wyborczych
dane05 <- as.data.frame(table(nieobecni$OkregMiejscowość))

#Średnia ilość niobecnosci względem okręgu wyborczego
# ilość wypowiedzi podzielona przez ilość posłów w danej grupie
dane06 <- dane04
dane06$Freq <- dane05$Freq/dane04$Freq

#prosty podstawowy wykres |DO ROZBÓDOWY|
# wystarczy zmienić numer w danych poniżej do zmiany wykresu
ggplot(dane1, aes(y=Freq,x = Var1, width=.75)) +
 geom_bar(stat="identity") + ylab("liczba") + xlab("wykształcenie") + 
  ggtitle("Liczba posłów względem wykształcenia") + coord_flip()
  #theme(axis.text.x = element_text(angle = 20, hjust = 0.5, vjust = 0.5))

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
ggplot(dane6, aes(y=Freq,x = Var1, width=.75, fill=wojewodztwo))+ ylab("średnia") + xlab("okręg") + 
  geom_bar(stat="identity") + coord_flip() + ggtitle("Średnia liczba wystopień z okregów wyborczych") #można dodać kolory po województwach

ggplot(dane4, aes(y=Freq,x = Var1, width=.75, fill=wojewodztwo))+ ylab("liczba") + xlab("okręg") + 
  geom_bar(stat="identity") + coord_flip() + ggtitle("Liczba posłów z okregów wyborczych") #można dodać kolory po województwach

ggplot(dane3, aes(y=Freq,x = Var1, width=.75)) +
  geom_bar(stat="identity") + ylab("liczba wystąpień") + xlab("wykształcenie") + 
  ggtitle("Średnia liczba wystąpień posłów względem wykształcenia") + coord_flip()

ggplot(dane03, aes(y=Freq,x = Var1, width=.75)) +
  geom_bar(stat="identity") + ylab("liczba nieobecności") + xlab("wykształcenie") + 
  ggtitle("Średnia liczba niebecności posłów względem wykształcenia") + coord_flip()