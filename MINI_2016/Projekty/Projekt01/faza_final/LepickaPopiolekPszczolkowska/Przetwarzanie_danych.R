library(sejmRP)
library(dplyr)


# Wczytujemy interesujace nas dane z 8 kadencji.
dane<-get_filtered_votes( dates = c("2015-11-12", "2016-10-04"))


# Wyznaczamy aktualna liste poslow
ostatnie_posiedzenie<-dane %>% 
  filter(date_meeting=="2016-10-04", nr_voting==2)
aktualna_lista<-ostatnie_posiedzenie$surname_name
dane1<-dane[which(dane$surname_name %in% aktualna_lista),]

save(dane1,file=file.path(getwd(),"dane1.Rdata"))

# Zliczamy nieobecnosci kazdego posla
nieobecni <- dane1%>% 
  filter(vote=="Nieobecny") %>%
  group_by(surname_name, club) %>%
  summarise(count=n()) 

# Poslowie obecni na wszystkich glosowaniach
brak_nieobecnosci<-dane1 %>% 
  filter(vote!="Nieobecny")%>%
  group_by(surname_name, club) %>%
  summarise(count=n()) 
brak_nieobecnosci<-brak_nieobecnosci[which(brak_nieobecnosci$count==1912),]
brak_nieobecnosci$count<-0

# Poslowie bedacych w kilku partiach w 8 kadencji
w_kilku_partiach<-sort(table(nieobecni$surname_name), decreasing = T)[1:11]
w_kilku_partiach<-labels(w_kilku_partiach)[[1]]

# Poslowie nieobecni na glosowaniach, bedacy w kilku partiach
nieobecny_kilka_partii<-dane1%>% 
  filter(vote=="Nieobecny",surname_name %in% w_kilku_partiach ) %>%
  group_by(surname_name) %>%
  summarise(count=n()) 
kolejnosc<-sort.list(nieobecny_kilka_partii$surname_name)

# Ostatnia partia poslow przechodzacych miedzy klubami
ostatnia_partia<- ostatnie_posiedzenie[which(ostatnie_posiedzenie$surname_name %in% w_kilku_partiach), c(1,3)]
kolejnosc1<-sort.list(ostatnia_partia$surname_name)
w_kilku_partiach2<-cbind(ostatnia_partia[kolejnosc1,], nieobecny_kilka_partii[kolejnosc,"count"])
nieobecni<-nieobecni[-which(nieobecni$surname_name %in% w_kilku_partiach),]

# Aktualna lista nieobecnosci
lista_nieobecnosci<-rbind(nieobecni, w_kilku_partiach2, brak_nieobecnosci)

# Na ilu glosowaniach byl poszczegolny posel
ile_glosowan<-dane1%>% 
  group_by(surname_name) %>%
  summarise(ile=n()) 
lista_nieobecnosci1<-merge(x = lista_nieobecnosci, y = ile_glosowan, by = "surname_name", all.x = TRUE)
lista_nieobecnosci1$procent<-round(100*lista_nieobecnosci1$count/lista_nieobecnosci1$ile, 2)

# Srednia nieobecnosci w partii
srednia1<-lista_nieobecnosci1%>% 
  group_by(club) %>%
  summarise(srednia=mean(procent)) 

# Lista nieobecnosci wraz ze srednia nieobecnosci w kazdej partii
lista_nieobecnosci2<-merge(x = lista_nieobecnosci1, y = srednia1, by = "club", all.x = TRUE)
lista_nieobecnosci2$club<-reorder(lista_nieobecnosci2$club,lista_nieobecnosci2$count, FUN=mean)

#A<-sort.list(lista_nieobecnosci2$count)
#C<-lista_nieobecnosci2[A[c(460,458,457,456,453,451,437,430)],]


save(lista_nieobecnosci2,file=file.path(getwd(),"lista_nieobecnosci2.Rdata"))

nieobecni <- dane1%>% 
  filter(vote=="Nieobecny") %>%
  group_by(surname_name, club) %>%
  summarise(count=n()) 


ile_glosowan2<-dane1%>% 
  group_by(surname_name,club) %>%
  summarise(ile=n())

# Nieobecni poslowie zmieniajacy partie wraz z procentem nieobecnosci
zmiana_club<- nieobecni[which(nieobecni$surname_name %in% w_kilku_partiach),]

nieobecni_club<-merge(x=zmiana_club, y=ile_glosowan2, by=c("surname_name", "club"), all.x=TRUE)

nieobecni_club$procent<-round(100*nieobecni_club$count/nieobecni_club$ile,2)

nieobecni_club$kolejnosc<-c(3,2,1,2,1,3,2,1,2,1,1,3,2,1,2,2,1,2,1,1,2,1,2,1,2)

colnames(nieobecni_club)<-c("Poseł", "Partia","count", "ile", "procent","kolejnosc")

save(nieobecni_club,file=file.path(getwd(),"nieobecni_club.Rdata"))
