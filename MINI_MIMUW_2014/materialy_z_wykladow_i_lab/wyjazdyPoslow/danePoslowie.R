http://biqdata.pl/wyjazdy-a-glosowania-poslow


library(gdata)
dane <- read.xls("~/GitHub/TechnikiWizualizacjiDanych/MINI_MIMUW_2014//materialy_z_wykladow_i_lab//untitled folder//Untitled 2.xlsx", 1)
 
dat <- sapply(1:nrow(dane), function(i){
  sapply(strsplit(strsplit(as.character(dane[i,1]), split="\\n")[[1]], split=": "), '[', 2)  
})

cn <- sapply(strsplit(strsplit(as.character(dane[1,1]), split="\\n")[[1]], split=": "), '[', 1)  
 
dane <- t(dat) 
colnames(dane) <- cn 
dane <- as.data.frame(dane)

dane[,6] <- as.numeric(gsub(dane[,6], pattern=",", replacement=""))

setwd("~/GitHub/TechnikiWizualizacjiDanych/MINI_MIMUW_2014//materialy_z_wykladow_i_lab//untitled folder//")

save(dane, file="dane.rda")
 