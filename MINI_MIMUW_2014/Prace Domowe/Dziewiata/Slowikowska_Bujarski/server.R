library(shiny)
library(dplyr)
library(ggplot2)
library(scales)
load("imiona_warszawa.rda")
# load("C:/Users/Maria/Documents/POLITECHNIKA/mgr/sem 3/techniki wizualizacji danych/shiny/shiny2/imiona_warszawa.rda")
unim <- unique(imiona_warszawa$imie)
# 
# imiona <- imiona_warszawa %>%
#   group_by(rok, imie, plec) %>%
#   summarise(n=sum(liczba)) %>%
#   group_by(rok, plec) %>%
#   mutate(proc=n/sum(n)) %>%
#   arrange(-rok, -n)


shinyServer(function(input, output) {
  
  imiona <- reactive({
    imiona_warszawa %>%
      filter(plec==input$plec, rok==input$rok) %>%
    group_by(rok, imie, plec) %>%
    summarise(n=sum(liczba)) %>%
    group_by(rok, plec) %>%
    mutate(proc=n/sum(n)) %>%
    arrange(-rok, -n) %>%
    mutate(kt=row_number()) %>%
    filter(kt <= input$ile)
  })
  
  imiona2 <- reactive({
    imiona_warszawa %>%
      filter(imie==input$imie) %>%
      group_by(rok) %>%
      summarise(n=sum(liczba))
  })
  
  output$smoothPlot <- renderPlot({
    print(
    ggplot(imiona(), aes(x=kt, y=proc, fill=imie, labels=imie)) +
      geom_bar(stat="identity",colour="black")+
      scale_y_continuous(labels=percent)+
      #theme_bw()+
      labs(list(title="Najczęściej wybierane imiona dla dzieci w wybranym roku",x="Imiona" ,y="Częstość")) +
      theme(axis.text.x = element_text( size = 13,color="grey37"),
            axis.text.y = element_text(size = 13,color="grey37"),
            axis.title.x= element_text(size = 14,color="grey18"),
            axis.title.y= element_text(size = 14,color="grey18"),
            title =element_text(size = 16,color="grey18"),
            legend.title=element_text(size = 11),
            legend.text = element_text(size = 11))      
        )})
  
  
  output$imie <- renderPlot({
     validate(need(input$imie %in% unim, "Brak imienia w bazie!"))
    print(
    ggplot(imiona2(), aes(x=rok, y=n)) +
      geom_line(size=1., col="firebrick4") +
      #theme_bw() +
#       scale_x_discrete(labels=2004:2014, breaks=2004:2014) +
      labs(list(title="Rozkład nadań wybranego imienia w poszczególnych latach",x="Rok" ,y="Liczba dzieci, które otrzymały wybrane imię")) +
      theme(axis.text.x = element_text( size = 13,color="grey37"),
            axis.text.y = element_text(size = 13,color="grey37"),
            axis.title.x= element_text(size = 14,color="grey18"),
            axis.title.y= element_text(size = 14,color="grey18"),
            title =element_text(size = 16,color="grey18"),
            legend.title=element_text(size = 11),
            legend.text = element_text(size = 11),
            axis.line = element_line(color = 'grey30'))
  )})
}
)


####     runApp("C:/Users/Maria/Documents/POLITECHNIKA/mgr/sem 3/techniki wizualizacji danych/shiny/shiny2")



