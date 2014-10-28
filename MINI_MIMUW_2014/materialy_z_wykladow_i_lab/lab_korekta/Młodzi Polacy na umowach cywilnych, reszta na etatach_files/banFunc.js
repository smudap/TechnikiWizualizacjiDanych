if (!Array.prototype.map) {
    Array.prototype.map = function(f) {
        var ary = [], i = 0, l = this.length;
        for (; i < l; i++) ary[i] = f(this[i], i);
        return ary;
    }
};

var a = !1, b = ""; function c(d) { d = d.match(/[\d]+/g); d.length = 3; return d.join(".") };

var banServerFile = 'http://adp.adview.pl/ad/';
var banServerJS = 'http://ad.adview.pl/';


var banViewedXxByPoz = ''; 
var xxyEcom = '';
var typyPutBan=new Array();

var adview = adview || {};
adview.shapemark = adview.shapemark || {};
adview.shapemark.elems = [];
adview.shapemark.art = ''; 

adview.shapemark.checkFlashPlayerVer = function (type) {
    if(navigator.plugins && navigator.plugins.length) { 
        var e = navigator.plugins["Shockwave Flash"]; 
        
        e && (a = !0, e.description && (b = c(e.description))); 
        
        navigator.plugins["Shockwave Flash 2.0"] && (a = !0, b = "2.0.0.11") 
    } else { 
        if(navigator.mimeTypes && navigator.mimeTypes.length) { 
            var f = navigator.mimeTypes["application/x-shockwave-flash"]; 
            
            (a = f && f.enabledPlugin) && (b = c(f.enabledPlugin.description)) 
        } else { 
            try { 
                var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"), a = !0, b = c(g.GetVariable("$version")) 
            } catch(h) { 
                try { 
                    g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), a = !0, b = "6.0.21" 
                } catch(j) { 
                    try { 
                        g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), a = !0, b = c(g.GetVariable("$version")) 
                    } catch(k) { } 
                } 
            } 
        } 
    };  
    
    var vr = b; 
    //flash version vr;

    /*create div elements for circle shape*/            
    if (a && type == 'EMBED' || type == 'IMG') {
        adview.shapemark.setObjects = (function () {
        
            var 
                RADIUS =  95,
                HEIGHT = 19,
                COUNT = 16,
                k = 0;
                
                for (k = 0; k < 3.14; k = k + 3.14 / COUNT) {
                    var 
                        v = k < 0.9 ? l = 11 : k < 1 ? l = 6 : l = 0;
                        w = Math.sin(k) * RADIUS + 75 + l,
                        elemCircle = document.createElement("div"),
                        o = { $target: elemCircle, width: w };
                    
                    elemCircle.className = "shapeMarkLine";
                    elemCircle.style.width = w + "px";
                    elemCircle.style.height = HEIGHT + "px";
                    
                    adview.shapemark.shapeType.appendChild(elemCircle);
                    adview.shapemark.elems.push(o); 

                };
                
            adview.shapemark.adv.innerHTML = 'Reklama';
        })();
    };
    
    return a ? true : false;
};

adview.shapemark.getElementsByClassName = function (className) {
    if (document.getElementsByClassName) { 
      return document.getElementsByClassName(className); 
    } else { 
        return document.querySelectorAll('.' + className); 
    } 
}

/*events*/

adview.shapemark.expand = function() { 
    if(typeof(window.do7expand)=='function') do7expand();
    adview.shapemark.animate('forward'); 
};

adview.shapemark.close = function() { 
    if(typeof(window.do7little) == 'function') do7little();
    adview.shapemark.animate('close'); 
};

adview.shapemark.collapse = function() { 
    if(typeof(window.do7little) == 'function') do7little();
    adview.shapemark.animate('backward'); 
};
          
adview.shapemark.animate = function (direction) {
                
    var
        limitTime = 1000,
        limitSize = 550,
        elements = adview.shapemark.getElementsByClassName('shapeMarkLine'),
        eLength = elements.length,
        currentStep = 0,
        step = 5,
        stepDirect = 1,
        animate = setInterval(function() {
            
            for (var i = 0; i < eLength; i++) {

                elements[i].style.width = (direction == 'forward' 
                    ? Math.min(limitSize + adview.shapemark.elems[i].width, adview.shapemark.elems[i].width + currentStep * step)
                    : Math.max(limitSize + adview.shapemark.elems[i].width - currentStep * step, adview.shapemark.elems[i].width)) + 'px';
                    
                if (direction == 'close') {
                    elements[i].style.width = adview.shapemark.elems[i].width + 'px';
                };
                
            };
            
            if (direction != 'close') {
                document.getElementById('shapemark').style.left = (direction == 'forward' ? Math.min(0, -470 + (currentStep * step)) : (currentStep > 13 ? Math.max(-470, 0 - (currentStep - 14) * step) : 0)) + 'px';
            } else {
                document.getElementById('shapemark').style.left = -470 + 'px';
            };
                        
            if (currentStep >= limitTime / step || direction == 'close') clearInterval(animate);
            
            currentStep += stepDirect;
             
        }, step);
        
};

