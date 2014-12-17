#Wiktor Ryciuk, Marta Charchu³a
library(shiny)
library(dplyr)
library(ggplot2)
library(reshape2)
library(plyr)

Marcin <- read.csv("~/matma 5/Techniki Wizualizacji/polska2012pisa.csv")
# load("h:/Windows7/Desktop/TWD shiny/PISAeurope.rda")
# pisa <- pisa[pisa[,1]=="Poland",]
# pisa1 <- pisa[!is.na(pisa$ST28Q01),]

shinyServer(function(input, output) {
  output$colPlot <- renderPlot({
    a=1
    if (input$plec!="All") {Marcin <-Marcin %>% filter(Gender==input$plec)
    if (input$plec=="Female") a=0.51
    if (input$plec=="Male") a=0.48
    }
    
    my_data_x <- as.matrix(table(na.omit(Marcin[,11:12])))
    
    
    my_data_x <- data.frame(MakeFriendsEasily = c("Agree", "Disagree", "StronglyAgree","StronglyDisagree"), Agree =my_data_x[,1], Disagree = my_data_x[, 2], 
                            StronglyAgree = my_data_x[, 3], StronglyDisagree = my_data_x[, 4])
    # helper variables
    my_data_x$total <- with(my_data_x, Agree+Disagree+StronglyAgree+StronglyDisagree)
    my_data_x$xmax <- with(my_data_x, cumsum(total))
    my_data_x$xmin <- with(my_data_x, xmax - total)
    
    my_data_long <- melt(my_data_x, c("MakeFriendsEasily", "xmin", "xmax", "total"))
    
    my_data_long$MakeFriendsEasily <- factor(my_data_long$MakeFriendsEasily, c("Agree", "Disagree", "StronglyAgree", "StronglyDisagree"))
    
    my_data_long1 <- ddply(my_data_long, .(MakeFriendsEasily), transform, ymax = cumsum(value))
    my_data_long1 <- ddply(my_data_long1, .(MakeFriendsEasily), transform, ymin = ymax - value)
    
    my_data_long1$ymin_std <- with(my_data_long1, (ymin / total) * 100)
    my_data_long1$ymax_std <- with(my_data_long1, (ymax / total) * 100)
  

      ggplot(my_data_long1, 
                aes(ymin = ymin_std, ymax = ymax_std, xmin = xmin, 
                    xmax = xmax, fill = variable)) +
      geom_rect(colour = "black", show_guide = FALSE, width = 1) +
      scale_fill_manual(values = rainbow(10)[input$val:(input$val+3)])+
      theme_bw() +
        theme(legend.position = "none",panel.background=element_blank(),
              plot.background = element_blank()
              ,panel.grid.major = element_blank()
              ,panel.grid.minor = element_blank()
              ,panel.border = element_blank(),
              axis.line = element_blank(), 
              axis.ticks = element_blank(), 
              plot.title=element_text(size=20),
            text = element_text(size = 16)) +
      scale_x_continuous(breaks = (a*c(1000, 2000,2500, 2970)),
        labels=c("Agree", "Disagree", "StronglyAgree", "StronglyDisagree"))+
      
      scale_y_continuous(breaks = c(10, 50, 82, 94), 
                         labels = c("Agree", "Disagree", "Strongly \n agree", "Strongly \n disagree")) +
      xlab("I Make Friends Easily")+
      ylab("I Think School \n Is A Waste Of Time")+
        
      ggtitle("How do students feel in school? v1")
    
    

  })
 
 output$dwaPlot <- renderPlot({
   
   if (input$plec!="All") Marcin <-Marcin %>% filter(Gender==input$plec)
   
   
   my_data_x <- as.matrix(table(na.omit(Marcin[,11:12])))
   
   
   my_data_x <- data.frame(MakeFriendsEasily = c("Agree", "Disagree", "StronglyAgree","StronglyDisagree"), Agree =my_data_x[,1], Disagree = my_data_x[, 2], 
                           StronglyAgree = my_data_x[, 3], StronglyDisagree = my_data_x[, 4])
   # helper variables
   my_data_x$total <- with(my_data_x, Agree+Disagree+StronglyAgree+StronglyDisagree)
   my_data_x$xmax <- with(my_data_x, cumsum(total))
   my_data_x$xmin <- with(my_data_x, xmax - total)
   
   my_data_long <- melt(my_data_x, c("MakeFriendsEasily", "xmin", "xmax", "total"))
   
   my_data_long$MakeFriendsEasily <- factor(my_data_long$MakeFriendsEasily, c("Agree", "Disagree", "StronglyAgree", "StronglyDisagree"))
   
   my_data_long1 <- ddply(my_data_long, .(MakeFriendsEasily), transform, ymax = cumsum(value))
   my_data_long1 <- ddply(my_data_long1, .(MakeFriendsEasily), transform, ymin = ymax - value)
   
   my_data_long1$ymin_std <- with(my_data_long1, (ymin / total) * 100)
   my_data_long1$ymax_std <- with(my_data_long1, (ymax / total) * 100)
   
     ggplot(my_data_long1,aes(x=MakeFriendsEasily,y=variable)) + 
       geom_point(aes(size=value,col=value))+
       scale_size_continuous(range=c(4,30))+
        scale_colour_gradient(low=input$ll,high=input$hh)+
       theme(legend.position = "none",panel.background=element_blank(),
             plot.background = element_blank()
             ,panel.grid.major = element_blank()
             ,panel.grid.minor = element_blank()
             ,panel.border = element_blank(),
             axis.line = element_blank(), 
             axis.ticks = element_blank(), 
             plot.title=element_text(size=20),
             text = element_text(size = 16))+
     xlab("I Make Friends Easily")+
     ylab("I Think School \n Is A Waste Of Time")+
       ggtitle("How do students feel in school? v2")
     
     
   
 })
})

