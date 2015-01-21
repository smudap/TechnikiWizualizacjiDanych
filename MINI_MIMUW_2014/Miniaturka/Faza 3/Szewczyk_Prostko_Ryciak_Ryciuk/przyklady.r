library("rms")
library("survival")

### 1

dane<-read.csv("F:\\Norbert\\studia\\TWD\\TWD2\\TechnikiWizualizacjiDanych\\MINI_MIMUW_2014\\Miniaturka\\Faza 3\\Szewczyk_Prostko_Ryciak_Ryciuk\\aidssi.csv")
dane[,3] <- ifelse(dane[,3]==0,0,1)
a <- survfit(Surv(time,status)~1,data=dane)
miniaturka(a)

### 2

nsclc <- read.dta("F:\\Norbert\\studia\\TWD\\TWD2\\TechnikiWizualizacjiDanych\\MINI_MIMUW_2014\\Miniaturka\\Faza 3\\Szewczyk_Prostko_Ryciak_Ryciuk\\nsclc_eng.dta")
a <- survfit(Surv(survtime,survind)~1,data=nsclc)
miniaturka(a)

### 3

dane=read.dta("F:\\Norbert\\studia\\TWD\\TWD2\\TechnikiWizualizacjiDanych\\MINI_MIMUW_2014\\Miniaturka\\Faza 3\\Szewczyk_Prostko_Ryciak_Ryciuk\\BreastFeeding.dta")
names(dane)[2]='stopind'
a <- survfit(Surv(feed,stopind)~1,data=dane)
miniaturka(a)
