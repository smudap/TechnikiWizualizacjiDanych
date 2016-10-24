generateDeck <- function(deckIndex){
manaCost <-   c(sample(c(NA), 24, replace=T),ceiling(abs(rnorm(36, 3.5, 2))))

cards <- data.frame(manaCost)
cards$deckIndex <- factor(deckIndex)

cards$type <- c(sample(c(NA), 24, replace=T),runif(36))
cards$type[is.na(cards$type)] <- "Land"
cards$type[cards$type < 0.45] <- "Creature"
cards$type[cards$type < 0.60] <- "Instant"
cards$type[cards$type < 0.75] <- "Sorcery"
cards$type[cards$type < 0.90] <- "Enchantment"
cards$type[cards$type < 1.01] <- "Artifact"

#ggplot(cards) + geom_bar(mapping = aes(x=1, fill = type), position = "fill") +  coord_polar(theta = "y")

cards$attack <- NA
cards$attack[cards$type == "Creature"] <- sample(1:5,replace=TRUE)
cards$defence <- NA
cards$defence[cards$type == "Creature"] <- sample(1:5,replace=TRUE)

cards$battleType <- cards$attack/cards$defence
cards$battleType[cards$battleType < 1] <- "defender"
cards$battleType[cards$battleType == 1] <- "universal"
cards$battleType[as.numeric(cards$battleType) > 1] <- "attacker"

colors <- c("red", "blue", "green")
colorsProbs <- c(1, 1, 0.5)

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
    geom_bar(mapping = aes(x=1, fill = type), position = "fill") +
    coord_flip() +
    themeNoLabels
}

colorPlot <- function(deck){
  ggplot(deck, aes(x=1, fill=color)) +
    geom_bar(position="fill") +
    guides(fill = FALSE) +
    
    theme(axis.title.y=element_blank(),
          axis.text.y=element_blank(),
          axis.ticks.y=element_blank())
}

costBarPlot <- function(deck){
  ggplot(deck, aes(x=manaCost, fill=manaCost)) +
    geom_bar() +
    coord_cartesian(xlim = c(0, maxCost), ylim = c(0, maxCost)) +
    scale_x_continuous(breaks=0:maxCost) +
    scale_y_continuous(breaks=0:maxCount) +
    theme(panel.grid.major = element_line(colour = "blue"))
}

creatureTypes <- function(desks){
  ggplot(decks,aes(x=battleType, fill = deckIndex)) + coord_flip()+ geom_bar(position="fill")
}

deck1 = generateDeck(1)
deck2 = generateDeck(2)
decks <- rbind(deck1,deck2)

maxCost = max(decks$manaCost, na.rm=T)
maxCount = max(max(hist(deck1$manaCost, plot=FALSE)$counts), max(hist(deck2$manaCost, plot=FALSE)$counts))

t1 = typePlot(deck1) + theme(legend.position="right")
c1 = colorPlot(deck1) + theme(legend.position="right")
cost1 = costBarPlot(deck1)

t2 = typePlot(deck2) + theme(legend.position="none")
c2 = colorPlot(deck2)
cost2 = costBarPlot(deck2) + coord_cartesian(xlim = c(0, maxCost), ylim = c(0, maxCost))

balancePlot <- creatureTypes(decks) + themeNoLabels + theme(legend.position="none") + theme(axis.text.y=element_text())

#p1 = multiplot(t1,c1,cost1, layout= matrix(c(1,3,2,3), nrow=2))
#p2 = multiplot(t2,c2,cost2, layout= matrix(c(1,3,2,3), nrow=2))
#multiplot(p1,p2)
multiplot(t1, t2, c1, c2 ,cost1, cost2, balancePlot, layout= matrix(c(1,2,3,4,5,6,7,7), nrow=4, byrow = T))
