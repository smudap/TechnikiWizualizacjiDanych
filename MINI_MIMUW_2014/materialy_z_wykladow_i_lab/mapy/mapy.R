setwd("/Users/pbiecek/GitHub/TechnikiWizualizacjiDanych/MINI_MIMUW_2014/materialy_z_wykladow_i_lab/mapy/")

require(maptools)

newproj <- "+proj=utm +zone=55 +south +ellps=GRS80 +units=m"
# kontury kraju
# i konktury wojewodztw
shape0 <- readShapeSpatial("POL_adm/POL_adm0", proj4string = CRS(newproj))
shape1 <- readShapeSpatial("POL_adm/POL_adm1", proj4string = CRS(newproj),repair=TRUE,force_ring=T,verbose=TRUE) 

plot(shape1, col="grey80",border="white", lwd=2, axes=F)

#
# podsumowanie pliku z mapkami
summary(shape1)

#
# zobaczmy co jest w odczytanym obiekcie
# metadane
shape1@data

# ksztalt konkturu
str(shape1@polygons[[1]])

#
# punkty dla danego konkturu
shape1@polygons[[1]]@Polygons[[1]]@coords
plot(shape1@polygons[[1]]@Polygons[[1]]@coords, pch=19)

# powierzchnia wskazanego obszaru
shape1@polygons[[1]]@Polygons[[1]]@area

#
# srodek konturu
shape1@polygons[[1]]@labpt

#
# wyciagamy srodki kazdego z wojewodztw
wsp <- sapply(1:nrow(shape1@data), 
              function(x) (shape1@polygons[[x]]@labpt))
# na ekranie wypisujemy nazwy 
plot(shape1, col="grey80",border="white", lwd=2, axes=T)
text(wsp[1,], wsp[2,], shape1@data$VARNAME_1, cex=0.8, col="red", adj=c(0.5,0.5))


#
# kolorujemy kazde z wojewodztw innym kolorem
# @ w zaleznosci od wartosci zmienna zmienna

library(classInt)     
library(RColorBrewer) 

zmienna <- round(rnorm(16)*100)/10
lklas   <- 4
kolory <- brewer.pal(lklas,"Spectral")
klasy <- classIntervals(zmienna, lklas, style="quantile")
koloryW <- findColours(klasy, kolory)

plot(shape1, col=koloryW,border="black", lwd=1, axes=F)
#
# dopisujemy napisy
text(wsp[1,], wsp[2,], paste(zmienna, "%"), cex=1.1, col="black")
#
# i legende
par(xpd=NA)
legend(23.5, 55.5, legend=names(attr(koloryW, "table")), fill=attr(koloryW, "palette"), bty="n")
par(xpd=T)


