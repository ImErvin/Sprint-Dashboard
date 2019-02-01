/* Copyright (c) Ericsson 2019 */

define("widgets/utils/keyboardUtils",[],function(){"use strict";var e={},t={BACKSPACE:8,TAB:9,ENTER:13,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46},i=function(t,i){var n,r=t.originalEvent.keyCode;if(Object.keys(i).some(function(t){if(e[t.toUpperCase()]===r)return n=i[t],!0}),n)return n(t)},n=function(e,t){if(!e||!t)throw new Error("Missing event argument");return e.addEventHandler("keydown",function(e){return i(e,t)})},r=function(e,t){t&&e.removeEventHandler(t)};return Object.keys(t).forEach(function(i){Object.defineProperty(e,i,{value:t[i],writable:!1})}),e.addKeyHandler=n,e.removeKeyHandler=r,e}),define("widgets/utils/textUtils",[],function(){"use strict";var e={getTextWidth:function(t,i){var n=e.getTextWidth.canvas||(e.getTextWidth.canvas=document.createElement("canvas")),r=n.getContext("2d");r.font=i;var o=r.measureText(t);return Math.round(o.width)}};return e}),define("template!widgets/Switcher/_switcher.html",["jscore/handlebars/handlebars"],function(e){return e.template(function(e,t,i,n,r){function o(e,t){var n,r,o="";return o+=' style="width: ',(r=i.width)?n=r.call(e,{hash:{}}):(r=e&&e.width,n=typeof r===f?r.call(e,{hash:{}}):r),o+=d(n)+';"'}function s(e,t){return"checked"}function a(e,t){var n,r,o="";return o+=" ",(r=i.onLabel)?n=r.call(e,{hash:{}}):(r=e&&e.onLabel,n=typeof r===f?r.call(e,{hash:{}}):r),o+=d(n)+" "}function c(e,t){var n,r,o="";return o+=" ",(r=i.offLabel)?n=r.call(e,{hash:{}}):(r=e&&e.offLabel,n=typeof r===f?r.call(e,{hash:{}}):r),o+=d(n)+" "}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers);var l,h="",f="function",d=this.escapeExpression,u=this;return h+='<div class="ebSwitcher" ',l=i.if.call(t,t&&t.width,{hash:{},inverse:u.noop,fn:u.program(1,o,r)}),(l||0===l)&&(h+=l),h+=' tabindex="0">\n    <input type="checkbox" class="ebSwitcher-checkbox" ',l=i.if.call(t,t&&t.value,{hash:{},inverse:u.noop,fn:u.program(3,s,r)}),(l||0===l)&&(h+=l),h+='/>\n    <div class="ebSwitcher-body">\n        <div class="ebSwitcher-onLabel">',l=i.if.call(t,t&&t.onLabel,{hash:{},inverse:u.noop,fn:u.program(5,a,r)}),(l||0===l)&&(h+=l),h+='</div>\n        <div class="ebSwitcher-switch"></div>\n        <div class="ebSwitcher-offLabel">',l=i.if.call(t,t&&t.offLabel,{hash:{},inverse:u.noop,fn:u.program(7,c,r)}),(l||0===l)&&(h+=l),h+="</div>\n    </div>\n</div> "})}),define("widgets/Switcher/SwitcherView",["jscore/core","template!./_switcher.html"],function(e,t){"use strict";var i=e.View.extend({getTemplate:function(){return t(this.options)},getCheckbox:function(){return this.getElement().find("."+i.EL_CHECKBOX)},getOnLabel:function(){return this.getElement().find("."+i.EL_ONLABEL)},getOffLabel:function(){return this.getElement().find("."+i.EL_OFFLABEL)},getLabel:function(){var e=this.getCheckbox(),t=null;return t=e.getProperty("checked")?this.getOnLabel().getText():this.getOffLabel().getText()},getValue:function(){var e=this.getCheckbox();return!!e.getProperty("checked")},setValue:function(e){var t=this.getCheckbox();t.setProperty("checked",e)},setWidth:function(e){this.getElement().setStyle("width",e)},setColor:function(e){var t=this.getOnLabel(),i=this.getOffLabel();for(var n in e){var r=e[n];switch(n){case"onColor":0!==r.indexOf("#")?t.setModifier(r,void 0,"ebBgColor"):t.setStyle("background-color",r);break;case"offColor":0!==r.indexOf("#")?i.setModifier(r,void 0,"ebBgColor"):i.setStyle("background-color",r)}}}},{EL_CHECKBOX:"ebSwitcher-checkbox",EL_ONLABEL:"ebSwitcher-onLabel",EL_OFFLABEL:"ebSwitcher-offLabel"});return i}),define("widgets/Switcher/Switcher",["widgets/WidgetCore","./SwitcherView","../utils/textUtils","widgets/utils/keyboardUtils","jscore/ext/privateStore"],function(e,t,i,n,r){"use strict";var o=r.create();return e.extend({view:function(){return new t(this.options)},init:function(e){if(this.options=e||{},o(this).enabled=!0,!(e.onLabel&&""!==e.onLabel||e.offLabel&&""!==e.offLabel))throw new Error("You must specify a on/off label")},onViewReady:function(){var e=this.options;(e.onColor||e.offColor)&&this.setColor(e);var t=this.getElement();t.addEventHandler("click",function(){if(o(this).enabled){var e=this.view.getCheckbox();e.setProperty("checked",!e.getProperty("checked")),this.trigger("change")}}.bind(this)),t.addEventHandler("keydown",function(e){if(e.originalEvent.keyCode===n.SPACE&&o(this).enabled){e.preventDefault();var t=this.view.getCheckbox();t.setProperty("checked",!t.getProperty("checked")),this.trigger("change")}},this),e.enabled===!1&&this.disable()},onDOMAttach:function(){this.setWidth()},setWidth:function(){var e,t,n,r=this.getElement(),o=r.getStyle("font-size")+" "+r.getStyle("font-family"),s=this.options;e=i.getTextWidth(s.offLabel,o),t=i.getTextWidth(s.onLabel,o),n=e>t?e:t,n=n+24+14,this.view.setWidth(n)},getValue:function(){return this.view.getValue()},getLabel:function(){return this.view.getLabel()},setValue:function(e){if("boolean"!=typeof e)throw new Error("Value need to be true or false.");this.view.setValue(e)},setColor:function(e){if(!e||"object"!=typeof e)throw new Error("Colors need to be specify.");this.view.setColor(e)},enable:function(){var e=this.getElement();e.removeModifier("disabled"),e.setAttribute("tabindex","0"),o(this).enabled=!0},disable:function(){var e=this.getElement();e.setModifier("disabled"),e.removeAttribute("tabindex"),o(this).enabled=!1},restore:function(){var e=this.options.value;e?this.setValue(e):this.setValue(!1)}})}),define("widgets/Switcher",["widgets/Switcher/Switcher"],function(e){return e});