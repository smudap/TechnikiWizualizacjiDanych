function closePopUpCookies(id){
  document.getElementById(id).style.visibility="hidden";
  document.getElementById(id).style.height=0;
  document.getElementById(id).style.padding=0;
  document.getElementById(id).style.margin=0;
  document.getElementById("komImages").style.height=0;

  setCookie (id, "1", 365);
}

function setCookie(c_name,value,exdays){
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}