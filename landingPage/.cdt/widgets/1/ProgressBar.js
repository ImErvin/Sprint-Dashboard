/* Copyright (c) Ericsson 2019 */

define("styles!widgets/ProgressBar/_progressBar.less",function(){return".elWidgets-ProgressBar-bar {\n  display: inline-block;\n  border-radius: 9px;\n}\n.elWidgets-ProgressBar-fill {\n  border-radius: 9px;\n  height: 100%;\n  background: #953882;\n}\n.elWidgets-ProgressBar-fill_color_purple {\n  background: #953882;\n}\n.elWidgets-ProgressBar-fill_color_red {\n  background: #e32119;\n}\n.elWidgets-ProgressBar-fill_color_orange {\n  background: #f08a00;\n}\n.elWidgets-ProgressBar-fill_color_yellow {\n  background: #fabb00;\n}\n.elWidgets-ProgressBar-fill_color_green {\n  background: #89ba17;\n}\n.elWidgets-ProgressBar-fill_color_darkGreen {\n  background: #33817f;\n}\n.elWidgets-ProgressBar-fill_color_paleBlue {\n  background: #00a9d4;\n}\n"}),define("template!widgets/ProgressBar/_progressBar.hbs",["jscore/handlebars/handlebars"],function(e){return e.template(function(e,r,s,t,n){function o(e,r){var t,n,o="";return o+=" ebIcon_",(n=s.icon)?t=n.call(e,{hash:{}}):(n=e&&e.icon,t=typeof n===g?n.call(e,{hash:{}}):n),o+=c(t)}function i(e,r){var t,n;return(n=s.label)?t=n.call(e,{hash:{}}):(n=e&&e.label,t=typeof n===g?n.call(e,{hash:{}}):n),c(t)}this.compilerInfo=[4,">= 1.0.0"],s=this.merge(s,e.helpers);var l,a="",g="function",c=this.escapeExpression,d=this;return a+='<div class="ebProgressBar">\n\t<div class="ebProgressBar-header" style="display:none;">\n\t\t<span class="ebProgressBar-icon">\n\t\t\t<i class="ebIcon',l=s.if.call(r,r&&r.icon,{hash:{},inverse:d.noop,fn:d.program(1,o,n)}),(l||0===l)&&(a+=l),a+='"></i>\n\t\t</span>\n\t\t<span class="ebProgressBar-label">',l=s.if.call(r,r&&r.label,{hash:{},inverse:d.noop,fn:d.program(3,i,n)}),(l||0===l)&&(a+=l),a+='</span>\n\t</div>\n\t<div class="ebProgressBar-content">\n\t\t<div class="elWidgets-ProgressBar-bar ebProgressBar-bar">\n            <div class="elWidgets-ProgressBar-fill"></div>\n        </div>\n\t\t<span class="ebProgressBar-value"></span>\n\t</div>\n</div>\n'})}),define("widgets/ProgressBar/ProgressBarView",["jscore/core","template!./_progressBar.hbs","styles!./_progressBar.less"],function(e,r,s){"use strict";var t=e.View.extend({iconModifier:null,getTemplate:function(){return r(this.options)},getStyle:function(){return s},getIconParent:function(){return this.getElement().find("."+t.EL_ICON_PARENT)},getIcon:function(){var e=this.getIconParent();return e.find("."+t.EL_ICON)},getLabel:function(){return this.getElement().find("."+t.EL_LABEL)},getHeader:function(){return this.getElement().find("."+t.EL_HEADER)},getBar:function(){return this.getElement().find("."+t.EL_BAR)},getFill:function(){return this.getElement().find("."+t.EL_FILL)},getProgressValue:function(){return this.getElement().find("."+t.EL_VALUE)},setValue:function(e,r){this.getFill().setStyle("width",e+"%"),this.getProgressValue().setText(r)},setLabel:function(e){var r=this.getLabel();r.setText(e),this.showHeader()},setIcon:function(e){var r=this.getIcon();this.iconModifier&&r.removeModifier(this.iconModifier),this.iconModifier=e,r.setModifier(e),"none"===r.getStyle("display")&&r.setStyle("display","inline-block"),this.showHeader()},showHeader:function(){var e=this.getHeader();"none"===e.getStyle("display")&&this.toggleElement(e)},toggleElement:function(e){"none"===e.getStyle("display")?e.setStyle("display","block"):e.setStyle("display","none")}},{EL_HEADER:"ebProgressBar-header",EL_ICON_PARENT:"ebProgressBar-icon",EL_LABEL:"ebProgressBar-label",EL_VALUE:"ebProgressBar-value",EL_BAR:"ebProgressBar-bar",EL_FILL:"elWidgets-ProgressBar-fill",EL_ICON:"ebIcon"});return t}),define("widgets/ProgressBar/ProgressBar",["widgets/WidgetCore","./ProgressBarView"],function(e,r){"use strict";return e.extend({view:function(){return new r(this.options)},init:function(e){this.options=e||{}},onViewReady:function(){var e=this.options;this.setColor(e.color||"purple"),this.setValue(void 0!==e.value?e.value:5);var r=this.view;r.iconModifier=e.icon,(e.label||e.icon)&&r.showHeader(),e.icon||r.toggleElement(r.getIcon())},setColor:function(e){var r=this.view.getFill(),s=this.view.getProgressValue();0===e.indexOf("#")?(r.setStyle("background-color",e),s.setStyle("color",e)):(r.removeStyle("background-color"),s.removeStyle("color"),r.setModifier("color",e),s.setModifier("color",e))},setValue:function(e){if(void 0===e||"number"!=typeof e)throw new Error("You must specify value and it should be number.");e=e>=100?100:e<0?0:e;var r,s=this.options.getProgressLabel;r="function"==typeof s?s(e):e+"%",this.view.setValue(e,r)},setLabel:function(e){if(!e||"string"!=typeof e)throw new Error("You must enter valid label.");this.view.setLabel(e)},setIcon:function(e){if(!e||"string"!=typeof e)throw new Error("You must specify valid icon.");this.view.setIcon(e)}})}),define("widgets/ProgressBar",["widgets/ProgressBar/ProgressBar"],function(e){return e});