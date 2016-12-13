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
  output$liderzyZa = renderPlot({
    nieobecniClub <- dane%>% filter(vote==input$wybranyKlub) %>%
      group_by(surname_name, club, vote) %>%
      summarise(count=n())
    
    top5 <- arrange(nieobecniClub ,desc(count))
    top5 <- top5 %>%
      group_by(club) %>%
      top_n(n = 5, wt = count)
    
    p <- ggplot(top5, aes(x=reorder(surname_name, -count), y=count, fill=club))+ geom_bar(stat="identity") + geom_text(aes(label=count), vjust=-0.2)
    p <- p + theme(axis.text.x = element_text(angle = 90, hjust= 1, vjust = 0.5)) +  xlab("Nazwisko i imię posła") + ylab("Liczba nieobecności")
    p <- p + facet_grid(. ~ club,scales = "free_x")
    p
  })
})