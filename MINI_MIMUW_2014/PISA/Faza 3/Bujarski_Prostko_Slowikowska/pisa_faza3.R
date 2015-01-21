library("dplyr")
library("ggplot2")
library('scales')
library("gridExtra")

load("PISAeurope.rda")

#########################################################################################
#######################################  DANE  ##########################################
#########################################################################################

N <- 7 # tyle kategorii procentowych: 0%, 100% oraz 5 posrednich
## ---- nazwy kategorii ----
nazwy <- c("0%", "(0%, 20%]", "(20%, 40%]", "(40%, 60%]", "(60%, 80%]", 
           "(80%, 100%)", "100%")

## ---- funkcja pomocnicza ----
kategoryzuj <- function(x) {
  sapply(x, function(y) {
    if (is.na(y)) return(NA)
    if (y == 1) return(N)
    return(min(which(y <= seq(0, 1, length=N-1))))
  })
}

## ---- przygotowanie danych ----
bg <- pisa %>%
  select(PV1MATH, PV1READ, W_FSTUWT, PCGIRLS, GENDER=ST04Q01) %>%
  filter(!is.na(PCGIRLS)) %>%
  mutate(czysz = kategoryzuj(PCGIRLS)) %>%
  group_by(czysz, GENDER) %>%
  summarise(math=weighted.mean(PV1MATH, W_FSTUWT),
            read=weighted.mean(PV1READ, W_FSTUWT)) %>%
  filter((czysz != 1 | GENDER != "Female") &
           (czysz != N | GENDER != "Male"))


# dane do wykresu plec vs lubię matematykę
dane <- pisa %>% 
  select(enjoy_math=ST29Q04, GENDER=ST04Q01) %>%
  filter(!is.na(enjoy_math))

levels(dane$enjoy_math)[1:2] <- 'Lubię'
levels(dane$enjoy_math)[2:3] <- 'Nie lubię'
dane2 <- dane %>%
  filter(enjoy_math=="Lubię")
w <- prop.table(table(dane2),1)[1,]
dane2$prop <- vector('numeric',nrow(dane2))
dane2$prop[dane2$GENDER=='Female'] <- w[1]
dane2$prop[!dane2$GENDER=='Female'] <- w[2]


#########################################################################################
####################################  WYKRESY  ##########################################
#########################################################################################


####  wykres 1  ########### matematyka_dziewczyny
(matematyka_dziewczyny <- ggplot(bg, aes(x=czysz, y=math, colour=GENDER)) +
   geom_line(stat="identity", position="dodge",size=1.5) +
   geom_point(size=6, col="gray18")+
   geom_point(size=4)+
   xlab("% dziewczyn w szkołach") +
   ylab("Wyniki z matematyki") +
   scale_color_manual(guide=guide_legend(title="Płeć"), labels=c("dziewczyna", "chłopak"),values=c("palevioletred1","lightskyblue")) +
   scale_x_discrete(breaks=1:N, labels=nazwy)+
   theme(panel.background = element_blank(),
         legend.position="left",
         legend.title = element_text(size=16),
         legend.text = element_text(size = 14),
         axis.line = element_line(color = 'black'),
         axis.text.y=element_text(size=16,color="gray28"),
         axis.text.x=element_text(size=15,color="gray28",angle=-20, vjust=0.7),
         axis.title.x = element_text(colour="gray14",size=18,vjust=0.4),
         axis.title.y = element_text(colour="gray14",size=18,vjust=0.9),
         panel.grid.major.y=element_line(color='dodgerblue4', size=0.3),
         panel.grid.major.x=element_line(color='#CDBFAC'),
         panel.grid.minor.x=element_blank())+
   scale_y_continuous(limits = c(470, 570))+
   labs(list(y="Wyniki z matematyki",
             x="Odsetek dziewczyn w szkole"))
)

####  wykres 2  ########### czytanie_dziewczyny

(czytanie_dziewczyny <- ggplot(bg, aes(x=czysz, y=read, col=GENDER)) +
   geom_line(stat="identity", position="dodge", size=1.5) +
   geom_point(size=6, col="gray18")+
   geom_point(size=4)+
   xlab("% dziewczyn w szkołach") +
   ylab("Wyniki z czytania") +
   scale_color_manual(guide=guide_legend(title="Płeć"), labels=c("K", "M"),values=c("palevioletred1","lightskyblue")) +
   scale_x_discrete(breaks=1:N, labels=nazwy) +
   scale_y_continuous(limits = c(470, 570))+
   scale_shape_manual(values=c(19))+
   theme(legend.position="none")+
   theme(panel.background = element_blank(),
         legend.position="none",
         axis.line = element_line(color = 'black'),
         axis.text.y=element_text(size=16,color="gray28"),
         axis.text.x=element_text(size=15,color="gray28",angle=-20, vjust=0.7),
         axis.title.x = element_text(colour="gray14",size=18,vjust=0.4),
         axis.title.y = element_text(colour="gray14",size=18,vjust=0.9),
         panel.grid.major.y=element_line(color='dodgerblue4', size=0.3),
         panel.grid.major.x=element_line(color='#CDBFAC'),
         panel.grid.minor.x=element_blank())+
   labs(list(y="Wyniki z czytania",
             x="Odsetek dziewczyn w szkole"))
)
####  wykres 3  ########### plec_lubiemat

dane$enjoy_math <- relevel(dane$enjoy_math,ref='Nie lubię')
dane$GENDER<- relevel(dane$GENDER,ref='Male')
(plec_lubiemat <- ggplot(dane,aes(x=GENDER,fill=enjoy_math))+
   geom_bar(position='fill',width=0.6,alpha=0.8)+
   scale_y_continuous(labels = percent)+
   coord_flip()+
   scale_x_discrete(breaks=c("Female", "Male"), labels=c("dziewczyna", "chłopak"))+
   scale_fill_manual(values=c("coral2","lightgreen"), 
                     name="Odpowiedź",
                     breaks=c("Nie lubię","Lubię"),
                     labels=c("nie lubię","lubię"))+
   xlab('')+
   ylab("") +
   theme(   
     legend.position="left",
     legend.title = element_text(size=16),
     legend.text = element_text(size = 14),
     axis.text.y=element_text(size=16,color="gray28"),
     axis.text.x=element_text(size=16,color="gray28"),
     axis.title.x = element_text(colour="gray14",size=18),
     axis.title.y = element_text(colour="gray14",size=18),
     axis.line.x = element_line(color = 'black'),
     panel.grid.major.x=element_line(color='#CDBFAC'),
     panel.grid.minor.x=element_blank())
)


#########################################################################################
####################################  POŁĄCZONE WYKRESY  ##########################################
#########################################################################################

grid.newpage()
grid.text("Autorzy: \nBujarski, Prostko, Słowikowska", vp = viewport(x = 0.92, y = 0.10), gp = gpar(fontsize = 10))
grid.text("Czy obecność płci przeciwnej w szkole obniża wyniki w nauce ?", just = "centre", vp = viewport(x = 0.5, y = 0.91), gp = gpar(fontsize = 35))
print(matematyka_dziewczyny,
      vp=viewport(x=0.25, y = 0.65,
                  width=0.5, height=0.40))
print(czytanie_dziewczyny, vp=viewport(x=0.73, y = 0.65,
                                       width=0.42, height=0.40))

grid.text("Czy uczniowie lubią matematykę ? ", just = "centre", vp = viewport(x = 0.5, y = 0.39), gp = gpar(fontsize = 23,col="gray11"))
print(plec_lubiemat,
      vp=viewport(x=0.41, y = 0.19,
                  width=0.7, height=0.35))
