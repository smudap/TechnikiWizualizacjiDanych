library(ggplot2)
library(grid)
library(gridExtra)

generateDeck <- function(deckIndex){
manaCost <-   c(sample(c(NA), 24, replace=T),ceiling(abs(rnorm(36, 3.5, 2))))

cards <- data.frame(manaCost)
cards$deckIndex <- factor(deckIndex)

cards$attack <- rep(NA, nrow(cards))
cards$type <- c(sample(c(NA), 24, replace=T),runif(36))
cards$type[is.na(cards$type)] <- "Land"
cards$type[cards$type < 0.45] <- "Creature"
cards$type[cards$type < 0.60] <- "Instant"
cards$type[cards$type < 0.75] <- "Sorcery"
cards$type[cards$type < 0.90] <- "Enchantment"
cards$type[cards$type < 1.01] <- "Artifact"

#ggplot(cards) + geom_bar(mapping = aes(x=1, fill = type), position = "fill") +  coord_polar(theta = "y")

cards$attack <- rep(NA, nrow(cards))
cards$attack[cards$type == "Creature"] <- sample(1:5, replace=TRUE, size=length(cards$attack[cards$type == "Creature"]))
cards$defence <- rep(NA, nrow(cards))
cards$defence[cards$type == "Creature"] <- sample(1:5, replace=TRUE, size=length(cards$defence[cards$type == "Creature"]))

ratios = cards$attack/cards$defence
cards$battleType <- rep(NA, nrow(cards))
cards$battleType[ratios < 1] <- "defender"
cards$battleType[ratios == 1] <- "universal"
cards$battleType[ratios > 1] <- "attacker"

colors <- c("red", "blue", "green")
colorsProbs <- runif(3,min=0.25)

cards$color <- sample(colors, 60, replace = TRUE, colorsProbs)

cards[order(cards$type),] 
}

themeNoLabels = theme(axis.title.x=element_blank(),
                      axis.text.x=element_blank(),
                      axis.ticks.x=element_blank(),
                      axis.title.y=element_blank(),
                      axis.text.y=element_blank(),
                      axis.ticks.y=element_blank())

typePlot <- function(deck) {
  ggplot(deck) + 
  geom_bar(mapping = aes(x=type)) + 
  coord_flip() 
  
  #ggplot(deck) +
  #  geom_bar(mapping = aes(x=1, fill = type), position = "fill") +
  #  coord_flip() +
  #  themeNoLabels
}

colorPlot <- function(deck){
  ggplot(deck, aes(x=1, fill=color)) +
    geom_bar(position="fill") +
    guides(fill = FALSE) +
    coord_flip() +
    scale_y_continuous() +
    theme(axis.title.y=element_blank(),
          axis.text.y=element_blank(),
          axis.ticks.y=element_blank())
}

costBarPlot <- function(deck, maxCost, maxCount){
  ggplot(deck[!is.na(deck$manaCost),], aes(x=manaCost, fill=manaCost)) +
    geom_bar() +
    coord_cartesian(xlim = c(0, maxCost), ylim = c(0, maxCount)) +
    scale_x_continuous(breaks=0:maxCost) +
    scale_y_continuous(breaks=0:maxCount) +
    theme(panel.grid.major = element_line(colour = "blue"))
}

creatureTypes <- function(decks) {
  atkDef = as.data.frame(table(decks[, c("attack", "defence", "deckIndex")]))
  atkDef = atkDef[atkDef$Freq > 0,]
  p = ggplot(atkDef,aes(x=attack, y=defence, color=deckIndex, size=Freq, alpha=0.5))
  p = p + geom_point()
  p = p + guides(size=FALSE, alpha=FALSE)
  p
}

getLegend <- function(a.gplot) {
  tmp <- ggplot_gtable(ggplot_build(a.gplot))
  leg <- which(sapply(tmp$grobs, function(x) x$name) == "guide-box")
  legend <- tmp$grobs[[leg]]
  legend
}

deck1 = generateDeck(1)
deck2 = generateDeck(2)
decks <- rbind(deck1,deck2)

typeLegend <- getLegend(typePlot(decks))
#colorLegend <- getLegend(costBarPlot(decks))

maxCost = max(decks$manaCost, na.rm=T)
maxCount = max(max(hist(deck1$manaCost, plot=FALSE)$counts), max(hist(deck2$manaCost, plot=FALSE)$counts))

t1 = typePlot(deck1) + theme(legend.position="none")
c1 = colorPlot(deck1) + theme(legend.position="right")
cost1 = costBarPlot(deck1, maxCost, maxCount)

t2 = typePlot(deck2) + theme(legend.position="none")
c2 = colorPlot(deck2)
cost2 = costBarPlot(deck2, maxCost, maxCount)

balancePlot <- creatureTypes(decks)

#p1 = multiplot(t1,c1,cost1, layout= matrix(c(1,3,2,3), nrow=2))
#p2 = multiplot(t2,c2,cost2, layout= matrix(c(1,3,2,3), nrow=2))
#multiplot(p1,p2)
#multiplot(t1, t2, c1, c2 ,cost1, cost2, balancePlot, layout= matrix(c(1,2,3,4,5,6,7,7), nrow=4, byrow = T))
row1 <- grid.arrange(t1, typeLegend, t2, nrow = 1, widths = c(10, 2, 10))
row2 <- grid.arrange(c1, c2, nrow = 1)
row3 <- grid.arrange(cost1, cost2, nrow = 1)
row4 <- balancePlot
grid.arrange(row1, row2, row3, row4, ncol = 1)
