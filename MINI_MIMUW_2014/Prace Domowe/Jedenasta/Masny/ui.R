library(shiny)
library(rCharts)

shinyUI(fluidPage(
  titlePanel("Mathematics is an important subject for me because I need it
             for what I want to study later on"),
  sidebarLayout(
    sidebarPanel( 
#       selectInput("cnt", 
#                   label = "Choose a variable to display",
#                   choices = c("Belgium", "Czech Republic",
#                                  "Germany", "Finland", "United Kingdom",
#                                  "Korea", "Poland", 
#                                  "Greece",  "France", "Japan"),
#                   selected = "Belgium")
#       ),
      checkboxGroupInput("cnt", 
                         label = h3("Choose countries to show"),
                         choices = c("Belgium" = "Belgium", "Czech Republic" = "Czech Republic",
                                     "Germany" = "Germany", "Finland"  = "Finland", 
                                     "United Kingdom"  = "United Kingdom",
                                     "Korea"  = "Korea", "Poland" = "Poland", 
                                     "Greece" = "Greece",  "France" = "France", "Japan" = "Japan"),
                         selected = "Belgium")
      ),
    mainPanel(
      showOutput("chart", "highcharts")
  )
  )
))