## ui.R
library(shiny)
library(rCharts)
options(RCHART_LIB = 'polycharts')

shinyUI(pageWithSidebar(
  
  headerPanel("New born babies deaths percentage decreases!"),
  
  sidebarPanel(
   h3("Gender"),
    checkboxInput("male", label = "Male", value = TRUE),
    checkboxInput("female", label = "Female", value = TRUE),
    sliderInput("range", 
                label = h3("Year Range:"),
                min = 1958, max = 2009, value = c(1958, 2009)),
    sliderInput("Chart width", inputId = 'width', min = 200, max = 1000, value=600)
  ),
  
  mainPanel(
    showOutput("chart", "polycharts")
  )
))
