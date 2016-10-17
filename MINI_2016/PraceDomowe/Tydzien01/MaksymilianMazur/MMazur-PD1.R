

Statystyki <- read.csv2("C:/Users/Max/Desktop/HendoBis.csv", sep=';', header=TRUE)

ggplot(Statystyki,aes(x = Round)) + 
  geom_bar(aes(weight = StrikesThrown, fill = Fighter), position = "dodge") +
  geom_bar(aes(weight = SignStrikesLanded, fill = Fighter), position = "dodge") + 
  scale_fill_manual(values = c(alpha("#1F78B4", 0.6), alpha("#FF0000", 0.6))) +
  ylab("Strikes Thrown/Landed")