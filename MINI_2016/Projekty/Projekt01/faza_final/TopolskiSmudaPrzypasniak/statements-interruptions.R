library("sejmRP")
library("dplyr")
library("stringi")
library("parallel")
library("ggplot2")
library("scales")
library("ggrepel")
library(gridExtra)
library(grid)

#### Obrobka danych ####

statements_match_deputies_ids <- function(deputy, deputies){
   stopifnot(is.character(deputy), is.data.frame(deputies))
   
   #extracting all words from deputy
   words <- unlist(stri_extract_all_words(deputy))
   
   #extracting all words for every deputy in deputies table
   deputies_words <- stri_extract_all_words(deputies[, 3])
   
   #finding correct deputy
   for(i in seq_len(length(deputies_words))){
      inter <- intersect(deputies_words[[i]],words)
      if(length(inter)==length(deputies_words[[i]])){
         which_one <- i
         break
      }
   }
   
   #picking correct deputy
   deputy <- deputies[i,]
   
   return(deputy)
}

# votes_all <- get_votes_table()
# votes <- votes_all %>% filter(nr_term_of_office == 8)
# votings_all <- get_votings_table()
# votings <- votings_all %>% filter(nr_term_of_office == 8)
# statements_all <- get_statements_table()
# statements <- statements_all %>% filter(nr_term_of_office == 8)
# deputies_all <- get_deputies_table() # bez argumentu host gdy poza MiNI
# deputies <- deputies_all %>% filter(nr_term_of_office == 8)
# save(deputies, votings, votes, statements, file = "tables.RDA")
load("tables.RDA")

statements_with_reaction <- statements[stri_detect_regex(statements$statement, "\\("),]
statements_with_reaction_copy <- statements_with_reaction

nr_cores <- detectCores()
cluster <- makeCluster(nr_cores - 1)
clusterExport(cluster, list("statements_with_reaction", "votes",
                            "statements_match_deputies_ids", "deputies"))
clusterEvalQ(cluster, library(sejmRP))
clusterEvalQ(cluster, library(dplyr))
clusterEvalQ(cluster, library(stringi))

statements_with_reaction$id_deputy <- parSapply(cluster, statements_with_reaction$surname_name,
                                                function(x){
                                                   x <- unlist(stri_extract_all_regex(x, "(?<=Pose. ).+"))
                                                   as.character(statements_match_deputies_ids(x, deputies)[1])
                                                })

statements_with_reaction$club <- parSapply(cluster, statements_with_reaction$id_deputy,
                                           function(x){
                                              votes_filtered <- votes %>% filter(id_deputy == x)
                                              which_one <- which.max(votes_filtered$id_voting)
                                              votes_filtered$club[which_one]
                                           })

stopCluster(cluster)

statements_reaction <- unlist(stri_extract_all_regex(statements_with_reaction$statement,
                                                     "\\([^\\)]+?\\)"))

interrupting_deputies_reaction_table <- statements_reaction[unlist(stri_detect_regex(statements_reaction,
                                                                                     "\\([Pp]ose.[^\\)]+?:"))]
interrupting_deputies_reaction_table <- unlist(stri_replace_all_regex(interrupting_deputies_reaction_table, "[\\n\\r]", ""))
interrupting_deputies_reaction_table <- do.call("rbind", stri_match_all_regex(interrupting_deputies_reaction_table,
                                                                              "\\((([Pp]ose. .+?): (.+?))\\)"))
interrupting_deputies_reaction_table <- as.data.frame(interrupting_deputies_reaction_table[, 2], stringsAsFactors = FALSE)
names(interrupting_deputies_reaction_table) <- c("Kto: co powiedział")

interrupting_deputies <- unlist(stri_extract_all_regex(statements_reaction,
                                                       "(?<=\\([Pp]ose. )[^\\)]+?(?=:)"))
interrupting_deputies <- interrupting_deputies[!is.na(interrupting_deputies)]
interrupting_deputies[which(interrupting_deputies == "Danuta Pietraszewska skanduje")] <- "Danuta Pietraszewska"
interrupting_deputies <- sort(table(interrupting_deputies), decreasing = TRUE)
interrupting_deputies_names <- names(interrupting_deputies)
interrupting_deputies <- as.numeric(interrupting_deputies)
interrupting_deputies <- data.frame(surname_name = interrupting_deputies_names,
                                    nr_of_interruptions = interrupting_deputies, stringsAsFactors = FALSE)