adview.shapemark.checkArticle = function() {
    
    adview.shapemark.art = document.body.id == 'pagetype_art' ? 'artykul' : 'article_body';
    adview.shapemark.art = document.body.className.indexOf('bigart') > - 1 ? 'article_body' : adview.shapemark.art;
    
    var 
        articleCorrect = false,
        readArt = (function() {
            var
                article = document.getElementById(adview.shapemark.art),
                articleHTML = article.innerHTML.replace(/^\s+|\s+$/g,""),
                artResult = articleHTML.split(/(<img.*?>)|(<div class="gazetaVideoPlayer".*>(.*?)<\/iframe><\/div><\/div>)|(<h5>.*?<\/h5><p>.*<\/p>)/),
                newhtml = '',
                arr = artResult.map(function(e,i) {
                    
                    if (typeof e != 'undefined') {
                        var  part = e.replace(/(<\/?[^>]+>)/gi,'').replace(/<br>/g,'').replace(/<!--.*-->/g,'');
                        
                        if ( part.length > 0 && part.length > 400 && !articleCorrect) {
							
                            articleCorrect = true;
                           
                            return e.replace(/^(<br><br>)(.*)|(.*)/,function(_,a,b,c) {
                                return a == '<br><br>'
                                    ? a + '<div id="shapemarkWrap">&nbsp;' + b + '</div>'
                                    : '<div id="shapemarkWrap">&nbsp;' + c + '</div>';
                           });
                        };
                        
                        return e;    
                    };
                   
                }).map(function(el,ind) {
                    if (typeof el != 'undefined') newhtml += el;
                });
                article.innerHTML = newhtml;
        })();
        
    if (articleCorrect) {
    
        /*create elements*/
        adview.shapemark.articleShapeWrap = document.getElementById("shapemarkWrap");
        adview.shapemark.sp1 = document.createElement("div");
        adview.shapemark.shapeType = document.createElement("div");
        adview.shapemark.wrapdiv = document.createElement("div");
        adview.shapemark.adv = document.createElement("div");
        
        /*set id's*/
        adview.shapemark.adv.id = 'shapemark-adv';
        adview.shapemark.wrapdiv.id = "wrap-embed";
        adview.shapemark.sp1.id = "shapemark";
        adview.shapemark.shapeType.id = "shapeType";
        
        /*appends*/
        adview.shapemark.sp1.appendChild(adview.shapemark.wrapdiv);
        adview.shapemark.articleShapeWrap.insertBefore(adview.shapemark.sp1, adview.shapemark.articleShapeWrap.childNodes[0]);
        
        /*append container's*/
        adview.shapemark.articleShapeWrap.insertBefore(adview.shapemark.shapeType,adview.shapemark.articleShapeWrap.childNodes[0]);
        adview.shapemark.articleShapeWrap.insertBefore(adview.shapemark.adv,adview.shapemark.articleShapeWrap.childNodes[0]);
            
    };
    
    /*return true / false - when true shapemark display*/
    return articleCorrect;
}

function putBan(typR){
	var typ=typR;
	if (typR==481) typ=48;
	
	var isRotType = false;
    
    if ((typR == 62 || typR == 63) && typeof banXxByPoz[7] != 'undefined' && typeof adview.shapemark.originalType == 'undefined' ) {

        adview.shapemark.originalType = typR;
        
        if (adview.shapemark.checkArticle()) {
            typ = typR = 7;
        };
        
    }; 
    
	if (typeof banRotXxByPoz != "undefined") {
                if (typeof banRotXxByPoz[typ] != "undefined") {
                        isRotType = true;
                }
        }
	
	if (!isRotType) {
		
		if (typeof banXxByPoz[typ] != "undefined"){
			document.write('<scr'+'ipt type="text/javascript" src="'+banServerFile+'GetBanFile?bxx='+banXxByPoz[typ]+'"><\/script>');
			banViewedXxByPoz+=banXxByPoz[typ]+',';
		} 
	} else {
	            if (getBanObj("banP" + typ)) getBanObj("banP" + typ).style.display="block";  

                document.write('<div id="rot' + banXxByPoz[typ] + '"></div>'); 
                document.write('<div id="rotBottom' + banXxByPoz[typ] + '" style="text-align:right; margin-bottom:5px; "><img src="http://bi.gazeta.pl/i/reklama/rot/strzalki_napis.gif" style="border:0;vertical-align:middle;padding-right:5px;"/><a href="javascript:backBan(' + typ + ');"><img src="http://bi.gazeta.pl/i/reklama/rot/strzalki_left.gif" style="border:0;vertical-align:middle;"/></a><a href="javascript:forwardBan(' + typ + ')"><img src="http://bi.gazeta.pl/i/reklama/rot/strzalki_right.gif" style="border:0;vertical-align:middle;"/></a></div>');
                if (banXxByPoz[typ]){
                        banViewedXxByPoz+=banXxByPoz[typ]+',';
                }
                drawBanner(typ);
                startRotate(typ); 
	}
	
	typyPutBan.push(typR);
}

