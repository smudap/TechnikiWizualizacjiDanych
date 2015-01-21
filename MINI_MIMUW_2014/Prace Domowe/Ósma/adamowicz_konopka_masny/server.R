#MOJE ROZW DLA SHINY 2

library(shiny)
library(dplyr)
library(ggplot2)
setwd("C:/Users/MonikaKonopka/Documents/MIMUW/JNP3")
load("PISAeurope.rda")
pol <- pisa %>% filter(CNT == 'Poland')


library(maptools)
library(ggplot2)
library(rgdal)
#library(gpclib)
#gpclibPermit()

#shp1 <- readShapePoly("POL_adm/POL_adm1.shp") 

#shp1f <- fortify(shp1, region = "NAME_1") #zamienia na format ggplotowy
# save(shp1f, file="shp1f.rda")
load("shp1f.rda")
load("wybory.rda")

shp1f$group <- gsub("Łódzkie.1", "Lodzkie.1",shp1f$group)
shp1f$id <- ifelse(shp1f$id == "Łódzkie", "Lodzkie", shp1f$id)
  

df <- data.frame(voj=unique(shp1f$id), val=as.numeric(as.character(wybory2014$FrekwencjaNa1730)), long = wsp[1,], lat = wsp[2,])
df$val <- df$val/100      


    





shinyServer(function(input, output) {
#   output$smoothPlot <- renderPlot({
#     
#     ggplot(pol, aes(x=ESCS, y=PV1MATH)) +
#       geom_point() +
#       geom_smooth(colour=input$col, size=input$abc,
#                   span=input$smooth, method="loess",
#                   se=input$checkbox) +
#       ylim(input$limits[1], input$limits[2])
# 
#   })
  
  output$wyboryPlot <- renderPlot({
      df$szer_slupek <- input$szer_slupek
      df$wys_slupek <- input$wys_slupek
 
      if (input$kolory == 1) {
        paleta <- c("darkblue", "darkorange1", "green3") 
      }
      else if (input$kolory == 2) {
        paleta <- c("white", "yellow", "orange")
      }
      else {
        paleta <- c("darkorange", "red", "darkred")
      }
      
      bold <- (ifelse(input$bold, "bold", "plain"))
      
      ggplot() +
      geom_map(data=wybory2014, aes(map_id=Wojewodztwo, fill=MAX), map=shp1f) +
      geom_path(data=shp1f, aes(x=long, y=lat, group=id), colour="black", size=0.25) +
      scale_fill_manual(values=paleta) +
      geom_rect(data=df, aes(xmin=long-szer_slupek, xmax=long+szer_slupek, ymin=lat-0.2, ymax=lat+wys_slupek*val-0.2), fill=input$kol_slupka, color=input$kol_slupka) +
      geom_text(data=df,aes(x=long, y=lat+wys_slupek*val+0.1, label=val*100), size=input$wielk_cyfr, color=input$kol_cyfr, alpha=1, fontface=bold) +
      
      theme_bw() +
      theme(
        plot.background = element_blank()
        ,panel.grid.major = element_blank()
        ,panel.grid.minor = element_blank()
        ,panel.border = element_blank()
        ,axis.line = element_blank(), axis.ticks = element_blank(), 
        axis.title.x = element_blank(), axis.title.y = element_blank(), axis.text.y = element_blank(), 
        axis.text.x = element_blank(), axis.text.y = element_blank(), axis.text.y = element_blank()
      )  
    
  })
  
})


# The 'your turn' part:
#
# Change the code above 
#   add a slider that will control size of the smooth line
#