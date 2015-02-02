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

dane2 <- pisa %>%
   select(CNT,ST29Q07,PV1MATH,W_FSTUWT) %>%
   filter(ST29Q07!="NA") %>%
   group_by(CNT,ST29Q07) %>%
   summarise(math = weighted.mean(PV1MATH, W_FSTUWT, na.rm = TRUE),
             liczba=n()) 

dane3 <- pisa %>%
   select(CNT,ST29Q07,PV1MATH,W_FSTUWT) %>%
   filter(ST29Q07!="NA") %>%
   group_by(CNT) %>%
   summarise(math = weighted.mean(PV1MATH, W_FSTUWT, na.rm = TRUE),
             calosc=n()) 

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

Sagr <- dane4 %>%
   filter(ODP=="Strongly agree") %>%
   mutate(SA=liczba)

Agr <- dane4 %>%
   filter(ODP=="Agree") %>%
   mutate(A=liczba)

dane5 <- cbind(Sagr[,c("CNT","math","SA")],A=Agr[,"A"])
dane5$CNT <- reorder(dane5$CNT,-dane5$math)

mean(dane5$SA)*500

(ggplot(dane5)+geom_point(aes(x=CNT,y=math-500)) +
   geom_point(aes(x=CNT,y=(SA-mean(SA))*1000),color="blue") +
   geom_point(aes(x=CNT,y=(A-mean(A))*1000),color="red"))

#### przygotowanie wykresu (dane2) ####
w <- ggplot(dane5) + 
   ggtitle("Mathematics is an important subject for me because I need it
           for what I want to study later on") +
    theme(
      plot.title=element_text(face="bold",size=19),
      axis.title=element_blank(),
      panel.background=element_blank(),
      axis.text.x  = element_text(angle=32, hjust=0.8,size=16),
      axis.text.y  = element_text(size=15),
      axis.ticks = element_blank()
   ) + geom_abline(intercept = 0,slope=0)+

   geom_bar(stat="identity",aes(x=CNT, y=math-500,fill=CNT))+
   geom_text(color="#4D004B",size=4,
             aes(vjust=-0.8*ifelse(sign(math-500)==1,1,-1),x=CNT, y=math-500,
                 label=paste0("avg",ifelse(sign(math-500)==1,"+","-"),abs(round(math-500)))))+
 #  geom_text(color="#4D004B",size=4,
 #           aes(vjust=2,x=CNT, (SA-mean(SA))*500,
 #                label=paste0("avg",ifelse(sign((SA-mean(SA))*500)==1,"+","-"),abs(round((SA-mean(SA))*500)))))+
   scale_fill_manual(values=colorRampPalette(c("antiquewhite", "maroon4"))(10),name="Math Result",
                     breaks="Poland",labels="Average math test \nresult per country \n(minus mean of 500)")+
   
   geom_point(aes(x=CNT,y=(SA-mean(SA))*500),color="#4D004B",size=6)+
   geom_point(aes(x=CNT,y=(SA-mean(SA))*500,color=CNT),size=4)+
   scale_color_manual(values=colorRampPalette(c("antiquewhite", "maroon4"))(10),
                      name="Strongly Agree",breaks=c("Poland"),
                      labels="# of people per 500 \nthat answered \nStrongly agree\n to title question \n(minus mean of 110)")
w
