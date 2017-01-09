#res= e_i = y_i - dop_y_i

# homoscedastyczność/homoskedastycznośĆ ciągu/wektora zmiennych losowych <=> 
# wszystkie zmienne losowe 
# w tym ciągu posiadają tę samą, 
# skończoną wariancję.


#model liniowy <=> gdy błędy mają własność homoscedastyczności,

#R^2= 1- SEE/SST    współczynnik determinacji wyznacza jak dobrze 
#dopasowany jest model



######### zbiór danych mtcars
#miles per gallon for each car (mpg) WZGLEDEM horsepower (hp)
head(mtcars)
plot(mpg ~ hp, data = mtcars)

#model
fit <- lm(mpg ~ hp, data = mtcars)  # Fit the model
abline(fit)

summary(fit)  # Report the results
#Multiple R-squared:  0.6024

#co o dopasowaniu mówią nam residua:
# wykres korelacji miedzy dopasowanymi wartosciami w modelu, a residuami

plot(fit,1) #mowi o tym jak rozrzucone sa residua => 
            #jesli rownomiernie wokół prostej y=0 to 
            #jest to dobrze dopasowany model liniowy 
            #(wartości zmiennej obiajnianej układają się wzdłuż prostej, 
            #a błedy są rownomiernie rozrzucone) i brak korelacji pomiędzy
            #dopasowanymi wartosciami w modelu i residuami

# Plan działania:

#1) dopasowanie modelu by móc przewidziec zmienną objaśnianą na podstawie zmiennych objaśniających
#2) wyliczenie residuów dla każdej ze zmiennej dopasowanej z modelu dla każdej zmiennej objaśnianej
    #res= e_i = y_i - dop_y_i
#3) zaznaczenie na wykresie dopasowanych punktów wyestymowanych zmiennych objaśnianych
    #tak by były widoczne i połączone prostą (model liniowy)
#4) użycie koloru (np. czerwonego) w celu zaznaczenia residuów, które odstają powyżej jakiejś wartości
    # dzieki temu widzimy ktore zmienne objaśniane zostały wyestymowane przez model najgorzej, 
    # z najwiekszym bledem



#### ZACZYNAMY

#1) dopasowanie modelu by móc przewidziec zmienną objaśnianą na podstawie zmiennych objaśniających
d <- mtcars
fit <- lm(mpg ~ hp, data = d)

#2) wyliczenie residuów dla każdej ze zmiennej dopasowanej z modelu dla każdej zmiennej objaśnianej
#res= e_i = y_i - dop_y_i

# wektor dop_y  (dodanie kolumn danych do d)
d$predicted <- predict(fit)   # Save the predicted values
# wektor e
d$residuals <- residuals(fit) # Save the residual values


#zestawienie
library(dplyr)
d %>% select(mpg, predicted, residuals) %>% head()


#3) zaznaczenie na wykresie dopasowanych punktów wyestymowanych zmiennych objaśnianych
    #tak by były widoczne i połączone prostą (model liniowy)

#zaznaczenie punktów ze zbioru danych
library(ggplot2)
ggplot(d, aes(x = hp, y = mpg)) +  
   geom_point()  #zaznaczenie punktów ze zbioru danych


#dodanie wartości zm. objasnianych z modelu (dop_y)
ggplot(d, aes(x = hp, y = mpg)) +
   geom_point() +
   geom_point(aes(y = predicted), shape = 1) 


#zaznaczenie residuów
#res= e_i = y_i - dop_y_i
ggplot(d, aes(x = hp, y = mpg)) +
   geom_segment(aes(xend = hp, yend = predicted)) +  #geom_segment
   geom_point() +
   geom_point(aes(y = predicted), shape = 1)

# zaznaczenie prostej wyznaczającej model w postaci lini 
# uzycie atrybutu alfha w celu wyszarzenia residuów
library(ggplot2)
ggplot(d, aes(x = hp, y = mpg)) +
   geom_smooth(method = "lm", se = FALSE, color = "lightgrey") +  # prosta opisujaca model
   geom_segment(aes(xend = hp, yend = predicted), alpha = .2) +  # alpha 
   geom_point() +
   geom_point(aes(y = predicted), shape = 1) +
   theme_bw()  # zmiana tla wykresu





#4) użycie koloru (np. czerwonego) w celu zaznaczenia residuów, które odstają powyżej jakiejś wartości
   # dzieki temu widzimy ktore zmienne objaśniane zostały wyestymowane przez model najgorzej, 
   # z najwiekszym bledem

# Kolor
# duże resisua co do wartości bezwzględnej zaznaczone kolorem czerwonym na wartościach 
  # zm. objasnianych ktorych dotycza
