## server.r
require(shiny)
require(rCharts)

load("mmG.rda")

shinyServer(function(input, output, session) {
  
  output$dekompozycja <- renderChart({
    p1 <- nPlot(value ~ daty, group = "variable", data = mmG, type = "multiBarChart")
    p1$chart(stacked = TRUE)
    p1$addParams(dom = 'dekompozycja')
    p1$set(width=input$szerokosc)
    return(p1)
  })

})

# mmG$datyN <- as.numeric(factor(mmG$daty))
# p1 <- nPlot(value ~ datyN, group = "variable", data = mmG, type = "lineWithFocusChart")
# p1

# p1 <- nPlot(value ~ datyN, group = "variable", data = mmG, type = "lineChart")
# p1