cluster <- makeCluster(nr_cores - 1)
clusterExport(cluster, list("interrupting_deputies", "votes",
                            "statements_match_deputies_ids", "deputies"))
clusterEvalQ(cluster, library(sejmRP))
clusterEvalQ(cluster, library(dplyr))
clusterEvalQ(cluster, library(stringi))

interrupting_deputies$id_deputy <- parSapply(cluster, interrupting_deputies$surname_name, function(x){
   as.character(statements_match_deputies_ids(x, deputies)[1])
})

interrupting_deputies$club <- parSapply(cluster, interrupting_deputies$id_deputy, function(x){
   votes_filtered <- votes %>% filter(id_deputy == x)
   which_one <- which.max(votes_filtered$id_voting)
   votes_filtered$club[which_one]
})

stopCluster(cluster)

clubs_names <- sort(unique(interrupting_deputies$club))
clubs_empty <- numeric(length(clubs_names))
names(clubs_empty) <- clubs_names

cluster <- makeCluster(nr_cores - 1)
clusterExport(cluster, list("statements_with_reaction", "votes",
                            "statements_match_deputies_ids", "deputies", "clubs_names", "clubs_empty",
                            "interrupting_deputies"))
clusterEvalQ(cluster, library(sejmRP))
clusterEvalQ(cluster, library(dplyr))
clusterEvalQ(cluster, library(stringi))

who_interrupt_list <- parLapply(cluster, statements_with_reaction$statement, function(x){
   deputies_who_interrupted <- unlist(stri_extract_all_regex(x, "(?<=\\([Pp]ose. )[^\\)]+?(?=:)"))
   n <- length(deputies_who_interrupted)
   if(n > 0 && !is.na(deputies_who_interrupted)){
      clubs_new <- clubs_empty
      for(i in 1:n){
         which_club <- interrupting_deputies %>%
            filter(surname_name == deputies_who_interrupted[i]) %>%
            select(club) %>%
            as.character()
         clubs_new[which_club] = clubs_new[which_club] + 1
      }
      return(clubs_new)
   } else {
      return(clubs_empty)
   }
})

stopCluster(cluster)

who_interrupt_list_skanduje <- who_interrupt_list[[3353]][-9]
who_interrupt_list_skanduje["PO"] <- who_interrupt_list_skanduje["PO"] + 1
who_interrupt_list[[3353]] <- who_interrupt_list_skanduje

who_interrupt_table <- do.call("rbind", who_interrupt_list)

statements_with_reaction <- cbind(statements_with_reaction, who_interrupt_table)

statements_with_reaction_sum <- statements_with_reaction %>% group_by(club) %>%
   summarise(ED_sum = sum(ED),
             Kukiz15_sum = sum(Kukiz15),
             N_sum = sum(N),
             niez._sum = sum(niez.),
             PiS_sum = sum(PiS),
             PO_sum = sum(PO),
             PSL_sum = sum(PSL),
             WiS_sum = sum(WiS))

statements_with_reaction_sum

#### Wykresy ####

multiplot <- function(..., plotlist=NULL, file, cols=1, layout=NULL) {
   library(grid)
   
   # Make a list from the ... arguments and plotlist
   plots <- c(list(...), plotlist)
   
   numPlots = length(plots)
   
   # If layout is NULL, then use 'cols' to determine layout
   if (is.null(layout)) {
      # Make the panel
      # ncol: Number of columns of plots
      # nrow: Number of rows needed, calculated from # of cols
      layout <- matrix(seq(1, cols * ceiling(numPlots/cols)),
                       ncol = cols, nrow = ceiling(numPlots/cols))
   }
   
   if (numPlots==1) {
      print(plots[[1]])
      
   } else {
      # Set up the page
      grid.newpage()
      pushViewport(viewport(layout = grid.layout(nrow(layout), ncol(layout))))
      
      # Make each plot, in the correct location
      for (i in 1:numPlots) {
         # Get the i,j matrix positions of the regions that contain this subplot
         matchidx <- as.data.frame(which(layout == i, arr.ind = TRUE))
         
         print(plots[[i]], vp = viewport(layout.pos.row = matchidx$row,
                                         layout.pos.col = matchidx$col))
      }
   }
}

