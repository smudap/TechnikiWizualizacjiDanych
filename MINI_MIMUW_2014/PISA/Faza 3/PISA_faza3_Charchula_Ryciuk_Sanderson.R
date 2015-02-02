# library(dplyr)
# library(ggplot2)
# library(Hmisc)
# library(gridExtra)
# 
# con <- url("http://biecek.pl/MIMUW/PISAeurope.rda")
# print(load(con))


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

hihi<-as.data.frame(cbind(CNT=dane4$CNT,ODP=dane4$ODP))
hihi$math<-dane4$math
hihi$liczba<-dane4$liczba
#### przygotowanie wykresu (dane2) ####
w <- ggplot(dane4, aes(x=CNT, y=ODP)) + 
   ggtitle("Mathematics is an important subject for me because I need it
for what I want to study later on") +
   scale_y_discrete(labels = c("strongly\ndisagree","disagree","agree","strongly\nagree"))+
   theme(
      plot.title=element_text(face="bold",size=19),
      axis.title=element_blank(),
      panel.background=element_blank(),
      axis.text.x  = element_text(angle=32, hjust=0.8,size=16),
      axis.text.y  = element_text(size=15),
      axis.ticks = element_blank()
   )

ww <- w +  geom_tile(aes(fill=math)) + 
   scale_fill_gradient(low="antiquewhite", high="maroon4",name="Math result")

w5 <- ww +   geom_point(aes(size=liczba),col="black") + 
   scale_size_continuous(range = c(1, 20),name="Fraction of \nanswers") +
   geom_rect(data=hihi, size=1, fill=NA, colour="black",
             aes(xmin=CNT - 0.5, xmax=CNT + 0.5, 
                 ymin=1 - 0.5, ymax=4 + 0.5))

#w5
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

hihi<-as.data.frame(cbind(Enjoy=d$Enjoy,WorthIt=d$WorthIt))
hihi$pertext <- d$pertext


g <- ggplot(d, aes(Enjoy, WorthIt,label=pertext))+
   ggtitle("I need maths more than I love it")+
   theme(panel.background=element_blank(),
         plot.title=element_text(face="bold",size=19),
         axis.text.x  = element_text(size=15),
         axis.text.y  = element_text(size=15),
         axis.ticks = element_blank(),
         axis.title.x=element_text(size=16),
         axis.title.y=element_text(size=16,vjust=1))+
   #theme(
   #panel.background=element_blank(),
   #plot.title=element_text(size=20) ) +
   scale_y_discrete(name="Learning maths will improve my career options",
                    labels = c("strongly\ndisagree","disagree","agree","strongly\nagree")) +
   scale_x_discrete(name="I do mathematics because I enjoy it",
                    labels = c("strongly\ndisagree","disagree","agree","strongly\nagree")) 

g1 <- g +  geom_raster(aes(fill=n)) +
   scale_fill_gradient(high="maroon4", low="antiquewhite",name="% of responses",guide=F) +
   geom_rect(data=hihi, size=1, fill=NA, colour="black",
             aes(xmin=Enjoy - 0.5, xmax=Enjoy + 0.5, 
                 ymin=WorthIt - 0.5, ymax=WorthIt + 0.5))
w1 <- g1 +  geom_text(colour="black",size=6.5)
#w1
###########
subkw <- kw[,c("Enjoy","EnjoyRead","waga")]

subkw1 <- subkw[as.logical((!is.na(subkw[,1]))*(!is.na(subkw[,2]))),]

d <- subkw1 %>%
   group_by(Enjoy,EnjoyRead) %>%
   summarise(n=sum(waga,na.rm=T))

d$n <- d$n/sum(d$n)
d$percent <- round(d$n*100,1)
d$pertext <- paste0(d$percent,"%")

d$Enjoy <- factor(d$Enjoy, rev(levels(d$Enjoy)))
d$EnjoyRead <- factor(d$EnjoyRead, rev(levels(d$EnjoyRead)))

hihi<-as.data.frame(cbind(Enjoy=d$Enjoy,EnjoyRead=d$EnjoyRead))
hihi$pertext <- d$pertext

gg <- ggplot(d, aes(Enjoy, EnjoyRead,label=pertext))+
   ggtitle("I don't enjoy maths so I won't read about it!")+
   theme(
      
      panel.background=element_blank(),
      plot.title=element_text(face="bold",size=19),
      axis.text.x  = element_text(size=15),
      axis.text.y  = element_text(size=15),
      axis.ticks = element_blank(),
      axis.title.x=element_text(size=16),
      axis.title.y=element_text(size=16,vjust=1)) +
   
   scale_y_discrete(name="I enjoy reading about mathematics",
                    labels = c("strongly\ndisagree","disagree","agree","strongly\nagree")) +
   scale_x_discrete(name="I do mathematics because I enjoy it",
                    labels = c("strongly\ndisagree","disagree","agree","strongly\nagree")) 


gg1 <- gg +  geom_raster(aes(fill=n),colour="black") +
   scale_fill_gradient(high="maroon4", low="antiquewhite",name="% of responses",guide=F) +
   geom_rect(data=hihi, size=1, fill=NA, colour="black",
             aes(xmin=Enjoy - 0.5, xmax=Enjoy + 0.5, 
                 ymin=EnjoyRead - 0.5, ymax=EnjoyRead + 0.5))
w2 <- gg1 +  geom_text(colour="black",size=6.5)
#w2

############################################################################
############################################################################
########################################### wykres 4 #######################

avgs2 <- 
   pisa %>% 
   group_by(ST28Q01) %>%
   summarise(math = wtd.mean(PV1MATH, W_FSTUWT, na.rm=TRUE),
             n = n())
avgs2 <- na.omit(avgs2)


mat<-avgs2$math
mat2<-mat/max(mat)
mat2<-2*round(mat2,digits=3)


################# ***********************************
a <- pisa[,c("ST28Q01","ST29Q01","ST29Q02","ST29Q03","ST29Q04","ST29Q05",
             "ST29Q06","ST29Q07","ST29Q08","W_FSTUWT")]
names(a) <- c("Books","EnjoyRead","Effort","Forward","Enjoy","WorthIt",
              "Interested","Important","HelpJob","waga")
sub_a <- a[,c("Books","EnjoyRead","waga")]
sub_aa <- sub_a[as.logical((!is.na(sub_a[,1]))*(!is.na(sub_a[,2]))),]
sub_aa[which(sub_aa[,2]=="Strongly disagree"),2]<-"Disagree"
sub_aa[which(sub_aa[,2]=="Strongly agree"),2]<-"Agree"
dd<- sub_aa %>%
   group_by(Books,EnjoyRead) %>%
   summarise(n=sum(waga,na.rm=T))
dd$pr <- dd$n/sum(dd$n)
dd$percent <- round(dd$pr*100,1)

agr<-dd$n[c(1,3,5,7,9,11)]
dis<-dd$n[c(2,4,6,8,10,12)]
sm<-agr+dis

enjoy1<-round((agr/sm),3)

######################################
#bks<-c(1,3,6,10,14,17)
bks<-c(0,1,4,9,21,30) #odpowiadaja prawdzie
bks<-bks+1
#####################################################
### szafka
#lewa sciana
h=7 #wysokosc szafki
w=3 #szerokosc szafki
x = c(0,0,0.05,0.05)
y = c(0,h,h,0)
#+prawa sciana
x = c(x, NA, w-0.05,w-0.05,w,w)
y = c(y, NA, 0, h, h, 0)
id=rep(0,length(x))

#polki s¹ co 1 okolo
for (i in 1:(h-1)){
   x = c(x, NA, 0,0,w,w)
   y = c(y, NA, i, i+0.2, i+0.2, i)
   id= c(id, rep(0,5))
}

# wyniki z matematyki/zmienna lubie/nie lubie
# zakladamy, ze jest ich tyle, co h
enjoy2<-0.1+enjoy1*(w-0.1)
for (i in 1:(h-1)){
   #x = c(x, NA, 0.1,0.1,mat2[i],mat2[i])
   x = c(x, NA, 0.05,0.05,enjoy2[i],enjoy2[i])
   y = c(y, NA, i, i+0.2, i+0.2, i)
   id= c(id, rep(2,5))
}

#prostokaty z procentami;
for (i in 1:(h-1)){
   x = c(x, NA, enjoy2[i]-0.2,enjoy2[i]-0.2,enjoy2[i]-0.02,enjoy2[i]-0.02)
   y = c(y, NA, i-0.1, i+0.3, i+0.3, i-0.1)
   id= c(id, rep(2,5))
}


# ksiazki
g<-round((w-0.1)/32,2) # grubosc ksiazki
k<-0.6
for (i in 1:(h-1)){
   for (j in 1:bks[i]){
      x = c(x, NA, 0.05+(j-1)*g+0.02,0.05+(j-1)*g+0.02,0.05+j*g,0.05+j*g)
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
   geom_polygon(aes(fill=id,group=id),color="black",size=1)


#paste(round(mat),"pts")
w4<-p1+scale_fill_gradient(low="maroon4",high="antiquewhite")+ 
   annotate("text", x = c(enjoy2,rep(2.96,6)), y = c(1:6,1:5+0.7,6.9),
            #label = c(round(mat),bks2),hjust=1.2,vjust=-0.3,size=3
            label = c(paste(enjoy1*100,"%",sep=""),bks2),hjust=1.2,vjust=-0.1,size=5) +
   ggtitle("Boost your math result by getting more books (about math), 
           reading them and enjoying it")+
   #scale_y_discrete(name="I enjoy reading about math")+
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
         plot.title=element_text(face="bold", size=19))
         #axis.title.y=element_text(size=16))


###############################
hh=7 #wysokosc szafki
ww=3 #szerokosc szafki
xx = c(0,0,0,0,0,0)
yy = c(1,2,3,4,5,6)
idd=c(1,2,3,4,5,6)

positions2 <- data.frame(
   xx=xx,yy=yy,idd=idd
)
positions2$mat<-round(mat)

p6<-ggplot(positions2, aes(x=xx, y=yy,size=idd,label=mat)) +
   geom_point(colour="lightpink3")+
   scale_size_continuous(range = c(7, 13),name="Fraction of \nanswers")+
   coord_cartesian(ylim = c(-0.7, 7),xlim=c(-0.25,0.5)) +
   geom_text(colour="black",hjust=-0.3)
#p6

w6<-p6+#scale_colour_gradient(low="antiquewhite",high="maroon4")+ 
   ggtitle("Math test results")+
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
         plot.title=element_text(face="bold", size=19))
#w6
###############################


## prowizorycznie tytu³ ca³ej kartki
w0<-ggplot(positions, aes(x=x, y=y)) + geom_blank()  +
   ggtitle("I love mathematics because I have to")+
   scale_x_discrete(name="Marta Charchu³a & Emma Sanderson & Wiktor Ryciuk")+
   theme(legend.position = "none",panel.background=element_blank(),
         plot.background = element_blank()
         ,panel.grid.major = element_blank()
         ,panel.grid.minor = element_blank()
         ,panel.border = element_blank(),
         axis.line = element_blank(), 
         axis.text.x = element_blank(), 
         axis.text.y = element_blank(),
         axis.ticks = element_blank(), 
         axis.title.x = element_text(size=16), 
         axis.title.y = element_blank(),
         plot.title=element_text(size=42,face="bold"))
         
#####
         pp<-ggplot(positions2, aes(x=xx, y=yy)) +
            #geom_polygon(aes(fill=id,group=id))
            geom_blank()

         ww<-pp+scale_y_discrete(name="I enjoy reading about math")+
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
                  #axis.title.y = element_blank(),
                  plot.title=element_text(face="bold", size=19),
                  axis.title.y=element_text(size=16))

############################################################################
########################################### ALL ############################
############################################################################
# G E N E R O W A N I E #######################################
###############################################################

##### WAZNE - eksportowac do PDF orientacji "Portrait", wymiary 15.21 x 21.45
grid.newpage() 
## tytul
print(w0, vp=viewport(x=0.5, y = 0.5, 
                      width=1, height=0.98))
## 1 
print(w1, vp=viewport(x=0.27, y=0.79,#y = 0.825, 
                      width=0.45, height=0.3))
## 2
print(w2, vp=viewport(x=0.72, y=0.79,#y = 0.825, 
                      width=0.45, height=0.3))

## 5 
print(w5, vp=viewport(x=0.5, y = 0.48, 
                      width=0.95, height=0.32))

## 4 
print(w4, vp=viewport(x=0.47, y = 0.17, 
                      width=0.85, height=0.33))

print(w6, vp=viewport(x=0.89, y = 0.17, 
                      width=0.2, height=0.33))
         
print(ww, vp=viewport(x=0.17, y = 0.17, 
                      width=0.2, height=0.33))


# Kosinski

daneMarcin <- dane4 %>% filter( ODP %in% c("Agree", "Strongly agree")) %>%
    group_by( CNT ) %>% mutate( proc = sum(liczba) ) %>% mutate( odp_do_sum = liczba/proc ) %>% filter( ODP %in% "Agree") #%>% rbind(
#      
#      dane4 %>% filter( ODP %in% c("Disagree", "Strongly disagree")) %>%
#        group_by( CNT ) %>% mutate( proc = sum(liczba) ) %>% filter( ODP %in% "Disagree")
#      
#      )
 
 daneMarcin
 
 wMarcin <- ggplot(daneMarcin, aes(x=proc, y=math, label=CNT))+
   geom_smooth(col="red", method="lm")+
   geom_point(size=10, aes(color=odp_do_sum))+xlab("Proportion of Students that Agree and Strongly Agree to all Students")+ylab("Mean Math Score in a Country")+
   ggtitle("Mathematics is an important subject for me because  \n I need it for what I want to study later on")+
   geom_text(aes(family="serif"), size=10, color="orange", hjust=c(0.5, 0.2,rep(0.5,2),1,rep(0.5,5)), vjust=1.4)+
   theme_bw(base_family = "serif", base_size = 28 )+theme(legend.title = element_text(face = "italic"))+
   scale_color_continuous(name="Agree to \n Agree +  \n Strongly Agree \n Proportion")
   
 wMarcin
 
