/* Copyright (c) Ericsson 2018 */

define("layouts/ext/ext.dom",["jscore/base/jquery","jscore/core"],function(e,t){function i(){var e;return e=navigator.userAgent.indexOf("Gecko/")!==-1?"Firefox":navigator.userAgent.indexOf("Trident/")!==-1?"MSIE":"WebKit"}function n(){var e,t=document.createElement("div"),i={transition:"transitionend",OTransition:"otransitionend",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(e in i)if(i.hasOwnProperty(e)&&void 0!==t.style[e])return i[e];return"webkitTransitionEnd"}var a={WebKit:"webkitAnimationEnd",Firefox:"animationend",MSIE:"animationend"},s={transitionEventName:n(),animEndEventName:a[i()],getWindowDimensions:function(){return{width:window.innerWidth,height:window.innerHeight}},getScrollbarWidth:function(e){var t=document.createElement("div");t.style.visibility="hidden",t.style.width="100px",t.style.msOverflowStyle="scrollbar",document.body.appendChild(t);var i=t.offsetWidth;e&&t.setAttribute("class","eb_scrollbar"),t.style.overflow="scroll";var n=document.createElement("div");n.style.width="100%",t.appendChild(n);var a=n.offsetWidth;return t.parentNode.removeChild(t),i-a},animate:function(t,i,n,a){e(t._getHTMLElement()).animate(i,n,a)},position:function(t){return e(t._getHTMLElement()).position()},offset:function(t){return e(t._getHTMLElement()).offset()},outerWidth:function(t,i){return e(t._getHTMLElement()).outerWidth(!!i)}};return s}),define("styles!layouts/advanced_wizard/timeline/stepIndex/stepIndex.less",function(){return'.elLayouts-AdvancedWizard-Timeline-StepIndex {\n  list-style: none;\n  padding: 0;\n  text-align: center;\n}\n.elLayouts-AdvancedWizard-Timeline-StepIndex_click_complete .elLayouts-AdvancedWizard-Timeline-StepIndex-item_complete_true,\n.elLayouts-AdvancedWizard-Timeline-StepIndex_click_all .elLayouts-AdvancedWizard-Timeline-StepIndex-item {\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-StepIndex-item {\n  margin: 0 5px 0 0;\n  height: 7px;\n  width: 7px;\n  display: inline-block;\n  background: url("layouts/1/resources/layouts/timeline/step-index-item.svg") no-repeat center;\n  opacity: .5;\n}\n.elLayouts-AdvancedWizard-Timeline-StepIndex-item_visible_true {\n  opacity: 1;\n}\n.elLayouts-AdvancedWizard-Timeline-StepIndex-item:hover {\n  opacity: 1;\n}\n.elLayouts-AdvancedWizard-Timeline-StepIndex-item_current {\n  background: url("layouts/1/resources/layouts/timeline/step-index-item-current.svg") no-repeat center;\n}\n'}),define("template!layouts/advanced_wizard/timeline/stepIndex/stepIndex.html",["jscore/handlebars/handlebars"],function(e){return e.template(function(e,t,i,n,a){function s(e,t){var n,a,s="";return s+='\r\n    <li class="elLayouts-AdvancedWizard-Timeline-StepIndex-item elLayouts-AdvancedWizard-Timeline-StepIndex-item-id-',(a=i.id)?n=a.call(e,{hash:{}}):(a=e&&e.id,n=typeof a===r?a.call(e,{hash:{}}):a),s+=c(n)+" ",n=i.if.call(e,e&&e.complete,{hash:{},inverse:u.noop,fn:u.program(2,o,t)}),(n||0===n)&&(s+=n),s+='"\r\n        title="',(a=i.title)?n=a.call(e,{hash:{}}):(a=e&&e.title,n=typeof a===r?a.call(e,{hash:{}}):a),s+=c(n)+'"></li>\r\n    '}function o(e,t){var n,a,s="";return s+="elLayouts-AdvancedWizard-Timeline-StepIndex-item_complete_",(a=i.complete)?n=a.call(e,{hash:{}}):(a=e&&e.complete,n=typeof a===r?a.call(e,{hash:{}}):a),s+=c(n)}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers);var l,d="",r="function",c=this.escapeExpression,u=this;return d+='<ul class="elLayouts-AdvancedWizard-Timeline-StepIndex">\r\n    ',l=i.each.call(t,t&&t.steps,{hash:{},inverse:u.noop,fn:u.program(1,s,a)}),(l||0===l)&&(d+=l),d+="\r\n</ul>\r\n"})}),define("layouts/advanced_wizard/timeline/stepIndex/StepIndexView",["jscore/core","template!./stepIndex.html","styles!./stepIndex.less"],function(e,t,i){return e.View.extend({getTemplate:function(){return t(this.options)},getStyle:function(){return i},getStep:function(e){return this.getElement().find(".elLayouts-AdvancedWizard-Timeline-StepIndex-item-id-"+e)}})}),define("layouts/advanced_wizard/timeline/stepIndex/StepIndex",["jscore/core","./StepIndexView","jscore/ext/privateStore"],function(e,t,i){"use strict";i.create();return e.Widget.extend({view:function(){return new t(this.options)},init:function(e){},onViewReady:function(){this.options.steps.forEach(function(e){var t=this.view.getStep(e.id);t.addEventHandler("click",function(){this.trigger("click",e)}.bind(this))}.bind(this)),this.setClickMode(this.options.clickMode)},setClickMode:function(e){this.getElement().setModifier("click",e)},setCurrent:function(e){var t=this.view.getStep(e);if(t){if(void 0!==this.currentStepId){var i=this.view.getStep(this.currentStepId);i&&i.removeModifier("current")}this.currentStepId=e,t.setModifier("current")}},setVisible:function(e){this.options.steps.forEach(function(t){var i=this.view.getStep(t.id);i.setModifier("visible",String(e.indexOf(t.id)!==-1))}.bind(this))},setComplete:function(e,t){this.view.getStep(e).setModifier("complete",String(t))},onDOMAttach:function(){},onDestroy:function(){}})}),define("styles!layouts/advanced_wizard/timeline/step/step.less",function(){return'.elLayouts-AdvancedWizard-Timeline-step {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  position: relative;\n  -webkit-transition: opacity 0.2s, width 0.2s ease-in-out;\n  transition: opacity 0.2s, width 0.2s ease-in-out;\n  -webkit-animation: elLayouts-AdvancedWizard-Timeline-step-fadein 1s;\n  animation: elLayouts-AdvancedWizard-Timeline-step-fadein 1s;\n  /* Firefox < 16 */\n\n  /* Safari, Chrome and Opera > 12.1 */\n\n  /* Internet Explorer */\n\n  /* Opera < 12.1 */\n\n}\n.elLayouts-AdvancedWizard-Timeline-step.elLayouts-AdvancedWizard-Timeline-step_current_true .elLayouts-AdvancedWizard-Timeline-step-title {\n  font-weight: bold;\n}\n.elLayouts-AdvancedWizard-Timeline-step_clickable_true {\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_clickable_false {\n  cursor: auto;\n}\n.elLayouts-AdvancedWizard-Timeline-step.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-title,\n.elLayouts-AdvancedWizard-Timeline-step.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-title {\n  color: #00a9d4;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step-title {\n  font-size: 12px;\n  position: relative;\n  padding-top: 4px;\n  top: 20px;\n  left: -91px;\n  width: 200px;\n  height: 24px;\n  text-align: center;\n  white-space: normal;\n  overflow: hidden;\n  -ms-word-wrap: break-word;\n  word-wrap: break-word;\n}\n.elLayouts-AdvancedWizard-Timeline-step-icon-current,\n.elLayouts-AdvancedWizard-Timeline-step-icon-complete,\n.elLayouts-AdvancedWizard-Timeline-step-icon-incomplete {\n  width: 25px;\n  height: 25px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  -webkit-transition: opacity 0.2s, ease-in-out;\n  -moz-transition: opacity 0.2s ease-in-out;\n  -ms-transition: opacity 0.2s ease-in-out;\n  -o-transition: opacity 0.2s ease-in-out;\n  transition: opacity 0.2s ease-in-out;\n}\n.elLayouts-AdvancedWizard-Timeline-step.elLayouts-AdvancedWizard-Timeline-step_current_true .elLayouts-AdvancedWizard-Timeline-step-icon-current,\n.elLayouts-AdvancedWizard-Timeline-step.elLayouts-AdvancedWizard-Timeline-step_complete_false .elLayouts-AdvancedWizard-Timeline-step-icon-incomplete,\n.elLayouts-AdvancedWizard-Timeline-step.elLayouts-AdvancedWizard-Timeline-step_complete_true .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  opacity: 1;\n}\n.elLayouts-AdvancedWizard-Timeline-step.elLayouts-AdvancedWizard-Timeline-step_current_true .elLayouts-AdvancedWizard-Timeline-step-icon-incomplete,\n.elLayouts-AdvancedWizard-Timeline-step.elLayouts-AdvancedWizard-Timeline-step_current_true .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  opacity: 0;\n}\n.elLayouts-AdvancedWizard-Timeline-step-icon {\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0;\n  -webkit-transition: opacity 0.2s ease-in-out;\n  -moz-transition: opacity 0.2s ease-in-out;\n  -ms-transition: opacity 0.2s ease-in-out;\n  -o-transition: opacity 0.2s ease-in-out;\n  transition: opacity 0.2s ease-in-out;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/complete.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete,\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/complete-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/current.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current,\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal .elLayouts-AdvancedWizard-Timeline-step-icon-incomplete {\n  background: url("layouts/1/resources/layouts/timeline/incomplete.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-incomplete,\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-incomplete {\n  background: url("layouts/1/resources/layouts/timeline/hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps .elLayouts-AdvancedWizard-Timeline-step-icon-incomplete {\n  background: url("layouts/1/resources/layouts/timeline/substeps-incomplete.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-incomplete,\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-incomplete {\n  background: url("layouts/1/resources/layouts/timeline/substeps-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/substeps-complete.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete,\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/substeps-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/substeps-current.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current,\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/substeps-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_warning .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/warning.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_warning.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current,\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_warning.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/warning-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_warning .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/warning.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_warning.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete,\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_warning.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/warning-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_disabled .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/disabled.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_disabled.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current,\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_disabled.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/disabled-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_disabled .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/disabled.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_disabled.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete,\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_disabled.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/disabled-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_skipped .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/skipped.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_skipped.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current,\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_skipped.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/skipped-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_skipped .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/skipped.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_skipped.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete,\n.elLayouts-AdvancedWizard-Timeline-step_type_normal.elLayouts-AdvancedWizard-Timeline-step_notice_skipped.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/skipped-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_warning .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/warning.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_warning.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current,\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_warning.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/warning-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_warning .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/warning.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_warning.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete,\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_warning.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/warning-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_disabled .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/disabled.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_disabled.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current,\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_disabled.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/disabled-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_disabled .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/disabled.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_disabled.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete,\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_disabled.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/disabled-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_skipped .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/skipped.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_skipped.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current,\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_skipped.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-current {\n  background: url("layouts/1/resources/layouts/timeline/skipped-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_skipped .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/skipped.svg") no-repeat center;\n}\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_skipped.elLayouts-AdvancedWizard-Timeline-step_click_all:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete,\n.elLayouts-AdvancedWizard-Timeline-step_type_substeps.elLayouts-AdvancedWizard-Timeline-step_notice_skipped.elLayouts-AdvancedWizard-Timeline-step_click_complete.elLayouts-AdvancedWizard-Timeline-step_complete_true:hover .elLayouts-AdvancedWizard-Timeline-step-icon-complete {\n  background: url("layouts/1/resources/layouts/timeline/skipped-hover.svg") no-repeat center;\n  cursor: pointer;\n}\n@keyframes elLayouts-AdvancedWizard-Timeline-step-fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@-moz-keyframes elLayouts-AdvancedWizard-Timeline-step-fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes elLayouts-AdvancedWizard-Timeline-step-fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@-ms-keyframes elLayouts-AdvancedWizard-Timeline-step-fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@-o-keyframes elLayouts-AdvancedWizard-Timeline-step-fadein {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n'}),define("text!layouts/advanced_wizard/timeline/step/step.html",function(){return'<div class="elLayouts-AdvancedWizard-Timeline-step">\r\n    <div class="elLayouts-AdvancedWizard-Timeline-step-title">Step with a Rather Usual Long Name</div>\r\n    <div class="elLayouts-AdvancedWizard-Timeline-step-iconHolder-current">\r\n        <i class="elLayouts-AdvancedWizard-Timeline-step-icon elLayouts-AdvancedWizard-Timeline-step-icon-current"></i>\r\n        <i class="elLayouts-AdvancedWizard-Timeline-step-icon elLayouts-AdvancedWizard-Timeline-step-icon-complete"></i>\r\n        <i class="elLayouts-AdvancedWizard-Timeline-step-icon elLayouts-AdvancedWizard-Timeline-step-icon-incomplete"></i>\r\n    </div>\r\n</div>\r\n'}),define("layouts/advanced_wizard/timeline/step/StepView",["jscore/core","text!./step.html","styles!./step.less"],function(e,t,i){return e.View.extend({getTemplate:function(){return t},getStyle:function(){return i},getTitle:function(){return this.getElement().find(".elLayouts-AdvancedWizard-Timeline-step-title")}})}),define("layouts/advanced_wizard/timeline/step/Step",["jscore/core","./StepView","jscore/ext/privateStore"],function(e,t,i){"use strict";i.create();return e.Widget.extend({View:t,init:function(){this.complete=this.options.complete||!1},getId:function(){return this.options.id},onViewReady:function(){this.setType(this.options.stepType||"normal"),this.setComplete(this.complete),this.view.getTitle().setText(this.options.title),this.setClickMode(this.options.clickMode),this.bindClick()},setClickMode:function(e){this.getElement().setModifier("click",e)},setClickable:function(e){this.getElement().setModifier("clickable",String(e))},bindClick:function(){this.getElement().addEventHandler("click",function(){this.trigger("click")}.bind(this))},setType:function(e){this.getElement().setModifier("type",e)},setNotice:function(e){this.getElement().setModifier("notice",e)},clearNotice:function(){this.getElement().removeModifier("notice")},setComplete:function(e){this.complete=e,this.getElement().setModifier("complete",String(e))},isComplete:function(){return this.complete},setCurrent:function(e){this.current=e,this.getElement().setModifier("current",String(e))},collapseAndDestroy:function(){this.getElement().setStyle("width",{width:0,opacity:0}),setTimeout(this.destroy.bind(this),300)},toJSON:function(){var e=this.options;return e.complete=this.isComplete(),{id:this.getId(),complete:this.isComplete(),title:this.options.title}}})}),define("styles!layouts/advanced_wizard/timeline/path/path.less",function(){return'.elLayouts-AdvancedWizard-Timeline-path {\n  display: inline-block;\n  height: 2px;\n  width: 200px;\n  background-color: #d6d6d6;\n  vertical-align: middle;\n  background-image: url("layouts/1/resources/layouts/timeline/path.svg");\n  background-repeat: no-repeat;\n  background-position: -200px 0;\n  overflow: hidden;\n  -webkit-transition: background-position 0.3s, width 0.3s ease;\n  transition: background-position 0.3s, width 0.3s ease;\n  -webkit-animation: elLayouts-AdvancedWizard-Timeline-path-expand 0.3s;\n  animation: elLayouts-AdvancedWizard-Timeline-path-expand 0.3s;\n  /* Firefox < 16 */\n\n  /* Safari, Chrome and Opera > 12.1 */\n\n  /* Internet Explorer */\n\n  /* Opera < 12.1 */\n\n}\n@keyframes elLayouts-AdvancedWizard-Timeline-path-expand {\n  from {\n    width: 0;\n  }\n  to {\n    width: 200px;\n  }\n}\n@-moz-keyframes elLayouts-AdvancedWizard-Timeline-path-expand {\n  from {\n    width: 0;\n  }\n  to {\n    width: 200px;\n  }\n}\n@-webkit-keyframes elLayouts-AdvancedWizard-Timeline-path-expand {\n  from {\n    width: 0;\n  }\n  to {\n    width: 200px;\n  }\n}\n@-ms-keyframes elLayouts-AdvancedWizard-Timeline-path-expand {\n  from {\n    width: 0;\n  }\n  to {\n    width: 200px;\n  }\n}\n@-o-keyframes elLayouts-AdvancedWizard-Timeline-path-expand {\n  from {\n    width: 0;\n  }\n  to {\n    width: 200px;\n  }\n}\n.elLayouts-AdvancedWizard-Timeline-path_move_forward {\n  background-position: 0 0;\n}\n.elLayouts-AdvancedWizard-Timeline-path_move_backwards {\n  background-position: -200px 0;\n}\n'}),define("text!layouts/advanced_wizard/timeline/path/path.html",function(){return'<div class="elLayouts-AdvancedWizard-Timeline-path"></div>\r\n'}),define("layouts/advanced_wizard/timeline/path/PathView",["jscore/core","text!./path.html","styles!./path.less"],function(e,t,i){return e.View.extend({getTemplate:function(){return t},getStyle:function(){return i},getTop:function(){return this.getElement().find(".elLayouts-AdvancedWizard-Timeline-top")},getContent:function(){return this.getElement().find(".elLayouts-AdvancedWizard-Timeline-content")}})}),define("layouts/advanced_wizard/timeline/path/Path",["jscore/core","./PathView","jscore/ext/privateStore"],function(e,t,i){"use strict";i.create();return e.Widget.extend({View:t,init:function(e){this.complete=this.options.complete||!1},moveForward:function(e){this.getElement().setModifier("move","forward"),e&&setTimeout(e,200)},moveBackwards:function(e){this.getElement().setModifier("move","backwards"),e&&setTimeout(e,200)},collapseAndDestroy:function(){this.getElement().setStyle("width",0),setTimeout(this.destroy.bind(this),300)},onViewReady:function(){this.complete&&this.moveForward()},onDOMAttach:function(){},onDestroy:function(){}})}),define("styles!layouts/advanced_wizard/timeline/timeline.less",function(){return".elLayouts-AdvancedWizard-Timeline {\n  font-size: 0;\n  height: 72px;\n  background-color: #f7f7f7;\n  padding-top: 8px;\n}\n.elLayouts-AdvancedWizard-Timeline-content,\n.elLayouts-AdvancedWizard-Timeline-left,\n.elLayouts-AdvancedWizard-Timeline-right {\n  display: inline-block;\n  vertical-align: middle;\n  text-align: center;\n}\n.elLayouts-AdvancedWizard-Timeline-content {\n  overflow-x: hidden;\n  white-space: nowrap;\n  height: 72px;\n  padding: 0 50px;\n  text-align: center;\n  width: calc(100% - 170px);\n  position: relative;\n}\n.elLayouts-AdvancedWizard-Timeline-left,\n.elLayouts-AdvancedWizard-Timeline-right {\n  width: 20px;\n  margin: 0 5px;\n  height: 100%;\n  line-height: 100%;\n  position: relative;\n  text-align: center;\n  cursor: pointer;\n  padding-top: 8px;\n  top: -8px;\n}\n.elLayouts-AdvancedWizard-Timeline-left:hover,\n.elLayouts-AdvancedWizard-Timeline-right:hover {\n  background-color: #e8e8e8;\n}\n.elLayouts-AdvancedWizard-Timeline-left-icon,\n.elLayouts-AdvancedWizard-Timeline-right-icon {\n  position: absolute;\n  top: calc(50% - 13px);\n  left: 0;\n}\n.elLayouts-AdvancedWizard-Timeline-left_visible_true,\n.elLayouts-AdvancedWizard-Timeline-right_visible_true {\n  visibility: visible;\n}\n.elLayouts-AdvancedWizard-Timeline-left_visible_false,\n.elLayouts-AdvancedWizard-Timeline-right_visible_false {\n  visibility: hidden;\n}\n.elLayouts-AdvancedWizard-Timeline-left {\n  padding-right: 5px;\n  left: -4px;\n}\n.elLayouts-AdvancedWizard-Timeline-right {\n  padding-left: 5px;\n  right: -4px;\n}\n.elLayouts-AdvancedWizard-Timeline_scroll_false .elLayouts-AdvancedWizard-Timeline-left,\n.elLayouts-AdvancedWizard-Timeline_scroll_false .elLayouts-AdvancedWizard-Timeline-right,\n.elLayouts-AdvancedWizard-Timeline_scroll_false .elLayouts-AdvancedWizard-Timeline-bottom {\n  visibility: hidden;\n}\n.elLayouts-AdvancedWizard-Timeline-bottom {\n  margin-top: -20px;\n}\n"}),define("text!layouts/advanced_wizard/timeline/timeline.html",function(){return'<div class="elLayouts-AdvancedWizard-Timeline">\r\n    <div class="elLayouts-AdvancedWizard-Timeline-left">\r\n        <i class="ebIcon ebIcon_leftArrow ebIcon_large ebIcon_interactive elLayouts-AdvancedWizard-Timeline-left-icon"></i>\r\n    </div>\r\n    <div class="elLayouts-AdvancedWizard-Timeline-content"></div>\r\n    <div class="elLayouts-AdvancedWizard-Timeline-right">\r\n        <i class="ebIcon ebIcon_rightArrow ebIcon_large ebIcon_interactive elLayouts-AdvancedWizard-Timeline-right-icon"></i>\r\n    </div>\r\n    <div class="elLayouts-AdvancedWizard-Timeline-bottom"></div>\r\n</div>\r\n'}),define("layouts/advanced_wizard/timeline/TimelineView",["jscore/core","text!./timeline.html","styles!./timeline.less"],function(e,t,i){return e.View.extend({getTemplate:function(){return t},getStyle:function(){return i},getLeft:function(){return this.getElement().find(".elLayouts-AdvancedWizard-Timeline-left")},getRight:function(){return this.getElement().find(".elLayouts-AdvancedWizard-Timeline-right");
},getContent:function(){return this.getElement().find(".elLayouts-AdvancedWizard-Timeline-content")},getBottom:function(){return this.getElement().find(".elLayouts-AdvancedWizard-Timeline-bottom")}})}),define("layouts/advanced_wizard/timeline/Timeline",["jscore/core","./TimelineView","jscore/ext/privateStore","./path/Path","./step/Step","./stepIndex/StepIndex","../../ext/ext.dom"],function(e,t,i,n,a,s,o){"use strict";function l(){return g(this).timeline.filter(function(e){return e instanceof a})}function d(e){for(var t,i=0,n=0;n<e;n++)t=g(this).timeline[n],i+=t instanceof a?25:200;return i}function r(){var e=this.view.getContent().getProperty("scrollWidth"),t=this.view.getContent().getProperty("offsetWidth"),i=this.view.getContent().getProperty("scrollLeft"),n=[],s=this.view.getLeft(),o=this.view.getRight();g(this).timeline.forEach(function(e){var s=e.getElement().getProperty("offsetLeft"),o=e.getElement().getProperty("offsetWidth");e instanceof a&&(s>i&&s<i+t||s+o>i&&s+o<i+t)&&n.push(e.getId())}.bind(this)),g(this).stepIndex.setVisible(n),s.setModifier("visible",String(0!==i)),o.setModifier("visible",String(i+t!==e)),(s.hasModifier("visible","true")||o.hasModifier("visible","true"))&&this.getElement().setModifier("scroll","true")}function c(e){if("all"===g(this).clickMode)this.trigger("click",e);else{var t=u.call(this,e),i=T.call(this,e);i.isComplete()&&"none"!==g(this).clickMode?this.trigger("click",e):t&&t.isComplete()===!0&&"complete"===g(this).clickMode&&this.trigger("click",e)}}function u(e){for(var t,i=l.call(this),n=0;n<i.length;n++)if(i[n].getId()===e&&n>0){t=i[--n];break}return t}function p(){g(this).stepIndex&&g(this).stepIndex.destroy();var e=[];g(this).timeline.forEach(function(t){(t instanceof a||t.getId)&&e.push(t.toJSON())}),g(this).stepIndex=new s({clickMode:g(this).clickMode,steps:e}),g(this).stepIndex.setCurrent(g(this).currentStepId),g(this).stepIndex.attachTo(this.view.getBottom()),"none"!==g(this).clickMode&&g(this).stepIndex.addEventHandler("click",function(e){c.call(this,e.id)}.bind(this))}function m(){var e=d.call(this,g(this).timeline.length-1),t=this.view.getContent().getProperty("offsetWidth");this.getElement().setModifier("scroll",String(e>t)),r.call(this)}function v(e,t){var i=[];return e.forEach(function(t,n){if(n>0){var a=e[n-1],s=t.complete===!0&&a.complete===!0,o=a.complete===!0&&t.id===g(this).currentStepId,l=void 0!==a&&(s||o),d=_.call(this,{complete:l});i.push(d)}t.clickMode=g(this).clickMode;var r=h.call(this,t);i.push(r)}.bind(this)),t&&i.forEach(function(e){e.attachTo(this.view.getContent())}.bind(this)),i}function y(e,t){var i=e.getElement().getNative(),n=g(this).timeline[t],a=this.view.getContent().getNative();e.attach(this.view.getContent()),n?(n=n.getElement().getNative(),a.insertBefore(i,n)):e.attachTo(this.view.getContent())}function h(e){var t=new a(e);return"none"!==g(this).clickMode&&t.addEventHandler("click",function(){c.call(this,t.getId())}.bind(this)),t}function _(e){return new n(e)}function T(e){for(var t=0;t<g(this).timeline.length;t++)if(g(this).timeline[t].getId&&g(this).timeline[t].getId()===e)return g(this).timeline[t]}function z(){return L.call(this,g(this).currentStepId)}function L(e){return g(this).timeline.indexOf(T.call(this,e))}function W(e){f.call(this,this.view.getContent().getProperty("scrollLeft")-250,e)}function A(e){f.call(this,this.view.getContent().getProperty("scrollLeft")+250,e)}function f(e,t){void 0!==g(this)._scrollTimeout&&(clearTimeout(g(this)._scrollTimeout),delete g(this)._scrollTimeout),g(this)._scrollTimeout=setTimeout(function(){o.animate(this.view.getContent(),{scrollLeft:e},200,t),delete g(this)._scrollTimeout}.bind(this),100)}var g=i.create(),b=e.Widget.extend({View:t,init:function(){g(this).timeline=[],g(this).clickModes=Object.keys(b.CLICK_MODE).map(function(e){return b.CLICK_MODE[e]}),this.setClickMode(this.options.clickMode),g(this).resizeHandler=e.Window.addEventHandler("resize",m.bind(this))},setClickMode:function(e){if(void 0!==e&&g(this).clickModes.indexOf(e)===-1)throw new Error("Invalid click mode constance.");g(this).clickMode=e||"none",g(this).timeline.forEach(function(e){e instanceof a&&e.setClickMode(g(this).clickMode)}.bind(this)),g(this).stepIndex&&g(this).stepIndex.setClickMode(g(this).clickMode)},setStepComplete:function(e,t){var i=T.call(this,e);i.setComplete(t),g(this).stepIndex.setComplete(e,t);var n=l.call(this);g(this).clickMode===b.CLICK_MODE.COMPLETE&&n.forEach(function(e,t){var i=n[t-1];void 0!==i&&i.isComplete()===!0?n[t].setClickable(!0):n[t].setClickable(!1)})},setStepNotice:function(e,t){var i=T.call(this,e);i.setNotice(t)},clearStepNotice:function(e){var t=T.call(this,e);t.clearNotice()},setCurrentStepNotice:function(e){this.setStepNotice(g(this).currentStepId,e)},setCurrentStepComplete:function(e){this.setStepComplete(g(this).currentStepId,e)},clearCurrentStepNotice:function(){this.clearStepNotice(g(this).currentStepId)},goTo:function(e){function t(){n<s?o++:o--}function i(){if(g(this).timeline[o]instanceof a){var n=g(this).timeline[o];n.getId()!==e&&void 0!==g(this).timeline[o]?(n.setCurrent(!1),t(),i.call(this)):this.setCurrent(n.getId())}else{var s=g(this).timeline[o],d=g(this).timeline[o-1],r=g(this).timeline[o+1];if(void 0!==d&&void 0!==r&&d.isComplete()&&r.isComplete())t(),i.call(this);else{var c=l?s.moveForward.bind(s):s.moveBackwards.bind(s);c(function(){t(),i.call(this)}.bind(this))}}}var n=z.call(this),s=L.call(this,e),o=n!==-1?n:0,l=n<s;this.setCurrent(e),i.call(this)},onViewReady:function(){g(this).currentStepId=this.options.current||this.options.steps[0].id,g(this).timeline=v.call(this,this.options.steps||[],!0),this.view.getLeft().addEventHandler("click",function(){W.call(this,r.bind(this))}.bind(this)),this.view.getRight().addEventHandler("click",function(){A.call(this,r.bind(this))}.bind(this)),p.call(this),this.setCurrent(g(this).currentStepId)},add:function(e,t,i){t=Array.isArray(t)?t:[t];var n=L.call(this,e);if(n===-1)return void(i&&i());this.scrollToStep(e);var a=[_.call(this)].concat(v.call(this,t));a.forEach(function(e,t){var i=n+t+1;y.call(this,e,i),g(this).timeline.splice(i,0,e)}.bind(this)),p.call(this),setTimeout(function(){m.call(this),i&&i()}.bind(this),300)},remove:function(e,t){var i=L.call(this,e);return i===-1?void(t&&t()):(g(this).timeline[i].collapseAndDestroy(),g(this).timeline.splice(i,1),g(this).timeline[i-1].collapseAndDestroy(),g(this).timeline.splice(i-1,1),p.call(this),void setTimeout(function(){m.call(this),t&&t()}.bind(this),300))},setCurrent:function(e){var t=T.call(this,e);t&&(t.setCurrent(!0),g(this).currentStepId=t.getId(),this.scrollToStep(g(this).currentStepId),g(this).stepIndex.setCurrent(g(this).currentStepId))},scrollToStep:function(e){var t=L.call(this,e);if(t!==-1){var i=d.call(this,t),n=this.view.getContent().getProperty("offsetWidth"),a=i+12.5-(n/2-50);0===t&&(a=0),f.call(this,a,r.bind(this))}},onDOMAttach:function(){m.call(this)},onDestroy:function(){g(this).timeline.forEach(function(e){e.destroy()}),e.Window.removeEventHandler(g(this).resizeHandler)}});return b.CLICK_MODE={ALL:"all",COMPLETE:"complete",NONE:"none"},b.STEP_TYPE={NORMAL:"normal",SUBSTEPS:"substeps"},b}),define("layouts/AdvancedWizardTimeline",["layouts/advanced_wizard/timeline/Timeline"],function(e){return e});