setwd("/Users/pbiecek/GitHub/TechnikiWizualizacjiDanych/MINI_MIMUW_2014/materialy_z_wykladow_i_lab/rCharts")

# http://www.mortality.org/Public/ExplanatoryNotes.php#CompleteDataSeries

kobiety <- read.table("fltper_1x1.txt", skip=2, header=T) 
mezczyzni <- read.table("mltper_1x1.txt", skip=2, header=T) 

kobiety2005 <- kobiety %>% 
  filter(Year == 2005) %>%
  mutate(Age = as.numeric(as.character(Age)))

ggplot(kobiety2005, aes(Age, qx)) + 
  geom_line() + 
  scale_y_continuous(trans="log10") +
  ylab("Prawdopodobieństwo zgonu w wieku x")

