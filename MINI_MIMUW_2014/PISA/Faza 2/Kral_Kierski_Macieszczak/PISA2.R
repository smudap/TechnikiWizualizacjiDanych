# load PISA

library(dplyr)
library(ggplot2)

load("~/Studia/TWD/PISAeurope.rda")

pisaCont <- pisa %>%
  mutate(interestLevel = ifelse(ISCEDD == "A", "likes math", ifelse(INSTMOT > 0, "doesn't like math but finds it necessary", "doesn't like math nor find it necessary"))) %>%
  filter(! is.na(interestLevel))

pisaAggr <- pisaCont %>%
  group_by(PV1MATH) %>%
  summarise(likesMath = sum(interestLevel == "likes math"),
            needsMath = sum(interestLevel == "doesn't like math but finds it necessary"),
            hatesMath = sum(interestLevel == "doesn't like math nor find it necessary"))

# With students
ggplot(pisaAggr, aes(x = PV1MATH)) +
#  ggtitle("Perception of mathematics in relation to performance on the PISA Math Test") +
  theme(text = element_text(family="sans,Helvetica", size=45, lineheight=4)) +
  xlab("PISA Math Test result") +
  ylab("Students") +
  geom_area(aes(y = likesMath, fill = "green")) +
  geom_area(aes(y = needsMath, fill = "blue")) +
  geom_area(aes(y = hatesMath, fill = "red")) +
  scale_fill_discrete(name="Perception of mathematics",
                      breaks=c("green", "blue", "red"),
                      labels=c("Likes math", "Doesn't like math but finds it necessary", "Doesn't like math nor find it necessary"))
                    
# students liking math pie chart
studentsLikingMath <- pisaCont %>%
  filter(interestLevel == "likes math") %>%
  mutate(parentAttitude = ifelse(
    (ST35Q04 == "Strongly agree" | ST35Q04 == "Agree") & (ST35Q06 == "Strongly agree" | ST35Q06 == "Agree"), 
    "Likes mathematics and believes it is important",
    ifelse(
      (ST35Q04 == "Strongly agree" | ST35Q04 == "Agree"),
      "Doesn't like mathematics but believes it is important",
      "Doesn't like mathematics nor believe it is important"))) %>%
  filter(! is.na(parentAttitude))

ggplot(studentsLikingMath, aes(x = factor(1), fill = factor(parentAttitude))) +
  geom_bar(width = 1) +
  coord_polar(theta = "y") +
  theme(axis.text = element_blank(),
        axis.ticks = element_blank(),
        axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        panel.grid  = element_blank(),
        panel.background = element_blank(),
        text = element_text(family="sans,Helvetica", size=45)) +
  #ggtitle("Attitude of parents of students that like math") +
  scale_fill_discrete(name = "Parent attitude")

# students not liking math, but finding it important pie chart
studentsNeedingMath <- pisaCont %>%
  filter(interestLevel == "doesn't like math but finds it necessary") %>%
  mutate(parentAttitude = ifelse(
    (ST35Q04 == "Strongly agree" | ST35Q04 == "Agree") & (ST35Q06 == "Strongly agree" | ST35Q06 == "Agree"), 
    "Likes mathematics and believes it is important",
    ifelse(
      (ST35Q04 == "Strongly agree" | ST35Q04 == "Agree"),
      "Doesn't like mathematics but believes it is important",
      "Doesn't like mathematics nor believe it is important"))) %>%
  filter(! is.na(parentAttitude))

ggplot(studentsNeedingMath, aes(x = factor(1), fill = factor(parentAttitude))) +
  geom_bar(width = 1) +
  coord_polar(theta = "y") +
  theme(axis.text = element_blank(),
        axis.ticks = element_blank(),
        axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        panel.grid  = element_blank(),
        panel.background = element_blank(),
        text = element_text(family="sans,Helvetica", size=45)) +
#  ggtitle("Attitude of parents of students that don't like math, but find it important") +
  scale_fill_discrete(name="Parent attitude")

# students not liking math nor finding it important pie chart
studentsHatingMath <- pisaCont %>%
  filter(interestLevel == "doesn't like math nor find it necessary") %>%
  mutate(parentAttitude = ifelse(
    (ST35Q04 == "Strongly agree" | ST35Q04 == "Agree") & (ST35Q06 == "Strongly agree" | ST35Q06 == "Agree"), 
    "Likes mathematics and believes it is important",
    ifelse(
      (ST35Q04 == "Strongly agree" | ST35Q04 == "Agree"),
      "Doesn't like mathematics but believes it is important",
      "Doesn't like mathematics nor believe it is important"))) %>%
  filter(! is.na(parentAttitude))

ggplot(studentsHatingMath, aes(x = factor(1), fill = factor(parentAttitude))) +
  geom_bar(width = 1) +
  coord_polar(theta = "y") +
  theme(axis.text = element_blank(),
        axis.ticks = element_blank(),
        axis.title.x = element_blank(),
        axis.title.y = element_blank(),
        panel.grid  = element_blank(),
        panel.background = element_blank(),
        text = element_text(family="sans,Helvetica", size=45)) +
  #ggtitle("Attitude of parents of students that don't like math nor find it important") +
  scale_fill_discrete(name="Parent attitude")