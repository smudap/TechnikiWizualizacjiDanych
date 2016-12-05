library(ggplot2)

shinyServer(function(input, output, session) {
  datForSelectedGeo <- reactive({
    datl[datl$geo %in% input$selectedGeo & datl$sex == input$selectedSex & datl$age == input$selectedAge & datl$frequenc == input$selectedFreq & datl$wstatus == input$selectedWStatus, ]
  })
  
  unemploymentForSelected <- reactive({
    unemployment[unemployment$geo %in% input$selectedGeo, ]
  })
  
  output$listaOdcinkow <- renderUI({ 
    datForGeo <- datForSelectedGeo()
    unemploymentSelected <-unemploymentForSelected()
    
    selectInput("frequency", "Częstotliwość", as.character(datForGeo$frequenc) )
  })
  
  output$trend = renderPlot({
    datForGeo <- datForSelectedGeo()
    unemploymentSelected <- unemploymentForSelected()
    
    
    pl <- ggplot(datForGeo, aes(y=values,x = time))+ 
      ylab("unit [%]") + 
      xlab("year") + 
      geom_point(aes(colour = factor(geo)))+ 
      geom_line(aes(colour = factor(geo))) +
      ggtitle("Work at night")
    if (input$trendLine) {
      # pl <- pl + geom_smooth(se=FALSE, method="lm", size=3)
      #pl <- pl + geom_point(data = unemploymentSelected) + geom_line(data = unemploymentSelected)
    }
    
    for (country in input$selectedGeo) {
      test <- unemploymentSelected$geo
      
      temporary <- subset(unemploymentSelected, geo==country)
      
      pl <- pl +
        geom_point(data = temporary, aes(colour = factor(geo))) +
        geom_line(data = temporary, aes(colour = factor(geo)), linetype = "dotdash")
    }
    
    pl
  })
  
  output$model = renderPrint({
    datForGeo <- datForSelectedGeo()
    unemploymentSelected <-unemploymentForSelected()
    summary(lm(value~geo, datForGeo))
  })
})
