library(shiny)

shinyUI(fluidPage(
  titlePanel("Czy w każdym kraju dzieci wykształconych rodziców uczą się długo w domu?"),
  sidebarLayout(
    sidebarPanel(
      
      
      selectInput("kraj", label = h4("Kraj nr 1"),
                  choices = list("Poland" ,"Belgium", "Czech Republic", "Germany", "Finland", "France", "United Kingdom", "Greece", "Japan", "Korea"),selected = "Poland"),
      
      
      selectInput("kraj2", label = h4("Kraj nr 2"),
                  choices = list("Poland" ,"Belgium", "Czech Republic", "Germany", "Finland", "France", "United Kingdom", "Greece", "Japan", "Korea"),selected = "Belgium"),
      
      
      selectInput("position", label = h4("Rodzaj wykresu"),
                  choices = list("fill", "dodge", "stack"),selected = "fill"),
      
      
      sliderInput("width",
                  label = h4("Wsp. grubości:"),
                  min = 0,
                  max = 1,
                  value = 0.5),
      

      selectInput("paleta", label = h4("Kolory wykresów"),
                  choices = list("Set1","Spectral","Blues", "Reds", "YlOrRd"), selected="Set1"),

      sliderInput("alpha",
                  label = h4("Wsp. przezroczystości:"),
                  min = 0,
                  max = 1,
                  value = 0.5) ,
          
  
      selectInput("scheme", label=h4("Styl tła"),
                  choices = list("Grey",
                                 "Black & white",
                                 "Tufte"),
                  selected = "Grey")
      
    ),
 
    mainPanel(
      plotOutput("pierwszyPlot"),
      plotOutput("drugiPlot"),
      plotOutput("trzeciPlot")
    )

  )
))
