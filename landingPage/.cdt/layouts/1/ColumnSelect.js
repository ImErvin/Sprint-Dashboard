/* Copyright (c) Ericsson 2018 */

define("styles!layouts/dashboard/columnlayout/_columnLayout.less",function(){return".elLayouts-wDashboardColumnLayout {\n  width: 100%;\n  clear: both;\n  cursor: pointer;\n  border: 1px solid transparent;\n}\n.elLayouts-wDashboardColumnLayout_selected .elLayouts-wDashboardColumnLayout-display {\n  border-color: #00a9d4;\n}\n.elLayouts-wDashboardColumnLayout_selected .elLayouts-wDashboardColumnLayout-displayColumn {\n  background-color: #00a9d4;\n  border-color: #FFFFFF;\n  color: #FFFFFF;\n}\n.elLayouts-wDashboardColumnLayout_select_column .elLayouts-wDashboardColumnLayout-displayColumn {\n  height: 45px;\n}\n.elLayouts-wDashboardColumnLayout-display {\n  width: 100%;\n  height: 100px;\n  clear: both;\n  cursor: pointer;\n  border: 1px solid transparent;\n}\n.elLayouts-wDashboardColumnLayout-displayColumn {\n  position: relative;\n  height: 100%;\n  margin: 0;\n  float: left;\n  background-color: #eff0f0;\n  border: solid 1px #CCCCCC;\n  box-sizing: border-box;\n}\n.elLayouts-wDashboardColumnLayout-displayColumn_selected {\n  border-color: #00a9d4;\n}\n.elLayouts-wDashboardColumnLayout-displayColumnText {\n  position: absolute;\n  display: inline-block;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 14px;\n  text-align: center;\n  margin: auto;\n  pointer-events: none;\n}\n.elLayouts-wDashboardColumnLayout_onecolumn .elLayouts-wDashboardColumnLayout-displayColumn {\n  width: 100%;\n}\n.elLayouts-wDashboardColumnLayout_twocolumns .elLayouts-wDashboardColumnLayout-displayColumn {\n  width: 50%;\n}\n.elLayouts-wDashboardColumnLayout_twocolumns3070 .elLayouts-wDashboardColumnLayout-displayColumn {\n  width: 30%;\n}\n.elLayouts-wDashboardColumnLayout_twocolumns3070 .elLayouts-wDashboardColumnLayout-displayColumn:nth-child(2) {\n  width: 70%;\n}\n.elLayouts-wDashboardColumnLayout_twocolumns7030 .elLayouts-wDashboardColumnLayout-displayColumn {\n  width: 70%;\n}\n.elLayouts-wDashboardColumnLayout_twocolumns7030 .elLayouts-wDashboardColumnLayout-displayColumn:nth-child(2) {\n  width: 30%;\n}\n.elLayouts-wDashboardColumnLayout_threecolumns .elLayouts-wDashboardColumnLayout-displayColumn {\n  width: 33.33%;\n}\n.elLayouts-wDashboardColumnLayout_threecolumns304030 .elLayouts-wDashboardColumnLayout-displayColumn {\n  width: 30%;\n}\n.elLayouts-wDashboardColumnLayout_threecolumns304030 .elLayouts-wDashboardColumnLayout-displayColumn:nth-child(2) {\n  width: 40%;\n}\n.elLayouts-wDashboardColumnLayout_fourcolumns .elLayouts-wDashboardColumnLayout-displayColumn {\n  width: 25%;\n}\n"}),define("template!layouts/dashboard/columnlayout/_columnLayout.html",["jscore/handlebars/handlebars"],function(o){return o.template(function(o,t,n,e,a){function l(o,t){var e,a,l="";return l+='<h4 class="elLayouts-wDashboardColumnLayout-header">',(a=n.header)?e=a.call(o,{hash:{}}):(a=o&&o.header,e=typeof a===c?a.call(o,{hash:{}}):a),l+=h(e)+"</h4>"}function u(o,t){return' tabindex="0"'}function s(o,t,e){var a,l,s="";return s+='\r\n        <div class="elLayouts-wDashboardColumnLayout-displayColumn" ',a=n.if.call(o,e&&e.columnSelect,{hash:{},inverse:m.noop,fn:m.program(3,u,t)}),(a||0===a)&&(s+=a),s+='>\r\n            <div class="elLayouts-wDashboardColumnLayout-displayColumnText">',(l=n.width)?a=l.call(o,{hash:{}}):(l=o&&o.width,a=typeof l===c?l.call(o,{hash:{}}):l),s+=h(a)+"%</div>\r\n        </div>\r\n        "}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,o.helpers);var i,r,d="",c="function",h=this.escapeExpression,m=this;return d+='<div class="elLayouts-wDashboardColumnLayout elLayouts-wDashboardColumnLayout_',(r=n.modifier)?i=r.call(t,{hash:{}}):(r=t&&t.modifier,i=typeof r===c?r.call(t,{hash:{}}):r),d+=h(i)+'">\r\n    ',i=n.if.call(t,t&&t.header,{hash:{},inverse:m.noop,fn:m.program(1,l,a)}),(i||0===i)&&(d+=i),d+='\r\n\r\n    <div class="elLayouts-wDashboardColumnLayout-display" ',i=n.unless.call(t,t&&t.columnSelect,{hash:{},inverse:m.noop,fn:m.program(3,u,a)}),(i||0===i)&&(d+=i),d+=">\r\n        ",i=n.each.call(t,t&&t.columns,{hash:{},inverse:m.noop,fn:m.programWithDepth(5,s,a,t)}),(i||0===i)&&(d+=i),d+="\r\n    </div>\r\n</div>\r\n"})}),define("layouts/dashboard/columnlayout/ColumnLayoutView",["jscore/core","template!./_columnLayout.html","styles!./_columnLayout.less"],function(o,t,n){"use strict";var e="elLayouts-wDashboardColumnLayout",a="."+e;return o.View.extend({getTemplate:function(){return t(this.options)},getStyle:function(){return n},getLayoutDisplay:function(){return this.getElement().find(a+"-display")},getAllColumns:function(){return this.getElement().findAll(a+"-displayColumn")}})}),define("layouts/dashboard/columnlayout/ColumnLayout",["jscore/core","jscore/ext/privateStore","layouts/Dashboard","./ColumnLayoutView"],function(o,t,n,e){"use strict";function a(){var o=this.options,t=this.options.columnSelect===!0,n=t?this.COLUMN_SELECTED:this.LAYOUT_SELECTED,e=function(t){this.trigger(n,o.layout,t),this.setSelected(!0,t)}.bind(this);if(t)this.view.getAllColumns().forEach(function(o,t){o.addEventHandler("click",function(){e.call(this,t)}.bind(this)),o.addEventHandler("keypress",function(o){l(o)&&e.call(this,t)}.bind(this))}.bind(this));else{var a=this.view.getLayoutDisplay();a.addEventHandler("click",function(){e.call(this)}),a.addEventHandler("keypress",function(o){l(o)&&e.call(this)}.bind(this))}}function l(o){return o.originalEvent.keyCode===i}var u=t.create(),s=n.getLayoutInformation(),i=13,r={"one-column":{modifier:"onecolumn"},"two-columns":{modifier:"twocolumns"},"two-columns-30-70":{modifier:"twocolumns3070"},"two-columns-70-30":{modifier:"twocolumns7030"},"three-columns":{modifier:"threecolumns"},"three-columns-30-40-30":{modifier:"threecolumns304030"},"four-columns":{modifier:"fourcolumns"}};return o.Widget.extend({LAYOUT_SELECTED:"columnlayout:layout:selected",COLUMN_SELECTED:"columnlayout:column:selected",view:function(){var o=this.options;return new e({layout:o.layout,header:o.header,columnSelect:this.options.columnSelect===!0,columns:s[o.layout].columns,modifier:r[o.layout].modifier})},onViewReady:function(){this.options.columnSelect===!0&&(this.getElement().setModifier("select","column"),this.setSelected(!0,0)),a.call(this)},getSelected:function(){return u(this).columnSelected},setSelected:function(o,t){var n=this.getElement();void 0!==t&&this.view.getAllColumns().forEach(function(o,e){e===t&&(n=o),o.removeModifier("selected")}),void 0!==n&&(o===!1?n.removeModifier("selected"):(u(this).columnSelected=t,n.setModifier("selected")))}})}),define("layouts/dashboard/columnselect/ColumnSelect",["jscore/core","jscore/ext/privateStore","layouts/Dashboard","../columnlayout/ColumnLayout"],function(o,t,n,e){"use strict";var a=t.create();return o.Widget.extend({onViewReady:function(){this.setColumnLayout(this.options.layout)},getColumnLayout:function(){return a(this).columnLayoutName},setColumnLayout:function(o){var t,l=n.getLayoutInformation();void 0!==l[o]&&(void 0!==a(this).columnLayout&&a(this).columnLayout.destroy(),t=new e({layout:o,columnSelect:!0}),t.attachTo(this.getElement()),a(this).columnLayout=t,a(this).columnLayoutName=o)},getColumnSelected:function(){return void 0!==a(this).columnLayout?a(this).columnLayout.getSelected():void 0}})}),define("layouts/ColumnSelect",["layouts/dashboard/columnselect/ColumnSelect"],function(o){return o});