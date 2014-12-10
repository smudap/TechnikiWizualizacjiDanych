library(dplyr)
library(ggplot2)
library(Hmisc)
library(gridExtra)

con <- url("http://biecek.pl/MIMUW/PISAeurope.rda")
print(load(con))


############################################################################
############################################################################
########################################### wykres 5 #######################

#### przygotowanie danych ####
#head(pisa)
#02 moze byc
dane <- pisa[,c("CNT","ST29Q07","PV1MATH","W_FSTUWT")]
#head(dane)

dane1 <- dane[!is.na(dane[,2]),]
#head(dane1)

dane2 <- dane1 %>%
   group_by(CNT,ST29Q07) %>%
   summarise(math = weighted.mean(PV1MATH, W_FSTUWT, na.rm = TRUE),
             liczba=n()) 
#head(dane2)

dane3 <- dane1 %>%
   group_by(CNT) %>%
   summarise(math = weighted.mean(PV1MATH, W_FSTUWT, na.rm = TRUE),
             calosc=n()) 
#head(dane3)

dane4 <- data.frame(matrix(0,nrow(dane2),4))
names(dane4)<-c("CNT","ODP","math","liczba")
for (i in 1:nrow(dane2)){
   kraj <- levels(dane2$CNT)[dane2$CNT[i]]
   dane4[i,3]<- dane3[dane3$CNT==kraj,2]
   dane4[i,4] <- dane2$liczba[i]/dane3[dane3$CNT==kraj,3]
}

names(dane2)[2] <- "ODP"
dane4$CNT <- dane2$CNT
dane4$ODP <- dane2$ODP

dane4$reorder <- rep(c(1,2,3,4),10)
dane4$CNT <- reorder(dane4$CNT,-dane4$math)
dane4$ODP <- reorder(dane4$ODP,-dane4$reorder)
dane4$reorder <- NULL
#as.factor(dane4$ODP)

