# Autor: Patryk Tenderenda

# url: http://aswathdamodaran.blogspot.com/2014/10/go-pro-camera-or-smartphone-social.html
# wykres: http://2.bp.blogspot.com/-ApPcmfjxPJw/VD55hVDwz3I/AAAAAAAABks/nIGZAIdYtnU/s1600/ChangingMarket.jpg
# Udział kamer na rynku w roku 2012 i 2016

if(!require(ggplot2)){
  install.packages("ggplot2");
}
if(!require(ggrepel)){
  install.packages("ggrepel");
}
if(!require(reshape2)){
  install.packages("reshape2");
}
library(ggplot2)
library(ggrepel)
library(reshape2)


dane <- data.frame(urzadzenie = c("Digital Cameras (all)", "Smartphones", "Tablets/PC",
                              "Medical/Industrial", "Security", "Automotive", "Other"),
                   r2012 = c(47, 25, 6,  11, 8, 0, 3),
                   r2016 = c(27, 30, 12, 13, 11, 3, 3)
                   )

dane$urzadzenie <- reorder(dane$urzadzenie, dane$r2012)
dane<-melt(dane)
dane$variable <- factor(dane$variable, levels =c("r2016","r2012"))

cols <- c("r2012"="#a1d99b","r2016"="#31a354")
w <- ggplot(dane, aes(x = urzadzenie, width=.75, fill=variable, y=value)) + 
  geom_bar(stat="identity", position="dodge") +
  geom_text(aes(x=urzadzenie, y=value, ymax=value, label=sprintf("%.0f%%", value)),
            position = position_dodge(width = .75),
            hjust = -0.05)  + 
  scale_fill_manual(name="Rok",
                    limits = c("r2012", "r2016"),
                    values=cols, 
                    breaks=c("r2012", "r2016"), 
                    labels=c("2012","2016")) +
  scale_y_continuous(breaks = seq(0, 50, 5), limits=c(0, 50), expand=c(0,0)) +
  coord_flip() +
  labs(title = "Udziały urządzeń na rynku kamer", 
       x = element_blank(), 
       y = "Procent udziału [%]")

w