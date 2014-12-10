sfHover = function() { 
    var sfEls = document.getElementById("nav").getElementsByTagName("LI"); 
    for (var i=0; i<sfEls.length; i++) { 
         sfEls[i].onmouseover=function() { 
              this.className=this.className.replace(/ sfout/, ""); 
              this.className+=" sfhover"; 
              //alert(this); 
         } 
         sfEls[i].onmouseout=function() { 
              this.className=this.className.replace(/ sfhover/, " sfout"); 
              //alert(this.tagName); 
         } 
 } 
} 
if (window.attachEvent) window.attachEvent("onload", sfHover); 