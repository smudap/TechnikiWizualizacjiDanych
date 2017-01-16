library(rbokeh)
library(dplyr)

x <- numeric()
y <- numeric()
type <- character()
k <- 0
blaubes_colors <- c("red", "blue", "orange", "purple", "white", "gold")
gifts_color <- c("red", "blue", "green")
for(i in 0:12){
  if(i == 0){
     x <- c(x, sample(seq(1, 9, 0.5), 10))
     y <- c(y, rep(-0.3, 10))
     type <- c(type, rep("gift", 10))
  }
  if(i >= 0 & i < 2) {
    for(j in seq(4.5, 5.5, 0.5)){
      x <- c(x, j)
      y <- c(y, i)
      type <- c(type, "#663300")
    }
    k = k + 1
  } else if(i >= 2 & i < 6) {
    if(i == 2)
      k = 0
    l <- 2+k
    r <- 8-k
    for(j in l:r){
      x <- c(x, j)
      y <- c(y, i)
      type <- c(type, "green")
    }
    x <- c(x, sample(seq(l - 0.5, r + 0.5, 0.01), 7))
    y <- c(y, sample(seq(i - 0.5, i, 0.05), 7, replace = TRUE))
    type <- c(type, sample(blaubes_colors, 7, replace = TRUE))
    k = k + 0.5
  } else if(i >= 6 & i < 9) {
    if(i == 6)
      k = 0
    l <- 3+k
    r <- 7-k
    for(j in l:r){
      x <- c(x, j)
      y <- c(y, i)
      type <- c(type, "green")
    }
    x <- c(x, sample(seq(l - 0.5, r + 0.5, 0.01), 7))
    y <- c(y, sample(seq(i - 0.5, i, 0.05), 7, replace = TRUE))
    type <- c(type, sample(blaubes_colors, 7, replace = TRUE))
    k = k + 0.5
  } else if(i >= 9 & i <= 11) {
    if(i == 9)
      k = 0
    l <- 4+k
    r <- 6-k
    for(j in l:r){
      x <- c(x, j)
      y <- c(y, i)
      type <- c(type, "green")
    }
    x <- c(x, sample(seq(l - 0.5, r + 0.5, 0.01), 7))
    y <- c(y, sample(seq(i - 0.5, i, 0.05), 7, replace = TRUE))
    type <- c(type, sample(blaubes_colors, 7, replace = TRUE))
    k = k + 0.5
  } else {
    x <- c(x, 5)
    y <- c(y, 12.5)
    type <- c(type, "yellow")
  }
}

data_ctree <- as.data.frame(cbind(x, y))
data_ctree <- cbind(data_ctree, type, stringsAsFactors = FALSE)

blaubes <- data_ctree %>% filter(type %in% blaubes_colors)
blaubes <- blaubes %>% 
   mutate(wish = sample(c("Merry christmas!", "Happy New Year!", "All the best!"),
                        nrow(blaubes), replace = TRUE))
root <- data_ctree %>% filter(type == "#663300")
leaves <- data_ctree %>% filter(type == "green")
star <- data_ctree %>% filter(type == "yellow")
gifts <- data_ctree %>% filter(type == "gift")
gifts <- gifts %>% 
   mutate(gift = sample(c("Watch", "Gloves", "Board game", "Game Boy", "Pajamas", "Book", "Socks"),
                        nrow(gifts), replace = TRUE))

figure(title = "Christmas Tree", xlab = "", ylab = "", xlim = c(-2, 12),
       ylim = c(-1, 14)) %>%
   ly_points(x, y, data = root, color = type, size = 40, fill_alpha = 1, 
             glyph = 22) %>%
   ly_points(x, y, data = leaves, color = type, size = 80, fill_alpha = 1, 
            glyph = 24) %>%
   ly_points(x, y, data = blaubes, color = type, size = 20, fill_alpha = 1, 
             glyph = 21, hover = wish) %>%
   ly_points(x, y, data = star, color = type, size = 50, fill_alpha = 1, 
          glyph = 23) %>%
   ly_points(x, y, data = gifts[1:4, ], fill_color = gifts_color[3], size = 15, 
             fill_alpha = 1, glyph = 22, hover = gift) %>%
   ly_points(x, y, data = gifts[5:6, ], fill_color = gifts_color[1], size = 35, 
          fill_alpha = 1, glyph = 22, hover = gift) %>%
   ly_points(x, y, data = gifts[7:10, ], fill_color = gifts_color[2], size = 25, 
             fill_alpha = 1, glyph = 22, hover = gift)
   