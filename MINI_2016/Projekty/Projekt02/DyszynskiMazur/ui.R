#
# This is the user-interface definition of a Shiny web application. You can
# run the application by clicking 'Run App' above.
#
# Find out more about building applications with Shiny here:
# 
#    http://shiny.rstudio.com/
#

library(shiny)

wybrane_kraje <- c("Hungary","Bulgaria","Poland","Italy",
                   "Finland","Spain","Germany","France",
                   "United Kingdom","Netherlands","Malta")

wybrane_rozmiary <- c("Less than 2 ha","From 2 to 4.9 ha","From 5 to 9.9 ha", "From 10 to 19.9 ha",
                      "100 ha or over","Total")


# Define UI for application that draws a histogram
shinyUI(fluidPage(
  
  # Application title
  titlePanel("Analysis of agricultural structure in selected european countries"),
  
  # Sidebar with a slider input for number of bins 
  sidebarLayout(
    sidebarPanel(
      checkboxGroupInput("variable", "Countries to analyze",
                         choices = wybrane_kraje, selected = c("Poland", "Bulgaria"))
    ),
    
    # Show a plot of the generated distribution
    mainPanel(
      tabsetPanel(
      tabPanel("Agricultural Area",
               p("Analysis of the ratio of agricultural areas to country area"),
               plotOutput("distPlot")),
      tabPanel("Standard Output from agricultural area",
               p("Analysis of the standard output for different countries"),
               plotOutput("distPlot2"))
    )
    )
  )
))
