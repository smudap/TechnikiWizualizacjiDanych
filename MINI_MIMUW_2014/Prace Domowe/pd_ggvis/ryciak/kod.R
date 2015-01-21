con <- url("http://biecek.pl/MIMUW/PISAeurope.rda")
load(con)
library(dplyr)
library("ggvis")
pisa_priv_pub <- pisa %>% group_by(CNT,SC01Q01) %>% summarise(n=weighted.mean(PV1MATH, W_FSTUWT, na.rm = TRUE))
pisa_priv_pub <- pisa_priv_pub[!is.na(pisa_priv_pub[,2]),] 

pisa_priv_pub <- pisa_priv_pub %>% group_by(CNT) %>% summarise(roznica=diff(n)[1])
pisa_priv_pub <- pisa_priv_pub %>% arrange(roznica)

pisa_priv_pub %>%
  ggvis(x=~CNT, y =~roznica) %>%
  layer_bars(stack = FALSE) %>%
  add_axis("y",title="private - public") %>%
  add_axis("x",properties=axis_props(labels=list(angle=45,align="left"))) %>%
  add_axis("x", orient = "top", ticks = 0, title = "Difference in maths scores beetween private and public schools",
           properties = axis_props(
             axis = list(stroke = "white"),
             labels = list(fontSize = 0)))


