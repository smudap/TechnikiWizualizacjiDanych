# load PISA

library(dplyr)
library(ggplot2)
library(scales)
library(numDeriv)
library(RColorBrewer)
library(extrafont)

font_import(pattern="[L/l]iberation")
loadfonts(device="pdf")

load("~/Studia/TWD/PISAeurope.rda")

# translation to show which factor has the most impact

PV1MATH_trans <- function() {
  trans <- function(x) x - 350
  inv   <- function(x) x + 350
  trans_new("PV1MATH_trans", trans, inv)
}

# by parents' education

byParentsEducation <- pisa %>%
  group_by(HISCED, na.rm = TRUE) %>%
  summarise(meanResult = mean(PV1MATH, na.rm = TRUE)) %>%
  na.omit

ggplot(byParentsEducation, aes(x = HISCED, y = meanResult, fill = HISCED)) +
  ggtitle("Results and parents' education") +
  scale_x_discrete(breaks=NULL, name="") +
  scale_y_continuous(trans="PV1MATH", name = "Mean PISA math test result") +
  geom_bar(stat = "identity") +
  theme(text = element_text(family="Liberation Sans")) +
  scale_fill_manual(values=c("#000033","#000066","#0000FF","#0033FF","#0066FF","#0099FF","#00CCFF"),
    name = "Highest education level of a parent", labels=c("None", "Primary education", "Lower secundary education", "Upper secondary education", "Post-secondary non-tertiary education", "First stage of tertiary education", "Second stage of tertiary education"))

# by parents' attitude to mathematics

byAttitude <- pisa %>%
  mutate(parentAttitude = ifelse(
    (ST35Q04 == "Strongly agree" | ST35Q04 == "Agree") & (ST35Q06 == "Strongly agree" | ST35Q06 == "Agree"), 
    "Likes mathematics and believes it is important",
    ifelse(
      (ST35Q04 == "Strongly agree" | ST35Q04 == "Agree"),
      "Doesn't like mathematics but believes it is important",
      "Doesn't like mathematics nor believe it is important"))) %>%
  filter(! is.na(parentAttitude)) %>%
  group_by(parentAttitude) %>%
  summarise(meanResult = mean(PV1MATH, na.rm = TRUE)) %>%
  arrange(meanResult)

ggplot(byAttitude, aes(x = parentAttitude, y = meanResult, fill = parentAttitude)) +
  ggtitle("Results and parents' attitude to mathematics") +
  scale_x_discrete(breaks = NULL, name = "", limits = 
                     c("Doesn't like mathematics nor believe it is important", 
                       "Doesn't like mathematics but believes it is important", 
                       "Likes mathematics and believes it is important")) +
  scale_y_continuous(trans = "PV1MATH", name = "Mean PISA math test result") +
  geom_bar(stat = "identity") +
  theme(text = element_text(family="Liberation Sans")) +
  scale_fill_manual(values=c("#5081B5", "#22558C", "#022245"),
                    name = "Parents' attitude to mathematics", limits = 
                      c("Doesn't like mathematics nor believe it is important", 
                        "Doesn't like mathematics but believes it is important", 
                        "Likes mathematics and believes it is important"))


# by number of books

byBooks <- pisa %>%
  group_by(ST28Q01, na.rm = TRUE) %>%
  summarise(meanResult = mean(PV1MATH, na.rm = TRUE)) %>%
  na.omit

ggplot(byBooks, aes(x = ST28Q01, y = meanResult, fill = ST28Q01)) +
  ggtitle("Results and number of books at home") +
  scale_x_discrete(breaks = NULL, name = "") +
  scale_y_continuous(trans = "PV1MATH", name = "Mean PISA math test result") +
  geom_bar(stat = "identity") +
  theme(text = element_text(family="Liberation Sans")) +
  scale_fill_manual(values=c("#000033","#000066","#0000FF","#0033FF","#0066FF","#0099FF","#00CCFF"), name = "Number of books at home")

# calculate impact data frame

impactByAttitude <- max(byAttitude$meanResult) - min(byAttitude$meanResult)
impactByBooks <- max(byBooks$meanResult) - min(byBooks$meanResult)
impactByParentsEducation <- max(byParentsEducation$meanResult) - min(byParentsEducation$meanResult)

impactsTitles <- c("by attitude", "by books", "by parents education")
impactsValues <- c(impactByAttitude, impactByBooks, impactByParentsEducation)
impacts <- data.frame(titles=impactsTitles, values=impactsValues)

ggplot(impacts, aes(x = factor(titles), y = 0)) +
  ggtitle("Relative impact of factors on students' PISA math test results") +
  geom_point(aes(size=values), col="black") +
  scale_size_continuous(range = c(1, 20), name="Impact") +
  theme(text = element_text(family="Liberation Sans"), legend.position="none") +
  scale_x_discrete(name="", limits=c("by books", "by parents education", "by attitude")) +
  scale_y_continuous(name="", breaks=NULL)

