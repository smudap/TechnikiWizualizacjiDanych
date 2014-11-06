

##############################################################################################
dane<-read.csv2("C:\\Users\\charchulam\\Downloads\\transport.csv",head=T,dec=".")
attach(dane)
drogi <- data.frame(CNT = rep(Kraj,2),Kind = rep(c("Utw","Nieutw"),e=5),
                    KM = c(Drogi_utw,Drogi_nieutw),POP=rep(Ludnosc_mln,2))


lotniska <- data.frame(CNT = rep(Kraj,2),Kind = rep(c("Utw","Nieutw"),e=5),
                       COUNT = c(Lot_utw,Lot_nie_utw),POP=rep(Ludnosc_mln,2))
dane$Waterwaysskal <- dane$Waterways/dane$Ludnosc_mln
dane$Railwayskal <- dane$Railway/dane$Ludnosc_mln


drogi$KMskal <- drogi$KM/drogi$POP
lotniska$COUNTskal <- lotniska$COUNT/lotniska$POP

p1<-ggplot(drogi, aes(x=CNT, y=KMskal,fill=Kind)) +
  geom_bar(stat='identity',colour="black")  +
  ggtitle("Roadways") +
  scale_fill_brewer(palette="YlGnBu") + theme(
    panel.background = element_rect(fill = 'white', colour = 'white')
    ,panel.grid.major = element_blank()
    ,panel.grid.minor = element_blank()
    ,panel.border = element_blank()
  ) + theme(axis.line = element_line(color = 'black')) +
  theme(plot.title = element_text(lineheight=3, size=20))

p2<-ggplot(dane, aes(x=Kraj, y=Railwayskal)) +
  geom_bar(stat='identity',colour="black",fill=c("gray85", "gray85", "gray85","sandy brown","gray85"))  +
  ggtitle("Railways") +
  coord_flip()+ theme(
    panel.background = element_rect(fill = 'white', colour = 'white')
    ,panel.grid.major = element_blank()
    ,panel.grid.minor = element_blank()
    ,panel.border = element_blank()
  ) + theme(axis.line = element_line(color = 'black')) +
  theme(plot.title = element_text(lineheight=3, size=20))

p3<-ggplot(dane, aes(x=Kraj, y=Waterwaysskal)) +
  geom_bar(stat='identity',colour="black",fill=c("gray85", "gray85", "gray85","Plum4","gray85"))  +
  ggtitle("Waterways") +
  coord_flip()+ theme(
    panel.background = element_rect(fill = 'white', colour = 'white')
    ,panel.grid.major = element_blank()
    ,panel.grid.minor = element_blank()
    ,panel.border = element_blank()
  ) + theme(axis.line = element_line(color = 'black')) +
  theme(plot.title = element_text(lineheight=3, size=20))

p4<-ggplot(lotniska, aes(x=CNT, y=COUNTskal,fill=Kind)) +
  geom_bar(stat='identity',colour="black")  +
  ggtitle("Airports") +
scale_fill_brewer(palette="YlOrBr")+ theme(
  panel.background = element_rect(fill = 'white', colour = 'white')
  ,panel.grid.major = element_blank()
  ,panel.grid.minor = element_blank()
  ,panel.border = element_blank()
) + theme(axis.line = element_line(color = 'black')) +
  theme(plot.title = element_text(lineheight=3, size=20))


grid.newpage() 
print(p1, vp=viewport(x=0.25, y = 0.75, 
                      width=0.5, height=0.5))
print(p2, vp=viewport(x=0.75, y = 0.75, 
                  width=0.5, height=0.5))
print(p4, vp=viewport(x=0.25, y = 0.25, 
                     width=0.5, height=0.5))
print(p3, vp=viewport(x=0.75, y = 0.25, 
                     width=0.5, height=0.5))