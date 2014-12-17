library("rms")
library("survival")

### 1

dane<-read.csv("C:\\Users\\Piotr\\Desktop\\PW\\biostata\\session5\\aidssi.csv")
head(dane)
dane[,3] <- ifelse(dane[,3]==0,0,1)
a <- survfit(Surv(time,status)~1,data=dane)
miniaturka(a)

### 2

nsclc <- read.dta("C:\\Users\\Piotr\\Desktop\\PW\\biostata\\session2\\nsclc_eng.dta")
a <- survfit(Surv(survtime,survind)~1,data=nsclc)
miniaturka(a)

### 3

dane=read.dta("C:\\Users\\Piotr\\Desktop\\PW\\biostata\\raport koncowy\\BreastFeeding.dta")
names(dane)[2]='stopind'
head(dane)
a <- survfit(Surv(feed,stopind)~1,data=dane)
miniaturka(a)
