library(maps)
library(ggplot2)
library(maptools)
library(rgdal)
library(dplyr)
require(gpclib)
library(gridExtra)
library(ggthemes)
gpclibPermit()

# Multiple plot function
#
# ggplot objects can be passed in ..., or to plotlist (as a list of ggplot objects)
# - cols:   Number of columns in layout
# - layout: A matrix specifying the layout. If present, 'cols' is ignored.
#
# If the layout is something like matrix(c(1,2,3,3), nrow=2, byrow=TRUE),
# then plot 1 will go in the upper left, 2 will go in the upper right, and
# 3 will go all the way across the bottom.
#
multiplot <- function(..., plotlist=NULL, file, cols=1, layout=NULL) {
  require(grid)
  
  # Make a list from the ... arguments and plotlist
  plots <- c(list(...), plotlist)
  
  numPlots = length(plots)
  
  # If layout is NULL, then use 'cols' to determine layout
  if (is.null(layout)) {
    # Make the panel
    # ncol: Number of columns of plots
    # nrow: Number of rows needed, calculated from # of cols
    layout <- matrix(seq(1, cols * ceiling(numPlots/cols)),
                     ncol = cols, nrow = ceiling(numPlots/cols))
  }
  
  if (numPlots==1) {
    print(plots[[1]])
    
  } else {
    # Set up the page
    grid.newpage()
    pushViewport(viewport(layout = grid.layout(nrow(layout), ncol(layout))))
    
    # Make each plot, in the correct location
    for (i in 1:numPlots) {
      # Get the i,j matrix positions of the regions that contain this subplot
      matchidx <- as.data.frame(which(layout == i, arr.ind = TRUE))
      
      print(plots[[i]], vp = viewport(layout.pos.row = matchidx$row,
                                      layout.pos.col = matchidx$col))
    }
  }
}


######### WORLD MAP #################
setwd("~/Pulpit/wizR/TechnikiWizualizacjiDanych/MINI_MIMUW_2014/PISA/Faza 2/Kiljan_Wos")
worldshape <- readShapePoly("materials/TM_WORLD_BORDERS-0.3.shp") 

levels(worldshape@data$NAME)[121] = "Somethingland Islands"

#fortify for ggplot
worldmap <- fortify(worldshape, region = "NAME")

#Europe only
#europecitiesAll <- c("Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Georgia","Germany","Greece","Hungary","Iceland","Ireland","Italy","Kazakhstan","Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta","Moldova","Monaco","Montenegro","Netherlands","Norway","Poland","Portugal","Romania","Russia","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom")
#europecities <- c("Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Georgia","Germany","Greece","Hungary","Iceland","Ireland","Italy","Kazakhstan","Latvia","Lithuania","Luxembourg","Macedonia","Malta","Moldova","Monaco","Montenegro","Netherlands","Norway","Poland","Portugal","Romania","Russia","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom")
europecities <- c("Albania","Armenia","Austria","Belgium","Bulgaria","Croatia","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Ireland","Italy","Kazakhstan","Latvia","Lithuania","Macedonia","Moldova","Montenegro","Netherlands","Norway","Poland","Romania","Serbia","Slovenia","Spain","Sweden","Switzerland","United Kingdom")
europecitiesLimited <- c("Netherlands", "Estonia", "Austria", "Ireland", "Slovenia", "France", "Italy", "Spain", "Hungary", "Turkey", "Poland");

europemap <- worldmap %>%  filter(id %in% europecities)

########## PISA DATA ###############
#con <- url("http://biecek.pl/MIMUW/PISAeurope.rda")
#print(load(con))

# dane z githuba mocno pocięte (malo panstw europejskich), uzylem z innego zrodla, takze PISA 2012
# source: http://www.theguardian.com/news/datablog/2013/dec/03/pisa-results-country-best-reading-maths-science
math <- read.csv(file="materials/Pisa2.csv",head=TRUE,sep=",")
math <- math %>% filter(X %in% europecities)


############## CENTRE FOR EACH COUNTRY ###########
wsp <- sapply(worldshape@polygons,   function(x) x@labpt)
df <- data.frame(cnt=worldshape@data$NAME, long = wsp[1,], lat = wsp[2,])
df <- df %>% filter(cnt %in% europecities)
#dfl <- df %>% filter(cnt %in% europecitiesLimited)

# fix centre of Norway:
df[33,]$long = 10
df[33,]$lat = 61.5

######### MERGE MAP DATA WITH PISA ########
merged <- merge(df, math, by.x="cnt", by.y="X")

colnames(merged)[8] <- "ShareWithDisadvantages"
colnames(merged)[4] <- "MeanMaths"


regresja <- ggplot(merged, aes(x=MeanMaths, y=ShareWithDisadvantages, label=cnt)) +
  geom_point(color = "grey") +
  geom_text(hjust = 1, vjust=1, colour = "white") +
  geom_smooth(size = 2, method = "lm") +  
  theme_solarized(light = FALSE) +
  theme(
    axis.title = element_text(face="bold", colour="white", size=24),
    axis.text = element_text(size=18),
    plot.title=element_text(size=30, colour ="white")) +
  xlab("Mean result from Maths") +
  ylab("Students with socio-economical disadvantages [%]")
regresja

merged <- merge(df, math, by.x="cnt", by.y="X")
colnames(merged)[8] <- "ShareWithDisadvantages"
colnames(merged)[4] <- "MeanMaths"

######### BASE PLOT ####################
conturs <- geom_path(data=europemap, aes(x=long, y=lat, group=group), colour="black", size=0.1)
base <- ggplot() +
  geom_polygon(data=europemap, aes(x=long, y=lat, group=group), fill = "grey50")
base

####### MAKE LOOK SWEET ##################
latlimits <- c(30, 75) 
longlimits <- c(-25, 45) 

base <- base + 
  theme_solarized(light="false") +
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
  theme(legend.text=element_text(size=14, colour="white"), legend.title=element_text(size=14,colour="white")) +
  theme(legend.position = c(1, 0.45), 
        legend.justification = c(1, 0.45), 
        legend.background = element_rect(colour = "black", fill = "#003366")) +
  theme(plot.title=element_text(size=30, colour ="white"))


###### FINALL PLOTS: ###########################
math_score_plot <- base + 
  geom_map(data=merged, aes(map_id=cnt, fill=MeanMaths), map=europemap) + conturs +
  ggtitle("Mean score on the math test for each country")  +
  scale_fill_gradient(name="Points", low="red", high="yellow")  +
  geom_text(data=merged, aes(x=long, y=lat, label=MeanMaths), size = 8, color="white", fontface="bold", aplha=0.8) +
  geom_text(data=merged, aes(x=long, y=lat, label=MeanMaths), size = 8) 
math_score_plot

multiplot(math_score_plot, regresja, cols=2) 
