library(shiny)
library(PogromcyDanych)
Zeszyt1 <- read.csv2("C:/Users/Piotr/Documents/Studia/TWD/PD/6/Zeszyt1.csv", sep=',', header=FALSE)
colnames(Zeszyt1) <- c("radio", "11.14-04.15", "05.15-10.15", "11.15-04.16", "05.16-10.16")
przedzial <- c("11.14-04.15", "05.15-10.15", "11.15-04.16", "05.16-10.16")

shinyUI(fluidPage(
  tags$head(tags$style(HTML("
                            .well {
                            background-color: #dd9999!important;
                            width: 200px;
                            }
                            "))),
  titlePanel("Stacje radiowe - wybrany okres"),
  sidebarLayout(
    sidebarPanel(
       selectInput("wybraneRadio", 
                   label = "Okres do analizy",
                   choices = przedzial,
                   selected = "11.14-04.15")
    ),
    mainPanel(
      tabsetPanel(
        tabPanel("Wykres", 
                 plotOutput("trend")),
        tabPanel("Źródło", 
                 p("http://www.wirtualnemedia.pl/artykul/rmf-fm-bezkonkurencyjne-w-aglomeracji-slaskiej-zyskuje-radio-katowice"))
        )    
      )
    )
  )
)