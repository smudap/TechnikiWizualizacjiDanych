
#### Function generating plot of linear model with highlight outliers and infleuntial observation ####


# Description 
# PlotLinearModel is used to plot linear models. 
#  It can be used to carry out outliers and infleuntial observation.
#
# Usage:
#   PlotLinearModel(mod, influential_type=1)
# 
# Arguments:
#   mod  -  an object of class "lm";
#   influential_type   - what type of influential observation will be highlight. Possible types are:
#              -   1 (default) observation will be highlight if Cook distance >1
#              -   not 1  observation will be highlight if Cook distance >= 4/(no. observations).



PlotLinearModel <- function(mod, influential_type=1) { 
  
  if (class(mod)!="lm") stop("mod must be an object of class lm!")
  if (length(mod$coeff)!=2) stop ("In model can be only one predictor!")
  
  library(ggplot2)
  library(dplyr)
  library(MASS)
  library(gridExtra)
  
  if (influential_type == 1) cook <-1 else cook <- 4/(dim(mod$model)[1]) 
  confidence_level<-c(0.9,0.95,0.99)
  my_data <- data.frame(id = 1:dim(mod$model)[1], predictors = mod$model[,2], Y = mod$model[,1],  influential = (cooks.distance(mod)>=cook))
  r = rstandard(mod) 
  my_data$outlier<-(abs(r)>3) 
  a = 0
  if (length(which(my_data$outlier!='FALSE'))>0) {
    nr_outlier = which(my_data$outlier==TRUE) 
    x = my_data$predictors[nr_outlier] 
    lmy_data = mod$coef[2]*x+mod$coef[1]
    yy = my_data$Y[nr_outlier]
    a = min(abs(yy-lmy_data))
  }
  
  ##### MAKE PLOT 
  plot <- ggplot(my_data, aes(x=predictors,y=Y),colour="black") + 
    stat_smooth(method = "lm", se = TRUE, level = 0.90, fill = "steelblue2", alpha = 0.3) + 
    stat_smooth(method = "lm", se = TRUE, level = 0.95, fill = "steelblue2", alpha = 0.3) + 
    stat_smooth(method = "lm", se = TRUE, level = 0.99, fill = "steelblue2", alpha = 0.3, colour = "black", size=1) + 
    geom_point(aes(col = influential, label = predictors), size = 3.5) + 
    theme_bw() +
    scale_colour_manual(name = "Is observation influential?", values = c("FALSE" = "black", "TRUE" = "darkgreen"), labels = c("No", "Yes (with the number of observation)")) +
    geom_text(data = my_data[my_data$influential=="TRUE",], aes(label = predictors[influential=="TRUE"]), col = "darkgreen", hjust = 0, vjust = 0) +
    labs(list(title = "Linear model, outliers and influential observations", x = "Predictors", y = "Observations")) + 
    theme(axis.text.x = element_text(size = 17,color = "grey37"),
          axis.text.y = element_text(size = 17,color = "grey37"),
          axis.title.x = element_text(size = 20,color = "grey18"),
          axis.title.y = element_text(size = 20,color = "grey18"),
          title = element_text(size = 25,color = "grey18"),
          legend.title = element_text(size = 15),
          legend.text = element_text(size = 15))+
    
    theme(legend.key = element_rect(colour = "white", fill = NULL,
                                    size = 0.5, linetype = NULL,color = NULL),
          panel.grid.major = element_line(colour = "thistle2"),
          legend.position = "bottom")
  if (a!=0) {
    plot <- plot +
    geom_abline(intercept = mod$coef[1]+a, slope = mod$coef[2], colour = "red", linetype = 2, size = 1) +  
    geom_abline(intercept = mod$coef[1]-a, slope = mod$coef[2], colour = "red", linetype = 2, size = 1) 
  }
 
  
  grid.newpage() 
  ##### PRINT PLOT
  print(plot, vp = viewport(x = 0.5, y = 0.6, width = 1, height = 0.8)) 
  
  ##### PRINT LEGEND
  if (influential_type == 1) {grid.text("( influential observation means: Cook distance >= 1 )", vp = viewport(x = 0.5, y = 0.22), gp = gpar(fontsize = 13))} else
  {grid.text("( influential observation means: Cook distance >= 4/(no. observations) )", vp = viewport(x = 0.5, y = 0.22), gp = gpar(fontsize = 13))}
  grid.text("Is observation outlier?", just="left", vp = viewport(x = 0.17, y = 0.16), gp = gpar(fontsize = 15, fontface = 2, col = "grey18"))
  grid.text("Yes, when is out of this belt:", just = "left", vp = viewport(x = 0.4, y = 0.16), gp = gpar(fontsize = 15))
  grid.lines(x = c(0.65,0.85), y = c(0.17, 0.17), gp = gpar(col="red", lty=2, lwd=2))
  grid.lines(x = c(0.65,0.85), y = c(0.145, 0.145), gp = gpar(col="red", lty=2, lwd=2))
  grid.text("( outlier observation means: |standardized residual| > 3 )", vp = viewport(x = 0.5, y = 0.13), gp = gpar(fontsize = 13))
 
  grid.text("Confidence levels:", just = "left", vp = viewport(x = 0.2, y = 0.07), gp = gpar(fontsize = 15, fontface = 2, col = "grey18"))
  grid.polygon(x=c(0.4,0.46,0.46,0.4), y=c(0.055, 0.055, 0.08, 0.08), gp=gpar(fill="steelblue2", alpha=0.3))
  grid.polygon(x=c(0.4,0.46,0.46,0.4), y=c(0.055, 0.055, 0.08, 0.08), gp=gpar(fill="steelblue2", alpha=0.3))
  grid.polygon(x=c(0.4,0.46,0.46,0.4), y=c(0.055, 0.055, 0.08, 0.08), gp=gpar(fill="steelblue2", alpha=0.3))
  grid.text("90%", just="left", vp = viewport(x=0.47, y=0.07), gp=gpar(fontsize=15))
  grid.polygon(x=c(0.55,0.61,0.61,0.55), y=c(0.055, 0.055, 0.08, 0.08), gp=gpar(fill="steelblue2", alpha=0.3))
  grid.polygon(x=c(0.55,0.61,0.61,0.55), y=c(0.055, 0.055, 0.08, 0.08), gp=gpar(fill="steelblue2", alpha=0.3))
  grid.text("95%", just="left", vp = viewport(x=0.62, y=0.07), gp=gpar(fontsize=15))
  grid.polygon(x=c(0.7,0.76,0.76,0.7), y=c(0.055, 0.055, 0.08, 0.08), gp=gpar(fill="steelblue2", alpha=0.3))
  grid.text("99%", just="left", vp = viewport(x=0.77, y=0.07), gp=gpar(fontsize=15))
  grid.text("made by: Auguœcik&Slowikowska", vp = viewport(x = 0.9, y = 0.03), gp = gpar(fontsize = 9))
}



#### Examples
#####
y=c(57.5,52.8,61.3,67,53.5,62.7,56.2,68.5,69.2)
x=c(78,69,77,88,67,80,74,94,102)
new_data=data.frame(x,y)
model1=lm(y~x,new_data)
PlotLinearModel(model1)
PlotLinearModel(model1,2)


#####
attach(cars) 
model4=lm(speed~dist)
detach(cars)

PlotLinearModel(model4)
PlotLinearModel(model4,2)

#####
data(hills)
head(hills)
dim(hills)
model3 <- lm(time~dist, data=hills)

PlotLinearModel(model3)
PlotLinearModel(model3, 2)





