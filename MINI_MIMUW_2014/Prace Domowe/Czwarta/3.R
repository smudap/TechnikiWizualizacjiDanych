library("ggplot2")

lata <- 1990:2012
#liczba_morderstw <- sample(400:1000,length(lata))

liczba_morderstw <- 1000*c(438,
            407,
            396,
            403,
            372,
            345,
            337,
            320,
            298,
            233,
            253,
            254,
            275,
            295,
            280,
            263,
            372,
            415,
            392,
            351,
            336,
            348,
            363)/502

dane <- data.frame(lata,liczba_morderstw)
names(dane) <- c("lata","liczba_morderstw")
dane

ggplot(dane,aes(x=lata,y=liczba_morderstw))+
  ylim(0,1000)+
  geom_ribbon(ymin=0,ymax=liczba_morderstw,fill="red4",alpha = 0.8)+
  geom_line(size=1.2)+
  geom_point(size=4)+
  geom_point(aes(x=2005,y=liczba_morderstw[16]),size=10,col="black")+
  geom_point(aes(x=2005,y=liczba_morderstw[16]),size=6,col="red3",alpha = 0.6)+
   theme(panel.grid.major.x=element_line(size=1.5),axis.text=element_text(size=20))+
  geom_text(label="2005\n Florida enacted its\n 'Stand Your Ground' law",
            x=2005,y=liczba_morderstw[16]-130,size=7,col="white")+
  labs(list(title="Liczba morderstw na Florydzie",x="Lata" ,y="Liczba morderstw"))+
  theme(axis.title.x = element_text(colour="grey20",size=20))+
  theme(axis.title.y = element_text(colour="grey20",size=20))+
  theme(title=element_text(colour="grey20",size=25))

























