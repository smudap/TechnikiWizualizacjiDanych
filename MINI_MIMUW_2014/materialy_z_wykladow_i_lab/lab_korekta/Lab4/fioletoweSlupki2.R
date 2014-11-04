library(grid)
rasterGrob(my_image, interpolate=TRUE)


library(RColorBrewer)
library(png)
library(RCurl)

dane<-data.frame(x=c(139,57,27,25,10),y=c("TVN24","TVPinfo","TVN24\nBiznes i świat","TVN","TVP2"))

dane$y=reorder(dane$y,dane$x,mean)

pal=brewer.pal(n=9,name="BuPu")[5:9]

tvpurl <- "http://upload.wikimedia.org/wikipedia/commons/8/80/TVN_24_Logo.png"
my_image <-  readPNG(getURLContent(tvpurl))

g <- ggplot(dane,aes(x=y,y=x,fill=factor(x)))+geom_bar(stat="identity")+
  geom_text(aes(label=x),hjust=1.2,colour="white",size=7)+
  coord_flip()+
  scale_fill_manual(values=pal, name="Liczba \npowo?a?",guide=FALSE)+
  ggtitle(expression(atop("TV",atop("Najbardziej opiniotwórcze stacje telewizyjne"),"") ) ) +
  theme(plot.title=element_text(face="bold", size=rel(2)))+labs(y="",x="") +
  theme(panel.background = element_blank()) +
  theme(panel.grid.major = element_blank(), panel.grid.minor = element_blank()) +
  theme(axis.title.x = element_blank()) +
  theme(axis.text.x = element_blank()) +
  theme(axis.ticks.x = element_blank()) +
  theme(axis.text.y = element_text(size=rel(2))) +
  ylim(0, 160)

g + annotation_raster(my_image, ymin = 140,ymax= 160,xmin = 4.5,xmax = 5.5)

  


