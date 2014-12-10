function cookiepolicyclose(){
   document.getElementById('cookiepolicydiv').style.display="none";
}

var cookiepolicytext='<div id="cookiepolicydiv" style="padding:10px 0;width:100%;background-color:#E1E4E6;text-align:center;color:#384046;font-size:10.5px;font-family:Tahoma,Arial,sans-serif;font-weight:normal;position:fixed;bottom:0;z-index:999"><div style="text-align:center;margin:0 auto;width:960px;">Strona korzysta z plik&oacute;w cookies w celu realizacji us&#322;ug i zgodnie z <a style="text-decoration:underline" target="_blank" href="http://www.bankier.pl/gfx/polityka_plikow_cookies.pdf">Polityk&#261; Plik&oacute;w Cookies</a>. Mo&#380esz okre&#347;li&#263; warunki przechowywania lub dost&#281;pu do plik&oacute;w cookies w Twojej przegl&#261;darce.<div onclick="cookiepolicyclose()" style="cursor:pointer;float:right;text-align:center;margin-right:10px;font-size:12px;font-family:Verdana;line-height:16px;height:16px;width:16px">x</div></div></div>';

if (document.cookie.indexOf('cookiepolicy=true') === -1){

   var cpdomain = '';

   if ( window.location.hostname.indexOf('.bankier.pl') > -1 ) {
      cpdomain = ';domain=.bankier.pl';
   }

   document.write(cookiepolicytext);
   var cpdate =  new Date();
   cpdate.setDate(cpdate.getDate() + 10000);
   document.cookie = "cookiepolicy=true; path=/;expires="+cpdate.toUTCString()+cpdomain;
}


