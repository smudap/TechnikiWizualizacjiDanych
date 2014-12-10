function showFlash(nazwa, width, height, linkus){

  if(linkus)
    lin='PR/Images/'+nazwa+'?clickTag='+linkus;
  else
    lin='PR/Images/'+nazwa;


  document.writeln('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+width+'" height="'+height+'">');
  document.writeln(' <param name="movie" value="'+lin+'"/>');   
  //document.writeln(' <param name="movie" value="PR/Images/'+nazwa+'"/>');   
  document.writeln(' <param name="quality" value="" />');
  document.writeln(' <param name="wmode" value="opaque" />');
  //document.writeln(' <embed src="PR/Images/'+nazwa+'" wmode="opaque" quality="" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" width="'+width+'" height="'+height+'"></embed>');
  document.writeln(' <embed src="'+lin+'" wmode="opaque" quality="" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" width="'+width+'" height="'+height+'"></embed>');
  document.writeln('</object>');
}

function showFlash2(nazwa, width, height, linkus){

  if(linkus)
    lin='PR/Images/'+nazwa+'?click='+linkus;
  else
    lin='PR/Images/'+nazwa;


  document.writeln('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+width+'" height="'+height+'">');
  document.writeln(' <param name="movie" value="'+lin+'"/>');   
  //document.writeln(' <param name="movie" value="PR/Images/'+nazwa+'"/>');   
  document.writeln(' <param name="quality" value="" />');
  document.writeln(' <param name="wmode" value="opaque" />');
  //document.writeln(' <embed src="PR/Images/'+nazwa+'" wmode="opaque" quality="" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" width="'+width+'" height="'+height+'"></embed>');
  document.writeln(' <embed src="'+lin+'" wmode="opaque" quality="" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" width="'+width+'" height="'+height+'"></embed>');
  document.writeln('</object>');
}