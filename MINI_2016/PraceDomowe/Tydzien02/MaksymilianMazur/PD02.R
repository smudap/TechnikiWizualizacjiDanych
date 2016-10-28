


years <- c("1976","1980","1984","1988","1992","1996","2000","2004","2008","2012")
before <- c(59.83,48.39,40.32,47.1,57.1,60.48,50.48,47.42,51.13,52.26)
after <- c(50.92,47.1,39.03,43.71,57.58,58.71,48.39,48.87,53.87,50.32)

years2 <- rep(years,2)
marker <- c(rep("Week after debates", 10), rep("Before debats",10))
pools <- c(after,before)
Data <- data.frame(years2,marker,pools)
Data$marker <- factor(Data$marker)

p1 <- ggplot(Data,aes(x=years2,fill=marker)) + 
  geom_bar(aes(y=pools),position="dodge",stat="identity") +
  theme(legend.position="none") +
  xlab("Year") +
  ylab ("Percentage") +
  ggtitle("Democratic presidential candidate's percent of two-party vote share before and after debates")

Data2 <- data.frame(years,before,after)

p2 <- ggplot(Data2, aes(x=before,y=after)) +  
  geom_point(colour = c("red","red","red","red","black","red","red","black","black","red")) +
  geom_text(aes(label=c("76","80","84","88","92","96","00","04","08","12")),hjust=-0.2, vjust=0) +
  geom_abline(intercept = 0, slope = 1) +
  xlab("Before Percentage") +
  ylab ("After Percentage") +
  theme(legend.position="none") 

layout <- matrix(c(1, 2), nrow = 2, byrow = TRUE)
multiplot(p1,p2, layout = layout)







  scale_shape_manual(values = c("76","80","84","88","92","96","00","04","08","12")) 




p1 <- ggplot(nowyZestaw,aes(x=years,fill=reRok.produkcji)) + geom_bar(aes(y=Cena),position = "dodge", stat="identity") +
  ggtitle("Œrednia cena samochodów") +
  ylab("Œrednia")

p2 <- ggplot(nowyZestaw2, aes(x=`2010`, y=`2011`)) + 
  geom_point(aes(shape=Model),size=5) +
  scale_shape_manual(values = LETTERS) +
  scale_x_log10(breaks = c( 60000, 80000, 100000), labels= c( "œrednio", "œredniodu¿o", "du¿o")) + 
  scale_y_log10(breaks = c( 60000, 80000, 100000,140000), labels= c( "œrednio", "œredniodu¿o", "du¿o", "bardzo du¿o")) +
  geom_abline(intercept = 0, slope = 1) + 
  theme_bw()

p3 <-  ggplot(AutaAnaliza,aes(x=Model,fill=Rok.produkcji)) + 
  geom_bar(position = "fill") + 
  coord_polar(theta  ="y") +
  theme(legend.position="none")

layout <- matrix(c(1, 2, 1, 3), nrow = 2, byrow = TRUE)
multiplot(p1,p2,p3, layout = layout)