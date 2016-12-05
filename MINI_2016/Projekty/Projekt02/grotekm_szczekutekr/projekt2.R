install.packages(eurostat)
library(eurostat)
library(ggplot2)
query <- search_eurostat("road accidents", type = "table")

dat <- get_eurostat(id = "lfsa_ewpnig", time_format = "num")
#This produces a table:
  
#print(xtable(head(dat), label = "tab:getdatatable"))
table(head(dat))


# Convert into human readable labels
datl <- label_eurostat(dat)

# Print the table
#print(xtable(head(datl), label = "tab:getdatatable2"))
table(head(datl))

total <- subset(datl, sex=="Total")
totalUsually <- subset(total, frequenc=="Usually")
totalUsuallyClean <- totalUsually[!grepl('European Union',totalUsually$geo),]
totalUsuallyClean2 <- totalUsuallyClean[!grepl('Euro area',totalUsuallyClean$geo),]
totalUsuallyCleanValues <- subset(totalUsuallyClean2, values!="NA")
totalUsuallyCleanValuesYoung <- subset(totalUsuallyCleanValues, age=="From 15 to 19 years")

unemployment <- get_eurostat(id = "tesem120", time_format = "num", type = "label")
unemploymentClean <- unemployment[!grepl('European Union',unemployment$geo),]
unemploymentClean2 <- unemploymentClean[!grepl('Euro area',unemploymentClean$geo),]
unemploymentCleanValues <- subset(unemploymentClean2, values!="NA")

ggplot(totalUsuallyCleanValuesYoung, aes(y=values, x=time))+ ylab("ilość [%]") + xlab("lata") + 
  geom_point(aes(colour = factor(geo)))+ geom_line(aes(colour = factor(geo))) + 
  geom_point(data = unemploymentCleanValues, aes(colour = "black")) + geom_line(data = unemploymentCleanValues, aes(colour = "black")) +
  ggtitle("Praca w nocy") + 
  facet_wrap(~geo)
