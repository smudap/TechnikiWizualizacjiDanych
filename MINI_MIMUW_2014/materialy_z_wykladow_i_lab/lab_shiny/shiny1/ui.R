library(shiny)

shinyUI(fluidPage(
  titlePanel("Moja pierwsza aplikacja"),
  sidebarLayout(
    sidebarPanel(
      sliderInput("smooth",
                  "Wsp. wygładzenia:",
                  min = 0,
                  max = 1,
                  value = 0.5)
    ),
    
    mainPanel(
      plotOutput("smoothPlot")
    )
  )
))
