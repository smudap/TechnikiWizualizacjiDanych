function pop(plik,w,h) {
  var aw=800;
  var ah=600;
  var okno = null;
  if(window.screen) {
    var aw = screen.availWidth;
    var ah = screen.availHeight;
  }
  var dane="width="+w+",height="+h+",left="+(aw-w)/2+",top="+(ah-h)/2+",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no"; 
  okno = window.open(plik,'pop',dane);
}

function wykopPop(url,plik,desc,w,h) {
  plik = encodeURIComponent(plik);
  var aw=800;
  var ah=600;
  var okno = null;
  if(window.screen) {
    var aw = screen.availWidth;
    var ah = screen.availHeight;
  }
  var dane="width="+w+",height="+h+",left="+(aw-w)/2+",top="+(ah-h)/2+",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no";  
  okno = window.open(url+plik+desc,'pop',dane);
}
