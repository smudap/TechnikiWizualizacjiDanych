library(shiny)
library(dplyr)
library(ggplot2)
library(ggthemes)
#load("H:/TWD/shiny/PISAeurope.rda")
# load("C:/Users/Piotr/Desktop/PW/TWD/PISAeurope.rda")

con <- url("http://biecek.pl/MIMUW/PISAeurope.rda")
# load(con)

kraj <- pisa$CNT
matka <- pisa$ST13Q01
ojciec <- pisa$ST17Q01

wyk <- as.numeric(matka) + as.numeric(ojciec)
wyk2 <- character(length(wyk))
for (i in 1:length(wyk)){
  if (!is.na(wyk[i])) {
    if (wyk[i]>=6 ) wyk2[i] <- "podstawowe"
    if (wyk[i]>=4 & wyk[i]<=5) wyk2[i] <- "średnie"
    if (wyk[i]<=3) wyk2[i] <- "wyższe"
  }
  else wyk2[i] <- NA}



kraj2 <- rep("reszta świata",length(kraj)) 
kraj2[kraj=="Poland"]=kraj[kraj=="Poland"]


odp11 <- pisa$ST55Q01
odp12 <- pisa$ST55Q02
odp13 <- pisa$ST55Q03

levels(odp11) <- c("Wcale", "Mniej niż 2 godziny", "Od 2 do 4 godzin", "Od 4 do 6 godzin", "Więcej niż 6 godzin")
levels(odp12) <- c("Wcale", "Mniej niż 2 godziny", "Od 2 do 4 godzin", "Od 4 do 6 godzin", "Więcej niż 6 godzin")
levels(odp13) <- c("Wcale", "Mniej niż 2 godziny", "Od 2 do 4 godzin", "Od 4 do 6 godzin", "Więcej niż 6 godzin")

levels(ojciec) <- c("3A", "3B-3C","2","1","brak")
levels(matka) <- c("3A", "3B-3C","2","1","brak")

tmp <- odp12
levels(tmp) <- c("Wcale", rep("Coś tam się uczą", 4))
dane0 <- data.frame(odp11, odp12, odp13, matka, ojciec, wyk2, kraj, tmp)
dane <- dane0[dane0$kraj=="Poland",]
dane1 <- dane0[dane0$kraj!="Poland",]
#dane0$kraj



# czcionki <- theme( axis.text.x = element_text( size = 2*17),
#                    axis.text.y = element_text(size = 2*17),
#                    axis.title.x= element_text(size = 2*20, vjust=-1.3),
#                    #axis.title.y= element_text(size = 2*20, vjust=1.3),
#                    title =element_text(size = 2*25),
#                    legend.title=element_text(size = 2*15),
#                    legend.text = element_text(size = 2*15),
#                    legend.position="none",
#                    legend.background = element_rect(colour = "grey50")) 
# 


#install.packages("scales")
library(scales)

shinyServer(function(input, output) {
  output$pierwszyPlot <- renderPlot({
    
        ggplot(na.omit(dane0[dane0$kraj==input$kraj,]), aes(x=wyk2, fill=odp12)) + 
          scale_fill_brewer(palette=input$paleta)+
      geom_bar(position=input$position,colour="Black",width = input$width, alpha = input$alpha) + 
      ggtitle("Kraj nr 1")+
      labs(y="",x="wykształcenie rodziców") +scale_y_continuous(labels=switch(input$position, "fill"=percent, "dodge"=waiver(), "stack"=waiver())) +
      theme( panel.background = element_rect(colour = "Black", fill="white"), 
             panel.grid.major = element_line(colour = "grey90"),
             panel.grid.major.x = element_blank(), panel.grid.minor.x = element_blank())+
     switch(input$scheme, "Grey" = theme_grey(),
              "Black & white" = theme_bw(),
              "Tufte" = theme_tufte())+
  coord_flip()
    

  })


output$drugiPlot <- renderPlot({
  
  ggplot(na.omit(dane0[dane0$kraj==input$kraj2,]), aes(x=wyk2, fill=odp12)) + 
     scale_fill_brewer(palette=input$paleta)+
    geom_bar(position=input$position, colour="Black",width = input$width, alpha = input$alpha) + 
    #czcionki +
    labs(y="",x="wykształcenie rodziców") +scale_y_continuous(labels=switch(input$position, "fill"=percent, "dodge"=waiver(), "stack"=waiver())) +
    ggtitle("Kraj nr 2")+
    theme( panel.background = element_rect(colour = "Black", fill="white"), 
           panel.grid.major = element_line(colour = "grey90"),
           panel.grid.major.x = element_blank(),
           panel.grid.minor.x = element_blank())+
    switch(input$scheme, "Grey" = theme_grey(),
           "Black & white" = theme_bw(),
           "Tufte" = theme_tufte())+
    coord_flip()
  
  
})


output$trzeciPlot <- renderPlot({
  
  ggplot(na.omit(dane0[dane0$tmp=="Wcale" & (dane0$kraj==input$kraj | dane0$kraj==input$kraj2),]), aes(x=wyk2, fill=kraj)) + 
    scale_fill_brewer(palette="Dark2")+
    geom_bar( position=input$position,colour="Black",width = input$width, alpha =1) + 
    ggtitle('Rozkład odpowiedzi "Wcale"')+
    #geom_point( alpha = input$alpha) + 
    #czcionki +
    labs(y="",x="wykształcenie rodziców") +scale_y_continuous(labels=switch(input$position, "fill"=percent, "dodge"=waiver(), "stack"=waiver())) +
    theme( panel.background = element_rect(colour = "Black", fill="white"), 
           panel.grid.major = element_line(colour = "grey90"),
           panel.grid.major.x = element_blank(), panel.grid.minor.x = element_blank())+
    switch(input$scheme, "Grey" = theme_grey(),
           "Black & white" = theme_bw(),
           "Tufte" = theme_tufte())+
    coord_flip()
  })
})

###runApp("H:/TWD/shiny")
###   runApp("C:/Users/Maria/Documents/POLITECHNIKA/mgr/sem 3/techniki wizualizacji danych/shiny")