#### przygotowanie wykresu (dane2) ####
w <- ggplot(dane4, aes(x=CNT, y=ODP)) + 
   ggtitle("Mathematics is an important subject for me because I need it
           for what I want to study later on") +
   theme(
      plot.title=element_text(face="bold"),
      axis.title=element_blank(),
      panel.background=element_blank()   
   )

ww <- w +  geom_tile(aes(fill=math)) + 
   scale_fill_gradient(low="yellow", high="red",name="Math result")

w5 <- ww +   geom_point(aes(size=liczba),col="black") + 
   scale_size_continuous(range = c(1, 20),name="Fraction of \nanswers")

############################################################################
############################################################################
########################################### wykres 1 #######################

kw <- pisa[,c("ST29Q01","ST29Q02","ST29Q03","ST29Q04","ST29Q05",
              "ST29Q06","ST29Q07","ST29Q08","W_FSTUWT")]

names(kw) <- c("EnjoyRead","Effort","Forward","Enjoy","WorthIt",
               "Interested","Important","HelpJob","waga")

subkw <- kw[,c("Enjoy","WorthIt","waga")]

subkw1 <- subkw[as.logical((!is.na(subkw[,1]))*(!is.na(subkw[,2]))),]

d <- subkw1 %>%
   group_by(Enjoy,WorthIt) %>%
   summarise(n=sum(waga,na.rm=T))

d$n <- d$n/sum(d$n)
d$percent <- round(d$n*100,1)
d$pertext <- paste0(d$percent,"%")

d$Enjoy <- factor(d$Enjoy, rev(levels(d$Enjoy)))
d$WorthIt <- factor(d$WorthIt, rev(levels(d$WorthIt)))


g <- ggplot(d, aes(Enjoy, WorthIt,label=pertext))+
   ggtitle("Do we like mathematics or do we just have to do it?")+
   theme(panel.background=element_blank(),
         plot.title=element_text(face="bold"))+
   #theme(
   #panel.background=element_blank(),
   #plot.title=element_text(size=20) ) +
   
   scale_y_discrete(name="Learning maths will improve my career options") +
   scale_x_discrete(name="I do mathematics because I enjoy it") 

g1 <- g +  geom_raster(aes(fill=n)) +
   scale_fill_gradient(high="#D7301F", low="#FDD49E",name="% of responses",
                       guide=F)
w1 <- g1 +  geom_text(colour="white")

############################################################################
############################################################################
########################################### wykres 2 i 3 ###################

pytania<-c('ST55Q02','ST57Q01','ST57Q02','ST57Q03','ST57Q04','ST57Q05','ST57Q06','ST69Q02','ST70Q02')
pytania2<-c('ST57Q01','ST57Q02','ST57Q03','ST57Q04','ST57Q05','ST57Q06','ST69Q02','ST70Q02')
dane<-pisa[,pytania2]

names(dane)<-c('Q43a','Q43b','Q43c','Q43d','Q43e','Q43f','Q46','Q47')

podstawowe<-((dane['Q46']*dane['Q47']) / 60)+dane['Q43a']+dane['Q43b']

dodatkowe=dane[,3]
for (i in 4:6) dodatkowe=dodatkowe+dane[,i]


info<-cbind(podstawowe,dodatkowe,pisa$PV1MATH,pisa$W_FSTUWT)
names(info)<-c('podstawowe','dodatkowe','matma','waga')

#ggplot(info,aes(x=podstawowe,y=dodatkowe))+geom_point()+xlim(0,50)+ylim(0,50)

info$podstawowe<-round(info$podstawowe*10000)/10000
info2<-info %>% filter(!is.na(podstawowe), !is.na(dodatkowe),!is.na(matma))
info2<-info2 %>% group_by(dodatkowe,podstawowe) %>% summarise(sr = weighted.mean(matma, waga, na.rm = TRUE),
                                                              ile=sum(waga))

info3<-info2[order(info2$podstawowe,info2$dodatkowe),]



r1<-ggplot(info3,aes(x=podstawowe,y=dodatkowe,z=sr))+xlim(5,25)+
   ylim(0,12)+ stat_contour(binwidth = 3,aes(colour=..level..))+
   scale_colour_gradient(low = "green", high = "red")+
   labs(colour='Points')+
   theme(panel.background = element_blank()
   )+xlab(label = "Time spent on math in school and on homework")+
   ylab(label="Time spent on studying and on out of school classes ")+
   ggtitle("Points earned on math test, depending on time spent on learning")+
   theme(plot.title=element_text(face="bold"))
#plot.title = element_text(size = rel(2)),

info4<-info3
info4$podstawowe<-round(info3$podstawowe)
info4<-info4 %>% group_by(podstawowe) %>% summarise(sr2=weighted.mean(sr,ile))

r2<-ggplot(info4,aes(x=podstawowe,y=sr2,fill=sr2))+geom_bar(stat="identity")+xlim(0,50)+coord_flip()+
   ylab(label="Average math test results")+xlab(label = "Time spent on math in school and on homework")+
   theme(legend.position = "none",panel.background = element_blank(),
         panel.grid.major.y = element_blank(),
         panel.grid.major =element_line(colour = "mediumturquoise"))+
   scale_fill_continuous(low = "lightskyblue",high = "midnightblue")

info5<-info3 %>% group_by(dodatkowe) %>% summarise(sr2=weighted.mean(sr,ile))
r3<-ggplot(info5,aes(x=dodatkowe,y=sr2,fill=sr2))+geom_bar(stat="identity")+xlim(0,50)+coord_flip()+
   scale_y_reverse()+xlab(label="Time spent on studying and on out of school classes ")+
   ylab(label="Average math test results")+
   theme(legend.position = "none",panel.background = element_blank(),
         panel.grid.major.y = element_blank(),
         panel.grid.major =element_line(colour = "mediumturquoise"))+
   scale_fill_continuous(low = "aquamarine",high = "chartreuse4")

############################################################################
############################################################################
########################################### wykres 4 #######################

avgs2 <- 
   pisa %>% 
   group_by(ST28Q01) %>%
   summarise(math = wtd.mean(PV1MATH, W_FSTUWT, na.rm=TRUE),
             n = n())
avgs2 <- na.omit(avgs2)
avgs2

mat<-avgs2$math
mat2<-mat/max(mat)
mat2<-2*round(mat2,digits=3)
mat2

bks<-c(1,3,6,10,14,17)

#####################################################
### szafka
#lewa sciana
h=7 #wysokosc szafki
w=3 #szerokosc szafki
x = c(0,0,0.1,0.1)
y = c(0,h,h,0)
#+prawa sciana
x = c(x, NA, w-0.1,w-0.1,w,w)
y = c(y, NA, 0, h, h, 0)
id=rep(0,length(x))

#polki s¹ co 1 okolo
for (i in 1:(h-1)){
   x = c(x, NA, 0,0,w,w)
   y = c(y, NA, i, i+0.2, i+0.2, i)
   id= c(id, rep(0,5))
}

# wyniki z matematyki
# zakladamy, ze jest ich tyle, co h
for (i in 1:(h-1)){
   x = c(x, NA, 0.1,0.1,mat2[i],mat2[i])
   y = c(y, NA, i, i+0.2, i+0.2, i)
   id= c(id, rep(2,5))
}
# ksiazki
g<-round((w-0.2)/18,2) # grubosc ksiazki
k<-0.6
for (i in 1:(h-1)){
   for (j in 1:bks[i]){
      x = c(x, NA, 0.1+(j-1)*g+0.02,0.1+(j-1)*g+0.02,0.1+j*g,0.1+j*g)
      y = c(y, NA, i+0.2, i+0.2+k, i+0.2+k, i+0.2)
      id= c(id, rep(1,5))
   }
}


positions <- data.frame(
   x=x,y=y,id=id
)

bks2<-levels(avgs2$ST28Q01)

p1<-ggplot(positions, aes(x=x, y=y)) +
   #geom_polygon(fill="brown",color="black")
   geom_polygon(aes(fill=id,group=id),color="black")
p1

#paste(round(mat),"pts")
w4<-p1+scale_fill_gradient(low="Brown",high="Gold")+ 
   annotate("text", x = c(mat2,rep(2.96,6)), y = c(1:6,1:5+0.7,6.9),
            label = c(round(mat),bks2),hjust=1.2,vjust=-0.3,size=3) +
   ggtitle("Number of books at home vs. math results")+
   theme(legend.position = "none",panel.background=element_blank(),
         plot.background = element_blank()
         ,panel.grid.major = element_blank()
         ,panel.grid.minor = element_blank()
         ,panel.border = element_blank(),
         axis.line = element_blank(), 
         axis.text.x = element_blank(), 
         axis.text.y = element_blank(),
         axis.ticks = element_blank(),
         axis.title.x = element_blank(), 
         axis.title.y = element_blank(),
         plot.title=element_text(face="bold"))
w4

## prowizorycznie tytu³ ca³ej kartki
w0<-ggplot(positions, aes(x=x, y=y)) + geom_blank()  +
   ggtitle("Mathematics in PISA")+
   theme(legend.position = "none",panel.background=element_blank(),
         plot.background = element_blank()
         ,panel.grid.major = element_blank()
         ,panel.grid.minor = element_blank()
         ,panel.border = element_blank(),
         axis.line = element_blank(), 
         axis.text.x = element_blank(), 
         axis.text.y = element_blank(),
         axis.ticks = element_blank(), 
         axis.title.x = element_blank(), 
         axis.title.y = element_blank(),
         plot.title=element_text(size=40))

############################################################################
########################################### ALL ############################
############################################################################
# G E N E R O W A N I E #######################################
###############################################################

##### WAZNE - eksportowac do PDF orientacji "Portrait", wymiary 15.21 x 21.45
grid.newpage() 
## tytul
print(w0, vp=viewport(x=0.5, y = 0.5, 
                      width=1, height=1))
## 1 
print(w1, vp=viewport(x=0.25, y=0.8,#y = 0.825, 
                      width=0.45, height=0.3))
## 2 
print(r1, vp=viewport(x=0.75, y=0.8,#y = 0.825, 
                      width=0.45, height=0.3))
## 3 
print(r3, vp=viewport(x=0.16, y = 0.49, 
                      width=0.25, height=0.3))
print(r2, vp=viewport(x=0.41, y = 0.49, 
                      width=0.25, height=0.3))
## 4 
print(w4, vp=viewport(x=0.73, y = 0.49, 
                      width=0.44, height=0.33))
## 5 
print(w5, vp=viewport(x=0.5, y = 0.17, 
                      width=1, height=0.28))

