library(shiny)
library(eurostat)


shinyUI(fluidPage(
  
  title = "Employed persons working at nights as a percentage of the total employment, by sex, age and professional status",
  
  fluidRow(column (12, h3("Employed persons working at nights as a percentage of the total employment "))),
  fluidRow(column (6, offset = 6,  h4("by sex, age and professional status"))),
  hr(),
  
  fluidRow(
    column(3,
           #h4("Select country"),
           selectInput("selectedGeo", 
                       label = "Select country",
                       choices = geoLabels,
                       selected = "Austria",
                       multiple = TRUE),
           br(),
           #h4("Select sex"),
           selectInput("selectedSex", 
                       label = "Select sex",
                       choices = sexLabels,
                       selected = "Females"),
           br(),
           selectInput("selectedAge", 
                       label = "Select age",
                       choices = ageLabels,
                       selected = "15 years or over"),
           selectInput("selectedWStatus", 
                       label = "Select working status",
                       choices = wstatusLabels,
                       selected = "Contributing family workers"),
           selectInput("selectedFreq", 
                       label = "Select frequency",
                       choices = freqLables,
                       selected = "Usually"),
           checkboxInput("showUnemployment",
                         "Show unemployment",
                         value = TRUE)
    ),
    column(8, offset = 1,
           tabsetPanel(
             tabPanel("Plot", 
                      p("Work at night for selected criteria"), 
                      plotOutput("trend")),
             tabPanel("Table",
                      p("Work at night for selected criteria."),
                      dataTableOutput('table')
             ) 
    ))
  )
))