library(maptools)
library(ggplot2)
library(rgdal)

setwd("/Users/pawel_adamowicz/Documents/studia/TechnikiWizualizacjiDanych/MINI_MIMUW_2014/materialy_z_wykladow_i_lab/mapy")
shp1 <- readShapePoly("POL_adm/POL_adm1.shp") 

#
# wyciagamy srodki kazdego z wojewodztw
wsp <- sapply(shp1@polygons,   function(x) x@labpt)  #iterujemy po kolekcji wojewodztw
#sapply - simplify appy, czyli apply do kazdego obiektu, działa jak mapper i jeszcze próbuje uprościć wynik
#tutaj: zamieni liste na macierz


setwd("/users/pawel_adamowicz/Downloads")
load("shp1f.rda")

shp1f$group <- gsub("Łódzkie.1", "Lodzkie.1",shp1f$group)
#replace(shp1f$group, shp1f$group=="Łódzkie.1", "Lodzkie.1")
#shp1f$group <- ifelse(shp1f$group == "", , shp1f$group)
shp1f$id <- ifelse(shp1f$id == "Łódzkie", "Lodzkie", shp1f$id)

library(mapproj)


#wybory2014 <- read.table("clipboard", header=T, sep="\t",dec=",") #wczytanie ze schowka (wejdz do Excela i skopiuj, potem to)
#wybory <- wybory2014
load("wybory.rda")

    
      
cbPalette <- c("darkblue", "darkorange1", "green3")      
      
df <- data.frame(voj=unique(shp1f$id), val=as.numeric(as.character(wybory2014$FrekwencjaNa1730)), long = wsp[1,], lat = wsp[2,])
df$val <- df$val/100      
      
      
ggplot() +
  geom_map(data=wybory2014, aes(map_id=Wojewodztwo, fill=MAX), map=shp1f) +
  geom_path(data=shp1f, aes(x=long, y=lat, group=id), colour="black", size=0.25) +
  scale_fill_manual(values=cbPalette) +
  geom_rect(data=df, aes(xmin=long-0.1, xmax=long+0.1, ymin=lat-0.2, ymax=lat+val-0.2), fill="black", color="black") +
  geom_text(data=df,aes(x=long, y=lat+val+0.1, label=val*100), size=5, color="black", alpha=1) +
  theme_bw() +
    theme(
      plot.background = element_blank(),
      panel.grid.major = element_blank(),
      panel.grid.minor = element_blank(),
      panel.border = element_blank(),
      axis.line = element_blank(),
      axis.ticks = element_blank(), 
      axis.title.x = element_blank(),
      axis.title.y = element_blank(),
      axis.text.y = element_blank(), 
      axis.text.x = element_blank(),
      axis.text.y = element_blank(),
      axis.text.y = element_blank()
    )      
