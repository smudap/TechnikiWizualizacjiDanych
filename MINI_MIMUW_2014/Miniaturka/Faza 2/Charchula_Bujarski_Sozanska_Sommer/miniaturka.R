#################### funkcja ################################

miniaturka <- function(pel){

library("ggplot2")
library("stringi")
library("reshape2")
library("scales")
   
nobs <- length(pel$residuals)
form <- pel$call
ff <- stri_extract_all_regex(as.character(pel$call)[2],"^(.+)[~]")[[1]]
pus <- lm(paste(ff,1),data=pel$model)

fa <- step(pus,direction="forward",scope=list(lower=~1,upper=pel), 
           trace=0)
fb <- step(pus,direction="forward",scope=list(lower=~1,upper=pel)
           , k=log(nobs), trace=0)
ba <- step(pel,direction="backward", trace=0)
bb <- step(pel,direction="backward", k=log(nobs), trace=0)

r <- c(summary(pel)$r.squared, summary(fa)$r.squared,
       summary(fb)$r.squared, summary(ba)$r.squared,
       summary(bb)$r.squared)*100
r_adj <- c(summary(pel)$adj.r.squared, summary(fa)$adj.r.squared,
           summary(fb)$adj.r.squared, summary(ba)$adj.r.squared,
           summary(bb)$adj.r.squared)*100
metody <- c('Model pe³ny', 'Forward\nAIC', 'Forward\nBIC', 
             'Backward\nAIC', 'Backward\nBIC')
to <- data.frame(metody, r,r_adj)
toto <- melt(to, "metody")
toto$metody <- factor(toto$metody,levels=c('Model pe³ny', 
                                           'Forward\nAIC', 
                                           'Forward\nBIC', 
                                           'Backward\nAIC', 
                                           'Backward\nBIC'))


ggplot(toto, aes(x=metody, y=value/100))+
   geom_bar(stat="identity",position='dodge', aes(fill=variable),
            ,colour="black")+
   labs(y='', x='Metody')+
   ggtitle(expression(atop(Wspó³czynnik~R^2~i~R^2~Adjusted,dla~ró¿nych~metod~selekcji~zmiennych)))+
   theme(axis.text.y = element_text(colour="grey20",
                                    size=16, face="plain", family='mono'),
         axis.text.x = element_text(colour="grey20",
                                    size=16,face="plain",family='mono'),
         axis.title.x = element_blank(),
         axis.title.y = element_text(size=18, family='mono'),
         plot.title=element_text(size=18,family='mono'),
         panel.grid.minor.x=element_blank(), 
         panel.grid.major.x=element_blank())+
   scale_fill_manual(values=c("gold","indianred1"),
                     labels=expression(R^2, Adjusted~R^2),name="")+
   scale_y_continuous(labels=percent)
}

#################### przyklady ################################

cr <- read.table("http://www.ipipan.eu/~teisseyrep/TEACHING/SAR/DANE/uscrime.txt",
                 header=T)
pel <- lm(R~., data=cr)
miniaturka(pel)

r <- read.table("http://www.ipipan.eu/~teisseyrep/TEACHING/SAR/DANE/realest.txt",
                header=TRUE)
pel <- lm(r$Price~., data=r)
miniaturka(pel)

s <- read.table("http://www.ipipan.eu/~teisseyrep/TEACHING/SAR/DANE/savings.txt",
                header=T)
pel <- lm(Savings~.-Country, data=s)
miniaturka(pel)
