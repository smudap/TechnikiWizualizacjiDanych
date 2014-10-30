tak <- c(89, 70, 73, 71, 68)
nie <- c(6, 25, 17, 21, 21)
wiek <- factor(c("18-24", "25-34", "35-44", "45-54", "55-64"))
dane <- data.frame(tak, wiek, nmz = 100-tak-nie, nie)

library("ggplot2")
library("dplyr")

pol <- pisa %>% filter(CNT == 'Poland')

props <- 
  pol %>% 
  mutate(mat_cat = cut(PV1MATH, c(0, 400, 600, 1000))) %>%
  group_by(ST28Q01, mat_cat) %>%
  summarise(total = sum(W_FSTUWT, na.rm=TRUE))
mprops <- 
  props %>%
  group_by(ST28Q01) %>%
  mutate(mtotal = total / sum(total))               

#
# teraz pozostaje jedynie zastosować geometrie geom_bar()
ggplot(mprops, aes(x=ST28Q01, y=mtotal, fill=mat_cat)) +
  geom_bar(stat='identity', position='dodge', alpha=0.5) 





dane



install.packages("reshape2")

library(reshape2)

help(package="reshape2")


dane.melt <- melt(dane, "wiek")
names(dane.melt)[3] <- "frakcja"

library("ggplot2")

ggplot(dane.melt, aes(x=wiek, y=frakcja, fill=variable)) +
  geom_bar(stat='identity', position='fill', alpha=1) +
  scale_fill_brewer(palette = "Spectral", name=" ") +
  coord_flip() + 
  ggtitle("Czy jesteś zadowolony ze swojej pracy?") +
  theme(
    plot.title = element_text( colour ="blue3", size =25),
    axis.line = element_blank(),  
    axis.ticks = element_blank(),  axis.title = element_text( size = 21),
    panel.border = element_blank(), 
    panel.grid.major = element_blank(), 
    panel.grid.minor = element_blank()
  )

dane.melt[,2] <- factor(dane.melt[,2], levels=c("nie", "nmz", "tak"))




ggplot(dane.melt, aes(x=wiek, y=value, fill=variable)) +
  geom_bar(stat='identity', position='fill', alpha=1) +scale_fill_distiller(palette = "Spectral", trans = "reverse") +
  coord_flip()
