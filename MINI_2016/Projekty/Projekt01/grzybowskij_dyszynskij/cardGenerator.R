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
cards$battleType[cards$battleType < 1] <- "denfender"
cards$battleType[cards$battleType == 1] <- "universal"
cards$battleType[as.numeric(cards$battleType) > 1] <- "attacker"

colors <- c("red", "blue", "green")
colorsProbs <- c(1, 1, 0.5)

cards$color <- sample(colors, 60, replace = TRUE, colorsProbs)

cards[order(cards$type),] 
}

typePie <- function(deck) {
  ggplot(deck) + geom_bar(mapping = aes(x=1, fill = type), position = "fill") +  coord_polar(theta = "y")
}

colorPlot <- function(deck){
  ggplot(deck, aes(x=1, fill=color)) +
    geom_bar(position="fill") +
    coord_polar(theta="y") + 
    guides(fill = FALSE)
}

costBarPlot <- function(deck){
  ggplot(deck, aes(x=manaCost, fill=manaCost)) +
    geom_bar() 
}

creatureTypes <- function(desks){
  ggplot(decks,aes(x=battleType, fill = deckIndex)) + coord_flip()+ geom_bar(position="fill")
}

deck1 = generateDeck(1)
t1 = typePie(deck1)
c1 = colorPlot(deck1)
cost1 = costBarPlot(deck1)

deck2 = generateDeck(2)
t2 = typePie(deck2)
c2 = colorPlot(deck2)
cost2 = costBarPlot(deck2)

decks <- rbind(deck1,deck2)
balancePlot <- creatureTypes(decks)

#p1 = multiplot(t1,c1,cost1, layout= matrix(c(1,3,2,3), nrow=2))
#p2 = multiplot(t2,c2,cost2, layout= matrix(c(1,3,2,3), nrow=2))
#multiplot(p1,p2)
multiplot(t1,c1,cost1, t2,c2,cost2, balancePlot, layout= matrix(c(1,2,4,5,3,3,6,6,7,7,7,7), nrow=3, byrow = T))
