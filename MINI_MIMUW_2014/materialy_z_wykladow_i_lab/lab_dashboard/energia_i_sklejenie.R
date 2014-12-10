kraje <- c("Polska", "Francja", "Australia", "Rep. Śr. Afryki", "Brazylia")
źródła <- c("kopalniane", "jądrowe", "wodne", "inne odnawialne")
pol <- c(89.2, 0, 2.8, 3.7)
fr <- c(22.1, 50.8, 14.7, 6.9)
aust <- c(78.7, 0, 13.6, 5.1)
rsa <- c(43.2, 0, 56.8, 0)
braz <- c(19.6, 1.8, 71, 7.7)
dane <- rbind(pol, fr, aust, rsa, braz)
dane

rownames(dane) <- kraje
colnames(dane) <- źródła

library(reshape)

dane2 <- melt(dane)
dane2$X2 = factor(dane2$X2, levels=c("kopalniane", "jądrowe", "wodne", "inne odnawialne"))

library(ggplot2)
ggplot(dane2, aes(x=X1, y=value, fill=X2)) + 
  geom_bar(stat="identity", position="fill", width=1, color="black") + 
  scale_fill_manual(values=c("brown", "yellow", "blue", "green"))
  #  coord_polar()
