if (!require(devtools)) {
  install.packages("devtools")
  require(devtools)
}

if (!require(archivist)) {
  install.packages("archivist")
}
if (!require(knitr)) {
  install.packages("knitr")
}
if (!require(sejmRP)) {
  install_github("mi2-warsaw/sejmRP/sejmRP")
  install.packages("sejmRP")
}
if (!require(tidyr)) {
  install.packages("tidyr")
}
if (!require(DT)) {
  install.packages("DT")
}
if(!require(ggrepel)){
  install.packages("ggrepel");
}
if(!require(reshape2)){
  install.packages("reshape2");
}
