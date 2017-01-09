library(SportsAnalytics);

years <- c();

for (year in 0:16) {
  if (year < 10)
  {
    if (year < 9) {
      years = c(years, paste("0",year,"-","0",year+1, sep = ""));
    } else {
      years = c(years, paste("0",year,"-",year+1, sep = ""));
    }
  } else {
    years = c(years, paste(year,"-",year+1, sep = ""));
  }
}


dane = c();
for( year in years) {
  t = fetch_NBAPlayerStatistics(year);
  t$Year <- year;
  
  dane = rbind(dane, t);
}
remove(year)
remove(t)

dane[dane$Team == 'NY',]$Team = 'NYK'
dane[dane$Team == 'CLI',]$Team = 'LAC'
dane[dane$Team == 'GOL',]$Team = 'GSW'
dane[dane$Team == 'NJN',]$Team = 'BRO'
dane[dane$Team == 'OKL',]$Team = 'OKC'
dane[dane$Team == 'SEA',]$Team = 'OKC'
dane[dane$Team == 'NO',]$Team = 'CBA'


dane$Year <- as.factor(dane$Year)

dane <- dane[dane$Team !='VAN' & dane$Team !='NA',]

dane = dane[order(dane$Year, dane$Team),]
