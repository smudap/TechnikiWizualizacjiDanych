function checkPools(idForm, idPool){

var idSonda=document.getElementById(idForm);
  //var idpool=document.getElementsByName("idPool");

var ktory = -1;
var idpools = document.getElementById(idForm).polls_optionId //tak jak poprzednio przypisujemy odwo³anie do naszych guzików
for (x=0; x<idpools.length; x++) {
  if (idpools[x].checked) ktory = x
}

if (ktory == -1) 
  alert('Nie zaznaczyles ¿adnego pola!');
else
  idSonda.submit();        
  
}