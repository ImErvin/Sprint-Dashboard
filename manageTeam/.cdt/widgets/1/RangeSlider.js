/* Copyright (c) Ericsson 2019 */

define("widgets/utils/keyboardUtils",[],function(){"use strict";var t={},e={BACKSPACE:8,TAB:9,ENTER:13,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46},i=function(e,i){var n,s=e.originalEvent.keyCode;if(Object.keys(i).some(function(e){if(t[e.toUpperCase()]===s)return n=i[e],!0}),n)return n(e)},n=function(t,e){if(!t||!e)throw new Error("Missing event argument");return t.addEventHandler("keydown",function(t){return i(t,e)})},s=function(t,e){e&&t.removeEventHandler(e)};return Object.keys(e).forEach(function(i){Object.defineProperty(t,i,{value:e[i],writable:!1})}),t.addKeyHandler=n,t.removeKeyHandler=s,t}),define("template!widgets/RangeSlider/axis/_axis.hbs",["jscore/handlebars/handlebars"],function(t){return t.template(function(t,e,i,n,s){function a(t,e){var n,s,a="";return a+='\n        <div class="ebRangeSlider-tick">\n            <div class="ebRangeSlider-label">',(s=i.label)?n=s.call(t,{hash:{}}):(s=t&&t.label,n=typeof s===l?s.call(t,{hash:{}}):s),a+=h(n)+"</div>\n        </div>\n    "}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,t.helpers);var r,o="",l="function",h=this.escapeExpression,c=this;return o+='<div class="ebRangeSlider-ticks">\n    ',r=i.each.call(e,e&&e.labels,{hash:{},inverse:c.noop,fn:c.program(1,a,s)}),(r||0===r)&&(o+=r),o+="\n</div>\n"})}),define("widgets/RangeSlider/axis/AxisView",["jscore/core","template!./_axis.hbs"],function(t,e){return t.View.extend({getTemplate:function(){return e(this.options)},getNotchArea:function(){return this.getElement()}})}),define("widgets/RangeSlider/axis/Axis",["jscore/core","./AxisView"],function(t,e){return t.Widget.extend({view:function(){var t,i=[],n=this.options.labels.getAxisLabel,s=this.options.labels.count,a=!1;if("function"==typeof n&&(a=!0),a)for(t=1;t<=s;t++)i.push({label:n(t)});else{var r=this.options.min,o=this.options.max,l=o-r,h=l/(s-1),c=r;for(t=0;t<s;t++)i.push({label:Math.round(c)}),c+=h}return new e({labels:i})}})}),define("template!widgets/RangeSlider/_rangeSlider.hbs",["jscore/handlebars/handlebars"],function(t){return t.template(function(t,e,i,n,s){function a(t,e){return" ebRangeSlider_floating_label"}function r(t,e){return" ebRangeSlider_ticks_wrap"}function o(t,e){return'\n                <div class="ebRangeSlider-range"></div>\n            '}function l(t,e){return' ebRangeSlider-thumb_Min" tabindex="0">\n            <span class="ebRangeSlider-thumbLabel"></span></button>\n            <button type="button" class="ebRangeSlider-thumb ebRangeSlider-thumb_Max '}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,t.helpers);var h,c="",u=this,d="function",v=this.escapeExpression;return c+='<div class="ebRangeSlider',h=i.if.call(e,e&&e.animateLabel,{hash:{},inverse:u.noop,fn:u.program(1,a,s)}),(h||0===h)&&(c+=h),h=i.if.call(e,e&&e.wrapLabel,{hash:{},inverse:u.noop,fn:u.program(3,r,s)}),(h||0===h)&&(c+=h),c+='">\n    <div class="ebRangeSlider-labels">\n        <div class="ebRangeSlider-prefix">'+v((h=e&&e.labels,h=null==h||h===!1?h:h.prefix,typeof h===d?h.apply(e):h))+'</div>\n        <div class="ebRangeSlider-postfix">'+v((h=e&&e.labels,h=null==h||h===!1?h:h.postfix,typeof h===d?h.apply(e):h))+'</div>\n    </div>\n    <div class="ebRangeSlider-track">\n        <div class="ebRangeSlider-trackBody">\n            ',h=i.if.call(e,e&&e.showTrack,{hash:{},inverse:u.noop,fn:u.program(5,o,s)}),(h||0===h)&&(c+=h),c+='\n            <button type="button" class="ebRangeSlider-thumb',h=i.if.call(e,e&&e.range,{hash:{},inverse:u.noop,fn:u.program(7,l,s)}),(h||0===h)&&(c+=h),c+='" tabindex="0">\n            <span class="ebRangeSlider-thumbLabel"></span></button>\n        </div>\n        <div class="ebRangeSlider-trackAxis"></div>\n    </div>\n</div>\n'})}),define("widgets/RangeSlider/RangeSliderView",["jscore/core","template!./_rangeSlider.hbs"],function(t,e){return t.View.extend({getTemplate:function(){return e(this.options)},getAxis:function(){return this.getElement().find(".ebRangeSlider-trackAxis")},getTrackBody:function(){return this.getElement().find(".ebRangeSlider-trackBody")},getTrack:function(){return this.getElement().find(".ebRangeSlider-track")},setCustomSize:function(t){this.getElement().setStyle("width",t+"px")},getPrefix:function(){return this.getElement().find(".ebRangeSlider-prefix")},getPostfix:function(){return this.getElement().find(".ebRangeSlider-postfix")},getInnerTrack:function(){return this.getTrackBody().find(".ebRangeSlider-range")},setTrack:function(t,e){var i=this.getInnerTrack();i.setStyle("left",t),i.setStyle("width",e)},getSingleThumb:function(){return this.getTrackBody().find(".ebRangeSlider-thumb")},getMinThumb:function(){return this.getTrackBody().find(".ebRangeSlider-thumb_Min")},getMaxThumb:function(){return this.getTrackBody().find(".ebRangeSlider-thumb_Max")},setPosition:function(t,e){t.setStyle("left",e)},setThumbLabel:function(t,e){var i=t.find(".ebRangeSlider-thumbLabel");i.setText(e);var n=i.getProperty("offsetWidth");i.setStyle("left",-(.5*n))},getThumbPosition:function(t){return t.getProperty("offsetLeft")}})}),define("widgets/RangeSlider/RangeSlider",["jscore/core","./RangeSliderView","./axis/Axis","jscore/ext/privateStore","widgets/utils/keyboardUtils","jscore/ext/utils"],function(t,e,i,n,s,a){"use strict";function r(t){var e=k(this).innerTrack.startAt;return e<=k(this).min?0:e>=k(this).max?t:x.call(this,e)+V}function o(t){for(var e=k(this).items,i=0;i<e.length;i++){var n=e[i];if(t.name===n.name&&t.value===n.value)return i}return-1}function l(t){var e=function(t){return t.hasModifier("Min")?k(this).minPixelPosition:t.hasModifier("Max")?k(this).maxPixelPosition:k(this).thumbPosition},i=function(i){var n=e.call(this,t),s=k(this).trackBodyLength,a=p.call(this,n),r=a+k(this).step,o=Math.min(x.call(this,r),s);E.call(this,o,t),i.preventDefault()}.bind(this),n=function(i){var n=e.call(this,t),s=p.call(this,n),a=s-k(this).step,r=Math.max(0,x.call(this,a));E.call(this,r,t),i.preventDefault()}.bind(this),a=function(e){E.call(this,k(this).trackBodyLength,t),e.preventDefault()}.bind(this),r=function(e){E.call(this,0,t),e.preventDefault()}.bind(this);s.addKeyHandler(t,{arrow_left:n,arrow_right:i,arrow_up:i,arrow_down:n,home:r,end:a})}function h(t){var e=p.call(this,t);if(k(this).numeric)return e;var i=k(this).items[e];return{name:i.name,value:i.value}}function c(){var t=k(this).minPixelPosition,e=k(this).maxPixelPosition;return h.call(this,t>e?t:e)}function u(){var t=k(this).minPixelPosition,e=k(this).maxPixelPosition;return h.call(this,t>e?e:t)}function d(t){f.call(this,t,this.view.getMinThumb(),this.view.getMaxThumb())}function v(t){f.call(this,t,this.view.getMaxThumb(),this.view.getMinThumb())}function f(t,e,i){if(isNaN(t)||""===t)return void console.error("Value is not a number");var n=x.call(this,m.call(this,t));E.call(this,n,k(this).minPixelPosition<=k(this).maxPixelPosition?e:i)}function g(t){return isNaN(t)||""===t?void console.error("Value is not a number"):void E.call(this,x.call(this,m.call(this,t)),this.view.getSingleThumb())}function m(t){return t=Math.min(t,k(this).max),Math.max(t,k(this).min)}function b(){var t=new i({min:k(this).min,max:k(this).max,labels:k(this).labels});t.attachTo(this.view.getAxis())}function p(t){return Math.round(t/k(this).trackBodyLength*k(this).range+k(this).min)}function x(t){return(t-k(this).min)/k(this).range*k(this).trackBodyLength}function w(t){t.addEventHandler("mousedown touchstart",P.bind(this,t))}function P(e,i){var n=t.Element.wrap(document.body),s=i.originalEvent,a=void 0!==s.touches?s.touches[0].clientX:s.clientX;k(this).initialPositionXOnTarget=a-e.getPosition().left,k(this).bodyMoveEvtId=n.addEventHandler("mousemove touchmove",R.bind(this,e)),k(this).bodyMoveEndEvtId=n.addEventHandler("mouseup mouseleave touchend",y.bind(this))}function R(t,e){e.preventDefault();var i=e.originalEvent,n=void 0!==i.touches?i.touches[0].clientX:i.clientX,s=n-t.getPosition().left-k(this).initialPositionXOnTarget;this.trigger("thumbdrag",S.call(this,s,t),t)}function y(){var e=t.Element.wrap(document.body);k(this).bodyMoveEvtId&&e.removeEventHandler(k(this).bodyMoveEvtId),k(this).bodyMoveEndEvtId&&e.removeEventHandler(k(this).bodyMoveEndEvtId);var i=this.getValue();this.trigger("change",i),k(this).currentValues=i}function S(t,e){var i=this.view.getThumbPosition(e)+t;if(k(this).snap===!0){var n=x.call(this,k(this).step+k(this).min);i=Math.floor(i/n)*n}var s=k(this).trackBodyLength;return i<0?0:i>s?s:i}function E(t,e){this.view.setPosition(e,t+V);var i=!1,n=k(this).labels.getThumbLabel;"function"==typeof n&&(i=!0);var s=p.call(this,t);return k(this).numeric||(s=k(this).items[s],i||(s=s.name)),i&&(s=n(s)),this.view.setThumbLabel(e,s),e.hasModifier("Min")?(k(this).minPixelPosition=t,void T.call(this)):e.hasModifier("Max")?(k(this).maxPixelPosition=t,void T.call(this)):(k(this).thumbPosition=t,void(k(this).singleTrack&&T.call(this)))}function T(){var t,e=k(this).thumbPosition;if(void 0!==e){var i=k(this).startAt,n=e+V;return t=n-i,n<i&&(i=n,t=-t),void this.view.setTrack(i,t)}var s=k(this).maxPixelPosition,a=k(this).minPixelPosition;return t=s-a,a>s?void this.view.setTrack(s+V,-t):void this.view.setTrack(a+V,t)}var k=n.create(),M=2,A=0,L=16,V=.5*L;return t.Widget.extend({view:function(){var t=this.options,i=!1;k(this).isRange=t.range;var n=k(this).innerTrack=t.innerTrack;return k(this).isRange===!0?i=!0:k(this).singleTrack=i=void 0!==n&&void 0!==n.startAt,new e({animateLabel:t.animateLabel,wrapLabel:t.wrapLabel,showTrack:i,labels:t.labels,range:t.range})},init:function(){var t=this.options;k(this).min=t.min||A;var e=k(this).labels=a.clone(t.labels,!0);return k(this).snap=t.snap,t.items?(k(this).max=t.items.length-1,k(this).range=k(this).max,k(this).items=t.items,k(this).numeric=!1,k(this).step=1,void("function"!=typeof e.getAxisLabel&&0!==e.count?(e.count=M,e.getAxisLabel=function(t){var e=k(this).items;switch(t){case 1:return e[0].name;case 2:return e[e.length-1].name}}.bind(this)):0===e.count||e.count>1||(e.count=M))):(k(this).numeric=!0,k(this).step=t.step||1,k(this).max=t.max,k(this).range=k(this).max-k(this).min,void(0===e.count||e.count>1||(e.count=M)))},onViewReady:function(){if(b.call(this),this.addEventHandler("thumbdrag",E.bind(this)),k(this).isRange===!0){var t=this.view.getMinThumb(),e=this.view.getMaxThumb();return w.call(this,t),w.call(this,e),l.call(this,t),void l.call(this,e)}var i=this.view.getSingleThumb();w.call(this,i),l.call(this,i)},onDOMAttach:function(){var e=this.view.getTrack().getProperty("offsetWidth");k(this).trackBodyLength=e-L;var i=this.options,n=i.value;if(k(this).windowEvtId||(k(this).windowEvtId=t.Window.addEventHandler("resize",function(){var t=this.view.getTrack().getProperty("offsetWidth")-L;k(this).trackBodyLength!==t&&this.redraw()}.bind(this))),k(this).currentValues)return void this.setValue(k(this).currentValues);var s=k(this).min;if(k(this).isRange!==!0)if(k(this).singleTrack&&(k(this).startAt=r.call(this,e)),k(this).numeric){var a=void 0===n?s:n;this.setValue(a)}else n?this.setValue(n):g.call(this,s);else{k(this).maxPixelPosition=e,k(this).minPixelPosition=0;var o,l,h=k(this).max;if(k(this).numeric)o=h,l=s,n&&(o=void 0===n.end?o:n.end,l=void 0===n.start?l:n.start),this.setValue({start:l,end:o});else if(n){var c=k(this).items;o=void 0===n.end?c[h]:n.end,l=void 0===n.start?c[s]:n.start,this.setValue({start:l,end:o})}else v.call(this,h),d.call(this,s)}},onDestroy:function(){k(this).windowEvtId&&(t.Window.removeEventHandler(k(this).windowEvtId),delete k(this).windowEvtId)},redraw:function(){var t=this.view.getTrack().getProperty("offsetWidth"),e=t-L,i=this.getValue();k(this).range===!0&&(k(this).minPixelPosition=0,k(this).maxPixelPosition=t),k(this).trackBodyLength=e,k(this).singleTrack&&(k(this).startAt=r.call(this,t)),this.setValue(i)},setPrefix:function(t){this.view.getPrefix().setText(t)},setPostfix:function(t){this.view.getPostfix().setText(t)},getValue:function(){return k(this).isRange?{end:c.call(this),start:u.call(this)}:h.call(this,k(this).thumbPosition)},setValue:function(t){if(k(this).numeric)return"object"==typeof t?(void 0!==t.start&&d.call(this,t.start),void 0!==t.end&&v.call(this,t.end)):g.call(this,t),void(k(this).currentValues=t);var e,i,n=!1;if(void 0!==t.start&&(e=o.call(this,t.start),n=!0),void 0!==t.end&&(i=o.call(this,t.end),n=!0),!n){var s=o.call(this,t);return s===-1?console.error("Value does not exist"):g.call(this,s),void(k(this).currentValues=t)}return e===-1||i===-1?void console.error("One or more values does not exist"):(e&&d.call(this,e),i&&v.call(this,i),void(k(this).currentValues=t))}})}),define("widgets/RangeSlider",["widgets/RangeSlider/RangeSlider"],function(t){return t});