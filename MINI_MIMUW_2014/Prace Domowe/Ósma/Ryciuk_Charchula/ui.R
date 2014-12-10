library(shiny)

shinyUI(fluidPage(
  titlePanel("Wspanialy wykres"),
  sidebarLayout(
    sidebarPanel(
      sliderInput("val",
                  "Kolory pierwszego wykresu",
                  min = 1,
                  max = 7,
                  value = 1),
      
      selectInput("plec", label = "Plec", 
                  choices = list('All',"Male","Female"), 
                  selected = "All"),
      selectInput("ll", label = "Kolor w drugim wykresie - ma³e wartoœci", 
                  choices = list("Green","Gold","Blue","DarkOrchid","Red"), 
                  selected = "Gold"),
      selectInput("hh", label = "Kolor w drugim wykresie - du¿e wartoœci", 
                  choices = list("Green","Gold","Blue","DarkOrchid","Red"), 
                  selected = "DarkOrchid")
    ),
    
    
    mainPanel(
      plotOutput("colPlot"),
      plotOutput("dwaPlot")
    )
  )
))

