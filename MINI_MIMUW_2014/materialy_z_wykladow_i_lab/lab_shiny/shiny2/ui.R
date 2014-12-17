library(shiny)

shinyUI(fluidPage(
  titlePanel("My second Shiny app!"),
  sidebarLayout(
    sidebarPanel(
      
      sliderInput("smooth",
                  "Choose smoothing:",
                  min = 0,
                  max = 1,
                  value = 0.5),
      
      checkboxInput("checkbox", label = "Add SE bands", value = TRUE),
      
      sliderInput("limits", label = "Limits for OY axis",
                  min = 100, max = 900, value = c(300, 700)),
      
      selectInput("col", label = "Color of the smooth line", 
                  choices = list("red", "blue", "black"), 
                            selected = "red"),
      
      sliderInput("abc", label = "size",
                  min = 0, max = 9, value = 2)
      
    ),
    
    mainPanel(
      p("A oto wykres"),
      plotOutput("smoothPlot")
    )
  )
))
