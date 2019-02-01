/* Copyright (c) Ericsson 2019 */

define("template!widgets/ThresholdBar/axis/_axis.hbs",["jscore/handlebars/handlebars"],function(e){return e.template(function(e,t,i,r,s){function n(e,t){var r,s,n="";return n+='\n        <div class="ebThresholdBar-tick">\n            <div class="ebThresholdBar-label">',(s=i.label)?r=s.call(e,{hash:{}}):(s=e&&e.label,r=typeof s===h?s.call(e,{hash:{}}):s),n+=l(r)+"</div>\n        </div>\n    "}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers);var a,o="",h="function",l=this.escapeExpression,d=this;return o+='<div class="ebThresholdBar-ticks">\n    ',a=i.each.call(t,t&&t.labels,{hash:{},inverse:d.noop,fn:d.program(1,n,s)}),(a||0===a)&&(o+=a),o+="\n</div>\n"})}),define("widgets/ThresholdBar/axis/AxisView",["jscore/core","template!./_axis.hbs"],function(e,t){return e.View.extend({getTemplate:function(){return t(this.options)},getNotchArea:function(){return this.getElement()}})}),define("widgets/ThresholdBar/axis/Axis",["jscore/core","./AxisView"],function(e,t){return e.Widget.extend({view:function(){var e,i=[],r=this.options,s=r.labels.getAxisLabel,n=r.labels.count,a=!1;if("function"==typeof s&&(a=!0),a)for(e=1;e<=n;e++)i.push({label:s(e)});else{var o=r.min,h=r.max,l=h-o,d=l/(n-1),c=o;for(e=0;e<n;e++)i.push({label:Math.round(c)}),c+=d}return new t({labels:i})}})}),define("template!widgets/ThresholdBar/_thresholdBar.hbs",["jscore/handlebars/handlebars"],function(e){return e.template(function(e,t,i,r,s){function n(e,t){return" ebThresholdBar_floating_label"}function a(e,t){return" ebThresholdBar_ticks_wrap"}function o(e,t){var r,s,n="";return n+='\n                    <div class="ebThresholdBar-range ebBgColor_',(s=i.color)?r=s.call(e,{hash:{}}):(s=e&&e.color,r=typeof s===f?s.call(e,{hash:{}}):s),n+=u(r)+'"></div>\n                '}function h(e,t,r){var s,n="";return n+='\n                    <div class="ebThresholdBar-bar">\n                        ',s=i.if.call(e,(s=r&&r.labels,null==s||s===!1?s:s.tooltips),{hash:{},inverse:v.noop,fn:v.program(8,l,t)}),(s||0===s)&&(n+=s),n+="\n                    </div>\n                "}function l(e,t){return'\n                            <span class="ebThresholdBar-barLabel"></span>\n                        '}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers);var d,c="",f="function",u=this.escapeExpression,v=this;return c+='<div class="ebThresholdBar',d=i.if.call(t,t&&t.animateLabel,{hash:{},inverse:v.noop,fn:v.program(1,n,s)}),(d||0===d)&&(c+=d),d=i.if.call(t,t&&t.wrapLabel,{hash:{},inverse:v.noop,fn:v.program(3,a,s)}),(d||0===d)&&(c+=d),c+='">\n    <div class="ebThresholdBar-labels">\n        <div class="ebThresholdBar-prefix">'+u((d=t&&t.labels,d=null==d||d===!1?d:d.prefix,typeof d===f?d.apply(t):d))+'</div>\n        <div class="ebThresholdBar-postfix">'+u((d=t&&t.labels,d=null==d||d===!1?d:d.postfix,typeof d===f?d.apply(t):d))+'</div>\n    </div>\n    <div class="ebThresholdBar-track">\n        <div class="ebThresholdBar-trackBody">\n            <div class="ebThresholdBar-rangeArea ebThresholdBar-rangeArea_resize">\n                ',d=i.each.call(t,t&&t.thresholds,{hash:{},inverse:v.noop,fn:v.program(5,o,s)}),(d||0===d)&&(c+=d),c+='\n            </div>\n            <div class="ebThresholdBar-bars">\n                ',d=i.each.call(t,t&&t.dividers,{hash:{},inverse:v.noop,fn:v.programWithDepth(7,h,s,t)}),(d||0===d)&&(c+=d),c+='\n            </div>\n        </div>\n        <div class="ebThresholdBar-trackAxis"></div>\n    </div>\n</div>\n'})}),define("widgets/ThresholdBar/ThresholdBarView",["jscore/core","template!./_thresholdBar.hbs"],function(e,t){return e.View.extend({getTemplate:function(){return t(this.options)},getAxis:function(){return this.getElement().find(".ebThresholdBar-trackAxis")},getTrackBody:function(){return this.getElement().find(".ebThresholdBar-trackBody")},getTrack:function(){return this.getElement().find(".ebThresholdBar-track")},getPrefix:function(){return this.getElement().find(".ebThresholdBar-prefix")},getPostfix:function(){return this.getElement().find(".ebThresholdBar-postfix")},getRangeArea:function(){return this.getTrackBody().find(".ebThresholdBar-rangeArea")},getAllBars:function(){return this.getTrackBody().findAll(".ebThresholdBar-bar")},setPosition:function(e,t){e.setStyle("left",t)},setRangeArea:function(e){this.getRangeArea().setStyle("width",e+"px")},getThresholds:function(){return this.getRangeArea().findAll(".ebThresholdBar-range")},setBarLabel:function(e,t){var i=e.find(".ebThresholdBar-barLabel");i.setText(t);var r=i.getProperty("offsetWidth");i.setStyle("left",-(.5*r))}})}),define("widgets/ThresholdBar/ThresholdBar",["jscore/core","./ThresholdBarView","./axis/Axis","jscore/ext/privateStore","jscore/ext/utils"],function(e,t,i,r,s){"use strict";function n(){var e=s.clone(this.view.getThresholds(),!1);e.pop();var t=this.options.thresholds;e.forEach(function(e,i){e.setStyle("max-width",d.call(this,t[i].value)+"px")}.bind(this))}function a(e){var t=this.view.getAllBars();e.forEach(function(e,i){c.call(this,d.call(this,o.call(this,e)),t[i])}.bind(this))}function o(e){return e=Math.min(e,u(this).max),Math.max(e,u(this).min)}function h(){var e=new i({min:u(this).min,max:u(this).max,labels:u(this).labels});e.attachTo(this.view.getAxis())}function l(e){return Math.round(e/u(this).trackBodyLength*u(this).range+u(this).min)}function d(e){return(e-u(this).min)/u(this).range*u(this).trackBodyLength}function c(e,t){if(this.view.setPosition(t,e),u(this).labels.tooltips){var i=!1,r=u(this).labels.getDividerLabel;"function"==typeof r&&(i=!0);var s=l.call(this,e);i&&(s=r(s)),this.view.setBarLabel(t,s)}}function f(){var e=this.view.getThresholds(),t=e.length;e.forEach(function(e){e.setStyle("z-index",t),t--})}var u=r.create(),v=2,b=0;return e.Widget.extend({view:function(){var e=this.options,i=e.thresholds||[];0===i.length&&i.push({color:"paleBlue_60"});var r=u(this).labels;return r.tooltips=void 0===r.tooltips||r.tooltips===!0,new t({animateLabel:e.animateLabel,wrapLabel:e.wrapLabel,labels:r,thresholds:i,dividers:Array.isArray(e.dividers)?e.dividers:[]})},init:function(){var e=this.options;u(this).min=e.min||b,u(this).max=e.max,u(this).range=u(this).max-u(this).min;var t=u(this).labels=s.clone(e.labels,!0);0===t.count||t.count>1||(t.count=v)},onViewReady:function(){h.call(this),f.call(this)},onDOMAttach:function(){var t=this.view,i=t.getTrack();if(u(this).trackBodyLength=i.getProperty("offsetWidth"),u(this).windowEvtId||(u(this).windowEvtId=e.Window.addEventHandler("resize",function(){var e=i.getProperty("offsetWidth");u(this).trackBodyLength!==e&&this.redraw()}.bind(this))),u(this).currentValues)this.redraw();else{var r=this.options.value,s=this.options.dividers,o=void 0===r?u(this).min:r;this.setValue(o),n.call(this),Array.isArray(s)&&a.call(this,s),requestAnimationFrame(function(){t.getRangeArea().removeModifier("resize")})}},onDestroy:function(){u(this).windowEvtId&&(e.Window.removeEventHandler(u(this).windowEvtId),delete u(this).windowEvtId)},redraw:function(){u(this).trackBodyLength=this.view.getTrack().getProperty("offsetWidth");var e=this.view.getRangeArea();e.setModifier("resize"),this.setValue(u(this).currentValues),n.call(this);var t=this.options.dividers;Array.isArray(t)&&a.call(this,t),requestAnimationFrame(function(){e.removeModifier("resize")})},setPrefix:function(e){this.view.getPrefix().setText(e)},setPostfix:function(e){this.view.getPostfix().setText(e)},getValue:function(){return u(this).currentValues},setValue:function(e){if(isNaN(e)||""===e)return void console.error("Value is not a number");var t=o.call(this,e);if(this.view.setRangeArea(d.call(this,t)),u(this).currentValues=t,u(this).labels.tooltips!==!1){var i=u(this).labels.getTooltipLabel;"function"==typeof i&&(t=i(t)),this.view.getRangeArea().setAttribute("title",t)}}})}),define("widgets/ThresholdBar",["widgets/ThresholdBar/ThresholdBar"],function(e){return e});