ggplot(d, aes(x = hp, y = mpg)) +
   geom_smooth(method = "lm", se = FALSE, color = "lightgrey") +
   geom_segment(aes(xend = hp, yend = predicted), alpha = .2) +
   
   # > Kolor jest zmieniany tutaj
   geom_point(aes(color = abs(residuals))) + # mapowanie koloru wzgledem abs(residuals)
   scale_color_continuous(low = "black", high = "red") +  # skala kolorów
   guides(color = FALSE) +  # usunięcie legendy dot. kolorów
   # <
   
   geom_point(aes(y = predicted), shape = 1) +
   theme_bw()


# Rozmiar punktów
# Ten sam kolor co wyżej, 
  # jedank dodatkowo dodany rozmiar punktóW - także przedstawia rozmiar residuów,
  # co do wartości bezwzględnej
ggplot(d, aes(x = hp, y = mpg)) +
   geom_smooth(method = "lm", se = FALSE, color = "lightgrey") +
   geom_segment(aes(xend = hp, yend = predicted), alpha = .2) +
   
   # > Kolor jest zmieniany tutaj
   geom_point(aes(color = abs(residuals), size = abs(residuals))) + # rozmiar zmapowany tutaj
   scale_color_continuous(low = "black", high = "red") +
   guides(color = FALSE, size = FALSE) +  # usunięcie legendy do koloru i rozmiaru
   # <
   
   geom_point(aes(y = predicted), shape = 1) +
   theme_bw()




####Dodatkowo można w zależności od problemu kolorować tylko residua, które są dodatnie/ujemne
# jeśli interesuja nas np. tylko miejsca gdzie zaniżyliśmy/zawyżyliśmy wartość objaśnianą w naszym modelu
ggplot(d, aes(x = hp, y = mpg)) +
   geom_smooth(method = "lm", se = FALSE, color = "lightgrey") +
   geom_segment(aes(xend = hp, yend = predicted), alpha = .2) +
   
   # > Kolor jest zmieniany tutaj
   geom_point(aes(color = residuals)) +  
   scale_color_gradient2(low = "blue", mid = "white", high = "red") +  # Colors to use here
   guides(color = FALSE) +
   # <
   
   geom_point(aes(y = predicted), shape = 1) +
   theme_bw()


#widzimy że jest wiecej wartości które są zaniżone (czerwone) w modelu niż tych które sa zawyzone 
#najwiecej wartości zawyżonych znajduje się w centrum (niebieski)

#WNIOSEK:
# Sugeruje to, że isnieje zależność pomiędzy residuami i dopasowanymi wartosciami 
# zmiennej objasnianej ktora nie jest liniowa
# Powinniśmy zastosować zatem inny model, np. taki który uwzględnia kwadrat zmiennej objaśniającej 
# w równaniu modelu: 
   #dop_y= a_1 + a_2*x + a_3*x^2


#########################################################

# co w przypadku wielowymiearowej regresji liniowej (wiecej niz jedna zmienna objasniajaca)?

#np. Miles per gallon (mpg) 
   #WZGLĘDEM 
 #horsepower (hp), weight (wt), and displacement (disp).


# Wyciągnięcie interesujacych nas danych:
d <- mtcars %>% select(mpg, hp, wt, disp)

# 1) Dopasowanie modelu wielowymiarowego
fit <- lm(mpg ~ hp + wt+ disp, data = d)

# 2) wyliczenie residuów dla każdej ze zmiennej dopasowanej z modelu dla każdej zmiennej objaśnianej
#res= e_i = y_i - dop_y_i

# wektor dop_y
d$predicted <- predict(fit)   
# wektor e
d$residuals <- residuals(fit)

#zestawienie
head(d)


# 3) zaznaczenie na wykresie dopasowanych punktów wyestymowanych zmiennych objaśnianych 
   # względem JEDNEJ z wybranych zmiennych objaśniających (hp)

ggplot(d, aes(x = hp, y = mpg)) +
   geom_segment(aes(xend = hp, yend = predicted), alpha = .2) +  # Lines to connect points
   geom_point() +  # praewdziwe warości objaśniane
   geom_point(aes(y = predicted), shape = 1) +  # dopasowane z modelu wartosci objasniane
   theme_bw()


# 4) dodanie kolorów

ggplot(d, aes(x = hp, y = mpg)) +
   geom_segment(aes(xend = hp, yend = predicted), alpha = .2) +
   geom_point(aes(color = residuals)) +
   scale_color_gradient2(low = "blue", mid = "white", high = "red") +
   guides(color = FALSE) +
   geom_point(aes(y = predicted), shape = 1) +
   theme_bw()


