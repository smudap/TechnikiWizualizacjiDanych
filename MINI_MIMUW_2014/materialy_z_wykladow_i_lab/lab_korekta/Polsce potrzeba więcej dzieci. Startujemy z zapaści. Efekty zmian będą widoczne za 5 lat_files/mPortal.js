/*
**  areYoufeaturePhone() v1.0.2
**  showhide.js
**  gazeta_pl.namespace v1.1.0 
**  winiety sponsorowane v0.1.0 
**      jQuery v.1.7.1
**      winiety.0.1.0.js 
**  googleAnalytics v.1.0.3
**  GA config
**  Gallery v0.2.0
**  init
*/


/****************************************
 *  mPortal
 ****************************************/


/*
**  matchMedia pollyfill
**  classList.js
**  gazeta_pl.namespace v1.1.0
**  iScroll v4.2.5
**  JSONP
**  makeURI
**  readParam
**  parseURI
**  jquery.scrollTo v1.4.3.1
**  jQuery blockUI plugin v2.43
**  jQuery PubSub v0.1.0
**  Gazeta.pl jQuery plugin, Version: 1.0
**  requestAnimationFrame polyfill by Erik Möller
**  gazeta_pl.mobi.Poll - v0.1.1 - 2012-12-03 
**  Handlebars v1.0.beta.6 
**  ShowBox v0.1.4
**  navigationManager v1.0.0 
**  jspaginator v1.0.3 
**  Font Resizer v0.1.1 
**  gazeta_pl.mobi.RTC - v0.1.1 - 2012-06-12
**  gazeta_pl.mobi.RTC.LoadOldEntries v0.1.0
**  gazeta_pl.mobi.RTC.Scores v0.1.0
**  gazeta_pl.mobi.RTC.Related v0.1.0
**  article.more.button v1.0.0
**  mod_comments.more.button v1.0.0
**  imagesHighResolutionManager v1.0.0
**  whoTheHeckAreYou v1.0.0
**  json2.js
**  runOnce() v.0.0.1
**  PlayerHTML5 v0.1.4
**  videoContainerResizer v1.0.1
**  Utils v0.1.1
**  CookieManager v0.2.2
**  IndexDate v0.1.4
**  AJAXAccordion v0.1.4
**  localManager v0.1.0
**  movieManager v0.1.0
**  fileReaderContest v0.1.0 
**  ctnlValidator v0.1.0
**  PhotoFormat
**  BanInWeekend
**  piano
**  gemius heatmap
*/


(function (g, d, u){

// AreYouFeaturePhone v1.0.2
(function (){
    var areYoufeaturePhone = function() {
        var
            attrClass,
            strSeparator,
            strFeaturePhone,
            strOperaMini,
            addClass,
            areYouSmartPhoneOrTabletOrDesktop,
            areYouOperaMini,
            ret;
        
        strFeaturePhone = "feature_phone";
        strOperaMini = "opera_mini";
        strSeparator = " ";

        addClass = function() {
            attrClass = document.body.getAttribute("class");

            if (!areYouSmartPhoneOrTabletOrDesktop()) {
                attrClass += attrClass.length ? strSeparator + strFeaturePhone : strFeaturePhone;
                ret = true;
            }

            if (areYouOperaMini()) {
                attrClass += attrClass.length ? strSeparator + strOperaMini : strOperaMini;
                ret = true;
            }

            document.body.setAttribute("class", attrClass);
        };

        areYouSmartPhoneOrTabletOrDesktop = function() {
            var reg;

            reg = /ipod|iphone|ipad|android|win32|win|mac\sos\sx|linux/ig;

            return reg.test(navigator.userAgent);
        };

        areYouOperaMini = function() {
            var regOperaMini = /opera\smini/ig;

            return regOperaMini.test(navigator.userAgent);
        };

        addClass();
        g.featurePhone = ret ? true : false;

        return ret;
    };

    g.areYoufeaturePhone = areYoufeaturePhone;
}());

/* showhide.js */
function addEvent(c,b,a){if(c.addEventListener){c.addEventListener(b,a,false)}else{if(c.attachEvent){c["e"+b+a]=a;c[b+a]=function(){c["e"+b+a](window.event)};c.attachEvent("on"+b,c[b+a])}}}function PokazAkapit(g,f,c){var d;if(window.event&&window.event.srcElement){d=window.event.srcElement}if(g&&g.target){d=g.target}if(!d){return}(g.preventDefault)?g.preventDefault():(g.returnValue=false);var a=document.getElementById(f);if(!a){return}var b=a.style.display=="none";a.style.display=b?"block":"none";if(c){d.className=b?"fold":"expand"}}function Laduj(){var c=document.getElementById("link");var b=document.getElementById("nav_txt");if(b!=null){b.setAttribute("style","display: none;");var a=document.getElementById("nav2");if(a){a.setAttribute("style","display: block;")}addEvent(c,"click",function(d){PokazAkapit(d,"nav_txt",true);PokazAkapit(d,"nav2",false)})}}addEvent(window,"load",Laduj);

/* gazeta_pl.namespace v1.1.0 */
(function(b){var a=function(d,g,h){var e=d.split("."),h=gazeta_pl||h||{},l=h,f=0,c=e.length,j=function(){for(f=0;f<c;f+=1){if("undefined"===typeof h[e[f]]){h[e[f]]={}}h=h[e[f]]}},k=function(){var i;f=0;h=l;for(f=0;f<c;f+=1){if((f+1)===c){h[e[f]]=g}else{h=h[e[f]]}}};j();if(g){k()}};b.gazeta_pl=b.gazeta_pl||{};b.gazeta_pl.namespace=a}(window));

/* winiety sponsorowane v0.1.0 */
(function (g, d, u){
    /*! jQuery v1.7.1 jquery.com | jquery.org/license */
    (function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
    f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
    {for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);

    /* winiety.0.1.0.js */
    (function (g, $){
        var winietySponsorowane = function() {
            var
                $winieta = $("#winieta"),
                $bannerWrapper = $winieta.find(".reklama"),
                $banner = $winieta.find(".reklama > *").not("script"),

                isBanner = function() {
                    return !!$banner.length;
                };

            if (isBanner()) {
                $winieta.addClass("is_banner");
                $bannerWrapper.addClass("sponsor big");
            }
        };

        g.gazeta_pl.namespace("mobi.adserver.winietySponsorowane", winietySponsorowane);
    }(window, jQuery));
}(window, document));

/* googleAnalytics v1.0.3 */
(function (g, d, $){
    "use strict";

    var googleAnalytics = {
        init: function() {
            var
                self = this,
                defaultAccountID = "UA-426268-61",
                addGoogleAnalyticsScript,
                createGoogleAnalyticsSetup;

            this.account = this.config.account || defaultAccountID;
            this.links = this.config.links;
            this.events = this.config.events;
            this.domain = g.location.host;
            this.dontTrack = this.config.dontTrack;

            addGoogleAnalyticsScript = function() {
                var
                    ga = document.createElement('script'),
                    s = document.getElementsByTagName('script')[0];

                ga.type = 'text/javascript'; 
                ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                s.parentNode.insertBefore(ga, s);
            };

            createGoogleAnalyticsSetup = function() {
                g._gaq = g._gaq || [];
                g._gaq.push(["_setAccount", self.account]);
                g._gaq.push(["_setDomainName", self.domain]);
                g._gaq.push(["_setAllowLinker", true]);
                g._gaq.push(["_trackPageview"]);
            };


            this.cache();

            if (!this.dependencies()) {
                return;
            }

            createGoogleAnalyticsSetup();
            addGoogleAnalyticsScript();

            this.bindEvents();
        },

        cache: function() {
            var
                self,
                prepareEventsToTrack;
            
            self = googleAnalytics;

            prepareEventsToTrack = function() {
                var
                    _ret,
                    $elements,
                    isElementNotEmpty;

                isElementNotEmpty = function() {
                    return $elements.length;
                };

                if ($.isArray(self.events)) {
                    $.each(self.events, function(_index, _elements) {
                        $elements = $(_elements.selector);
                        $elements.data("category", _elements.category);
                        $elements.data("action", _elements.action);
                        $elements.data("opt_label", _elements.opt_label);
                        $elements.data("opt_value", _elements.opt_value);
                        $elements.data("opt_noninteraction", _elements.opt_noninteraction);

                        if (_ret && _ret.length && isElementNotEmpty()) {
                            _ret = _ret.add($elements);
                        } else if (isElementNotEmpty()) {
                            _ret = $elements;
                        }
                    });
                } else {
                    _ret = null;
                }

                return _ret;
            };

            this.$links = $(this.links).not(this.dontTrack);
            this.$events = prepareEventsToTrack() || $("");
        },

        dependencies: function() {
            return true;
        },

        bindEvents: function() {
            var self = googleAnalytics;

            this.$links.on("click", this.trackLink);

            if (this.$events && this.$events.length) {
                this.$events.on("click", self.trackEvents);
            }
        },

        trackLink: function(event) {
            event.preventDefault();

            g._gaq.push(["_link", $(this).attr("href")]);
        },

        trackEvents: function(event) {
            var
                $this,
                category,
                action,
                opt_label,
                opt_value,
                opt_noninteraction;

            $this = $(this);
            category = $this.data("category");
            action = $this.data("action");
            opt_label = $this.data("opt_label");
            opt_value = $this.data("opt_value");
            opt_noninteraction = $this.data("opt_noninteraction");

            g._gaq.push(["_trackEvent", category, action, opt_label, opt_value, opt_noninteraction]);
        },

        currentDomainName: function (){
            return g.gazeta_pl.mobi.ga.domain.replace("http://", "");
        }
    };

    g.gazeta_pl.namespace("mobi.googleAnalytics", googleAnalytics);
    g.gazeta_pl.namespace("mobi.ga", googleAnalytics);
}(window, document, jQuery, undefined));

// GA config 
(function (g, d, $, u){
    var
        strTrackEvent = "_trackEvent",

        articles = {
            init: function() {
                var
                    config,
                    currentDomain,
                    currentDomainName,
                    trackEventsConfig,
                    trackLinksConfig;
                
                (function (){
                    var splittedDomain;

                    currentDomain = g.location.href.match(/http(s?):\/\/([\w]+\.){1}([\w-]+\.?)+/);
                    currentDomain = currentDomain[0];
                    currentDomainName = (function (){
                        var str = currentDomain.substr(9);

                        return str.substr(0, (str.length - str.match(/\.([\w]+\.?)+/)[0].length));
                    }());

                    splittedDomain = currentDomain.split("//");
                    currentDomain = splittedDomain[1];
                }());

                trackLinksConfig = (function() {
                    var
                        arr,
                        selector;

                    arr = [
                        "#nav",
                        "#winieta > ul.menu",
                        "#footer",                        
                        "div.mod_zi_related > div.body",
                        "#artykul"
                    ];

                    selector = "a:not([href*='" + currentDomainName + "'])";
                    return arr.join(" " + selector + ", ") + " " + selector;
                }()); 

                trackEventsConfig = [
                    /*more/article*/ {
                        selector: "#article_footer a.more",
                        category: "More",
                        action: "Article"
                    },

                    /*more/Comment*/ {
                        selector: ".mod_comments_list a.more",
                        category: "More",
                        action: "Comment"
                    },

                    /*fb*/ {
                        selector: ".mod_fb_share a",
                        category: "Facebook",
                        action: "Share"
                    },

                    /*fontResizer*/ 
                        /*normal*/ {
                            selector: "#FONT_RESIZER_normalSize",
                            category: "FontResizer",
                            action: "normalSize"
                        },
            
                        /*big*/ {
                            selector: "#FONT_RESIZER_bigSize",
                            category: "FontResizer",
                            action: "bigSize"
                        },
            
                        /*extraBig*/ {
                            selector: "#FONT_RESIZER_extraBigSize",
                            category: "FontResizer",
                            action: "extraBigSize"
                        }
                ];

                g.gazeta_pl.mobi.ga.config.links = trackLinksConfig;
                g.gazeta_pl.mobi.ga.config.events = trackEventsConfig;
                g.gazeta_pl.mobi.ga.config.dontTrack = '.banTypeImage';

                g.gazeta_pl.mobi.ga.domain = currentDomain;
            } 
        },

        hp = {
            init: function() {
                var
                    $rozsuwaneboxy = $("#otherSites"),
                    trackEvents,
                    addParam;                    

                trackEvents = function (){
                    var $rozsuwaneboxyButtons;

                    $rozsuwaneboxyButtons = $rozsuwaneboxy.children("li").children("a");
                    $rozsuwaneboxyButtons.each(function() {

                        var
                            o = {},
                            $this = $(this);

                        o.category = "rozwijanie boxa";
                        o.opt_label = $this.text().toLowerCase();

                        $this.on("click", function() {    
                            o.action = $this.parent().hasClass("active") ? "zwijanie": "rozwijanie";
                            g._gaq.push(["_trackEvent", o.category, o.action, o.opt_label]);                                
                        });
                    });
                };

                addParam = function() {

                    var
                        param,
                        $links,
                        $mainTopicLinks,
                        $locals,
                        addBoxNameAsDataParam,
                        addCampaignParameterForLocals,
                        parseAndAddParam;

                    addBoxNameAsDataParam = function() {
                        var
                            boxName,
                            $this;

                        $this = $(this);

                        boxName = $this.parents("li:not('.article, .entry')").children("a").text().toLowerCase();
                        //boxName = $this.parents("li:not('.article')").children("a").text().toLowerCase();
                        boxName = encodeURIComponent(boxName.replace(/\./ig, "_"));
                        $this.data("boxName", boxName);
                        console.log(boxName)
                    },

                    addCampaignParameterForLocals = function() {
                        var boxName = "lokale";

                        boxName = encodeURIComponent(boxName.replace(/\./ig, "_"));
                        $locals.data("boxName", boxName);
                    };

                    parseAndAddParam = function($o) {
                        var
                            url,
                            boxName;

                        boxName = $o.data("boxName") || "maintopic";

                        if (/styl(.*)ycia/.test(boxName)) {
                            boxName = "styl_zycia";
                        }
                        if (/wiadomo(.*)ci/.test(boxName)) {
                            boxName = "wiadomosci";
                        }

                        url = $o.attr("href");
                        url = /\?/.test(url) ? url + "&" + param : url + "?" + param;
                        url = url.replace("{{BOX_NAME}}", boxName);
                        $o.attr("href", url);
                    };

                    param = "utm_source=m.gazeta.pl&utm_medium=testbox&utm_campaign={{BOX_NAME}}";
                    $mainTopicLinks = $(".mammoth a, .mammoth + .index a, .mt a");
                    $links = $rozsuwaneboxy.find("ul.articles a");
                    $locals = $(".mod_local a");

                    $mod_uzr = $(".articles_section a"); // zajawka reczna
                    $mod_uzr.data("boxName", "weekend");
                    $najpop = $("#otherSitesNajpop a"); // najpopularniejsze
                    $najpop.data("boxName", "najpopularniejsze");
                    $friday_movies = $(".mod_films a"); // filmowe piatki
                    $friday_movies.data("boxName", "filmowe");
                    $forehead = $(".index a").not($('#geo.index a')); // czolka
                    $forehead.data("boxName", "czolka");
                    addCampaignParameterForLocals();

                    $links
                        .each(addBoxNameAsDataParam)
                        .add($mainTopicLinks)
                        .add($locals)
                        .add($mod_uzr)
                        .add($najpop)
                        .add($friday_movies)
                        .add($forehead)
                        .each(function(){
                            var $this = $(this);

                            if ($this.attr("href").indexOf("utm_source=m.gazeta.pl&utm_medium=testbox&utm_campaign=") === -1) {
                                parseAndAddParam($this);                        
                            }
                        });    
                                          
                };
                test = function (e) {
                    console.log(e.data.ajax);
                }

                trackEvents();
                addParam();    

                $(g).on("AJAXAccordion/data/load", addParam);                

                g.gazeta_pl.mobi.ga.config.account = "UA-426268-50";
            },

            dependencies: function() {
                var isHP = function() {
                    return (/(m\.gazeta\.pl\/0,0\.html)|(HP)/g).test(g.location.href);
                }

                return isHP();
            }
        },

        relatedArticles = {
            init: function(){
                this.trackEvents();
            },

            trackEvents: function() {
                var
                    $relatedArticles = $(".mod_zi_related"),
                    strBtnArrowLeft = "#articlesPaginator li:first-child a",
                    strBtnArrowRight = "#articlesPaginator li:last-child a",
                    strArticleLink = ".article .body a",
                    strNajpopularniejsze = "Najpopularniejsze";

                $relatedArticles.on("click", strBtnArrowLeft, function() {
                    g._gaq.push([strTrackEvent, strNajpopularniejsze, g.gazeta_pl.mobi.ga.domain, "strzalka lewo", u, true]);
                });

                $relatedArticles.on("click", strBtnArrowRight, function() {
                    g._gaq.push([strTrackEvent, strNajpopularniejsze, g.gazeta_pl.mobi.ga.domain, "strzalka prawo", u, true]);
                });

                $relatedArticles.on("click", strArticleLink, function() {
                    g._gaq.push([strTrackEvent, strNajpopularniejsze + " linki", g.gazeta_pl.mobi.ga.domain, $(this).attr("href"), u, true]);
                });
            }
        },

        articlesPhotos = {
            init: function(){
                this.trackEvents();
            },

            trackEvents: function(){
                var
                    $articlesHeader = $("#article_header"),
                    strBtnArrowLeft = "#imagesPaginator li:first-child a",
                    strBtnArrowRight = "#imagesPaginator li:last-child a",
                    strZdjecia = "Zdjecia";

                $articlesHeader.on("click", strBtnArrowLeft, function() {
                    g._gaq.push([strTrackEvent, strZdjecia, g.gazeta_pl.mobi.ga.domain, "strzalka lewo", u, true]);
                });

                $articlesHeader.on("click", strBtnArrowRight, function() {
                    g._gaq.push([strTrackEvent, strZdjecia, g.gazeta_pl.mobi.ga.domain, "strzalka prawo", u, true]);
                });
            }
        },

        agora = {
            init: function(){
                g.gazeta_pl.mobi.ga.config.account = "UA-426268-1";
            },

            dependencies: function(){
                return (/mobi\.agora\.pl/ig).test(location.href);
            }
        },

        zdrowie = {
            init: function(){
                this.trackEvents();
            },

            trackEvents: function(){
                this.trackBtns();
                this.trackMT();
            },

            dependencies: function(){
                return (/m\.zdrowie\.gazeta\.pl/ig).test(location.href);
            },

            trackBtns: function() {
                var $btns = $("#bottom_btns").find(".btn");

                $btns.on("click", function() {
                    g._gaq.push([strTrackEvent, "m.zdrowie.gazeta.pl", $(this).find("a").text().toLowerCase(), u, u, true]);
                });
            },

            trackMT: function(){
                var 
                    strMTBtnLeft = "#paginator_left",
                    strMTBtnRight = "#paginator_right";

                $("#cont")
                    .on("click", strMTBtnLeft, function() {
                        g._gaq.push([strTrackEvent, "MT", g.gazeta_pl.mobi.ga.domain, "strzalka lewo", u, true]);
                    })
                    .on("click", strMTBtnRight, function() {
                        g._gaq.push([strTrackEvent, "MT", g.gazeta_pl.mobi.ga.domain, "strzalka prawo", u, true]);
                    });
            }
        };

    g.gazeta_pl.namespace("mobi.ga.config.articles", articles);
    g.gazeta_pl.namespace("mobi.ga.config.hp", hp);
    g.gazeta_pl.namespace("mobi.ga.config.relatedArticles", relatedArticles);
    g.gazeta_pl.namespace("mobi.ga.config.articlesPhotos", articlesPhotos);
    g.gazeta_pl.namespace("mobi.ga.config.agora", agora);
    g.gazeta_pl.namespace("mobi.ga.config.zdrowie", zdrowie);
}(window, document, jQuery));

/* Gallery v0.2.0 */
(function (g, d, $){
    var Gallery = {
        loadImage: function() {
            var 
                $container = $("#photo_container"),
                pictureFormat = Gallery.preparePhotoFormatByScreenSize(d.documentElement.clientWidth),
                url = g.gazeta_pl.mobi.photoUrl,
                formatFromUrl = null,

                isOldBrowser = function() {
                    return /symbian/ig.test(navigator.userAgent);
                },
                
                parseFormatFromUrl = function() {
                    var
                        separator = "/",
                        format = "",
                        i = null,
                        tmp = null;

                    tmp = url.substr(url.lastIndexOf(separator));
                    tmp = tmp.split(/,|\./)[0].substr(2);

                    for (i = tmp.length - 1; i >= 0; i--) {
                        if (!$.isNumeric(tmp[i])) {
                            format += tmp[i];
                        }
                    }

                    if (!format) {
                        format = null;
                    }

                    return format;
                },

                changeFormat = function(url, oldFormat, newFormat) {
                    var
                        separator = "/",
                        fileName = url.substr(url.lastIndexOf(separator) + 1),
                        newFileName = fileName.replace(oldFormat, newFormat);

                    return url.replace(fileName, newFileName);
                },

                insertImage = function(url) {
                    var
                        $img = isOldBrowser() ? $(d.createElement("img")).attr("src", url) : $("<img />", {src: url }),
                        $imageDescription = $container.children("p");

                    $imageDescription.length ? $img.insertBefore($imageDescription) : $img.appendTo($container);
                },

                dependencies = function() {
                    return $container.length && url;
                };

            if (dependencies()) {
                formatFromUrl = parseFormatFromUrl();

                if (formatFromUrl !== pictureFormat) {
                    url = changeFormat(url, formatFromUrl, pictureFormat);
                } 

                insertImage(url);
            }
        },
        
        preparePhotoFormatByScreenSize: function(screenWidth) {
            var
                ret = "",
                formats = {
                    tablet: "P",
                    smartphone: "Q",
                    featurephone: "M"
                };

            ret = formats.featurephone;            

            if (screenWidth >= 600) {
                ret = formats.tablet;
            } else if (screenWidth >= 320) {
                ret = formats.smartphone;
            } 
            
            return ret;
        }
    };

    g.gazeta_pl.namespace("mobi.Gallery");
    g.gazeta_pl.mobi.Gallery = Gallery;
}(window, document, jQuery));

// init
$(function() {
    var config = g.gazeta_pl.mobi.ga.config || {};

    if (g.gazeta_pl.mobi.ga.config.agora.dependencies()) {
        g.gazeta_pl.mobi.ga.config.agora.init();
    }

    else if (g.gazeta_pl.mobi.ga.config.zdrowie.dependencies()) {
        g.gazeta_pl.mobi.ga.config.zdrowie.init();
    }

    else if (g.gazeta_pl.mobi.ga.config.hp.dependencies()) {
        g.gazeta_pl.mobi.ga.config.hp.init();
    }

    else {
        g.gazeta_pl.mobi.ga.config.articles.init();
        g.gazeta_pl.mobi.ga.config.relatedArticles.init();
        g.gazeta_pl.mobi.ga.config.articlesPhotos.init();
    }

    g.gazeta_pl.mobi.ga.init();

    g.gazeta_pl.mobi.adserver.winietySponsorowane();
    g.gazeta_pl.mobi.Gallery.loadImage();
});

g.areYoufeaturePhone();



/************************************** 
 * mPortal 
 **************************************/


if (typeof g.featurePhone !== "undefined" && g.featurePhone !== null && g.featurePhone === true) {
    return;
}

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
window.matchMedia=window.matchMedia||(function(e,f){var c,a=e.documentElement,b=a.firstElementChild||a.firstChild,d=e.createElement("body"),g=e.createElement("div");g.id="mq-test-1";g.style.cssText="position:absolute;top:-100em";d.style.background="none";d.appendChild(g);return function(h){g.innerHTML='&shy;<style media="'+h+'"> #mq-test-1 { width: 42px; }</style>';a.insertBefore(d,b);c=g.offsetWidth===42;a.removeChild(d);return{matches:c,media:h}}}(document));

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if(typeof document!=="undefined"&&!("classList" in document.createElement("a"))){(function(j){if(!("HTMLElement" in j)&&!("Element" in j)){return}var a="classList",f="prototype",m=(j.HTMLElement||j.Element)[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.className),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.className=this.toString()}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};


/* gazeta_pl.namespace v1.1.0 */
(function(b){var a=function(d,g,h){var e=d.split("."),h=gazeta_pl||h||{},l=h,f=0,c=e.length,j=function(){for(f=0;f<c;f+=1){if("undefined"===typeof h[e[f]]){h[e[f]]={}}h=h[e[f]]}},k=function(){var i;f=0;h=l;for(f=0;f<c;f+=1){if((f+1)===c){h[e[f]]=g}else{h=h[e[f]]}}};j();if(g){k()}};b.gazeta_pl=b.gazeta_pl||{};b.gazeta_pl.namespace=a}(window));


/*!
 * iScroll v4.2.5 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function(i,E){var u=Math,n=E.createElement("div").style,z=(function(){var H="t,webkitT,MozT,msT,OT".split(","),G,F=0,m=H.length;for(;F<m;F++){G=H[F]+"ransform";if(G in n){return H[F].substr(0,H[F].length-1)}}return false})(),D=z?"-"+z.toLowerCase()+"-":"",l=s("transform"),x=s("transitionProperty"),k=s("transitionDuration"),o=s("transformOrigin"),B=s("transitionTimingFunction"),e=s("transitionDelay"),A=(/android/gi).test(navigator.appVersion),h=(/iphone|ipad/gi).test(navigator.appVersion),r=(/hp-tablet/gi).test(navigator.appVersion),j=s("perspective") in n,y="ontouchstart" in i&&!r,d=z!==false,f=s("transition") in n,g="onorientationchange" in i?"orientationchange":"resize",b=y?"touchstart":"mousedown",t=y?"touchmove":"mousemove",c=y?"touchend":"mouseup",w=y?"touchcancel":"mouseup",a=(function(){if(z===false){return false}var m={"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"otransitionend",ms:"MSTransitionEnd"};return m[z]})(),q=(function(){return i.requestAnimationFrame||i.webkitRequestAnimationFrame||i.mozRequestAnimationFrame||i.oRequestAnimationFrame||i.msRequestAnimationFrame||function(m){return setTimeout(m,1)}})(),p=(function(){return i.cancelRequestAnimationFrame||i.webkitCancelAnimationFrame||i.webkitCancelRequestAnimationFrame||i.mozCancelRequestAnimationFrame||i.oCancelRequestAnimationFrame||i.msCancelRequestAnimationFrame||clearTimeout})(),C=j?" translateZ(0)":"",v=function(G,m){var H=this,F;H.wrapper=typeof G=="object"?G:E.getElementById(G);H.wrapper.style.overflow="hidden";H.scroller=H.wrapper.children[0];H.options={hScroll:true,vScroll:true,x:0,y:0,bounce:true,bounceLock:false,momentum:true,lockDirection:true,useTransform:true,useTransition:false,topOffset:0,checkDOMChanges:false,handleClick:true,hScrollbar:true,vScrollbar:true,fixedScrollbar:A,hideScrollbar:h,fadeScrollbar:h&&j,scrollbarClass:"",zoom:false,zoomMin:1,zoomMax:4,doubleTapZoom:2,wheelAction:"scroll",snap:false,snapThreshold:1,onRefresh:null,onBeforeScrollStart:function(I){I.preventDefault()},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null,onZoomStart:null,onZoom:null,onZoomEnd:null};for(F in m){H.options[F]=m[F]}H.x=H.options.x;H.y=H.options.y;H.options.useTransform=d&&H.options.useTransform;H.options.hScrollbar=H.options.hScroll&&H.options.hScrollbar;H.options.vScrollbar=H.options.vScroll&&H.options.vScrollbar;H.options.zoom=H.options.useTransform&&H.options.zoom;H.options.useTransition=f&&H.options.useTransition;if(H.options.zoom&&A){C=""}H.scroller.style[x]=H.options.useTransform?D+"transform":"top left";H.scroller.style[k]="0";H.scroller.style[o]="0 0";if(H.options.useTransition){H.scroller.style[B]="cubic-bezier(0.33,0.66,0.66,1)"}if(H.options.useTransform){H.scroller.style[l]="translate("+H.x+"px,"+H.y+"px)"+C}else{H.scroller.style.cssText+=";position:absolute;top:"+H.y+"px;left:"+H.x+"px"}if(H.options.useTransition){H.options.fixedScrollbar=true}H.refresh();H._bind(g,i);H._bind(b);if(!y){if(H.options.wheelAction!="none"){H._bind("DOMMouseScroll");H._bind("mousewheel")}}if(H.options.checkDOMChanges){H.checkDOMTime=setInterval(function(){H._checkDOMChanges()},500)}};v.prototype={enabled:true,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,wheelZoomCount:0,handleEvent:function(F){var m=this;switch(F.type){case b:if(!y&&F.button!==0){return}m._start(F);break;case t:m._move(F);break;case c:case w:m._end(F);break;case g:m._resize();break;case"DOMMouseScroll":case"mousewheel":m._wheel(F);break;case a:m._transitionEnd(F);break}},_checkDOMChanges:function(){if(this.moved||this.zoomed||this.animating||(this.scrollerW==this.scroller.offsetWidth*this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale)){return}this.refresh()},_scrollbar:function(m){var G=this,F;if(!G[m+"Scrollbar"]){if(G[m+"ScrollbarWrapper"]){if(d){G[m+"ScrollbarIndicator"].style[l]=""}G[m+"ScrollbarWrapper"].parentNode.removeChild(G[m+"ScrollbarWrapper"]);G[m+"ScrollbarWrapper"]=null;G[m+"ScrollbarIndicator"]=null}return}if(!G[m+"ScrollbarWrapper"]){F=E.createElement("div");if(G.options.scrollbarClass){F.className=G.options.scrollbarClass+m.toUpperCase()}else{F.style.cssText="position:absolute;z-index:100;"+(m=="h"?"height:7px;bottom:1px;left:2px;right:"+(G.vScrollbar?"7":"2")+"px":"width:7px;bottom:"+(G.hScrollbar?"7":"2")+"px;top:2px;right:1px")}F.style.cssText+=";pointer-events:none;"+D+"transition-property:opacity;"+D+"transition-duration:"+(G.options.fadeScrollbar?"350ms":"0")+";overflow:hidden;opacity:"+(G.options.hideScrollbar?"0":"1");G.wrapper.appendChild(F);G[m+"ScrollbarWrapper"]=F;F=E.createElement("div");if(!G.options.scrollbarClass){F.style.cssText="position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);"+D+"background-clip:padding-box;"+D+"box-sizing:border-box;"+(m=="h"?"height:100%":"width:100%")+";"+D+"border-radius:3px;border-radius:3px"}F.style.cssText+=";pointer-events:none;"+D+"transition-property:"+D+"transform;"+D+"transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);"+D+"transition-duration:0;"+D+"transform: translate(0,0)"+C;if(G.options.useTransition){F.style.cssText+=";"+D+"transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"}G[m+"ScrollbarWrapper"].appendChild(F);G[m+"ScrollbarIndicator"]=F}if(m=="h"){G.hScrollbarSize=G.hScrollbarWrapper.clientWidth;G.hScrollbarIndicatorSize=u.max(u.round(G.hScrollbarSize*G.hScrollbarSize/G.scrollerW),8);G.hScrollbarIndicator.style.width=G.hScrollbarIndicatorSize+"px";G.hScrollbarMaxScroll=G.hScrollbarSize-G.hScrollbarIndicatorSize;G.hScrollbarProp=G.hScrollbarMaxScroll/G.maxScrollX}else{G.vScrollbarSize=G.vScrollbarWrapper.clientHeight;G.vScrollbarIndicatorSize=u.max(u.round(G.vScrollbarSize*G.vScrollbarSize/G.scrollerH),8);G.vScrollbarIndicator.style.height=G.vScrollbarIndicatorSize+"px";G.vScrollbarMaxScroll=G.vScrollbarSize-G.vScrollbarIndicatorSize;G.vScrollbarProp=G.vScrollbarMaxScroll/G.maxScrollY}G._scrollbarPos(m,true)},_resize:function(){var m=this;setTimeout(function(){m.refresh()},A?200:0)},_pos:function(m,F){if(this.zoomed){return}m=this.hScroll?m:0;F=this.vScroll?F:0;if(this.options.useTransform){this.scroller.style[l]="translate("+m+"px,"+F+"px) scale("+this.scale+")"+C}else{m=u.round(m);F=u.round(F);this.scroller.style.left=m+"px";this.scroller.style.top=F+"px"}this.x=m;this.y=F;this._scrollbarPos("h");this._scrollbarPos("v")},_scrollbarPos:function(m,H){var G=this,I=m=="h"?G.x:G.y,F;if(!G[m+"Scrollbar"]){return}I=G[m+"ScrollbarProp"]*I;if(I<0){if(!G.options.fixedScrollbar){F=G[m+"ScrollbarIndicatorSize"]+u.round(I*3);if(F<8){F=8}G[m+"ScrollbarIndicator"].style[m=="h"?"width":"height"]=F+"px"}I=0}else{if(I>G[m+"ScrollbarMaxScroll"]){if(!G.options.fixedScrollbar){F=G[m+"ScrollbarIndicatorSize"]-u.round((I-G[m+"ScrollbarMaxScroll"])*3);if(F<8){F=8}G[m+"ScrollbarIndicator"].style[m=="h"?"width":"height"]=F+"px";I=G[m+"ScrollbarMaxScroll"]+(G[m+"ScrollbarIndicatorSize"]-F)}else{I=G[m+"ScrollbarMaxScroll"]}}}G[m+"ScrollbarWrapper"].style[e]="0";G[m+"ScrollbarWrapper"].style.opacity=H&&G.options.hideScrollbar?"0":"1";G[m+"ScrollbarIndicator"].style[l]="translate("+(m=="h"?I+"px,0)":"0,"+I+"px)")+C},_start:function(K){var J=this,F=y?K.touches[0]:K,G,m,L,I,H;if(!J.enabled){return}if(J.options.onBeforeScrollStart){J.options.onBeforeScrollStart.call(J,K)}if(J.options.useTransition||J.options.zoom){J._transitionTime(0)}J.moved=false;J.animating=false;J.zoomed=false;J.distX=0;J.distY=0;J.absDistX=0;J.absDistY=0;J.dirX=0;J.dirY=0;if(J.options.zoom&&y&&K.touches.length>1){I=u.abs(K.touches[0].pageX-K.touches[1].pageX);H=u.abs(K.touches[0].pageY-K.touches[1].pageY);J.touchesDistStart=u.sqrt(I*I+H*H);J.originX=u.abs(K.touches[0].pageX+K.touches[1].pageX-J.wrapperOffsetLeft*2)/2-J.x;J.originY=u.abs(K.touches[0].pageY+K.touches[1].pageY-J.wrapperOffsetTop*2)/2-J.y;if(J.options.onZoomStart){J.options.onZoomStart.call(J,K)}}if(J.options.momentum){if(J.options.useTransform){G=getComputedStyle(J.scroller,null)[l].replace(/[^0-9\-.,]/g,"").split(",");m=+(G[12]||G[4]);L=+(G[13]||G[5])}else{m=+getComputedStyle(J.scroller,null).left.replace(/[^0-9-]/g,"");L=+getComputedStyle(J.scroller,null).top.replace(/[^0-9-]/g,"")}if(m!=J.x||L!=J.y){if(J.options.useTransition){J._unbind(a)}else{p(J.aniTime)}J.steps=[];J._pos(m,L);if(J.options.onScrollEnd){J.options.onScrollEnd.call(J)}}}J.absStartX=J.x;J.absStartY=J.y;J.startX=J.x;J.startY=J.y;J.pointX=F.pageX;J.pointY=F.pageY;J.startTime=K.timeStamp||Date.now();if(J.options.onScrollStart){J.options.onScrollStart.call(J,K)}J._bind(t,i);J._bind(c,i);J._bind(w,i)},_move:function(M){var K=this,N=y?M.touches[0]:M,I=N.pageX-K.pointX,G=N.pageY-K.pointY,m=K.x+I,O=K.y+G,J,H,F,L=M.timeStamp||Date.now();if(K.options.onBeforeScrollMove){K.options.onBeforeScrollMove.call(K,M)}if(K.options.zoom&&y&&M.touches.length>1){J=u.abs(M.touches[0].pageX-M.touches[1].pageX);H=u.abs(M.touches[0].pageY-M.touches[1].pageY);K.touchesDist=u.sqrt(J*J+H*H);K.zoomed=true;F=1/K.touchesDistStart*K.touchesDist*this.scale;if(F<K.options.zoomMin){F=0.5*K.options.zoomMin*Math.pow(2,F/K.options.zoomMin)}else{if(F>K.options.zoomMax){F=2*K.options.zoomMax*Math.pow(0.5,K.options.zoomMax/F)}}K.lastScale=F/this.scale;m=this.originX-this.originX*K.lastScale+this.x,O=this.originY-this.originY*K.lastScale+this.y;this.scroller.style[l]="translate("+m+"px,"+O+"px) scale("+F+")"+C;if(K.options.onZoom){K.options.onZoom.call(K,M)}return}K.pointX=N.pageX;K.pointY=N.pageY;if(m>0||m<K.maxScrollX){m=K.options.bounce?K.x+(I/2):m>=0||K.maxScrollX>=0?0:K.maxScrollX}if(O>K.minScrollY||O<K.maxScrollY){O=K.options.bounce?K.y+(G/2):O>=K.minScrollY||K.maxScrollY>=0?K.minScrollY:K.maxScrollY}K.distX+=I;K.distY+=G;K.absDistX=u.abs(K.distX);K.absDistY=u.abs(K.distY);if(K.absDistX<6&&K.absDistY<6){return}if(K.options.lockDirection){if(K.absDistX>K.absDistY+5){O=K.y;G=0}else{if(K.absDistY>K.absDistX+5){m=K.x;I=0}}}K.moved=true;K._pos(m,O);K.dirX=I>0?-1:I<0?1:0;K.dirY=G>0?-1:G<0?1:0;if(L-K.startTime>300){K.startTime=L;K.startX=K.x;K.startY=K.y}if(K.options.onScrollMove){K.options.onScrollMove.call(K,M)}},_end:function(M){if(y&&M.touches.length!==0){return}var K=this,S=y?M.changedTouches[0]:M,N,R,G={dist:0,time:0},m={dist:0,time:0},J=(M.timeStamp||Date.now())-K.startTime,O=K.x,L=K.y,Q,P,F,I,H;K._unbind(t,i);K._unbind(c,i);K._unbind(w,i);if(K.options.onBeforeScrollEnd){K.options.onBeforeScrollEnd.call(K,M)}if(K.zoomed){H=K.scale*K.lastScale;H=Math.max(K.options.zoomMin,H);H=Math.min(K.options.zoomMax,H);K.lastScale=H/K.scale;K.scale=H;K.x=K.originX-K.originX*K.lastScale+K.x;K.y=K.originY-K.originY*K.lastScale+K.y;K.scroller.style[k]="200ms";K.scroller.style[l]="translate("+K.x+"px,"+K.y+"px) scale("+K.scale+")"+C;K.zoomed=false;K.refresh();if(K.options.onZoomEnd){K.options.onZoomEnd.call(K,M)}return}if(!K.moved){if(y){if(K.doubleTapTimer&&K.options.zoom){clearTimeout(K.doubleTapTimer);K.doubleTapTimer=null;if(K.options.onZoomStart){K.options.onZoomStart.call(K,M)}K.zoom(K.pointX,K.pointY,K.scale==1?K.options.doubleTapZoom:1);if(K.options.onZoomEnd){setTimeout(function(){K.options.onZoomEnd.call(K,M)},200)}}else{if(this.options.handleClick){K.doubleTapTimer=setTimeout(function(){K.doubleTapTimer=null;N=S.target;while(N.nodeType!=1){N=N.parentNode}if(N.tagName!="SELECT"&&N.tagName!="INPUT"&&N.tagName!="TEXTAREA"){R=E.createEvent("MouseEvents");R.initMouseEvent("click",true,true,M.view,1,S.screenX,S.screenY,S.clientX,S.clientY,M.ctrlKey,M.altKey,M.shiftKey,M.metaKey,0,null);R._fake=true;N.dispatchEvent(R)}},K.options.zoom?250:0)}}}K._resetPos(400);if(K.options.onTouchEnd){K.options.onTouchEnd.call(K,M)}return}if(J<300&&K.options.momentum){G=O?K._momentum(O-K.startX,J,-K.x,K.scrollerW-K.wrapperW+K.x,K.options.bounce?K.wrapperW:0):G;m=L?K._momentum(L-K.startY,J,-K.y,(K.maxScrollY<0?K.scrollerH-K.wrapperH+K.y-K.minScrollY:0),K.options.bounce?K.wrapperH:0):m;O=K.x+G.dist;L=K.y+m.dist;if((K.x>0&&O>0)||(K.x<K.maxScrollX&&O<K.maxScrollX)){G={dist:0,time:0}}if((K.y>K.minScrollY&&L>K.minScrollY)||(K.y<K.maxScrollY&&L<K.maxScrollY)){m={dist:0,time:0}}}if(G.dist||m.dist){F=u.max(u.max(G.time,m.time),10);if(K.options.snap){Q=O-K.absStartX;P=L-K.absStartY;if(u.abs(Q)<K.options.snapThreshold&&u.abs(P)<K.options.snapThreshold){K.scrollTo(K.absStartX,K.absStartY,200)}else{I=K._snap(O,L);O=I.x;L=I.y;F=u.max(I.time,F)}}K.scrollTo(u.round(O),u.round(L),F);if(K.options.onTouchEnd){K.options.onTouchEnd.call(K,M)}return}if(K.options.snap){Q=O-K.absStartX;P=L-K.absStartY;if(u.abs(Q)<K.options.snapThreshold&&u.abs(P)<K.options.snapThreshold){K.scrollTo(K.absStartX,K.absStartY,200)}else{I=K._snap(K.x,K.y);if(I.x!=K.x||I.y!=K.y){K.scrollTo(I.x,I.y,I.time)}}if(K.options.onTouchEnd){K.options.onTouchEnd.call(K,M)}return}K._resetPos(200);if(K.options.onTouchEnd){K.options.onTouchEnd.call(K,M)}},_resetPos:function(G){var m=this,H=m.x>=0?0:m.x<m.maxScrollX?m.maxScrollX:m.x,F=m.y>=m.minScrollY||m.maxScrollY>0?m.minScrollY:m.y<m.maxScrollY?m.maxScrollY:m.y;if(H==m.x&&F==m.y){if(m.moved){m.moved=false;if(m.options.onScrollEnd){m.options.onScrollEnd.call(m)}}if(m.hScrollbar&&m.options.hideScrollbar){if(z=="webkit"){m.hScrollbarWrapper.style[e]="300ms"}m.hScrollbarWrapper.style.opacity="0"}if(m.vScrollbar&&m.options.hideScrollbar){if(z=="webkit"){m.vScrollbarWrapper.style[e]="300ms"}m.vScrollbarWrapper.style.opacity="0"}return}m.scrollTo(H,F,G||0)},_wheel:function(J){var H=this,I,G,F,m,K;if("wheelDeltaX" in J){I=J.wheelDeltaX/12;G=J.wheelDeltaY/12}else{if("wheelDelta" in J){I=G=J.wheelDelta/12}else{if("detail" in J){I=G=-J.detail*3}else{return}}}if(H.options.wheelAction=="zoom"){K=H.scale*Math.pow(2,1/3*(G?G/Math.abs(G):0));if(K<H.options.zoomMin){K=H.options.zoomMin}if(K>H.options.zoomMax){K=H.options.zoomMax}if(K!=H.scale){if(!H.wheelZoomCount&&H.options.onZoomStart){H.options.onZoomStart.call(H,J)}H.wheelZoomCount++;H.zoom(J.pageX,J.pageY,K,400);setTimeout(function(){H.wheelZoomCount--;if(!H.wheelZoomCount&&H.options.onZoomEnd){H.options.onZoomEnd.call(H,J)}},400)}return}F=H.x+I;m=H.y+G;if(F>0){F=0}else{if(F<H.maxScrollX){F=H.maxScrollX}}if(m>H.minScrollY){m=H.minScrollY}else{if(m<H.maxScrollY){m=H.maxScrollY}}if(H.maxScrollY<0){H.scrollTo(F,m,0)}},_transitionEnd:function(F){var m=this;if(F.target!=m.scroller){return}m._unbind(a);m._startAni()},_startAni:function(){var K=this,F=K.x,m=K.y,I=Date.now(),J,H,G;if(K.animating){return}if(!K.steps.length){K._resetPos(400);return}J=K.steps.shift();if(J.x==F&&J.y==m){J.time=0}K.animating=true;K.moved=true;if(K.options.useTransition){K._transitionTime(J.time);K._pos(J.x,J.y);K.animating=false;if(J.time){K._bind(a)}else{K._resetPos(0)}return}G=function(){var L=Date.now(),N,M;if(L>=I+J.time){K._pos(J.x,J.y);K.animating=false;if(K.options.onAnimationEnd){K.options.onAnimationEnd.call(K)}K._startAni();return}L=(L-I)/J.time-1;H=u.sqrt(1-L*L);N=(J.x-F)*H+F;M=(J.y-m)*H+m;K._pos(N,M);if(K.animating){K.aniTime=q(G)}};G()},_transitionTime:function(m){m+="ms";this.scroller.style[k]=m;if(this.hScrollbar){this.hScrollbarIndicator.style[k]=m}if(this.vScrollbar){this.vScrollbarIndicator.style[k]=m}},_momentum:function(L,F,J,m,N){var K=0.0006,G=u.abs(L)/F,H=(G*G)/(2*K),M=0,I=0;if(L>0&&H>J){I=N/(6/(H/G*K));J=J+I;G=G*J/H;H=J}else{if(L<0&&H>m){I=N/(6/(H/G*K));m=m+I;G=G*m/H;H=m}}H=H*(L<0?-1:1);M=G/K;return{dist:H,time:u.round(M)}},_offset:function(m){var G=-m.offsetLeft,F=-m.offsetTop;while(m=m.offsetParent){G-=m.offsetLeft;F-=m.offsetTop}if(m!=this.wrapper){G*=this.scale;F*=this.scale}return{left:G,top:F}},_snap:function(M,L){var J=this,I,H,K,G,F,m;K=J.pagesX.length-1;for(I=0,H=J.pagesX.length;I<H;I++){if(M>=J.pagesX[I]){K=I;break}}if(K==J.currPageX&&K>0&&J.dirX<0){K--}M=J.pagesX[K];F=u.abs(M-J.pagesX[J.currPageX]);F=F?u.abs(J.x-M)/F*500:0;J.currPageX=K;K=J.pagesY.length-1;for(I=0;I<K;I++){if(L>=J.pagesY[I]){K=I;break}}if(K==J.currPageY&&K>0&&J.dirY<0){K--}L=J.pagesY[K];m=u.abs(L-J.pagesY[J.currPageY]);m=m?u.abs(J.y-L)/m*500:0;J.currPageY=K;G=u.round(u.max(F,m))||200;return{x:M,y:L,time:G}},_bind:function(G,F,m){(F||this.scroller).addEventListener(G,this,!!m)},_unbind:function(G,F,m){(F||this.scroller).removeEventListener(G,this,!!m)},destroy:function(){var m=this;m.scroller.style[l]="";m.hScrollbar=false;m.vScrollbar=false;m._scrollbar("h");m._scrollbar("v");m._unbind(g,i);m._unbind(b);m._unbind(t,i);m._unbind(c,i);m._unbind(w,i);if(!m.options.hasTouch){m._unbind("DOMMouseScroll");m._unbind("mousewheel")}if(m.options.useTransition){m._unbind(a)}if(m.options.checkDOMChanges){clearInterval(m.checkDOMTime)}if(m.options.onDestroy){m.options.onDestroy.call(m)}},refresh:function(){var H=this,J,G,m,F,K=0,I=0;if(H.scale<H.options.zoomMin){H.scale=H.options.zoomMin}H.wrapperW=H.wrapper.clientWidth||1;H.wrapperH=H.wrapper.clientHeight||1;H.minScrollY=-H.options.topOffset||0;H.scrollerW=u.round(H.scroller.offsetWidth*H.scale);H.scrollerH=u.round((H.scroller.offsetHeight+H.minScrollY)*H.scale);H.maxScrollX=H.wrapperW-H.scrollerW;H.maxScrollY=H.wrapperH-H.scrollerH+H.minScrollY;H.dirX=0;H.dirY=0;if(H.options.onRefresh){H.options.onRefresh.call(H)}H.hScroll=H.options.hScroll&&H.maxScrollX<0;H.vScroll=H.options.vScroll&&(!H.options.bounceLock&&!H.hScroll||H.scrollerH>H.wrapperH);H.hScrollbar=H.hScroll&&H.options.hScrollbar;H.vScrollbar=H.vScroll&&H.options.vScrollbar&&H.scrollerH>H.wrapperH;J=H._offset(H.wrapper);H.wrapperOffsetLeft=-J.left;H.wrapperOffsetTop=-J.top;if(typeof H.options.snap=="string"){H.pagesX=[];H.pagesY=[];F=H.scroller.querySelectorAll(H.options.snap);for(G=0,m=F.length;G<m;G++){K=H._offset(F[G]);K.left+=H.wrapperOffsetLeft;K.top+=H.wrapperOffsetTop;H.pagesX[G]=K.left<H.maxScrollX?H.maxScrollX:K.left*H.scale;H.pagesY[G]=K.top<H.maxScrollY?H.maxScrollY:K.top*H.scale}}else{if(H.options.snap){H.pagesX=[];while(K>=H.maxScrollX){H.pagesX[I]=K;K=K-H.wrapperW;I++}if(H.maxScrollX%H.wrapperW){H.pagesX[H.pagesX.length]=H.maxScrollX-H.pagesX[H.pagesX.length-1]+H.pagesX[H.pagesX.length-1]}K=0;I=0;H.pagesY=[];while(K>=H.maxScrollY){H.pagesY[I]=K;K=K-H.wrapperH;I++}if(H.maxScrollY%H.wrapperH){H.pagesY[H.pagesY.length]=H.maxScrollY-H.pagesY[H.pagesY.length-1]+H.pagesY[H.pagesY.length-1]}}}H._scrollbar("h");H._scrollbar("v");if(!H.zoomed){H.scroller.style[k]="0";H._resetPos(400)}},scrollTo:function(m,L,K,J){var I=this,H=m,G,F;I.stop();if(!H.length){H=[{x:m,y:L,time:K,relative:J}]}for(G=0,F=H.length;G<F;G++){if(H[G].relative){H[G].x=I.x-H[G].x;H[G].y=I.y-H[G].y}I.steps.push({x:H[G].x,y:H[G].y,time:H[G].time||0})}I._startAni()},scrollToElement:function(m,G){var F=this,H;m=m.nodeType?m:F.scroller.querySelector(m);if(!m){return}H=F._offset(m);H.left+=F.wrapperOffsetLeft;H.top+=F.wrapperOffsetTop;H.left=H.left>0?0:H.left<F.maxScrollX?F.maxScrollX:H.left;H.top=H.top>F.minScrollY?F.minScrollY:H.top<F.maxScrollY?F.maxScrollY:H.top;G=G===undefined?u.max(u.abs(H.left)*2,u.abs(H.top)*2):G;F.scrollTo(H.left,H.top,G)},scrollToPage:function(G,F,I){var H=this,m,J;I=I===undefined?400:I;if(H.options.onScrollStart){H.options.onScrollStart.call(H)}if(H.options.snap){G=G=="next"?H.currPageX+1:G=="prev"?H.currPageX-1:G;F=F=="next"?H.currPageY+1:F=="prev"?H.currPageY-1:F;G=G<0?0:G>H.pagesX.length-1?H.pagesX.length-1:G;F=F<0?0:F>H.pagesY.length-1?H.pagesY.length-1:F;H.currPageX=G;H.currPageY=F;m=H.pagesX[G];J=H.pagesY[F]}else{m=-H.wrapperW*G;J=-H.wrapperH*F;if(m<H.maxScrollX){m=H.maxScrollX}if(J<H.maxScrollY){J=H.maxScrollY}}H.scrollTo(m,J,I)},disable:function(){this.stop();this._resetPos(0);this.enabled=false;this._unbind(t,i);this._unbind(c,i);this._unbind(w,i)},enable:function(){this.enabled=true},stop:function(){if(this.options.useTransition){this._unbind(a)}else{p(this.aniTime)}this.steps=[];this.moved=false;this.animating=false},zoom:function(m,J,I,H){var F=this,G=I/F.scale;if(!F.options.useTransform){return}F.zoomed=true;H=H===undefined?200:H;m=m-F.wrapperOffsetLeft-F.x;J=J-F.wrapperOffsetTop-F.y;F.x=m-m*G+F.x;F.y=J-J*G+F.y;F.scale=I;F.refresh();F.x=F.x>0?0:F.x<F.maxScrollX?F.maxScrollX:F.x;F.y=F.y>F.minScrollY?F.minScrollY:F.y<F.maxScrollY?F.maxScrollY:F.y;F.scroller.style[k]=H+"ms";F.scroller.style[l]="translate("+F.x+"px,"+F.y+"px) scale("+I+")"+C;F.zoomed=false},isReady:function(){return !this.moved&&!this.zoomed&&!this.animating}};function s(m){if(z===""){return m}m=m.charAt(0).toUpperCase()+m.substr(1);return z+m}n=null;if(typeof exports!=="undefined"){exports.iScroll=v}else{i.iScroll=v}})(window,document);

(function (g, d, u){
    /* JSONP */
    gazeta_pl.jsonp=gazeta_pl.jsonp||function(f,g,h,d){var e=document.createElement("script"),c=gazeta_pl.jsonp,a="",d=d||{},b=d.name||"callback";if(typeof d.timestamp=="string"){g[d.timestamp]=new Date().getTime()}if(typeof h=="function"){if(!c.count){c.count=0}if(!c.hash){c.hash={}}a="c"+c.count++;c.hash[a]=h;g[b]="gazeta_pl.jsonp.hash."+a}else{g[b]=h}e.src=f+(f.match(/\?/)?"&":"?")+gazeta_pl.makeURI(g,true);$("head")[0].appendChild(e)};

    /* makeURI */
    gazeta_pl.makeURI=gazeta_pl.makeURI||function(f,c,d){var b=[],e=null,c=c||false,d=d||false,g=c?"":location.href.split(/\?/).shift()+"?";for(e in f){b.push(e+"="+(d?f[e]:encodeURIComponent(f[e])))}return g+b.join("&")};

    /* readParam */
    gazeta_pl.readParam=gazeta_pl.readParam||function(a){return(gazeta_pl.documentParam||{})[a]};

    /* parseURI */
    gazeta_pl.parseURI=gazeta_pl.parseURI||function() {var o={},a=location.href.split(/\?/).pop().split(/&/),k=null,i=0;for(i=0;i<a.length;i++){a[i]=a[i].split(/=/);o[a[i].shift()]=a[i].join('=');}return o;};
    

    /**
    * jquery.scrollTo
    * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
    * Dual licensed under MIT and GPL.
    * @author Ariel Flesler
    * @version 1.4.3.1
    */
    ;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

    /*!
     * jQuery blockUI plugin
     * Version 2.43 (29-JUL-2012)
     * @requires jQuery v1.2.3 or later
     *
     * Examples at: http://malsup.com/jquery/block/
     * Copyright (c) 2007-2010 M. Alsup
     * Dual licensed under the MIT and GPL licenses:
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.gnu.org/licenses/gpl.html
     *
     * Thanks to Amir-Hossein Sobhi for some excellent contributions!
     */
    (function(){function a(j){if(/1\.(0|1|2)\.(0|1|2)/.test(j.fn.jquery)||/^1.1/.test(j.fn.jquery)){alert("blockUI requires jQuery v1.2.3 or later!  You are using v"+j.fn.jquery);return}j.fn._fadeIn=j.fn.fadeIn;var d=function(){};var k=document.documentMode||0;var f=j.browser.msie&&((j.browser.version<8&&!k)||k<8);var g=j.browser.msie&&/MSIE 6.0/.test(navigator.userAgent)&&!k;j.blockUI=function(q){e(window,q)};j.unblockUI=function(q){i(window,q)};j.growlUI=function(u,s,t,q){var r=j('<div class="growlUI"></div>');if(u){r.append("<h1>"+u+"</h1>")}if(s){r.append("<h2>"+s+"</h2>")}if(t==undefined){t=3000}j.blockUI({message:r,fadeIn:700,fadeOut:1000,centerY:false,timeout:t,showOverlay:false,onUnblock:q,css:j.blockUI.defaults.growlCSS})};j.fn.block=function(r){var q=j.extend({},j.blockUI.defaults,r||{});this.each(function(){var s=j(this);if(q.ignoreIfBlocked&&s.data("blockUI.isBlocked")){return}s.unblock({fadeOut:0})});return this.each(function(){if(j.css(this,"position")=="static"){this.style.position="relative"}if(j.browser.msie){this.style.zoom=1}e(this,r)})};j.fn.unblock=function(q){return this.each(function(){i(this,q)})};j.blockUI.version=2.42;j.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:true,theme:false,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:0.6,cursor:"wait"},growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:0.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:false,baseZ:1000,centerX:true,centerY:true,allowBodyStretch:true,bindEvents:true,constrainTabKey:true,fadeIn:200,fadeOut:400,timeout:0,showOverlay:true,focusInput:true,applyPlatformOpacityRules:true,onBlock:null,onUnblock:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg",ignoreIfBlocked:false};var c=null;var h=[];function e(u,G){var D,O;var B=(u==window);var x=(G&&G.message!==undefined?G.message:undefined);G=j.extend({},j.blockUI.defaults,G||{});if(G.ignoreIfBlocked&&j(u).data("blockUI.isBlocked")){return}G.overlayCSS=j.extend({},j.blockUI.defaults.overlayCSS,G.overlayCSS||{});D=j.extend({},j.blockUI.defaults.css,G.css||{});O=j.extend({},j.blockUI.defaults.themedCSS,G.themedCSS||{});x=x===undefined?G.message:x;if(B&&c){i(window,{fadeOut:0})}if(x&&typeof x!="string"&&(x.parentNode||x.jquery)){var J=x.jquery?x[0]:x;var Q={};j(u).data("blockUI.history",Q);Q.el=J;Q.parent=J.parentNode;Q.display=J.style.display;Q.position=J.style.position;if(Q.parent){Q.parent.removeChild(J)}}j(u).data("blockUI.onUnblock",G.onUnblock);var C=G.baseZ;var N=(j.browser.msie||G.forceIframe)?j('<iframe class="blockUI" style="z-index:'+(C++)+';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+G.iframeSrc+'"></iframe>'):j('<div class="blockUI" style="display:none"></div>');var M=G.theme?j('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+(C++)+';display:none"></div>'):j('<div class="blockUI blockOverlay" style="z-index:'+(C++)+';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>');var L,H;if(G.theme&&B){H='<div class="blockUI '+G.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(C+10)+';display:none;position:fixed">';if(G.title){H+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(G.title||"&nbsp;")+"</div>"}H+='<div class="ui-widget-content ui-dialog-content"></div>';H+="</div>"}else{if(G.theme){H='<div class="blockUI '+G.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(C+10)+';display:none;position:absolute">';if(G.title){H+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(G.title||"&nbsp;")+"</div>"}H+='<div class="ui-widget-content ui-dialog-content"></div>';H+="</div>"}else{if(B){H='<div class="blockUI '+G.blockMsgClass+' blockPage" style="z-index:'+(C+10)+';display:none;position:fixed"></div>'}else{H='<div class="blockUI '+G.blockMsgClass+' blockElement" style="z-index:'+(C+10)+';display:none;position:absolute"></div>'}}}L=j(H);if(x){if(G.theme){L.css(O);L.addClass("ui-widget-content")}else{L.css(D)}}if(!G.theme&&(!G.applyPlatformOpacityRules||!(j.browser.mozilla&&/Linux/.test(navigator.platform)))){M.css(G.overlayCSS)}M.css("position",B?"fixed":"absolute");if(j.browser.msie||G.forceIframe){N.css("opacity",0)}var A=[N,M,L],P=B?j("body"):j(u);j.each(A,function(){this.appendTo(P)});if(G.theme&&G.draggable&&j.fn.draggable){L.draggable({handle:".ui-dialog-titlebar",cancel:"li"})}var w=f&&(!j.boxModel||j("object,embed",B?null:u).length>0);if(g||w){if(B&&G.allowBodyStretch&&j.boxModel){j("html,body").css("height","100%")}if((g||!j.boxModel)&&!B){var F=n(u,"borderTopWidth"),K=n(u,"borderLeftWidth");var y=F?"(0 - "+F+")":0;var E=K?"(0 - "+K+")":0}j.each([N,M,L],function(t,T){var z=T[0].style;z.position="absolute";if(t<2){B?z.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.boxModel?0:"+G.quirksmodeOffsetHack+') + "px"'):z.setExpression("height",'this.parentNode.offsetHeight + "px"');B?z.setExpression("width",'jQuery.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):z.setExpression("width",'this.parentNode.offsetWidth + "px"');if(E){z.setExpression("left",E)}if(y){z.setExpression("top",y)}}else{if(G.centerY){if(B){z.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')}z.marginTop=0}else{if(!G.centerY&&B){var R=(G.css&&G.css.top)?parseInt(G.css.top):0;var S="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+R+') + "px"';z.setExpression("top",S)}}}})}if(x){if(G.theme){L.find(".ui-widget-content").append(x)}else{L.append(x)}if(x.jquery||x.nodeType){j(x).show()}}if((j.browser.msie||G.forceIframe)&&G.showOverlay){N.show()}if(G.fadeIn){var I=G.onBlock?G.onBlock:d;var r=(G.showOverlay&&!x)?I:d;var q=x?I:d;if(G.showOverlay){M._fadeIn(G.fadeIn,r)}if(x){L._fadeIn(G.fadeIn,q)}}else{if(G.showOverlay){M.show()}if(x){L.show()}if(G.onBlock){G.onBlock()}}m(1,u,G);if(B){c=L[0];h=j(":input:enabled:visible",c);if(G.focusInput){setTimeout(p,20)}}else{b(L[0],G.centerX,G.centerY)}if(G.timeout){var v=setTimeout(function(){B?j.unblockUI(G):j(u).unblock(G)},G.timeout);j(u).data("blockUI.timeout",v)}}function i(t,u){var s=(t==window);var r=j(t);var v=r.data("blockUI.history");var w=r.data("blockUI.timeout");if(w){clearTimeout(w);r.removeData("blockUI.timeout")}u=j.extend({},j.blockUI.defaults,u||{});m(0,t,u);if(u.onUnblock===null){u.onUnblock=r.data("blockUI.onUnblock");r.removeData("blockUI.onUnblock")}var q;if(s){q=j("body").children().filter(".blockUI").add("body > .blockUI")}else{q=j(".blockUI",t)}if(s){c=h=null}if(u.fadeOut){q.fadeOut(u.fadeOut);setTimeout(function(){l(q,v,u,t)},u.fadeOut)}else{l(q,v,u,t)}}function l(q,t,s,r){q.each(function(u,v){if(this.parentNode){this.parentNode.removeChild(this)}});if(t&&t.el){t.el.style.display=t.display;t.el.style.position=t.position;if(t.parent){t.parent.appendChild(t.el)}j(r).removeData("blockUI.history")}if(typeof s.onUnblock=="function"){s.onUnblock(r,s)}}function m(q,u,v){var t=u==window,s=j(u);if(!q&&(t&&!c||!t&&!s.data("blockUI.isBlocked"))){return}s.data("blockUI.isBlocked",q);if(!v.bindEvents||(q&&!v.showOverlay)){return}var r="mousedown mouseup keydown keypress";q?j(document).bind(r,v,o):j(document).unbind(r,o)}function o(u){if(u.keyCode&&u.keyCode==9){if(c&&u.data.constrainTabKey){var s=h;var r=!u.shiftKey&&u.target===s[s.length-1];var q=u.shiftKey&&u.target===s[0];if(r||q){setTimeout(function(){p(q)},10);return false}}}var t=u.data;if(j(u.target).parents("div."+t.blockMsgClass).length>0){return true}return j(u.target).parents().children().filter("div.blockUI").length==0}function p(q){if(!h){return}var r=h[q===true?h.length-1:0];if(r){r.focus()}}function b(w,q,A){var z=w.parentNode,v=w.style;var r=((z.offsetWidth-w.offsetWidth)/2)-n(z,"borderLeftWidth");var u=((z.offsetHeight-w.offsetHeight)/2)-n(z,"borderTopWidth");if(q){v.left=r>0?(r+"px"):"0"}if(A){v.top=u>0?(u+"px"):"0"}}function n(q,r){return parseInt(j.css(q,r))||0}}if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}})();

    /* jQuery PubSub v0.1.0 */
    (function(a){var b=a({});a.each({trigger:"publish",on:"subscribe",off:"unsubscribe"},function(c,d){a[d]=function(){b[c].apply(b,arguments)}})})(jQuery);

    /*
    * Gazeta.pl jQuery plugin
    * Copyright (c) Agora S.A.
    * Licensed under the MIT License.
    * Version: 1.0
    */
    (function(b,f,a,c){var e={};c.fn.gazeta=function(g,d){return c.fn.gazeta[g](this,typeof d=="undefined"?{}:d)};c.fn.gazeta.readData=function(h){var k=0,g=h[0].attributes,j=g.length,d=null,n={};for(;k<j;k++){if(d=g[k].nodeName.match(/^data-(.*)/)){n[d.pop().replace(/-([a-z])/g,function(l,i){return i.toUpperCase()})]=g[k].nodeValue}}return n};(function(){for(var d in c.fn.gazeta){e[d]=d}})();b.gfunc=e}(window,document,undefined,jQuery));

    // jquerypp v1.0.1
    (function(window,$,undefined){var getComputedStyle=document.defaultView&&document.defaultView.getComputedStyle,rupper=/([A-Z])/g,rdashAlpha=/-([a-z])/ig,fcamelCase=function(all,letter){return letter.toUpperCase()},getStyle=function(elem){if(getComputedStyle){return getComputedStyle(elem,null)}else{if(elem.currentStyle){return elem.currentStyle}}},rfloat=/float/i,rnumpx=/^-?\d+(?:px)?$/i,rnum=/^-?\d/;$.styles=function(el,styles){if(!el){return null}var currentS=getStyle(el),oldName,val,style=el.style,results={},i=0,left,rsLeft,camelCase,name;for(;i<styles.length;i++){name=styles[i];oldName=name.replace(rdashAlpha,fcamelCase);if(rfloat.test(name)){name=$.support.cssFloat?"float":"styleFloat";oldName="cssFloat"}if(getComputedStyle){name=name.replace(rupper,"-$1").toLowerCase();val=currentS.getPropertyValue(name);if(name==="opacity"&&val===""){val="1"}results[oldName]=val}else{camelCase=name.replace(rdashAlpha,fcamelCase);results[oldName]=currentS[name]||currentS[camelCase];if(!rnumpx.test(results[oldName])&&rnum.test(results[oldName])){left=style.left;rsLeft=el.runtimeStyle.left;el.runtimeStyle.left=el.currentStyle.left;style.left=camelCase==="fontSize"?"1em":(results[oldName]||0);results[oldName]=style.pixelLeft+"px";style.left=left;el.runtimeStyle.left=rsLeft}}}return results};$.fn.styles=function(){return $.styles(this[0],$.makeArray(arguments))};var animationNum=0,styleSheet=null,cache=[],browser=null,oldanimate=$.fn.animate,getStyleSheet=function(){if(!styleSheet){var style=document.createElement("style");style.setAttribute("type","text/css");style.setAttribute("media","screen");document.getElementsByTagName("head")[0].appendChild(style);if(!window.createPopup){style.appendChild(document.createTextNode(""))}styleSheet=style.sheet}return styleSheet},removeAnimation=function(sheet,name){for(var j=sheet.cssRules.length-1;j>=0;j--){var rule=sheet.cssRules[j];if(rule.type===7&&rule.name==name){sheet.deleteRule(j);return}}},passThrough=function(props,ops){var nonElement=!(this[0]&&this[0].nodeType),isInline=!nonElement&&$(this).css("display")==="inline"&&$(this).css("float")==="none";for(var name in props){if(props[name]=="show"||props[name]=="hide"||props[name]=="toggle"||$.isArray(props[name])||props[name]<0||name=="zIndex"||name=="z-index"||name=="scrollTop"||name=="scrollLeft"){return true}}return props.jquery===true||getBrowser()===null||$.isEmptyObject(props)||(ops&&ops.length==4)||(ops&&typeof ops[2]=="string")||$.isPlainObject(ops)||isInline||nonElement},cssValue=function(origName,value){if(typeof value==="number"&&!$.cssNumber[origName]){return value+="px"}return value},getBrowser=function(){if(!browser){var t,el=document.createElement("fakeelement"),transitions={transition:{transitionEnd:"transitionEnd",prefix:""},MozTransition:{transitionEnd:"animationend",prefix:"-moz-"},WebkitTransition:{transitionEnd:"webkitAnimationEnd",prefix:"-webkit-"}};for(t in transitions){if(el.style[t]!==undefined){browser=transitions[t]}}}return browser},ffProps={top:function(el){return el.position().top},left:function(el){return el.position().left},width:function(el){return el.width()},height:function(el){return el.height()},fontSize:function(el){return"1em"}},addPrefix=function(properties){var result={};$.each(properties,function(name,value){result[getBrowser().prefix+name]=value});return result},getAnimation=function(style){var sheet,name,last;$.each(cache,function(i,animation){if(style===animation.style){name=animation.name;animation.age=0}else{animation.age+=1}});if(!name){sheet=getStyleSheet();name="jquerypp_animation_"+(animationNum++);sheet.insertRule("@"+getBrowser().prefix+"keyframes "+name+" "+style,(sheet.cssRules&&sheet.cssRules.length)||0);cache.push({name:name,style:style,age:0});cache.sort(function(first,second){return first.age-second.age});if(cache.length>20){last=cache.pop();removeAnimation(sheet,last.name)}}return name};$.fn.animate=function(props,speed,easing,callback){if(passThrough.apply(this,arguments)){return oldanimate.apply(this,arguments)}var optall=$.speed(speed,easing,callback);this.queue(optall.queue,function(done){var current,properties=[],to="",prop,self=$(this),duration=optall.duration,animationName,dataKey,style="{ from {",animationEnd=function(currentCSS,exec){self.css(currentCSS);self.css(addPrefix({"animation-duration":"","animation-name":"","animation-fill-mode":"","animation-play-state":""}));if($.isFunction(optall.old)&&exec){optall.old.call(self[0],true)}$.removeData(self,dataKey,true)},finishAnimation=function(){animationEnd(props,true);done()};for(prop in props){properties.push(prop)}if(getBrowser().prefix==="-moz-"){$.each(properties,function(i,prop){var converter=ffProps[$.camelCase(prop)];if(converter&&self.css(prop)=="auto"){self.css(prop,converter(self))}})}current=self.styles.apply(self,properties);$.each(properties,function(i,cur){var name=cur.replace(/([A-Z]|^ms)/g,"-$1").toLowerCase();style+=name+" : "+cssValue(cur,current[cur])+"; ";to+=name+" : "+cssValue(cur,props[cur])+"; "});style+="} to {"+to+" }}";animationName=getAnimation(style);dataKey=animationName+".run";$._data(this,dataKey,{stop:function(gotoEnd){self.css(addPrefix({"animation-play-state":"paused"}));self.off(getBrowser().transitionEnd,finishAnimation);if(!gotoEnd){animationEnd(self.styles.apply(self,properties),false)}else{animationEnd(props,true)}}});self.css(addPrefix({"animation-duration":duration+"ms","animation-name":animationName,"animation-fill-mode":"forwards"}));self.one(getBrowser().transitionEnd,finishAnimation)});return this};$.fn.compare=function(element){try{element=element.jquery?element[0]:element}catch(e){return null}if(window.HTMLElement){var s=HTMLElement.prototype.toString.call(element);if(s=="[xpconnect wrapped native prototype]"||s=="[object XULElement]"||s==="[object Window]"){return null}}if(this[0].compareDocumentPosition){return this[0].compareDocumentPosition(element)}if(this[0]==document&&element!=document){return 8}var number=(this[0]!==element&&this[0].contains(element)&&16)+(this[0]!=element&&element.contains(this[0])&&8),docEl=document.documentElement;if(this[0].sourceIndex){number+=(this[0].sourceIndex<element.sourceIndex&&4);number+=(this[0].sourceIndex>element.sourceIndex&&2);number+=(this[0].ownerDocument!==element.ownerDocument||(this[0]!=docEl&&this[0].sourceIndex<=0)||(element!=docEl&&element.sourceIndex<=0))&&1}return number};$.toJSON=function(o,replacer,space,recurse){if(typeof(JSON)=="object"&&JSON.stringify){return JSON.stringify(o,replacer,space)}if(!recurse&&$.isFunction(replacer)){o=replacer("",o)}if(typeof space=="number"){space="          ".substring(0,space)}space=(typeof space=="string")?space.substring(0,10):"";var type=typeof(o);if(o===null){return"null"}if(type=="undefined"||type=="function"){return undefined}if(type=="number"||type=="boolean"){return o+""}if(type=="string"){return $.quoteString(o)}if(type=="object"){if(typeof o.toJSON=="function"){return $.toJSON(o.toJSON(),replacer,space,true)}if(o.constructor===Date){var month=o.getUTCMonth()+1;if(month<10){month="0"+month}var day=o.getUTCDate();if(day<10){day="0"+day}var year=o.getUTCFullYear();var hours=o.getUTCHours();if(hours<10){hours="0"+hours}var minutes=o.getUTCMinutes();if(minutes<10){minutes="0"+minutes}var seconds=o.getUTCSeconds();if(seconds<10){seconds="0"+seconds}var milli=o.getUTCMilliseconds();if(milli<100){milli="0"+milli}if(milli<10){milli="0"+milli}return'"'+year+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+seconds+"."+milli+'Z"'}var process=($.isFunction(replacer))?function(k,v){return replacer(k,v)}:function(k,v){return v},nl=(space)?"\n":"",sp=(space)?" ":"";if(o.constructor===Array){var ret=[];for(var i=0;i<o.length;i++){ret.push(($.toJSON(process(i,o[i]),replacer,space,true)||"null").replace(/^/gm,space))}return"["+nl+ret.join(","+nl)+nl+"]"}var pairs=[],proplist;if($.isArray(replacer)){proplist=$.map(replacer,function(v){return(typeof v=="string"||typeof v=="number")?v+"":null})}for(var k in o){var name,val,type=typeof k;if(proplist&&$.inArray(k+"",proplist)==-1){continue}if(type=="number"){name='"'+k+'"'}else{if(type=="string"){name=$.quoteString(k)}else{continue}}val=$.toJSON(process(k,o[k]),replacer,space,true);if(typeof val=="undefined"){continue}pairs.push((name+":"+sp+val).replace(/^/gm,space))}return"{"+nl+pairs.join(","+nl)+nl+"}"}};$.evalJSON=function(src){if(typeof(JSON)=="object"&&JSON.parse){return JSON.parse(src)}return eval("("+src+")")};$.secureEvalJSON=function(src){if(typeof(JSON)=="object"&&JSON.parse){return JSON.parse(src)}var filtered=src;filtered=filtered.replace(/\\["\\\/bfnrtu]/g,"@");filtered=filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]");filtered=filtered.replace(/(?:^|:|,)(?:\s*\[)+/g,"");if(/^[\],:{}\s]*$/.test(filtered)){return eval("("+src+")")}else{throw new SyntaxError("Error parsing JSON, source is not valid.")}};$.quoteString=function(string){if(string.match(_escapeable)){return'"'+string.replace(_escapeable,function(a){var c=_meta[a];if(typeof c==="string"){return c}c=a.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)})+'"'}return'"'+string+'"'};var _escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;var _meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};$.cookie=function(name,value,options){if(typeof value!="undefined"){options=options||{};if(value===null){value="";options.expires=-1}if(typeof value=="object"&&$.toJSON){value=$.toJSON(value)}var expires="";if(options.expires&&(typeof options.expires=="number"||options.expires.toUTCString)){var date;if(typeof options.expires=="number"){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000))}else{date=options.expires}expires="; expires="+date.toUTCString()}var path=options.path?"; path="+(options.path):"";var domain=options.domain?"; domain="+(options.domain):"";var secure=options.secure?"; secure":"";document.cookie=[name,"=",encodeURIComponent(value),expires,path,domain,secure].join("")}else{var cookieValue=null;if(document.cookie&&document.cookie!=""){var cookies=document.cookie.split(";");for(var i=0;i<cookies.length;i++){var cookie=$.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+"=")){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}}if($.evalJSON&&cookieValue&&cookieValue.match(/^\s*\{/)){try{cookieValue=$.evalJSON(cookieValue)}catch(e){}}return cookieValue}};var weird=/button|select/i,getBoxes={},checks={width:["Left","Right"],height:["Top","Bottom"],oldOuterHeight:$.fn.outerHeight,oldOuterWidth:$.fn.outerWidth,oldInnerWidth:$.fn.innerWidth,oldInnerHeight:$.fn.innerHeight},supportsSetter=$.fn.jquery>="1.8.0";$.each({width:"Width",height:"Height"},function(lower,Upper){getBoxes[lower]=function(el,boxes){var val=0;if(!weird.test(el.nodeName)){var myChecks=[];$.each(checks[lower],function(){var direction=this;$.each(boxes,function(name,val){if(val){myChecks.push(name+direction+(name=="border"?"Width":""))}})});$.each($.styles(el,myChecks),function(name,value){val+=(parseFloat(value)||0)})}return val};if(!supportsSetter){$.fn["outer"+Upper]=function(v,margin){var first=this[0];if(typeof v=="number"){first&&this[lower](v-getBoxes[lower](first,{padding:true,border:true,margin:margin}));return this}else{return first?checks["oldOuter"+Upper].apply(this,arguments):null}};$.fn["inner"+Upper]=function(v){var first=this[0];if(typeof v=="number"){first&&this[lower](v-getBoxes[lower](first,{padding:true}));return this}else{return first?checks["oldInner"+Upper].apply(this,arguments):null}}}var animate=function(boxes){return function(fx){if(fx[supportsSetter?"pos":"state"]==0){fx.start=$(fx.elem)[lower]();fx.end=fx.end-getBoxes[lower](fx.elem,boxes)}fx.elem.style[lower]=(fx.pos*(fx.end-fx.start)+fx.start)+"px"}};$.fx.step["outer"+Upper]=animate({padding:true,border:true});$.fx.step["outer"+Upper+"Margin"]=animate({padding:true,border:true,margin:true});$.fx.step["inner"+Upper]=animate({padding:true})});var keyBreaker=/[^\[\]]+/g,convertValue=function(value){if($.isNumeric(value)){return parseFloat(value)}else{if(value==="true"){return true}else{if(value==="false"){return false}else{if(value===""||value===null){return undefined}}}}return value},nestData=function(elem,type,data,parts,value,seen,fullName){var name=parts.shift();fullName=fullName?fullName+"."+name:name;if(parts.length){if(!data[name]){data[name]={}}nestData(elem,type,data[name],parts,value,seen,fullName)}else{if(fullName in seen&&type!="radio"&&!$.isArray(data[name])){if(name in data){data[name]=[data[name]]}else{data[name]=[]}}else{seen[fullName]=true}if((type=="radio"||type=="checkbox")&&!elem.is(":checked")){return}if(!data[name]){data[name]=value}else{data[name].push(value)}}};$.fn.extend({formParams:function(params){var convert;if(!!params===params){convert=params;params=null}if(params){return this.setParams(params)}else{return this.getParams(convert)}},setParams:function(params){this.find("[name]").each(function(){var $this=$(this),value=params[$this.attr("name")];if(value!==undefined){if($this.is(":radio")){if($this.val()==value){$this.attr("checked",true)}}else{if($this.is(":checkbox")){value=$.isArray(value)?value:[value];if($.inArray($this.val(),value)>-1){$this.attr("checked",true)}}else{$this.val(value)}}}})},getParams:function(convert){var data={},seen={},current;this.find("[name]:not(:disabled)").each(function(){var $this=$(this),type=$this.attr("type"),name=$this.attr("name"),value=$this.val(),parts;if(type=="submit"||!name){return}parts=name.match(keyBreaker);if(!parts.length){parts=[name]}if(convert){value=convertValue(value)}nestData($this,type,data,parts,value,seen)});return data}});$.fn.range=function(){return $.Range(this[0])};var convertType=function(type){return type.replace(/([a-z])([a-z]+)/gi,function(all,first,next){return first+next.toLowerCase()}).replace(/_/g,"")},reverse=function(type){return type.replace(/^([a-z]+)_TO_([a-z]+)/i,function(all,first,last){return last+"_TO_"+first})},getWindow=function(element){return element?element.ownerDocument.defaultView||element.ownerDocument.parentWindow:window},bisect=function(el,start,end){if(end-start==1){return}},support={};$.Range=function(range){if(this.constructor!==$.Range){return new $.Range(range)}if(range&&range.jquery){range=range[0]}if(!range||range.nodeType){this.win=getWindow(range);if(this.win.document.createRange){this.range=this.win.document.createRange()}else{if(this.win&&this.win.document.body&&this.win.document.body.createTextRange){this.range=this.win.document.body.createTextRange()}}if(range){this.select(range)}}else{if(range.clientX!=null||range.pageX!=null||range.left!=null){this.moveToPoint(range)}else{if(range.originalEvent&&range.originalEvent.touches&&range.originalEvent.touches.length){this.moveToPoint(range.originalEvent.touches[0])}else{if(range.originalEvent&&range.originalEvent.changedTouches&&range.originalEvent.changedTouches.length){this.moveToPoint(range.originalEvent.changedTouches[0])}else{this.range=range}}}}};$.Range.current=function(el){var win=getWindow(el),selection;if(win.getSelection){selection=win.getSelection();return new $.Range(selection.rangeCount?selection.getRangeAt(0):win.document.createRange())}else{return new $.Range(win.document.selection.createRange())}};$.extend($.Range.prototype,{moveToPoint:function(point){var clientX=point.clientX,clientY=point.clientY;if(!clientX){var off=scrollOffset();clientX=(point.pageX||point.left||0)-off.left;clientY=(point.pageY||point.top||0)-off.top}if(support.moveToPoint){this.range=$.Range().range;this.range.moveToPoint(clientX,clientY);return this}var parent=document.elementFromPoint(clientX,clientY);for(var n=0;n<parent.childNodes.length;n++){var node=parent.childNodes[n];if(node.nodeType===3||node.nodeType===4){var range=$.Range(node),length=range.toString().length;for(var i=1;i<length+1;i++){var rect=range.end(i).rect();if(rect.left<=clientX&&rect.left+rect.width>=clientX&&rect.top<=clientY&&rect.top+rect.height>=clientY){range.start(i-1);this.range=range.range;return this}}}}var previous;iterate(parent.childNodes,function(textNode){var range=$.Range(textNode);if(range.rect().top>point.clientY){return false}else{previous=range}});if(previous){previous.start(previous.toString().length);this.range=previous.range}else{this.range=$.Range(parent).range}},window:function(){return this.win||window},overlaps:function(elRange){if(elRange.nodeType){elRange=$.Range(elRange).select(elRange)}var startToStart=this.compare("START_TO_START",elRange),endToEnd=this.compare("END_TO_END",elRange);if(startToStart<=0&&endToEnd>=0){return true}if(startToStart>=0&&this.compare("START_TO_END",elRange)<=0){return true}if(this.compare("END_TO_START",elRange)>=0&&endToEnd<=0){return true}return false},collapse:function(toStart){this.range.collapse(toStart===undefined?true:toStart);return this},toString:function(){return typeof this.range.text=="string"?this.range.text:this.range.toString()},start:function(set){if(set===undefined){if(this.range.startContainer){return{container:this.range.startContainer,offset:this.range.startOffset}}else{var start=this.clone().collapse().parent();var startRange=$.Range(start).select(start).collapse();startRange.move("END_TO_START",this);return{container:start,offset:startRange.toString().length}}}else{if(this.range.setStart){if(typeof set=="number"){this.range.setStart(this.range.startContainer,set)}else{if(typeof set=="string"){var res=callMove(this.range.startContainer,this.range.startOffset,parseInt(set,10));this.range.setStart(res.node,res.offset)}else{this.range.setStart(set.container,set.offset)}}}else{if(typeof set=="string"){this.range.moveStart("character",parseInt(set,10))}else{var container=this.start().container,offset;if(typeof set=="number"){offset=set}else{container=set.container;offset=set.offset}var newPoint=$.Range(container).collapse();newPoint.range.move(offset);this.move("START_TO_START",newPoint)}}return this}},end:function(set){if(set===undefined){if(this.range.startContainer){return{container:this.range.endContainer,offset:this.range.endOffset}}else{var end=this.clone().collapse(false).parent(),endRange=$.Range(end).select(end).collapse();endRange.move("END_TO_END",this);return{container:end,offset:endRange.toString().length}}}else{if(this.range.setEnd){if(typeof set=="number"){this.range.setEnd(this.range.endContainer,set)}else{if(typeof set=="string"){var res=callMove(this.range.endContainer,this.range.endOffset,parseInt(set,10));this.range.setEnd(res.node,res.offset)}else{this.range.setEnd(set.container,set.offset)}}}else{if(typeof set=="string"){this.range.moveEnd("character",parseInt(set,10))}else{var container=this.end().container,offset;if(typeof set=="number"){offset=set}else{container=set.container;offset=set.offset}var newPoint=$.Range(container).collapse();newPoint.range.move(offset);this.move("END_TO_START",newPoint)}}return this}},parent:function(){if(this.range.commonAncestorContainer){return this.range.commonAncestorContainer}else{var parentElement=this.range.parentElement(),range=this.range;iterate(parentElement.childNodes,function(txtNode){if($.Range(txtNode).range.inRange(range)){parentElement=txtNode;return false}});return parentElement}},rect:function(from){var rect=this.range.getBoundingClientRect();if(!rect.height&&!rect.width){rect=this.range.getClientRects()[0]}if(from==="page"){var off=scrollOffset();rect=$.extend({},rect);rect.top+=off.top;rect.left+=off.left}return rect},rects:function(from){var rects=$.map($.makeArray(this.range.getClientRects()).sort(function(rect1,rect2){return rect2.width*rect2.height-rect1.width*rect1.height}),function(rect){return $.extend({},rect)}),i=0,j,len=rects.length;while(i<rects.length){var cur=rects[i],found=false;j=i+1;while(j<rects.length){if(withinRect(cur,rects[j])){if(!rects[j].width){rects.splice(j,1)}else{found=rects[j];break}}else{j++}}if(found){rects.splice(i,1)}else{i++}}if(from=="page"){var off=scrollOffset();return $.each(rects,function(ith,item){item.top+=off.top;item.left+=off.left})}return rects}});(function(){var fn=$.Range.prototype,range=$.Range().range;fn.compare=range.compareBoundaryPoints?function(type,range){return this.range.compareBoundaryPoints(this.window().Range[reverse(type)],range.range)}:function(type,range){return this.range.compareEndPoints(convertType(type),range.range)};fn.move=range.setStart?function(type,range){var rangesRange=range.range;switch(type){case"START_TO_END":this.range.setStart(rangesRange.endContainer,rangesRange.endOffset);break;case"START_TO_START":this.range.setStart(rangesRange.startContainer,rangesRange.startOffset);break;case"END_TO_END":this.range.setEnd(rangesRange.endContainer,rangesRange.endOffset);break;case"END_TO_START":this.range.setEnd(rangesRange.startContainer,rangesRange.startOffset);break}return this}:function(type,range){this.range.setEndPoint(convertType(type),range.range);return this};var cloneFunc=range.cloneRange?"cloneRange":"duplicate",selectFunc=range.selectNodeContents?"selectNodeContents":"moveToElementText";fn.clone=function(){return $.Range(this.range[cloneFunc]())};fn.select=range.selectNodeContents?function(el){if(!el){var selection=this.window().getSelection();selection.removeAllRanges();selection.addRange(this.range)}else{this.range.selectNodeContents(el)}return this}:function(el){if(!el){this.range.select()}else{if(el.nodeType===3){var parent=el.parentNode,start=0,end;iterate(parent.childNodes,function(txtNode){if(txtNode===el){end=start+txtNode.nodeValue.length;return false}else{start=start+txtNode.nodeValue.length}});this.range.moveToElementText(parent);this.range.moveEnd("character",end-this.range.text.length);this.range.moveStart("character",start)}else{this.range.moveToElementText(el)}}return this}})();var iterate=function(elems,cb){var elem,start;for(var i=0;elems[i];i++){elem=elems[i];if(elem.nodeType===3||elem.nodeType===4){if(cb(elem)===false){return false}}else{if(elem.nodeType!==8){if(iterate(elem.childNodes,cb)===false){return false}}}}},isText=function(node){return node.nodeType===3||node.nodeType===4},iteratorMaker=function(toChildren,toNext){return function(node,mustMoveRight){if(node[toChildren]&&!mustMoveRight){return isText(node[toChildren])?node[toChildren]:arguments.callee(node[toChildren])}else{if(node[toNext]){return isText(node[toNext])?node[toNext]:arguments.callee(node[toNext])}else{if(node.parentNode){return arguments.callee(node.parentNode,true)}}}}},getNextTextNode=iteratorMaker("firstChild","nextSibling"),getPrevTextNode=iteratorMaker("lastChild","previousSibling"),callMove=function(container,offset,howMany){var mover=howMany<0?getPrevTextNode:getNextTextNode;if(!isText(container)){container=container.childNodes[offset]?container.childNodes[offset]:container.lastChild;if(!isText(container)){container=mover(container)}return move(container,howMany)}else{if(offset+howMany<0){return move(mover(container),offset+howMany)}else{return move(container,offset+howMany)}}},move=function(from,howMany){var mover=howMany<0?getPrevTextNode:getNextTextNode;howMany=Math.abs(howMany);while(from&&howMany>=from.nodeValue.length){howMany=howMany-from.nodeValue.length;from=mover(from)}return{node:from,offset:mover===getNextTextNode?howMany:from.nodeValue.length-howMany}},supportWhitespace,isWhitespace=function(el){if(supportWhitespace==null){supportWhitespace="isElementContentWhitespace" in el}return(supportWhitespace?el.isElementContentWhitespace:(el.nodeType===3&&""==el.data.trim()))},within=function(rect,point){return rect.left<=point.clientX&&rect.left+rect.width>=point.clientX&&rect.top<=point.clientY&&rect.top+rect.height>=point.clientY},withinRect=function(outer,inner){return within(outer,{clientX:inner.left,clientY:inner.top})&&within(outer,{clientX:inner.left+inner.width,clientY:inner.top})&&within(outer,{clientX:inner.left,clientY:inner.top+inner.height})&&within(outer,{clientX:inner.left+inner.width,clientY:inner.top+inner.height})},scrollOffset=function(win){var win=win||window;doc=win.document.documentElement,body=win.document.body;return{left:(doc&&doc.scrollLeft||body&&body.scrollLeft||0)+(doc.clientLeft||0),top:(doc&&doc.scrollTop||body&&body.scrollTop||0)+(doc.clientTop||0)}};support.moveToPoint=!!$.Range().range.moveToPoint;var getWindow=function(element){return element?element.ownerDocument.defaultView||element.ownerDocument.parentWindow:window},getElementsSelection=function(el,win){var current=$.Range.current(el).clone(),entireElement=$.Range(el).select(el);if(!current.overlaps(entireElement)){return null}if(current.compare("START_TO_START",entireElement)<1){startPos=0;current.move("START_TO_START",entireElement)}else{fromElementToCurrent=entireElement.clone();fromElementToCurrent.move("END_TO_START",current);startPos=fromElementToCurrent.toString().length}if(current.compare("END_TO_END",entireElement)>=0){endPos=entireElement.toString().length}else{endPos=startPos+current.toString().length}return{start:startPos,end:endPos,width:endPos-startPos}},getSelection=function(el){var win=getWindow(el);if(el.selectionStart!==undefined){if(document.activeElement&&document.activeElement!=el&&el.selectionStart==el.selectionEnd&&el.selectionStart==0){return{start:el.value.length,end:el.value.length,width:0}}return{start:el.selectionStart,end:el.selectionEnd,width:el.selectionEnd-el.selectionStart}}else{if(win.getSelection){return getElementsSelection(el,win)}else{try{if(el.nodeName.toLowerCase()=="input"){var real=getWindow(el).document.selection.createRange(),r=el.createTextRange();r.setEndPoint("EndToStart",real);var start=r.text.length;return{start:start,end:start+real.text.length,width:real.text.length}}else{var res=getElementsSelection(el,win);if(!res){return res}var current=$.Range.current().clone(),r2=current.clone().collapse().range,r3=current.clone().collapse(false).range;r2.moveStart("character",-1);r3.moveStart("character",-1);if(res.startPos!=0&&r2.text==""){res.startPos+=2}if(res.endPos!=0&&r3.text==""){res.endPos+=2}return res}}catch(e){return{start:el.value.length,end:el.value.length,width:0}}}}},select=function(el,start,end){var win=getWindow(el);if(el.setSelectionRange){if(end===undefined){el.focus();el.setSelectionRange(start,start)}else{el.select();el.selectionStart=start;el.selectionEnd=end}}else{if(el.createTextRange){var r=el.createTextRange();r.moveStart("character",start);end=end||start;r.moveEnd("character",end-el.value.length);r.select()}else{if(win.getSelection){var doc=win.document,sel=win.getSelection(),range=doc.createRange(),ranges=[start,end!==undefined?end:start];getCharElement([el],ranges);range.setStart(ranges[0].el,ranges[0].count);range.setEnd(ranges[1].el,ranges[1].count);sel.removeAllRanges();sel.addRange(range)}else{if(win.document.body.createTextRange){var range=document.body.createTextRange();range.moveToElementText(el);range.collapse();range.moveStart("character",start);range.moveEnd("character",end!==undefined?end:start);range.select()}}}}},replaceWithLess=function(start,len,range,el){if(typeof range[0]==="number"&&range[0]<len){range[0]={el:el,count:range[0]-start}}if(typeof range[1]==="number"&&range[1]<=len){range[1]={el:el,count:range[1]-start}}},getCharElement=function(elems,range,len){var elem,start;len=len||0;for(var i=0;elems[i];i++){elem=elems[i];if(elem.nodeType===3||elem.nodeType===4){start=len;len+=elem.nodeValue.length;replaceWithLess(start,len,range,elem)}else{if(elem.nodeType!==8){len=getCharElement(elem.childNodes,range,len)}}}return len};$.fn.selection=function(start,end){if(start!==undefined){return this.each(function(){select(this,start,end)})}else{return getSelection(this[0])}};$.fn.selection.getCharElement=getCharElement;var withinBox=function(x,y,left,top,width,height){return(y>=top&&y<top+height&&x>=left&&x<left+width)};$.fn.within=function(left,top,useOffsetCache){var ret=[];this.each(function(){var q=jQuery(this);if(this==document.documentElement){return ret.push(this)}var offset=useOffsetCache?$.data(this,"offsetCache")||$.data(this,"offsetCache",q.offset()):q.offset();var res=withinBox(left,top,offset.left,offset.top,this.offsetWidth,this.offsetHeight);if(res){ret.push(this)}});return this.pushStack($.unique(ret),"within",left+","+top)};$.fn.withinBox=function(left,top,width,height,useOffsetCache){var ret=[];this.each(function(){var q=jQuery(this);if(this==document.documentElement){return ret.push(this)}var offset=useOffsetCache?$.data(this,"offset")||$.data(this,"offset",q.offset()):q.offset();var ew=q.width(),eh=q.height(),res=!((offset.top>top+height)||(offset.top+eh<top)||(offset.left>left+width)||(offset.left+ew<left));if(res){ret.push(this)}});return this.pushStack($.unique(ret),"withinBox",$.makeArray(arguments).join(","))};$.fn.triggerAsync=function(type,data,success,prevented){if(typeof data=="function"){prevented=success;success=data;data=undefined}if(this.length){var el=this;setTimeout(function(){el.trigger({type:type,_success:success,_prevented:prevented},data)},0)}else{if(success){success.call(this)}}return this};var types={},rnamespaces=/\.(.*)$/,$event=$.event;$event.special["default"]={add:function(handleObj){types[handleObj.namespace.replace(rnamespaces,"")]=true},setup:function(){return true}};var oldTrigger=$event.trigger;$event.trigger=function defaultTriggerer(event,data,elem,onlyHandlers){var type=event.type||event,event=typeof event==="object"?event[$.expando]?event:new $.Event(type,event):new $.Event(type),res=oldTrigger.call($.event,event,data,elem,onlyHandlers),paused=event.isPaused&&event.isPaused();if(!onlyHandlers&&!event.isDefaultPrevented()&&event.type.indexOf("default")!==0){oldTrigger("default."+event.type,data,elem);if(event._success){event._success(event)}}if(!onlyHandlers&&event.isDefaultPrevented()&&event.type.indexOf("default")!==0&&!paused){if(event._prevented){event._prevented(event)}}if(paused){event.isDefaultPrevented=event.pausedState.isDefaultPrevented;event.isPropagationStopped=event.pausedState.isPropagationStopped}return res};var oldClean=$.cleanData;$.cleanData=function(elems){for(var i=0,elem;(elem=elems[i])!==undefined;i++){$(elem).triggerHandler("destroyed")}oldClean(elems)};var getSetZero=function(v){return v!==undefined?(this.array[0]=v):this.array[0]},getSetOne=function(v){return v!==undefined?(this.array[1]=v):this.array[1]};$.Vector=function(arr){var array=$.isArray(arr)?arr:$.makeArray(arguments);this.update(array)};$.Vector.prototype={app:function(f){var i,newArr=[];for(i=0;i<this.array.length;i++){newArr.push(f(this.array[i],i))}return new $.Vector(newArr)},plus:function(){var i,args=arguments[0] instanceof $.Vector?arguments[0].array:$.makeArray(arguments),arr=this.array.slice(0),vec=new $.Vector();for(i=0;i<args.length;i++){arr[i]=(arr[i]?arr[i]:0)+args[i]}return vec.update(arr)},minus:function(){var i,args=arguments[0] instanceof $.Vector?arguments[0].array:$.makeArray(arguments),arr=this.array.slice(0),vec=new $.Vector();for(i=0;i<args.length;i++){arr[i]=(arr[i]?arr[i]:0)-args[i]}return vec.update(arr)},equals:function(){var i,args=arguments[0] instanceof $.Vector?arguments[0].array:$.makeArray(arguments),arr=this.array.slice(0),vec=new $.Vector();for(i=0;i<args.length;i++){if(arr[i]!=args[i]){return null}}return vec.update(arr)},x:getSetZero,left:getSetZero,width:getSetZero,y:getSetOne,top:getSetOne,height:getSetOne,toString:function(){return"("+this.array.join(", ")+")"},update:function(array){var i;if(this.array){for(i=0;i<this.array.length;i++){delete this.array[i]}}this.array=array;for(i=0;i<array.length;i++){this[i]=this.array[i]}return this}};$.Event.prototype.vector=function(){var touches="ontouchend" in document&&this.originalEvent.touches&&this.originalEvent.touches.length?this.originalEvent.changedTouches[0]:this;if(this.originalEvent.synthetic){var doc=document.documentElement,body=document.body;return new $.Vector(touches.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0),touches.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0))}else{return new $.Vector(touches.pageX,touches.pageY)}};$.fn.offsetv=function(){if(this[0]==window){return new $.Vector(window.pageXOffset?window.pageXOffset:document.documentElement.scrollLeft,window.pageYOffset?window.pageYOffset:document.documentElement.scrollTop)}else{var offset=this.offset();return new $.Vector(offset.left,offset.top)}};$.fn.dimensionsv=function(which){if(this[0]==window||!which){return new $.Vector(this.width(),this.height())}else{return new $.Vector(this[which+"Width"](),this[which+"Height"]())}};var event=$.event,findHelper=function(events,types,callback,selector){var t,type,typeHandlers,all,h,handle,namespaces,namespace,match;for(t=0;t<types.length;t++){type=types[t];all=type.indexOf(".")<0;if(!all){namespaces=type.split(".");type=namespaces.shift();namespace=new RegExp("(^|\\.)"+namespaces.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}typeHandlers=(events[type]||[]).slice(0);for(h=0;h<typeHandlers.length;h++){handle=typeHandlers[h];match=(all||namespace.test(handle.namespace));if(match){if(selector){if(handle.selector===selector){callback(type,handle.origHandler||handle.handler)}}else{if(selector===null){callback(type,handle.origHandler||handle.handler,handle.selector)}else{if(!handle.selector){callback(type,handle.origHandler||handle.handler)}}}}}}};event.find=function(el,types,selector){var events=($._data(el)||{}).events,handlers=[],t,liver,live;if(!events){return handlers}findHelper(events,types,function(type,handler){handlers.push(handler)},selector);return handlers};event.findBySelector=function(el,types){var events=$._data(el).events,selectors={},add=function(selector,event,handler){var select=selectors[selector]||(selectors[selector]={}),events=select[event]||(select[event]=[]);events.push(handler)};if(!events){return selectors}findHelper(events,types,function(type,handler,selector){add(selector||"",type,handler)},null);return selectors};event.supportTouch="ontouchend" in document;$.fn.respondsTo=function(events){if(!this.length){return false}else{return event.find(this[0],$.isArray(events)?events:[events]).length>0}};$.fn.triggerHandled=function(event,data){event=(typeof event=="string"?$.Event(event):event);this.trigger(event,data);return event.handled};event.setupHelper=function(types,startingEvent,onFirst){if(!onFirst){onFirst=startingEvent;startingEvent=null}var add=function(handleObj){var bySelector,selector=handleObj.selector||"",namespace=handleObj.namespace?"."+handleObj.namespace:"";if(selector){bySelector=event.find(this,types,selector);if(!bySelector.length){$(this).delegate(selector,startingEvent+namespace,onFirst)}}else{if(!event.find(this,types,selector).length){event.add(this,startingEvent+namespace,onFirst,{selector:selector,delegate:this})}}},remove=function(handleObj){var bySelector,selector=handleObj.selector||"";if(selector){bySelector=event.find(this,types,selector);if(!bySelector.length){$(this).undelegate(selector,startingEvent,onFirst)}}else{if(!event.find(this,types,selector).length){event.remove(this,startingEvent,onFirst,{selector:selector,delegate:this})}}};$.each(types,function(){event.special[this]={add:add,remove:remove,setup:function(){},teardown:function(){}}})};$.event.reverse=function(name,attributes){var bound=$(),count=0,dispatch=$.event.handle||$.event.dispatch;$.event.special[name]={setup:function(){if(this!==window){bound.push(this);$.unique(bound)}return this!==window},teardown:function(){bound=bound.not(this);return this!==window},add:function(handleObj){var origHandler=handleObj.handler;handleObj.origHandler=origHandler;handleObj.handler=function(ev,data){var isWindow=this===window;if(attributes&&attributes.handler){var result=attributes.handler.apply(this,arguments);if(result===true){return}}if(count===0){count++;var where=data===false?ev.target:this;dispatch.call(where,ev,data);if(ev.isPropagationStopped()){count--;return}var index=bound.index(this),length=bound.length,child,sub;while(++index<length&&(child=bound[index])&&(isWindow||$.contains(where,child))){dispatch.call(child,ev,data);if(ev.isPropagationStopped()){while(++index<length&&(sub=bound[index])){if(!$.contains(child,sub)){index--;break}}}}ev.stopImmediatePropagation();count--}else{handleObj.origHandler.call(this,ev,data)}}}};$([document,window]).bind(name,function(){});return $.event.special[name]};if(!$.event.special.move){$.event.reverse("move")}var bind=function(object,method){var args=Array.prototype.slice.call(arguments,2);return function(){var args2=[this].concat(args,$.makeArray(arguments));return method.apply(object,args2)}},event=$.event,clearSelection=window.getSelection?function(){window.getSelection().removeAllRanges()}:function(){},supportTouch="ontouchend" in document,startEvent=supportTouch?"touchstart":"mousedown",stopEvent=supportTouch?"touchend":"mouseup",moveEvent=supportTouch?"touchmove":"mousemove",preventTouchScroll=function(ev){ev.preventDefault()};$.Drag=function(){};$.extend($.Drag,{lowerName:"drag",current:null,distance:0,mousedown:function(ev,element){var isLeftButton=ev.button===0||ev.button==1,doEvent=isLeftButton||supportTouch;if(!doEvent||this.current){return}var drag=new $.Drag(),delegate=ev.delegateTarget||element,selector=ev.handleObj.selector,self=this;this.current=drag;drag.setup({element:element,delegate:ev.delegateTarget||element,selector:ev.handleObj.selector,moved:false,_distance:this.distance,callbacks:{dragdown:event.find(delegate,["dragdown"],selector),draginit:event.find(delegate,["draginit"],selector),dragover:event.find(delegate,["dragover"],selector),dragmove:event.find(delegate,["dragmove"],selector),dragout:event.find(delegate,["dragout"],selector),dragend:event.find(delegate,["dragend"],selector),dragcleanup:event.find(delegate,["dragcleanup"],selector)},destroyed:function(){self.current=null}},ev)}});$.extend($.Drag.prototype,{setup:function(options,ev){$.extend(this,options);this.element=$(this.element);this.event=ev;this.moved=false;this.allowOtherDrags=false;var mousemove=bind(this,this.mousemove),mouseup=bind(this,this.mouseup);this._mousemove=mousemove;this._mouseup=mouseup;this._distance=options.distance?options.distance:0;this.mouseStartPosition=ev.vector();$(document).bind(moveEvent,mousemove);$(document).bind(stopEvent,mouseup);if(supportTouch){$(document).bind(moveEvent,preventTouchScroll)}if(!this.callEvents("down",this.element,ev)){this.noSelection(this.delegate);clearSelection()}},destroy:function(){$(document).unbind(moveEvent,this._mousemove);$(document).unbind(stopEvent,this._mouseup);if(supportTouch){$(document).unbind(moveEvent,preventTouchScroll)}if(!this.moved){this.event=this.element=null}if(!supportTouch){this.selection(this.delegate)}this.destroyed()},mousemove:function(docEl,ev){if(!this.moved){var dist=Math.sqrt(Math.pow(ev.pageX-this.event.pageX,2)+Math.pow(ev.pageY-this.event.pageY,2));if(dist<this._distance){return false}this.init(this.element,ev);this.moved=true}this.element.trigger("move",this);var pointer=ev.vector();if(this._start_position&&this._start_position.equals(pointer)){return}this.draw(pointer,ev)},mouseup:function(docEl,event){if(this.moved){this.end(event)}this.destroy()},noSelection:function(elm){elm=elm||this.delegate;document.documentElement.onselectstart=function(){return false};document.documentElement.unselectable="on";this.selectionDisabled=(this.selectionDisabled?this.selectionDisabled.add(elm):$(elm));this.selectionDisabled.css("-moz-user-select","-moz-none")},selection:function(){if(this.selectionDisabled){document.documentElement.onselectstart=function(){};document.documentElement.unselectable="off";this.selectionDisabled.css("-moz-user-select","")}},init:function(element,event){element=$(element);var startElement=(this.movingElement=(this.element=$(element)));this._cancelled=false;this.event=event;this.mouseElementPosition=this.mouseStartPosition.minus(this.element.offsetv());this.callEvents("init",element,event);if(this._cancelled===true){return}this.startPosition=startElement!=this.movingElement?this.movingElement.offsetv():this.currentDelta();this.makePositioned(this.movingElement);this.oldZIndex=this.movingElement.css("zIndex");this.movingElement.css("zIndex",1000);if(!this._only&&this.constructor.responder){this.constructor.responder.compile(event,this)}},makePositioned:function(that){var style,pos=that.css("position");if(!pos||pos=="static"){style={position:"relative"};if(window.opera){style.top="0px";style.left="0px"}that.css(style)}},callEvents:function(type,element,event,drop){var i,cbs=this.callbacks[this.constructor.lowerName+type];for(i=0;i<cbs.length;i++){cbs[i].call(element,event,this,drop)}return cbs.length},currentDelta:function(){return new $.Vector(parseInt(this.movingElement.css("left"),10)||0,parseInt(this.movingElement.css("top"),10)||0)},draw:function(pointer,event){if(this._cancelled){return}clearSelection();this.location=pointer.minus(this.mouseElementPosition);this.move(event);if(this._cancelled){return}if(!event.isDefaultPrevented()){this.position(this.location)}if(!this._only&&this.constructor.responder){this.constructor.responder.show(pointer,this,event)}},position:function(newOffsetv){var style,dragged_element_css_offset=this.currentDelta(),dragged_element_position_vector=this.movingElement.offsetv().minus(dragged_element_css_offset);this.required_css_position=newOffsetv.minus(dragged_element_position_vector);this.offsetv=newOffsetv;style=this.movingElement[0].style;if(!this._cancelled&&!this._horizontal){style.top=this.required_css_position.top()+"px"}if(!this._cancelled&&!this._vertical){style.left=this.required_css_position.left()+"px"}},move:function(event){this.callEvents("move",this.element,event)},over:function(event,drop){this.callEvents("over",this.element,event,drop)},out:function(event,drop){this.callEvents("out",this.element,event,drop)},end:function(event){if(this._cancelled){return}if(!this._only&&this.constructor.responder){this.constructor.responder.end(event,this)}this.callEvents("end",this.element,event);if(this._revert){var self=this;this.movingElement.animate({top:this.startPosition.top()+"px",left:this.startPosition.left()+"px"},function(){self.cleanup.apply(self,arguments)})}else{this.cleanup(event)}this.event=null},cleanup:function(event){this.movingElement.css({zIndex:this.oldZIndex});if(this.movingElement[0]!==this.element[0]&&!this.movingElement.has(this.element[0]).length&&!this.element.has(this.movingElement[0]).length){this.movingElement.css({display:"none"})}if(this._removeMovingElement){this.movingElement.remove()}if(event){this.callEvents("cleanup",this.element,event)}this.movingElement=this.element=this.event=null},cancel:function(){this._cancelled=true;if(!this._only&&this.constructor.responder){this.constructor.responder.clear(this.event.vector(),this,this.event)}this.destroy()},ghost:function(parent){var ghost=this.movingElement.clone().css("position","absolute");if(parent){$(parent).append(ghost)}else{$(this.movingElement).after(ghost)}ghost.width(this.movingElement.width()).height(this.movingElement.height());ghost.offset(this.movingElement.offset());this.movingElement=ghost;this.noSelection(ghost);this._removeMovingElement=true;return ghost},representative:function(element,offsetX,offsetY){this._offsetX=offsetX||0;this._offsetY=offsetY||0;var p=this.mouseStartPosition;this.movingElement=$(element);this.movingElement.css({top:(p.y()-this._offsetY)+"px",left:(p.x()-this._offsetX)+"px",display:"block",position:"absolute"}).show();this.noSelection(this.movingElement);this.mouseElementPosition=new $.Vector(this._offsetX,this._offsetY);return this},revert:function(val){this._revert=val===undefined?true:val;return this},vertical:function(){this._vertical=true;return this},horizontal:function(){this._horizontal=true;return this},only:function(only){return(this._only=(only===undefined?true:only))},distance:function(val){if(val!==undefined){this._distance=val;return this}else{return this._distance}}});event.setupHelper(["dragdown","draginit","dragover","dragmove","dragout","dragend","dragcleanup"],startEvent,function(e){$.Drag.mousedown.call($.Drag,e,this)});var round=function(x,m){return Math.round(x/m)*m};$.Drag.prototype.step=function(amount,container,center){if(typeof amount=="number"){amount={x:amount,y:amount}}container=container||$(document.body);this._step=amount;var styles=container.styles("borderTopWidth","paddingTop","borderLeftWidth","paddingLeft");var top=parseInt(styles.borderTopWidth)+parseInt(styles.paddingTop),left=parseInt(styles.borderLeftWidth)+parseInt(styles.paddingLeft);this._step.offset=container.offsetv().plus(left,top);this._step.center=center;return this};(function(){var oldPosition=$.Drag.prototype.position;$.Drag.prototype.position=function(offsetPositionv){if(this._step){var step=this._step,center=step.center&&step.center.toLowerCase(),movingSize=this.movingElement.dimensionsv("outer"),lot=step.offset.top()-(center&&center!="x"?movingSize.height()/2:0),lof=step.offset.left()-(center&&center!="y"?movingSize.width()/2:0);if(this._step.x){offsetPositionv.left(Math.round(lof+round(offsetPositionv.left()-lof,this._step.x)))}if(this._step.y){offsetPositionv.top(Math.round(lot+round(offsetPositionv.top()-lot,this._step.y)))}}oldPosition.call(this,offsetPositionv)}})();$.Drag.prototype.limit=function(container,center){var styles=container.styles("borderTopWidth","paddingTop","borderLeftWidth","paddingLeft"),paddingBorder=new $.Vector(parseInt(styles.borderLeftWidth,10)+parseInt(styles.paddingLeft,10)||0,parseInt(styles.borderTopWidth,10)+parseInt(styles.paddingTop,10)||0);this._limit={offset:container.offsetv().plus(paddingBorder),size:container.dimensionsv(),center:center===true?"both":center};return this};var oldPosition=$.Drag.prototype.position;$.Drag.prototype.position=function(offsetPositionv){if(this._limit){var limit=this._limit,center=limit.center&&limit.center.toLowerCase(),movingSize=this.movingElement.dimensionsv("outer"),halfHeight=center&&center!="x"?movingSize.height()/2:0,halfWidth=center&&center!="y"?movingSize.width()/2:0,lot=limit.offset.top(),lof=limit.offset.left(),height=limit.size.height(),width=limit.size.width();if(offsetPositionv.top()+halfHeight<lot){offsetPositionv.top(lot-halfHeight)}if(offsetPositionv.top()+movingSize.height()-halfHeight>lot+height){offsetPositionv.top(lot+height-movingSize.height()+halfHeight)}if(offsetPositionv.left()+halfWidth<lof){offsetPositionv.left(lof-halfWidth)}if(offsetPositionv.left()+movingSize.width()-halfWidth>lof+width){offsetPositionv.left(lof+width-movingSize.left()+halfWidth)}}oldPosition.call(this,offsetPositionv)};var event=$.event;var eventNames=["dropover","dropon","dropout","dropinit","dropmove","dropend"];$.Drop=function(callbacks,element){$.extend(this,callbacks);this.element=$(element)};$.each(eventNames,function(){event.special[this]={add:function(handleObj){var el=$(this),current=(el.data("dropEventCount")||0);el.data("dropEventCount",current+1);if(current==0){$.Drop.addElement(this)}},remove:function(){var el=$(this),current=(el.data("dropEventCount")||0);el.data("dropEventCount",current-1);if(current<=1){$.Drop.removeElement(this)}}}});$.extend($.Drop,{lowerName:"drop",_rootElements:[],_elements:$(),last_active:[],endName:"dropon",addElement:function(el){for(var i=0;i<this._rootElements.length;i++){if(el==this._rootElements[i]){return}}this._rootElements.push(el)},removeElement:function(el){for(var i=0;i<this._rootElements.length;i++){if(el==this._rootElements[i]){this._rootElements.splice(i,1);return}}},sortByDeepestChild:function(a,b){var compare=a.element.compare(b.element);if(compare&16||compare&4){return 1}if(compare&8||compare&2){return -1}return 0},isAffected:function(point,moveable,responder){return((responder.element!=moveable.element)&&(responder.element.within(point[0],point[1],responder._cache).length==1))},deactivate:function(responder,mover,event){mover.out(event,responder);responder.callHandlers(this.lowerName+"out",responder.element[0],event,mover)},activate:function(responder,mover,event){mover.over(event,responder);responder.callHandlers(this.lowerName+"over",responder.element[0],event,mover)},move:function(responder,mover,event){responder.callHandlers(this.lowerName+"move",responder.element[0],event,mover)},compile:function(event,drag){if(!this.dragging&&!drag){return}else{if(!this.dragging){this.dragging=drag;this.last_active=[]}}var el,drops,selector,dropResponders,newEls=[],dragging=this.dragging;for(var i=0;i<this._rootElements.length;i++){el=this._rootElements[i];var drops=$.event.findBySelector(el,eventNames);for(selector in drops){dropResponders=selector?jQuery(selector,el):[el];for(var e=0;e<dropResponders.length;e++){if(this.addCallbacks(dropResponders[e],drops[selector],dragging)){newEls.push(dropResponders[e])}}}}this.add(newEls,event,dragging)},addCallbacks:function(el,callbacks,onlyNew){var origData=$.data(el,"_dropData");if(!origData){$.data(el,"_dropData",new $.Drop(callbacks,el));return true}else{if(!onlyNew){var origCbs=origData;for(var eventName in callbacks){origCbs[eventName]=origCbs[eventName]?origCbs[eventName].concat(callbacks[eventName]):callbacks[eventName]}return false}}},add:function(newEls,event,drag,dragging){var i=0,drop;while(i<newEls.length){drop=$.data(newEls[i],"_dropData");drop.callHandlers(this.lowerName+"init",newEls[i],event,drag);if(drop._canceled){newEls.splice(i,1)}else{i++}}this._elements.push.apply(this._elements,newEls)},show:function(point,moveable,event){var element=moveable.element;if(!this._elements.length){return}var respondable,affected=[],propagate=true,i=0,j,la,toBeActivated,aff,oldLastActive=this.last_active,responders=[],self=this,drag;while(i<this._elements.length){drag=$.data(this._elements[i],"_dropData");if(!drag){this._elements.splice(i,1)}else{i++;if(self.isAffected(point,moveable,drag)){affected.push(drag)}}}affected.sort(this.sortByDeepestChild);event.stopRespondPropagate=function(){propagate=false};toBeActivated=affected.slice();this.last_active=affected;for(j=0;j<oldLastActive.length;j++){la=oldLastActive[j];i=0;while((aff=toBeActivated[i])){if(la==aff){toBeActivated.splice(i,1);break}else{i++}}if(!aff){this.deactivate(la,moveable,event)}if(!propagate){return}}for(var i=0;i<toBeActivated.length;i++){this.activate(toBeActivated[i],moveable,event);if(!propagate){return}}for(i=0;i<affected.length;i++){this.move(affected[i],moveable,event);if(!propagate){return}}},end:function(event,moveable){var la,endName=this.lowerName+"end",onEvent=$.Event(this.endName,event),dropData;for(var i=0;i<this.last_active.length;i++){la=this.last_active[i];if(this.isAffected(event.vector(),moveable,la)&&la[this.endName]){la.callHandlers(this.endName,null,onEvent,moveable)}if(onEvent.isPropagationStopped()){break}}for(var r=0;r<this._elements.length;r++){dropData=$.data(this._elements[r],"_dropData");dropData&&dropData.callHandlers(endName,null,event,moveable)}this.clear()},clear:function(){this._elements.each(function(){$.removeData(this,"_dropData")});this._elements=$();delete this.dragging}});$.Drag.responder=$.Drop;$.extend($.Drop.prototype,{callHandlers:function(method,el,ev,drag){var length=this[method]?this[method].length:0;for(var i=0;i<length;i++){this[method][i].call(el||this.element[0],ev,this,drag)}},cache:function(value){this._cache=value!=null?value:true},cancel:function(){this._canceled=true}});$.Drag.prototype.scrolls=function(elements,options){var elements=$(elements);for(var i=0;i<elements.length;i++){this.constructor.responder._elements.push(elements.eq(i).data("_dropData",new $.Scrollable(elements[i],options))[0])}},$.Scrollable=function(element,options){this.element=jQuery(element);this.options=$.extend({distance:30,delta:function(diff,distance){return(distance-diff)/2},direction:"xy"},options);this.x=this.options.direction.indexOf("x")!=-1;this.y=this.options.direction.indexOf("y")!=-1};$.extend($.Scrollable.prototype,{init:function(element){this.element=jQuery(element)},callHandlers:function(method,el,ev,drag){this[method](el||this.element[0],ev,this,drag)},dropover:function(){},dropon:function(){this.clear_timeout()},dropout:function(){this.clear_timeout()},dropinit:function(){},dropend:function(){},clear_timeout:function(){if(this.interval){clearTimeout(this.interval);this.interval=null}},distance:function(diff){return(30-diff)/2},dropmove:function(el,ev,drop,drag){this.clear_timeout();var mouse=ev.vector(),location_object=$(el==document.documentElement?window:el),dimensions=location_object.dimensionsv("outer"),position=location_object.offsetv(),bottom=position.y()+dimensions.y()-mouse.y(),top=mouse.y()-position.y(),right=position.x()+dimensions.x()-mouse.x(),left=mouse.x()-position.x(),dx=0,dy=0,distance=this.options.distance;if(bottom<distance&&this.y){dy=this.options.delta(bottom,distance)}else{if(top<distance&&this.y){dy=-this.options.delta(top,distance)}}if(right<distance&&this.options&&this.x){dx=this.options.delta(right,distance)}else{if(left<distance&&this.x){dx=-this.options.delta(left,distance)}}if(dx||dy){var self=this;this.interval=setTimeout(function(){self.move($(el),drag.movingElement,dx,dy,ev,ev.clientX,ev.clientY,ev.screenX,ev.screenY)},15)}},move:function(scroll_element,drag_element,dx,dy,ev){scroll_element.scrollTop(scroll_element.scrollTop()+dy);scroll_element.scrollLeft(scroll_element.scrollLeft()+dx);drag_element.trigger($.event.fix({type:"mousemove",clientX:ev.clientX,clientY:ev.clientY,screenX:ev.screenX,screenY:ev.screenY,pageX:ev.pageX,pageY:ev.pageY}))}});if(Object.defineProperties){var set=function(obj,prop,val){if(val!==undefined){Object.defineProperty(obj,prop,{value:val})}return val},special={pageX:function(original){if(!original){return}var eventDoc=this.target.ownerDocument||document;doc=eventDoc.documentElement;body=eventDoc.body;return original.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0)},pageY:function(original){if(!original){return}var eventDoc=this.target.ownerDocument||document;doc=eventDoc.documentElement;body=eventDoc.body;return original.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0)},relatedTarget:function(original){if(!original){return}return original.fromElement===this.target?original.toElement:original.fromElement},metaKey:function(originalEvent){if(!originalEvent){return}return originalEvent.ctrlKey},which:function(original){if(!original){return}return original.charCode!=null?original.charCode:original.keyCode}};$.each($.event.keyHooks.props.concat($.event.mouseHooks.props).concat($.event.props),function(i,prop){if(prop!=="target"){(function(){Object.defineProperty($.Event.prototype,prop,{get:function(){var originalValue=this.originalEvent&&this.originalEvent[prop];return this["_"+prop]!==undefined?this["_"+prop]:set(this,prop,special[prop]&&originalValue===undefined?special[prop].call(this,this.originalEvent):originalValue)},set:function(newValue){this["_"+prop]=newValue}})})()}});$.event.fix=function(event){if(event[$.expando]){return event}var originalEvent=event,event=$.Event(originalEvent);event.target=originalEvent.target;if(!event.target){event.target=originalEvent.srcElement||document}if(event.target.nodeType===3){event.target=event.target.parentNode}return event}}$.Hover=function(){this._delay=$.Hover.delay;this._distance=$.Hover.distance;this._leave=$.Hover.leave};$.extend($.Hover,{delay:100,distance:10,leave:0});$.extend($.Hover.prototype,{delay:function(delay){this._delay=delay;return this},distance:function(distance){this._distance=distance;return this},leave:function(leave){this._leave=leave;return this}});var event=$.event,handle=event.handle,onmouseenter=function(ev){var delegate=ev.delegateTarget||ev.currentTarget;var selector=ev.handleObj.selector;var pending=$.data(delegate,"_hover"+selector);if(pending){if(!pending.forcing){pending.forcing=true;clearTimeout(pending.leaveTimer);var leaveTime=pending.leaving?Math.max(0,pending.hover.leave-(new Date()-pending.leaving)):pending.hover.leave;var self=this;setTimeout(function(){pending.callHoverLeave();onmouseenter.call(self,ev)},leaveTime)}return}var loc={pageX:ev.pageX,pageY:ev.pageY},dist=0,timer,enteredEl=this,hovered=false,lastEv=ev,hover=new $.Hover(),leaveTimer,callHoverLeave=function(){$.each(event.find(delegate,["hoverleave"],selector),function(){this.call(enteredEl,ev,hover)});cleanUp()},mousemove=function(ev){clearTimeout(leaveTimer);dist+=Math.pow(ev.pageX-loc.pageX,2)+Math.pow(ev.pageY-loc.pageY,2);loc={pageX:ev.pageX,pageY:ev.pageY};lastEv=ev},mouseleave=function(ev){clearTimeout(timer);if(hovered){if(hover._leave===0){callHoverLeave()}else{clearTimeout(leaveTimer);pending.leaving=new Date();leaveTimer=pending.leaveTimer=setTimeout(function(){callHoverLeave()},hover._leave)}}else{cleanUp()}},cleanUp=function(){$(enteredEl).unbind("mouseleave",mouseleave);$(enteredEl).unbind("mousemove",mousemove);$.removeData(delegate,"_hover"+selector)},hoverenter=function(){$.each(event.find(delegate,["hoverenter"],selector),function(){this.call(enteredEl,lastEv,hover)});hovered=true};pending={callHoverLeave:callHoverLeave,hover:hover};$.data(delegate,"_hover"+selector,pending);$(enteredEl).bind("mousemove",mousemove).bind("mouseleave",mouseleave);$.each(event.find(delegate,["hoverinit"],selector),function(){this.call(enteredEl,ev,hover)});if(hover._delay===0){hoverenter()}else{timer=setTimeout(function(){if(dist<hover._distance&&$(enteredEl).queue().length==0){hoverenter();return}else{dist=0;timer=setTimeout(arguments.callee,hover._delay)}},hover._delay)}};event.setupHelper(["hoverinit","hoverenter","hoverleave","hovermove"],"mouseenter",onmouseenter);var uaMatch=function(ua){ua=ua.toLowerCase();var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"}};var keymap={},reverseKeyMap={},currentBrowser=uaMatch(navigator.userAgent).browser;$.event.key=function(browser,map){if(browser===undefined){return keymap}if(map===undefined){map=browser;browser=currentBrowser}if(!keymap[browser]){keymap[browser]={}}$.extend(keymap[browser],map);if(!reverseKeyMap[browser]){reverseKeyMap[browser]={}}for(var name in map){reverseKeyMap[browser][map[name]]=name}};$.event.key({"\b":"8","\t":"9","\r":"13",shift:"16",ctrl:"17",alt:"18","pause-break":"19",caps:"20",escape:"27","num-lock":"144","scroll-lock":"145",print:"44","page-up":"33","page-down":"34",end:"35",home:"36",left:"37",up:"38",right:"39",down:"40",insert:"45","delete":"46"," ":"32","0":"48","1":"49","2":"50","3":"51","4":"52","5":"53","6":"54","7":"55","8":"56","9":"57",a:"65",b:"66",c:"67",d:"68",e:"69",f:"70",g:"71",h:"72",i:"73",j:"74",k:"75",l:"76",m:"77",n:"78",o:"79",p:"80",q:"81",r:"82",s:"83",t:"84",u:"85",v:"86",w:"87",x:"88",y:"89",z:"90",num0:"96",num1:"97",num2:"98",num3:"99",num4:"100",num5:"101",num6:"102",num7:"103",num8:"104",num9:"105","*":"106","+":"107","-":"109",".":"110","/":"111",";":"186","=":"187",",":"188","-":"189",".":"190","/":"191","`":"192","[":"219","\\":"220","]":"221","'":"222","left window key":"91","right window key":"92","select key":"93",f1:"112",f2:"113",f3:"114",f4:"115",f5:"116",f6:"117",f7:"118",f8:"119",f9:"120",f10:"121",f11:"122",f12:"123"});$.Event.prototype.keyName=function(){var event=this,test=/\w/,key_Key=reverseKeyMap[currentBrowser][(event.keyCode||event.which)+""],char_Key=String.fromCharCode(event.keyCode||event.which),key_Char=event.charCode&&reverseKeyMap[currentBrowser][event.charCode+""],char_Char=event.charCode&&String.fromCharCode(event.charCode);if(char_Char&&test.test(char_Char)){return char_Char.toLowerCase()}if(key_Char&&test.test(key_Char)){return char_Char.toLowerCase()}if(char_Key&&test.test(char_Key)){return char_Key.toLowerCase()}if(key_Key&&test.test(key_Key)){return key_Key.toLowerCase()}if(event.type=="keypress"){return event.keyCode?String.fromCharCode(event.keyCode):String.fromCharCode(event.which)}if(!event.keyCode&&event.which){return String.fromCharCode(event.which)}return reverseKeyMap[currentBrowser][event.keyCode+""]};var current,rnamespaces=/\.(.*)$/,returnFalse=function(){return false},returnTrue=function(){return true};$.Event.prototype.isPaused=returnFalse;$.Event.prototype.pause=function(){this.pausedState={isDefaultPrevented:this.isDefaultPrevented()?returnTrue:returnFalse,isPropagationStopped:this.isPropagationStopped()?returnTrue:returnFalse};this.stopImmediatePropagation();this.preventDefault();this.isPaused=returnTrue};$.Event.prototype.resume=function(){var handleObj=this.handleObj,currentTarget=this.currentTarget;var origType=$.event.special[handleObj.origType],origHandle=origType&&origType.handle;if(!origType){$.event.special[handleObj.origType]={}}$.event.special[handleObj.origType].handle=function(ev){if(ev.handleObj===handleObj&&ev.currentTarget===currentTarget){if(!origType){delete $.event.special[handleObj.origType]}else{$.event.special[handleObj.origType].handle=origHandle}}};delete this.pausedState;this.isPaused=this.isImmediatePropagationStopped=returnFalse;if(!this.isPropagationStopped()){$.event.trigger(this,[],this.target)}};var win=$(window),windowWidth=0,windowHeight=0,timer;$(function(){windowWidth=win.width();windowHeight=win.height()});$.event.reverse("resize",{handler:function(ev,data){var isWindow=this===window;if(isWindow&&ev.originalEvent){var width=win.width(),height=win.height();if((width!=windowWidth||height!=windowHeight)){windowWidth=width;windowHeight=height;clearTimeout(timer);timer=setTimeout(function(){win.trigger("resize")},1)}return true}}});var isPhantom=/Phantom/.test(navigator.userAgent),supportTouch=!isPhantom&&"ontouchend" in document,scrollEvent="touchmove scroll",touchStartEvent=supportTouch?"touchstart":"mousedown",touchStopEvent=supportTouch?"touchend":"mouseup",touchMoveEvent=supportTouch?"touchmove":"mousemove",data=function(event){var d=event.originalEvent.touches?event.originalEvent.touches[0]:event;return{time:(new Date).getTime(),coords:[d.pageX,d.pageY],origin:$(event.target)}};var swipe=$.event.swipe={delay:500,max:320,min:30};$.event.setupHelper(["swipe","swipeleft","swiperight","swipeup","swipedown"],touchStartEvent,function(ev){var start=data(ev),stop,delegate=ev.delegateTarget||ev.currentTarget,selector=ev.handleObj.selector,entered=this;function moveHandler(event){if(!start){return}stop=data(event);if(Math.abs(start.coords[0]-stop.coords[0])>10){event.preventDefault()}}$(document.documentElement).bind(touchMoveEvent,moveHandler).one(touchStopEvent,function(event){$(this).unbind(touchMoveEvent,moveHandler);if(start&&stop){var deltaX=Math.abs(start.coords[0]-stop.coords[0]),deltaY=Math.abs(start.coords[1]-stop.coords[1]),distance=Math.sqrt(deltaX*deltaX+deltaY*deltaY);if(stop.time-start.time<swipe.delay&&distance>=swipe.min&&distance<=swipe.max){var events=["swipe"];if(deltaX>=swipe.min&&deltaY<swipe.min){events.push(start.coords[0]>stop.coords[0]?"swipeleft":"swiperight")}else{if(deltaY>=swipe.min&&deltaX<swipe.min){events.push(start.coords[1]<stop.coords[1]?"swipedown":"swipeup")}}$.each($.event.find(delegate,events,selector),function(){this.call(entered,ev,{start:start,end:stop})})}}start=stop=undefined})})})(this,jQuery);

    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller
    // fixes from Paul Irish and Tino Zijdel
    (function(){var b=0;var c=["ms","moz","webkit","o"];for(var a=0;a<c.length&&!window.requestAnimationFrame;++a){window.requestAnimationFrame=window[c[a]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[c[a]+"CancelAnimationFrame"]||window[c[a]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(h,e){var d=new Date().getTime();var f=Math.max(0,16-(d-b));var g=window.setTimeout(function(){h(d+f)},f);b=d+f;return g}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(d){clearTimeout(d)}}}());

    /* gazeta_pl.mobi.Poll - v0.1.1 - 2012-12-03 */
    (function(c,f,a,e){var b={waitingMessage:"Dzi\u0119kujemy za Tw\u00f3j g\u0142os!",errorMessage:"Wyst\u0105pi\u0142 problem podczas g\u0142osowania.",votesText:"Liczba oddanych g\u0142os\u00f3w:",messageDisplayTime:2000,transitionTime:600,init:function(){e('.mod_poll[data-view="results"][data-type="binary"]').each(function(){gazeta_pl.mobi.Poll.drawPie(e(this))});e("article.mod_poll").each(function(){var j=e(this),g=j.find("form"),k=j.find("section.body"),i=k.html(),h=j.gazeta(gfunc.readData),d=function(l){return function(m){l(h.xx,m)}};if(!h.servletUri||!g.length){return}k.data("html",i);g.find("button").live("click",function(){g.find('input[type="hidden"][name="'+e(this).attr("name")+'"]').remove();g.append('<input type="hidden" name="'+e(this).attr("name")+'" value="'+e(this).attr("value")+'" />')});g.live("submit",function(l){if(k.data("blocked")){return false}k.data("blocked",true);k.data("time",(new Date().getTime()));k.height(k.height()).addClass("dissapear");setTimeout(function(){k.html('<p class="message" style="line-height: '+k.height()+'px">'+gazeta_pl.mobi.Poll.waitingMessage+"</p>");setTimeout(function(){k.removeClass("dissapear")},1)},gazeta_pl.mobi.Poll.transitionTime);e.ajax({url:h.servletUri,data:g.serialize(),type:"POST",success:d(gazeta_pl.mobi.Poll.onSuccess),error:d(gazeta_pl.mobi.Poll.onError)});return false})});gazeta_pl.mobi.Poll.initPlayersRating();gazeta_pl.mobi.Poll.initHolder()},onSuccess:function(d,o){var t=gazeta_pl.mobi.Utils,q=e('article.mod_poll[data-xx="'+d+'"]'),u=q.gazeta(gfunc.readData),m=q.find("section.body"),s=e(m.data("html")).find("fieldset"),r=s.find(".result"),g=new Date().getTime(),k=m.data("time"),w=0,n=0,l=0,p="",h=function(){if(true===t.isJSON(o)){o=JSON.parse(o)}},v=function(){var z=o.answers,A=z.length,x,j=function(){for(x=0;x<A;x+=1){if(-1!==z[x].txt.indexOf("#")){delete z[x]}}},y=function(){for(x=0;x<A;x+=1){if("undefined"===typeof z[x]){z.splice(x,1)}}};j();y();o.answers=z};h();v();if(g-k<gazeta_pl.mobi.Poll.messageDisplayTime){setTimeout(function(){gazeta_pl.mobi.Poll.onSuccess(d,o)},200);return}if(o.status){s.find(".name").each(function(j){e(this).text(o.answers[j].txt);e(this).parent().append('<div class="votes">('+o.answers[j].votes+")</div>")});if(u.type=="select"){w=Math.min(parseInt(o.answers.length/2,10),3);o.answers.sort(function(j,i){return i.votes-j.votes});for(;n<2;n++){p+='<div class="c'+n+'">';for(;l<w;l++){p+='<div class="item"> <div class="no">'+(n*w+l+1)+'</div> <div class="name">'+o.answers[(n*w+l)].txt+'</div> <div class="votes">('+o.answers[(n*w+l)].votes+")</div> </div>"}p+="</div>";l=0}r.append(p)}s.find("button, .submit").remove();s.append("<p>"+gazeta_pl.mobi.Poll.votesText+" <span>"+o.votesCount+"</span></p>");m.addClass("dissapear");setTimeout(function(){m.html(s);setTimeout(function(){m.removeClass("dissapear");m.removeData("blocked");m.removeData("time");m.css("height","auto")},1);setTimeout(function(){if(u.type=="binary"){gazeta_pl.mobi.Poll.drawPie(q)}},gazeta_pl.mobi.Poll.transitionTime)},gazeta_pl.mobi.Poll.transitionTime)}else{if(o.statusDescription){gazeta_pl.mobi.Poll.onError(d,o)}else{gazeta_pl.mobi.Poll.onError(d,{})}}},onError:function(j,h){var g=e('article.mod_poll[data-xx="'+j+'"] section.body'),d=new Date().getTime(),i=g.data("time");if(d-i<gazeta_pl.mobi.Poll.messageDisplayTime){setTimeout(function(){gazeta_pl.mobi.Poll.onError(j,h)},200);return}g.addClass("dissapear");setTimeout(function(){var k=h.statusDescription||gazeta_pl.mobi.Poll.errorMessage;if(e.trim(k)=="sonda? nie aktualny"){k="sonda\u017c nieaktualny"}g.html('<p class="message error" style="line-height: '+g.height()+'px">'+k+"</p>");setTimeout(function(){g.removeClass("dissapear");g.data("time",(new Date().getTime()));gazeta_pl.mobi.Poll.showForm(j)},1)},gazeta_pl.mobi.Poll.transitionTime)},showForm:function(i){var g=e('article.mod_poll[data-xx="'+i+'"] section.body'),d=new Date().getTime(),h=g.data("time");if(d-h<gazeta_pl.mobi.Poll.messageDisplayTime){setTimeout(function(){gazeta_pl.mobi.Poll.showForm(i)},200);return}g.addClass("dissapear");setTimeout(function(){g.html(g.data("html"));setTimeout(function(){g.removeClass("dissapear");g.removeData("blocked");g.removeData("time")},1)},gazeta_pl.mobi.Poll.transitionTime)},drawPie:function(u){var q=u.find(".result"),m=q.width()-2,g=m/2,n=[],w=0,d=document.createElement("canvas"),r=null,v=10*Math.PI/180,k=["#043b62","#3c94d2"],s=q.css("backgroundColor"),j=19,h=-0.5*Math.PI,t=0,p=0,i=function(x,z,A,y){r.beginPath();r.moveTo(0,0);r.arc(0,0,x,h+A,h+y,false);r.strokeStyle=z.replace(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/,function(C,E,D,B){return"rgba("+parseInt(E,16)+","+parseInt(D,16)+","+parseInt(B,16)+", 0.1)"});r.stroke();r.fillStyle=z;r.fill()},o=function(x){l();p+=v;if(p<2*Math.PI){if(p<endAngle){i(g,k[0],t,p)}else{i(g,k[0],t,endAngle);i(g,k[1],endAngle,p)}i(j,s,0,2*Math.PI-0.001);window.requestAnimationFrame(o)}else{window.cancelAnimationFrame(o)}},l=function(){endAngle=n[0]/w*2*Math.PI};u.find(".votes").each(function(){var x=parseInt(e(this).text().replace("(",""),10);n.unshift(x);w+=x});q[0].appendChild(d);if(typeof G_vmlCanvasManager!="undefined"){d=G_vmlCanvasManager.initElement(d)}d.setAttribute("width",m+2);d.setAttribute("height",m+2);r=d.getContext("2d");r.translate(g+1,g+1);window.requestAnimationFrame(o)},initHolder:function(){e(".mod_poll_holder").each(function(){var k=e(this),g=k.find(".holder > ul > li").length,j=e('<ul class="pages"></ul>'),d=0,h=false;if(g&&g>1){j.append('<li class="active"></li>');for(;d<g-1;d++){j.append("<li></li>")}k.append(j);k.append('<a class="prev"></a><a class="next"></a>');k.gazeta(gfunc.gslider,{selectors:{bodyOuter:".holder",bodyInner:".holder > ul",bodyElems:".holder > ul > li",buttonPrev:".prev",buttonNext:".next"},fold:false});k.find(".pages li").click(function(){var i=e(this);if(i.hasClass("active")){return}k.trigger("goto",1+k.find(".pages li").index(i));setTimeout(function(){k.find(".pages li").removeClass("active");i.addClass("active")},250)});k.hover(function(){h=true},function(){h=false});setInterval(function(){var n=k.find(".pages li"),i=n.filter(".active"),m=n.index(i),l=n.length-1;if(h){return}if(m==l){k.trigger("goto",1);m=0}else{k.trigger("move");m++}setTimeout(function(){n.removeClass("active");n.eq(m).addClass("active")},250)},10000)}else{k.addClass("single")}})},initPlayersRating:function(){var g=e('.mod_poll[data-type="players_rating"]'),d=e('<div id="playersRating_overlay"><div class="bg"></div><div class="inner"><a href="#" class="close">x</a></div></div>');if(!g.length){return}d.find(".inner").append(g.find("header").clone());d.find(".inner").append(g.find(".all"));e("body").append(d);g.find(".button").click(function(){d.find(".inner").css({top:e(window).scrollTop()+20});d.css({visibility:"visible"});return false});d.find(".close").click(function(){d.css({visibility:"hidden"});return false})}};c.gazeta_pl.namespace("mobi.Poll");c.gazeta_pl.mobi.Poll=b}(window,document,undefined,jQuery));

    /* Handlebars v1.0.beta.6 */
    // lib/handlebars/base.js
    var Handlebars={};Handlebars.VERSION="1.0.beta.6";Handlebars.helpers={};Handlebars.partials={};Handlebars.registerHelper=function(b,c,a){if(a){c.not=a}this.helpers[b]=c};Handlebars.registerPartial=function(a,b){this.partials[a]=b};Handlebars.registerHelper("helperMissing",function(a){if(arguments.length===2){return undefined}else{throw new Error("Could not find property '"+a+"'")}});var toString=Object.prototype.toString,functionType="[object Function]";Handlebars.registerHelper("blockHelperMissing",function(f,d){var a=d.inverse||function(){},k=d.fn;var c="";var h=toString.call(f);if(h===functionType){f=f.call(this)}if(f===true){return k(this)}else{if(f===false||f==null){return a(this)}else{if(h==="[object Array]"){if(f.length>0){for(var e=0,b=f.length;e<b;e++){c=c+k(f[e])}}else{c=a(this)}return c}else{return k(f)}}}});Handlebars.registerHelper("each",function(f,d){var h=d.fn,a=d.inverse;var c="";if(f&&f.length>0){for(var e=0,b=f.length;e<b;e++){c=c+h(f[e])}}else{c=a(this)}return c});Handlebars.registerHelper("if",function(b,a){var c=toString.call(b);if(c===functionType){b=b.call(this)}if(!b||Handlebars.Utils.isEmpty(b)){return a.inverse(this)}else{return a.fn(this)}});Handlebars.registerHelper("unless",function(c,b){var d=b.fn,a=b.inverse;b.fn=a;b.inverse=d;return Handlebars.helpers["if"].call(this,c,b)});Handlebars.registerHelper("with",function(b,a){return a.fn(b)});Handlebars.registerHelper("log",function(a){Handlebars.log(a)});var handlebars=(function(){var f={trace:function c(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,statements:6,simpleInverse:7,statement:8,openInverse:9,closeBlock:10,openBlock:11,mustache:12,partial:13,CONTENT:14,COMMENT:15,OPEN_BLOCK:16,inMustache:17,CLOSE:18,OPEN_INVERSE:19,OPEN_ENDBLOCK:20,path:21,OPEN:22,OPEN_UNESCAPED:23,OPEN_PARTIAL:24,params:25,hash:26,param:27,STRING:28,INTEGER:29,BOOLEAN:30,hashSegments:31,hashSegment:32,ID:33,EQUALS:34,pathSegments:35,SEP:36,"$accept":0,"$end":1},terminals_:{2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"OPEN_PARTIAL",28:"STRING",29:"INTEGER",30:"BOOLEAN",33:"ID",34:"EQUALS",36:"SEP"},productions_:[0,[3,2],[4,3],[4,1],[4,0],[6,1],[6,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[7,2],[17,3],[17,2],[17,2],[17,1],[25,2],[25,1],[27,1],[27,1],[27,1],[27,1],[26,1],[31,2],[31,1],[32,3],[32,3],[32,3],[32,3],[21,1],[35,3],[35,1]],performAction:function b(h,k,l,o,n,j,m){var i=j.length-1;switch(n){case 1:return j[i-1];break;case 2:this.$=new o.ProgramNode(j[i-2],j[i]);break;case 3:this.$=new o.ProgramNode(j[i]);break;case 4:this.$=new o.ProgramNode([]);break;case 5:this.$=[j[i]];break;case 6:j[i-1].push(j[i]);this.$=j[i-1];break;case 7:this.$=new o.InverseNode(j[i-2],j[i-1],j[i]);break;case 8:this.$=new o.BlockNode(j[i-2],j[i-1],j[i]);break;case 9:this.$=j[i];break;case 10:this.$=j[i];break;case 11:this.$=new o.ContentNode(j[i]);break;case 12:this.$=new o.CommentNode(j[i]);break;case 13:this.$=new o.MustacheNode(j[i-1][0],j[i-1][1]);break;case 14:this.$=new o.MustacheNode(j[i-1][0],j[i-1][1]);break;case 15:this.$=j[i-1];break;case 16:this.$=new o.MustacheNode(j[i-1][0],j[i-1][1]);break;case 17:this.$=new o.MustacheNode(j[i-1][0],j[i-1][1],true);break;case 18:this.$=new o.PartialNode(j[i-1]);break;case 19:this.$=new o.PartialNode(j[i-2],j[i-1]);break;case 20:break;case 21:this.$=[[j[i-2]].concat(j[i-1]),j[i]];break;case 22:this.$=[[j[i-1]].concat(j[i]),null];break;case 23:this.$=[[j[i-1]],j[i]];break;case 24:this.$=[[j[i]],null];break;case 25:j[i-1].push(j[i]);this.$=j[i-1];break;case 26:this.$=[j[i]];break;case 27:this.$=j[i];break;case 28:this.$=new o.StringNode(j[i]);break;case 29:this.$=new o.IntegerNode(j[i]);break;case 30:this.$=new o.BooleanNode(j[i]);break;case 31:this.$=new o.HashNode(j[i]);break;case 32:j[i-1].push(j[i]);this.$=j[i-1];break;case 33:this.$=[j[i]];break;case 34:this.$=[j[i-2],j[i]];break;case 35:this.$=[j[i-2],new o.StringNode(j[i])];break;case 36:this.$=[j[i-2],new o.IntegerNode(j[i])];break;case 37:this.$=[j[i-2],new o.BooleanNode(j[i])];break;case 38:this.$=new o.IdNode(j[i]);break;case 39:j[i-2].push(j[i]);this.$=j[i-2];break;case 40:this.$=[j[i]];break}},table:[{3:1,4:2,5:[2,4],6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{1:[3]},{5:[1,16]},{5:[2,3],7:17,8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,19],20:[2,3],22:[1,13],23:[1,14],24:[1,15]},{5:[2,5],14:[2,5],15:[2,5],16:[2,5],19:[2,5],20:[2,5],22:[2,5],23:[2,5],24:[2,5]},{4:20,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{4:21,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],24:[2,9]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],24:[2,10]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],24:[2,11]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],24:[2,12]},{17:22,21:23,33:[1,25],35:24},{17:26,21:23,33:[1,25],35:24},{17:27,21:23,33:[1,25],35:24},{17:28,21:23,33:[1,25],35:24},{21:29,33:[1,25],35:24},{1:[2,1]},{6:30,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{5:[2,6],14:[2,6],15:[2,6],16:[2,6],19:[2,6],20:[2,6],22:[2,6],23:[2,6],24:[2,6]},{17:22,18:[1,31],21:23,33:[1,25],35:24},{10:32,20:[1,33]},{10:34,20:[1,33]},{18:[1,35]},{18:[2,24],21:40,25:36,26:37,27:38,28:[1,41],29:[1,42],30:[1,43],31:39,32:44,33:[1,45],35:24},{18:[2,38],28:[2,38],29:[2,38],30:[2,38],33:[2,38],36:[1,46]},{18:[2,40],28:[2,40],29:[2,40],30:[2,40],33:[2,40],36:[2,40]},{18:[1,47]},{18:[1,48]},{18:[1,49]},{18:[1,50],21:51,33:[1,25],35:24},{5:[2,2],8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,2],22:[1,13],23:[1,14],24:[1,15]},{14:[2,20],15:[2,20],16:[2,20],19:[2,20],22:[2,20],23:[2,20],24:[2,20]},{5:[2,7],14:[2,7],15:[2,7],16:[2,7],19:[2,7],20:[2,7],22:[2,7],23:[2,7],24:[2,7]},{21:52,33:[1,25],35:24},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],24:[2,8]},{14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],24:[2,14]},{18:[2,22],21:40,26:53,27:54,28:[1,41],29:[1,42],30:[1,43],31:39,32:44,33:[1,45],35:24},{18:[2,23]},{18:[2,26],28:[2,26],29:[2,26],30:[2,26],33:[2,26]},{18:[2,31],32:55,33:[1,56]},{18:[2,27],28:[2,27],29:[2,27],30:[2,27],33:[2,27]},{18:[2,28],28:[2,28],29:[2,28],30:[2,28],33:[2,28]},{18:[2,29],28:[2,29],29:[2,29],30:[2,29],33:[2,29]},{18:[2,30],28:[2,30],29:[2,30],30:[2,30],33:[2,30]},{18:[2,33],33:[2,33]},{18:[2,40],28:[2,40],29:[2,40],30:[2,40],33:[2,40],34:[1,57],36:[2,40]},{33:[1,58]},{14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],24:[2,13]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],24:[2,16]},{5:[2,17],14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],24:[2,17]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],24:[2,18]},{18:[1,59]},{18:[1,60]},{18:[2,21]},{18:[2,25],28:[2,25],29:[2,25],30:[2,25],33:[2,25]},{18:[2,32],33:[2,32]},{34:[1,57]},{21:61,28:[1,62],29:[1,63],30:[1,64],33:[1,25],35:24},{18:[2,39],28:[2,39],29:[2,39],30:[2,39],33:[2,39],36:[2,39]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],24:[2,19]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],24:[2,15]},{18:[2,34],33:[2,34]},{18:[2,35],33:[2,35]},{18:[2,36],33:[2,36]},{18:[2,37],33:[2,37]}],defaultActions:{16:[2,1],37:[2,23],53:[2,21]},parseError:function d(i,h){throw new Error(i)},parse:function e(q){var y=this,m=[0],H=[null],t=[],I=this.table,i="",s=0,F=0,k=0,o=2,v=1;this.lexer.setInput(q);this.lexer.yy=this.yy;this.yy.lexer=this.lexer;if(typeof this.lexer.yylloc=="undefined"){this.lexer.yylloc={}}var j=this.lexer.yylloc;t.push(j);if(typeof this.yy.parseError==="function"){this.parseError=this.yy.parseError}function x(p){m.length=m.length-2*p;H.length=H.length-p;t.length=t.length-p}function w(){var p;p=y.lexer.lex()||1;if(typeof p!=="number"){p=y.symbols_[p]||p}return p}var E,A,l,D,J,u,C={},z,G,h,n;while(true){l=m[m.length-1];if(this.defaultActions[l]){D=this.defaultActions[l]}else{if(E==null){E=w()}D=I[l]&&I[l][E]}if(typeof D==="undefined"||!D.length||!D[0]){if(!k){n=[];for(z in I[l]){if(this.terminals_[z]&&z>2){n.push("'"+this.terminals_[z]+"'")}}var B="";if(this.lexer.showPosition){B="Parse error on line "+(s+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+n.join(", ")+", got '"+this.terminals_[E]+"'"}else{B="Parse error on line "+(s+1)+": Unexpected "+(E==1?"end of input":"'"+(this.terminals_[E]||E)+"'")}this.parseError(B,{text:this.lexer.match,token:this.terminals_[E]||E,line:this.lexer.yylineno,loc:j,expected:n})}}if(D[0] instanceof Array&&D.length>1){throw new Error("Parse Error: multiple actions possible at state: "+l+", token: "+E)}switch(D[0]){case 1:m.push(E);H.push(this.lexer.yytext);t.push(this.lexer.yylloc);m.push(D[1]);E=null;if(!A){F=this.lexer.yyleng;i=this.lexer.yytext;s=this.lexer.yylineno;j=this.lexer.yylloc;if(k>0){k--}}else{E=A;A=null}break;case 2:G=this.productions_[D[1]][1];C.$=H[H.length-G];C._$={first_line:t[t.length-(G||1)].first_line,last_line:t[t.length-1].last_line,first_column:t[t.length-(G||1)].first_column,last_column:t[t.length-1].last_column};u=this.performAction.call(C,i,F,s,this.yy,D[1],H,t);if(typeof u!=="undefined"){return u}if(G){m=m.slice(0,-1*G*2);H=H.slice(0,-1*G);t=t.slice(0,-1*G)}m.push(this.productions_[D[1]][0]);H.push(C.$);t.push(C._$);h=I[m[m.length-2]][m[m.length-1]];m.push(h);break;case 3:return true}}return true}};var a=(function(){var k=({EOF:1,parseError:function m(p,o){if(this.yy.parseError){this.yy.parseError(p,o)}else{throw new Error(p)}},setInput:function(o){this._input=o;this._more=this._less=this.done=false;this.yylineno=this.yyleng=0;this.yytext=this.matched=this.match="";this.conditionStack=["INITIAL"];this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};return this},input:function(){var p=this._input[0];this.yytext+=p;this.yyleng++;this.match+=p;this.matched+=p;var o=p.match(/\n/);if(o){this.yylineno++}this._input=this._input.slice(1);return p},unput:function(o){this._input=o+this._input;return this},more:function(){this._more=true;return this},pastInput:function(){var o=this.matched.substr(0,this.matched.length-this.match.length);return(o.length>20?"...":"")+o.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var o=this.match;if(o.length<20){o+=this._input.substr(0,20-o.length)}return(o.substr(0,20)+(o.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var o=this.pastInput();var p=new Array(o.length+1).join("-");return o+this.upcomingInput()+"\n"+p+"^"},next:function(){if(this.done){return this.EOF}if(!this._input){this.done=true}var s,q,p,o;if(!this._more){this.yytext="";this.match=""}var t=this._currentRules();for(var r=0;r<t.length;r++){q=this._input.match(this.rules[t[r]]);if(q){o=q[0].match(/\n.*/g);if(o){this.yylineno+=o.length}this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:o?o[o.length-1].length-1:this.yylloc.last_column+q[0].length};this.yytext+=q[0];this.match+=q[0];this.matches=q;this.yyleng=this.yytext.length;this._more=false;this._input=this._input.slice(q[0].length);this.matched+=q[0];s=this.performAction.call(this,this.yy,this,t[r],this.conditionStack[this.conditionStack.length-1]);if(s){return s}else{return}}}if(this._input===""){return this.EOF}else{this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})}},lex:function h(){var o=this.next();if(typeof o!=="undefined"){return o}else{return this.lex()}},begin:function i(o){this.conditionStack.push(o)},popState:function n(){return this.conditionStack.pop()},_currentRules:function l(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function i(o){this.begin(o)}});k.performAction=function j(s,p,r,o){var q=o;switch(r){case 0:if(p.yytext.slice(-1)!=="\\"){this.begin("mu")}if(p.yytext.slice(-1)==="\\"){p.yytext=p.yytext.substr(0,p.yyleng-1),this.begin("emu")}if(p.yytext){return 14}break;case 1:return 14;break;case 2:this.popState();return 14;break;case 3:return 24;break;case 4:return 16;break;case 5:return 20;break;case 6:return 19;break;case 7:return 19;break;case 8:return 23;break;case 9:return 23;break;case 10:p.yytext=p.yytext.substr(3,p.yyleng-5);this.popState();return 15;break;case 11:return 22;break;case 12:return 34;break;case 13:return 33;break;case 14:return 33;break;case 15:return 36;break;case 16:break;case 17:this.popState();return 18;break;case 18:this.popState();return 18;break;case 19:p.yytext=p.yytext.substr(1,p.yyleng-2).replace(/\\"/g,'"');return 28;break;case 20:return 30;break;case 21:return 30;break;case 22:return 29;break;case 23:return 33;break;case 24:p.yytext=p.yytext.substr(1,p.yyleng-2);return 33;break;case 25:return"INVALID";break;case 26:return 5;break}};k.rules=[/^[^\x00]*?(?=(\{\{))/,/^[^\x00]+/,/^[^\x00]{2,}?(?=(\{\{))/,/^\{\{>/,/^\{\{#/,/^\{\{\//,/^\{\{\^/,/^\{\{\s*else\b/,/^\{\{\{/,/^\{\{&/,/^\{\{![\s\S]*?\}\}/,/^\{\{/,/^=/,/^\.(?=[} ])/,/^\.\./,/^[\/.]/,/^\s+/,/^\}\}\}/,/^\}\}/,/^"(\\["]|[^"])*"/,/^true(?=[}\s])/,/^false(?=[}\s])/,/^[0-9]+(?=[}\s])/,/^[a-zA-Z0-9_$-]+(?=[=}\s\/.])/,/^\[[^\]]*\]/,/^./,/^$/];k.conditions={mu:{rules:[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],inclusive:false},emu:{rules:[2],inclusive:false},INITIAL:{rules:[0,1,26],inclusive:true}};return k})();f.lexer=a;return f})();if(typeof require!=="undefined"&&typeof exports!=="undefined"){exports.parser=handlebars;exports.parse=function(){return handlebars.parse.apply(handlebars,arguments)};exports.main=function commonjsMain(a){if(!a[1]){throw new Error("Usage: "+a[0]+" FILE")}if(typeof process!=="undefined"){var c=require("fs").readFileSync(require("path").join(process.cwd(),a[1]),"utf8")}else{var b=require("file").path(require("file").cwd());var c=b.join(a[1]).read({charset:"utf-8"})}return exports.parser.parse(c)};if(typeof module!=="undefined"&&require.main===module){exports.main(typeof process!=="undefined"?process.argv.slice(1):require("system").args)}}Handlebars.Parser=handlebars;Handlebars.parse=function(a){Handlebars.Parser.yy=Handlebars.AST;return Handlebars.Parser.parse(a)};Handlebars.print=function(a){return new Handlebars.PrintVisitor().accept(a)};Handlebars.logger={DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(b,a){}};Handlebars.log=function(b,a){Handlebars.logger.log(b,a)};(function(){Handlebars.AST={};Handlebars.AST.ProgramNode=function(c,b){this.type="program";this.statements=c;if(b){this.inverse=new Handlebars.AST.ProgramNode(b)}};Handlebars.AST.MustacheNode=function(d,c,b){this.type="mustache";this.id=d[0];this.params=d.slice(1);this.hash=c;this.escaped=!b};Handlebars.AST.PartialNode=function(c,b){this.type="partial";this.id=c;this.context=b};var a=function(b,c){if(b.original!==c.original){throw new Handlebars.Exception(b.original+" doesn't match "+c.original)}};Handlebars.AST.BlockNode=function(c,b,d){a(c.id,d);this.type="block";this.mustache=c;this.program=b};Handlebars.AST.InverseNode=function(c,b,d){a(c.id,d);this.type="inverse";this.mustache=c;this.program=b};Handlebars.AST.ContentNode=function(b){this.type="content";this.string=b};Handlebars.AST.HashNode=function(b){this.type="hash";this.pairs=b};Handlebars.AST.IdNode=function(f){this.type="ID";this.original=f.join(".");var d=[],h=0;for(var e=0,b=f.length;e<b;e++){var c=f[e];if(c===".."){h++}else{if(c==="."||c==="this"){this.isScoped=true}else{d.push(c)}}}this.parts=d;this.string=d.join(".");this.depth=h;this.isSimple=(d.length===1)&&(h===0)};Handlebars.AST.StringNode=function(b){this.type="STRING";this.string=b};Handlebars.AST.IntegerNode=function(b){this.type="INTEGER";this.integer=b};Handlebars.AST.BooleanNode=function(b){this.type="BOOLEAN";this.bool=b};Handlebars.AST.CommentNode=function(b){this.type="comment";this.comment=b}})();Handlebars.Exception=function(b){var a=Error.prototype.constructor.apply(this,arguments);for(var c in a){if(a.hasOwnProperty(c)){this[c]=a[c]}}this.message=a.message};Handlebars.Exception.prototype=new Error;Handlebars.SafeString=function(a){this.string=a};Handlebars.SafeString.prototype.toString=function(){return this.string.toString()};(function(){var c={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};var d=/&(?!\w+;)|[<>"'`]/g;var b=/[&<>"'`]/;var a=function(e){return c[e]||"&amp;"};Handlebars.Utils={escapeExpression:function(e){if(e instanceof Handlebars.SafeString){return e.toString()}else{if(e==null||e===false){return""}}if(!b.test(e)){return e}return e.replace(d,a)},isEmpty:function(e){if(typeof e==="undefined"){return true}else{if(e===null){return true}else{if(e===false){return true}else{if(Object.prototype.toString.call(e)==="[object Array]"&&e.length===0){return true}else{return false}}}}}}})();Handlebars.Compiler=function(){};Handlebars.JavaScriptCompiler=function(){};(function(f,e){f.OPCODE_MAP={appendContent:1,getContext:2,lookupWithHelpers:3,lookup:4,append:5,invokeMustache:6,appendEscaped:7,pushString:8,truthyOrFallback:9,functionOrFallback:10,invokeProgram:11,invokePartial:12,push:13,assignToHash:15,pushStringParam:16};f.MULTI_PARAM_OPCODES={appendContent:1,getContext:1,lookupWithHelpers:2,lookup:1,invokeMustache:3,pushString:1,truthyOrFallback:1,functionOrFallback:1,invokeProgram:3,invokePartial:1,push:1,assignToHash:1,pushStringParam:1};f.DISASSEMBLE_MAP={};for(var j in f.OPCODE_MAP){var h=f.OPCODE_MAP[j];f.DISASSEMBLE_MAP[h]=j}f.multiParamSize=function(i){return f.MULTI_PARAM_OPCODES[f.DISASSEMBLE_MAP[i]]};f.prototype={compiler:f,disassemble:function(){var t=this.opcodes,r,n;var q=[],v,m,w;for(var s=0,o=t.length;s<o;s++){r=t[s];if(r==="DECLARE"){m=t[++s];w=t[++s];q.push("DECLARE "+m+" = "+w)}else{v=f.DISASSEMBLE_MAP[r];var u=f.multiParamSize(r);var k=[];for(var p=0;p<u;p++){n=t[++s];if(typeof n==="string"){n='"'+n.replace("\n","\\n")+'"'}k.push(n)}v=v+" "+k.join(" ");q.push(v)}}return q.join("\n")},guid:0,compile:function(i,l){this.children=[];this.depths={list:[]};this.options=l;var m=this.options.knownHelpers;this.options.knownHelpers={helperMissing:true,blockHelperMissing:true,each:true,"if":true,unless:true,"with":true,log:true};if(m){for(var k in m){this.options.knownHelpers[k]=m[k]}}return this.program(i)},accept:function(i){return this[i.type](i)},program:function(n){var m=n.statements,p;this.opcodes=[];for(var o=0,k=m.length;o<k;o++){p=m[o];this[p.type](p)}this.isSimple=k===1;this.depths.list=this.depths.list.sort(function(l,i){return l-i});return this},compileProgram:function(n){var k=new this.compiler().compile(n,this.options);var o=this.guid++;this.usePartial=this.usePartial||k.usePartial;this.children[o]=k;for(var p=0,m=k.depths.list.length;p<m;p++){depth=k.depths.list[p];if(depth<2){continue}else{this.addDepth(depth-1)}}return o},block:function(p){var m=p.mustache;var o,q,k,l;var n=this.setupStackForMustache(m);var i=this.compileProgram(p.program);if(p.program.inverse){l=this.compileProgram(p.program.inverse);this.declare("inverse",l)}this.opcode("invokeProgram",i,n.length,!!m.hash);this.declare("inverse",null);this.opcode("append")},inverse:function(l){var k=this.setupStackForMustache(l.mustache);var i=this.compileProgram(l.program);this.declare("inverse",i);this.opcode("invokeProgram",null,k.length,!!l.mustache.hash);this.declare("inverse",null);this.opcode("append")},hash:function(o){var n=o.pairs,q,p;this.opcode("push","{}");for(var m=0,k=n.length;m<k;m++){q=n[m];p=q[1];this.accept(p);this.opcode("assignToHash",q[0])}},partial:function(i){var k=i.id;this.usePartial=true;if(i.context){this.ID(i.context)}else{this.opcode("push","depth0")}this.opcode("invokePartial",k.original);this.opcode("append")},content:function(i){this.opcode("appendContent",i.string)},mustache:function(i){var k=this.setupStackForMustache(i);this.opcode("invokeMustache",k.length,i.id.original,!!i.hash);if(i.escaped&&!this.options.noEscape){this.opcode("appendEscaped")}else{this.opcode("append")}},ID:function(n){this.addDepth(n.depth);this.opcode("getContext",n.depth);this.opcode("lookupWithHelpers",n.parts[0]||null,n.isScoped||false);for(var m=1,k=n.parts.length;m<k;m++){this.opcode("lookup",n.parts[m])}},STRING:function(i){this.opcode("pushString",i.string)},INTEGER:function(i){this.opcode("push",i.integer)},BOOLEAN:function(i){this.opcode("push",i.bool)},comment:function(){},pushParams:function(m){var k=m.length,l;while(k--){l=m[k];if(this.options.stringParams){if(l.depth){this.addDepth(l.depth)}this.opcode("getContext",l.depth||0);this.opcode("pushStringParam",l.string)}else{this[l.type](l)}}},opcode:function(i,m,l,k){this.opcodes.push(f.OPCODE_MAP[i]);if(m!==undefined){this.opcodes.push(m)}if(l!==undefined){this.opcodes.push(l)}if(k!==undefined){this.opcodes.push(k)}},declare:function(i,k){this.opcodes.push("DECLARE");this.opcodes.push(i);this.opcodes.push(k)},addDepth:function(i){if(i===0){return}if(!this.depths[i]){this.depths[i]=true;this.depths.list.push(i)}},setupStackForMustache:function(i){var k=i.params;this.pushParams(k);if(i.hash){this.hash(i.hash)}this.ID(i.id);return k}};e.prototype={nameLookup:function(l,i,k){if(/^[0-9]+$/.test(i)){return l+"["+i+"]"}else{if(e.isValidJavaScriptVariableName(i)){return l+"."+i}else{return l+"['"+i+"']"}}},appendToBuffer:function(i){if(this.environment.isSimple){return"return "+i+";"}else{return"buffer += "+i+";"}},initializeBuffer:function(){return this.quotedString("")},namespace:"Handlebars",compile:function(i,k,m,l){this.environment=i;this.options=k||{};this.name=this.environment.name;this.isChild=!!m;this.context=m||{programs:[],aliases:{self:"this"},registers:{list:[]}};this.preamble();this.stackSlot=0;this.stackVars=[];this.compileChildren(i,k);var o=i.opcodes,n;this.i=0;for(b=o.length;this.i<b;this.i++){n=this.nextOpcode(0);if(n[0]==="DECLARE"){this.i=this.i+2;this[n[1]]=n[2]}else{this.i=this.i+n[1].length;this[n[0]].apply(this,n[1])}}return this.createFunctionContext(l)},nextOpcode:function(r){var o=this.environment.opcodes,m=o[this.i+r],l,p;var q,i;if(m==="DECLARE"){l=o[this.i+1];p=o[this.i+2];return["DECLARE",l,p]}else{l=f.DISASSEMBLE_MAP[m];q=f.multiParamSize(m);i=[];for(var k=0;k<q;k++){i.push(o[this.i+k+1+r])}return[l,i]}},eat:function(i){this.i=this.i+i.length},preamble:function(){var i=[];this.useRegister("foundHelper");if(!this.isChild){var k=this.namespace;var l="helpers = helpers || "+k+".helpers;";if(this.environment.usePartial){l=l+" partials = partials || "+k+".partials;"}i.push(l)}else{i.push("")}if(!this.environment.isSimple){i.push(", buffer = "+this.initializeBuffer())}else{i.push("")}this.lastContext=0;this.source=i},createFunctionContext:function(q){var r=this.stackVars;if(!this.isChild){r=r.concat(this.context.registers.list)}if(r.length>0){this.source[1]=this.source[1]+", "+r.join(", ")}if(!this.isChild){var m=[];for(var p in this.context.aliases){this.source[1]=this.source[1]+", "+p+"="+this.context.aliases[p]}}if(this.source[1]){this.source[1]="var "+this.source[1].substring(2)+";"}if(!this.isChild){this.source[1]+="\n"+this.context.programs.join("\n")+"\n"}if(!this.environment.isSimple){this.source.push("return buffer;")}var s=this.isChild?["depth0","data"]:["Handlebars","depth0","helpers","partials","data"];for(var o=0,k=this.environment.depths.list.length;o<k;o++){s.push("depth"+this.environment.depths.list[o])}if(q){s.push(this.source.join("\n  "));return Function.apply(this,s)}else{var n="function "+(this.name||"")+"("+s.join(",")+") {\n  "+this.source.join("\n  ")+"}";Handlebars.log(Handlebars.logger.DEBUG,n+"\n\n");return n}},appendContent:function(i){this.source.push(this.appendToBuffer(this.quotedString(i)))},append:function(){var i=this.popStack();this.source.push("if("+i+" || "+i+" === 0) { "+this.appendToBuffer(i)+" }");if(this.environment.isSimple){this.source.push("else { "+this.appendToBuffer("''")+" }")}},appendEscaped:function(){var k=this.nextOpcode(1),i="";this.context.aliases.escapeExpression="this.escapeExpression";if(k[0]==="appendContent"){i=" + "+this.quotedString(k[1][0]);this.eat(k)}this.source.push(this.appendToBuffer("escapeExpression("+this.popStack()+")"+i))},getContext:function(i){if(this.lastContext!==i){this.lastContext=i}},lookupWithHelpers:function(l,m){if(l){var i=this.nextStack();this.usingKnownHelper=false;var k;if(!m&&this.options.knownHelpers[l]){k=i+" = "+this.nameLookup("helpers",l,"helper");this.usingKnownHelper=true}else{if(m||this.options.knownHelpersOnly){k=i+" = "+this.nameLookup("depth"+this.lastContext,l,"context")}else{this.register("foundHelper",this.nameLookup("helpers",l,"helper"));k=i+" = foundHelper || "+this.nameLookup("depth"+this.lastContext,l,"context")}}k+=";";this.source.push(k)}else{this.pushStack("depth"+this.lastContext)}},lookup:function(k){var i=this.topStack();this.source.push(i+" = ("+i+" === null || "+i+" === undefined || "+i+" === false ? "+i+" : "+this.nameLookup(i,k,"context")+");")},pushStringParam:function(i){this.pushStack("depth"+this.lastContext);this.pushString(i)},pushString:function(i){this.pushStack(this.quotedString(i))},push:function(i){this.pushStack(i)},invokeMustache:function(l,k,i){this.populateParams(l,this.quotedString(k),"{}",null,i,function(m,o,n){if(!this.usingKnownHelper){this.context.aliases.helperMissing="helpers.helperMissing";this.context.aliases.undef="void 0";this.source.push("else if("+n+"=== undef) { "+m+" = helperMissing.call("+o+"); }");if(m!==n){this.source.push("else { "+m+" = "+n+"; }")}}})},invokeProgram:function(l,m,k){var i=this.programExpression(this.inverse);var n=this.programExpression(l);this.populateParams(m,null,n,i,k,function(o,q,p){if(!this.usingKnownHelper){this.context.aliases.blockHelperMissing="helpers.blockHelperMissing";this.source.push("else { "+o+" = blockHelperMissing.call("+q+"); }")}})},populateParams:function(q,l,u,r,y,x){var m=y||this.options.stringParams||r||this.options.data;var k=this.popStack(),w;var o=[],n,p,v;if(m){this.register("tmp1",u);v="tmp1"}else{v="{ hash: {} }"}if(m){var t=(y?this.popStack():"{}");this.source.push("tmp1.hash = "+t+";")}if(this.options.stringParams){this.source.push("tmp1.contexts = [];")}for(var s=0;s<q;s++){n=this.popStack();o.push(n);if(this.options.stringParams){this.source.push("tmp1.contexts.push("+this.popStack()+");")}}if(r){this.source.push("tmp1.fn = tmp1;");this.source.push("tmp1.inverse = "+r+";")}if(this.options.data){this.source.push("tmp1.data = data;")}o.push(v);this.populateCall(o,k,l||k,x,u!=="{}")},populateCall:function(o,k,l,r,p){var n=["depth0"].concat(o).join(", ");var i=["depth0"].concat(l).concat(o).join(", ");var q=this.nextStack();if(this.usingKnownHelper){this.source.push(q+" = "+k+".call("+n+");")}else{this.context.aliases.functionType='"function"';var m=p?"foundHelper && ":"";this.source.push("if("+m+"typeof "+k+" === functionType) { "+q+" = "+k+".call("+n+"); }")}r.call(this,q,i,k);this.usingKnownHelper=false},invokePartial:function(i){params=[this.nameLookup("partials",i,"partial"),"'"+i+"'",this.popStack(),"helpers","partials"];if(this.options.data){params.push("data")}this.pushStack("self.invokePartial("+params.join(", ")+");")},assignToHash:function(i){var k=this.popStack();var l=this.topStack();this.source.push(l+"['"+i+"'] = "+k+";")},compiler:e,compileChildren:function(k,o){var q=k.children,s,r;for(var p=0,m=q.length;p<m;p++){s=q[p];r=new this.compiler();this.context.programs.push("");var n=this.context.programs.length;s.index=n;s.name="program"+n;this.context.programs[n]=r.compile(s,o,this.context)}},programExpression:function(m){if(m==null){return"self.noop"}var q=this.environment.children[m],p=q.depths.list;var o=[q.index,q.name,"data"];for(var n=0,k=p.length;n<k;n++){depth=p[n];if(depth===1){o.push("depth0")}else{o.push("depth"+(depth-1))}}if(p.length===0){return"self.program("+o.join(", ")+")"}else{o.shift();return"self.programWithDepth("+o.join(", ")+")"}},register:function(i,k){this.useRegister(i);this.source.push(i+" = "+k+";")},useRegister:function(i){if(!this.context.registers[i]){this.context.registers[i]=true;this.context.registers.list.push(i)}},pushStack:function(i){this.source.push(this.nextStack()+" = "+i+";");return"stack"+this.stackSlot},nextStack:function(){this.stackSlot++;if(this.stackSlot>this.stackVars.length){this.stackVars.push("stack"+this.stackSlot)}return"stack"+this.stackSlot},popStack:function(){return"stack"+this.stackSlot--},topStack:function(){return"stack"+this.stackSlot},quotedString:function(i){return'"'+i.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r")+'"'}};var a=("break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield").split(" ");var d=e.RESERVED_WORDS={};for(var c=0,b=a.length;c<b;c++){d[a[c]]=true}e.isValidJavaScriptVariableName=function(i){if(!e.RESERVED_WORDS[i]&&/^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(i)){return true}return false}})(Handlebars.Compiler,Handlebars.JavaScriptCompiler);Handlebars.precompile=function(d,c){c=c||{};var b=Handlebars.parse(d);var a=new Handlebars.Compiler().compile(b,c);return new Handlebars.JavaScriptCompiler().compile(a,c)};Handlebars.compile=function(b,a){a=a||{};var d;function c(){var h=Handlebars.parse(b);var f=new Handlebars.Compiler().compile(h,a);var e=new Handlebars.JavaScriptCompiler().compile(f,a,undefined,true);return Handlebars.template(e)}return function(f,e){if(!d){d=c()}return d.call(this,f,e)}};Handlebars.VM={template:function(a){var b={escapeExpression:Handlebars.Utils.escapeExpression,invokePartial:Handlebars.VM.invokePartial,programs:[],program:function(d,e,f){var c=this.programs[d];if(f){return Handlebars.VM.program(e,f)}else{if(c){return c}else{c=this.programs[d]=Handlebars.VM.program(e);return c}}},programWithDepth:Handlebars.VM.programWithDepth,noop:Handlebars.VM.noop};return function(d,c){c=c||{};return a.call(b,Handlebars,d,c.helpers,c.partials,c.data)}},programWithDepth:function(b,d,c){var a=Array.prototype.slice.call(arguments,2);return function(f,e){e=e||{};return b.apply(this,[f,e.data||d].concat(a))}},program:function(a,b){return function(d,c){c=c||{};return a(d,c.data||b)}},noop:function(){return""},invokePartial:function(a,b,d,e,c,f){options={helpers:e,partials:c,data:f};if(a===undefined){throw new Handlebars.Exception("The partial "+b+" could not be found")}else{if(a instanceof Function){return a(d,options)}else{if(!Handlebars.compile){throw new Handlebars.Exception("The partial "+b+" could not be compiled when running in runtime-only mode")}else{c[b]=Handlebars.compile(a);return c[b](d,options)}}}}};Handlebars.template=Handlebars.VM.template;g.Handlebars=Handlebars;

    /* ShowBox v0.1.4 */
    (function(c,f,b,e){var a=function(g){var d=this,i=function(){var k=!!d.$button.length,j=!!d.$box.length;return k&&j},h=function(){if(d.$box.is(":visible")){d.$button.addClass(d.CSSClasses.expand).removeClass(d.CSSClasses.fold)}else{d.$button.addClass(d.CSSClasses.fold).removeClass(d.CSSClasses.expand)}};this.CSSSelector={length:0};if("string"===typeof(g&&g.button)){this.CSSSelector.button=g&&g.button;this.CSSSelector.length+=1}else{if("object"===typeof(g&&g.button)){this.$button=g&&g.button}}if("string"===typeof(g&&g.box)){this.CSSSelector.box=g&&g.box;this.CSSSelector.length+=1}else{if("object"===typeof(g&&g.button)){this.$box=g&&g.box}}this.CSSClasses={hidden:g&&g.hidden||"hidden",expand:g&&g.expand||"expand",fold:g&&g.fold||"fold"};if(this.CSSSelector.length){this.cache()}if(!i()){return}h();this.callback=g&&g.callback||function(){};this.bindEvents();this.changeClass=(false===(g&&g.changeClass))?false:true};a.init=function(d){return new this(d)};a.VERSION=a.prototype.VERSION={major:0,minor:1,release:4};a.prototype.cache=function(){this.$button=e(this.CSSSelector.button);this.$box=e(this.CSSSelector.box)};a.prototype.bindEvents=function(){var d=this,h=d.$button,g=function(){if(h.hasClass(d.CSSClasses.expand)){h.removeClass(d.CSSClasses.expand).addClass(d.CSSClasses.fold)}else{h.removeClass(d.CSSClasses.fold).addClass(d.CSSClasses.expand)}};h.on("click",function(j){var i=e(this).data("lock");j.preventDefault();d.show(d.$box);if(d.changeClass&&!i){h.data("lock",true);g()}})};a.prototype.getVersion=function(){var d=this,g=".";return d.VERSION.major+g+d.VERSION.minor+g+d.VERSION.release};a.prototype.getNewInstance=function(d){return new this.constructor(d)};a.prototype.show=function(){var d=this,g=function(){d.callback();d.$button.data("lock",false)};if(this.$box.is(":visible")){d.$box.slideUp(g)}else{this.$box.slideDown(g)}};c.gazeta_pl.namespace("mobi.ShowBox");c.gazeta_pl.mobi.ShowBox=a}(window,document,undefined,jQuery));

    /* navigationManager v1.0.0 */
    (function(b,e,c){var a={init:function(){this.cache();this.bindEvents();new b.gazeta_pl.mobi.ShowBox({button:"#show_menu",box:"#winieta > ul.menu",expand:"active",fold:"inactive"});this.$menuButtons.each(function(){var f=c(this),d=f.siblings("a.button");new b.gazeta_pl.mobi.ShowBox({button:f,box:f.siblings("ul.menu"),expand:"active",fold:"inactive",callback:function(){d.data("lock",false)}})})},cache:function(){this.$winieta=c("#winieta");this.$menuLinks=c(".drop_down > a:first-child");this.$menuButtons=c(".menu .button").add(this.$menuLinks)},bindEvents:function(){this.$menuLinks.on("click",function(){var f=c(this).siblings("a.button"),d=f.data("lock");if(!d){setTimeout(function(){f.toggleClass("active").data("lock",true)},10)}})}};b.gazeta_pl.namespace("mobi.navigationManager");b.gazeta_pl.mobi.navigationManager=a}(window,document,jQuery));        

    /* jspaginator v1.0.3 */
    (function (g, d, $){
        "use strict";

        var
            jspaginator = {},

            imagesPaginator = {
                NUMBER_OF_IMAGES: 7,

                init: function() {
                    var
                        self = this,
                        prepareImagesList,
                        buildPaginator,
                        wrapper;

                    prepareImagesList = function() {
                        self.$imagesList
                            .wrap("<div class='wrapperJSPaginator wrapperJSPaginator_images'><div class='scroller' /></div>");

                        if (!self.$imagesList.css("opacity")) {
                            self.$imagesList
                                .animate({
                                        opacity: 0
                                    }, function() {
                                        self.$images.addClass("visible");
                                })
                                .delay()
                                .animate({
                                    opacity: 1
                                });
                        } else {
                            self.$images.addClass("visible");
                        }

                        self.wrapper = d.querySelector ?
                            d.querySelector(".wrapperJSPaginator"):
                            $(".wrapperJSPaginator");
                    },

                    buildPaginator = function() {
                        var
                            $imagesPaginator,
                            $wrapperButtons,
                            $prev,
                            $next,
                            $pagesButtons;
                            
                        $imagesPaginator = $("<div />", {
                            "class": "mod mod_jspaginator",
                            id: "imagesPaginator"
                        }).insertAfter(self.$imagesList);

                        $wrapperButtons = $("<ul><li/><li/><li/></ul>").appendTo($imagesPaginator);

                        $prev = $("<a/>", {
                            href: "#jspaginator_previous",
                            html: "<span>previous</span>"
                        }).appendTo($wrapperButtons.children().first());

                        $next = $("<a/>", {
                            href: "#jspaginator_next",
                            html: "<span>next</span>"
                        }).appendTo($wrapperButtons.children().last());

                        $pagesButtons = $("<ul/>").appendTo($wrapperButtons.children().eq(1));

                        self.$images.each(function(i) {
                            var
                                text = "page " + i,
                                $li,
                                $a;

                            $li = $("<li/>").appendTo($pagesButtons);

                            $a = $("<a/>", {
                                href: "#",
                                "data-index": i
                            });

                            $('<span>', {
                                text: text
                            }).appendTo($a);

                            $a.appendTo($li);
                        });


                        self.$imagesPaginator = $imagesPaginator;
                        self.$paginatorButtons = self.$imagesPaginator.find("li li");
                        self.$paginatorButtons.first().children().addClass("active");
                    };

                    this.cache();

                    if (this.dependencies()) {
                        return;
                    }

                    this.timeoutID = {
                        changeListHeight: 0
                    };

                    buildPaginator();
                    prepareImagesList();
                    
                    this.addWidth();
                    this.changeListHeight();

                    wrapper = self.wrapper.jquery ?
                        self.wrapper.get(0) :
                        self.wrapper;

                    this.scroll = new iScroll(wrapper, {
                        snap: true,
                        momentum: false,
                        hScrollbar: false,
                        vScroll: false,

                        onBeforeScrollStart: function (event) {
                            if (this.absDistX > (this.absDistY + 5)) {
                                event.preventDefault();
                            }
                        },

                        onScrollEnd: function () {
                            self.$paginatorButtons.children(".active").removeClass("active");
                            self.$paginatorButtons.eq(this.currPageX).children().addClass("active");
                            self.changeListHeight();
                        }
                    });

                    this.bindEvents();
                },

                cache: function() {
                    this.$imagesList = $(".iScroll, #article_header ul");
                    this.$images = this.$imagesList.children("li:lt(" + this.NUMBER_OF_IMAGES + ")");
                },

                dependencies: function() {
                    return this.$images.length < 2;
                },

                addWidth: function (){
                    var
                        imagesSummaryWidth = 0,
                        $scroller = (this.wrapper && this.wrapper.jquery) ?
                            this.wrapper.find(".scroller") :
                            $(".scroller", this.wrapper);

                    $scroller.css("width", "100%");

                    this.$images.each(function() {
                        var
                            $this = $(this),
                            width = 0;

                        $this.css("width", "100%");

                        width = $this.width();
                        $this.css("width", width + "px");
                        imagesSummaryWidth += width;
                    });

                    $scroller.width(imagesSummaryWidth);
                },

                changeListHeight: function() {
                    var 
                        self = imagesPaginator,
                        index = 0,
                        $slide,
                        slideHeightCounted = 0,
                        slideHeight = 0,
                        boundary = 100;

                    index = self.$paginatorButtons.children(".active").data("index");
                    $slide = self.$imagesList.find("li:nth-child(" + (index + 1) + ")");
                    slideHeight = $slide.height();

                    slideHeightCounted = slideHeight + parseInt($slide.css("margin-top"), 10) + parseInt($slide.css("margin-bottom"), 10) + parseInt($slide.css("padding-top"), 10) + parseInt($slide.css("padding-bottom"), 10);

                    if (boundary >= slideHeight) {
                        self.timeoutID.changeListHeight = g.setTimeout(function() {
                            self.changeListHeight();
                        }, 10);
                    } else {
                        if ($.browser.msie) {
                            self.$imagesList.height(slideHeightCounted);
                        } else {
                            g.clearTimeout(self.timeoutID.changeListHeight);
                            self.$imagesList.animate({
                                height: slideHeightCounted
                            });
                        }
                    }
                },

                bindEvents: function() {
                    var
                        $prevButton = this.$imagesPaginator.find("a[href='#jspaginator_previous']"),
                        $nextButton = this.$imagesPaginator.find("a[href='#jspaginator_next']"),
                        $paginatorButtons = this.$imagesPaginator.find("li li a");

                    $(g).on("resize", this.onWindowResize);

                    $prevButton.on("click", this.onClickPrevButton);
                    $nextButton.on("click", this.onClickNextButton);
                    $paginatorButtons.on("click", this.onPaginatorButton);

                },

                onWindowResize: function() {
                    var self = imagesPaginator;

                    self.addWidth();

                    g.setTimeout(function() {
                        var index = self.$paginatorButtons.children(".active").data("index");

                        self.scroll.refresh();
                        self.scrollByButton(index);
                    }, 250);
                },

                onClickPrevButton: function(event) {
                    var self = imagesPaginator;

                    self.scrollByButton("prev", event);
                },

                onClickNextButton: function(event) {
                    var self = imagesPaginator;

                    self.scrollByButton("next", event);
                },

                onPaginatorButton: function(event) {
                    var 
                        self = imagesPaginator,
                        index = null;

                    index = $(this).data("index");
                    self.scrollByButton(index, event);
                },

                scrollByButton: function(button, event) {
                    var self = imagesPaginator;

                    if (event) {
                        event.preventDefault();
                    }

                    self.scroll.scrollToPage(button, 0, 500);
                }
            },

            reltedArticlesPaginator = {
                NUMBER_OF_ARTICLES: 20,
                NUMBER_OF_ARTICLES_PER_PAGE: 2,
                IS_WIDTH_LESS_THAN_320: false,

                init: function() {
                    var
                        self = this,
                        buildPaginator,
                        buildPages,
                        checkClientWidth;

                    buildPages = function() {
                        var
                            $wrapperPages,
                            $page,
                            $li,
                            $article,
                            counter,
                            moveArticles,
                            reset = {};

                        counter = 0;

                        $wrapperPages = $("<ul/>", {
                            "class": "wrapper_pages"
                        });

                        moveArticles = function() {
                            self.$articles.each(function() {
                                var condition;

                                $article = $(this);
                                $article.appendTo($page);

                                condition = ($page.children().length) === self.NUMBER_OF_ARTICLES_PER_PAGE;

                                if (condition) {
                                    counter += self.NUMBER_OF_ARTICLES_PER_PAGE;

                                    reset.$li();
                                    $page.appendTo($li);
                                    $li.appendTo($wrapperPages);
                                    reset.$page();
                                }
                            });

                            if (counter !== self.$articles.length) {
                                reset.$li();
                                reset.$page();

                                for (; counter < self.$articles.length; counter += 1) {
                                    self.$articles.eq(counter).appendTo($page);
                                    $page.appendTo($li);
                                    $li.appendTo($wrapperPages);
                                }
                            }
                        };

                        reset.$page = function() {
                            $page = $("<ul/>", {
                                "class": "page"
                            });
                        };

                        reset.$li = function() {
                            $li = $("<li/>");
                        };

                        reset.$page();
                        moveArticles();
                        $wrapperPages.appendTo(self.$body);
                        self.$articles.parent().addClass("hidden");
                        self.$articles = $wrapperPages.children();
                    };

                    buildPaginator = function() {
                        var
                            $paginator,
                            $wrapperButtons,
                            $prev,
                            $next,
                            $pagesButtons;

                        $paginator = $("<div />", {
                            "class": "mod mod_jspaginator",
                            id: "articlesPaginator"
                        }).appendTo(self.$articlesList.parent().next());

                        $wrapperButtons = $("<ul><li/><li/><li/></ul>").appendTo($paginator);

                        $prev = $("<a/>", {
                            href: "#jspaginator_previous",
                            html: "<span>previous</span>"
                        }).appendTo($wrapperButtons.children().first());

                        $next = $("<a/>", {
                            href: "#jspaginator_next",
                            html: "<span>next</span>"
                        }).appendTo($wrapperButtons.children().last());

                        $pagesButtons = $("<ul/>").appendTo($wrapperButtons.children().eq(1));

                        self.$articles.each(function(i) {
                            var
                                text,
                                $li,
                                $a;

                                text = "page " + i,

                                $li = $("<li/>").appendTo($pagesButtons);

                                $a = $("<a/>", {
                                    href: "#",
                                    "data-index": i
                                });

                                $('<span>', {
                                    text: text
                                }).appendTo($a);

                                $a.appendTo($li);
                        });

                        self.$paginator = $paginator;
                        self.$paginatorButtons = self.$paginator.find("li li");
                        self.$paginatorButtons.first().children().addClass("active");
                    };

                    checkClientWidth = function() {
                        if (320 >= document.documentElement.clientWidth) {
                            self.IS_WIDTH_LESS_THAN_320 = true;
                        }
                    };

                    checkClientWidth();

                    this.cache();
                    buildPages();
                    buildPaginator();

                    this.$articles.parent().wrap("<div id='wrapperRelatedArticles' class='wrapperJSPaginator wrapperJSPaginator_relatedArticles'><div class='scroller' /></div>");
                    this.$scroller = $("#wrapperRelatedArticles .scroller");
                    this.addWidth(this.$articles, this.$scroller);

                    if (!this.dependencies()) {
                        return;
                    }

                    this.scroll = new iScroll("wrapperRelatedArticles", {
                        snap: true,
                        momentum: false,
                        hScrollbar: false,
                        vScroll: false,

                        onBeforeScrollStart: function (event) {
                            if (this.absDistX > (this.absDistY + 5)) {
                                event.preventDefault();
                            }
                        },

                        onScrollEnd: function () {
                            var $buttons = self.$paginator.find("li li");
                            $buttons.children(".active").removeClass("active");
                            $buttons.eq(this.currPageX).children().addClass("active");
                        }
                    });

                    this.bindEvents();
                },

                dependencies: function() {
                    var
                        articles = this.$articles.length,
                        articlesList = this.$articlesList.length,
                        body = this.$body.length,
                        paginator = this.$paginator.length,
                        scroller = this.$scroller.length;

                    return articles && articlesList && body && paginator && scroller; 
                },

                cache: function() {
                    var
                        self,
                        hideOverflowedPages,
                        numberOfArticles;

                    self = reltedArticlesPaginator;
                    numberOfArticles = (self.IS_WIDTH_LESS_THAN_320 && (2 === self.NUMBER_OF_ARTICLES_PER_PAGE)) ? 16 : self.NUMBER_OF_ARTICLES;

                    hideOverflowedPages = function() {
                        self.$articlesList.children("li:gt(" + (numberOfArticles - 1) + ")").addClass("hidden");
                    };

                    this.$body = $(".mod_zi_related > .body");
                    this.$articlesList = $(".mod_zi_related .articles");
                    
                    hideOverflowedPages();
                    this.$articles = this.$articlesList.children("li:lt(" + numberOfArticles + ")");
                },

                addWidth: function ($elements, $scroller){
                    var
                        summaryWidth = 0,
                        resetWidth;

                    resetWidth = function($o) {
                        $o.css("width", "100%");
                    };

                    resetWidth($scroller);

                    $elements.each(function() {
                        var
                            $this = $(this),
                            width,
                            paddings,
                            $article;

                        $article = $this.find(".article");
                        
                        resetWidth($this);
                        resetWidth($article);

                        width = $this.width();
                        $this.css("width", width + "px");

                        paddings = parseInt($article.css("padding-left"), 10) + parseInt($article.css("padding-right"), 10);
                        $article.width( $article.width() - paddings);

                        summaryWidth += width;
                    });

                    $scroller.width(summaryWidth);
                },

                bindEvents: function() {
                    var
                        $prevButton = this.$paginator.find("a[href='#jspaginator_previous']"),
                        $nextButton = this.$paginator.find("a[href='#jspaginator_next']"),
                        $paginatorButtons = this.$paginator.find("li li a");

                    $(g).on("resize", this.onWindowResize);

                    $prevButton.on("click", this.onClickPrevButton);
                    $nextButton.on("click", this.onClickNextButton);
                    $paginatorButtons.on("click", this.onPaginatorButton);
                
                },

                onWindowResize: function() {
                    var self = reltedArticlesPaginator;

                    self.addWidth(self.$articles, self.$scroller);

                    g.setTimeout(function() {
                        self.$paginatorButtons.children(".active").trigger("click");
                    }, 10);
                },

                onClickPrevButton: function(event) {
                    var self = reltedArticlesPaginator;

                    self.scrollByButton("prev", event);
                },

                onClickNextButton: function(event) {
                    var self = reltedArticlesPaginator;

                    self.scrollByButton("next", event);
                },

                onPaginatorButton: function(event) {
                    var 
                        self = reltedArticlesPaginator,
                        index = null;

                    index = $(this).data("index");
                    self.scrollByButton(index, event);
                },

                scrollByButton: function(button, event) {
                    var self = reltedArticlesPaginator;

                    event.preventDefault();
                    self.scroll.scrollToPage(button, "0");
                }
            };

        g.gazeta_pl.namespace("mobi.jspaginator");
        g.gazeta_pl.mobi.jspaginator = jspaginator;
        g.gazeta_pl.namespace("mobi.jspaginator.imagesPaginator");
        g.gazeta_pl.mobi.jspaginator.imagesPaginator = imagesPaginator;
        g.gazeta_pl.namespace("mobi.jspaginator.reltedArticlesPaginator");
        g.gazeta_pl.mobi.jspaginator.reltedArticlesPaginator = reltedArticlesPaginator;
    }(g, d, jQuery));

    /* Font Resizer v0.1.1 */
    ;(function (g, d, $){
        "use strict";

        var fontResizer = {
            init: function() {
                this.cache();

                if (!this.dependencies()) {
                    return;
                }

                this.$fontResizer.removeClass("hidden");
                this.buttons.$normalSize.parent().addClass("active");

                this.bindEvents();
            },

            cache: function() {
                var 
                    $buttons,
                    str_FONT_RESIZER_= "FONT_RESIZER_",
                    str_FONT_RESIZER_normalSize = str_FONT_RESIZER_ + "normalSize",
                    str_FONT_RESIZER_bigSize = str_FONT_RESIZER_ + "bigSize",
                    str_FONT_RESIZER_extraBigSize = str_FONT_RESIZER_ + "extraBigSize";

                this.$body = $("#body");

                if (!(0 < this.$body.length)) {
                    return;
                }

                this.defaultFontSize = this.$body.css("font-size");
                this.defaultRawFontSize = parseInt(this.defaultFontSize, 10);
                this.defaultFontUnit = this.defaultFontSize.substr(this.defaultRawFontSize.toString().length);

                this.$fontResizer = $(".mod_font_resizer");

                this.buttons = {};
                $buttons = this.$fontResizer.find("a");
                this.buttons.$normalSize = $buttons.first().attr("id", str_FONT_RESIZER_normalSize).removeAttr("href");
                this.buttons.$bigSize = $buttons.eq(1).attr("id", str_FONT_RESIZER_bigSize).removeAttr("href");
                this.buttons.$extraBigSize = $buttons.last().attr("id", str_FONT_RESIZER_extraBigSize).removeAttr("href");
            },

            dependencies: function() {
                return (0 < this.$body.length) && (0 < this.$fontResizer.length);
            },

            bindEvents: function() {
                var
                    self = this,
                    activateButton;

                activateButton = function(o) {
                    var parent = $(o).parent();

                    parent.parent().children("li").removeClass("active");
                    parent.addClass("active");
                };

                this.buttons.$normalSize.on("click", function() {
                    self.changeFontSize.to.normalSize();
                    activateButton(this);
                    $.scrollTo(self.$fontResizer);
                });

                this.buttons.$bigSize.on("click", function() {
                    self.changeFontSize.to.bigSize();
                    activateButton(this);
                    $.scrollTo(self.$fontResizer);
                });

                this.buttons.$extraBigSize.on("click", function() {
                    self.changeFontSize.to.extraBigSize();
                    activateButton(this);
                    $.scrollTo(self.$fontResizer);
                });
            },

            changeFontSize: {
                to: {
                    normalSize: function() {
                        var self = fontResizer;

                        self.$body.css("font-size", self.defaultFontSize);
                        self.runAgain();
                    },

                    bigSize: function() {
                        var 
                            self = fontResizer,
                            amount,
                            bigFormatSize;

                        amount = 1.5;
                        bigFormatSize = self.defaultRawFontSize * amount;
                        self.$body.css("font-size", bigFormatSize + self.defaultFontUnit);
                        self.runAgain();
                    },

                    extraBigSize: function() {
                        var 
                            self = fontResizer,
                            amount,
                            extraBigFormatSize;

                        amount = 2;
                        extraBigFormatSize = self.defaultRawFontSize * amount;
                        self.$body.css("font-size", extraBigFormatSize + self.defaultFontUnit);
                        self.runAgain();
                    }
                }
            },

            runAgain: function() {
                var ra = gazeta_pl.mobi.runAgain;

                if ($.isFunction(ra)) {
                    ra();
                }
            }
        };

        g.gazeta_pl.namespace("mobi.fontResizer");
        g.gazeta_pl.mobi.fontResizer = fontResizer;
    }(g, d, jQuery));

    /*
    **  gazeta_pl.mobi.RTC - v0.1.1 - 2012-06-12
    **  gazeta_pl.mobi.RTC.LoadOldEntries v0.1.0
    **  gazeta_pl.mobi.RTC.Scores v0.1.0
    **  gazeta_pl.mobi.RTC.Related v0.1.0
    */
    (function (g, d, u, $){
        "use strict";

        var
            mobi = g.gazeta_pl.mobi,
            jsonp = g.gazeta_pl.jsonp,
            readData = g.gfunc.readData;

        mobi.RTC = mobi.RTC || {};

        mobi.RTC.LoadOldEntries = {
            init: function(conf) {
                var self;

                self = mobi.RTC.LoadOldEntries;

                self.OLDER_ENTRIES_COUNT = conf && conf.olderEntries || 10;
                self.MORE_BUTTON_TEXT = "\u0141aduj\u0119...";

                self.olderEntries = [];

                self.CSSSelector = {
                    container: {
                        main:  conf.CSSSelector && conf.CSSSelector.container && conf.CSSSelector.container.main || ".mod_rtc",
                        body: conf && conf.CSSSelector && conf.CSSSelector.container && conf.CSSSelector.container.body || "#gazeta_rtc2012_body",
                        moreButton: conf && conf.CSSSelector && conf.CSSSelector.container && conf.CSSSelector.container.moreButton || "#gazeta_rtc_footer"
                    },
                    pagination: conf && conf.CSSSelector && conf.CSSSelector.pagination || ".pages",
                    buttons: {
                        more: conf && conf.CSSSelector && conf.CSSSelector.buttons && conf.CSSSelector.buttons.more || ".mod_content_more.loadOldEntries a"
                    }
                };

                self.CSSClasses = {
                    loading: "loading"
                };

                self.howMany = conf && conf.howMany;
                self.show = conf && conf.show;

                self.cache();

                if (!self.isContainerCached()) {
                    return;
                }

                self.bindEvents();
                self.subscriptions();

                self.initialData = self.$container.gazeta(gfunc.readData);

                // url w testach jest kierowany na kompa Gawrona
                self.servletURI = conf && conf.test ? "http://10.30.142.117:7001/wall/wall.servlet" :
                    "http://" + self.initialData.base + (conf && conf.servlet && conf.servlet.path || "/wall/wallsport.servlet");

                if (!self.isThereAnyPagination()) {
                    self.getOlderEntries();
                }

            },

            cache: function() {
                var self = mobi.RTC.LoadOldEntries;

                self.c = {};

                self.$container = self.getCorrectContainer();

                if (!self.isContainerCached()) {
                    return;
                } else {
                    self.$pagination = self.$container.find(self.CSSSelector.pagination);

                    self.buttons = {
                        $more: self.$container.find(self.CSSSelector.buttons.more)
                    };

                    self.$articleList = self.$container.find(self.CSSSelector.container.body + " > ul");
                    self.updateArticleID();
                }
            },

            bindEvents: function() {
                var self = mobi.RTC.LoadOldEntries;

                if (!self.isThereAnyPagination()) {
                    self.buttons.$more.bind("click", self.onMoreButtonClick);
                }
            },

            subscriptions: function() {
                var self = mobi.RTC.LoadOldEntries;

                $.subscribe("getOlderEntries/loading", function() {
                    self.c["buttons/more/text"] = self.c["buttons/more/text"] || self.buttons.$more.text();

                    self.buttons.$more
                        .text(self.MORE_BUTTON_TEXT)
                        .addClass(self.CSSClasses.loading);
                });

                $.subscribe("onOlderEntries/loaded", function() {
                    var
                        $more = self.buttons.$more;

                    if (true === $more.hasClass(self.CSSClasses.loading)) {
                        self.addOldEntries(self.howMany);

                        $more
                            .text(self.c["buttons/more/text"])
                            .removeClass(self.CSSClasses.loading);
                    }

                    if ((0 >= self.olderEntries.length) && (true === self.noOldEntries)) {
                        $.publish("noOldEntries");
                    }
                });

                $.subscribe("noOldEntries", function() {
                    self.hideMoreButton();
                });
            },

            onOlderEntries: function(data) {
                var
                    self = mobi.RTC.LoadOldEntries,
                    data = data || {},
                    l = 0,
                    i = 0;

                if (!data.error) {
                    l = parseInt(data.oldEntries.length, 10);

                    if (!l || l < self.OLDER_ENTRIES_COUNT) {
                        self.noOldEntries = true;
                    }

                    if (l) {
                        for(; i < l; i++) {
                            self.olderEntries.push(data.oldEntries[i]);
                        }

                        self.firstId = data.oldEntries[i-1].xx;
                        self.userLogin = data.userLogin;
                    }
                }

                self.loading = false;
                $.publish("onOlderEntries/loaded");
            },

            onMoreButtonClick: function(e) {
                var self = mobi.RTC.LoadOldEntries;

                e.preventDefault();
                self.addOldEntries(self.howMany);

                g.gazeta_pl.MobiVideo.init({CSSSelectors: {main: "body"}});
            },

            addOldEntry: function() {
                var
                    self = mobi.RTC.LoadOldEntries,
                    length = self.olderEntries.length,
                    $tmp = null,
                    html = "",

                    publishNoOlderEntries = function() {
                        if ((true === self.noOldEntries) && (0 === length)) {
                            $.publish("noOldEntries");
                        }
                    };

                if (length == 0) {
                    if (!self.noOldEntries) {
                        self.updateArticleID();
                        self.getOlderEntries();
                    }
                } else {
                    html = self.generateEntryHTML(self.olderEntries.shift(), self.show.comments);

                    $tmp = $(html);
                    self.$articleList.append($tmp);
                    $tmp.addClass('old');

                    $tmp.slideDown(500, function() {
                        $(this).removeClass('old');
                    });
                }

                publishNoOlderEntries();
            },

            addOldEntries: function(howMany) {
                var
                    self = mobi.RTC.LoadOldEntries,
                    i = 0,
                    h = howMany || 1;

                for (; i < h; i++) {
                    self.addOldEntry();
                }
            },

            updateArticleID: function() {
                var self = mobi.RTC.LoadOldEntries;

                self.articleID = self.$articleList.children("li:last-child").attr('data-id');
            },

            getOlderEntries: function(entryId) {
                var
                    self = mobi.RTC.LoadOldEntries,
                    id = self.$container.attr("data-id"),
                    data = {
                        "type": "oldentries",
                        "id": id,
                        "odwrocenie": true,
                        "entryId": entryId || self.articleID,
                        "howMany": (entryId ? 1 : self.OLDER_ENTRIES_COUNT),
                        "mobi": true,
                        "url": g.location,
                        "root": self.$container.data("root"),
                        "av": 2
                    };

                if (self.loading == true) {
                    $.publish("getOlderEntries/loading");
                } else {
                    self.loading = true;

                    jsonp(self.servletURI, data, 'gazeta_pl.mobi.RTC.LoadOldEntries.onOlderEntries');
                }
            },

            getDzialXX: function() {
                var xx = 0,
                    uri = d.location.href,
                    ary = uri.split('/').pop().split(',');

                if (ary.length > 1) {
                    xx = parseInt(ary[1], 10);
                    if (xx == '0' && gazeta_pl.documentParam) xx = gazeta_pl.documentParam['xxDzial'] || '0';
                }

                return xx;
            },

            generateEntryHTML: function(entry, withComments) {
                var
                    self = mobi.RTC.LoadOldEntries,
                    buttons = gazeta_pl.toButtonsInfo,
                    btnCode = '',
                    btnText = '',
                    htm = '',
                    uri = '',
                    noComments = gazeta_pl.readParam('komentarze') == 'nie',
                    spec = [
                        ['urgent','PILNE'],
                        ['goal','GOOOOOOL'],
                        ['matchEnd','KONIEC MECZU'],
                        ['correspondent','KORESPONDENT']
                    ];

                uri = self.generateEntryURI(entry.xx);

                htm += '<li' + (entry['pilneTyp'] ? ' class="' + spec[entry['pilneTyp']-1][0] + '"' : '') + ' data-id="' + entry['xx'] + '">';
                htm += '<article class="entry"><header>';
                htm += entry['pilneTyp'] ? '<p class="spec">' + spec[entry['pilneTyp']-1][1] + '</p>' : '';

                if (entry['czas']) {
                    htm += '<strong class="time"><a href="' + uri + '">' + entry['czas'] + '</a></strong>';
                } else if (entry['min']) {
                   htm += '<strong class="time"><a href="' + uri + '">' + entry['min'] + '. min.'+(entry['min_plus'] ? ' + ' + entry['min_plus'] : '')+'</a></strong>';
                } else {
                    htm += '<time pubtime="' + entry['dataISO8601'] + '"><a href="' + uri + '">' + entry['data'] + '</a></time>';
                }

                if (entry['urlObrazka']) {
                    htm += '<div class="imgw"><img src="' + entry['urlObrazka'] + '" alt="" /></div>';
                }
                if (entry['klasaIkony']) {
                    htm += '<div class="imgw"><span class="ico ' + entry['klasaIkony'] + '"></div>';
                }

                htm += '</header>';
                htm += '<div class="content"><section class="body">';

                if (entry['autorZdjXX']) {
                  htm += '<div class="author"><span><img src="' + entry['autorZdjLink'] + '" />';
                  if (entry['autorNazwa']) htm += ' <b>' + entry['autorNazwa'] + '</b>';
                  htm += '</span></div>';
                }

                htm += entry['body'] + '</section>';
                htm += '<footer><div class="c0">';

                if (!noComments && entry['komentarze']) htm += '<a data-action="commentsToggle" href="#"><span>Skomentuj</span></a>';
                if (entry['likeNotka']) htm += '<div class="fb"><a data-action="fbShare" href="#">Podziel si\u0119</a></div>';

                htm += '</div><div class="c1">';

                if (entry['oceniacze'] && buttons) {
                    htm += '<div class="toButtons" data-table-name="zczuba_wpisy" data-article-xx="' + entry['xx'] + '" data-dzial-xx="' + me.getDzialXX() + '"><ul>';

                    for (btnCode in buttons) {
                        if (!btnCode.match(/^[0-9]+$/)) continue;

                        btnText = buttons[btnCode];
                        htm += '<li data-category="' + btnCode + '"><button><em>' + btnText + '</em></button></li>';
                    }

                    htm += '</ul></div>';
                }

                htm += '</div></footer>';
                htm += '</div></article>';

                if (withComments) {
                    if (!noComments && entry['komentarze']) {
                        htm += self.generateComments(entry);
                    }
                }

                htm += '</li>';

                return htm;
            },

            generateEntryURI: function(xx) {
                var
                    loc = d.location,
                    commas = ',,,';

                if (loc.pathname.indexOf('/2,') > -1) {
                    commas = ',';
                }

                return loc.protocol + '//' + loc.host + loc.pathname.replace(/\.html/, commas + xx + '.html');
            },

            generateComments: function(entry) {
                var
                    self = mobi.RTC.LoadOldEntries,
                    html = "",
                    url = "",
                    commentsCount = 0;

                url = self.generateCommentsURL(entry.xx);
                commentsCount = entry["commentsCount"];

                html += '<article class="mod mod_comments visible"><footer><p class="more"><a href="' + url + '">Skomentuj (' + commentsCount +')</a></p></footer></article>';

                return html;
            },

            generateCommentsURL: function(xx) {
                var
                    self = mobi.RTC.LoadOldEntries,
                    url = "",
                    l = d.location,
                    patterns = {
                        html: ".html",
                        comma: ","
                    };

                url += l.href.replace(patterns.html, patterns.comma + xx + patterns.html);

                return url;
            },

            isThereAnyPagination: function() {
                var self = mobi.RTC.LoadOldEntries;

                return !!$(self.CSSSelector.container.main + " " + self.CSSSelector.pagination).length;
            },

            isContainerCached: function() {
                var self = mobi.RTC.LoadOldEntries;

                return self.$container && self.$container.length;
            },

            hideMoreButton: function() {
                var self = mobi.RTC.LoadOldEntries;

                self.buttons.$more.closest(self.CSSSelector.container.moreButton).slideUp();
            },

            getCorrectContainer: function() {
                var self = mobi.RTC.LoadOldEntries,
                    $c = $(self.CSSSelector.container.main),
                    $this,
                    attr,
                    $correct;

                $c.each(function(inx, el) {
                    $this = $(this);

                    attr = $this.attr("data-base");

                    if (attr) {
                        $correct = $this;
                    }
                });

                return $correct;
            }
        };

        mobi.RTC.Scores = mobi.RTC.Scores || {
            init: function(conf) {
                var self = mobi.RTC.Scores;

                self.CSSSelector = {
                    containers: {
                        big: conf && conf.CSSSelector && conf.CSSSelector.containers && conf.CSSSelector.containers.big || ".mod.mod_score",
                        small: conf && conf.CSSSelector && conf.CSSSelector.containers  && conf.CSSSelector.containers.small || ".mod_group",
                    },
                    buttons: {
                        rollUp: conf && conf.CSSSelector && conf.CSSSelector.buttons && conf.CSSSelector.buttons.rollUp || ".button_show_score_rollup a",
                        rollDown: conf && conf.CSSSelector && conf.CSSSelector.buttons && conf.CSSSelector.buttons.rollDown || ".button_show_score_rolldown a"
                    },
                    helper: {
                        containers: {
                            small: ""
                        }
                    }
                };

                self.CSSClasses = {
                    hidden: "hidden"
                };

                self.cache();

                if (!self.containers.$big.length || !self.containers.$small.length) {
                    return;
                }

                self.bindEvents();
            },

            cache: function() {
                var
                    self = mobi.RTC.Scores,
                    getSmallContainer = function() {
                        var $container = $(self.CSSSelector.containers.small);

                        if ($container.find(".mod_score")) {
                            return $container;
                        }

                        return null;
                    };

                self.containers = {
                    $big: $(self.CSSSelector.containers.big),
                    $small: getSmallContainer()
                };

                self.buttons = {
                    $rollUp: $(self.CSSSelector.buttons.rollUp),
                    $rollDown: $(self.CSSSelector.buttons.rollDown)
                }
            },

            bindEvents: function() {
                var self = mobi.RTC.Scores;

                self.buttons.$rollUp.on("click", self.hideContainer);
                self.buttons.$rollDown.on("click", self.showContainer);
            },

            hideContainer: function(e) {
                var self = mobi.RTC.Scores;

                e.preventDefault();

                self.containers.$small.removeClass(self.CSSClasses.hidden);
                self.containers.$big.addClass(self.CSSClasses.hidden);
            },

            showContainer: function(e) {
                var self = mobi.RTC.Scores;

                e.preventDefault();

                self.containers.$small.addClass(self.CSSClasses.hidden);
                self.containers.$big.removeClass(self.CSSClasses.hidden);
            }
        };

        mobi.RTC.Related = {
            VERSION: {
                major: 0,
                minor: 1,
                release: 0
            },

            init: function(conf) {
                var self = mobi.RTC.Related,

                    prepareTemplate = function() {
                        var template = conf.template;

                        $("<script />", {
                            id: template.id,
                            type: template.type,
                            html: template.content
                        }).appendTo(d.body);
                    };

                self.CSSSelector = {
                    container: {
                        main: conf && conf.CSSSelector && conf.CSSSelector.container && conf.CSSSelector.container.main || ".mod_about_meeting",
                        body: conf && conf.CSSSelector && conf.CSSSelector.container && conf.CSSSelector.container.body || "#related-art"
                    },
                    buttons: {
                        more: conf && conf.CSSSelector && conf.CSSSelector.buttons && conf.CSSSelector.buttons.more || ".mod_about_meeting footer .more"
                    }
                };

                self.CSSClasses = {
                    hidden: "hidden"
                };

                self.cache();
                self.servlet = conf && conf.servlet;

                if (!self.isContainerCached()) {
                    return;
                }

                if (conf) {
                    self.count = $.isNumeric(conf.count) ? conf.count : 4;
                    self.position = $.isNumeric(conf.position) ? conf.position : 5;
                }

                self.bindEvents();

                prepareTemplate();
                self.templateHTML = $("#" + conf.template.id).html();

                self.getData();
            },

            cache: function() {
                var self = mobi.RTC.Related;

                self.$container = $(self.CSSSelector.container.main);
                self.$container.xx = self.$container.data("xx");

                self.$relatedArticles = $(self.CSSSelector.container.body + " > ul");

                self.buttons = {};
                self.buttons.$more = $(self.CSSSelector.buttons.more);
            },

            bindEvents: function() {
                var self = mobi.RTC.Related;

                self.buttons.$more.on("click", self.onMore);
            },

            getVersion: function() {
                var
                    self = mobi.RTC.Related,
                    separator = ".";

                return self.VERSION.major + separator + self.VERSION.minor + separator + self.VERSION.release;
            },

            getData: function() {
                var self = mobi.RTC.Related;

                gazeta_pl.jsonp(
                    self.servlet.url,
                    {
                        "xx_meczu": self.$container.xx,
                        "isEkstaklasaTRoot": false,
                        "count": self.count + 1,
                        "position": self.position
                    },
                    "gazeta_pl.mobi.RTC.Related.onDataLoaded"
                );
            },

            isContainerCached: function() {
                var self = mobi.RTC.Related,
                    c = !!self.$container.length,
                    xx = !!self.$container.xx;

                return c && xx;
            },

            hideMoreButton: function() {
                var self = mobi.RTC.Related;

                self.buttons.$more.fadeOut();
            },

            renderResults: function() {
                var
                    self = mobi.RTC.Related,
                    data = self.entries,
                    template = Handlebars.compile( self.templateHTML );

                self.$relatedArticles.append(template(data));
                self.$relatedArticles.find("li").fadeIn().removeClass(self.CSSClasses.hidden);
            },

            onMore: function(e) {
                var self = mobi.RTC.Related;


                e.preventDefault();
                self.renderResults();
                self.getData();
            },

            onDataLoaded: function(data) {
                var
                    self = mobi.RTC.Related,
                    counter = 1;

                self.entries = data.entries;

                if (self.entries.length) {

                    counter += self.entries.length;
                    self.position += self.entries.length;

                    if (counter < self.count) {
                        self.hideMoreButton();
                    }
                } else {
                    self.hideMoreButton();
                }
            }
        };

        g.gazeta_pl.mobi = mobi;
    }(window, document, undefined, jQuery)); 

    /* article.more.button v1.0.0 */
    (function (g, d, $, u){
        "use strict";

        var articleMoreButton = {
            init: function() {
                var
                    self,
                    buildButton,
                    shortenArticle;

                self = articleMoreButton;

                buildButton = function() {
                    var 
                        $articleFooter,
                        $inner;

                    $articleFooter = $("#article_footer");

                    self.$button = $("<a/>", {
                        "class": "more",
                        id: "artcile_more",
                        href: "#artcile_more"
                    });

                    $inner = $("<span/>", {
                        "class": "inner",
                        text: "Rozwi\u0144"
                    }).appendTo(self.$button);

                    self.$button.appendTo($articleFooter);
                };

                shortenArticle = function() {
                    var self = articleMoreButton;

                    self.$article.height(2 * self.deviceHeight);
                };

                this.cache();

                if (!this.dependencies()) {
                    return;
                }

                if (!this.$button.length) {
                    buildButton();
                } else {
                    this.$button.removeClass("hidden");
                }

                shortenArticle();
                this.bindEvents();
            },

            cache: function() {
                this.$button = $("#article_footer a.more");
                this.$article = $("#article_body");
                this.deviceHeight = d.documentElement.clientHeight;
                this.defaultArctileHeight = this.$article.height();
            },

            dependencies: function() {
                var
                    self,
                    article,
                    isArticleTooLong,
                    isRTC;

                self = articleMoreButton;
                article = this.$article.length;

                isRTC = function() {
                    return self.$article.find(".mod_rtc").length;
                };

                isArticleTooLong = function() {
                    return (2 * self.deviceHeight) < self.defaultArctileHeight;
                };

                return (!isRTC()) && article && isArticleTooLong();
            },

            bindEvents: function() {
                var self = articleMoreButton;

                self.$button.on("click", self.showArticle);
            },

            showArticle: function() {
                var self = articleMoreButton;

                self.$article.animate({
                    height: self.defaultArctileHeight
                }, function() {
                    self.hideMoreButton();
                    $(this).css("height", "auto");
                });
            },

            hideMoreButton: function() {
                var self = articleMoreButton;

                self.$button.fadeOut();
            }
        };

        g.gazeta_pl.namespace("mobi.articleMoreButton");
        g.gazeta_pl.mobi.articleMoreButton = articleMoreButton;
    }(g, d, jQuery));

    /* mod_comments.more.button v1.0.0 */
    (function (g, d, $, u){
        "use strict";

        var mod_commentsMoreButton = {
            NUMBER_OF_PARAGRAPHS: 3,

            init: function() {
                var
                    self = mod_commentsMoreButton,
                    countDesirableHeightOfComment,
                    countHeightOfParagraph,
                    heightOfParagraph,
                    parseDecimal,
                    buildButton,
                    resetHeights;

                parseDecimal = function(string) {
                    return parseInt(string, 10);
                };

                countHeightOfParagraph = function() {
                    var
                        $paragraph,
                        lineHeight,
                        getLineHeight;

                    $paragraph = $(".mod_comments_list > .body li:first-child .body p");
                    
                    if ($.browser.msie) {
                        getLineHeight = function (element){
                            var 
                                temp,
                                ret;

                            temp = document.createElement(element.nodeName);

                            temp.setAttribute("style","margin:0px;padding:0px;font-family:" + element.style.fontFamily + ";font-size:" + element.style.fontSize);
                            temp.innerHTML = "test";
                            temp = element.parentNode.appendChild(temp);
                            ret = temp.clientHeight;
                            temp.parentNode.removeChild(temp);

                            return ret;
                        };

                        lineHeight = getLineHeight($paragraph.get(0));
                    } else {
                        lineHeight = $paragraph.css("line-height");
                    }

                    return parseDecimal(lineHeight);
                };

                countDesirableHeightOfComment = function() {
                    return heightOfParagraph * self.NUMBER_OF_PARAGRAPHS;
                };

                buildButton = function() {
                    var $paragraph = $(this);

                    $("<a/>",{
                        "class": "more",
                        text: "rozwi\u0144"
                    }).on("click", function() {
                        $paragraph.animate({
                            height: $paragraph.data("defaultHeight")
                        }, function() {
                            $paragraph
                                .data("visible", true)
                                .removeAttr("style")
                                .children("a.more").fadeOut();
                        });
                    }).appendTo($paragraph);
                };

                resetHeights = function() {
                    $(".mod_comments_list > .body .body p")
                        .filter(self.giveHidden)
                        .removeAttr("style");
                };

                resetHeights();
                heightOfParagraph = countHeightOfParagraph();
                this.desirableHeightOfComment = countDesirableHeightOfComment();

                this.cache();

                if (!this.dependencies()) {
                    return;
                }

                this.$longComments
                    .height(this.desirableHeightOfComment)
                    .each(buildButton);
            },

            dependencies: function() {
                return this.$longComments.length;
            },

            cache: function() {
                var self = mod_commentsMoreButton;

                self.$longComments = $(".mod_comments_list > .body .body p")
                    .filter(self.giveHidden)
                    .filter(function() {
                        var
                            $this = $(this),
                            height = $this.height();

                        if (self.desirableHeightOfComment < height) {
                            $this.data("defaultHeight", height);

                            return $this;
                        }
                    });
            },

            giveHidden: function() {
                return !$(this).data("visible");
            }
        };

        g.gazeta_pl.namespace("mobi.mod_commentsMoreButton");
        g.gazeta_pl.mobi.mod_commentsMoreButton = mod_commentsMoreButton;
    }(g, d, jQuery));  

    /* imagesHighResolutionManager v1.0.0 */
    (function (g, d, $){
        "use strict";

        var imagesHighResolutionManager;

        imagesHighResolutionManager = {
            imagesCSSSelector: "#winieta a.logo img",

            init: function() {
                if (!this.dependencies()) {
                    return;
                }

                this.cache();
                this.replaceImages();
            },

            dependencies: function() {
                var isHighPixelRatio;

                isHighPixelRatio = function() {
                    var
                        condition,
                        webkit,
                        moz,
                        all;

                    webkit = "only screen and (-webkit-min-device-pixel-ratio: 1.5)";
                    moz = "(min--moz-device-pixel-ratio: 1.5)";
                    all = "(min-device-pixel-ratio: 1.5)";

                    condition = g.matchMedia(webkit + "," + moz + "," + all).matches;

                    return condition;
                };

                return isHighPixelRatio();
            },

            cache: function() {
                this.$images = $(this.imagesCSSSelector);
            },

            replaceImages: function() {
                this.$images.each(function() {
                    var
                        $this = $(this),
                        newSrc,
                        $test;

                    newSrc = $this.data("src");

                    $test = $("<img/>");
                    $test.on("load", function() {
                        $this.css("width", $this.width());
                        $this.attr("src", newSrc);
                    }).attr("src", newSrc);
                });
            }
        };

        g.gazeta_pl.namespace("mobi.imagesHighResolutionManager");
        g.gazeta_pl.mobi.imagesHighResolutionManager = imagesHighResolutionManager;
    }(g, d, jQuery));

    /* whoTheHeckAreYou v1.0.0 */
    (function (g, d){
        "use strict";

        var wthay = {
            init: function() {
                var
                    self,
                    tellMeWhoYouAre;

                self = wthay;

                tellMeWhoYouAre = function() {
                    var
                        areYouIOS,
                        areYouAndroid,
                        areYouWindows,
                        addClass;

                    areYouIOS = function() {
                        var regex = /ipod|iphone|ipad/gi;

                        return regex.test(navigator.platform);
                    };

                    areYouAndroid = function() {
                        var regex = /android/gi;

                        return regex.test(navigator.userAgent);
                    };

                    areYouWindows = function() {
                        var regex = /win32|win/gi;

                        return regex.test(navigator.platform);
                    };

                    addClass = function(cls) {
                        var oldClass;

                        oldClass = self.main.getAttribute("class");
                        self.main.setAttribute("class", (oldClass ? oldClass + " " : "") + cls);
                    };

                    if (areYouIOS()) {
                        addClass("iOS");
                    }

                    if (areYouAndroid()) {
                        addClass("Android");
                    }

                    if (areYouWindows()) {
                        addClass("Windows");
                    }
                };

                this.cache();

                if (!this.dependencies()) {
                    return;
                }

                tellMeWhoYouAre();
            },

            cache: function() {
                this.main = d.body;
            },

            dependencies: function() {
                return this.main;
            }
        };

        g.gazeta_pl.namespace("mobi.wthay");
        g.gazeta_pl.mobi.wthay = wthay;
    }(g, d));
    
    /*
        json2.js
        2012-10-08
        Public Domain.
        NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
        See http://www.JSON.org/js.html
    */
    if(typeof JSON!=="object"){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());

    /* runOnce() v.0.0.1 */
    (function (g){
        "use strict";

        var runOnce = function(fn, args) {
            if (this.runned) {
                clearTimeout(this.runned);
            }

            this.runned = setTimeout(function() {
                fn.apply(fn, args);
            }, 500);
        };

        g.gazeta_pl.namespace("runOnce");
        g.gazeta_pl.runOnce = runOnce;
    }(g));
        
    /* PlayerHTML5 v0.1.4 */
    (function (g, d, $){
        var swfobject;
        /*   SWFObject v2.2 <http://code.google.com/p/swfobject/> 
           is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
        */
        swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
        
        gazeta_pl.EmbedContent = {
            flash: function() {
                var 
                    i = 0, 
                    l = 0,
                    fl = null, 
                    params = null;

                if (gazeta_pl.flash_holders && (l = gazeta_pl.flash_holders.length)) {
                    for (i = 0; i < l; i++) {
                        params = {wmode: 'opaque', allowScriptAccess: 'always'};        
                        fl = gazeta_pl.flash_holders[i];
                        params.flashvars = fl.vars;
                        if (fl.allowFullScreen == 'true') params.allowFullScreen = 'true';
                        swfobject.embedSWF(fl.url, fl.id, fl.width, fl.height, '9.0.0', '/info/expressInstall.swf', {}, params);
                    } 
                }
            }
        };

        /* PlayerHTML5 */
        (function () {
            var MobiVideo = {
                init: function(conf) {
                    var
                        self = MobiVideo,
                        t = null,
                        i = 0,
                        l = 0,
                        eventType = (function() {
                            var
                                prefix = "on",
                                orientationchange = "orientationchange",
                                eventName = ((prefix + orientationchange) in window) ? orientationchange : "resize";

                            return eventName;
                        }()),

                        $videoContainers = $('.gazetaVideoPlayer object, .tylko_int object, .mod.mod_uzr9 .body'),

                        receiveMessage = function(event) {  
                            var 
                                e = event.originalEvent,
                                data = e.data;
                            
                            try {
                              data = JSON.parse(data);
                            } catch(err) { }
                
                            if (data && data.action && data.action == 'getAdParams') {
                                if (window.nobanner) {
                                    e.source.postMessage('{"action":"setAdParams","nobanner":true}', e.origin);
                                } else if (window.ban_dx && window.ban_dir && window.ban_jsp) {
                                    e.source.postMessage('{"action":"setAdParams","dx":' + window.ban_dx + ',"dir":"' + window.ban_dir + '","jsp":' + window.ban_jsp + '}', e.origin);
                                }
                            }
                        };

                    self.CSSSelectors = {
                        main: conf && conf.CSSSelectors && conf.CSSSelectors.main || "#col_left"
                    };
                
                    $(window).bind("message", receiveMessage); 
                
                    (function (){
                        var
                            $gap,
                            isGapExist,
                            isNewPlayer,
                            isFlashPlayerSet;

                        $gap = $("#gazeta_article_player");

                        isGapExist = function() {
                            return !!$gap.length;
                        };

                        isNewPlayer = function() {
                            return !!$("#gazeta_article_player + iframe#gazetaVideoPlayerEmbed").length;
                        };

                        isFlashPlayerSet = function() {
                            return swfobject.getFlashPlayerVersion().major > 0;
                        };

                        $videoContainers.each(function() { 
                                $(this).replaceWith(self.getIframe($(this)));
                        });
                        
                        if (isGapExist()) {
                            if (isNewPlayer()) {
                                return;
                            }

                            if (isFlashPlayerSet()) {
                                t = setInterval(function() {
                                    if ($('object#gazeta_article_player').length) {
                                        clearInterval(t);
                                        $('object#gazeta_article_player').replaceWith(gazeta_pl.MobiVideo.getIframe($('object#gazeta_article_player'), true));
                                    }
                                }, 10);
                            } else {
                                for (l = gazeta_pl.flash_holders.length; i < l; i++) {
                                    if (gazeta_pl.flash_holders[i].id == 'gazeta_article_player') {
                                        $('#gazeta_article_player').replaceWith(gazeta_pl.MobiVideo.getIframe(gazeta_pl.flash_holders[i], true));
                                        break;
                                    }
                                }
                            }
                        }
                    }());
                        

                    $('.gazetaVideoPlayer').show();
                    $('.tylko_int object').css({display:'inline'});
                    self.resize();
                },
                
                embedFrame: function(data) {
                    var 
                        self = gazeta_pl.MobiVideo,
                        $target = null;

                    if (screen.width < 600 || 'ontouchstart' in window) {
                        if (navigator.userAgent.match(/\b(android|ios|iphone os|ipad)\b/i)) {
                            $target = $('#' + data.id);

                            self.CSSSelectors = { main: $target.parent()[0] };

                            $target.replaceWith(gazeta_pl.MobiVideo.getIframe($target, false, data.vars));
                            return true;
                        }
                    }

                    return false;
                },

                getIframe: function(obj, notEmbed, pflvars) {
                    var 
                        self,
                        flvars,
                        id,
                        xx,
                        xxd,
                        type,
                        width,
                        height,
                        iframe;

                    self = gazeta_pl.MobiVideo;

                    flvars = (function (){
                        var
                            flashVars,
                            flashVarsFromFlashHolders;

                        flashVarsFromFlashHolders = function (){
                            var getMovieObjectParams;

                            getMovieObjectParams = function (){
                                var
                                    item = {},
                                    id = obj.jquery && obj.find("div[id]").attr("id"),
                                    i = gazeta_pl.flash_holders.length - 1;

                                for (; i >= 0; i--) {
                                    item = gazeta_pl.flash_holders[i];

                                    if (id === item.id) {
                                        return item;
                                    }
                                }
                            };

                            self.movieObjectParams = getMovieObjectParams();

                            return self.movieObjectParams.vars;
                        };

                        flashVars = obj.find("param[name='flashvars'], param[name='FlashVars']");

                        return pflvars ?
                            pflvars : obj.jquery ?
                            "object" === typeof flashVars && flashVars.val() : obj.vars ?
                            obj.vars : (gazeta_pl && gazeta_pl.flash_holders && flashVarsFromFlashHolders());
                    }());

                    id = obj.jquery ? obj.attr('id') : obj.id;
                    xx = flvars && flvars.match(/xx=([0-9]+)/)[1];
                    xxd = flvars && flvars.match(/xxd=([0-9]+)/)[1];
                    type = flvars && (flvars.indexOf('/getDaneWideo') > -1 ? 'video' : flvars.indexOf('/WideoSeria') ? 'series' : '');
                    width = null;
                    height = null;
                    iframe = '<iframe id="[ID]" src="http://www.gazeta.tv/plej/19,[XXD],[XX],[TYPE].html'+(notEmbed ? '?embed=0' : '')+'" width="[WIDTH]" height="[HEIGHT]" frameborder="0" scrolling="no" allowfullscreen></iframe>';

                    if (xx && xxd && type) {
                        width = self.countWidth({
                            o: obj
                        });
                        height = Math.ceil((width * 9/16) + (type == 'series' ? 85 : 0));

                        return iframe.replace('[ID]', id).replace('[XXD]', xxd).replace('[XX]', xx).replace('[TYPE]', type).replace('[WIDTH]', width).replace('[HEIGHT]', height);
                    }       
                },

                countWidth: function(params) {
                    var
                        self = gazeta_pl.MobiVideo,
                        obj = params && params.o || null,
                        width = params && params.width || self.movieObjectParams && self.movieObjectParams.width || 320,
                        movieObjectWidth = obj ? (obj.jquery ? obj.width() : obj.width) : width,
                        containerWidth = $(self.CSSSelectors.main).width(),
                        minWidth = Math.min(movieObjectWidth, containerWidth),
                        maxWidth = Math.max(movieObjectWidth, containerWidth);

                    return (0 < minWidth) ? minWidth : maxWidth;
                },
            
                resize: function() {
                    g.gazeta_pl.mobi.video.videoContainerResizer.init({
                        main: "#gazeta_rtc2012 .entry .body, body > .main, .gazetaVideoPlayer",
                        iframe: ".gazetaVideoPlayer iframe, iframe#gazeta_article_player, .mod.mod_uzr9 iframe, #gazetaVideoPlayerEmbed"
                    });
                }
            };

            g.gazeta_pl.namespace("MobiVideo");
            g.gazeta_pl.MobiVideo = MobiVideo;
        }());
    }(g, d, jQuery));

    /* videoContainerResizer v1.0.1 */
    (function (g) {
        var videoContainerResizer = {
            init: function(conf) {
                var
                    self = this,
                    eventType = ("onorientationchange" in window) ? "orientationchange" : "resize";

                this.main = conf && conf.main || "#col_left";
                this.iframe = conf && conf.iframe || ".gazetaVideoPlayer iframe, iframe#gazeta_article_player, .mod.mod_uzr9 iframe, #gazetaVideoPlayerEmbed";
            
                this.resize();

                $(g).bind(eventType, function() {
                    g.gazeta_pl.runOnce(self.resize, [eventType]);
                });
            },
        
            resize: function() {
                var self = g.gazeta_pl.mobi.video.videoContainerResizer;

                $(self.iframe).each(function() {
                    var 
                        $this = $(this),
                        type = "",
                        width = 620,
                        height = 0,
                        orientation = (90 === Math.abs(g.orientation)) ? "landscape" : "portrait",

                        isAndroid = (/android/i).test(navigator.userAgent),

                        setWidthForAndroidBasedDevices = function() {
                            if (isAndroid) {
                                width = $this.parent().width();
                            }
                        },

                        fixResizeBug = function() {
                            $this[0].contentWindow.postMessage('{"action":"resize"}', '*');
                        };

                    type = ($this.attr("src").indexOf(",video")) > -1 ? "video" : "series";

                    setWidthForAndroidBasedDevices();

                    $(self.main).each(function() {
                        width = Math.min(width, $(this).width());
                    });
                    
                    height = Math.ceil((width * 9/16) + (type == "series" ? 85 : 0));

                    $this.attr({"width": width, "height": height});
                    fixResizeBug();
                });
            }
        };

        g.gazeta_pl.namespace("mobi.video.videoContainerResizer");
        g.gazeta_pl.mobi.video.videoContainerResizer = videoContainerResizer;
    }(window));

    /* Utils v0.1.1 */
    (function(a,f,b,e){var c={};c.isBrowserSupportsJSON=function(){return !!("JSON" in window)};c.isJSON=function(d){if(d.indexOf){return(-1!==d.indexOf("{"))?true:false}else{return typeof d}};c.escapeKeysInObj=function(h){var g={},d;for(d in h){g[encodeURIComponent(d)]=h[d]}return g};c.unescapeKeysInObj=function(h){var g={},d;for(d in h){g[decodeURIComponent(d)]=h[d]}return g};c.isOperaMini=function(){var d=/Opera Mini/gi;return d.test(navigator.userAgent)};c.count=function(g){if(g.__count__!==undefined){return g.__count__}var d=0,h;for(h in g){if(g.hasOwnProperty(h)){d+=1}}return d};c.isGrandsonOfContainer=function(d,g){return g.get(0)===d.parent().parent().get(0)};c.isNumeric=function(d){return !isNaN(parseFloat(d))&&isFinite(d)};a.gazeta_pl.namespace("mobi.Utils");a.gazeta_pl.mobi.Utils=c}(window,document,undefined,jQuery));

    /* CookieManager v0.2.2 */
    (function(b){var a={init:function(){var c=a;c.Utils=b.gazeta_pl.mobi.Utils},set:function(){var l=a,f=arguments,c,e,d,j,g,m,k=function(){if("string"===typeof f[0]){d=f[0];j=f[1]}else{e=f[0];d=e.name;j=e.value;g=e.expireDays;m=e.path}if("object"===typeof j){if(l.Utils.isBrowserSupportsJSON()){j=l.Utils.escapeKeysInObj(j);j=JSON.stringify(j)}else{throw {message:"Your browser don't support JSON :-("}}}else{j=encodeURIComponent(j)}},i=function(){if(g){var n=new Date();n.setDate(n.getDate()+g);return n.toUTCString()}},h=function(){c=d+"="+j;if(g){c+=";expires="+i()}if(m){c+="; path="+m}document.cookie=c};k();h()},get:function(c){var l=a,e=c+"=",k=document.cookie.split(";"),j="",g=null,f,h,d=function(i){while(i.charAt(0)===" "){i=i.substring(1,i.length)}return i};f=k.length;do{f--;if(-1===f){return}h=d(k[f]);if(h.indexOf(e)===0){j=h.substring(e.length,h.length);if(-1!==j.indexOf("{")){while("object"!==typeof j){j=JSON.parse(j)}g=l.Utils.unescapeKeysInObj(j)}else{if(j==="undefined"){g=undefined}else{g=decodeURIComponent(j)}}}}while((null===g)&&f);return g},remove:function(d){var c=a;if("string"===typeof d){c.set({name:d,expireDays:-1})}else{c.set({name:d.name,value:d.value,expireDays:-1,path:d.path})}},setCookie:function(){var c=a;c.set.apply(c,arguments)},getCookie:function(d){var c=a;return c.get(d)},getNewInstance:function(){var c=a;return Object.create(c)}};b.gazeta_pl.namespace("mobi.CookieManager");b.gazeta_pl.mobi.CookieManager=a}(window,document,undefined,jQuery));

    /* IndexDate - v0.1.4 - 2012-10-03 */
    (function(b,f,a,c){var e={init:function(h){var g=e,d=new Date(),l=h.$elements||c(".index span.when"),j=0,k="IndexDate_parsed",m=function(i){var n=/([0-9]{2}-{0,1}){3,4}.([0-9]{2}:[0-9]{2})/ig;i.text(i.text().replace(n,""))};l.filter(".time:not(."+k+")").each(function(){var s=c(this),t,q,i,r,n,o,p=function(u){var v="20";if(20>parseInt(u,10)){u=v+u}return u};t=s.text();q=t.split(/ /);if(q&&q[1]){i=q[0].split(/-/);r=q[1].split(/:/);n=new Date();o=0;n.setFullYear(p(i[2]));n.setMonth(i[1]-1,i[0]);n.setHours(r[0]);n.setMinutes(r[1]);n.setSeconds(0);o=g.dateDiff(d,n);if(o[3]>0){if(o[0]==0&&o[1]==0){if(o[2]==0){s.text("1 minuta temu")}else{s.text(o[2]+" "+e.getText("minutes",o[2])+" temu")}}else{if(o[0]==0&&o[1]>0&&o[1]<12){s.text(o[1]+" "+e.getText("hours",o[1])+" temu")}}}s.addClass(k);if(h.removeNotParsedDate){m(s)}}})},subsText:{hours:["godzina","godziny","godzin"],minutes:["minuta","minuty","minut"]},getText:function(g,h){var d=(h==1)?0:((h<10||h>20)&&h%10>1&&h%10<5)?1:2;return e.subsText[g][d]},dateDiff:function(j,i,h,g){return[g=~~(h=(j-i)/86400000),g=~~(h=(h-g)*24),g=~~(h=(h-g)*60),~~((h-g)*60)]}};b.gazeta_pl.mobi.IndexDate=e}(window,document,undefined,jQuery));

    /* AJAXAccordion v0.1.4 */
    (function (g, d, $) {
        "use strict";

        if (g.gazeta_pl.mobi.Utils.isOperaMini()) {
            return;
        }

        var AJAXAccordion = {
            init: function() {
                var
                    self = AJAXAccordion,

                    prepareTemplate = function() {
                        var 
                            id = "otherSitesTemplate",
                            type = "text/x-handlebars-template",
                            content = '<ul class="articles">{{#each this}}<li class="entry article"><div class="body">{{#if img}}<div class="imgw"><a href="{{link}}"><img src="{{img}}"></a></div>{{/if}}<h3><a href="{{link}}" title="{{title}}">{{#if spec}}<span class="spec">{{spec}}</span>{{/if}}<span class="content">{{title}}</span><span class="meta">{{#if base}}<span class="base">{{base}}</span>{{/if}}{{#if publishDate}}<span class="time">{{publishDate}}</span>{{/if}}</span></a></h3></div></li>{{/each}}</ul>';

                        $("<script />", {
                            id: id,
                            type: type,
                            html: content
                        }).appendTo(d.body);

                        self.templateHTML = $("#" + id).html();
                    },

                    buildTypePatterns = function() {
                        self.typePatterns = [];

                        self.$container.find("a[data-type]").each(function() {
                            self.typePatterns.push($(this).data("type"));
                        });
                    };
                
                self.CSSClassNames = {
                    activeLink: "active",
                    appName: "AJAXAccordion"
                };

                self.CSSSelectors = {
                    overlay: "#overlay" + self.CSSClassNames.appName
                };

                $.ajaxSetup({
                    url: "/boxes.servlet",
                    type: "GET"
                });

                self.cache();

                if (!self.dependencies()) {
                    return;
                }

                prepareTemplate();

                self.parents = {};
                self.loadedData = {};
                self.loading = {};
                self.activeTypes = {};

                buildTypePatterns();

                self.bindEvents();

                self.dataFromCookie = {};
                self.cookieName = "HPConfig";
                self.dataObjectName = "BoxesConfig";
                self.CookieManager.init();
            },

            cache: function() {
                var self = AJAXAccordion;

                self.$container = $("#otherSites");

                if (self.dependencies()) {
                    self.draw.overlay();
                    self.$overlay = $(self.CSSSelectors.overlay);

                    self.CookieManager = gazeta_pl.mobi.CookieManager.getNewInstance();
                    self.Utils = gazeta_pl.mobi.Utils;
                    self.IndexDate = gazeta_pl.mobi.IndexDate;
                }
            },

            bindEvents: function() {
                var
                    self = AJAXAccordion,
                    $self = $(self),
                    $clicked = null,
                    url = null,

                    showArticles = function() {
                        self.parent
                            .children("ul").slideDown()
                            .end().addClass(self.CSSClassNames.activeLink);                        
                    },

                    hideArticles = function() {
                        self.parent
                            .children("ul").slideUp()
                            .end().removeClass(self.CSSClassNames.activeLink);
                    };

                self.$container.on("click", "a", function(e) {
                    e.preventDefault();

                    $clicked = $(this);
                    url = $clicked.attr("href");
                    

                    if (self.Utils.isGrandsonOfContainer($clicked, self.$container)) {
                        self.parent = $clicked.parent();
                        self.type = $clicked.data("type");

                        self.parents[self.type] = self.parent;

                        self.onContainerClick();
                    } else {
                        location.href = url;                        
                    }
                });

                $(g).on("load", function() {
                    var addAppName = function() {
                        $(document.body).addClass(self.CSSClassNames.appName);
                    };

                    addAppName();

                    self.dataFromCookie = self.CookieManager.get(self.cookieName) || self.dataFromCookie;
                    self.loadedData = self.dataFromCookie[self.dataObjectName] || self.loadedData;
                });

                $self.on("show/articles", showArticles);
                $self.on("hide/articles", hideArticles);
                $self.on("data/loaded", self.renderResults);

                $self.on("template/parsed", function() {
                    self.IndexDate.init({
                        $elements: $(".articles .article .time"),
                        removeNotParsedDate: true
                    });
                });
            },

            onContainerClick: function() {
                var
                    self = AJAXAccordion,
                    $self = $(self),
                    $clicked = this.parent,

                    isLoaded = function() {
                        return !!self.$container.find("a[data-type='" + self.type + "'] ~ ul.articles").length;
                    },

                    isActive = function() {
                        return self.activeTypes[self.type] === self.type;
                    },

                    loadData = function(callback) {
                        var
                            self = AJAXAccordion,
                            attr = "t",
                            config = null,
                            subContainer = self.$container.find("[data-type='" + self.type + "']"),

                            isLoading = function() {
                                self.loadingDataInProgress($clicked);

                                return true === self.loading[self.type];
                            },

                            addArticlesIdsToExclude = function() {
                                var
                                    articlesIds = null,

                                    getAlreadyLoadedArticlesIds = function() {
                                        var
                                            $articles = $(".mt .body, .index .article"),
                                            articlesIds = [],
                                            separator = ", ",
                                            xx = null;

                                        $articles.each(function() {
                                            xx = $(this).data("xx");

                                            if ("number" === typeof xx) {
                                                articlesIds.push(xx);
                                            }
                                        });

                                        return articlesIds.join(separator);
                                    },

                                    areArticlesToExcludeLoaded = function() {
                                        return !!articlesIds.length;
                                    };

                                articlesIds = getAlreadyLoadedArticlesIds();

                                if (areArticlesToExcludeLoaded()) {
                                    config.data.exclude = articlesIds;
                                }
                            },

                            addImagesNumber = function() {
                                var imagesNumber = subContainer.data("img-no");

                                if ($.isNumeric(imagesNumber)) {
                                    config.data.imgNo = imagesNumber;
                                }
                            },

                            addNewsNumber = function() {
                                var newsNumber = subContainer.data("max-news-no");

                                if ($.isNumeric(newsNumber)) {
                                    config.data.maxNewsNo = newsNumber;
                                }
                            };


                        if (!isLoading()) {
                            self.loading[self.type] = true;

                            config = {
                                dataType: "json",
                                data: {}
                            };

                            config.data[attr] = self.type;
                            addArticlesIdsToExclude();
                            addImagesNumber();
                            addNewsNumber();

                            $.ajax(config).promise().then(
                                function(results) {
                                    delete self.loading[self.type];

                                    self.loadingDatafinished($clicked);

                                    $self.trigger("data/loaded", results);
                                    $(g).trigger("AJAXAccordion/data/load");
                                    if (typeof(callback) == 'function') callback();
                                },
                                function() {
                                    self.onLoadDataFail($clicked);
                                }
                            );
                        }
                    };

                self.updateActiveTypes();

                if (isActive()) {
                    self.loadedData[self.type] = false;
                    self.saveCookie();

                    $self.trigger("hide/articles");
                } else {
                    self.loadedData[self.type] = true;
                    self.saveCookie();

                    if (isLoaded()) {
                        $self.trigger("show/articles");

                    } else {
                        loadData($clicked.hasClass('pierwszeroot') ? function() {g.gazeta_pl.mobi.PhotoFormat.changeImageFormat($clicked)} : null);
                        
                        
                        
                    }
                }
            },

            onLoadDataFail: function($element) {
                var
                    self = AJAXAccordion;

                self.loadingDatafinished($element);

                self.draw.loadDataFailMessage();

                $.blockUI.defaults.css = {};
                $.blockUI({
                    message: self.$overlay
                });

                delete self.loading[self.type];
            },

            renderResults: function(e, results) {
                var
                    self = AJAXAccordion,
                    $self = $(self),
                    template = Handlebars.compile( self.templateHTML ),
                    html = null,

                    parseData = function(o) {
                        var
                            data = {},
                            
                            getType = function(data) {
                                var
                                    type = null,

                                    isValid = function() {
                                        var
                                            i = null,
                                            length = self.typePatterns.length;

                                        for (i = 0; i < length; i += 1) {
                                            if (self.typePatterns[i] === type) {
                                                return true;
                                            }
                                        }

                                        return false;
                                    };

                                for (type in data){
                                    if (isValid()) {
                                        return type;
                                    }
                                }
                            },

                            getContent = function(o, type) {
                                var
                                    parseRows = function(rows) {
                                        var
                                            i = null,
                                            row = null,
                                            ret = [];

                                        for (i = 0; i < rows.length; i += 1) {
                                            row = rows[i];
                                            row = parseRow(row);

                                            ret.push(row);
                                        }

                                        return ret;
                                    },

                                    parseRow = function(row) {
                                        return {
                                            title: row.title,
                                            img: row.photoHref,
                                            link: row.href,
                                            spec: row.spec,
                                            // TODO: Na chwile obenca (jest 20 wrzesnia 2012, 10:28) etykiety/base maja
                                            // sie nie pojawiac; ponoc prace nad uporzadkowaniem tego sa robione;
                                            // nie mam pojecia na jak dlugo... To pisal PS ;-)
                                            // base: row.baseDivisionName,
                                            publishDate: row.dateFrom
                                        };
                                    };

                                return parseRows(o[type].articlesList);
                            };

                        data.type = getType(o);
                        data.content = getContent(o, data.type);

                        return data;
                    };

                if (self.Utils.isJSON(results) && ("string" === typeof results)) {
                    results = JSON.parse(results);
                }

                results = parseData(results);
                self.type = results.type;
                html = template(results.content);
                self.parents[results.type].append(html);

                $self.trigger("template/parsed");
                $self.trigger("show/articles");
            },

            saveCookie: function() {
                var self = AJAXAccordion;

                self.dataFromCookie[self.dataObjectName] = self.loadedData;

                self.CookieManager.set({
                    name: self.cookieName,
                    value: self.dataFromCookie,
                    expireDays: 30,
                    path: "/"
                });
            },

            deleteCookie: function() {
                var self = AJAXAccordion;

                self.CookieManager.remove({
                    name: self.cookieName,
                    path: "/"
                });
            },

            dependencies: function() {
                var
                    self = AJAXAccordion,
                    c = !!self.$container.length;

                return c;
            },

            updateActiveTypes: function() {
                var
                    self = AJAXAccordion,
                    $activeLinks = self.$container.children("." + self.CSSClassNames.activeLink).children("a"),
                    $this = null,
                    href = null,
                    type = null;

                self.activeTypes = {};

                $activeLinks.each(function() {
                    $this = $(this);
                    href = $this.attr("href");
                    type = $this.data("type");

                    self.activeTypes[type] = type;
                });
            },

            loadingDataInProgress: function($element){
                d.body.classList.add("AJAXAccoridion_inProgress");
                this.blockElement($element);
            },

            loadingDatafinished: function($element){
                d.body.classList.remove("AJAXAccoridion_inProgress");
                this.unblockElement($element);
            },

            blockElement: function($element){
                $element.block({ 
                    message: null
                });
            },

            unblockElement: function($element){
                $element.unblock(); 
            },

            draw: {
                overlay: function() {
                    var
                        self = AJAXAccordion,
                        strOverlay = self.CSSSelectors.overlay.replace("#", "");

                    if (!$(self.CSSSelectors.overlay).length) {
                        $("<div />", {
                            id: strOverlay,
                            "class": strOverlay + " overlay"
                        }).appendTo($("body"));
                    }
                },

                loadDataFailMessage: function() {
                   var
                       self = AJAXAccordion,
                       strOnLoadDataFailMessage = "onLoadDataFailMessage",
                       strLoadDataFailButton = "onLoadDataFailButton",
                       CSSIdOnLoadDataFailMessage = "#" + strOnLoadDataFailMessage;

                    if (!$(CSSIdOnLoadDataFailMessage).length) {
                       $("<div />", {
                           id: strOnLoadDataFailMessage,
                           "class": strOnLoadDataFailMessage
                       }).appendTo(self.$overlay);

                       $("<p />", {
                           text: "Brak po\u0142\u0105czenia z baz\u0105. Spr\u00F3buj ponownie."
                       }).appendTo(self.$overlay.find(CSSIdOnLoadDataFailMessage));

                       $("<button />", {
                           id: strLoadDataFailButton,
                           "class": strLoadDataFailButton + " button",
                           text: "OK"
                       }).appendTo(self.$overlay.find(CSSIdOnLoadDataFailMessage)).on("click", $.unblockUI);
                   }
                }
            }
        };

        g.gazeta_pl.namespace("mobi.AJAXAccordion");
        g.gazeta_pl.mobi.AJAXAccordion = AJAXAccordion;
    }(g, d, jQuery));
    
    /* localManager v0.1.0 */
    (function (g, d, $, u){
        "use strict";
        
        var localManager = {
            config: {            
                ids: {
                    label: 'autoGeolocationLabel',
                    checkbox: 'autoGeolocationCheckbox',
                    info: 'autoGeolocationInfo'
                },
                
                cookies: {
                    location: 'geoL',
                    weather: 'geoW',
                    movie: 'geoM',
                    auto: 'geoAuto',
                    anchor: "geoKotwica"
                }
            },
            
            elements: {
                $main: $("#geo"),
                $select: $("#geo select[name='miasto']"),
                $weather: $("#geo span.weather"),
                $movies: $(".mod_movies")
            },
            
            CookieManager: g.gazeta_pl.mobi.CookieManager,

            init: function() {
                var
                    self = localManager,
                    cookies = self.config.cookies,                
                    elms = self.elements,
                    ids = self.config.ids,
                    main = "#geo",

                    scrollTo = function() {
                        var isAnchor = self.CookieManager.get(cookies.anchor);

                        if (("true" === isAnchor) && (-1 === g.location.href.indexOf(main))) {
                            g.location.href = g.location.href + main;
                            self.CookieManager.set(cookies.anchor, "false");
                        }
                    },
                    
                    drawGeoElements = function () {
                        var
                            $where = null,
                            checked = ('true' === self.CookieManager.get(cookies.auto));
                        
                        if (self.hasGeolocationAPI()) {
                            elms.$main = $(main);
                            $where = elms.$main.find("form");

                            $("<span />", {
                                id: ids.info,
                                css: {display: 'none'}
                            }).appendTo($where);
                            
                            $("<input>", {
                                type: "checkbox",
                                id: ids.checkbox,
                                checked: checked
                            }).appendTo($where);

                            $("<label />", {
                                "for": ids.checkbox,
                                text: 'A',
                                id: ids.label,
                                title: 'Wykryj automatycznie'
                            }).appendTo($where);

                            elms.$label = $('#' + ids.label);
                            elms.$checkbox = $('#' + ids.checkbox);
                            
                            if (checked) {
                                self.getLocation();
                            }
                        }
                    },
                    
                    bindEvents = function() {
                        elms.$select.on("change", self.onSelectChangeHandler);

                        if (self.hasGeolocationAPI() && self.isGeoElementsAvaible()) {
                            elms.$label.on("click", self.onCheckboxChangeHandler);
                        }
                    },

                    isMainAvailable = function() {
                        return 0 !== $(main).length;
                    };

                self.CookieManager.init();

                if (isMainAvailable()) {
                    // TODO: drawGeoElements() do wdrozenia w bliskiej przyszlosci 
                    // drawGeoElements();
                    self.setSelectedCity(self.CookieManager.get(self.config.cookies.location));
                    bindEvents();
                    scrollTo();
                }
            },
            
            hasGeolocationAPI: function () {
                return ((navigator.geolocation !== null) && (navigator.geolocation !== undefined));
            },

            onSelectChangeHandler: function() {
                var self = localManager;
                
                self.writeCookies(this);
                g.location.reload(true);
            },
            
            onCheckboxChangeHandler: function() {
                var
                    self = localManager,
                    city = self.elements.$select.val(),
                    checked = self.getCheckboxState(this);
                
                self.writeCookies(this);
                
                if (checked) {
                    self.getLocation();
                } else {
                    self.toggleInfo('', false);
                }
            },
            
            writeCookies: function(caller) {
                var 
                    self = localManager,
                    elms = self.elements,
                    cookies = self.config.cookies,
                    city = elms.$select.val(),
                    checked = null;
                                    
                self.CookieManager.set(cookies.location, city);
                self.CookieManager.set(cookies.weather, city);
                self.CookieManager.set(cookies.movie, city);
                self.CookieManager.set(cookies.anchor, 'true');

                if (self.isGeoElementsAvaible()) {
                    checked = self.getCheckboxState(caller) ? 'true' : 'false';
                    self.CookieManager.set(cookies.auto, checked);
                }
            },
            
            getCheckboxState: function(caller) {
                var
                    self = localManager,
                    checked = self.elements.$checkbox.is(":checked");

                if (caller.id === self.config.ids.label) {
                    checked = !checked;
                }

                return checked;
            },
            
            getLocation: function() {
                var
                    self = localManager,
                    
                    options = {
                        enableHighAccuracy: true,
                        timeout: 30000,
                        maximumAge: 70000
                    },
                    
                    onGeolocationSuccess = function(position) {
                        var
                            lat = position.coords.latitude,
                            lon = position.coords.longitude,
                            geoServletURL = '/geo.servlet?x=' + lat + '&y=' + lon;
                        
                        self.toggleInfo('Pobieranie danych...', true);
                        getData(geoServletURL);
                    },
                    
                    onGeolocationError = function() {
                        self.toggleInfo('B\u0142\u0105d lokalizacji (<a href="#geo" onclick="javascript:gazeta_pl.mobi.localManager.getLocation(); return false;">pon\u00f3w</a>)!', true);
                    },
                    
                    onAJAXSuccess = function(result) {
                        var city = result.geo.locale.cityName || 'brak danych';

                        self.toggleInfo('Lokalizacja: <strong>' + city + '</strong>', true);
                        self.parseData(result);
                    },
                    
                    onAJAXError = function() {
                        self.toggleInfo('B\u0142\u0105d pobierania danych (<a href="#geo" onclick="javascript:gazeta_pl.mobi.localManager.getLocation(); return false;">pon\u00f3w</a>)!', true);
                    },
                    
                    getData = function(url) {
                        $.ajax({
                            url: url,
                            dataType: "json"
                        }).promise().then(onAJAXSuccess, onAJAXError);
                    };
                    
                self.toggleInfo('Wykrywanie lokalizacji...', true);
                
                navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError, options);
            },
            
            parseData: function(data) {
                var
                    self = localManager,
                    $main = self.elements.$main,
                    weather = data.geo.weather || false,
                    movies = data.geo.movies || false,
                    locale = data.geo.locale || false,
                    
                    parseArticles = function(data) {
                        var
                            articles = data.articlesList,

                            prepareTemplate = function() {
                                var 
                                    id = "localManager_artilces",
                                    type = "text/x-handlebars-template",
                                    content = '<ul>{{#each this}}<li class="entry article">{{#if img}}<div class="imgw"><ul><a href="{{href}}"><img src="{{img}}"></a></ul></div>{{/if}}<h3><a href="{{href}}"><span class="content">{{title}}</span><span class="meta">{{#if dateFrom}}<span class="time">{{dateFrom}}</span>{{/if}}</span></a></h3></li>{{/each}}</ul>',

                                    isTemplateExists = function() {
                                        return !$("#" + id).length;
                                    };

                                if (isTemplateExists()) {
                                    $("<script />", {
                                        id: id,
                                        type: type,
                                        html: content
                                    }).appendTo(d.body);

                                    self.templateHTML = $("#" + id).html();
                                }
                            },

                            buildImagesSource = function() {
                                var
                                    STONE_XX = 11833973,
                                    xx = null,
                                    src = null,
                                    length = articles.length,
                                    i = 0,
                                    format = "F";

                                for (; i < length; i += 1) {
                                    xx = parseInt(articles[i].photoXx, 10);

                                    if (xx && (xx !== STONE_XX)) {
                                        src = (function() {
                                            var tmp = xx.toString(16);

                                            if (xx > STONE_XX) {
                                                return "http://bi.gazeta.pl/im/" + tmp.substr(4, 2) + "/" + tmp.substr(2, 2) + "/" + tmp.substr(0, 2) + "/z" + xx + format + ".jpg";
                                                
                                            } else {
                                                return "http://bi.gazeta.pl/im/" + (xx % 10) + "/" + Math.floor(xx/1000) + "/z" + xx + format + ".jpg";
                                            }

                                        }());
                                        articles[i].img = src;
                                    }
                                }
                            },

                            renderResults = function() {
                                var
                                    template = Handlebars.compile(self.templateHTML),
                                    html = template(articles),
                                    $articles = $("div.mod_local > div.body > ul");

                                $articles.slideUp(function() {
                                    $articles.html(html);
                                    g.gazeta_pl.mobi.IndexDate.init({
                                        $elements: $articles.find(".time")
                                    });
                                    $articles.slideDown();
                                });
                            };

                        prepareTemplate();
                        buildImagesSource();
                        renderResults();
                    },
                    
                    parseMovies = function(data) {
                        var
                            self = localManager,
                            $elem = self.elements.$movies,
                            $ul = $elem.find('.repertuar'),
                            i = 0,
                            html = '',
                            mvs = data.moviesList,
                            length = mvs.length,
                            href = "http://m.gazeta.pl/kino/repertuar,filmy," + locale.cityNameDomain + ".html",
                            url = null,
                            title = null,
                            movie = null;
                            
                        if ($elem && length > 0) {
                            $elem
                                .find('.miasto').html(data.cityName)
                                .prev("a").attr("href", href);
                            
                            url = 'http://m.gazeta.pl/kino/repertuar,zfilmem,';

                            for (i = 0; i < length; i += 1) {
                                movie = mvs[i];
                                title = movie.title;
                                url = url + data.cityName + ',,,' + movie.id + ',' + title.replace(/b/ig,"") + '.html';
                                html += '<li><a href="' + url + '">' + title + '</a></li>';
                            }
                            
                            $ul.html(html);
                        }
                    },
                    
                    parseWeather = function(data) {
                        var
                            $elem = self.elements.$weather,

                            url = (function() {
                                if (data.cityName && data.locId) {
                                    return "http://pogoda.gazeta.pl/Pogoda/Polska/" + data.cityName + "/dzisiaj/" + data.locId;
                                }
                            }()),

                            temperature = (function() {
                                if (data.temperature) {
                                    return data.temperature + '&#186;C';
                                }
                            }()),

                            changeClass = function() {
                                if (data.img) {
                                    $elem
                                        .removeClass()
                                        .addClass('weather ' + data.img);
                                }
                            };

                        changeClass();
                        $elem.find(":nth-child(1)").html(temperature).attr('href', url);
                        $main.find('.city').html(data.cityName);
                    },

                    updateUrl = function(data) {
                        var
                            href = "http://m." + data.cityNameDomain + ".gazeta.pl/" + data.cityNameDomain + "/0,0.html",
                            text = data.cityName.toLowerCase() + ".gazeta.pl";

                        $main.find("h2 > a").attr("href", href).text(text);
                    };
                    
                parseArticles(locale);
                parseWeather(weather);
                parseMovies(movies);
                self.setSelectedCity(locale.cityName);
                updateUrl(locale);
            },
            
            toggleInfo: function(t, s) {
                var
                    text = t || '',
                    show = s || false,
                    self = localManager,
                    $select = self.elements.$select,
                    $info = $('#' + self.config.ids.info);
                
                $info.html(text);
                $info.css('display', ((show) ? 'inline-block' : 'none'));
                $select.css('display', ((show) ? 'none' : 'inline-block'));
            },
                    
            setSelectedCity: function(city) {
                var
                    self = localManager,
                    sel = self.elements.$select;

                if (city) {
                    city = city.replace('+', ' ');

                    sel.children().each(function(index) {
                        if ($(this).text() === city) {
                            sel.get(0).selectedIndex = index;
                        }
                    });
                }
            },

            isGeoElementsAvaible: function() {
                var
                    self = localManager,
                    ids = self.config.ids,
                    $info = $("#" + ids.info).length,
                    $checkbox = $("#" + ids.checkbox).length,
                    $label = $("#" + ids.label).length;

                return $info && $checkbox && $label;
            }
        };

        g.gazeta_pl.namespace("mobi.localManager");
        g.gazeta_pl.mobi.localManager = localManager;
    }(window, d, jQuery));

    /* movieManager v0.1.0 */
    (function (g, d, $, u){
        "use strict";
        
        var movieManager = {
            movieCookie: "geoM",
            cityCookie: "kinoMiasto",
            
            CookieManager: g.gazeta_pl.mobi.CookieManager,

            init: function() {
                var
                    self = movieManager,
                    $container = $("div.mod_movies div.head"),

                    buildSelect = function() {
                        $("<form />", {
                            html: $("<select />", {
                                html: $("#geo div.head select").html()
                            })
                        }).appendTo($container);
                        
                        self.$select = $container
                            .find("select");
                    },

                    bindEvents = function() {
                        self.$select.on("change", self.onSelectChangeHandler);
                    },
                    
                    setSelectedCity = function() {
                        var
                            city = self.CookieManager.get(self.movieCookie),
                            sel = self.$select;

                        if (city) {
                            city = city.replace("+", " ");

                            sel.children().each(function(index) {
                                if($(this).text() === city) {
                                    sel.get(0).selectedIndex = index;
                                }
                            });
                        }
                    },

                    changeHTML = function() {
                        $container
                            .children("a").hide().end()
                            .children("h2").text("Repertuar kin");
                    };

                self.CookieManager.init();
                buildSelect();
                changeHTML();
                setSelectedCity();
                bindEvents();
            },
            
            onSelectChangeHandler: function() {
                var
                    self = movieManager,

                    reload = function() {
                        var location = g.location;
                        if (location.hash) {
                            g.location = location.protocol + "//" + location.host + location.pathname;
                        } else {
                            location.reload(true);
                        }
                    };
                
                self.writeCookies();

                reload();
            },
            
            writeCookies: function() {
                var 
                    self = movieManager,
                    cookie = self.movieCookie,
                    HPConfigCookie = "HPConfig",
                    city = self.$select.val(),
                    config = self.CookieManager.get(HPConfigCookie) || {};

                self.CookieManager.set(cookie, city);
                self.CookieManager.set(self.cityCookie, city);
                self.CookieManager.set(HPConfigCookie, config);
            }
        };

        g.gazeta_pl.namespace("mobi.movieManager");
        g.gazeta_pl.mobi.movieManager = movieManager;
    }(g, d, jQuery));

    // GA config 
    (function (g, d, $, u){
        var
            strTrackEvent = "_trackEvent",

            relatedArticlesSwipe = {
                init: function(){
                    this.trackEvents();
                },

                trackEvents: function(){
                    var
                        $relatedArticles = $(".mod_zi_related"),
                        strNajpopularniejsze = "Najpopularniejsze";

                    $relatedArticles.on("swipeleft", function() {
                        g._gaq.push([strTrackEvent, strNajpopularniejsze, g.gazeta_pl.mobi.ga.domain, "swipe lewo", u, true]);
                    });

                    $relatedArticles.on("swiperight", function() {
                        g._gaq.push([strTrackEvent, strNajpopularniejsze, g.gazeta_pl.mobi.ga.domain, "swipe prawo", u, true]);
                    });
                }
            },

            articlesPhotosSwipe = {
                init: function(){
                    this.trackEvents();
                },

                trackEvents: function(){
                    var
                        $articlesHeader = $("#article_header"),
                        strZdjecia = "Zdjecia";

                    $articlesHeader.on("swipeleft", function() {
                        g._gaq.push([strTrackEvent, strZdjecia, g.gazeta_pl.mobi.ga.domain, "swipe lewo", u, true]);
                    });

                    $articlesHeader.on("swiperight", function() {
                        g._gaq.push([strTrackEvent, strZdjecia, g.gazeta_pl.mobi.ga.domain, "swipe prawo", u, true]);
                    });
                }
            },

            menu = {
                init: function(){
                    this.trackEvents();
                },

                trackEvents: function(){
                    var
                        $menu = $("#winieta, #header .winieta.navigation"),
                        strRozwijane = "Rozwijane",
                        strRozwiniecie = "rozwiniecie",
                        strZwiniecie = "zwiniecie";

                    $menu
                        .on("click", "#show_menu", function() {
                            var strState = $(this).hasClass("inactive") ? strZwiniecie : strRozwiniecie;

                            g._gaq.push([strTrackEvent, strRozwijane + "-menu", strState, g.gazeta_pl.mobi.ga.domain, u, true]);
                        })

                        .on("click", ".drop_down a:first-child", function() {
                            var
                                strSerwis = $(this).text().toLowerCase().replace(/\u0119/ig, "e").replace(/\u00F3/ig, "o").replace(/\u0142/ig, "l"),
                                strState = $(this).hasClass("inactive") ? strZwiniecie : strRozwiniecie;

                            g._gaq.push([strTrackEvent, strRozwijane + "-submenu", "sub-" + strState, strSerwis, u, true]);
                        });

                    $menu.find("li").not(".wrapper_menu").on("click", "a", function(e) {
                        g._gaq.push([strTrackEvent, strRozwijane + "-menu linki", g.gazeta_pl.mobi.ga.domain, $(this).attr("href"), u, true]);
                    });
                }
            },

            zdrowieMTSwipe = {
                init: function(){
                    this.trackEvents();
                },

                trackEvents: function(){
                    $("#cont")
                        .on("swipeleft", "#video_swipe", function() {
                            g._gaq.push([strTrackEvent, "MT", g.gazeta_pl.mobi.ga.domain, "swipe lewo", u, true]);
                        })
                        .on("swiperight", "#video_swipe", function() {
                            g._gaq.push([strTrackEvent, "MT", g.gazeta_pl.mobi.ga.domain, "swipe prawo", u, true]);
                        });
                }
            };

        g.gazeta_pl.namespace("mobi.ga.config.relatedArticles.swipe", relatedArticlesSwipe);
        g.gazeta_pl.namespace("mobi.ga.config.articlesPhotos.swipe", articlesPhotosSwipe);
        g.gazeta_pl.namespace("mobi.ga.config.menu", menu);
        g.gazeta_pl.namespace("mobi.ga.config.zdrowie.swipe", zdrowieMTSwipe);     

    }(window, document, jQuery));
    
    /* fileReaderContest v0.1.0 */
    (function(g, d, $){
        "use strict";
        
        var ImageUpload = {

            init: function() {
                var 
                    fileinput,
                    me = this,
                    $contest = $('.mod_uzr_contest_upload.cvideo');
          
                me.fileinput = d.getElementById('contestfile');
                
                $contest.find('button.btn').click(function(e){
                    if($contest.find('#contestfile').val() == '' || $contest.find('#contestinput').val() == '' || $contest.find('#contesttexta').val() == '' ) {
                        e.preventDefault(); 
                        alert('Uzupe\u0142nij swoje zg\u0142oszenie');
                    }
                }); 
                
                if (typeof window.FileReader === 'undefined') {
                
                    var 
                        $btn = $contest.find('label.btn'),
                        $contestfile = $contest.find('#contestfile'); 
                        $btn.hide();
                        $contestfile.css({
                        
                            'display': 'block',
                            'opacity': '1',
                            'position': 'static'
                        
                        });
                        
                    return;
                } 

                $contest.addClass('cnew cdisable').find('input[type="text"], textarea').attr('disabled', 'true');
                $(me.fileinput).bind('change', $.proxy(me.inputChangeHandler, me));
                
                if(!$.browser.msie) {
                    $contest.find('button.btn').attr('disabled', 'true');
                }
                
                $('.mod_uzr_contest_upload.cvideo .contest_file_remove').click(function() {
                    $contest.addClass('cdisable')
                            .find('#contestfile, .contest_file_name').val('').end()
                            .find('img').attr('src', '').end()
                            .find('input[type="text"], textarea').attr('disabled', 'true').end()
                            .find('#contestfile').show();
                });
                
                me.filesProcessor = new me.FilesProcessor();
            },
            
            FilesProcessor: function() {
                var that = this;

                this.fileTypesFilter = /^(?:image\/jpeg|image\/jpg|image\/png|image\/gif)$/i;
                
                this.process = function(fileList) {
                    if (fileList.length < 1) {
                        return;
                    }
                    Array.prototype.forEach.call(fileList, that.readFile);
                };
            
                this.readFile = function(file) {

                    var 
                        fileReader, 
                        image,
                        $contest = $('.mod_uzr_contest_upload.cvideo'),
                        $inputs = $contest.find('label.btn, input[type="file"]'),
                        $filename = $contest.find('.contest_file_name'),
                        $result = $contest.find('img, .contest_more');

                    if (!that.fileTypesFilter.test(file.type)) {
                        alert('Plik \'' + file.name + '\' posiada niepoprawny format.');
                        return;
                    }
                    
                    if (document.getElementById('contestfile').files[0].size > 3145728) {
                        alert('Zdjęcie musi mieć wielkość do 3 MB.');
                        return;
                    }
                      
                    fileReader = new FileReader();

                    fileReader.onload = function(ev) {

                        $inputs.hide();
                        $filename.text(file.name);
                        $result.css('display','inline-block');
                        $contest.removeClass('cdisable');
                        if(!$.browser.msie) {
                            $contest.find('button.btn').removeAttr('disabled');
                        }
                        $contest.find('input[type="text"], textarea').removeAttr('disabled');
                        that.fileLoadedHandler.call(that, ev);
                        
                    };
                      
                    fileReader.readAsDataURL(file);
                };
                
                this.fileLoadedHandler = function(ev) {
                    $('.mod_uzr_contest_upload.cvideo .contest_img').attr('src', ev.target.result);
                };
            
            },
            
            inputChangeHandler: function(ev) {
                var fileList;
                fileList = ev.target.files;
                this.filesProcessor.process.call(this.filesProcessor, fileList);
                
            }

        };
        
        g.gazeta_pl.namespace("mobi.ImageUpload");
        g.gazeta_pl.mobi.ImageUpload = ImageUpload;
    }(window, document, jQuery));
    

    /* ctnlValidator v0.1.0 */
    (function(g, d, $){
        "use strict";
        
        var NltTargeted = {
            
            init: function() {
                
                var $contestContent = $('.mod_uzr_contest, .mod_uzr_contest_upload, .contest_form');
                
                if ($contestContent) {
                    
                    var sessionKey = gazeta_pl.parseURI().sessionKey;
                    
                    if (sessionKey) {
                        $('input[name=sessionKey]').attr('value', sessionKey);
                    } else {
                        var timeStampSessionKey = Math.round((new Date()).getTime() / 1000);
                        $('input[name=sessionKey]').attr('value', timeStampSessionKey);
                    }
                }
                
                if ($('#cont .mod_uzr_nlt form').length === 0) return false;
            
                var me = NltTargeted;
                var form = $('#cont .mod_uzr_nlt form');    
                form.on( 'submit', me.checkForm );
                
                if ($('#birthYear').length > 0) me.birthYearList.init();

                $.fn.readForm = function() {

                    var res = {};
                    var tempData = [];


                    $(this).find('select,input,textarea').each(function() {

                        var name = $(this).attr('name');
                        if (!name) return;

                        if ($(this).attr('type') === 'radio' || $(this).attr('type') === 'checkbox') {

                            if ($(this).attr('checked')) {
                                if(name in tempData) {
                                    tempData[name].push($(this).val());
                                    res[name] = tempData[name];
                                } else {
                                    tempData[name] = [];
                                    tempData[name].push($(this).val());
                                    res[name] = $(this).val();
                                }
                            }
                        } else {
                                if(name in tempData) {
                                    tempData[name].push($(this).val());
                                    res[name] = tempData[name];
                                } else {
                                    tempData[name] = [];
                                    tempData[name].push($(this).val());
                                    res[name] = $(this).val();
                                }
                        }

                    });
                    return res;
                };

            },
            birthYearList: {
                init: function() {
                    var currentTime = new Date(),
                    form = $('.mod_uzr_nlt'),
                    year = currentTime.getFullYear();

                    for(var x=0; x<=100; x++){
                        form.find('#birthYear').append($("<option></option>").attr("value",year).text(year));
                        year--;
                    }
                }
            },
            checkForm: function() {
            
                var me = NltTargeted,
                    form = $('#cont .mod_uzr_nlt form'),
                    error = false;

                $(this).find('.error').hide();
                $(this).find('input[type=text], select').css({
                    borderColor: '#B3B3B3'
                });

                $(this).find('input[type=text]').each(function() {

                if($(this).parent().siblings('label').hasClass('req')) {
                
                    if( !$.trim($(this).val()).length ) {
                    
                        $(this).parent().find('.error').show();
                        $(this).css({borderColor: '#e51d1f'});
                        error = true;    
                    }
                    
                    //validate postalCode
                    if($(this).is('#postalCode')){
                        if(!$(this).val().match(/^[0-9]{2}-?[0-9]{3}$/)){
                            error = true;
                            $(this).css({borderColor: '#e51d1f'});
                            $(this).parent().find('.error').show();
                        }
                    }
                    
                    //validate phone
                    if($(this).is('#phone')){
                        if($(this).val().length > 0) {
                            if(!$(this).val().match(/^[0-9]{7,9}$/)){
                                error = true;
                                $(this).css({borderColor: '#e51d1f'});
                                $(this).parent().find('.error').html('Nieprawid\u0142owy numer telefonu').show();
                            }
                        } else {
                            $(this).parent().find('.error').show();
                        }
                    }
                }
            
            //validate email
            if($(this).is('#email')){
                if(!$(this).val().match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
                    error = true;
                    $(this).css({borderColor: '#e51d1f'});
                    $(this).parent().find('.error').show();
                }
            }
            
            });

                $(this).find('select:not(.novalid)').each(function() {
                    if($(this).val()==''){
                        error = true;
                        $(this).css({borderColor: '#e51d1f'});
                        $(this).parent().find('.error').show();
                    }
                });
                
                if ($('input[name="gender"]:not(.novalid)').length > 0) {
                    if( !$(this).find('input[name="gender"]').is(':checked') ) {
                        error = true;
                        $(this).parent().find('.error.currentGender').show();
                    }
                }
                if ($('input[name="children"]:not(.novalid)').length > 0) {
                    if( !$(this).find('input[name="children"]').is(':checked') ) {
                        error = true;
                        $(this).parent().find('.error.currentChildren').show();
                    }
                }
                if ($('input[name="interests"]:not(.novalid)').length > 0) {
                    if( !$(this).find('input[name="interests"]').is(':checked') ) {
                        error = true;
                        $(this).parent().find('.error.currentInterest').show();
                    }
                }
                $(this).find('.rules input:checkbox').css("outline" ,"none")
                if ($('input[name="consentCommercial"]').length > 0 || $('input[name="consentProcessing"]').length > 0 || $('input[name="consentRegulations"]').length > 0) {
                    if( !$(this).find('input[name="consentRegulations"]').is(':checked')) {
                        error = true;
                        $(this).parent().parent().find('.infoRules').css({color: '#e51d1f'});
                        
                        if(!$(this).find('input[name="consentRegulations"]').is(':checked')) {
                            $(this).find('.rules .error.term').show();
                        }

                    } else {
                        $(this).parent().parent().find('.infoRules').css({color: '#333'});
                    }
                }

                if( error ) {
                    form.find('.error:visible').eq(0).parent('.c').find('input:eq(0)').focus();
                    return false;
                } else {

                    if($(this).parent().hasClass('contest_form')) {
                        var url = "http://universalcontest.gazeta.pl/universal-contest-frontend-war/step3?",
                            dataForm = form.serialize(),
                            titleStepThree = $('.contest_form h3').text();

                            window.onDataStep = gazeta_pl.mobi.NltTargeted.onData
                            
                        $.getScript(
                           url + dataForm + "&callback=onDataStep"
                        );
                        
                    } else {
                        var url = "http://newslettery.gazeta.pl/piidb/nlt/subscribe",
                            dataForm = form.readForm();
    
                        gazeta_pl.jsonp(
                            url,
                            dataForm,
                            function onData(data) {
                                var status = null;
                                status = data.status;

                                if( status=="OK" ) {
                                    form.parent().html('<header><h3>Dzi\u0119kujemy</h3></header><p class="lead">Wys\u0142ali\u015Bmy do Ciebie mail z linkiem, w kt\u00F3ry nale\u017Cy klikn\u0105\u0107, aby potwierdzi\u0107 zapis. Sprawd\u017A teraz swoj\u0105 skrzynk\u0119 mailow\u0105.</p>');
                                    me.onSuccessSend();
                                }
                            }
                        );
                    }
                    return false;
                }
            },
            
            onData : function(data) {
            
                var status = null,
                    form = $('#cont .mod_uzr_nlt form'),
                    titleStepThree = $('.contest_form h3').text();
                    status = data.status;
                
                if( status=="OK" ) {
                        form.parent().html('<header><h3>' + titleStepThree +'</h3></header><p class="plead">Teraz potwierd\u017a sw\u00f3j udzia\u0142 w konkursie.<br />Kliknij w link wys\u0142any na Tw\u00f3j adres e-mail. </p>');
                        gazeta_pl.mobi.NltTargeted.onContestSuccessSend();
                } else {
                
                    window.location.href = "http://www.gazeta.pl/aliasy/blad.htm";
                }
            },
            
            onSuccessSend: function() {
                    var 
                        xxn = $('#cont .mod_uzr_nlt form input[name="services"]').val();
                        d = new Date(),
                        y = d.getFullYear(),
                        m = ((1 + d.getMonth()) < 10) ? '0' + (1 + d.getMonth()) : (1 + d.getMonth()),
                        day = (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
            },
            onContestSuccessSend: function() {
                $('body').scrollTop(0);
            }
        };
        
        g.gazeta_pl.namespace("mobi.NltTargeted");
        g.gazeta_pl.mobi.NltTargeted = NltTargeted;
    }(window, document, jQuery));

    (function(g, $) {

        "use strict";

        var HPerror = { 
        
            init: function() {

                var status = decodeURIComponent(g.location.search);

                if (status.indexOf('status=hp404') !== -1) {

                    if (/.*link=(.*?.html|.pl|.htm|.jsp)(&.*|#.*)?/g.test(status)) {

                        var str = status.replace(/.*link=(.*?.html|.pl|.htm|.jsp)(&.*|#.*)?/g, '$1');

                        $('<div class="error_nopage"><div><p>Strona nie ma wersji mobilnej.</p><p>Czy chcesz przej\u015b\u0107 do wersji pe\u0142nej?<p><a href="'+ str +'">Tak</a></div><span>X Zamknij</span></div>').insertAfter('#footer');

                    } else {

                        $('<div class="error_nopage"><div><p>Przepraszamy, nie znaleziono strony o podanym adresie.</p><p>Prawdopodobnie zosta\u0142a skasowana, zmieniono jej nazw\u0119 lub zosta\u0142a czasowo usuni\u0119ta<p></div><span>X Zamknij</span></div>').insertAfter('#footer');
                    }

                    $('.error_nopage').bind('touchstart', function(e) {
                        if (e.target !== $(this).find('a')[0]) {
                            $(this).fadeOut();
                            e.preventDefault();
                        }
                    });
                }
            }
        };

        g.gazeta_pl.namespace("mobi.HPerror");
        g.gazeta_pl.mobi.HPerror = HPerror;
        
    }(window, jQuery));


    /* changing image format (include PhotoAPI) */
    (function(g, $){
        "use strict";        
        
        var PhotoFormat = {           

            REGEX_PHOTO_FORMAT: /(z[0-9]{6,10})[A-Z]{1,2}/,            
            
            init: function (){
            },

            changeImageFormat: function (item) {                
                
                var 
                    $image = item.find('.entry:eq(0) img'),
                    $url = $image.attr('src'),
                    $newPhotoURL = PhotoFormat.photoChangeFormat($url, 'W');
                
                console.log($image.length, $url);
                item.find('.entry:eq(0)').addClass('bigimage');
                $image.attr('src', $newPhotoURL);
            },
          
            photoChangeFormat: function(url, newFormat) {                   
                return url.replace(PhotoFormat.REGEX_PHOTO_FORMAT, '$1' + newFormat);          
            }
        };

        g.gazeta_pl.namespace("mobi.PhotoFormat");
        g.gazeta_pl.mobi.PhotoFormat = PhotoFormat;

    }(window, jQuery));

    /* banner in the weekend section */
    (function(g, $){
        "use strict";        
        
        var BanInWeekend = { 
            init: function (){

                var 
                    scriptTxt = $('#winieta.is_banner .sponsor.big').html();

                if (!$('#winieta.is_banner .sponsor.big').length) return;
                
                $('.bp section').append(scriptTxt);
            }
        };

        g.gazeta_pl.namespace("mobi.BanInWeekend");
        g.gazeta_pl.mobi.BanInWeekend = BanInWeekend;

    }(window, jQuery));



    /* init */
    (function (g, d, $, u){
        "use strict";

        $(function() {
            var test;

            test = (function (){
                return /test=true/.test(g.location.href);
            }());

            g.gazeta_pl.mobi.wthay.init();

            g.gazeta_pl.mobi.navigationManager.init();
            g.gazeta_pl.mobi.jspaginator.reltedArticlesPaginator.init();
            g.gazeta_pl.mobi.jspaginator.imagesPaginator.init();
            g.gazeta_pl.mobi.fontResizer.init();

            g.gazeta_pl.mobi.RTC.LoadOldEntries.init({
                test: test,
                servlet: {
                    path: "/wall/wall.servlet"
                },
                howMany: 3,
                show: {
                    comments: true
                },
                olderEntries: 12
            });

            g.gazeta_pl.mobi.RTC.Scores.init();

            g.gazeta_pl.mobi.RTC.Related.init({
                servlet: {
                    url: "http://xml.sport.pl/RelatedArticlesForGame.servlet"
                },

                template: {
                    id: "related-template",
                    type: "text/x-handlebars-template",
                    content: "{{#each this}}<li class=\"entry news hidden\"><h2><a href=\"{{url}}\">{{title}}</a></h2><div class=\"imgw\"><a href=\"{{url}}\"><img src=\"{{photo}}\" alt=\"\"></a></div></li>{{/each}}"
                }
            });

            // g.gazeta_pl.mobi.articleMoreButton.init();
            // g.gazeta_pl.mobi.mod_commentsMoreButton.init();
            g.gazeta_pl.mobi.imagesHighResolutionManager.init();

            gazeta_pl.EmbedContent.flash();
            gazeta_pl.MobiVideo.init({CSSSelectors: {main: "body"}});

            new g.gazeta_pl.mobi.ShowBox({
                button: ".otherSites a[data-type='biznes']",
                box: ".otherSites .mod_stock_exchange_listing"
            });

            g.gazeta_pl.mobi.AJAXAccordion.init();
            g.gazeta_pl.mobi.IndexDate.init({
                $elements: $(".article .time"),
                removeNotParsedDate: true
            });

            gazeta_pl.mobi.localManager.init();
            gazeta_pl.mobi.movieManager.init();
            gazeta_pl.mobi.ImageUpload.init();
            gazeta_pl.mobi.NltTargeted.init();
            gazeta_pl.mobi.HPerror.init();
            gazeta_pl.mobi.PhotoFormat.init();
            gazeta_pl.mobi.BanInWeekend.init();
                    
            g.gazeta_pl.mobi.ga.config.relatedArticles.swipe.init();
            g.gazeta_pl.mobi.ga.config.articlesPhotos.swipe.init();
            g.gazeta_pl.mobi.ga.config.menu.init();

            if (g.gazeta_pl.mobi.ga.config.zdrowie.dependencies()) {
                g.gazeta_pl.mobi.ga.config.zdrowie.swipe.init();
            }

            g.gazeta_pl.mobi.runAgain = function() {
                // g.gazeta_pl.mobi.mod_commentsMoreButton.init();
            };
            g.gazeta_pl.Piano7.init();            
        });

        
    }(g, d, jQuery));
 
}(window, document));


/* iOS 0.1.2 */
(function (g, d, u){
    /* gazeta_pl.mobi.iOS v0.1.2 */
    (function (g, d, u, $){
        var iOS = {
            init: function (conf) {
                var self = iOS;

                if (/(m\.wyborcza)(\.pl)?.*(0,0)/ig.test(location.href)) {
                    self.AddToHome.init(conf && conf.addToHome);
                }
            }, 

            AddToHome: {
                init: function (conf) {
                    var self = iOS.AddToHome,

                        /*!
                         * Add to Homescreen v1.0.8 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
                         * Released under MIT license, http://cubiq.org/license
                         */
                        add2Home = function () {
                            var nav = navigator,
                                isIDevice = (/iphone|ipod|ipad/gi).test(nav.platform),
                                isIPad = (/ipad/gi).test(nav.platform),
                                isRetina = 'devicePixelRatio' in window && window.devicePixelRatio > 1,
                                isSafari = nav.appVersion.match(/Safari/gi),
                                hasHomescreen = 'standalone' in nav && isIDevice,
                                isStandalone = hasHomescreen && nav.standalone,
                                OSVersion = nav.appVersion.match(/OS \d+_\d+/g),
                                platform = nav.platform.split(' ')[0],
                                language = nav.language.replace('-', '_'),
                                startY = 0,
                                startX = 0,
                                expired = 'localStorage' in window && typeof localStorage.getItem === 'function' ? localStorage.getItem('_addToHome') : null,
                                theInterval, closeTimeout, el, i, l,
                                options = {
                                    animationIn:'drop', // drop || bubble || fade
                                    animationOut:'fade', // drop || bubble || fade
                                    startDelay:300, // 2 seconds from page load before the balloon appears
                                    lifespan:600000, // 20 seconds before it is automatically destroyed
                                    bottomOffset:14, // Distance of the balloon from bottom
                                    expire:0, // Minutes to wait before showing the popup again (0 = always displayed)
                                    message:'pl_pl', // Customize your message or force a language ('' = automatic)
                                    disableLoading:false, // Disable loading of balloon
                                    touchIcon:true, // Display the touch icon
                                    arrow:true, // Display the balloon arrow
                                    iterations:100                // Internal/debug use
                                },
                                /* Message in various languages, en_us is the default if a language does not exist */
                                intl = {
                                    en_us: 'Install this web app on your %device: tap %icon and then <strong>Add to Home Screen</strong>.',
                                    pl_pl: 'Aby utworzy\u0107 skr\u00F3t do tej strony, naci\u015Bnij %icon a nast\u0119pnie <strong>Dodaj jako ikon\u0119</strong>.'
                                };

                            OSVersion = OSVersion ? OSVersion[0].replace(/[^\d_]/g, '').replace('_', '.') * 1 : 0;
                            expired = expired == 'null' ? 0 : expired * 1;

                            // Merge options
                            if (window.addToHomeConfig) {
                                for (i in window.addToHomeConfig) {
                                    options[i] = window.addToHomeConfig[i];
                                }
                            }

                            // Is it expired?

                            if (!options.expire || expired < new Date().getTime()) {
                                expired = 0;
                            }

                            /* Bootstrap */
                            // if (hasHomescreen && !expired && !isStandalone && isSafari && !options.disableLoading) {
                            // document.addEventListener('DOMContentLoaded', ready, false);
                            // window.addEventListener('load', loaded, false);
                            // }


                            /* on DOM ready */
                            var ready = function (callback) {
                                // document.removeEventListener('DOMContentLoaded', ready, false);

                                var div = document.createElement('div'),
                                    close,
                                    link = options.touchIcon ? document.querySelectorAll('head link[rel=apple-touch-icon],head link[rel=apple-touch-icon-precomposed]') : [],
                                    sizes, touchIcon = '';

                                div.id = 'addToHomeScreen';
                                div.style.cssText += 'position:absolute;-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0;-webkit-transform:translate3d(0,0,0);';
                                div.style.left = '-9999px';     // Hide from view at startup

                                // Localize message
                                if (options.message in intl) {        // You may force a language despite the user's locale
                                    language = options.message;
                                    options.message = '';
                                }
                                if (options.message == '') {        // We look for a suitable language (defaulted to en_us)
                                    options.message = language in intl ? intl[language] : intl['en_us'];
                                }

                                // Search for the apple-touch-icon
                                if (link.length) {
                                    for (i = 0, l = link.length; i < l; i++) {
                                        sizes = link[i].getAttribute('sizes');

                                        if (sizes) {
                                            if (isRetina && sizes == '114x114') {
                                                touchIcon = link[i].href;
                                                break;
                                            }
                                        } else {
                                            touchIcon = link[i].href;
                                        }
                                    }

                                    touchIcon = '<span style="background-image:url(' + touchIcon + ')" class="touchIcon"></span>';
                                }

                                div.className = (isIPad ? 'ipad' : 'iphone') + (touchIcon ? ' wide' : '');
                                div.innerHTML = touchIcon + options.message.replace('%device', platform).replace('%icon', OSVersion >= 4.2 ? '<span class="share"></span>' : '<span class="plus">+</span>') + (options.arrow ? '<span class="arrow"></span>' : '') + '<span class="close">\u00D7</span>';

                                document.body.appendChild(div);
                                el = div;

                                // Add the close action
                                close = el.querySelector('.close');
                                if (close) close.addEventListener('click', addToHomeClose, false);

                                // Add expire date to the popup
                                if (options.expire) localStorage.setItem('_addToHome', new Date().getTime() + options.expire * 60 * 1000);
                                callback();
                            };

                            /* on window load */
                            var loaded = function () {
                                // window.removeEventListener('load', loaded, false);

                                setTimeout(function () {
                                    var duration;

                                    startY = isIPad ? window.scrollY : window.innerHeight + window.scrollY;
                                    startX = isIPad ? window.scrollX : Math.round((window.innerWidth - el.offsetWidth) / 2) + window.scrollX;

                                    el.style.top = isIPad ? startY + options.bottomOffset + 'px' : startY - el.offsetHeight - options.bottomOffset + 'px';
                                    el.style.left = isIPad ? startX + (OSVersion >= 5 ? 160 : 208) - Math.round(el.offsetWidth / 2) + 'px' : startX + 'px';

                                    switch (options.animationIn) {
                                        case 'drop':
                                            if (isIPad) {
                                                duration = '0.6s';
                                                el.style.webkitTransform = 'translate3d(0,' + -(window.scrollY + options.bottomOffset + el.offsetHeight) + 'px,0)';
                                            } else {
                                                duration = '0.9s';
                                                el.style.webkitTransform = 'translate3d(0,' + -(startY + options.bottomOffset) + 'px,0)';
                                            }
                                            break;
                                        case 'bubble':
                                            if (isIPad) {
                                                duration = '0.6s';
                                                el.style.opacity = '0';
                                                el.style.webkitTransform = 'translate3d(0,' + (startY + 50) + 'px,0)';
                                            } else {
                                                duration = '0.6s';
                                                el.style.webkitTransform = 'translate3d(0,' + (el.offsetHeight + options.bottomOffset + 50) + 'px,0)';
                                            }
                                            break;
                                        default:
                                            duration = '1s';
                                            el.style.opacity = '0';
                                    }

                                    setTimeout(function () {
                                        el.style.webkitTransitionDuration = duration;
                                        el.style.opacity = '1';
                                        el.style.webkitTransform = 'translate3d(0,0,0)';
                                        el.addEventListener('webkitTransitionEnd', transitionEnd, false);
                                    }, 0);

                                    closeTimeout = setTimeout(addToHomeClose, options.lifespan);
                                }, options.startDelay);
                            };

                            function transitionEnd() {
                                el.removeEventListener('webkitTransitionEnd', transitionEnd, false);
                                el.style.webkitTransitionProperty = '-webkit-transform';
                                el.style.webkitTransitionDuration = '0.2s';

                                if (closeTimeout) {        // Standard loop
                                    clearInterval(theInterval);
                                    theInterval = setInterval(setPosition, options.iterations);
                                } else {                // We are closing
                                    el.parentNode.removeChild(el);
                                }
                            }

                            function setPosition() {
                                var matrix = new WebKitCSSMatrix(window.getComputedStyle(el, null).webkitTransform),
                                posY = isIPad ? window.scrollY - startY : window.scrollY + window.innerHeight - startY,
                                posX = isIPad ? window.scrollX - startX : window.scrollX + Math.round((window.innerWidth - el.offsetWidth) / 2) - startX;

                                if (posY == matrix.m42 && posX == matrix.m41) return;

                                clearInterval(theInterval);
                                el.removeEventListener('webkitTransitionEnd', transitionEnd, false);

                                setTimeout(function () {
                                    el.addEventListener('webkitTransitionEnd', transitionEnd, false);
                                    el.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
                                }, 0);
                            }

                            function addToHomeClose() {
                                clearInterval(theInterval);
                                clearTimeout(closeTimeout);
                                closeTimeout = null;
                                el.removeEventListener('webkitTransitionEnd', transitionEnd, false);

                                var posY = isIPad ? window.scrollY - startY : window.scrollY + window.innerHeight - startY,
                                posX = isIPad ? window.scrollX - startX : window.scrollX + Math.round((window.innerWidth - el.offsetWidth) / 2) - startX,
                                opacity = '1',
                                duration = '0',
                                close = el.querySelector('.close');

                                if (close) close.removeEventListener('click', addToHomeClose, false);

                                el.style.webkitTransitionProperty = '-webkit-transform,opacity';

                                switch (options.animationOut) {
                                    case 'drop':
                                        if (isIPad) {
                                            duration = '0.4s';
                                            opacity = '0';
                                            posY = posY + 50;
                                        } else {
                                            duration = '0.6s';
                                            posY = posY + el.offsetHeight + options.bottomOffset + 50;
                                        }
                                        break;
                                    case 'bubble':
                                        if (isIPad) {
                                            duration = '0.8s';
                                            posY = posY - el.offsetHeight - options.bottomOffset - 50;
                                        } else {
                                            duration = '0.4s';
                                            opacity = '0';
                                            posY = posY - 50;
                                        }
                                        break;
                                    default:
                                        duration = '0.8s';
                                        opacity = '0';
                                }

                                el.addEventListener('webkitTransitionEnd', transitionEnd, false);
                                el.style.opacity = opacity;
                                el.style.webkitTransitionDuration = duration;
                                el.style.webkitTransform = 'translate3d(' + posX + 'px,' + posY + 'px,0)';
                            }

                            /* Public functions */
                            window.addToHomeClose = addToHomeClose;
                            ready(loaded);
                        };

                    self.cookieName = "eath"; //expired addToHome
                    self.test = conf && conf.test;

                    self.cache();

                    if (self.isDependenciesSatisfied()) {
                        self.icons = conf && conf.icons;

                        self.CookieManager.init();
                        
                        if (self.icons) {
                            self.addIconsHTML();
                        }

                        self.setExpired();
                        add2Home();
                        self.changeTitle();
                    }
                },

                cache: function() {
                    var self = iOS.AddToHome;

                    self.CookieManager = gazeta_pl.mobi.CookieManager;
                },

                isAppleMobilePlatform: function () {
                    var self = iOS.AddToHome;

                    if ((/iphone|ipod|ipad/gi).test(navigator.platform) && (/Safari/i).test(navigator.appVersion)) {
                        return true;
                    }

                    return false;
                },

                isSafari: function () {
                    if ((/Safari/i).test(navigator.appVersion)) {
                        return true;
                    }

                    return false;
                },

                isExpired: function () {
                    var self = iOS.AddToHome;

                    if (self.CookieManager.get(self.cookieName) === "true") {
                        return true;
                    }

                    return false;
                },

                isDependenciesSatisfied: function() {
                    var
                        self = iOS.AddToHome,
                        cm = !!self.CookieManager;

                    return self.test || (self.isAppleMobilePlatform() && !self.isExpired() && cm);
                },

                setExpired: function () {
                    var self = iOS.AddToHome;

                    if (!self.debug) {
                        self.CookieManager.set(self.cookieName, "true");
                    }
                },

                changeTitle: function () {
                    var
                        siteTitle,

                        setNewTitle = function(newTitle) {
                            if (typeof document.title === "string") {
                                document.title = newTitle;
                            } else if (typeof document.getElementsByTagName("title")[0].text === "string") {
                                document.getElementsByTagName("title")[0].text = newTitle;
                            } else if (typeof document.getElementsByTagName("title")[0].innerHTML === "string") {
                                document.getElementsByTagName("title")[0].innerHTML = newTitle;
                            }
                        },

                        parseTitle = function (siteTitle) {
                            var
                                pattern = " - ",
                                patternIndex = siteTitle.indexOf(pattern);

                            if (patternIndex > -1) {
                                siteTitle = siteTitle.substr(0, patternIndex);
                            }

                            return siteTitle;
                        },

                        execute = function () {
                            if (typeof document.title === "string") {
                                siteTitle = document.title;
                            } else if (typeof document.getElementsByTagName("title")[0].text === "string") {
                                siteTitle = document.getElementsByTagName("title")[0].text;
                            } else if (typeof document.getElementsByTagName("title")[0].innerHTML === "string") {
                                siteTitle = document.getElementsByTagName("title")[0].innerHTML;
                            }

                            setNewTitle(parseTitle(siteTitle));
                        };

                    execute();

                    return {};
                },

                addIconsHTML: function() {
                    var
                        mainUrl,
                        tag,
                        siteName,
                        addIcons,
                        getSiteName,
                        parseUrls;

                    mainUrl = "http://bi.gazeta.pl/i/obrazki/mobi/icons/";
                    tag = "{{SERWIS_NAME}}";

                    getSiteName = function () {
                        var
                            currentDomain,
                            splitted;

                        currentDomain = g.location.href;

                        /\.gazeta\.pl\/notowania\//.test(currentDomain) ?
                            currentDomain = "notowania" :
                        /(\/pogoda$)|(\/pogoda\?locId)/.test(currentDomain) ? 
                            currentDomain = currentDomain.replace("gazeta", "pogoda") :
                        (currentDomain = currentDomain.match(/http(s?):\/\/([\w]+\.){1}([\w]+\.?)+/)[0]), 
                        /m\.wyborcza\.biz/.test(currentDomain) ? 
                            currentDomain = currentDomain.replace("a.biz", "a_biz") :
                        /\.technologie\./.test(currentDomain) ||
                        /\.tv\.gazeta\.pl/.test(currentDomain) ||
                        /\.kobieta\.gazeta\.pl/.test(currentDomain) ? 
                            currentDomain = currentDomain.replace(".gazeta", "") :
                        false;

                        splitted = currentDomain.split("//")[1];

                        if (splitted) {
                            splitted = splitted.split("/")[0];
                            currentDomain = splitted;
                        }

                        splitted = currentDomain.split(".");

                        if (2 < splitted.length) {
                            currentDomain = splitted[splitted.length - 2];
                        } else if (1 < splitted.length) {
                            currentDomain = splitted[splitted.length - 1];
                        } else {
                            currentDomain = splitted[0].replace(/http(s?):\/\//, "");
                        }

                        return currentDomain;
                    };

                    parseUrls = function() {
                        var url;

                        switch (siteName) {
                        case "wyborcza":
                            siteName = "gw";
                            break;
                        case "wyborcza_biz":
                            siteName = "wyborcza_biz";
                            break;
                        case "notowania":
                            siteName = "wyborcza_biz_indeksy";
                            break
                        case "technologie":
                            siteName = "technologie";
                            break;
                        case "sport":
                            siteName = "sport";
                            break;
                        case "pogoda":
                            siteName = "pogoda";
                            break
                        case "tv":
                            siteName = "programtv";
                            break;
                        case "polygamia":
                            siteName = "polygamia";
                            break; 
                        case "tokfm":
                            siteName = "tokfm";
                            break; 
                        case "moto":
                            siteName = "moto";
                            break; 
                        case "edziecko":
                            siteName = "edziecko";
                            break; 
                        case "kobieta":
                            siteName = "kobieta";
                            break; 
                        case "groszki":
                            siteName = "groszki";
                            break; 
                        case "kotek":
                            siteName = "kotek";
                            break; 
                        case "deser":
                            siteName = "deser";
                            break; 
                        default:
                            siteName = "gazeta_pl";
                        }

                        for (url in icons) {
                            icons[url] = icons[url].replace(tag, siteName);
                        }
                    };

                    addIcons = function() {
                        var
                            $head,
                            link,
                            rel;

                        $head = $("head");
                        link = "<link/>";
                        rel = "apple-touch-icon-precomposed";

                        $(link, {
                            rel: rel,
                            href: icons.small
                        }).appendTo($head);

                        $(link, {
                            rel: rel,
                            sizes: "72x72",
                            href: icons.medium
                        }).appendTo($head);

                        $(link, {
                            rel: rel,
                            sizes: "114x114",
                            href: icons.large
                        }).appendTo($head);
                    };

                    icons = {
                        small: mainUrl + tag + ".57.png",
                        medium: mainUrl + tag + ".72.png",
                        large: mainUrl + tag + ".114.png"
                    },

                    hideAddressBar = function() {
                        $("<meta>" ,{
                            name: "apple-mobile-web-app-capable",
                            content: "yes"
                        }).appendTo(d.head);
                    };

                    siteName = getSiteName();
                    parseUrls();
                    addIcons();
                    hideAddressBar();
                }
            }
        };

        g.gazeta_pl.namespace("mobi.iOS");
        g.gazeta_pl.mobi.iOS = iOS;
    }(window, document, undefined, jQuery));

    $(function() {
        gazeta_pl.mobi.iOS.init({
            addToHome: {
                icons: true
            }
        });
    });
}(window, document, undefined));

}(window, document));



gazeta_pl.Piano7 = {
    init: function() {
        if(typeof gazeta_pl !='undefined' && typeof gazeta_pl.Config != 'undefined' && gazeta_pl.Config.PIANO_METERED) {
            gazeta_pl.Piano7.noCookiesBox.init();
        }
    },
   noCookiesBox: {
       NOCOOKIES_ALIAS: "/aliasy/piano5/nocookies.htm",

       init: function() {
           if (!document.cookie.length) {
               gazeta_pl.Piano7.noCookiesBox.load();
           }
           return;
       },
       load: function() {
           jQuery.ajax({
               url: gazeta_pl.Piano7.noCookiesBox.NOCOOKIES_ALIAS,
               success: function(data) {
                   gazeta_pl.Piano7.noCookiesBox.onLoad(data);
               }
           });
       },
       toggle: function() {
           var $overlay = jQuery('.overlayPiano.noCookiesBox');
           $overlay.toggleClass('hide off');
           return;
       },
       onLoad: function(data) {
           var htm = '<div class="overlayPiano noCookiesBox hide off"><div>' + data + '</div></div>',
               h = 0,
               offsetTop = 0,
               minHeight = 0, // piano bar height
               $htm = null,
               $overlay = null,
               $holder = null;
           
           jQuery('body').append(htm);

           $overlay = jQuery('.overlayPiano.noCookiesBox');
           $overlay.css('height', jQuery(document).height());
           
           $overlay.find('.close_btn, .pianoBtn').click(function() {
               gazeta_pl.Piano7.noCookiesBox.toggle();
           });
           
           gazeta_pl.Piano7.noCookiesBox.toggle();
       }
   },   
};

/*******************************************************************

(c) 2008 Gemius SA / gemiusHeatMap(GHM+XY) / http://www.gazeta.pl

*******************************************************************/
var ghmxy_align = 'center';
var ghmxy_type = 'absolute';
var ghmxy_identifier = new String("B82VTeN47cuBsZk32mamTMWnXhYZBS80wpxPFKMSTfr.b7");

// common

if (typeof ghmxy_hitcollector=='undefined') {
        var ghmxy_hitcollector='mklik.gazeta.pl';
}
var ghmxy_proto;
if(document.location && document.location.protocol) {
        ghmxy_proto = 'http'+((document.location.protocol=='https:')?'s':'')+'://';
} else {
        ghmxy_proto = 'http://';
}


// (c) by Gemius SA - gemiusHeatMap
// ver. 4.11

var ghmxy_images = new Array();

function ghmxy_checklink(node) {
        var imn = null;
        if (node.nodeName == "#text") {
                if (node.nodeValue && node.nodeValue.replace(/[ \t\r\n]+/g,"").length > 0) {
                        return node;
                }
                return null;
        }
        if (node.nodeName == "IMG") {
                return node;
        }
        if (node.childNodes) {
                for (var i = 0 ; i < node.childNodes.length ; i++) {
                        var hn = ghmxy_checklink(node.childNodes[i]);
                        if (hn != null) {
                                if (hn.nodeName == "#text") return hn;
                                if (imn == null) imn = hn;
                        }
                }
        }
        return imn;
}

function ghmxy_toutf8(str) {
        function Hex(n) {
                var hexMap = '0123456789ABCDEF';
                return '%'+hexMap.charAt(n>>4)+hexMap.charAt(n&0xF);
        }
        var c,s,uc,ul;
        var dst = '';
        for (var i=0 ; i<str.length ; i++) {
                c = str.charCodeAt(i);
                if ((c>=0xDC00)&&(c<0xE000)) continue;
                if ((c>=0xD800)&&(c<0xDC00)) {
                        i++;
                        if (i>=str.length) continue;
                        s = str.charCodeAt(i);
                        if ((s<0xDC00)||(s>=0xDE00)) continue;
                        c = ((c-0xD800)<<10)+(s-0xDC00)+0x10000;
                }
                if (c<=0x20 || c==0x22 || c==0x7C) {
                        uc = Hex(c);
                } else if (c<0x80) {
                        uc = String.fromCharCode(c);
                } else if (c<0x800) {
                        uc = Hex(0xC0+(c>>6))+Hex(0x80+(c&0x3F));
                } else if (c<0x10000) {
                        uc = Hex(0xE0+(c>>12))+Hex(0x80+(c>>6&0x3F))+Hex(0x80+(c&0x3F));
                } else {
                        uc = Hex(0xF0+(c>>18))+Hex(0x80+(c>>12&0x3F))+Hex(0x80+(c>>6&0x3F))+Hex(0x80+(c&0x3F));
                }
                dst+=uc;                
        }
        return dst;
}

function ghmxy_url_escape(str) {
        return ghmxy_toutf8(str).replace(/\x2520|\x2509|\x250[aA]|\x250[dD]/g,"")
}

function ghmxy_load() {
        if (document.getElementById && document.getElementsByTagName) {
                var allImages = document.getElementsByTagName("img");
                var allInputs = document.getElementsByTagName("input");
                var allForms = document.getElementsByTagName("form");
                var i;
                if (allImages) {
                        for (i=0; i<allImages.length; i++) {
                                if (typeof(allImages[i].src) != "undefined") {
                                        allImages[i].ghmxy_src = allImages[i].src;
                                }
                        }
                }
                if (allInputs) {
                        for (i=0; i<allInputs.length; i++) {
                                if (typeof(allInputs[i].value) != "undefined") {
                                        allInputs[i].ghmxy_value = allInputs[i].value;
                                }
                                if (typeof(allInputs[i].src) != "undefined") {
                                        allInputs[i].ghmxy_src = allInputs[i].src;
                                }
                        }
                }
                if (allForms) {
                        for (i=0; i<allForms.length; i++) {
                                if (typeof(allForms[i].action) != "undefined") {
                                        allForms[i].ghmxy_action = allForms[i].action;
                                }
                        }
                }
        }
}

function ghmxy_gettext(node) {
        var rettext="";
        if (node.nodeName=="#text") {
                return node.nodeValue;
        } else if (node.nodeName=="IMG") {
                var src="";
                var alt="";
                if (node.ghmxy_src) {
                        src = node.ghmxy_src;
                } else {
                        src = node.src;
                }
                if (node.alt) {
                        alt = node.alt;
                }
                return "img:"+ghmxy_url_escape(src)+":"+alt;
        } else if (node.childNodes) {
                for (var i=0 ; i<node.childNodes.length ; i++) {
                        if (node.childNodes[i].nodeName!='A') {
                                rettext+=" "+ghmxy_gettext(node.childNodes[i]);
                        }
                }
        }
        return rettext;
}

function ghmxy_checksum(itext,pos) {
        var cs=0;
        var b64map=".ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
        for (var n = pos; n < itext.length; n++) {
                cs = ((cs * 13) + itext.charCodeAt(n))&0xFFF;
        }
        return b64map.charAt((cs>>6)&0x3F)+b64map.charAt(cs&0x3F);
}


function ghmxy_escape(str,limit,csflag) {
        function Hex(n) {
                var hexMap = "0123456789ABCDEF";
                return hexMap.charAt(n>>4)+hexMap.charAt(n&0xF);
        }
        var c,s,uc,ul;
        var dst = "";
        for (var i=0 ; i<str.length ; i++) {
                c = str.charCodeAt(i);
                if ((c>=0xDC00)&&(c<0xE000)) continue;
                if ((c>=0xD800)&&(c<0xDC00)) {
                        i++;
                        if (i>=str.length) continue;
                        s = str.charCodeAt(i);
                        if ((s<0xDC00)||(s>=0xE000)) continue;
                        c = ((c-0xD800)<<10)+(s-0xDC00)+0x10000;
                }
                if (c<0x80) {
                        uc = escape(String.fromCharCode(c)).replace(/\+/g,"%2B").replace(/\//g,"%2F");
                        if (c<=0x20) {
                                ul=3;
                        } else {
                                ul=1;
                        }
                } else if (c<0x800) {
                        uc = "%u"+Hex(c>>8)+Hex(c&0xFF);
                        ul = 2;
                } else if (c<0x10000) {
                        uc = "%u"+Hex(c>>8)+Hex(c&0xFF);
                        ul = 3;
                } else {
                        uc = "%U"+Hex((c>>24)&0xFF)+Hex((c>>16)&0xFF)+Hex((c>>8)&0xFF)+Hex(c&0xFF);
                        ul = 4;
                }
                limit -= ul;
                if (limit<0) {
                        if (csflag) {
                                return dst+"|"+ghmxy_checksum(str,i);
                        } else {
                                return dst;
                        }
                }
                dst+=uc;                
        }
        if (csflag) {
                return dst+"|";
        } else {
                return dst;
        }
}

function ghmxy_send(mhref,area,ltext,lid) {
        var href=ghmxy_url_escape(new String(document.location.href));
        mhref=ghmxy_url_escape(mhref);
        ltext=ltext.replace(/[ \t\r\n]+/g," ").replace(/^ /,"").replace(/ $/,"").replace(/\x22|\||\x2520/g,"_");
        area=area.replace(/;|&|\//g,"_");
        lid=lid.replace(/;|&|\/|\|/g,"_");
        var ghmxy_url = ghmxy_proto+ghmxy_hitcollector+"/_"+(new Date()).getTime()+"/redot.gif?l=1&id="+ghmxy_identifier+"&sarg="+ghmxy_escape(ltext,190,1)+"|"+ghmxy_escape(area,50,0)+"&ref=http%3A%2F%2F0.0.0.0%2F"+ghmxy_escape(mhref,230,1)+"|"+ghmxy_escape(lid,50,0)+"&href="+ghmxy_escape(href,299,0);
        var ghmxy_image = new Image();
        ghmxy_image.src = ghmxy_url;
        ghmxy_images[ghmxy_images.length] = ghmxy_image;
        var start = (new Date()).getTime();
        while (start+200>(new Date()).getTime());
}

function ghmxy_hm_click(ev) {
        var p=0;
        var np=0;
        var ln=0;
        var ocln=0;
        var fform=0;
        var imgclick=0;
        var mhref="",ocmhref="",path="",ltext="",ocltext="",lid="";
        if (document.getElementById) {
                if (!window.event) { 
                        p=ev.target;
                } else {
                        p=window.event.srcElement;
                }
                try {
                        if (p.nodeName == "A") {
                                var cp = ghmxy_checklink(p);
                                if (cp != null && cp.nodeName == "IMG") p = cp;
                        }
                        if (p.nodeName=="INPUT" || p.nodeName=="BUTTON") {
                                if (p.type=="submit") {
                                        var value="";
                                        if (p.ghmxy_value) {
                                                value = p.ghmxy_value;
                                        } else {
                                                value = p.value;
                                        }
                                        ltext="formsubmit:"+value;
                                        fform=1;
                                }
                                if (p.type=="image") {
                                        var src="";
                                        if (p.ghmxy_src) {
                                                src = p.ghmxy_src;
                                        } else {
                                                src = p.src;
                                        }
                                        ltext="formimage:"+ghmxy_url_escape(src);
                                        fform=1;
                                }
                        } else if (p.nodeName=="IMG") {
                                imgclick=1;
                        }
                        while (p) {
                                if (!ocln && p.attributes && p.attributes.getNamedItem) {
                                        ocnode = p.attributes.getNamedItem("onclick");
                                        if (ocnode && ocnode.nodeValue) {
                                                ocln=p;
                                                ocmhref="hmc="+ocnode.nodeValue;
                                                ocltext=p.nodeName+" "+ghmxy_gettext(p);
                                        }
                                }
                                if (!ln) {
                                        if (p.nodeName=="AREA" && typeof(p.href)=="string" && p.href!="") {
                                                ln=p;
                                                mhref="hma="+p.href;
                                                ltext = p.shape+" "+p.coords;
                                        }
                                        if (p.nodeName=="A" && typeof(p.href)=="string" && p.href!="") {
                                                ln=p;
                                                if (imgclick) {
                                                        mhref="hmi="+p.href;
                                                } else {
                                                        mhref="hml="+p.href;

                                                }
                                                if (typeof(p.className)=="string" && p.className!="") {
                                                        ltext=p.className+" "+ghmxy_gettext(p);
                                                } else {
                                                        ltext=ghmxy_gettext(p);
                                                }
                                        }
                                        if (fform && p.nodeName=="FORM") {
                                                if (typeof(p.ghmxy_action)=="string" && p.ghmxy_action!="") {
                                                        ln=p;
                                                        mhref="hmf="+p.ghmxy_action;
                                                } else if (p.attributes && p.attributes.getNamedItem) {
                                                        osnode = p.attributes.getNamedItem("onsubmit");
                                                        if (osnode && osnode.nodeValue) {
                                                                ln=p;
                                                                mhref="hms="+p.attributes.getNamedItem("onsubmit").nodeValue;
                                                        }
                                                }
                                        }
                                }
                                if (typeof(p.id)=="string" && (ln || ocln)) {
                                        if (p.id.substr(0,7)=="LinkID:") {
                                                lid=p.id.replace(/\x2520/g,"_").substr(7,50);
                                        }
                                        if (p.id.substr(0,9)=="LinkArea:") {
                                                pel=p.id.replace(/\x2520/g,"_").substr(9,10);
                                                if (path) {
                                                        path=pel+"|"+path;
                                                } else {
                                                        path=pel; 
                                                } 
                                        }
                                }
                                np = 0;
                                if (typeof(p.parentNode)=="object") {
                                        var pp = p.parentNode;
                                        if (pp && pp.childNodes) {
                                                for (var ch=0 ; ch<pp.childNodes.length ; ch++) {
                                                        if (pp.childNodes[ch] == p) {
                                                                np=pp;
                                                        }
                                                }
                                        }
                                }
                                p=np;
                        }
                        if (ln) {
                                ghmxy_send(mhref,path,ltext,lid);
                        } else if (ocln) {
                                ghmxy_send(ocmhref,path,ocltext,lid);
                        }
                } catch (_ev) {
                }
        }
}

// (c) by Gemius SA - gemiusHeatMapXY
// ver. 2.3

if (typeof(ghmxy_type)=='undefined' || (ghmxy_type!='percent' && ghmxy_type!='absolute')) {
        var ghmxy_type='x';
} else {
        ghmxy_type = ghmxy_type.substr(0,1);
}
if (typeof(ghmxy_align)=='undefined' || (ghmxy_align!='left' && ghmxy_align!='center' && ghmxy_align!='right')) {
        var ghmxy_align='x';
} else {
        ghmxy_align = ghmxy_align.substr(0,1);
}

var ghmxy_heat_map_image = new Image();
var ghmxy_values = '';
var ghmxy_sarg = '';

function ghmxy_save() {
        if (ghmxy_values != '') {
                var ghmxy_clickvalues = ghmxy_values;
                ghmxy_values='';        // clear ghmxy_values as fast as possible (race condition !!!)
                var href = new String(document.location.href);
                var ghmxy_link = ghmxy_proto+ghmxy_hitcollector+'/_'+(new Date()).getTime()+'/redot.gif?l=2&id='+ghmxy_identifier+'&arg=1&sarg='+ghmxy_sarg+'&href='+escape(href.substring(0,299))+'&ref=http%3A%2F%2F0.0.0.0%2Fxy%3D'+ghmxy_clickvalues;
                ghmxy_heat_map_image.src = ghmxy_link;
        }
}

function ghmxy_heat_map_add_event(ob,evname,fn) {
        if (ob.attachEvent) {
                ob.attachEvent("on"+evname,fn);
        } else if(ob.addEventListener) {
                ob.addEventListener(evname,fn, false);
        }
}

function ghmxy_get_correct_data (n_win, n_docel, n_body) {
        var n_result = n_win ? n_win : 0;
        if (n_docel && (!n_result || (n_result > n_docel))) {
                n_result = n_docel;
        }
        return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function ghmxy_width() {
        return ghmxy_get_correct_data (window.innerWidth ? window.innerWidth : 0, document.documentElement ? document.documentElement.clientWidth : 0, document.body ? document.body.clientWidth : 0);
}

function ghmxy_height() {
        return ghmxy_get_correct_data (window.innerHeight ? window.innerHeight : 0, document.documentElement ? document.documentElement.clientHeight : 0, document.body ? document.body.clientHeight : 0);
}

function ghmxy_posx() {
        return ghmxy_get_correct_data (window.pageXOffset ? window.pageXOffset : 0, document.documentElement ? document.documentElement.scrollLeft : 0, document.body ? document.body.scrollLeft : 0);
}

function ghmxy_posy() {
        return ghmxy_get_correct_data (window.pageYOffset ? window.pageYOffset : 0, document.documentElement ? document.documentElement.scrollTop : 0, document.body ? document.body.scrollTop : 0);
}

function ghmxy_heat_map_refresh_window_params() {
        var wparam = 'r'+screen.width+','+screen.height+'|s'+ghmxy_width()+','+ghmxy_height()+'|a'+ghmxy_align.substr(0,1)+'|t'+ghmxy_type.substr(0,1)+'|m'+ghmxy_posx()+','+ghmxy_posy()+'|p';
        if (document.body && typeof(document.body.scrollWidth)!='undefined' && typeof(document.body.scrollHeight)!='undefined') {
                wparam += document.body.scrollWidth+','+document.body.scrollHeight;
        }
        return wparam;
}

function ghmxy_xy_click(ev) {
        if (ghmxy_values=='') {
                ghmxy_sarg = ghmxy_heat_map_refresh_window_params();
                ghmxy_values = ev.clientX+':'+ev.clientY;
        } else {
                ghmxy_values += '|'+ev.clientX+':'+ev.clientY;
                if (ghmxy_values.length > 250) {
                        ghmxy_save();
                }
        }
}

function ghmxy_flash(id,xx,yy) {
        var ghmxy_obj = document.getElementById(id);
        if (ghmxy_obj) {
                var x=0;
                var y=0;
                if (ghmxy_obj.offsetParent) {
                        do {
                                x += ghmxy_obj.offsetLeft;
                                y += ghmxy_obj.offsetTop;
                                ghmxy_obj = ghmxy_obj.offsetParent;
                        } while (ghmxy_obj);
                } else {
                        if (ghmxy_obj.x) {
                                x = ghmxy_obj.x;
                        }
                        if (ghmxy_obj.y) {
                                y = ghmxy_obj.y;
                        }
                }
                x+=xx;
                y+=yy;
                if(ghmxy_values==''){
                        ghmxy_sarg = ghmxy_heat_map_refresh_window_params();
                        ghmxy_values = x+':'+y;
                } else {
                        ghmxy_values += '|'+x+':'+y;
                        if (ghmxy_values.length > 250) {;
                                ghmxy_save();
                        }
                }
        }
}

// common

function ghmxy_click(ev) {
        ghmxy_hm_click(ev);
        ghmxy_xy_click(ev);
}

function ghmxy_add_event(ob,evname,fn) {
        if (ob.attachEvent) {
                ob.attachEvent("on"+evname,fn);
        } else if(ob.addEventListener) {
                ob.addEventListener(evname,fn, false);
        }
}

// common:
ghmxy_add_event(document,"click",ghmxy_click);
// heat map:
ghmxy_add_event(window,"load",ghmxy_load);
// xy map:
ghmxy_add_event(window,"unload",ghmxy_save);
ghmxy_add_event(window,"scroll",ghmxy_save);
ghmxy_add_event(window,"resize",ghmxy_save);