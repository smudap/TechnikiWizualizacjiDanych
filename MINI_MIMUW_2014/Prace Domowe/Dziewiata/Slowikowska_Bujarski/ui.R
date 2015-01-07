library(shiny)

shinyUI(navbarPage(
   titlePanel("Jakie imiona najczęściej są nadawane?"),
   tabPanel(
      h5("Najczęściej nadawane imiona w wybranym roku"),
      sidebarLayout(
         sidebarPanel(
            radioButtons("plec", label=h6("Płeć"), choices=list("Mężczyźni" = "M", "Kobiety" = "K"), selected="M"),
            selectInput("rok", label = h6("Rok"), 
                        choices = as.list(2004:2014),
                        selected = 2014),
            numericInput("ile", 
                         label = h6("Ile imion"), 
                         value = 3)
         ),
         mainPanel(
            plotOutput("smoothPlot")
         )
      )
   ),
   tabPanel(
      h5("Rozkład nadawań danego imienia"),
      sidebarLayout(
         sidebarPanel(
            textInput("imie", h6("Wybrane imię"), "Ada")           
         ),
         mainPanel(
               plotOutput("imie")
         )
      )
   )
))









