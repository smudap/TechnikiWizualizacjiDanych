setwd("/Users/pbiecek/GitHub/TechnikiWizualizacjiDanych/MINI_MIMUW_2014/materialy_z_wykladow_i_lab/rCharts")
install.packages("devtools")  # so we can install from GitHub
devtools::install_github("ropensci/plotly")  # plotly is part of rOpenSci

library(plotly)

set_credentials_file(username = "przemyslaw.biecek", api_key = "")


# http://www.mortality.org/Public/ExplanatoryNotes.php#CompleteDataSeries

kobiety <- read.table("fltper_1x1.txt", skip=2, header=T) 
mezczyzni <- read.table("mltper_1x1.txt", skip=2, header=T) 

kobiety2 <- kobiety %>% 
  filter(Year %in% c(1958, 2005)) %>%
  mutate(Age = as.numeric(as.character(Age)),
         Gender = "F",
         Year=factor(Year))

mezczyzni2 <- mezczyzni %>% 
  filter(Year %in% c(1958, 2005)) %>%
  mutate(Age = as.numeric(as.character(Age)),
         Gender = "M",
         Year=factor(Year))

kobiety2mezczyzni <- kobiety2
kobiety2mezczyzni$qx <- kobiety2mezczyzni$qx / mezczyzni2$qx
kobiety2mezczyzni$Gender <- "F/M"

km2 <- rbind(kobiety2, mezczyzni2)

g1 <- ggplot(km2, aes(Age, qx, color=Year, group=Year)) + 
  geom_line(size=2) + geom_point() + 
  scale_y_continuous(trans="log10", breaks=c(0.0001,0.001,0.01,0.1,1), limits=c(0.0001,1)) +
  ylab("Prawdopodobieństwo zgonu w wieku x") + xlab("Wiek") + facet_wrap(~Gender)

g2 <- ggplot(kobiety2mezczyzni, aes(Age, qx, color=Year, group=Year)) + 
  geom_line(size=2) + geom_point() + 
  ylab("Prawdopodobieństwo zgonu w wieku x") + xlab("Wiek")

g1
g2

g3 <- ggplot(kobiety2, aes(x=Age, y=dx, color=Year, fill=Year)) + 
  geom_histogram(stat="identity", position = "dodge") +
  ylab("Zgonów na rok") + xlab("Wiek")

g3

kobiety30 <- kobiety %>% 
  filter(Age == 30)

g4 <- ggplot(kobiety30, aes(x=Year, y=30 + ex)) + 
  geom_point() + geom_smooth(method="lm", se=FALSE)+
  ylab("Oczekiwana długość życia 30 latki ") + xlab("Rok")

g4



c("h", "h", "s", "5", "j", "u", "1", "i", "i", "z") %>%
  rev() %>%
  paste(collapse="")


