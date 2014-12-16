library(shiny)



  
shinyUI(fluidPage(
  titlePanel("Zwycięskie partie oraz frekwencja w poszczególnych województwach"),
  sidebarLayout(
    sidebarPanel(
      
#       sliderInput("smooth",
#                   "Choose smoothing:",
#                   min = 0,
#                   max = 1,
#                   value = 0.5),
#       
#       checkboxInput("checkbox", label = "Add SE bands", value = TRUE),
#       
#       sliderInput("limits", label = "Limits for OY axis",
#                   min = 100, max = 900, value = c(300, 700)),
#       
#       selectInput("col", label = "Color of the smooth line", 
#                   choices = list("red", "blue", "black"), 
#                             selected = "red"),
#       
#       sliderInput("abc", label = "size",
#                   min = 0, max = 9, value = 2),
      
      sliderInput("szer_slupek", label = "Szerokość słupka",
                  min = 0, max = 0.5, value = 0.1),
      
      sliderInput("wys_slupek", label = "Wysokosc (skalowanie) słupka",
                  min = 0, max = 3, value = 1),
      
      
      
      selectInput("kolory", label = "Paleta kolorów", 
                  choices = list(
                     "standardowy"=1,
                     "jasny" = 2,
                     "czerwony" = 3),
                  selected = 1),
      
      selectInput("kol_slupka", label = "Kolor słupka", 
                  choices = list("red", "blue", "black", "yellow", "green"), 
                  selected = "black"),    
  
      selectInput("kol_cyfr", label = "Kolor cyfr", 
                  choices = list("red", "blue", "black", "yellow", "green"), 
                  selected = "black"),  
      
      checkboxInput("bold", label = "Pogrubienie cyfr", value = FALSE),
      
      sliderInput("wielk_cyfr", label = "Wielkość cyfr",
                  min = 1, max = 10, value = 5)
      
      
    ),  
    
    
    
    
    
    mainPanel(
      #p("A oto wykresy"),
      #plotOutput("smoothPlot"),
      plotOutput("wyboryPlot", width=650, height=520)
      # tu można jeszcze dorzucać inne wykresy
    )
  )
))