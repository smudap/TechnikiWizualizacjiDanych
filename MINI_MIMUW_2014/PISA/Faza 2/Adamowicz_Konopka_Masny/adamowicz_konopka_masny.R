library(ggplot2)
library(Hmisc)
library(dplyr)
library(scales)
library(gridExtra)

setwd("/Users/pawel_adamowicz/Documents/studia/TechnikiWizualizacjiDanych/MINI_MIMUW_2014/PISA/Faza 2/Adamowicz_Konopka_Masny")
load("PISAeurope.rda")
pol <- pisa %>% filter(CNT == 'Poland')
pol <- pol[!(is.na(pol$ST35Q04)) & !(is.na(pol$ST17Q01)),]

def_theme <- theme(panel.grid.major=element_blank(),
                   panel.grid.minor=element_blank(),
                   plot.title=element_text(size=rel(1.8), face="bold"),
                   axis.title.y=element_text(size=rel(1.5)),
                   axis.title.x=element_text(size=rel(1.5)),
                   axis.text.x=element_text(size=rel(1.5)),
                   axis.text.y=element_text(size=rel(1.5)),
                   legend.text = element_text(size=rel(1.5)),
                   legend.title = element_text(size=rel(1.7)))

father <- ggplot(pol, aes(x=ST17Q01, fill=ST35Q04)) + 
          geom_bar(position="fill", colour="black") +
          scale_y_continuous(labels=percent) +
          coord_flip() + 
          scale_fill_discrete(name = element_blank(),
                            labels=c("Zdecydowanie się zgadzam", 
                                     "Zgadzam się",
                                     "Nie zgadzam się", 
                                     "Zdecydowanie się nie zgadzam")) +
          scale_x_discrete(labels=c("Ukończył\nLiceum Ogólnokształcące", "Ukończył technikum\nlub szkołę zawodową", "Ukończył gimnazjum", "Ukończył\nszkołę podstawową", "Nie ukończył\nszkoły podstawowej")) +
          ggtitle("Czy zgadzasz się ze stwierdzeniem:\n \"Moi rodzice uważają, że nauka \nmatematyki jest dla mnie ważna\"?")

father <- father + 
            theme_bw() + 
            def_theme + 
            theme(axis.title.x=element_blank()) +
            xlab("Wykształcenie ojca")

wyniki <- pol %>%
            group_by(ST35Q04) %>%
            summarise(math=wtd.mean(PV1MATH, W_FSTUWT, na.rm=TRUE))

wyniki <- ggplot(wyniki, aes(x=ST35Q04, y=math)) + 
  geom_bar(stat="identity", fill="orange", colour="black") +
  geom_text(aes(label=sprintf("%.0f ", math), vjust=-0.2)) +
  ggtitle("Stosunek rodziców do nauki matematyki\n a średni wynik z matematyki uzyskany przez ich dziecko") +
  scale_x_discrete(labels=c("Zdecydowanie się \nzgadzam", 
                           "Zgadzam się",
                           "Nie zgadzam \nsię", 
                           "Zdecydowanie się \nnie zgadzam")) +
  scale_y_continuous(breaks=seq(0, 550, 100))


wyniki <- wyniki + 
  theme_bw() + 
  def_theme +
  xlab("Czy Twoi rodzice uważają, że nauka matematyki jest dla Ciebie ważna?") +
  ylab("Średni wynik z matematyki")

pisa$wiek <- ifelse(pisa$ST06 > 7, c(">7"), pisa$ST06)

pisa$age <- ordered(pisa$age, levels = c("4", "5", "6", "7", ">7"))

avgs3 <- 
  pisa %>%
  group_by(wiek,pisa$ST04) %>%
  summarise(math = wtd.mean(PV1MATH, W_FSTUWT, na.rm=TRUE))

avgs3 <- na.omit(avgs3)
colnames(avgs3) <- c("age","sex","math")

age <- ggplot(avgs3, aes(x=age, y=math, fill=sex)) + 
  geom_bar(stat="identity", position=position_dodge(), colour="black") + 
  geom_text(aes(label=sprintf("%.0f ", math), vjust=-0.2), position=position_dodge(width=1)) +
  xlab("Wiek rozpoczęcia edukacji szkolnej") + 
  ylab("Średni wynik z matematyki") +
  scale_fill_discrete(name="Płeć",
                      breaks=c("Female", "Male"),
                      labels=c("Kobieta", "Mężczyzna")) +
  scale_x_discrete(limits=c("4","5","6", "7", ">7")) +
  scale_y_continuous(breaks=seq(0, 550, 100)) +
  ggtitle("Średnie wyniki z matematyki w odniesieniu do\nwieku rozpoczęcia edukacji szkolnej i płci") +
  theme_bw() +
  def_theme

grid.newpage() # Open a new page on grid device
pushViewport(viewport(layout = grid.layout(10, 6)))
print(father, vp = viewport(layout.pos.row = 6:10, layout.pos.col = 2:5))
print(wyniki, vp = viewport(layout.pos.row = 2:5, layout.pos.col = 1:3)) 
print(age, vp = viewport(layout.pos.row = 2:5, layout.pos.col = 4:6))
popViewport()
grid.text("Pisa - Faza 2 \n Paweł Adamowicz - Monika Konopka - Adam Maśny", x=0.5, y=0.95, gp=gpar(fontsize=28,  fontface="bold"))
