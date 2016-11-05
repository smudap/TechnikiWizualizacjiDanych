library(ggplot2)
w <- read.table(file = "wojewodztwa.csv", header = TRUE, sep = ";")
ggplot(w, aes(y=kawalerowie..panny, x=Województwo)) + 
  geom_bar(stat ="identity") + 
  ylim = c(0,100) + 
  coord_flip()
