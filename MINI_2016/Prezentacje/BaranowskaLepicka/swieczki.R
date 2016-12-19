library(plotly)
library(dplyr)

load("C:/Users/E540/Desktop/SMAD - rok 2/Techniki wizualizacji/Prezentacja/wig20.rdata")
a <- c("data", "otwarcie", "max", "min", "zamknięcie", "wolumen")

wig20 <- wig20[11:73,]
hovertxt <- Map(function(x, y) paste0(x, ":", y), a, wig20)
hovertxt <- Reduce(function(x, y) paste0(x, "<br&gt;", y), hovertxt)

wig20$Data <- as.Date(wig20$Data, "%y-%m-%d")


p<-plot_ly(wig20, x = ~Data, xend = ~Data, hoverinfo = "none",
           color = ~Zamkniecie > Otwarcie, colors =  c("#ff0000","#7cfc00"),
           width = 1200, height = 800) %>%
  
  add_segments(y = ~Najnizszy, yend = ~Najwyzszy, line = list(width = 1, color = "black")) %>%
  
  add_segments(y = ~Otwarcie, yend = ~Zamkniecie, line = list(width = 10)) %>%
  
  add_markers(y = ~(Najnizszy + Najwyzszy)/2, hoverinfo = "text",
              text = hovertxt, marker = list(color = "transparent")) %>% 
  
  layout(showlegend = FALSE, 
         yaxis = list(title = "Wartość indeksu", domain = c(0, 0.9),
                      side="right",overlaying = "y"),
         
         xaxis = list(tickformat = "%d.%m"),
         
         annotations = list(
           list(xref = "paper", yref = "paper", 
                x = 0, y = 1, showarrow = F, 
                xanchor = "left", yanchor = "top",
                align = "left",
                text = paste0("<b>Wykres świecowy dla WIG20</b>"),
                font = list(size = 30)),
           
           list(xref = "paper", yref = "paper", 
                x = 0.75, y = 1, showarrow = F, 
                xanchor = "left", yanchor = "top",
                align = "left",
                text = " ",
                font = list(size = 10))),margin = list(r = 60, l=-100),
         
         plot_bgcolor = "white")

p