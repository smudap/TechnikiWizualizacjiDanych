kto_gdzie_ile4.1<-read.table("C:/Users/Marta/Desktop/TWD/Projekt 1/sejm_wyniki.txt",stringsAsFactors = F)
kto_gdzie_ile5.1<-read.table("C:/Users/Marta/Desktop/TWD/Projekt 1/sejm_wyniki_dod.txt",stringsAsFactors = F)
wyniki_PIS.1<-read.table("C:/Users/Marta/Desktop/TWD/Projekt 1/wyniki_PIS.txt",h=T,stringsAsFactors =F )
wyniki_PO.1<-read.table("C:/Users/Marta/Desktop/TWD/Projekt 1/wyniki_PO.txt",h=T,stringsAsFactors =F )
wyniki_Kukiz.1<-read.table("C:/Users/Marta/Desktop/TWD/Projekt 1/wyniki_Kukiz.txt",h=T,stringsAsFactors =F )
wyniki_PSL.1<-read.table("C:/Users/Marta/Desktop/TWD/Projekt 1/wyniki_PSL.txt",h=T,stringsAsFactors =F )
wyniki_N.1<-read.table("C:/Users/Marta/Desktop/TWD/Projekt 1/wyniki_N.txt",h=T,stringsAsFactors =F )

kto_gdzie_ile5.1$procentowa_zgodnosc<-(100-kto_gdzie_ile5.1$procentowa_zgodnosc)
kto_gdzie_ile4.1$procentowa_zgodnosc<-(100-kto_gdzie_ile4.1$procentowa_zgodnosc)

library(ggplot2)

kolory<- c("#ff4e53", "#753B64","#3e9ff2","#ffa871", "#00b861")

#kolory<- c("#ed2026", "#753B64","#064f8e","#f16913", "#006837")
#al=0.8
al=1

p2<-ggplot(kto_gdzie_ile4.1, aes(x=ile_razy_mowil,color=partia,y=procentowa_zgodnosc)) +
   geom_point(size=3,alpha=al)+scale_x_sqrt(breaks=c(0,1,2,5,10,20,30,50,100,150),expand=c(0.03,0.1),                             labels=c("0","1","2","5","10","20","30","50","100","150"),limits=c(0,200))+
   scale_y_continuous(expand=c(0.01,0.01),limits=c(0,28))+
   geom_hline(yintercept =100- 100*mean(wyniki_PIS.1$proc_zgodnosci),color=kolory[3],size=1)+
   geom_hline(yintercept =100- 100*mean(wyniki_PO.1$proc_zgodnosci),color=kolory[4],size=1)+
   geom_hline(yintercept =100- 100*mean(wyniki_PSL.1$proc_zgodnosci),color=kolory[5],size=1)+
   geom_hline(yintercept =100- 100*mean(wyniki_N.1$proc_zgodnosci),color=kolory[2],size=1)+
   geom_hline(yintercept =100- 100*mean(wyniki_Kukiz.1$proc_zgodnosci),color=kolory[1],size=1)+
   geom_vline(xintercept = 0,size=0.5,col="grey80")+
   ggtitle(c("Procentowa niezgodność glosowań posłów (z linią ich partii) \n vs ilość ich wystąpień"))+
   xlab(c("Ilość wystąpień posła na posiedzeniach"))+
   ylab(c("Odsetek głosowań posła niezgodnych z linią partii"))+
   geom_text(aes(x=130,y=11,label = "średnie niezgodności partii"),inherit.aes = F,col="grey",show.legend = F,size=5)+
   guides(color = guide_legend(override.aes = list(size=8)))+
   scale_color_manual(name="",values=kolory,guide=F)+
   theme(panel.background = element_rect(fill = "white"),
         panel.grid.major = element_line(colour = "grey80",size=0.5),
         legend.title=element_blank(),legend.key=element_blank(),plot.title = element_text(size = 25, face = "bold"),axis.title.x = element_text(size = 20),
         axis.title.y = element_text(size = 20),legend.text=element_text(size=12),axis.text.x = element_text(size=15), axis.text.y = element_text(size=15))+
   geom_label(data = kto_gdzie_ile5.1 ,aes(x=ile_razy_mowil,y=procentowa_zgodnosc,label="                         ",color=partia),inherit.aes = F,nudge_y=0.5, nudge_x = 0.5,size=4,alpha=0.7,show.legend = F,label.size=1)+
   geom_text(data = kto_gdzie_ile5.1, aes(x=ile_razy_mowil,y=procentowa_zgodnosc,label=name), inherit.aes = F,nudge_y=0.5, nudge_x = 0.5,size=5,show.legend = F)

p2


kto_gdzie_ile4.1$srednia_zgodnosc<-round(kto_gdzie_ile4.1$srednia_zgodnosc,2)
colnames(kto_gdzie_ile4.1)<-c("dep_nr","partia","il_wyst","im_i_nazw","proc_niezg","śr_zgod")