var trim = function(s) {
    return s.replace(/^\s+|\s+$/g, '');
}

var getElementsByTagClassName = function(source, tagName, className) {
    var tmp = [], result = [], i = 0;
    if (source && source.getElementsByTagName) {
        tmp = source.getElementsByTagName(tagName);
        for (; i < tmp.length; i++) {
            if (tmp[i].className && (' ' + trim(tmp[i].className) + ' ').match(' ' + className + ' ')) {
            	result.push(tmp[i]);
            }
        }
    }
    return result;
}

var adview = adview || {}; 
adview.putBanPassBack = function(typ){

		if (typeof banPassBackByPoz != "undefined" && typeof banPassBackByPoz[typ] != "undefined"){
			var tmpBanPassBackByPoz = banPassBackByPoz[typ].split(',');
			if(trim(tmpBanPassBackByPoz[0]) != '') {
				var banNTmp = getElementsByTagClassName(document, 'div', 'banN' + typ); 
				if(banNTmp != "undefined" && banNTmp.length > 0 && banNTmp[0] != "undefined") {
					if(banNTmp[0].parentNode != "undefined") {
						banNTmp[0].parentNode.removeChild(banNTmp[0]);
					}
				}
				document.write('<scr'+'ipt type="text/javascript" src="'+banServerFile+'GetBanFile?bxx='+tmpBanPassBackByPoz[0]+'"><\/script>');
				banViewedXxByPoz = banViewedXxByPoz.replace(banXxByPoz[typ]+',', '');
				banXxByPoz[typ] = tmpBanPassBackByPoz[0];
				banViewedXxByPoz+=banXxByPoz[typ]+',';
				if(banPassBackByPoz[typ].indexOf(',') > -1) {
					banPassBackByPoz[typ] = banPassBackByPoz[typ].replace(tmpBanPassBackByPoz[0]+',', '');
				}else {
					banPassBackByPoz[typ] = '';
				}
			}else {
				banViewedXxByPoz = banViewedXxByPoz.replace(banXxByPoz[typ]+',', '');
			}
		}else {
			if(typeof banViewedXxByPoz != "undefined" && typeof banXxByPoz != "undefined") {
				banViewedXxByPoz = banViewedXxByPoz.replace(banXxByPoz[typ]+',', '');
			}
		}
};



function countBan(dx){
	var typyWspolne='';
	if(typeof typyMakieta!="undefined"){
		for(var i=0;i<typyPutBan.length;++i){
			if(typyMakieta.indexOf(','+typyPutBan[i]+',')!=-1){
				typyWspolne+=typyPutBan[i]+',';
			}
		}
	}
	
	var slowo='';
	if(typeof slowa!="undefined"){
		slowo=slowa;
	}
	
	var instancja='';
	if(typeof adInst!="undefined"){
		instancja=adInst;
	}
	
	var sessionBan='';
	if(typeof banSessionId!="undefined"){
		sessionBan=banSessionId;
	}
	
	if(typeof dx!="undefined"){
		document.write('<scr'+'ipt type="text/javascript" src="'+banServer+'CountBan?dx='+dx+'&bxx='+banViewedXxByPoz+'&banKey='+banKey+'&xxyEcom='+xxyEcom+'&jsp='+ban_jsp+'&typyWspolne='+typyWspolne+'&slowo='+slowo+'&dir='+ban_dir+'&adInst='+instancja+sessionBan+'"><\/script>');
	}
}

function getBanObj(obj) {
if (document.all) return eval('document.all.'+obj); else if (document.getElementById) return eval("document.getElementById('"+obj+"')"); 
}

function banDoIt(txt) { 
eval(unescape(eval(txt))); 
	// eval(unescape(txt)); 
}

if (typeof banRotXxByPoz != "undefined") {
    document.write('<scr'+'ipt type="text/javascript" src="'+banServerJS+'info/ban/silnikRot.js"><\/script>');
}

function putBanGM(typR){
	putBan(typR)
}

function countBanGM(dx){ 
	countBan(dx);
}

//behaw icon 
adchoicesRollimage = new Array();
adchoicesRollimage[0]= new Image();
adchoicesRollimage[0].src = "http://bi.adview.pl/ads/behicon.png";
adchoicesRollimage[1] = new Image();
adchoicesRollimage[1].src = "http://bi.adview.pl/ads/behinfo.png";

function adchoicesSwapOver(){
  document.adchoice_txt.src = adchoicesRollimage[1].src;return true;
}

function adchoicesSwapBack(){
  document.adchoice_txt.src = adchoicesRollimage[0].src; return true;
}
//end behaw
