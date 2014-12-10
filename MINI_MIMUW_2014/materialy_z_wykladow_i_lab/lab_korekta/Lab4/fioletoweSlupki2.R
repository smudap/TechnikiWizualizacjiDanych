library(grid)
library(RColorBrewer)
library(png)
library(RCurl)
library(ggplot2)

dane<-data.frame(x=c(139,57,27,25,10),y=c("TVN24","TVPinfo","TVN24\nBiznes i świat","TVN","TVP2"))
dane$y=reorder(dane$y,dane$x,mean)

pal=brewer.pal(n=9,name="BuPu")[5:9]

urls=c("http://upload.wikimedia.org/wikipedia/commons/8/80/TVN_24_Logo.png",
      "http://i61.tinypic.com/n3szv7.png",
      "http://i58.tinypic.com/e85177.png",
      "http://upload.wikimedia.org/wikipedia/commons/0/03/TVN_HD_logo.png",
      "http://i59.tinypic.com/snkidl.png")


g <- ggplot(dane,aes(x=y,y=x,fill=factor(x)))+geom_bar(stat="identity")+
  geom_text(aes(label=x),hjust=1.2,colour="white",size=7)+
  coord_flip()+
  scale_fill_manual(values=pal, guide=FALSE)+
  ggtitle(expression(atop("TV",atop("Najbardziej opiniotwórcze stacje telewizyjne"),"") ) ) +
  theme(plot.title=element_text(face="bold", size=rel(2)))+labs(y="",x="") +
  theme(panel.background = element_blank()) +
  theme(panel.grid.major = element_blank(), panel.grid.minor = element_blank()) +
  theme(axis.title.x = element_blank()) +
  theme(axis.text = element_blank()) +
  theme(axis.ticks = element_blank()) +
  ylim(0, 160)

#tvpurl <- "http://upload.wikimedia.org/wikipedia/commons/8/80/TVN_24_Logo.png"
#my_image <-  readPNG(getURLContent(tvpurl), info=TRUE)
#g + annotation_raster(my_image, ymin = 140, ymax= 160, xmin = 4.5, xmax = 5.5)

f <- g
for ( i in 1:length(urls) ) {
  my_image <- readPNG(getURLContent(urls[i]), info=TRUE)
  w = attr(my_image,"info")$dim[1]
  h = attr(my_image,"info")$dim[2]
  rasterGrob(my_image, interpolate=TRUE)
  ymin = f$data$x[i] + 5
  ymax = ymin + 20
  h2 = h / w
  f <- f + annotation_raster(my_image, ymin = ymin, ymax= ymax, xmin = 5.5 - i + (1-h2)/2, xmax = 6.5 - i - (1-h2)/2)
}
f


