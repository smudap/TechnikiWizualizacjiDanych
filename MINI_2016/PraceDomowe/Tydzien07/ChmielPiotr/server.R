
library(ggplot2)
Zeszyt1 <- read.csv2("C:/Users/Piotr/Documents/Studia/TWD/PD/6/Zeszyt1.csv", sep=',', header=FALSE)
colnames(Zeszyt1) <- c("radio", "11.14-04.15", "05.15-10.15", "11.15-04.16", "05.16-10.16")

shinyServer(function(input, output, session) {
  output$trend = renderPlot({
    y <- Zeszyt1[input$wybraneRadio]
    df <- data.frame(Zeszyt1$radio, y)
    colnames(df) <- c("radio", "value")
    df[ , 2] <- as.numeric(as.character(df[ , 2]))
    pl <- ggplot(df, aes(x = reorder(df$radio, -value), y = value)) +
      geom_bar(stat="identity") + xlab("Nazwa stacji radiowej") + ylab("Procentowy udział") + theme(axis.text.x = element_text(angle = 90, hjust = 1)) 
      pl <- pl + geom_text(aes(label=value), position=position_dodge(width=0.9), vjust=-0.25)
    pl
  }, height = 600)
})