library(ggplot2)

shinyServer(function(input, output, session) {
  datForSelectedGeo <- reactive({
    
    datl[datl$geo %in% input$selectedGeo & 
           datl$sex == input$selectedSex & 
           datl$age == input$selectedAge & 
           datl$frequenc == input$selectedFreq & 
           (input$selectedWStatus == "All" | datl$wstatus == input$selectedWStatus), ]
  })
  
  unemploymentForSelected <- reactive({
    unemployment[unemployment$geo %in% input$selectedGeo, ]
  })
  
  
  output$trend = renderPlot({
    datForGeo <- datForSelectedGeo()

    if(input$selectedWStatus == "All")
    {
      tempForMean <- aggregate(x = datForGeo$values, by = list(datForGeo$geo, datForGeo$time), FUN = mean)

      colnames(tempForMean) <- c('geo','time','values')

      datForGeo <- tempForMean
    }

    unemploymentSelected <- unemploymentForSelected()
    
    test <- merge(datForGeo, unemploymentSelected, by=c("geo","time"))
    
    pl <- ggplot(test, aes(y=values.x,x = time))+
      ylab("unit [%]") + 
      xlab("year") + 
      geom_point(aes(y=values.x,x = time, colour = factor(geo)))+
      geom_line(aes(group=geo, colour = factor(geo))) +
      ggtitle("Work at night") +
      theme(text = element_text(size=18))
    
    pl$labels$colour <- "Country:"
    
    for (country in input$selectedGeo) {
      test <- unemploymentSelected$geo

      temporary <- subset(unemploymentSelected, geo==country)

      if (input$showUnemployment) {
        pl <- pl + geom_point(aes(y=values.y,x = time, colour = factor(geo))) + 
          geom_line(aes(y = values.y, group=geo, colour = factor(geo)), linetype = "dotdash")
      }
    }

    pl
  })
  
  output$table <- renderDataTable(datForSelectedGeo(),
                                  options = list(
                                    pageLength = 5)
                                  )
})
