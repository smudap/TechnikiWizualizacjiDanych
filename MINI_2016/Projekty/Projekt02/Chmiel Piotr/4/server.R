library(sejmRP)
library(ggplot2)
library(dplyr)
#dane<-get_filtered_votes( dates = c("2015-11-12", "2016-10-04"))


liczbaGlosowan <- nrow(dane%>% 
                         group_by(id_voting) %>%
                         summarise(count=n()))

nieobecni <- dane%>% filter(vote=="Nieobecny") %>%
  group_by(surname_name, club, vote) %>%
  summarise(count=n())


kluby <- dane %>% group_by(club)%>%
  summarise(count=n())


shinyServer(function(input, output, session) {
  output$kluby1 = renderPlot({
    
    
    zaPO <- dane%>% filter(club==input$klub1) %>%
      group_by(surname_name, vote) %>%
      summarise(count=n())
    zaPO <- arrange(zaPO ,desc(count)) %>% group_by(vote) %>%
      top_n(n = 5, wt = count)

    
    p <- ggplot(zaPO, aes(x=reorder(surname_name, -count), y=count, fill=vote))+ geom_bar(position="dodge", stat="identity") + geom_text(aes(label=count), vjust=-0.2)
    p <- p + theme(axis.text.x = element_text(angle = 90, hjust= 1, vjust = 0.5)) +  xlab("Nazwisko i imię posła") + ylab("Liczba")
    p <- p + facet_grid(. ~ vote,scales = "free_x")
    p
  })
  output$kluby2 = renderPlot({
    
    
    zaPO <- dane%>% filter(club==input$klub2) %>%
      group_by(surname_name, vote) %>%
      summarise(count=n())
    zaPO <- arrange(zaPO ,desc(count)) %>% group_by(vote) %>%
      top_n(n = 5, wt = count)
    
    
    p <- ggplot(zaPO, aes(x=reorder(surname_name, -count), y=count, fill=vote))+ geom_bar(position="dodge", stat="identity") + geom_text(aes(label=count), vjust=-0.2)
    p <- p + theme(axis.text.x = element_text(angle = 90, hjust= 1, vjust = 0.5)) +  xlab("Nazwisko i imię posła") + ylab("Liczba")
    p <- p + facet_grid(. ~ vote,scales = "free_x")
    p
  })
})