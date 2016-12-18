library(shiny)
library(sejmRP)
library(ggplot2)
library(dplyr)
library(dplyr)


glos <- dane %>% group_by(vote)%>%
  summarise(count=n())
klub <- dane %>% group_by(club)%>%
  summarise(count=n())
shinyUI(fluidPage(
  tags$head(tags$style(HTML("
                            .well {
                            background-color: #dd9999!important;
                            }
                            "))),
  titlePanel("Kluby do analizy"),
  sidebarLayout(
    sidebarPanel(
       selectInput("klub1", 
                   label = "Klub 1",
                   choices = klub$club,
                   selected = "PiS"),
       
       selectInput("klub2", 
                   label = "Klub 2",
                   choices = klub$club,
                   selected = "PO")
    ),
    mainPanel(
      tabsetPanel(
        tabPanel("Porównanie",
                 plotOutput("kluby1"),
                 plotOutput("kluby2"))
        )    
      )
    )
  )
)