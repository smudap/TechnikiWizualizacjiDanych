tak <- c(89, 70, 73, 71, 68)
nie <- c(6, 25, 17, 21, 21)
wiek <- factor(c("18-24", "25-34", "35-44", "45-54", "55-64"))
dane <- data.frame(wiek, tak, nie)

library("ggplot2")
library("dplyr")

library(reshape2)


dane.melt <- melt(dane, id="wiek")

names(dane.melt)[3] <- "value"


dane.melt


cbPalette <- c("#33CC33", "red")

ggplot(dane.melt, aes(x=wiek, value, group=variable, label=value)) +
  geom_ribbon(aes(ymin=0, ymax=value, group=variable, fill=variable),  alpha = 0.4) +
  geom_text(size=4, color="black", alpha=0.9)+
  scale_fill_manual(values=cbPalette) +   
  annotate("text", x = 3, y = 50, label = "TAK", color="#003300", size=10) +
  annotate("text", x = 2.1, y = 12, label = "NIE", color="#990000", size=10) +
  theme(panel.background=element_rect(fill = "white"), 
        axis.line = element_line(linetype="blank")) +
  labs(title = "Czy jestes zadowolony ze swojej pracy?") +
  ylab("Ilosc procentowa") +   #modyfikacja axisa y 
  xlab("Wiek")

