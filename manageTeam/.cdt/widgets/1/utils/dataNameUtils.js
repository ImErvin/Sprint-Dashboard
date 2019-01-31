/* Copyright (c) Ericsson 2019 */

define("widgets/utils/dataNameUtils",["jscore/core"],function(t){"use strict";return{prefix:"",translate:function(e,i,a){return"string"==typeof i&&(i=t.Element.parse(i)),this.prefix=e,this.translateElement.call(this,i,a,!0),this.translateChildren.call(this,i,a),i},translateElement:function(t,e,i){i&&(void 0!==this.prefix&&null!==this.prefix||(this.prefix=t.getAttribute("data-namespace"),t.getNative().removeAttribute("data-namespace"),t.setAttribute("class",this.prefix)));var a=t.getAttribute("data-name"),r=t.getAttribute("data-type"),s=t.getAttribute("class");if(s=void 0!==s?s.split(" "):[],r&&(s.push(this.namespace+"-"+r),t.getNative().removeAttribute("data-type"),void 0===e[r]&&(e[r]=[]),e[r].push(t)),a){if(s.push(this.prefix+"-"+a),void 0!==e[a])throw new Error("Name already in use: "+a);e[a]=t,t.getNative().removeAttribute("data-name")}t.setAttribute("class",s.join(" ")),i&&a&&(this.prefix=this.prefix+"-"+a)},translateChildren:function(t,e){for(var i=t.children(),a=0,r=i.length;a<r;a++){var s=i[a];this.translateElement.call(this,s,e,!1),s.children().length>0&&this.translateChildren.call(this,s,e)}}}});