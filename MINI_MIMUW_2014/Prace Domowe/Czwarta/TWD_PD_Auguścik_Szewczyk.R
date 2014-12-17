r1988<-c(61.8,22.8,13.6,1.8,0,0)
r2002<-c(56,22.7,17.2,2.2,1.1,0.8)
r2011<-c(49.7,24.6,19.8,3,1.6,1.3)


rok<-c(rep('1988',6),rep('2002',6),rep('2011',6))
legenda<-rep(c("1","2","3","4","5","6"),3)
ile<-c(r1988,r2002,r2011)
sku_ile <- c(cumsum(r1988),cumsum(r2002),cumsum(r2011))
sku_ile[c(4,5,6,10,11,12,16,17,18)] <-rep(-10,9) 
DANE<-data.frame(rok,legenda,ile, sku_ile)

levels(DANE$legenda) <- c("ma³¿eñstwo z dzieæmi","ma³¿eñstwa bez dzieci" ,"matki z dzieæmi","ojcowie z dzieæmi",
                          "partnerzy z dzieæmi",
                          "partnerzy bez dzieci")
#library(ggplot2)
#library(dplyr)

p <- ggplot(DANE, aes(x=rok, y=ile, fill=legenda)) +
   geom_bar(stat='identity', width=0.7,colour="black")   +
   ggtitle("Polskie rodziny w liczbach") +
   scale_fill_brewer(palette="Blues", guide=guide_legend(title="Legenda", reverse=TRUE)) +
   theme_set(theme_classic(base_size = 20)) +
   geom_text(aes(x=rok, y=sku_ile-5, label=paste(ile,"%")), size=7) + 
   ylim(0,100)

