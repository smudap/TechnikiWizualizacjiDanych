if (!require(SportsAnalytics)) {
  install.packages("SportsAnalytics")
}

if (!require(devtools)) {
  install.packages("devtools")
}

install_github('rCharts', 'ramnathv', ref = 'dev')

if (!require(plyr)) {
  install.packages("plyr")
}

if (!require(knitr)) {
  install.packages("knitr")
}

if (!require(scales)) {
  install.packages("scales")
}

if(!require(reshape2)){
  install.packages("reshape2");
}

if(!require(dplyr)){
  install.packages("dplyr");
}

if(!require(base64enc)){
  install.packages("base64enc");
}


#if (!require(archivist)) {
#  install.packages("archivist")
#}

#if (!require(tidyr)) {
#  install.packages("tidyr")
#}
#if (!require(DT)) {
#  install.packages("DT")
#}
#if(!require(ggrepel)){
#  install.packages("ggrepel");
#}
