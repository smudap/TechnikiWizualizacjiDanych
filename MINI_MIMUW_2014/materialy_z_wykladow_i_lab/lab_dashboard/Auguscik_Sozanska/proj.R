library(dplyr)   # obróbka danych
library(ggplot2)
library(reshape)
library(RColorBrewer)
kraje <- c("Polska", "Niemcy", "Wielka Brytania", "Rumunia", "Estonia")
area <- c(312685, 357022, 243610, 238391, 45228)
militaryman <- c(9531855, 18529299, 14856917, 5601234, 291801)
militarywoman <- c(9298593 ,17888543, 14307316, 5428939, 302696)
gdp <- c(814, 3227, 2387, 288.5, 29.94)
miejsce  <- c(22, 6, 9, 45 ,114)

dane <- data.frame(kraje, area, militaryman, militarywoman, gdp, miejsce)


p2 <- ggplot(dane, aes(x=kraje, y=area)) + 
  geom_bar(stat="identity", fill="cornflowerblue") 


p3 <- ggplot(dane, aes(x=kraje, y=gdp, label=miejsce)) + 
  geom_point(size=5, col="cornflowerblue") +
  geom_text(hjust=-1, vjust=1)

           
Polska <- c(14.6, 11.9, 43.8, 14.7, 14.5)
Niemcy <- c(13, 10.6, 41.7, 13.6, 20.9)
UK <- c(17.3, 12.6, 41, 11.5, 17.3)
Rumunia <- c(14.6, 11.3, 45.7, 13, 15.1)
Estonia <- c(15.6, 11.2, 41.5, 13.2, 18.2)
dane2 <- cbind(Polska, Niemcy, UK, Rumunia, Estonia)
rownames(dane2) <- c("0-14 lat", "15-24 lat", "25-54 lat", "55-64 lat", "65 lat i wiêcej")


dane2 <- melt(dane2)
p1 <- ggplot(dane2, aes(x=X2, y=value, fill=X1)) + geom_bar(stat="identity") +
  scale_fill_brewer(palette="Blues", guide=guide_legend(title="Wiek")) +
  labs(y="",x="Kraj")




library(gridExtra)
grid.newpage() 
print(p1, vp=viewport(x=0.3, y = 0.5, 
                      width=0.6, height=1))
print(p2, vp=viewport(x=0.8, y = 0.75, 
                      width=0.4, height=0.5))
print(p3, vp=viewport(x=0.8, y = 0.25, 
                      width=0.4, height=0.5))
