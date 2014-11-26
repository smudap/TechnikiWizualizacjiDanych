library("dplyr")
library("ggplot2")
library('scales')
library("gridExtra")

# load("PISAeurope.rda")


#########################################################################################
#######################################  DANE  ##########################################
#########################################################################################

ramka <- pisa %>%
  select(PV1MATH,PV1READ,SC01Q01,CNT,ST71Q01,W_FSTUWT) %>%
  group_by(CNT,SC01Q01) %>%
  #filter(!is.na(PV1MATH) & !is.na(PV1READ) & !is.na(SC01Q01) & !is.na(CNT) & !is.na(ST71Q01)) %>%
  summarise(math = weighted.mean(PV1MATH, W_FSTUWT, na.rm = TRUE),
            read = weighted.mean(PV1READ, W_FSTUWT, na.rm = TRUE),
            hours=mean(ST71Q01,na.rm=TRUE),
            total = sum(W_FSTUWT)) %>%
  filter(!is.na(SC01Q01))
levels(ramka$SC01Q01) <- c('Publiczna','Prywatna')
ramka$opis <- c("B", "Cz", "G", "F", "f", "UK", "g", "J", "K", "P")
podzialkaread <- pretty(ramka$read)
podzialkamath <- pretty(ramka$math)

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


#########################################################################################
####################################  WYKRESY  ##########################################
#########################################################################################


####  wykres 1  ########### matematyka_zajecia
(matematyka_zajecia <- ggplot(ramka,aes(x=math,y=hours,color=SC01Q01,shape=CNT))+
  geom_point(size=8)+
  guides(color = guide_legend(title = "Rodzaj szkoły"))+
  scale_shape_manual(values=ramka$opis,name="Państwa")+
  scale_colour_manual(
     values = c("Publiczna" = '#990000' ,"Prywatna" = "#5abba7"))+
  #scale_y_reverse()+
  #scale_x_continuous(breaks=c(0,podzialkamath))+
  theme(panel.background = element_blank(),
        legend.position="left",
        axis.line = element_line(color = 'black'),
        axis.title.x = element_text(colour="grey20",size=15),
        axis.title.y = element_text(colour="grey20",size=15),
        title=element_text(colour="grey20",size=20),
        panel.grid.minor=element_line(color='orange'),
        panel.grid.major=element_line(color='#EEDC82'),
        axis.text.y=element_text(size=15),
        axis.text.x=element_text(size=15))+
  labs(list(x="Wyniki z matematyki",y="Liczba zajęć w tygodniu (h)"))
 )

####  wykres 2  ########### czytanie_zajecia
(czytanie_zajecia <- ggplot(ramka,aes(x=read,y=hours,color=SC01Q01,shape=CNT))+
  geom_point(size=8)+  
  scale_shape_manual(values=ramka$opis)+
  scale_colour_manual(values = c("Publiczna" = '#990000' ,"Prywatna" = "#5abba7"))+
  guides( color = guide_legend(title = "Rodzaj szkoły"))+
  #scale_y_reverse()+
  scale_x_continuous(breaks=c(0,podzialkaread))+
  theme(panel.background = element_blank(),
        axis.line = element_line(color = 'black'),
        axis.title.x = element_text(colour="grey20",size=15),
        legend.position="none",
        axis.title.y = element_text(colour="grey20",size=15),
        title=element_text(colour="grey20",size=20),
        panel.grid.minor=element_line(color='orange'),
        panel.grid.major=element_line(color='#EEDC82'),
        axis.text.y=element_text(size=15),
        axis.text.x=element_text(size=15))+
        labs(list(x="Wyniki z czytania",y="Liczba zajęć w tygodniu (h)")))

 

####  wykres 3  ########### matematyka_dziewczyny
(matematyka_dziewczyny <- ggplot(bg, aes(x=czysz, y=math, colour=GENDER)) +
  geom_line(stat="identity", position="dodge",size=1.5) +
  geom_point(size=6, col="black")+
  geom_point(size=4)+
  scale_y_continuous(breaks=podzialkamath)+
  coord_flip() + 
  xlab("% dziewczyn w szkołach") +
  ylab("Wyniki z matematyki") +
  scale_color_manual(guide=guide_legend(title="Płeć"), labels=c("K", "M"),values=c("red","green")) +
  scale_x_discrete(breaks=1:N, labels=nazwy)+
  theme(panel.background = element_blank(),
        legend.position="left",
        axis.line = element_line(color = 'black'),
        axis.text.y=element_text(size=16),
        axis.text.x=element_text(size=16),
        axis.title.x = element_text(colour="grey20",size=15),
        axis.title.y = element_text(colour="grey20",size=15),
        panel.grid.major.y=element_line(color='dodgerblue4', size=0.3),
        panel.grid.major.x=element_line(color='#CDBFAC'),
        panel.grid.minor.x=element_blank())+
   labs(list(y="Wyniki z matematyki",
             x="Odsetek dziewczyn w szkole"))
)
 

####  wykres 4  ########### czytanie_dziewczyny

(czytanie_dziewczyny <- ggplot(bg, aes(x=czysz, y=read, col=GENDER)) +
  geom_line(stat="identity", position="dodge", size=1.5) +
   geom_point(size=6, col="black")+
   geom_point(size=4)+
   scale_y_continuous(breaks=podzialkaread)+
  coord_flip() + 
  xlab("% dziewczyn w szkołach") +
  ylab("Wyniki z czytania") +
  scale_color_manual(guide=guide_legend(title="Płeć"), labels=c("K", "M"),values=c("red","green")) +
  scale_x_discrete(breaks=1:N, labels=nazwy) +
  scale_shape_manual(values=c(19))+
  theme(legend.position="none")+
  theme(panel.background = element_blank(),
        legend.position="none",
        axis.line = element_line(color = 'black'),
        axis.text.y=element_text(size=16),
        axis.text.x=element_text(size=16),
        axis.title.x = element_text(colour="grey20",size=15),
        axis.title.y = element_text(colour="grey20",size=15),
        panel.grid.major.y=element_line(color='dodgerblue4', size=0.3),
        panel.grid.major.x=element_line(color='#CDBFAC'),
        panel.grid.minor.x=element_blank())+
 labs(list(y="Wyniki z czytania",
           x="Odsetek dziewczyn w szkole"))
)


#########################################################################################
####################################  POŁĄCZONE WYKRESY  ##########################################
#########################################################################################


grid.newpage()
print(matematyka_zajecia,
      vp=viewport(x=0.245, y = 0.25,
                  width=0.50, height=0.5))
print(czytanie_zajecia, vp=viewport(x=0.775, y = 0.25,
                        width=0.46, height=0.5))
print(matematyka_dziewczyny,
      vp=viewport(x=0.25, y = 0.75,
                  width=0.50, height=0.5))
print(czytanie_dziewczyny, vp=viewport(x=0.75, y = 0.75,
                                    width=0.5, height=0.5))

