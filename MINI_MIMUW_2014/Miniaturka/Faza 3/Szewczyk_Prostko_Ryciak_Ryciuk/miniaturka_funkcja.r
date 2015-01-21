### Praca autorstwa:
# Anita Szewczyk
# Piotr Prostko
# Norbert Ryciak
# Wiktor Ryciuk


miniaturka <- function (x){
  warnings(FALSE)
  is_installed <- function(pcg) is.element(pcg, installed.packages()[,1])
  
  packages<-c('ggplot2',"survival","gridExtra","reshape","scales","gtable")
  suppressWarnings(
    for (i in 1:length(packages)){
      if (!is_installed(packages[i])) install.packages(packages[i])
      library(packages[i],character.only = TRUE)
    }
  )
  if (class(x)!="survfit") stop("miniaturka only supports objects of class 'survfit'!")
  
  fit <- data.frame(time=x$time,surv=x$surv,n.risk=x$n.risk,n.event=x$n.event,
                    n.censor=x$n.censor,CIu=x$upper,CIl=x$lower)
  n <- nrow(fit)
  attach(fit,warn.conflicts=FALSE)
  
  curve <- ggplot(fit,aes(x=time,y=surv))+
    scale_y_continuous(label=percent) +
    geom_step(size=1.2)+
    geom_step(aes(x=time,y=CIu),color='mistyrose4',size=1)+
    geom_step(aes(x=time,y=CIl),color='mistyrose4',size=1)+
    ggtitle("Survival curve") +
    ylab(" ")+
    scale_x_continuous(breaks=c(0,pretty(time)))+
    theme(plot.title = element_text( colour ="black", size =28, vjust= 0.9),
          axis.title.x = element_text(size=20,vjust=0.85),
          axis.title.y=element_text(size=18,vjust=0.85),
          axis.text.y=element_text(size=18,hjust=0),
          axis.text.x=element_text(size=18,hjust=0.1),
          panel.border = element_blank(),
          panel.background = element_rect(fill = 'white', colour = 'black',size=1.4),
          panel.grid.major = element_line(colour = "lightpink"))
  
  
  
  
  cens <- ggplot(data=fit, aes(x=time, ymax=n.censor,ymin=0,colour="green"))+
    geom_smooth(aes(x=time,y=n.censor),se=FALSE,col='darkred',method='loess',size=1.05)+
    geom_smooth(aes(x=time,y=n.event),se=FALSE,col='darkblue',method='loess',size=1.05)+
    geom_linerange()+
    geom_linerange(aes(x=time, ymax=n.event,ymin=0,colour='red'),position=position_dodge(.1))+
    scale_y_reverse(expand=c(0,0),lim=c(max(n.censor,n.event),0)) +
    scale_x_continuous(breaks=c(0,pretty(time)))+
    ylab("counts")+
    theme(legend.position="bottom") +
    scale_colour_discrete(name ="",labels=c("cens", "event"))+
    theme(axis.title.y = element_text(size=20,vjust=0.85),
          axis.title.x = element_blank(),
          axis.text.y=element_text(size=18,hjust=0),
          axis.text.x = element_blank(),
          axis.ticks.x=element_blank(),
          panel.border = element_blank(),
          axis.title = element_text(size = 21),
          panel.background = element_rect(fill = 'white', colour = 'black',size=1.4),
          legend.text = element_text(size = 18),
          legend.key.width = unit(1.5, "cm"),
          panel.grid.major.y = element_line(colour = "lightpink"),
          panel.grid.minor.x=element_blank(),
          panel.grid.major.x=element_blank()
    )
  
  
  
  ####
  #Extract Grobs
  g1<-ggplotGrob(curve)
  g2<-ggplotGrob(cens)
  #Bind the tables
  g<-gtable:::rbind_gtable(g1, g2, "first")
  panels <- g$layout$t[grep("panel", g$layout$name)]
  g$heights[panels] <- lapply(c(2,1.5), unit, "null")
  #Remove a row between the plots
  g <- gtable_add_rows(g, unit(-1,"cm"), pos=nrow(g1))
  #draw
  grid.newpage()
  grid.draw(g)
  
}
