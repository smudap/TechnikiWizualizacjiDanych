library(ggplot2)
library(Hmisc)
library(dplyr)
library(scales)
library(gridExtra)

setwd("/Users/pawel_adamowicz/Documents/studia/TechnikiWizualizacjiDanych/MINI_MIMUW_2014/PISA/Faza 2/Adamowicz_Konopka_Masny")
load("PISAeurope.rda")

pisa$wiek <- ifelse(pisa$ST06 > 7, c(">7"), pisa$ST06)

pisa$age <- ordered(pisa$age, levels = c("4", "5", "6", "7", ">7"))

avgs3 <- 
  pisa %>%
  group_by(wiek,pisa$ST04) %>%
  summarise(math = wtd.mean(PV1MATH, W_FSTUWT, na.rm=TRUE))

avgs3 <- na.omit(avgs3)
colnames(avgs3) <- c("age","sex","math")

math_min <- min(avgs3$math)
math_max <- max(avgs3$math)

age <- ggplot(avgs3, aes(x=age, y=math, group=sex, colour=sex, ymax=max(math))) +
  geom_line(aes(group=sex), size=1) +
  geom_point(shape = 23, size = 5, colour="black", aes(fill = sex)) +
  scale_fill_manual(name="Płeć",
                    values=c("salmon", "skyblue"), 
                    breaks=c("Female", "Male"),
                    labels=c("Kobieta", "Mężczyzna")) +
  xlab("Wiek rozpoczęcia edukacji szkolnej") + 
  ylab("Średni wynik z matematyki") +
  scale_colour_manual(name="Płeć",
                      values=c("salmon", "skyblue"), 
                      breaks=c("Female", "Male"),
                      labels=c("Kobieta", "Mężczyzna")) +
  scale_x_discrete(limits=c("4","5","6", "7", ">7")) +
  scale_y_continuous(limits=c(math_min-10, math_max+10)) +
  ggtitle("Wyniki z matematyki w odniesieniu do \n wieku rozpoczęcia edukacji szkolnej i płci") +
  theme_bw() +
  def_theme_grid



data <- 
  pisa %>%
  group_by(ST35Q04) %>%
  summarise(math = wtd.mean(PV1MATH, W_FSTUWT, na.rm=TRUE))

data <- na.omit(data)

wyniki <- ggplot(data, aes(x=ST35Q04, y=math)) +
  geom_line(aes(group=1), colour="yellow") +
  geom_point(shape = 23, size = 5, colour="black", fill="yellow") +
  ggtitle("Stosunek rodziców do nauki matematyki\n a wynik z matematyki uzyskany przez ich dziecko") +
  scale_x_discrete(labels=c("Zdecydowanie się \nzgadzam", 
                            "Zgadzam się",
                            "Nie zgadzam \nsię", 
                            "Zdecydowanie się \nnie zgadzam")) +
  scale_y_continuous(limits=c(math_min+20, math_max)) +
  theme_bw() +
  def_theme_grid


wyniki <- wyniki+
  xlab("Czy zgadzasz się ze stwierdzeniem: \n \" Moi rodzice uważają, że nauka matematyki jest dla mnie ważna\"?") +
  ylab("Średni wynik z matematyki")

wyniki


squares_theme <- theme(panel.grid.major=element_blank(),
                       panel.grid.minor=element_blank(),
                       plot.title=element_text(size=rel(1.8), face="bold"),
                       axis.title.y=element_text(size=rel(1.5)),
                       axis.title.x=element_text(size=rel(1.5)),
                       axis.text.x=element_text(size=rel(1.2)),
                       axis.text.y=element_text(size=rel(1.2)),
                       legend.text = element_text(size=rel(1.2)),
                       legend.title = element_text(size=rel(1.4)))



mamaEduk <- pisa$ST13Q01
tataEduk <- pisa$ST17Q01
math <- pisa$PV1MATH
wagi <- pisa$W_FSTUWT

dane <- as.data.frame(list(mamaEduk, tataEduk,  math, wagi))
names(dane) <- c("mumEdu", "dadEdu", "math", "wages")

