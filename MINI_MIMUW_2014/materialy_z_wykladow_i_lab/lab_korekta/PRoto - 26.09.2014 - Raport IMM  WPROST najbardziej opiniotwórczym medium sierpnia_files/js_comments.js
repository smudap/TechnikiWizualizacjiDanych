function CheckCommentsForm(frmName)
{
  var idfrm=document.getElementById(frmName);

  var idautor=document.getElementById("comment_author");
  var iddata=document.getElementById("comment_data");

  //if(!idimie.value || !idnazwisko.value || !idfirma.value || !ide_mail.value || !idtelefon.value || !idbiogram.value){ 
  
  if(!idautor.value || !iddata.value){
     alert("Nale¿y wype³niæ wszystkie pola");
  }else{
    idfrm.submit();
  }
}