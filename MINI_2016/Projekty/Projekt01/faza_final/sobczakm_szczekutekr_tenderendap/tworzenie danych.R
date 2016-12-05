source("install.R")
source("libs.R")

dane <- read.csv2("poslowie.csv", sep =",", encoding = "UTF-8");
dane$ImieNazwisko <- as.character(dane$ImieNazwisko)

allVotes <- get_filtered_votes(terms_of_office = c(8,8))
colnames(allVotes)[1] <- "ImieNazwisko"
allVotes <- allVotes %>% 
  mutate(ImieNazwisko = gsub(ImieNazwisko, 
                             pattern="(\\S+)\\s+(\\S+)(\\s*)(\\S*)",
                             replacement = "\\2\\3\\4 \\1") )

allVotes$ImieNazwisko <- as.character(allVotes$ImieNazwisko)
allVotes <- join(allVotes, dane,
                 type = "left",  by=c("ImieNazwisko"))

allStatements <- get_statements_table() 
allStatements <- allStatements %>% 
  filter(nr_term_of_office == "8") %>%
  mutate(surname_name=gsub(surname_name, pattern="Poseł Sprawozdawca ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Poseł ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Infrastruktury i Budownictwa ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Nauki i Szkolnictwa Wyższego ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Sprawiedliwości ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Edukacji Narodowej ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Finansów ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Spraw Zagranicznych ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Spraw Wewnętrznych i Administracji ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Rodziny, Pracy i Polityki Społecznej ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Energii ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Zdrowia ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Sekretarz ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Rolnictwa i Rozwoju Wsi ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Gospodarki Morskiej i Żeglugi Śródlądowej ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Sportu i Turystyki ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Iwona Ewa Arent", replacement="Iwona Arent")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Kultury i Dziedzictwa Narodowego ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Środowiska ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister - Członek Rady Ministrów ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Cyfryzacji ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Wiceprezes Rady Ministrów  ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="\r\n", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Wiceprezes Rady Ministrów Minister Kultury i Dziedzictwa Narodowego ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Obrony Narodowej ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Prokurator Generalny ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Skarbu Państwa ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Prezes Rady Ministrów ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Minister Rozwoju Regionalnego ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Wiceprezes Rady Ministrów ", replacement="")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Kinga Gajewska-Płochocka", replacement="Kinga Gajewska")) %>%
  mutate(surname_name=gsub(surname_name, pattern="Kinga Gajewska", replacement="Kinga Gajewska-Płochocka"))

allStatements <- allStatements[ , !names(allStatements) %in% c("titles_order_points","statement")]

colnames(allStatements)[3] <- "ImieNazwisko"
allStatements$ImieNazwisko <- as.character(allStatements$ImieNazwisko)
allStatements <- join(allStatements, dane,
                      type = "left",  by=c("ImieNazwisko"))

przerwania <- read.csv2("przerwania2.csv", sep =",", encoding = "UTF-8");
przerwania$kto <- as.character(przerwania$kto)
przerwania$komu <- as.character(przerwania$komu)
tmp <- dane
colnames(tmp)[colnames(tmp)=="ImieNazwisko"] <- "kto"
przerwania <- join(przerwania, tmp,
                   type = "left",  by=c("kto"))
colnames(tmp)[colnames(tmp)=="kto"] <- "komu"
colnames(tmp)[colnames(tmp)=="OkregNr"] <- "komu_OkregNr"
colnames(tmp)[colnames(tmp)=="OkregMiejscowość"] <- "komu_OkregMiejscowość"
colnames(tmp)[colnames(tmp)=="DataUrodzenia"] <- "komu_DataUrodzenia"
colnames(tmp)[colnames(tmp)=="MiejsceUrodzenia"] <- "komu_MiejsceUrodzenia"
colnames(tmp)[colnames(tmp)=="Wyksztalcenie"] <- "komu_Wyksztalcenie"
colnames(tmp)[colnames(tmp)=="Wybrany"] <- "komu_Wybrany"
colnames(tmp)[colnames(tmp)=="Klub"] <- "komu_Klub"
colnames(tmp)[colnames(tmp)=="KlubSkrot"] <- "komu_KlubSkrot"
colnames(tmp)[colnames(tmp)=="Lista"] <- "komu_Lista"
przerwania <- join(przerwania, tmp,
                   type = "left",  by=c("komu"))

save(przerwania, file="przerwania.RData")

save(allVotes, file="allVotes.RData")
save(allStatements, file="allStatements.RData")
save(dane, file="dane.RData")
save(przerwania, file="przerwania.RData")