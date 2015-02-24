setwd("/home/kitek/TWD_repo/MINI_MIMUW_2014/materialy_z_wykladow_i_lab/mapy")
library(maptools)
library(ggplot2)
library(rgdal)
library(gpclib)
gpclibPermit()

shp1 <- readShapePoly("POL_adm/POL_adm1.shp")
levels(shp1@data$VARNAME_1)[3] = "Lodzkie"

# wyciagamy srodki kazdego z wojewodztw
wsp <- sapply(shp1@polygons, function(x) x@labpt)

# fortify zmienia format danych na ggplot2 spójny
shp1f <- fortify(shp1, region = "VARNAME_1")

load("shp1f.rda")
load("wybory2014.rda")
read.table("clipboard", header=T, sep="\t",dec=",")

wybory2014 = head(wybory2014, -1)

partie = c("PSL", "PO", "PIS", "SLD")
offset = 0.05
width = 0.1

n = length(partie)
start_offset = (n * width + (n-1) * offset) / 2

i = 1
mand = data.frame(mand=numeric(0), lat=numeric(0), partia=character(0), xmin=numeric(0), ymin=numeric(0))
for (partia in partie) {
    mand <- rbind(mand, data.frame(
        mand = wybory2014[[paste("Mandaty", partia, sep=".")]] / wybory2014$Suma.mandatow,        
        partia = partia,
        rect_ymin = wsp[2,] - 0.2,
        rect_xmin = wsp[1,] - start_offset + (i-1) * (width + offset)  
  ))
  i = i + 1
}

ggplot() +
  geom_path(data=shp1f, aes(x=long, y=lat, group=id), colour="#878686", size=0.7) +
  geom_rect(data=mand, aes(xmin=rect_xmin, xmax=rect_xmin+width, ymin=rect_ymin, ymax=rect_ymin + mand, fill=partia)) +
  scale_fill_manual(values=c("green", "orange", "blue", "red"), 
                    name="Partie",
                    breaks=partie) +
  coord_map(projection="mercator") +
  theme_bw() +
  scale_size_continuous(range=c(1,20)) +
  theme(axis.ticks = element_blank(),
        axis.text.x = element_blank(),
        axis.text.y = element_blank(),
        panel.grid.minor=element_blank(),
        panel.grid.major=element_blank(),
        axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        panel.border = element_blank(),
        text=element_text(size=25)) +
  ggtitle("Podział mandatów w województwach")
