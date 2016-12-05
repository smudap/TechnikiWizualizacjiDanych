library(shiny)
library(sejmRP)
library(ggplot2)
library(dplyr)
library(dplyr)


glos <- dane %>% group_by(vote)%>%
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
                   choices = glos$vote,
                   selected = "Za")
    ),
    mainPanel(
      tabsetPanel(
        tabPanel("Wykres", 
                 plotOutput("liderzyZa"))
        )    
      )
    )
  )
)