library(maps)
library(ggplot2)
library(maptools)
library(rgdal)
library(dplyr)
require(gpclib)
gpclibPermit()

######### WORLD MAP #################
setwd("/home/m/studia/R/TechnikiWizualizacjiDanych/MINI_MIMUW_2014/PISA/Faza 2/Kiljan_Wos")
worldshape <- readShapePoly("materials/TM_WORLD_BORDERS-0.3.shp") 

## find strange charackters in countries' names (because of fortify..)
#library(tau)
#grep(FALSE, is.locale(levels(worldmap@data$NAME)))
levels(worldshape@data$NAME)[121] = "Somethingland Islands"

#fortify for ggplot
worldmap <- fortify(worldshape, region = "NAME")

#Europe only
europecities_all <- c("Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Georgia","Germany","Greece","Hungary","Iceland","Ireland","Italy","Kazakhstan","Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta","Moldova","Monaco","Montenegro","Netherlands","Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City")
europecities <- c("Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Georgia","Germany","Greece","Hungary","Iceland","Ireland","Italy","Kazakhstan","Latvia","Lithuania","Luxembourg","Macedonia","Malta","Moldova","Monaco","Montenegro","Netherlands","Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City")
europemap <- worldmap %>%  filter(id %in% europecities)

########## PISA DATA ###############
#con <- url("http://biecek.pl/MIMUW/PISAeurope.rda")
#print(load(con))
#math <- pisa[,c("CNT","PV1MATH","W_FSTUWT")]
#math <- math[!is.na(dane[,2]),]
#mathPerCnt <- math %>%
#  group_by(CNT) %>%
#  summarise(math = weighted.mean(PV1MATH, W_FSTUWT, na.rm = TRUE),
#            liczba=n()) 
#mathPerCnt <- mathPerCnt %>% 
#  filter(CNT %in% europecities)

# dane z githuba mocno pocięte (malo panstw europejskich), uzylem z innego zrodla, takze PISA 2012
# source: http://www.theguardian.com/news/datablog/2013/dec/03/pisa-results-country-best-reading-maths-science
math <- read.csv(file="materials/Copy of PISA summary - Mathematics performance by different measures.csv",head=TRUE,sep=",")
math <- math %>% filter(X %in% europecities)


########## SIMPLE PLOT FOR TESTING #################
#ggplot(europemap, aes(x = long, y = lat, group = group)) +
#  geom_polygon(fill = "green") + 
#  geom_path(colour = "grey40")

############## CENTRE FOR EACH COUNTRY ###########
wsp <- sapply(worldshape@polygons,   function(x) x@labpt)
df <- data.frame(cnt=worldshape@data$NAME, long = wsp[1,], lat = wsp[2,])
df <- df %>% filter(cnt %in% europecities)
# fix centre of Norway:
df[33,]$long = 10
df[33,]$lat = 61.5

######### MERGE MAP DATA WITH PISA ########
merged <- merge(df, math, by.x="cnt", by.y="X")

######### BASE PLOT ####################
cols <- c("LINE1"="#f04546","LINE2"="#3591d1","BAR"="#62c76b")
base <- ggplot() +
  geom_polygon(data=europemap, aes(x=long, y=lat, group=group), fill = "grey50")
base

conturs <- geom_path(data=europemap, aes(x=long, y=lat, group=group), colour="black", size=0.1)
#polandmap <- europemap %>% filter(id %in% "Poland")
#pl_contur <- geom_path(data=polandmap, aes(x=long, y=lat, group=group), colour="black", size=0.5)
  
####### MAKE LOOK SWEET ##################
latlimits <- c(30, 75) 
longlimits <- c(-25, 45) 

base <- base + 
  theme_bw() +
  theme(axis.ticks = element_blank(),
      axis.text.x = element_blank(),
      axis.text.y = element_blank(),
      panel.grid.minor=element_blank(),
      panel.grid.major=element_blank(),
      axis.title.x = element_blank(),
      axis.title.y = element_blank(),
      panel.border = element_blank()) +
      coord_cartesian(xlim = longlimits, ylim = latlimits) +
      theme(plot.title=element_text(size=20)) +
  theme(legend.text=element_text(size=25), legend.title=element_text(size=25)) +
  theme(legend.position = c(1, 0.45), 
        legend.justification = c(1, 0.45), 
        legend.background = element_rect(colour = NA, fill = "grey")) +
  theme(plot.title=element_text(size=35))


