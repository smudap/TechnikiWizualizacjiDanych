
##############################################################################################
dane<-read.csv2("TWD\\transport.csv",head=T,dec=".")
attach(dane)
drogi <- data.frame(CNT = rep(Kraj,2),Kind = rep(c("Utw","Nieutw"),e=5),
                    KM = c(Drogi_utw,Drogi_nieutw),POP=rep(Ludnosc_mln,2))



lotniska <- data.frame(CNT = rep(Kraj,2),Kind = rep(c("Utw","Nieutw"),e=5),
                       COUNT = c(Lot_utw,Lot_nie_utw),POP=rep(Ludnosc_mln,2))
# lotniska$Kind <- relevel(lotniska$Kind, ref="Utw")

dane$Waterwaysskal <- dane$Waterways/dane$Ludnosc_mln
dane$Railwayskal <- dane$Railway/dane$Ludnosc_mln

# drogi$Kind <- relevel(drogi$Kind, ref="Utw")

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
  ) + theme(
    axis.text = element_text(size=14),
    axis.ticks.x = element_blank(),
            axis.line = element_line(color = 'black'),
            axis.line.x = element_blank(),
            axis.title.x = element_blank(),
            plot.title = element_text(lineheight=3, size=20))

p2<-ggplot(dane, aes(x=Kraj, y=Railwayskal)) +
  geom_bar(stat='identity',colour="black",fill=c("gray85", "gray85", "gray85","Red","gray85"),alpha=c(1,1,1,0.65,1))  +
  ggtitle("Railways") +
  coord_flip()+ theme(
    panel.background = element_rect(fill = 'white', colour = 'white')
    ,panel.grid.major = element_blank()
    ,panel.grid.minor = element_blank()
    ,panel.border = element_blank()
  ) + theme(
    axis.line = element_line(color = 'black'),
    axis.line.y = element_blank(),
    axis.text = element_text(size=14),
    axis.ticks.y = element_blank(),
            axis.title.y = element_blank(),
            plot.title = element_text(lineheight=3, size=20))

p3<-ggplot(dane, aes(x=Kraj, y=Waterwaysskal)) +
  geom_bar(stat='identity',colour="black",fill=c("gray85", "gray85", "gray85","Red","gray85"), alpha=c(1,1,1,0.65,1))  +
  ggtitle("Waterways") +
  coord_flip()+ theme(
    panel.background = element_rect(fill = 'white', colour = 'white')
    ,panel.grid.major = element_blank()
    ,panel.grid.minor = element_blank()
    ,panel.border = element_blank()
  ) + theme(
    axis.line = element_line(color = 'black'),
    axis.line.y = element_blank(),
    axis.text = element_text(size=14),
    axis.ticks.y = element_blank(),
            axis.title.y = element_blank(),
            plot.title = element_text(lineheight=3, size=20))

p4<-ggplot(lotniska, aes(x=CNT, y=COUNTskal,fill=Kind)) +
  geom_bar(stat='identity',colour="black", position="dodge")  +
  ggtitle("Airports") +
  scale_fill_brewer(palette="YlOrBr")+ theme(
    panel.background = element_rect(fill = 'white', colour = 'white')
    ,panel.grid.major = element_blank()
    ,panel.grid.minor = element_blank()
    ,panel.border = element_blank()
  ) + theme(
    axis.text = element_text(size=14),
    axis.ticks.x = element_blank(),
    axis.line = element_line(color = 'black'),
    axis.line.x = element_blank(),
            axis.title.x = element_blank(),
            plot.title = element_text(lineheight=3, size=20))


grid.newpage() 
print(p1, vp=viewport(x=0.25, y = 0.75, 
                      width=0.5, height=0.5))
print(p2, vp=viewport(x=0.75, y = 0.75, 
                      width=0.5, height=0.5))
print(p4, vp=viewport(x=0.25, y = 0.25, 
                      width=0.5, height=0.5))
print(p3, vp=viewport(x=0.75, y = 0.25, 
                      width=0.5, height=0.5))