allStatementsW <- allStatements %>% 
  mutate(DataUrodzenia = gsub(DataUrodzenia, 
                             pattern=".*-",
                             replacement = "") )

colnames(allStatementsW)[colnames(allStatementsW)=="DataUrodzenia"] <- "Rocznik"

allVotesW <- allVotes %>% 
  mutate(DataUrodzenia = gsub(DataUrodzenia, 
                              pattern=".*-",
                              replacement = "") )

colnames(allVotesW)[colnames(allVotesW)=="DataUrodzenia"] <- "Rocznik"


daneW <- dane %>% 
  mutate(DataUrodzenia = gsub(DataUrodzenia, 
                              pattern=".*-",
                              replacement = "") )
colnames(daneW)[colnames(daneW)=="DataUrodzenia"] <- "Rocznik"

przerwaniaW <- przerwania %>% 
  mutate(DataUrodzenia = gsub(DataUrodzenia, pattern=".*-", replacement = "") ) %>% 
  mutate(komu_DataUrodzenia = gsub(komu_DataUrodzenia, pattern=".*-", replacement = "") )
colnames(przerwaniaW)[colnames(przerwaniaW)=="DataUrodzenia"] <- "Rocznik"
colnames(przerwaniaW)[colnames(przerwaniaW)=="komu_DataUrodzenia"] <- "komu_Rocznik"


wiek <- filter(allStatementsW,
                  Wyksztalcenie =="wyższe")
daneWiek <- filter(daneW,
                   Wyksztalcenie =="wyższe")

wiek01 <- as.data.frame(table(daneWiek$Rocznik))

wiek02 <- as.data.frame(table(wiek$Rocznik))

wiek03 <- wiek01
wiek03$Freq <- wiek02$Freq/wiek01$Freq

ggplot(wiek03, aes(y=Freq,x = Var1, width=.75)) +
  geom_bar(stat="identity") 

wiek <- filter(allStatementsW,
               OkregMiejscowość =="Warszawa")
daneWiek <- filter(daneW,
               OkregMiejscowość =="Warszawa")

wiek01 <- as.data.frame(table(daneWiek$Rocznik))

wiek02 <- as.data.frame(table(wiek$Rocznik))

wiek03 <- wiek01
wiek03$Freq <- wiek02$Freq/wiek01$Freq

ggplot(wiek03, aes(y=Freq,x = Var1, width=.75)) +
  geom_bar(stat="identity") 

wiekN <-  filter(allVotesW,
                 vote =="Nieobecny")

wiek01 <- as.data.frame(table(daneW$Rocznik))

wiek02 <- as.data.frame(table(wiekN$Rocznik))

wiek03 <- wiek01
wiek03$Freq <- wiek02$Freq/wiek01$Freq

ggplot(wiek01, aes(y=Freq,x = Var1, width=.75)) +
  geom_bar(stat="identity") +
  labs(title = "Liczba posłów ze względu na rocznik urodzenia", 
       x = "Rocznik", 
       y = "Liczba Posłów") + 
  theme(axis.text.x = element_text(angle = 45, hjust = 0.5, vjust = 0.5))

ggplot(wiek02, aes(y=Freq,x = Var1, width=.75)) +
  geom_bar(stat="identity") +
  labs(title = "Liczba nieobecności ze względu na rocznik urodzenia posła", 
       x = "Rocznik", 
       y = "Liczba niobecności") + 
  theme(axis.text.x = element_text(angle = 45, hjust = 0.5, vjust = 0.5))

ggplot(wiek03, aes(y=Freq,x = Var1, width=.75)) +
  geom_bar(stat="identity") +
  labs(title = "Średnia liczba nieobecności ze względu na rocznik urodzenia posła", 
       x = "Rocznik", 
       y = "Średnia liczba niobecności") + 
  theme(axis.text.x = element_text(angle = 45, hjust = 0.5, vjust = 0.5))