###### FINALL PLOTS: ###########################
math_score_plot <- base + 
  geom_map(data=merged, aes(map_id=cnt, fill=Mean.score.on.the.mathematics.scale), map=europemap) + conturs +
  ggtitle("Mean score on the math test for each country")  +
  scale_fill_gradient(name="Points", low="yellow", high="red")  +
  geom_text(data=merged, aes(x=long, y=lat, label=Mean.score.on.the.mathematics.scale), size = 8, color="white", fontface="bold", aplha=0.8) +
  geom_text(data=merged, aes(x=long, y=lat, label=Mean.score.on.the.mathematics.scale), size = 8) 
math_score_plot

#a_plot <- base + 
#  geom_map(data=merged, aes(map_id=cnt, fill=National.income.GDP.per.capita..in.USD.thousand.), map=europemap) + conturs +
#  ggtitle("National income GDP per capita") +
#  scale_fill_gradient(name="Income\n(USD thousand)", low="yellow", high="red") +
# geom_text(data=merged, aes(x=long, y=lat, label=National.income.GDP.per.capita..in.USD.thousand.), size = 8, color="white", fontface="bold", aplha=0.8) +
#  geom_text(data=merged, aes(x=long, y=lat, label=National.income.GDP.per.capita..in.USD.thousand.), size = 8)
#a_plot

b_plot <- base + 
  geom_map(data=merged, aes(map_id=cnt, fill=Spending.on.education..Cumulative.expenditure.in.thousand.USD.converted.using.PPPs), map=europemap) + conturs +
  ggtitle("Spending on education (Cumulative expenditure\n in thousand USD converted using PPPs)") +
  scale_fill_gradient(name="Expenditure\n(USD thousand)", low="yellow", high="red") +
  geom_text(data=merged, aes(x=long, y=lat, label=Spending.on.education..Cumulative.expenditure.in.thousand.USD.converted.using.PPPs), size = 8, color="white", fontface="bold", aplha=0.8) +
  geom_text(data=merged, aes(x=long, y=lat, label=Spending.on.education..Cumulative.expenditure.in.thousand.USD.converted.using.PPPs), size = 8)
b_plot

c_plot <- base + 
  geom_map(data=merged, aes(map_id=cnt, fill=Parental.education....of.the.population.with.tertiary.education.), map=europemap) + conturs +
  ggtitle("Parental education (percentage of \nthe population with tertiary education)") +
  scale_fill_gradient(name="Population (%)", low="yellow", high="red") +
  geom_text(data=merged, aes(x=long, y=lat, label=Parental.education....of.the.population.with.tertiary.education.), size = 8, color="white", fontface="bold", aplha=0.8) +
  geom_text(data=merged, aes(x=long, y=lat, label=Parental.education....of.the.population.with.tertiary.education.), size = 8)
c_plot

d_plot <- base + 
  geom_map(data=merged, aes(map_id=cnt, fill=Share.of.students.with.a.disadvantaged.socio.economic.background..whose.pisa.index.of.economic..social.and.cultural.status.is.below..1..), map=europemap) + conturs +
  ggtitle("Share of students with a disadvantaged\n socio-economic background (whose pisa index of\n economic, social and cultural status is below -1) ") +
  theme(plot.title=element_text(size=30)) +
  scale_fill_gradient(name="Share of\nstudents (%)", low="red", high="yellow") +
  geom_text(data=merged, aes(x=long, y=lat, label=Share.of.students.with.a.disadvantaged.socio.economic.background..whose.pisa.index.of.economic..social.and.cultural.status.is.below..1..), size = 8, color="white", fontface="bold", aplha=0.8) +
  geom_text(data=merged, aes(x=long, y=lat, label=Share.of.students.with.a.disadvantaged.socio.economic.background..whose.pisa.index.of.economic..social.and.cultural.status.is.below..1..), size = 8)
d_plot
