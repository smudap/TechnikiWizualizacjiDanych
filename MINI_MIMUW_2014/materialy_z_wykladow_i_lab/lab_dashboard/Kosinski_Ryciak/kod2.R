library(reshape2)
library(ggplot2)
library(gridExtra)
library(RColorBrewer)
kraje <- c("Polska","UK","Niemcy","Estonia","Rumunia") 
obesity <- c(25.3,26.9,25.1,20.6,19.1)
wiek <- c("0-14","15-24","25-54","55-64","64<")
Polska <- c(14.6,11.9,43.8,14.7,14.5)
UK <- c(17.3,12.6,41,11.5,17.3)
Niemcy <- c(13,10.6,41.7,13.6,20.9)
Estonia <- c(15.6,11.2,41.5,13.2,18.2)
Rumunia <- c(14.6,11.3,45.7,13,15.1)

str_w <- data.frame(wiek,Polska,UK,Niemcy,Estonia,Rumunia)
str_w2 <- melt(str_w)
dane  <- data.frame(kraje,obesity)

kraj <- as.character(c("Polska", "UK", "Niemcy", "Rumunia", "Estonia"))
dlugosc <- c(76.65,80.42,80.44, 74.69, 74.07)

Life_expectancy_at_birth <- data.frame(kraj, dlugosc)
Life <- Life_expectancy_at_birth
Life[,1] <- as.character(Life[,1])

Polska <- c(14.6, 11.9, 43.8, 14.7, 14.5)
Niemcy <- c(13, 10.6, 41.7, 13.6, 20.9)
UK <- c(17.3, 12.6, 41, 11.5, 17.3)
Rumunia <- c(14.6, 11.3, 45.7, 13, 15.1)
Estonia <- c(15.6, 11.2, 41.5, 13.2, 18.2)
dane2 <- cbind(Polska, Niemcy, UK, Rumunia, Estonia)
rownames(dane2) <- c("0-14 lat", "15-24 lat", "25-54 lat", "55-64 lat", "65 lat i wiecej")


dane2 <- melt(dane2)
wiek <- ggplot(dane2, aes(x=Var2, y=value, fill=Var1)) + geom_bar(stat="identity", colour="black") +
  scale_fill_brewer(palette="YIOrRd", guide=guide_legend(title="Wiek")) +
  labs(y="",x="Kraj") + ggtitle("Rozk³ad wieku w krajach") + coord_flip() +
  theme( axis.text.x = element_text(family = "mono", size = 17),
         axis.text.y = element_text(family = "mono", size = 17),
         axis.title.x= element_text(family = "mono", size = 20),
         axis.title.y= element_text(family = "mono", size = 20),
         title =element_text(family = "mono", size = 25)
  )


obesity <- ggplot(dane,aes(x=kraje,y=obesity))+
  geom_bar(stat="identity", fill="palegreen3", colour="black")+
  theme( axis.text.x = element_text(family = "mono", size = 17),
         axis.title.x= element_text(family = "mono", size = 20),
         axis.title.y= element_text(family = "mono", size = 20),
         axis.text.y = element_text(family = "mono", size = 17),
         title =element_text(family = "mono", size = 25)
  ) + ggtitle("Procent ludzi oty³ych") + ylab("Procent") + xlab("Kraj")


le <- ggplot(Life, aes(x = kraj, y = dlugosc)) +
  geom_bar(stat="identity", fill="palegreen4", colour="black") +
  theme( axis.text.x = element_text(family = "mono", size = 17),
         axis.text.y = element_text(family = "mono", size = 17),
         axis.title.x= element_text(family = "mono", size = 20),
         axis.title.y= element_text(family = "mono", size = 20),
         title =element_text(family = "mono", size = 25)
  )+
  scale_x_discrete(limits=Life$kraj[order(Life$dlugosc)])+
  ggtitle("Oczekiwana d³ugoœæ ¿ycia")  + ylab("D³ugoœæ") + xlab("Kraj")
getwd()

grid.newpage() 
print(wiek, vp=viewport(x=0.5, y = 0.25, 
                        width=1, height=0.5))
print(obesity, 
      vp=viewport(x=0.7, y = 0.75, 
                  width=0.3, height=0.5))


print(le, 
      vp=viewport(x=0.25, y = 0.75, 
                  width=0.3, height=0.5))