grid_arrange_shared_legend <- function(...) {
  plots <- list(...)
  g <- ggplotGrob(plots[[1]] + theme(legend.position="bottom"))$grobs
  legend <- g[[which(sapply(g, function(x) x$name) == "guide-box")]]
  lheight <- sum(legend$height)
  grid.arrange(
    do.call(arrangeGrob, lapply(plots, function(x)
      x + theme(legend.position="none"))),
    legend,
    ncol = 1,
    heights = unit.c(unit(1, "npc") - lheight, lheight))
}

interrupting_deputies_summary <- interrupting_deputies %>% group_by(club) %>%
   summarise(interruptions = sum(nr_of_interruptions)) %>% 
   mutate(interruptions_percentage = 100 * interruptions / sum(interruptions))

interrupting_deputies_summary

# usuwamy WiS (Kolo Poselskie Wolni i Solidarni) i niezaleznych, bo malo przerywali i nie widac tego na wykresie
# Koło Poselskie Europejscy Demokraci (odeszli z PO): Huskowski Stanislaw, Kamiński Michał, Niesiołowski Stefan, Protasiewicz Jacek

interrupting_deputies_summary_up <- interrupting_deputies %>% group_by(club) %>%
   summarise(interruptions = sum(nr_of_interruptions)) %>% 
   filter(!(club %in% c("WiS", "niez."))) %>%
   mutate(interruptions_percentage = 100 * interruptions / sum(interruptions))

interrupting_deputies_summary_up

clubs <- interrupting_deputies_summary_up$club
percentage_texts = paste0(round(interrupting_deputies_summary_up$interruptions_percentage, 1), "%")
percentage_labels <- cumsum(interrupting_deputies_summary_up$interruptions_percentage) -
   interrupting_deputies_summary_up$interruptions_percentage/2
percentage_labels[6] <- percentage_labels[6] - 1
percentage_labels[1] <- percentage_labels[1] 
percentage_labels[2] <- percentage_labels[2] + 0.7
percentage_labels[3] <- percentage_labels[3] + 1.7


clubs_colors <-  c("gold", "firebrick2", "lightblue1", "royalblue", "darkorange", "limegreen")

kluby_przerywacze <- ggplot(interrupting_deputies_summary_up, aes(x = "", y = interruptions_percentage, fill = club)) +
   geom_bar(width = 1, stat = "identity", color = "black") + 
   coord_polar(theta = "y", start = 0) +
   scale_y_continuous(breaks = NULL) +
   scale_fill_manual(name = "Klub/Koło", labels = clubs, values = clubs_colors) +
   theme_minimal() +
   theme(text = element_text(size = 12, face="bold"),
         axis.ticks = element_blank(),
         axis.title = element_blank(),
         panel.border = element_blank(),
         panel.grid = element_blank(),
         plot.title = element_text(hjust = 0)) +
   ggtitle("Procentowy podział przerywania wypowiedzi\nprzez kluby") +
   geom_text(aes(x = 1.62, y = percentage_labels, label = percentage_texts), size = 3)

kluby_przerywacze

# scale_y_continuous(breaks = percentage_labels, labels = percentage_texts)

## Przerywanie kluby klubom

statements_with_reaction_sum_up <- statements_with_reaction_sum %>%
   filter(club %in% c("PiS", "PO", "N", "Kukiz15"))
statements_with_reaction_sum_up <- mutate(statements_with_reaction_sum_up, Lacznie = apply(statements_with_reaction_sum_up[,-1], 1, sum))

club <- stri_sub(names(statements_with_reaction_sum_up[,-c(1, 10)]), to = -5)
statements_pie_chart_data <- sapply(1:4, function(x){
   100 * as.numeric(statements_with_reaction_sum_up[x,-c(1, 10)]) / as.numeric(statements_with_reaction_sum_up[x, 10])
})
statements_pie_chart_data <- cbind(club, as.data.frame(statements_pie_chart_data))
for(i in 2:5){
   names(statements_pie_chart_data)[i] <- as.character(statements_with_reaction_sum_up[i-1,1])
}

