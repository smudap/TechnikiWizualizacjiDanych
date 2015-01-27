## server.r

#install_github('slidify', 'ramnathv', ref = 'dev')
#install_github('rCharts', 'ramnathv')
#install_github('slidifyLibraries', 'ramnathv', ref = 'dev') # optional
require(devtools)
require(shiny)
require(dplyr)
require(rCharts)


kobiety <- read.table("fltper_1x1.txt", skip=2, header=T) 
mezczyzni <- read.table("mltper_1x1.txt", skip=2, header=T) 

shinyServer(function(input, output, session) {
  
  output$chart <- renderChart({
    kobiety01 <- kobiety %>% 
      filter(Age == 0) %>%
      mutate(Age = as.numeric(as.character(Age)),
             Gender = "Female")
    
    mezczyzni2 <- mezczyzni %>%
      filter(Age == 0) %>%
      mutate(Age = as.numeric(as.character(Age)),
             Gender = "Male")
    
    km2 <- rbind(kobiety01, mezczyzni2)
    
    if(input$male == FALSE)
      km2 <- km2 %>% filter(Gender == "Female") 
     
    if(input$female == FALSE)
      km2 <- km2 %>% filter(Gender == "Male") 

    km2$qx <- km2$qx * 100
    
    km2 <- km2 %>% filter(Year >= input$range[1], Year <= input$range[2])
    
    p2 <- rPlot(qx ~ Year, color = 'Gender', type = 'line', data = km2)
    p2$addParams(width = input$width, height = 500, dom = 'chart2', title = "Percentage of new born children deaths in a given year")
    p2$guides(y = list(min = 0, title = "Deaths of new born children [%]"))
    p2$addParams(dom = 'chart')
    p2
    return(p2)
  })
  
})
