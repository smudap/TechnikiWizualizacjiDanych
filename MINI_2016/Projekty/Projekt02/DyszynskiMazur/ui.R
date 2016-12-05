#
# This is the user-interface definition of a Shiny web application. You can
# run the application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
# 
#    http://shiny.rstudio.com/
#

library(shiny)

wybrane_kraje <- c("Hungary","Bulgaria","Poland","Italy","Finland","Spain","Germany","France", "United Kingdom")

wybrane_rozmiary <- c("From 10 to 19.9 ha", "From 2 to 4.9 ha")


# Define UI for application that draws a histogram
shinyUI(fluidPage(
  
  # Application title
  titlePanel("Analysis of agricultural structure in selected european countries"),
  
  # Sidebar with a slider input for number of bins 
  sidebarLayout(
    sidebarPanel(
      checkboxGroupInput("variable", "Countries to analyze",
                         choices = wybrane_kraje, selected = c("Poland", "Bulgaria")),
      radioButtons("size", "Size to analyze",
                         choices = wybrane_rozmiary, selected = "From 2 to 4.9 ha")
    ),
    
    # Show a plot of the generated distribution
    mainPanel(
       plotOutput("distPlot"),
       plotOutput("distPlot2")
    )
  )
))
