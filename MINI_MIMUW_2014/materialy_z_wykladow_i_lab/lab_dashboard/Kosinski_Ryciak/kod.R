library(reshape2)
library(ggplot2)
library(gridExtra)

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

wiek <- ggplot(str_w2,aes(x=wiek,y=value,group=variable,color=variable))+
  geom_line()+
  theme(legend.justification=c(0.1,0.1), legend.position=c(0.45,0.1)) +
  scale_colour_manual(values=c("#dd3209", "#E69F00", "#56B4E9",
                               "#493300", "#3209dd"),name="    Kraj")+
  guides(colour = guide_legend(override.aes = list(size=8)))+
  theme( axis.text.x = element_text(family = "mono"),
         axis.title.x= element_text(family = "mono"),
         axis.title.y= element_text(family = "mono"),
         title =element_text(family = "mono")
  )


obesity <- ggplot(dane,aes(x=kraje,y=obesity))+
  geom_bar(stat="identity")+
  theme( axis.text.x = element_text(family = "mono"),
         axis.title.x= element_text(family = "mono"),
         axis.title.y= element_text(family = "mono"),
         title =element_text(family = "mono")
  )


le <- ggplot(Life, aes(x = kraj, y = dlugosc)) +
  geom_bar(stat="identity", fill="white") +
  theme( panel.background=element_rect(fill='black'),
         axis.text.x = element_text(family = "mono"),
         axis.title.x= element_text(family = "mono"),
         axis.title.y= element_text(family = "mono"),
         title =element_text(family = "mono")
  )+
  scale_x_discrete(limits=Life$kraj[order(Life$dlugosc)])+
  ggtitle("Oczekiwana d³ugoœæ ¿ycia")
getwd()

grid.newpage() 
print(wiek, vp=viewport(x=0.5, y = 0.5, 
                      width=0.8, height=0.8))
print(obesity, 
      vp=viewport(x=0.8, y = 0.8, 
                  width=0.4, height=0.4))


print(le, 
      vp=viewport(x=0.2, y = 0.8, 
                  width=0.4, height=0.4))
