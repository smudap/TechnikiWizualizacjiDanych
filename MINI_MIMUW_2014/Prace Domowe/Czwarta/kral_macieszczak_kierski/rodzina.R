library(ggplot2)

rok = c(rep(1988, 6), rep(2002, 6), rep(2011, 6))
kto = (rep(c("malbezdz", "malzdz", "parbezdz", "parzdz", "matzdz", "ojczdz"), 3))

r1998 = c(22.8, 61.8, 0, 0, 13.6, 1.8)
r2002 = c(22.7, 56, 0.8, 1.1, 17.2, 2.2)
r2011 = c(24.6, 49.7, 1.3, 1.6, 19.8, 3)

ile = c(r1998, r2002, r2011)

data = data.frame(rok, ile, kto)

ggplot(data, aes(x=rok, y=ile, col=kto)) + 
  geom_line(size=1.5) +
  ylab("Procent") +
  xlab("Rok") +
  ggtitle("Polskie rodziny w liczbach") +
  guides(color=FALSE) +
  geom_point(size=4, shape=21, col="black", aes(fill=kto)) + 
  scale_x_continuous(breaks=c(1988, 2002, 2011)) +
  scale_fill_discrete(name="Grupa",
     breaks=c("malzdz", "malbezdz", "matzdz", "ojczdz", "parbezdz", "parzdz"),
     labels=c("Małżeństwo z dziećmi", "Małżeństwo bez dzieci", "Matka z dziećmi", "Ojciec z dziećmi", "Partnerzy bez dzieci", "Partnerzy z dziećmi"))

