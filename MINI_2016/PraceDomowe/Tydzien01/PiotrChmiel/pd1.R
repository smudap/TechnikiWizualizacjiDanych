library(ggplot2)

zaufanie = read.csv2("C:/Users/Piotr/Documents/Studia/TWD/PD/1/ZaufanieDoPolitykow.csv", sep=',', header=TRUE)
head(zaufanie)
zaufanie2 <- zaufanie
zaufanie3 <- zaufanie


zaufanie$Polityk <-factor(zaufanie$Polityk, levels=zaufanie[order(zaufanie$Ufa), "Polityk"])

y <-ggplot(zaufanie, aes(x=Polityk, y=Ufa, fill=Partia)) + 
  geom_bar(stat="identity") + 
  coord_flip()
y + labs(title = "Zaufanie do Polityków", y="Procent zaufania", x="Polityk") 



zaufanie2$Polityk <-factor(zaufanie$Polityk, levels=zaufanie[order(zaufanie$NieUfa), "Polityk"])

y <-ggplot(zaufanie2, aes(x=Polityk, y=NieUfa, fill=Partia)) + 
  geom_bar(stat="identity") + 
  coord_flip()
y + labs(title = "Nieufność/Brak zdania do Polityków", y="Procent nieufności", x="Polityk") 


zaufanie3 <- aggregate(as.numeric(levels(zaufanie$Ufa)[zaufanie$Ufa]), by=list(zaufanie3$Partia), FUN=mean)

zaufanie3$Group.1 <-factor(zaufanie3$Group.1, levels=zaufanie3[order(zaufanie3$x), "Group.1"])

y <-ggplot(zaufanie3, aes(x=Group.1, y=x, fill=Group.1)) + 
  geom_bar(stat="identity") + 
  coord_flip()
y + labs(title = "Zaufanie do Partii na podstawie zaufania do Polityków", y="Procent zaufania", x="Partia") 
