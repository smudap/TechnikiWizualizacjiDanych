install.packages("plotrix")
library(plotrix)

ile = 0.35

how_many_points = 360
r = 1

plot(0:2,0:2, xaxt='n', yaxt='n', ann=FALSE, type="n",xlab="",ylab="",bty="n", asp = 1 )
#plot(0:2*r,0:2*r, type="n",xlab="",ylab="", asp = 1)
i = 0:how_many_points
x = r * sin(i / how_many_points * 2* pi) + r
y = r * cos(i / how_many_points * 2 *pi) + r
polygon(x, y,
        col = '#a0a0a0',
        border = NA,
        lwd = 1, lty = 1)

z = 1
prog = (1 - ile) * pi * r * r;
while (1) {
  arc = (z / how_many_points) * 2 * pi;
  Pt = r*r*sin(arc)/2
  Pw = arc / 2 * r * r
  Pb = Pw - Pt
  Pa = pi * r * r - Pb
  z = z+1
  if (Pa <= prog) break;
}

polygon(x[0:z], y[0:z],
        col = '#3131ba',
        border = NA,
        lwd = 1, lty = 1)