

library(maptools)
library(ggplot2)
library(rgdal)
library(mapproj)
library(rgeos)

shp0 <- readShapePoly("POL_adm/POL_adm0.shp") 
shp0f <- fortify(shp0, region = "ISO")

shp1 <- readShapePoly("POL_adm/POL_adm1.shp") 
levels(shp1@data$NAME_1)[4] = "Lodzkie"

# wyciagamy srodki kazdego z wojewodztw
wsp <- sapply(shp1@polygons,   function(x) x@labpt)

# save(shp1f, file="shp1f.rda")
load("shp1f.rda")
lodz <- unique(shp1f$id)[4]
shp1f$id[shp1f$id==lodz] <- "Lodzkie"
#

# dane o wyborach
library(gdata)

wybory2014 <- read.table("projekty/wybory.csv",header=T,sep="\t",
                         dec=",")

wybory2014 <- read.table("clipboard",header=T,sep="\t",
                         dec=".")

id <- as.character(wybory2014$ID)
id[5] <-  "Lodzkie"
wybory2014$ID <- id
wybory2014.1 <- merge(df,wybory2014,by.x="voj",by.y="ID")
wybory2014.1

slask <- shp1f[shp1f$id==c("Silesian"),]
malopolska <- shp1f[shp1f$id==c("Lesser Poland"),]
lodzkie <- shp1f[shp1f$id==c("Lodzkie"),]
wlkp <- shp1f[shp1f$id==c("Greater Poland"),]
kujawy <- shp1f[shp1f$id==c("Kuyavian-Pomeranian"),]
wawa <- shp1f[shp1f$id==c("Masovian"),]
opole <- shp1f[shp1f$id==c("Opole"),]

# slask + malopolska
sm <- merge(slask,malopolska,by.x="lat",by.y="lat")
sm<- sm[sm$long.x==sm$long.y,]

# lodzkie + wlkp
lw <- merge(lodzkie,wlkp,by.x="lat",by.y="lat")
lw <- lw[lw$long.x==lw$long.y,]

# lodzkie + kujawy
lk <- merge(lodzkie,kujawy,by.x="lat",by.y="lat")
lk <- lk[lk$long.x==lk$long.y,]

# wawa + kujawy
wk <- merge(wawa,kujawy,by.x="lat",by.y="lat")
wk <- wk[wk$long.x==wk$long.y,]

# lodzkie + slask
ls <- merge(lodzkie,slask,by.x="lat",by.y="lat")
ls <- ls[ls$long.x==ls$long.y,]

# lodzkie + opole
lo <- merge(lodzkie,opole,by.x="lat",by.y="lat")
lo <- lo[lo$long.x==lo$long.y,]

cale <- data.frame(rbind(sm,lw,lk,wk,ls,lo))

# cale warminsko-mazurskie + swietokrzyskie

psl <- shp1f[shp1f$id==c("Warmian-Masurian","Swietokrzyskie"),]


# opcja z zoltym i czerwonym
ggplot() +
  geom_path(data=shp0f, aes(x=long, y=lat, group=id), colour="grey10", size=3) +
  geom_map(data=wybory2014, aes(map_id=ID, fill=FrekwencjaNa1730), map=shp1f) +
  ggtitle("Wygrane partie (w liczbie mandatów) w województwach \ni frekwencja wyborcza wewnątrz nich")+
  geom_path(data=shp1f, aes(x=long, y=lat, group=id),colour="white", size=0.000001) +
  geom_path(data=cale, aes(x=long.x, y=lat, group=id.y), colour="grey10", size=1.5) +
  geom_path(data=psl, aes(x=long, y=lat, group=id), colour="grey10", size=1.5) +
  geom_text(data=wybory2014.1,aes(x=long, y=lat, label=Wygrany,col=Wygrany),size=8,show_guide=F)+
  scale_color_manual(values=c("yellow","darkred","red"))+
  coord_map(projection="mercator") +
  theme_bw() +
  scale_fill_gradient(high = "yellow", low = "red", 
                      guide=guide_legend(title="Frekwencja \n na wyborach")) +
  theme(axis.ticks = element_blank(),
        axis.text.x = element_blank(),
        axis.text.y = element_blank(),
        panel.grid.minor=element_blank(),
        panel.grid.major=element_blank(),
        axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        panel.border = element_blank(),
        plot.title = element_text(size = 25, colour = "grey20"))




