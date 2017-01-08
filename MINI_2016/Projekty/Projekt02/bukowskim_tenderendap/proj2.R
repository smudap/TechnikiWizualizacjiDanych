source("install.R")
source("functions.R")
source("tworzenie_danych.R")

#X = dane[dane$Name == 'Rashad Vaughn',]
#Y = dane[dane$Team == 'CHI',]

library(rCharts)
library(plyr)
library(dplyr)
library(knitr)
library(reshape2)
library(scales)
knitr::opts_chunk$set(comment = NA, results = 'asis', tidy = F, message = F)

options(
  rcharts.mode = 'iframesrc', 
  rcharts.cdn = FALSE,
  RCHART_WIDTH = 1300,
  RCHART_HEIGHT = 600
)

defence = subset(dane, select= c("Name", "Team", "Position", "Year", "Steals", "TotalRebounds", "OffensiveRebounds", "Blocks"))
defence$DefenceInd = defence$Steals + defence$TotalRebound + defence$Blocks - defence$OffensiveRebounds
defence = subset(defence, select= c("Name", "Team", "Position", "Year", "DefenceInd"))
defence = aggregate(defence$DefenceInd, by=list(Team=defence$Team, Year = defence$Year), FUN=sum)
colnames(defence)[3] = 'DefenceInd'

d = subset(dane, select= c("Name", "Team", "Position", "Year", "TotalPoints"))
d = aggregate(d$TotalPoints, by=list(Team=d$Team, Year = d$Year), FUN=sum)
colnames(d)[3] = 'TotalPoints'

uniqueTeams = unique(d$Team)
yearsToCheck = c("15-16", "14-15", "13-14", "12-13", "11-12")

for(i in 1:length(uniqueTeams)) {
  for (j in 1:length(yearsToCheck)) {
    if (nrow(d[d$Team == uniqueTeams[i] & d$Year == yearsToCheck[j],]) == 0) {
      d = rbind(d, data.frame(Team = uniqueTeams[i], Year = yearsToCheck[j], TotalPoints = 0))
    }
  }
}
d = d[order(d$Year, d$Team),]


# 1. wykres ---------------------------------------------------------------
d1 = subset(d, d$Year %in% yearsToCheck)

p1 = nPlot(TotalPoints ~ Team,
           data = d1, 
           group = 'Year',
           type = 'multiBarHorizontalChart')
#multiBarHorizontalChart

#p1$xAxis(rotateLabels=-90)
#p1$chart(reduceXTicks=FALSE)
save_nplot_with_custom_scripts_to_file('w1.html', p1, "Sumaryczna liczba zdobyczy punktowych zebrana przez kluby w sezonach od 2011 do 2016")


# 2. wykres ---------------------------------------------------------------
t1 = aggregate(d$TotalPoints, by=list(Team=d$Team), FUN=sum)
bestTeams = unique(t1[order(t1$x, decreasing = TRUE),][1:10,]$Team)

d2 = d %>%
  filter(Team %in% bestTeams) %>%
  mutate(Year=as.numeric(gsub(Year, pattern="(\\d+)-0?(\\d+)", replacement="\\2")))

p2 = nPlot(TotalPoints ~ Year,
           data = d2,
           group = 'Team',
           type = 'lineWithFocusChart')

p2$chart(useInteractiveGuideline=TRUE)

p2$xAxis(
  tickValues = "#! function (x) {    
    tickvalues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        return tickvalues;
        } !#", 
  tickFormat = "#! function (x) {
        tickformat = ['00-01', '01-02', '02-03', '03-04', '04-05', 
        '05-06', '06-07', '07-08', '08-09', '09-10', '10-11', 
        '11-12', '12-13', '13-14', '14-15', '15-16', '16-17'];
        return tickformat[x-1];
        } !#")

p2$x2Axis(
  tickValues = "#! function (x) {    
    tickvalues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
         return tickvalues;
         } !#", 
  tickFormat = "#! function (x) {
         tickformat = ['00-01', '01-02', '02-03', '03-04', '04-05', 
         '05-06', '06-07', '07-08', '08-09', '09-10', '10-11', 
         '11-12', '12-13', '13-14', '14-15', '15-16', '16-17'];
         return tickformat[x-1];
         } !#")

save_nplot_with_custom_scripts_to_file('w2.html', p2, "Rozkład zdobyczy punktowych 10ciu najlepszych drużyn w sezonach od roku 2000")

# 3. wykres ---------------------------------------------------------------
t1 = aggregate(defence$DefenceInd, by=list(Team=defence$Team), FUN=sum)
bestTeams = unique(t1[order(t1$x, decreasing = TRUE),][1:10,]$Team)

d3 = defence %>%
  filter(Team %in% bestTeams) %>%
  mutate(Year=as.numeric(gsub(Year, pattern="(\\d+)-0?(\\d+)", replacement="\\2")))

p3 = nPlot(DefenceInd ~ Year,
           data = d3,
           group = 'Team',
           type = 'lineWithFocusChart')

p3$chart(useInteractiveGuideline=TRUE)

p3$xAxis(
  tickValues = "#! function (x) {    
  tickvalues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  return tickvalues;
  } !#", 
  tickFormat = "#! function (x) {
        tickformat = ['00-01', '01-02', '02-03', '03-04', '04-05', 
        '05-06', '06-07', '07-08', '08-09', '09-10', '10-11', 
        '11-12', '12-13', '13-14', '14-15', '15-16', '16-17'];
        return tickformat[x-1];
        } !#")

p3$x2Axis(
  tickValues = "#! function (x) {    
    tickvalues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
         return tickvalues;
         } !#", 
  tickFormat = "#! function (x) {
         tickformat = ['00-01', '01-02', '02-03', '03-04', '04-05', 
         '05-06', '06-07', '07-08', '08-09', '09-10', '10-11', 
         '11-12', '12-13', '13-14', '14-15', '15-16', '16-17'];
         return tickformat[x-1];
         } !#")

save_nplot_with_custom_scripts_to_file('w3.html', p3, "Rozkład siły defensywnej 10ciu najlepszych drużyn w sezonach od roku 2000")

# 4. wykres ---------------------------------------------------------------
efficiency = dane;
efficiency$Eff = (dane$TotalPoints + dane$Steals + dane$TotalRebound + dane$Assists + dane$Blocks - dane$Turnovers - (dane$FieldGoalsAttempted - dane$FieldGoalsMade) - (dane$FreeThrowsMade - dane$FreeThrowsMade))/dane$GamesPlayed
efficiency = efficiency[efficiency$Year == '16-17',]
efficiency = subset(efficiency, select= c("Name", "Team", "Position", "Year", "Eff"))

efficiency2 = aggregate(efficiency$Eff, by=list(Team=efficiency$Team), FUN=max)
colnames(efficiency2)[2] = 'Eff'

efficiency = merge(efficiency, efficiency2)

efficiency = subset(efficiency, select= c("Name", "Team", "Position", "Eff"))
write.table(efficiency, file='data.tsv', quote=FALSE, sep='\t', col.names = NA )