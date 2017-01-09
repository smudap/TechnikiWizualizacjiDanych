#install.packages(eurostat)
library(eurostat)
library(ggplot2)

dat <- get_eurostat(id = "lfsa_ewpnig", time_format = "num")
#This produces a table:
  
table(head(dat))

# Convert into human readable labels
datl <- label_eurostat(dat)

#Unit column is redundant
datl$unit <- NULL

# Print the table
table(head(datl))


datl <- subset(datl, values!="NA")
datl <- datl[!grepl("European Union",datl$geo),]
datl <- datl[!grepl("Euro area",datl$geo),]

datl$frequenc = factor(datl$frequenc,levels=c("Never","Sometimes","Usually"),ordered=TRUE)
datl$geo = factor(datl$geo)
datl$sex = factor(datl$sex)
datl$time = factor(datl$time, ordered=TRUE)
datl$age = factor(datl$age)
datl$wstatus = factor(datl$wstatus)

sexLabels <- sort(levels(datl$sex))
ageLabels <- sort(levels(datl$age))
freqLables <- sort(levels(datl$frequenc))
wstatusLabels <- c(sort(levels(datl$wstatus)), "All")

unemployment <- get_eurostat(id = "tesem120", time_format = "num", type = "label")
unemployment <- unemployment[!grepl('European Union',unemployment$geo),]
unemployment <- unemployment[!grepl('Euro area',unemployment$geo),]
unemployment <- subset(unemployment, values!="NA")
unemployment$geo = factor(unemployment$geo)
unemployment$time = factor(unemployment$time, ordered=TRUE)

countriesMerged <- merge(datl, unemployment, by=c("geo","time"))
geoLabels <- droplevels(countriesMerged$geo)
geoLabels <- sort(levels(geoLabels))

ggplot(totalUsuallyCleanValuesYoung, aes(y=values, x=time))+ ylab("ilość [%]") + xlab("lata") + 
  geom_point(aes(colour = factor(geo)))+ geom_line(aes(colour = factor(geo))) + 
  geom_point(data = unemploymentCleanValues, aes(colour = "black")) + geom_line(data = unemploymentCleanValues, aes(colour = "black")) +
  ggtitle("Praca w nocy") + 
  facet_wrap(~geo)
