library(sejmRP)
library(ggplot2)
library(dplyr)
library(stringi)
library(ggplot2)
library(reshape2)
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
  output$trend = renderPlot({
    nieobecniClub <- poselCopy %>%
      group_by(surname_name, club, nieob, obecnosc) %>%
      summarise(count=n())
    
    top5 <- arrange(nieobecniClub ,desc(nieob))
    top5 <- top5 %>%
      group_by(club) %>%
      top_n(n = 5, wt = nieob)
    
    
    mdat = melt(top5, id.vars=c("surname_name", "club"),
                measure.vars=c("nieob", "obecnosc"))
    
    plot_1 = ggplot(mdat, aes(x=reorder(surname_name, -value), y=value, fill=variable)) +
      geom_bar(position="dodge", stat="identity")
    plot_1 <- plot_1 + facet_grid(. ~ club,scales = "free_x")
    
    
    
    plot_1 <- plot_1 + theme(axis.text.x = element_text(angle = 90, hjust= 1, vjust = 0.5)) +  xlab("Nazwisko i imię posła") + ylab("Rozkład nieobecności/obecności")
    plot_1 <- plot_1 + scale_fill_discrete(name="Legenda",
                                           labels=c("Nieobecny", "Obecny"))
    plot_1 
  })
  output$trend2 = renderPlot({
    poselCopy$przerwanoZOklas <- 0
    poselCopy$przerwanoZOklas <-poselCopy$oklaski + poselCopy$przerwano
    
    przerywalPrzerywanoClub <- poselCopy %>%
      group_by(surname_name, club, przerywal, przerwanoZOklas) %>%
      summarise(count=n())
    
    top5 <- arrange(przerywalPrzerywanoClub ,desc(przerywal))
    top5 <- top5 %>%
      group_by(club) %>%
      top_n(n = 5, wt = przerywal)
    
    
    mdat = melt(top5, id.vars=c("surname_name", "club"),
                measure.vars=c("przerywal", "przerwanoZOklas"))
    
    plot_1 = ggplot(mdat, aes(x=reorder(surname_name, -value), y=value, fill=variable)) +
      geom_bar(position="dodge", stat="identity")
    plot_1 <- plot_1 + facet_grid(. ~ club,scales = "free_x")
    
    
    
    plot_1 <- plot_1 + theme(axis.text.x = element_text(angle = 90, hjust= 1, vjust = 0.5)) +  xlab("Nazwisko i imię posła") + ylab("Rozkład przerwań")
    plot_1 <- plot_1 + scale_fill_discrete(name="Legenda",
                                           labels=c("Przerywał", "Przerwano"))
    plot_1 
    
  })
  
  output$trend3 = renderPlot({
    przerywalPrzerywanoClub <- poselCopy %>%
      group_by(surname_name, club, przerwano, oklaski) %>%
      summarise(count=n())
    
    top5 <- arrange(przerywalPrzerywanoClub ,desc(przerwano))
    top5 <- top5 %>%
      group_by(club) %>%
      top_n(n = 5, wt = oklaski)
    
    
    mdat = melt(top5, id.vars=c("surname_name", "club"),
                measure.vars=c("przerwano", "oklaski"))
    
    plot_1 = ggplot(mdat, aes(x=reorder(surname_name, -value), y=value, fill=variable)) +
      geom_bar(position="dodge", stat="identity")
    plot_1 <- plot_1 + facet_grid(. ~ club,scales = "free_x")
    
    
    
    plot_1 <- plot_1 + theme(axis.text.x = element_text(angle = 90, hjust= 1, vjust = 0.5)) +  xlab("Nazwisko i imię posła") + ylab("Rozkład przerwań wypowiedzi")
    plot_1 <- plot_1 + scale_fill_discrete(name="Legenda",
                                           labels=c("Przerwał Poseł X", "Przerwano Oklaskami"))
    plot_1 
    
  })
  
  
  output$trend4 = renderPlot({
    brawa <- poselCopy %>%
      group_by(surname_name, club, DawalBraw) %>%
      summarise(count=n())
    
    top5 <- arrange(brawa ,desc(DawalBraw))
    top5 <- top5 %>%
      group_by(club) %>%
      top_n(n = 5, wt = DawalBraw)
    
    top5 <- top5 %>% filter(DawalBraw > 0)
    
    plot_1 = ggplot(top5, aes(x=reorder(surname_name, -DawalBraw), y=DawalBraw, fill=club)) +
      geom_bar(position="dodge", stat="identity")
    plot_1 <- plot_1 + facet_grid(. ~ club,scales = "free_x")
    
    
    
    plot_1 <- plot_1 + theme(axis.text.x = element_text(angle = 90, hjust= 1, vjust = 0.5)) +  xlab("Nazwisko i imię posła") + ylab("Dawane brawa")
    plot_1 <- plot_1 + scale_fill_discrete(name="Legenda")
    plot_1 
    
  })
  
  
  output$trend5 = renderPlot({
    brawa <- poselCopy %>%
      group_by(surname_name, club, ZebralBraw) %>%
      summarise(count=n())
    
    top5 <- arrange(brawa ,desc(ZebralBraw))
    top5 <- top5 %>%
      group_by(club) %>%
      top_n(n = 5, wt = ZebralBraw)
    
    top5 <- top5 %>% filter(ZebralBraw > 0)
    
    plot_1 = ggplot(top5, aes(x=reorder(surname_name, -ZebralBraw), y=ZebralBraw, fill=club)) +
      geom_bar(position="dodge", stat="identity")
    plot_1 <- plot_1 + facet_grid(. ~ club,scales = "free_x")
    
    
    
    plot_1 <- plot_1 + theme(axis.text.x = element_text(angle = 90, hjust= 1, vjust = 0.5)) +  xlab("Nazwisko i imię posła") + ylab("Otrzymane brawa")
    plot_1 <- plot_1 + scale_fill_discrete(name="Legenda")
    plot_1 
    
  })
})