colors <- c("gold", "firebrick2", "lightblue1", "grey", "royalblue", "darkorange", "limegreen", "white")

# Kukiz15

Kukiz15_pie_chart_data <- statements_pie_chart_data %>%
   filter(!(club %in% c("WiS", "niez.")))
statements_with_reaction_sum_up <- mutate(statements_with_reaction_sum_up, Lacznie = apply(statements_with_reaction_sum_up[,-1], 1, sum))

Kukiz15_percentage_texts = paste0(round(Kukiz15_pie_chart_data$Kukiz15, 1), "%")
Kukiz15_percentage_labels <- cumsum(Kukiz15_pie_chart_data$Kukiz15) - Kukiz15_pie_chart_data$Kukiz15/2

Kukiz15_percentage_labels[6] <- Kukiz15_percentage_labels[6] - 4
Kukiz15_percentage_labels[1] <- Kukiz15_percentage_labels[1] 
Kukiz15_percentage_labels[2] <- Kukiz15_percentage_labels[2] + 1.7
Kukiz15_percentage_labels[3] <- Kukiz15_percentage_labels[3] + 3

club <- Kukiz15_pie_chart_data$club
Kukiz15_colors <- colors[club]

Kukiz15_pie_chart <- ggplot(Kukiz15_pie_chart_data, aes(x = "", y = Kukiz15, fill = club))+
   geom_bar(width = 1, stat = "identity", color = "black") + 
   coord_polar(theta = "y", start = 0) +
   scale_y_continuous(breaks = NULL) +
   scale_fill_manual(name = "Klub/Koło", labels = club, values = Kukiz15_colors) +
   theme_minimal() +
   theme(text = element_text(size = 12, face="bold"),
         axis.ticks = element_blank(),
         axis.title = element_blank(),
         panel.border = element_blank(),
         panel.grid = element_blank(),
         plot.title = element_text(hjust = 0)) +
   ggtitle("Kukiz15") +
   geom_text(aes(x = 1.75, y = Kukiz15_percentage_labels, label = Kukiz15_percentage_texts), size = 3)

Kukiz15_pie_chart

# Nowoczesna

N_pie_chart_data <- statements_pie_chart_data %>%
   filter(!(club %in% c("WiS", "niez.", "ED"))) 
statements_with_reaction_sum_up <- mutate(statements_with_reaction_sum_up, Lacznie = apply(statements_with_reaction_sum_up[,-1], 1, sum))

N_percentage_texts = paste0(round(N_pie_chart_data$N, 1), "%")
N_percentage_labels <- cumsum(N_pie_chart_data$N) - N_pie_chart_data$N/2

club <- N_pie_chart_data$club
N_colors <- colors[club]

N_percentage_labels[5] <- N_percentage_labels[5] - 2.2
N_percentage_labels[2] <- N_percentage_labels[2] +1.3

N_pie_chart <- ggplot(N_pie_chart_data, aes(x = "", y = N, fill = club)) +
   geom_bar(width = 1, stat = "identity", color = "black") + 
   coord_polar(theta = "y", start = 0) +
   scale_y_continuous(breaks = NULL) +
   scale_fill_manual(name = "Klub/Koło", labels = club, values = N_colors) +
   theme_minimal() +
   theme(text = element_text(size = 12, face="bold"),
         axis.ticks = element_blank(),
         axis.title = element_blank(),
         panel.border = element_blank(),
         panel.grid = element_blank(),
         plot.title = element_text(hjust = 0)) +
   ggtitle("Nowoczesna") +
   geom_text(aes(x = 1.70, y = N_percentage_labels, label = N_percentage_texts), size = 3)

N_pie_chart

# Prawo i Sprawiedliwosc

PiS_pie_chart_data <- statements_pie_chart_data %>%
   filter(!(club %in% c("WiS", "niez.")))
