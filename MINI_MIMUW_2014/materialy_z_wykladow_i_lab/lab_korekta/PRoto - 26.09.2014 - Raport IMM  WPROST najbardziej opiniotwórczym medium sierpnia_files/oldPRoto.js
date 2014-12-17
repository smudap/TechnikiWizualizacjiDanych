function formKeyDown(idForm) {
   var idForm=document.getElementById(idForm);
    if (event.keyCode==13){
  idForm.submit();
    }
}

function formExecute(idForm) {
   var idForm=document.getElementById(idForm);
   idForm.submit();
}

//-------------------- Slownik -------------------------------------------------------------
function openwin(name,win_width,win_height)
{
  var LeftPosition=(screen.availWidth)?(screen.availWidth-win_width)/2:50;
  var TopPosition=(screen.availHeight)?(screen.availHeight-win_height)/2:50;
  var params="height="+win_height+",innerheight="+win_height+",top="+TopPosition+",left="+LeftPosition+",width="+win_width+",innerwidth="+win_width+",resizable=yes,menubar=no,scrollbars=yes,toolbar=no,location=no,statusbar=no,alwaysRaised=yes,dependent=no";
  window.open(name,"movie",params);
}

function popup2(Site){
//  alert(getCookie('isPopupDisplayed'));
  window.open(Site,'PopupName','toolbar=no,statusbar=no, location=no, scrollbars=no, resizable=no, width=400, height=400, left=300, top=300');
}

function Otworz(w,s,src, title) {
Nowe=null; 

if (Nowe) { 
 if (ie4) Nowe.close();
 else if (nn4) Nowe.closed;
 Nowe=null 
 }; 
Nowe=window.open("", "","toolbar=no,menubar=no,location=no,personalbar=no,scrollbars=no,status=no,directories=no,resizable=no,height="+w+",width="+s);
Nowe.document.write("<HTML><HEAD><title>"+title+"</title><STYLE>BODY{BACKGROUND-REPEAT:no-repeat}</STYLE></HEAD><BODY BACKGROUND="+src+"></BODY></HTML>")
Nowe.focus() 

}