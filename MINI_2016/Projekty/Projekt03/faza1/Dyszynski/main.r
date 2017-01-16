library(dplyr)
library(ggplot2)
script.dir <- dirname(sys.frame(1)$ofile)[[1]]
okwest = as.data.frame(read.csv(paste(script.dir, "dane_kwestionariuszowe.csv", sep="/"), fileEncoding = "UTF-8"))
obser = as.data.frame(read.csv(paste(script.dir, "dane_obserwacyjne.csv", sep="/"), fileEncoding = "UTF-8"))

#kwest = okwest[which(okwest$Plec==1),]
kwest = okwest

kwest["s"] = (kwest["oceM"] - 1 + kwest["oceP"] - 1) / (2 * kwest["oceJP"] - 2)
kwest["oceW"] = kwest["oceM"] + kwest["oceP"] + kwest["oceJP"]

obs_times = obser %>% 
  #group_by(ID, expot) %>% 
  group_by_(.dots=names(.)[c(2, 4)]) %>%
  summarise(czas_w_sek = sum(czas_w_sek))

ggplot(data = kwest, aes(s)) + geom_histogram(binwidth = 0.1)

ggplot(data=obs_times, aes(czas_w_sek)) + geom_histogram(binwidth = 0.1) + scale_x_log10()

obs_times_sum = obs_times %>%
  group_by(ID) %>%
  summarise(czas_w_sek = sum(czas_w_sek))
obs_times_s = merge(obs_times_sum, kwest[, c("ID", "s")], by="ID")

cfs = coef(lm(czas_w_sek ~ s, data = obs_times_s))
ggplot(obs_times_s, aes(x = s, y = czas_w_sek)) + geom_point() + geom_abline(intercept = cfs[1], slope = cfs[2])

obs_times_total = obs_times %>%
  group_by(ekspot) %>%
  summarise(czas_w_sek = sum(czas_w_sek))

ggplot(data=obs_times_total, aes(czas_w_sek)) + geom_histogram(binwidth = 0.1) + scale_x_log10()