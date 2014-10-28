load("konkursPAZUR.RData")

library(dplyr)
library(ggplot2)

skoki <-filter(skiJumps2013, jumpSpeed >= 10, compCountry == "Poland")

ggplot(skoki, aes(x=jumpWind, y=jumpSpeed, colour=compName)) +
  geom_smooth(method = "lm")