levels(dane$mumEdu) <- c("Liceum Ogólnokształcące", "Technikum lub szkołe zawodową",
                         "Gimnazjum",
                         "Szkoła podstawowa", "Nic")

levels(dane$dadEdu) <- c("Liceum Ogólnokształcące", "Technikum lub szkołe zawodową",
                         "Gimnazjum",
                         "Szkoła podstawowa", "Nic")
dane2 <- dane %>%
  filter(mumEdu %in% c('Liceum Ogólnokształcące', 'Technikum lub szkołe zawodową',
                       'Gimnazjum',
                       'Szkoła podstawowa'))
dane3 <- dane2 %>%
  filter(dadEdu %in% c('Liceum Ogólnokształcące', 'Technikum lub szkołe zawodową',
                       'Gimnazjum',
                       'Szkoła podstawowa'))
dane <- dane3

toplot <- dane %>%
  group_by(mumEdu,dadEdu) %>%
  summarise(avgs=weighted.mean(math,wages,na.rm=TRUE),
            amount=n())

toplot <- na.omit(toplot)

lab = c("Liceum \n Ogólnokształcące", "Technikum lub \nszkoła zawodowa", "Gimnazjum", "Szkoła \npodstawowa")

adam <- ggplot(toplot,aes(x=mumEdu, y=dadEdu, fill=avgs))+
  geom_raster()+
  ggtitle("Wykształcenie rodziców a wyniki dziecka z matematyki") +
  scale_fill_gradient("Wyniki z\nmatematyki",low = "red1", high = "green")+
  scale_x_discrete(labels=lab) +
  scale_y_discrete(labels=lab) +
  labs(x="Szkoła ukończona przez matkę", y="Szkoła ukończona przez ojca")+
  theme_bw() +
  squares_theme



mamaD <- pisa$ST15Q01
tataD <- pisa$ST19Q01
math <- pisa$PV1MATH
wagi <- pisa$W_FSTUWT

dane <- as.data.frame(list(mamaD, tataD,  math, wagi))
names(dane) <- c("mumDoing", "dadDoing", "math", "wages")


lab = c("Pracuje na\n pełen etat", "Pracuje na\nczęść etatu", "Nie pracuje\nale szuka pracy", "Inne (np. zajmuje\nsię domem)")
levels(dane$mumDoing) <- lab

levels(dane$dadDoing) <- lab
dane2 <- dane %>%
  filter(mumDoing %in% lab)
dane3 <- dane2 %>%
  filter(dadDoing %in% lab)
dane <- dane3

toplot <- dane %>%
  group_by(mumDoing,dadDoing) %>%
  summarise(avgs=weighted.mean(math,wages,na.rm=TRUE),
            amount=n())

toplot <- na.omit(toplot)


kwadraty <- ggplot(toplot,aes(x=mumDoing, y=dadDoing, fill=avgs))+
  geom_raster()+
  ggtitle("Zajęcie rodziców a wyniki dziecka z matematyki") +
  scale_fill_gradient("Wyniki z\nmatematyki",low = "yellow", high = "blue")+
  scale_x_discrete(labels=lab) +
  scale_y_discrete(labels=lab) +
  labs(x="Zajęcie matki", y="Zajęcie ojca")+
  theme_bw() +
  squares_theme

grid.newpage() # Open a new page on grid device
pushViewport(viewport(layout = grid.layout(20, 6)))
print(wyniki, vp = viewport(layout.pos.row = 3:11, layout.pos.col = 1:3)) 
print(age, vp = viewport(layout.pos.row = 3:11, layout.pos.col = 4:6))
print(adam, vp = viewport(layout.pos.row = 12:20, layout.pos.col = 1:3))
print(kwadraty, vp=viewport(layout.pos.row = 12:20, layout.pos.col = 4:6))
popViewport()
grid.text("Zmienne środowiskowe a wyniki z matematyki. \nAnaliza zależności w skali światowej.", x=0.5, y=0.95, gp=gpar(fontsize=34,  fontface="bold"))
grid.text("Paweł Adamowicz    Monika Konopka    Adam Maśny", x=0.9, y=0.97, gp=gpar(fontsize=10))