statements_with_reaction_sum_up <- mutate(statements_with_reaction_sum_up, Lacznie = apply(statements_with_reaction_sum_up[,-1], 1, sum))

PiS_percentage_texts = paste0(round(PiS_pie_chart_data$PiS, 1), "%")
PiS_percentage_labels <- cumsum(PiS_pie_chart_data$PiS) - PiS_pie_chart_data$PiS/2

club <- PiS_pie_chart_data$club
PiS_colors <- colors[club]

PiS_percentage_labels[2] <- PiS_percentage_labels[2] + 1.5
PiS_percentage_labels[1] <- PiS_percentage_labels[1] - 1.5
PiS_percentage_labels[3] <- PiS_percentage_labels[3] + 4
PiS_percentage_labels[6] <- PiS_percentage_labels[6] - 4.5

PiS_pie_chart <- ggplot(PiS_pie_chart_data, aes(x = "", y = PiS, fill = club)) +
   geom_bar(width = 1, stat = "identity", color = "black") + 
   coord_polar(theta = "y", start = 0) +
   scale_y_continuous(breaks = NULL) +
   scale_fill_manual(name = "Klub/Koło", labels = club, values = PiS_colors) +
   theme_minimal() +
   theme(text = element_text(size = 12, face="bold"),
         axis.ticks = element_blank(),
         axis.title = element_blank(),
         panel.border = element_blank(),
         panel.grid = element_blank(),
         plot.title = element_text(hjust = 0)) +
   ggtitle("PiS") +
   geom_text(aes(x = 1.73, y = PiS_percentage_labels, label = PiS_percentage_texts), size = 3)

PiS_pie_chart

# Platforma Obywatelska

PO_pie_chart_data <- statements_pie_chart_data %>%
   filter(!(club %in% c("WiS", "niez.", "PSL","ED"))) 
statements_with_reaction_sum_up <- mutate(statements_with_reaction_sum_up, Lacznie = apply(statements_with_reaction_sum_up[,-1], 1, sum))
PO_pie_chart_data$PO <- 100*PO_pie_chart_data$PO/sum(PO_pie_chart_data$PO)

PO_percentage_texts = paste0(round(PO_pie_chart_data$PO, 1), "%")
PO_percentage_labels <- cumsum(PO_pie_chart_data$PO) - PO_pie_chart_data$PO/2

PO_percentage_labels[2] <- PO_percentage_labels[2] + 3.4
PO_percentage_labels[1] <- PO_percentage_labels[1] - 0.1

club <- PO_pie_chart_data$club
PO_colors <- colors[club]

PO_pie_chart <- ggplot(PO_pie_chart_data, aes(x = "", y = PO, fill = club)) +
   geom_bar(width = 1, stat = "identity", color = "black") + 
   coord_polar(theta = "y", start = 0) +
   scale_y_continuous(breaks = NULL) +
   scale_fill_manual(name = "Klub/Koło", labels = club, values = PO_colors) +
   theme_minimal() +
   theme(text = element_text(size = 12, face="bold"),
         axis.ticks = element_blank(),
         axis.title = element_blank(),
         panel.border = element_blank(),
         panel.grid = element_blank(),
         plot.title = element_text(hjust = 0)) +
   ggtitle("PO") +
   geom_text(aes(x = 1.70, y = PO_percentage_labels, label = PO_percentage_texts), size = 3)

PO_pie_chart

grid_arrange_shared_legend <- function(..., ncol = length(list(...)), nrow = 1, position = c("bottom", "right")) {
  
  plots <- list(...)
  position <- match.arg(position)
  g <- ggplotGrob(plots[[1]] + theme(legend.position = position))$grobs
  legend <- g[[which(sapply(g, function(x) x$name) == "guide-box")]]
  lheight <- sum(legend$height)
  lwidth <- sum(legend$width)
  gl <- lapply(plots, function(x) x + theme(legend.position="none"))
  gl <- c(gl, ncol = ncol, nrow = nrow)
  
  combined <- switch(position,
                     "bottom" = arrangeGrob(do.call(arrangeGrob, gl),
                                            legend,
                                            ncol = 1,
                                            heights = unit.c(unit(1, "npc") - lheight, lheight)),
                     "right" = arrangeGrob(do.call(arrangeGrob, gl),
                                           legend,
                                           ncol = 2,
                                           widths = unit.c(unit(1, "npc") - lwidth, lwidth)))
  grid.newpage()
  grid.draw(combined)
  
}

