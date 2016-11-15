
#### load tables ####

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

#### make table with names #### 

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
  deputy <- cbind(deputy,  deputies[i,])
  
  return(deputy)
}

deputies_altname <- unique(statements$surname_name)
deputies_updated <- do.call("rbind", lapply(deputies_altname, statements_match_deputies_ids, deputies = deputies))

#### dcast votings table ####

votes_spread <- dcast.data.table(as.data.table(votes), id_voting+club~vote)
colnames(votes_spread)[5] <- 'Wstrzymal_sie'

przeciw <- function(x,y,z){
  apply(cbind(x,y,z), MARGIN = 1, FUN = function(x) return(sum(x) - max(x)))
}
votes_spread[, przeciw_klubowi := przeciw(Za, Przeciw, Wstrzymal_sie)]

votes_sprzeciw_summary <- votes_spread[, .(sredni_sprzeciw = mean(przeciw_klubowi>0)), club]

sprzeciw_spread <- dcast.data.table(votes_spread, id_voting~club, value.var = "przeciw_klubowi")

#### czy partie narzucają swoim posłom jak głosować? ####

votes_spread[, niejednoglosnie := (przeciw_klubowi >= (Nieobecny + Przeciw + Wstrzymal_sie + Za)*0.05)]

niejednoglosnie_counts <- votes_spread[, .(count = .N), .(club, niejednoglosnie)]
niejednoglosnie_counts <- niejednoglosnie_counts[, .(niejednoglosnie, count = count/sum(count)), club]
# 
# ggplot(aes(x = club, fill = niejednoglosnie), data = na.omit(votes_spread[club!= "ED"])) +
#   geom_bar(position = "fill")  +
#   coord_flip()

kolory <- c("gold", "black", "lightblue3", "grey80", "blue2", "orange3", "green4", "red")

niejednoglosnie_counts %>%
  spread(niejednoglosnie, count, fill = 0) %>%
  arrange(`FALSE`) %>%
  filter(!(club %in% c("ED", "niez."))) -> dane_plot
  
jednomyslnosc_plot <- ggplot(dane_plot, aes(x = club, fill = club)) +
  geom_bar(aes( y = `FALSE` + `TRUE`, alpha = "Niejednomyślnie", fill = club), stat = "identity") +
  geom_bar(aes( y = `FALSE`, alpha = "Jednomyślnie", fill = club), stat = "identity") + 
  scale_fill_manual(name="", values = kolory[c(2,3,5,6,7,8)], guide = "none") +
  scale_alpha_manual(name="", values = c(0.7, 0.3)) +
  scale_x_discrete(limits = dane_plot$club)+
  theme_bw(base_size = 16) +
  xlab("Partia") +
  ylab("Odestek nieobecności") +
  ggtitle("Jednomyślność głosowań partii")+
  scale_y_continuous(labels=percent) +
  theme(text = element_text( face="bold"),
        axis.line = element_line(colour = "black"),
        panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(),
        axis.title = element_blank(),
        panel.background = element_blank(),
        plot.title = element_text(hjust = 0))




#### czy kukiz 15' jest 'marionetką' PiSu


club_votes <- as.data.table(votes)[ , .(vote = names(sort(table(vote), decreasing = TRUE))[1]), .(id_voting, club)]
club_votes <- dcast.data.table(club_votes, id_voting~club, value.var = "vote")

club_votes[, kukiz_pis := Kukiz15 == PiS]
club_votes[, n_po := N == PO]

clubs_ordered <- rev(colnames(club_votes)[2:9])[c(1,2,3,7,4,5,6,8)]


## Wersja skośna
#
heatmap_table <- data.table()

for(i in 1:8){
  name <-clubs_ordered[i]
  tmp <- data.table(club1 = rep(name, times = 8-i+1), club2 = clubs_ordered[i:8])
  perc <- numeric(8-i+1)
  for(j in i:8){
    name2 <- clubs_ordered[j]
    perc[j-i+1] = mean(club_votes[,name, with = FALSE] == club_votes[,name2, with = FALSE], na.rm = T)
  }
  tmp[, perc := perc]
  print(tmp)
  heatmap_table <- rbind(heatmap_table, tmp)
}

none <- element_blank()


