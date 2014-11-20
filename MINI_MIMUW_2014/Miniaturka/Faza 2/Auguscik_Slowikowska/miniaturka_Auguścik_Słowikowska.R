library(ggplot2)
library(dplyr)
library(MASS)
library(gridExtra)



funkcja <- function(mod)  {
   mm <- data.frame(predictors=mod$model[,2], residuals=mod$residuals, hat=cooks.distance(mod), wplywowy=(cooks.distance(mod)>=4/(dim(mod$model)[1])))
   przedzial <- max(abs(mod$residuals))*1.1
   
   ggplot(mm, aes(x=predictors, y=residuals)) +
      geom_hline(yintercept=0, col="red", linetype=2) +
      geom_line(col="gray70") +
      geom_point(aes(size=hat, col=wplywowy)) +
      ggtitle("Wykres zale¿noœci residuów od wartoœci predyktorów") +
      labs(y="Residua",x="Zmienna objaœniaj¹ca")  +
      theme_bw() +
      scale_size(range=c(3,15), guide=guide_legend(title="Odleg³oœæ Cooka (wp³ywowoœæ):")) +
      ylim(-przedzial,przedzial) +
      scale_colour_manual(name="Czy obserwacja wp³ywowa?", 
                          values=c("FALSE"="black", "TRUE"="red"), 
                          labels=c("nie", "tak")) +
      theme( axis.text.x = element_text( size = 17),
             axis.text.y = element_text(size = 17),
             axis.title.x= element_text(size = 20),
             axis.title.y= element_text(size = 20),
             title =element_text(size = 25),
             legend.title=element_text(size = 15),
             legend.text = element_text(size = 15),
             legend.position="bottom",
             legend.background = element_rect(colour = "grey50"))
}


funkcja2 <- function(mod) { 
  poziomy_uf<-c(0.9,0.95,0.99)
  mm<-data.frame(id=1:dim(mod$model)[1],predictors=mod$model[,2], zmY=mod$model[,1],  wplywowa=(cooks.distance(mod)>=4/(dim(mod$model)[1])))
  
  r=rstandard(mod) 
  mm$odst<-(abs(r)>3) 
  a=0 
  if (length(which(mm$odst!='FALSE'))>0) {
    nr_odst=which(mm$odst==TRUE) 
    x=mm$predictors[nr_odst] 
    lmm=mod$coef[2]*x+mod$coef[1]
    yy=mm$zmY[nr_odst]
    a=min(abs(yy-lmm)) 
  }
  
  wykres1 <- ggplot(mm, aes(x=predictors,y=zmY),colour="black") + 
    geom_abline(intercept=mod$coef[1]+a,slope=mod$coef[2],colour="red", linetype=3) + 
    geom_abline(intercept=mod$coef[1]-a,slope=mod$coef[2],colour="red", linetype=3) +
    stat_smooth(method="lm", se=TRUE,level = 0.90,fill="steelblue2") + 
    stat_smooth(method="lm", se=TRUE,level = 0.95,fill="steelblue2") + 
    stat_smooth(method="lm", se=TRUE,level = 0.99,fill="steelblue2",colour="black") + 
    geom_point(aes(col=wplywowa),size=3) + 
    theme_bw() +
    scale_colour_manual(name="Czy obserwacja \n wp³ywowa?", values=c("FALSE"="black", "TRUE"="red"), labels=c("nie", "tak")) +
    labs(list(title="Model liniowy",x="Zmienna objaœniaj¹ca" ,y="Zmienna objaœniana")) + 
    theme(axis.text.x = element_text( size = 17),
         axis.text.y = element_text(size = 17),
         axis.title.x= element_text(size = 20),
         axis.title.y= element_text(size = 20),
         title =element_text(size = 25),
         legend.title=element_text(size = 15),
         legend.text = element_text(size = 15))
   
  grid.newpage() 
  print(wykres1) 
}



#### Przyk³ady
#####
y=c(57.5,52.8,61.3,67,53.5,62.7,56.2,68.5,69.2)
x=c(78,69,77,88,67,80,74,94,102)
dane=data.frame(x,y)
mod1=lm(y~x,dane)
funkcja2(mod1)
funkcja(mod1)


#####
attach(cars) 
mod4=lm(speed~dist)
detach(cars)
funkcja2(mod2)
funkcja(mod2)


#####
data(hills)
head(hills)
dim(hills)
mod3 <- lm(time~dist, data=hills)
funkcja2(mod3)
funkcja(mod3)

#####
# attach(trees)
# mod2=lm(Girth~Volume)
# detach(trees)
# funkcja2(mod4)
# funkcja(mod4)



