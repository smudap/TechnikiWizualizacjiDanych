library("dplyr")
library("ggplot2")
library('scales')
library("gridExtra")
library(grid)
load("niewiem.Rda")

# wykres shiny

shinyServer(function(input, output) {
    
  output$smoothPlot <- renderPlot({
  
    ramka2 <- ramka %>%
      filter(CNT %in% c(input$kraje))
    
    p <- ggplot(ramka2,aes(x=math,y=hours,color=SC01Q01,shape=CNT))+
      
      geom_point(size=8)+
      geom_line(arrow=arrow())+
      guides(color = guide_legend(title = "Rodzaj szko?y"))+
      scale_shape_manual(values=ramka$opis,name="Pa?stwa")+
      
      scale_colour_manual(
        values = c("Publiczna" = input$colpub ,"Prywatna" = input$colpryw))+
      
      scale_x_continuous(breaks=round(seq(min(ramka$math),max(ramka$math), by=input$gestoscx)))+
      #scale_y_continuous(breaks=round(seq(min(ramka$hours),max(ramka$hours), by=0.1)), limits=input$limits)+
      
      theme(panel.background = element_blank(),
            legend.position="right",
            axis.line = element_line(color = 'black'),
            axis.title.x = element_text(colour="grey20", size = input$rozmiar),
            axis.title.y = element_text(colour="grey20", size = input$rozmiar),
            title=element_text(colour="grey20",size=20),
          #  panel.grid.minor=element_line(color='orange'),
          #  panel.grid.major=element_line(color='#EEDC82'),
            text = element_text(size = input$rozmiar, family = input$czcionka))+
      
      labs(list(x="Wyniki z matematyki",y="Liczba zaj?? w tygodniu (h)"))+
      ylim(c(input$limits[1],input$limits[2]))
    
    return(if( !input$legenda ){ p+ guides(colour=input$legenda, shape=input$legenda)} else {p})
  })
  
  output$betterPlot <- renderPlot({
    p <- ggplot(ramka,aes(x=math,y=hours,color=SC01Q01,shape=CNT))+
      
      geom_point(size=8)+
      geom_line(arrow=arrow())+
      guides(color = guide_legend(title = "Rodzaj szko?y"))+
      scale_shape_manual(values=ramka$opis,name="Pa?stwa")+
      
      scale_colour_manual(
        values = c("Publiczna" = input$colpub ,"Prywatna" = input$colpryw))+
      
      scale_x_continuous(breaks=round(seq(min(ramka$math),max(ramka$math), by=input$gestoscx)))+
      #scale_y_continuous(breaks=round(seq(min(ramka$hours),max(ramka$hours), by=0.1)), limits=input$limits)+
      
      theme(panel.background = element_blank(),
            legend.position="right",
            axis.line = element_line(color = 'black'),
            axis.title.x = element_text(colour="grey20", size = input$rozmiar),
            axis.title.y = element_text(colour="grey20", size = input$rozmiar),
            title=element_text(colour="grey20",size=20),
            #  panel.grid.minor=element_line(color='orange'),
            #  panel.grid.major=element_line(color='#EEDC82'),
            text = element_text(size = input$rozmiar, family = input$czcionka))+
      
      labs(list(x="Wyniki z matematyki",y="Liczba zaj?? w tygodniu (h)"))+
      ylim(c(input$limits[1],input$limits[2]))+
      geom_segment(aes(x = 474.8746 ,y = 32.49658 ,xend =  533.5013 ,yend= 32.47047 ),arrow = arrow(length = unit(0.5, "cm")))+geom_segment(aes(x = 497.6667 ,y = 32.65984 ,xend =  505.7248 ,yend= 33.21226 ),arrow = arrow(length = unit(0.5, "cm")))+geom_segment(aes(x = 511.2725 ,y = 32.71729 ,xend =  553.1179 ,yend= 34.12 ),arrow = arrow(length = unit(0.5, "cm")))+geom_segment(aes(x = 518.3464 ,y = 29.2748 ,xend =  536.1639 ,yend= 28.36913 ),arrow = arrow(length = unit(0.5, "cm")))+geom_segment(aes(x = 491.1839 ,y = 24.1754 ,xend =  520.9492 ,yend= 25.10502 ),arrow = arrow(length = unit(0.5, "cm")))+geom_segment(aes(x = 484.6557 ,y = 30.26308 ,xend =  507.6085 ,yend= 29.62182 ),arrow = arrow(length = unit(0.5, "cm")))+geom_segment(aes(x = 450.1379 ,y = 32.50999 ,xend =  507.2425 ,yend= 33.65 ),arrow = arrow(length = unit(0.5, "cm")))+geom_segment(aes(x = 535.1748 ,y = 31.06329 ,xend =  540.1336 ,yend= 33.88729 ),arrow = arrow(length = unit(0.5, "cm")))+geom_segment(aes(x = 545.8877 ,y = 36.0757 ,xend =  563.5405 ,yend= 37.29059 ),arrow = arrow(length = unit(0.5, "cm")))+geom_segment(aes(x = 515.9271 ,y = 33.40693 ,xend =  570.3774 ,yend= 35.45299 ),arrow = arrow(length = unit(0.5, "cm")))
#       geom_segment(aes(x = ramka$math[((1:10)*2)-1], y = ramka$hours[((1:10)*2-1)], 
#                        xend = ramka$math[((1:10)*2)], yend = ramka$hours[((1:10)*2)]),
#                    arrow = arrow(length = unit(0.5, "cm")))
#       
    
    
    return(if( !input$legenda ){ p+ guides(colour=input$legenda, shape=input$legenda)} else {p})
  })
  
})

# shiny::runApp('C:\\Users\\sommerm\\Dropbox\\TWDwR\\shiny\\shiny1_my')

# 
# ramka
# 
for(i in 1:10){
  cat( "geom_segment(aes(x =", ramka$math[2*i-1], ",y =", ramka$hours[2*i-1],
          ",xend = ", ramka$math[2*i], ",yend=",ramka$hours[2*i], "),arrow = arrow(length = unit(0.5, \"cm\")))+" )
}



