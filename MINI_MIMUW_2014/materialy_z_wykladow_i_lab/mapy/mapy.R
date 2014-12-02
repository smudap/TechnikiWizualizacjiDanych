setwd("/Users/pbiecek/GitHub/TechnikiWizualizacjiDanych/MINI_MIMUW_2014/materialy_z_wykladow_i_lab/mapy/")

library(maptools)
library(ggplot2)
library(rgdal)
library(gpclib)
gpclibPermit()

shp1 <- readShapePoly("POL_adm/POL_adm1.shp") 
levels(shp1@data$VARNAME_1)[3] = "Lodzkie"

# zobaczmy co jest w odczytanym obiekcie
# metadane
shp1@data
summary(shp1)

# ksztalt konkturu
str(shp1@polygons[[1]])

# srodek konturu
shp1@polygons[[1]]@labpt

#
# wyciagamy srodki kazdego z wojewodztw
wsp <- sapply(shp1@polygons,   function(x) x@labpt)

#
# fortify zmienia format danych na ggplot2 spójny
shp1f <- fortify(shp1, region = "VARNAME_1")
# save(shp1f, file="shp1f.rda")
load("shp1f.rda")

#
# mapka w ggplot
ggplot() +
  geom_path(data=shp1f, aes(x=long, y=lat, group=id), colour="black", size=0.25)

#
# losowy zbior danych do cwiczen
df <- data.frame(voj=shp1@data$VARNAME_1, val=runif(16), long = wsp[1,], lat = wsp[2,])

#
# wojewodztwa wypelnione kolorem
# [losowym]
ggplot() +
  geom_map(data=df, aes(map_id=voj, fill=val), map=shp1f) +
  geom_path(data=shp1f, aes(x=long, y=lat, group=id), colour="black", size=0.25)
  
#
# jak określić projekcje
ggplot() +
  geom_map(data=df, aes(map_id=voj, fill=val), map=shp1f) +
  geom_path(data=shp1f, aes(x=long, y=lat, group=id), colour="black", size=0.25) +
  coord_map(projection="mercator")

#
# to szare tło wcale nie jest potrzebne
ggplot() +
  geom_map(data=df, aes(map_id=voj, fill=val), map=shp1f) +
  geom_path(data=shp1f, aes(x=long, y=lat, group=id), colour="black", size=0.25) +
  coord_map(projection="mercator") +
  theme_bw() +
  theme(axis.ticks = element_blank(),
        axis.text.x = element_blank(),
        axis.text.y = element_blank(),
        panel.grid.minor=element_blank(),
        panel.grid.major=element_blank(),
        axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        panel.border = element_blank())

#
# to szare tło wcale nie jest potrzebne
ggplot() +
  geom_map(data=df, aes(map_id=voj, fill=val), map=shp1f) +
  geom_path(data=shp1f, aes(x=long, y=lat, group=id), colour="white", size=1) +
  coord_map(projection="mercator") +
  theme_bw() +
  scale_fill_gradient(low = "grey90", high = "black") +
  theme(axis.ticks = element_blank(),
        axis.text.x = element_blank(),
        axis.text.y = element_blank(),
        panel.grid.minor=element_blank(),
        panel.grid.major=element_blank(),
        axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        panel.border = element_blank())

#
# A może wielkością punktu?
ggplot() +
  geom_point(data=df, aes(x=long, y=lat, size=val)) +
  geom_path(data=shp1f, aes(x=long, y=lat, group=id), colour="black", size=0.25) +
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
        panel.border = element_blank())

#
# A może długością paska
ggplot() +
  geom_path(data=shp1f, aes(x=long, y=lat, group=id), colour="grey", size=0.25) +
  geom_rect(data=df, aes(xmin=long-0.2, xmax=long+0.2, ymin=lat-0.2, ymax=lat + val), fill="black", color="black") +
  geom_rect(data=df, aes(xmin=long+0.4, xmax=long+0.2, ymin=lat-0.2, ymax=lat + val/2), fill="red4", color="black") +
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
        panel.border = element_blank())



# dane o wyborach
# library(gdata)
# wybory2014 <- read.xls("wybory2014.xlsx", 1)
# save(wybory2014, file="wybory2014.rda")
load("wybory2014.rda")

read.table("clipboard", header=T, sep="\t",dec=",")

wybory2014


#
# Zadanie:

# Czy jest zależność pomiędzy wynikami a frekwencją 
# (tak jest)
# pokaż w ciekawy sposób wyniki wyborów i/lub informacje o frekwencji

# najlepsze prace domowe (za zgodą autorów) trafią na blog

