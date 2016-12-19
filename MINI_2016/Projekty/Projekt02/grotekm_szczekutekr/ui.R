library(shiny)
library(eurostat)

dat <- get_eurostat(id = "lfsa_ewpnig", time_format = "num")
datl <- label_eurostat(dat)

datl <- subset(datl, values!="NA")
datl <- datl[!grepl("European Union",datl$geo),]
datl <- datl[!grepl("Euro area",datl$geo),]

datl$frequenc = factor(datl$frequenc,levels=c("Never","Sometimes","Usually"),ordered=TRUE)
datl$geo = factor(datl$geo)
datl$sex = factor(datl$sex)
datl$time = factor(datl$time, ordered=TRUE)
datl$age = factor(datl$age)
datl$wstatus = factor(datl$wstatus)

geoLabels <- sort(levels(datl$geo))
sexLabels <- sort(levels(datl$sex))
ageLabels <- sort(levels(datl$age))
freqLables <- sort(levels(datl$frequenc))
wstatusLabels <-sort(levels(datl$wstatus))

unemployment <- get_eurostat(id = "tesem120", time_format = "num", type = "label")
unemployment <- unemployment[!grepl('European Union',unemployment$geo),]
unemployment <- unemployment[!grepl('Euro area',unemployment$geo),]
unemployment <- subset(unemployment, values!="NA")
unemployment$geo = factor(unemployment$geo)
unemployment$time = factor(unemployment$time, ordered=TRUE)


shinyUI(fluidPage(
  tags$head(tags$style(HTML("
                            .well {
                            background-color: #dd9999!important;
                            width: 200px;
                            }
                            "))),
  titlePanel("Employed persons working at nights as a percentage of the total employment, by sex, age and professional status"),
  sidebarLayout(
    sidebarPanel(
      selectInput("selectedGeo", 
                  label = "Select country",
                  choices = geoLabels,
                  selected = "Austria",
                  multiple = TRUE),
      selectInput("selectedSex", 
                  label = "Select sex",
                  choices = sexLabels,
                  selected = "Females"),
      selectInput("selectedAge", 
                  label = "Select age",
                  choices = ageLabels,
                  selected = "15 years or over"),
      selectInput("selectedWStatus", 
                  label = "Select working status",
                  choices = wstatusLabels,
                  selected = "Contributing family workers"),
      selectInput("selectedFreq", 
                  label = "Select frequency",
                  choices = freqLables,
                  selected = "Usually"),
      checkboxInput("trendLine",
                    "Show unemployment",
                    value = TRUE),
      htmlOutput("frequency")
    ),
    mainPanel(
      tabsetPanel(
        tabPanel("Plot", 
                 p("Work at night for selected criteria"), 
                 plotOutput("trend")),
        tabPanel("Model",
                 p("Wyniki dpasowania modelu liniowego dla tego serialu."),
                 verbatimTextOutput("model")
        )    
      )
    )
  )
  ))