heatmap_table %>%
  ggplot(aes(club1, club2)) +
  geom_tile(aes(fill = perc), colour = "#ebebeb") +
  geom_text(aes(label = round(perc, digits = 2))) +
  scale_fill_gradient(name = "Odsetek", low = "white", high = "steelblue") +
  scale_x_discrete(limits = clubs_ordered) +
  scale_y_discrete(limits = rev(clubs_ordered)) + 
  theme_bw() +
  theme(text = element_text( face="bold"),
        axis.ticks = element_blank(),
        axis.title = element_blank(),
        panel.grid = element_blank(),
        plot.title = element_text(hjust = 0)) +
  guides(fill = guide_legend(title.hjust = 0.5)) +
  ggtitle("Odsetek zgodnych głosowań między partiami")


## wersja pełna

heatmap_table <- data.table()

for(i in 1:8){
  name <-clubs_ordered[i]
  tmp <- data.table(club1 = rep(name, times = 8), club2 = clubs_ordered[1:8])
  perc <- numeric(8)
  for(j in 1:8){
    name2 <- clubs_ordered[j]
    perc[j] = mean(club_votes[,name, with = FALSE] == club_votes[,name2, with = FALSE], na.rm = T)
  }
  tmp[, perc := perc]
  print(tmp)
  heatmap_table <- rbind(heatmap_table, tmp)
}

none <- element_blank()

heatmapa <- heatmap_table %>%
  ggplot(aes(club1, club2)) +
  geom_tile(aes(fill = perc), colour = "#ebebeb") +
  geom_text(aes(label = percent(perc))) +
  scale_fill_gradient(labels = percent, name = "Odsetek", low = "white", high = "steelblue") +
  scale_x_discrete(limits = clubs_ordered) +
  scale_y_discrete(limits = rev(clubs_ordered)) + 
  theme_minimal() +
  coord_fixed() +
  theme(text = element_text( face="bold"),
        axis.ticks = element_blank(),
        axis.title = element_blank(),
        panel.grid = element_blank(),
        plot.title = element_text(hjust = 0),
        legend.position = "none") +
  guides(fill = guide_legend(title.hjust = 0.5)) +
  ggtitle("Odsetek zgodnych głosowań między partiami")



#### nieobecności itp ####
kolory <- c("gold", "black", "lightblue3", "grey80", "blue2", "orange3", "green4", "red")

votes %>%
  group_by(club) %>%
  summarise(srednia_nieobecnosc = mean(vote == "Nieobecny"),
            srednia_wstrzymanie = mean(vote == "Wstrzymał się"),
            srednia_za = mean(vote == "Za"),
            srednia_przeciw = mean(vote == "Przeciw"))

votes %>%
  group_by(id_deputy, club) %>%
  summarise(srednia_nieobecnosc = mean(vote == "Nieobecny"),
            srednia_wstrzymanie = mean(vote == "Wstrzymał się"),
            srednia_za = mean(vote == "Za"),
            srednia_przeciw = mean(vote == "Przeciw")) %>%
  arrange(-srednia_nieobecnosc) %>%
  left_join(deputies) %>% 
  select(surname_name, srednia_nieobecnosc, club) -> nieobecnosci

nieobecnosci_max <- nieobecnosci %>%
  filter(!(surname_name %in% c("Tomczykiewicz Tomasz", "Górski Artur"))) %>%
  group_by(club) %>%
  mutate(show = ifelse(srednia_nieobecnosc == max(srednia_nieobecnosc), stri_replace_all_fixed(surname_name, " ", "\n"), ""),
         val = ifelse(srednia_nieobecnosc == max(srednia_nieobecnosc), srednia_nieobecnosc, NA))

nieobecnosci_plot <-  ggplot(data = nieobecnosci_max, mapping = aes(srednia_nieobecnosc, x = club, fill = club)) +
  geom_jitter(data = filter(nieobecnosci_max, show == ""), width = 0.6, alpha = 0.5)+
  geom_point(data = filter(nieobecnosci_max, show != ""))+
  geom_boxplot(alpha = 0.5, outlier.shape = NA) +
  scale_fill_manual(name = "Klub", values = kolory) +
  scale_y_continuous(labels = percent, breaks = c(0,0.25,0.5,0.75,1)) +
  theme_bw(base_size = 16) +
  xlab("Partia") +
  ylab("Odestek nieobecności") +
  ggtitle("Rozkład nieobecności posłów")+
  theme(text = element_text( face="bold"),
        axis.ticks = element_blank(),
        axis.title = element_blank(),
        plot.title = element_text(hjust = 0),
        legend.position = "none")

#save(jednomyslnosc_plot, heatmapa, nieobecnosci_plot, file = "plots.RDA")
