/* Copyright (c) Ericsson 2019 */

/*!
 * numeral.js
 * version : 1.5.3
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
define("i18n/number/base/numeral",[],function(){function e(e){this._value=e}function n(e,n,t,r){var i,a,u=Math.pow(10,n);return a=(t(e*u)/u).toFixed(n),r&&(i=new RegExp("0{1,"+r+"}$"),a=a.replace(i,"")),a}function t(e,n,t){var r;return r=n.indexOf("$")>-1?i(e,n,t):n.indexOf("%")>-1?a(e,n,t):n.indexOf(":")>-1?u(e,n):o(e._value,n,t)}function r(e,n){var t,r,i,a,u,o=n,c=["KB","MB","GB","TB","PB","EB","ZB","YB"],f=!1;if(n.indexOf(":")>-1)e._value=l(n);else if(n===b)e._value=0;else{for("."!==d[v].delimiters.decimal&&(n=n.replace(/\./g,"").replace(d[v].delimiters.decimal,".")),t=new RegExp("[^a-zA-Z]"+d[v].abbreviations.thousand+"(?:\\)|(\\"+d[v].currency.symbol+")?(?:\\))?)?$"),r=new RegExp("[^a-zA-Z]"+d[v].abbreviations.million+"(?:\\)|(\\"+d[v].currency.symbol+")?(?:\\))?)?$"),i=new RegExp("[^a-zA-Z]"+d[v].abbreviations.billion+"(?:\\)|(\\"+d[v].currency.symbol+")?(?:\\))?)?$"),a=new RegExp("[^a-zA-Z]"+d[v].abbreviations.trillion+"(?:\\)|(\\"+d[v].currency.symbol+")?(?:\\))?)?$"),u=0;u<=c.length&&!(f=n.indexOf(c[u])>-1&&Math.pow(1024,u+1));u++);e._value=(f?f:1)*(o.match(t)?Math.pow(10,3):1)*(o.match(r)?Math.pow(10,6):1)*(o.match(i)?Math.pow(10,9):1)*(o.match(a)?Math.pow(10,12):1)*(n.indexOf("%")>-1?.01:1)*((n.split("-").length+Math.min(n.split("(").length-1,n.split(")").length-1))%2?1:-1)*Number(n.replace(/[^0-9\.]+/g,"")),e._value=f?Math.ceil(e._value):e._value}return e._value}function i(e,n,t){var r,i,a=n.indexOf("$"),u=n.indexOf("("),l=n.indexOf("-"),c="";return n.indexOf(" $")>-1?(c=" ",n=n.replace(" $","")):n.indexOf("$ ")>-1?(c=" ",n=n.replace("$ ","")):n=n.replace("$",""),i=o(e._value,n,t),a<=1?i.indexOf("(")>-1||i.indexOf("-")>-1?(i=i.split(""),r=1,(a<u||a<l)&&(r=0),i.splice(r,0,d[v].currency.symbol+c),i=i.join("")):i=d[v].currency.symbol+c+i:i.indexOf(")")>-1?(i=i.split(""),i.splice(-1,0,c+d[v].currency.symbol),i=i.join("")):i=i+c+d[v].currency.symbol,i}function a(e,n,t){var r,i="",a=100*e._value;return n.indexOf(" %")>-1?(i=" ",n=n.replace(" %","")):n=n.replace("%",""),r=o(a,n,t),r.indexOf(")")>-1?(r=r.split(""),r.splice(-1,0,i+"%"),r=r.join("")):r=r+i+"%",r}function u(e){var n=Math.floor(e._value/60/60),t=Math.floor((e._value-60*n*60)/60),r=Math.round(e._value-60*n*60-60*t);return n+":"+(t<10?"0"+t:t)+":"+(r<10?"0"+r:r)}function l(e){var n=e.split(":"),t=0;return 3===n.length?(t+=60*Number(n[0])*60,t+=60*Number(n[1]),t+=Number(n[2])):2===n.length&&(t+=60*Number(n[0]),t+=Number(n[1])),Number(t)}function o(e,t,r){var i,a,u,l,o,c,f=!1,s=!1,h=!1,p="",m=!1,g=!1,y=!1,w=!1,x=!1,O="",M="",_=Math.abs(e),B=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],N="",$=!1;if(0===e&&null!==b)return b;if(t.indexOf("(")>-1?(f=!0,t=t.slice(1,-1)):t.indexOf("+")>-1&&(s=!0,t=t.replace(/\+/g,"")),t.indexOf("a")>-1&&(m=t.indexOf("aK")>=0,g=t.indexOf("aM")>=0,y=t.indexOf("aB")>=0,w=t.indexOf("aT")>=0,x=m||g||y||w,t.indexOf(" a")>-1?(p=" ",t=t.replace(" a","")):t=t.replace("a",""),_>=Math.pow(10,12)&&!x||w?(p+=d[v].abbreviations.trillion,e/=Math.pow(10,12)):_<Math.pow(10,12)&&_>=Math.pow(10,9)&&!x||y?(p+=d[v].abbreviations.billion,e/=Math.pow(10,9)):_<Math.pow(10,9)&&_>=Math.pow(10,6)&&!x||g?(p+=d[v].abbreviations.million,e/=Math.pow(10,6)):(_<Math.pow(10,6)&&_>=Math.pow(10,3)&&!x||m)&&(p+=d[v].abbreviations.thousand,e/=Math.pow(10,3))),t.indexOf("b")>-1)for(t.indexOf(" b")>-1?(O=" ",t=t.replace(" b","")):t=t.replace("b",""),u=0;u<=B.length;u++)if(i=Math.pow(1024,u),a=Math.pow(1024,u+1),e>=i&&e<a){O+=B[u],i>0&&(e/=i);break}return t.indexOf("o")>-1&&(t.indexOf(" o")>-1?(M=" ",t=t.replace(" o","")):t=t.replace("o",""),M+=d[v].ordinal(e)),t.indexOf("[.]")>-1&&(h=!0,t=t.replace("[.]",".")),l=e.toString().split(".")[0],o=t.split(".")[1],c=t.indexOf(","),o?(o.indexOf("[")>-1?(o=o.replace("]",""),o=o.split("["),N=n(e,o[0].length+o[1].length,r,o[1].length)):N=n(e,o.length,r),l=N.split(".")[0],N=N.split(".")[1].length?d[v].delimiters.decimal+N.split(".")[1]:"",h&&0===Number(N.slice(1))&&(N="")):l=n(e,null,r),l.indexOf("-")>-1&&(l=l.slice(1),$=!0),c>-1&&(l=l.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+d[v].delimiters.thousands)),0===t.indexOf(".")&&(l=""),(f&&$?"(":"")+(!f&&$?"-":"")+(!$&&s?"+":"")+l+N+(M?M:"")+(p?p:"")+(O?O:"")+(f&&$?")":"")}function c(e,n){d[e]=n}function f(e){var n=e.toString().split(".");return n.length<2?1:Math.pow(10,n[1].length)}function s(){var e=Array.prototype.slice.call(arguments);return e.reduce(function(e,n){var t=f(e),r=f(n);return t>r?t:r},-(1/0))}var h,p="1.5.3",d={},v="en",b=null,m="0,0";"undefined"!=typeof module&&module.exports;return h=function(n){return h.isNumeral(n)?n=n.value():0===n||"undefined"==typeof n?n=0:Number(n)||(n=h.fn.unformat(n)),new e(Number(n))},h.version=p,h.isNumeral=function(n){return n instanceof e},h.language=function(e,n){if(!e)return v;if(e&&!n){if(!d[e])throw new Error("Unknown language : "+e);v=e}return!n&&d[e]||c(e,n),h},h.languageData=function(e){if(!e)return d[v];if(!d[e])throw new Error("Unknown language : "+e);return d[e]},h.language("en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var n=e%10;return 1===~~(e%100/10)?"th":1===n?"st":2===n?"nd":3===n?"rd":"th"},currency:{symbol:"$"}}),h.zeroFormat=function(e){b="string"==typeof e?e:null},h.defaultFormat=function(e){m="string"==typeof e?e:"0.0"},"function"!=typeof Array.prototype.reduce&&(Array.prototype.reduce=function(e,n){"use strict";if(null===this||"undefined"==typeof this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof e)throw new TypeError(e+" is not a function");var t,r,i=this.length>>>0,a=!1;for(1<arguments.length&&(r=n,a=!0),t=0;i>t;++t)this.hasOwnProperty(t)&&(a?r=e(r,this[t],t,this):(r=this[t],a=!0));if(!a)throw new TypeError("Reduce of empty array with no initial value");return r}),h.fn=e.prototype={clone:function(){return h(this)},format:function(e,n){return t(this,e?e:m,void 0!==n?n:Math.round)},unformat:function(e){return"[object Number]"===Object.prototype.toString.call(e)?e:r(this,e?e:m)},value:function(){return this._value},valueOf:function(){return this._value},set:function(e){return this._value=Number(e),this},add:function(e){function n(e,n,r,i){return e+t*n}var t=s.call(null,this._value,e);return this._value=[this._value,e].reduce(n,0)/t,this},subtract:function(e){function n(e,n,r,i){return e-t*n}var t=s.call(null,this._value,e);return this._value=[e].reduce(n,this._value*t)/t,this},multiply:function(e){function n(e,n,t,r){var i=s(e,n);return e*i*(n*i)/(i*i)}return this._value=[this._value,e].reduce(n,1),this},divide:function(e){function n(e,n,t,r){var i=s(e,n);return e*i/(n*i)}return this._value=[this._value,e].reduce(n),this},difference:function(e){return Math.abs(h(this._value).subtract(e).value())}},h}),define("i18n/number",["i18n/main!i18n/number/languages","i18n/number/base/numeral"],function(e,n){"use strict";function t(e){return n.apply(this,arguments)}n.language("current",e),n.language("current");var r=Array.prototype.slice,i=["languageData","format"];return i.forEach(function(e){t[e]=function(){var t=r.call(arguments);return n[e].apply(n,t)}}),t});