library(shiny)
library(sejmRP)
library(ggplot2)
library(dplyr)
library(dplyr)


wybrany <- c("Nieobecność/Obecność", "Przerwał/Przerwano", "Przerwano Oklaskami/Przerwał Poseł", "Dawał braw", "Otrzymał braw")


shinyUI(fluidPage(
  tags$head(tags$style(HTML("
                            .well {
                            background-color: #dd9999!important;
                            }
                            "))),
  shinyUI(navbarPage("Oklaski, Brawa, Nieobecności i Przerywania - Projekt 2 - Piotr Chmiel",
                     tabPanel("Nieobecność/Obecność", 
                              plotOutput("trend")),
                     tabPanel("Przerwał/Przerwano", 
                              plotOutput("trend2")),
                     tabPanel("Przerwano Oklaskami/Przerwał Poseł", 
                              plotOutput("trend3")),
                     tabPanel("Dawał braw", 
                              plotOutput("trend4")),
                     tabPanel("Otrzymał braw", 
                              plotOutput("trend5"))
  ))
  )
)