library(shiny)
library(dplyr)
library(ggplot2)
load("../PISAeurope.rda")
pol <- pisa %>% filter(CNT == 'Poland')

shinyServer(function(input, output) {
  output$smoothPlot <- renderPlot({
    
    ggplot(pol, aes(x=ESCS, y=PV1MATH)) +
      geom_point() +
      geom_smooth(colour=input$col, size=input$abc,
                  span=input$smooth, method="loess",
                  se=input$checkbox) +
      ylim(input$limits[1], input$limits[2])

  })
})


# The 'your turn' part:
#
# Change the code above 
#   add a slider that will control size of the smooth line
#