multiplot(Kukiz15_pie_chart, N_pie_chart, PiS_pie_chart, PO_pie_chart, cols = 2)

grid_arrange_shared_legend(Kukiz15_pie_chart, N_pie_chart, PiS_pie_chart, PO_pie_chart, ncol = 2, nrow = 2, position = "right")
######## Wykres mozaikowy ########

library("plyr")
library("reshape")

interrupting_deputies_summary_up
nasz <- interrupting_deputies_summary_up$interruptions[c(2:5)]
suma<-sum(nasz)
proc<-c(nasz[1]/suma, nasz[2]/suma, nasz[3]/suma, nasz[4]/suma)

#w wykresie mozaikowym dla każdej z 4 partii roważamy 6 partii, dlatego trzeba zmodyfikować dane:
PO_pie_chart_data2 <- statements_pie_chart_data %>%
   filter(!(club %in% c("WiS", "niez.")))
statements_with_reaction_sum_up <- mutate(statements_with_reaction_sum_up, Lacznie = apply(statements_with_reaction_sum_up[,-1], 1, sum))


N_pie_chart_data2 <- statements_pie_chart_data %>%
   filter(!(club %in% c("WiS", "niez."))) # do kołowego wywalić jeszcze ED
statements_with_reaction_sum_up <- mutate(statements_with_reaction_sum_up, Lacznie = apply(statements_with_reaction_sum_up[,-1], 1, sum))


segpct <- sort(proc, decreasing = TRUE) # PiS PO Kukiz15 N

dane <- matrix(c(PiS_pie_chart_data$PiS, PO_pie_chart_data2$PO, Kukiz15_pie_chart_data$Kukiz15, N_pie_chart_data2$N), ncol=4)
ED=dane[1,]
Kukiz15=dane[2,]
N=dane[3,]
PiS=dane[4,]
PO=dane[5,]
PSL=dane[6,]  

df <- data.frame(segment=c("Prawo i Sprawiedliwość","Platforma Obywatelska","Kukiz15","N"),segpct,
                 PO,PiS,N,Kukiz15,ED,PSL)

df$xmax <- cumsum(df$segpct)
df$xmin <- df$xmax - df$segpct
df$segpct <- NULL

head(df)

dfm <- melt(df, id = c("segment", "xmin", "xmax"))
head(dfm)


dfm1 <- ddply(dfm, .(segment), transform, ymax = cumsum(value))
dfm1 <- ddply(dfm1, .(segment), transform, ymin = ymax - value)
colors2<-c("darkorange","royalblue","lightblue1","firebrick2","gold","limegreen")

dfm1$value <- 10*dfm1$value
dfm1$value <- sapply(dfm1$value, round)
dfm1$value <- dfm1$value/10

dfm1$xtext <- with(dfm1, xmin + (xmax - xmin)/2)
dfm1$xtext <- ifelse(dfm1$xtext<0.96,dfm1$xtext,dfm1$xtext+0.003)
dfm1$ytext <- with(dfm1, ymin + (ymax - ymin)/2)

p <- ggplot(dfm1, aes(ymin = ymin, ymax = ymax,
                      xmin = xmin, xmax = xmax, fill = variable))
p1 <- p + geom_rect(colour = I("grey"))
p2 <- p1 + geom_text(aes(x = xtext, y = ytext,
                         label = ifelse(value>5, paste(value,
                                                       "%", sep = ""), paste(""))), size = 5)

p3 <- p2 +  ggtitle("Kto komu przerywa?") +
   geom_text(aes(x = xtext, y = 103,label = paste(segment)), size = 3.5) +
   scale_fill_manual(name = "Klub/Koło", labels = c('PO','PiS','N','Kukiz15','ED','PSL'),values = colors2) +
   labs(x = NULL, y = NULL, fill = NULL) +
   theme_minimal() +
   theme(text = element_text( face="bold"), plot.title = element_text(hjust = 0))

p3