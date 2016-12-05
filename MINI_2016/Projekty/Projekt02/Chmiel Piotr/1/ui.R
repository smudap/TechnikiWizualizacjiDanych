library(shiny)
library(sejmRP)
library(ggplot2)
library(dplyr)
library(dplyr)


kluby <- dane %>% group_by(club)%>%
  summarise(count=n())

shinyUI(fluidPage(
  tags$head(tags$style(HTML("
                            .well {
                            background-color: #dd9999!important;
                            }
                            "))),
  titlePanel("Kluby do analizy - nieobecności"),
  sidebarLayout(
    sidebarPanel(
       selectInput("wybranyKlub", 
                   label = "Klub do analizy",
                   choices = kluby$club,
                   selected = "PiS")
    ),
    mainPanel(
      tabsetPanel(
        tabPanel("Wykres", 
                 plotOutput("liderzyNieobecnosci"))
        )    
      )
    )
  )
)