#to co mozna na razie zauwazyc i co zmienilo się wgledem regresji jednowymiarowej:
 #warosci wyestymowane nie ukladaja już sie na prostej 
 #(na rysunku zaznaczenie jednego wymiaru tylko, a model jest wielowymiarowy)


#tracimy sedno wizualizujac regresje wielowymiarowa na plaszczyznie 
#(wzgledem tylko jednej zmiennej objasniajacej)


#mozemy stworzyc trzy rownolegle wykresy i porownywac
library(tidyr)
d %>% 
   gather(key = "iv", value = "x", -mpg, -predicted, -residuals) %>%  # poprawne przedstawienie danych
   ggplot(aes(x = x, y = mpg)) +  # x zmienna objasniajaca,  mpg obajsniana 
   geom_segment(aes(xend = x, yend = predicted), alpha = .2) +
   geom_point(aes(color = residuals)) +
   scale_color_gradient2(low = "blue", mid = "white", high = "red") +
   guides(color = FALSE) +
   geom_point(aes(y = predicted), shape = 1) +
   facet_grid(~ iv, scales = "free_x") +  # rozdzielenie na trzy wykresy wzgledem iv
   theme_bw()

#widać jak przwidziane wartosci dop_y rozni sie od wartosci wlasciwych 
#zmiennej objasniajacej wzgledem poszczegolnych predykatow


############ to samo na innym zbiorze danych


d <- iris %>% select(-Species)

# model
fit <- lm(Sepal.Width ~ ., data = iris)

# wartosci dop_y i residua
d$predicted <- predict(fit)
d$residuals <- residuals(fit)

#trzy rownolegle wykresy w celu porownania
d %>% 
   gather(key = "iv", value = "x", -Sepal.Width, -predicted, -residuals) %>%
   ggplot(aes(x = x, y = Sepal.Width)) +
   geom_segment(aes(xend = x, yend = predicted), alpha = .2) +
   geom_point(aes(color = residuals)) +
   scale_color_gradient2(low = "blue", mid = "white", high = "red") +
   guides(color = FALSE) +
   geom_point(aes(y = predicted), shape = 1) +
   facet_grid(~ iv, scales = "free_x") +
   theme_bw()

#kolor <- wartosci rzeczywiste y
#biale <- wartosci dopasowane w modelu dop_y

#Wnioski:
#znacznie mniejszy rozrzut warotsci dopasowanych niż tych rzeczywistych




##########################################################
### REGRESJA LOGICZNA 
# wartoscia objasniana jest zmienną typu binarnego (np. odpowiedzi w ankietach)

# 1) dane (vs jest 0 lub 1)
d <- mtcars
head(d)

# model
fit <- glm(vs ~ hp, family = binomial(), data = d)

# 2) dop_y i residua 
d$predicted <- predict(fit, type="response")
d$residuals <- residuals(fit, type = "response")

# Residua na wykresie
ggplot(d, aes(x = hp, y = vs)) +
   geom_segment(aes(xend = hp, yend = predicted), alpha = .2) +
   geom_point(aes(color = residuals)) +
   scale_color_gradient2(low = "blue", mid = "white", high = "red") +
   guides(color = FALSE) +
   geom_point(aes(y = predicted), shape = 1) +
   theme_bw()


#tutaj chcielibyśmy zaznaczyć tylko te zmienne dop_y,
#ktore zostały przyporządkowane złej kategorii (0/1)
ggplot(d, aes(x = hp, y = vs)) +
   geom_segment(aes(xend = hp, yend = predicted), alpha = .2) +
   geom_point() +
   
   # > Zaznaczenie zle sklasyfikowanej wartosci dop_y
   geom_point(data = d %>% filter(vs != round(predicted)),
              color = "red", size = 2) +
   # <
   
   scale_color_gradient2(low = "blue", mid = "white", high = "red") +
   guides(color = FALSE) +
   geom_point(aes(y = predicted), shape = 1) +
   theme_bw()



###########################################
##### DRUGI SPOSOB Z WYKORZYSTANIEM BIBLIOTEKI BROOM
#install.packages("broom")
library(broom)

# Steps 1 and 2
d <- lm(mpg ~ hp, data = mtcars) %>% 
   augment()   #funkcja z biblioteki broom

head(d)


# Steps 3 and 4
ggplot(d, aes(x = hp, y = mpg)) +
   geom_smooth(method = "lm", se = FALSE, color = "lightgrey") +
   geom_segment(aes(xend = hp, yend = .fitted), alpha = .2) +  #  `.fitted`
   geom_point(aes(alpha = abs(.resid))) +  #  `.resid`
   guides(alpha = FALSE) +
   geom_point(aes(y = .fitted), shape = 1) +  #  `.fitted`
   theme_bw()

