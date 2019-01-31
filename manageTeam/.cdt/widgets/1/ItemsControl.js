/* Copyright (c) Ericsson 2019 */

define("widgets/utils/keyboardUtils",[],function(){"use strict";var e={},t={BACKSPACE:8,TAB:9,ENTER:13,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46},i=function(t,i){var n,s=t.originalEvent.keyCode;if(Object.keys(i).some(function(t){if(e[t.toUpperCase()]===s)return n=i[t],!0}),n)return n(t)},n=function(e,t){if(!e||!t)throw new Error("Missing event argument");return e.addEventHandler("keydown",function(e){return i(e,t)})},s=function(e,t){t&&e.removeEventHandler(t)};return Object.keys(t).forEach(function(i){Object.defineProperty(e,i,{value:t[i],writable:!1})}),e.addKeyHandler=n,e.removeKeyHandler=s,e}),define("template!widgets/ItemsControl/ComponentList/list/_menuPartial.hbs",["jscore/handlebars/handlebars"],function(e){return e.template(function(e,t,i,n,s){function o(e,t){var n,s="";return s+=" ebComponentList-group_expandable",n=i.if.call(e,e&&e._expanded,{hash:{},inverse:E.program(4,l,t),fn:E.program(2,r,t)}),(n||0===n)&&(s+=n),s}function r(e,t){return"_expanded"}function l(e,t){return"_collapsed"}function a(e,t){return" ebComponentList-group-header_icon"}function c(e,t){var n,s="";return s+='<div class="ebComponentList-iconHolder">',n=i.if.call(e,e&&e.icon,{hash:{},inverse:E.noop,fn:E.program(9,h,t)}),(n||0===n)&&(s+=n),s+="</div>\n        "}function h(e,t){var n,s="";return s+='<i class="ebIcon '+x((n=e&&e.icon,n=null==n||n===!1?n:n.prefix,typeof n===y?n.apply(e):n))+"_"+x((n=e&&e.icon,n=null==n||n===!1?n:n.name,typeof n===y?n.apply(e):n)),n=i.if.call(e,e&&e.disabled,{hash:{},inverse:E.noop,fn:E.program(10,d,t)}),(n||0===n)&&(s+=n),s+='"></i>'}function d(e,t){return" ebIcon_disabled"}function u(e,t){var n,s,o="";return o+='<div class="ebComponentList-group-name">',(s=i.header)?n=s.call(e,{hash:{}}):(s=e&&e.header,n=typeof s===y?s.call(e,{hash:{}}):s),o+=x(n)+'</div>\n            <i class="elWidgets-ComponentList-expand-arrow ebIcon ebIcon_',n=i.if.call(e,e&&e._expanded,{hash:{},inverse:E.program(15,m,t),fn:E.program(13,f,t)}),(n||0===n)&&(o+=n),o+='"></i>'}function f(e,t){return"downArrow"}function m(e,t){return"rightArrow"}function p(e,t){var n,s="";return n=i.if.call(e,e&&e.showIcon,{hash:{},inverse:E.program(20,g,t),fn:E.program(18,v,t)}),(n||0===n)&&(s+=n),s}function v(e,t){var n,s,o="";return o+='<div class="ebComponentList-group-name">',(s=i.header)?n=s.call(e,{hash:{}}):(s=e&&e.header,n=typeof s===y?s.call(e,{hash:{}}):s),o+=x(n)+"</div>"}function g(e,t){var n,s,o="";return(s=i.header)?n=s.call(e,{hash:{}}):(s=e&&e.header,n=typeof s===y?s.call(e,{hash:{}}):s),o+=x(n)}function b(e,t){var n,s="";return s+="\n            ",n=i.if.call(e,e&&e.header,{hash:{},inverse:E.program(25,I,t),fn:E.program(23,L,t)}),(n||0===n)&&(s+=n),s+="\n        "}function L(e,t){var s,o="";return o+="\n                ",s=E.invokePartial(n.menu,"menu",e,i,n),(s||0===s)&&(o+=s),o+="\n            "}function I(e,t){var s,o="";return o+="\n                ",s=E.invokePartial(n.item,"item",e,i,n),(s||0===s)&&(o+=s),o+="\n            "}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers),n=this.merge(n,e.partials);var w,C="",E=this,y="function",x=this.escapeExpression;return C+='<div class="ebComponentList-group',w=i.if.call(t,t&&t.expandable,{hash:{},inverse:E.noop,fn:E.program(1,o,s)}),(w||0===w)&&(C+=w),C+='">\n    <div class="ebComponentList-group-header',w=i.if.call(t,t&&t.showIcon,{hash:{},inverse:E.noop,fn:E.program(6,a,s)}),(w||0===w)&&(C+=w),C+='">',w=i.if.call(t,t&&t.showIcon,{hash:{},inverse:E.noop,fn:E.program(8,c,s)}),(w||0===w)&&(C+=w),w=i.if.call(t,t&&t.expandable,{hash:{},inverse:E.program(17,p,s),fn:E.program(12,u,s)}),(w||0===w)&&(C+=w),C+='</div>\n    <div class="ebComponentList-inner">',w=i.each.call(t,t&&t.items,{hash:{},inverse:E.noop,fn:E.program(22,b,s)}),(w||0===w)&&(C+=w),C+="</div>\n</div>\n"})}),define("template!widgets/ItemsControl/ComponentList/list/_listPartial.hbs",["jscore/handlebars/handlebars"],function(e){return e.template(function(e,t,i,n,s){function o(e,t){return"separator"}function r(e,t){var n,s="";return s+="item",n=i.if.call(e,e&&e.showIcon,{hash:{},inverse:x.program(6,a,t),fn:x.program(4,l,t)}),(n||0===n)&&(s+=n),s}function l(e,t){return" ebComponentList-item_icon"}function a(e,t){var n,s="";return n=i.if.call(e,e&&e._checkbox,{hash:{},inverse:x.noop,fn:x.program(4,l,t)}),(n||0===n)&&(s+=n),s}function c(e,t){return" ebComponentList-item_disabled"}function h(e,t){var n,s,o="";return o+='title="',(s=i.title)?n=s.call(e,{hash:{}}):(s=e&&e.title,n=typeof s===S?s.call(e,{hash:{}}):s),o+=_(n)+'"'}function d(e,t){var n,s,o="";return o+='<label class="ebComponentList-checkboxHolder">\n            <input class="ebCheckbox" type="checkbox"\n                   value="',(s=i.value)?n=s.call(e,{hash:{}}):(s=e&&e.value,n=typeof s===S?s.call(e,{hash:{}}):s),o+=_(n)+'"',n=i.if.call(e,e&&e.checked,{hash:{},inverse:x.noop,fn:x.program(13,u,t)}),(n||0===n)&&(o+=n),o+=" ",n=i.if.call(e,e&&e.disabled,{hash:{},inverse:x.noop,fn:x.program(15,f,t)}),(n||0===n)&&(o+=n),o+='>\n            <span class="ebCheckbox-inputStatus"></span>\n            <span class="ebCheckbox-label">',(s=i.name)?n=s.call(e,{hash:{}}):(s=e&&e.name,n=typeof s===S?s.call(e,{hash:{}}):s),o+=_(n)+"</span>\n        </label>"}function u(e,t){return" checked"}function f(e,t){return"disabled"}function m(e,t){var n,s="";return n=i.if.call(e,e&&e.showIcon,{hash:{},inverse:x.noop,fn:x.program(18,p,t)}),(n||0===n)&&(s+=n),n=i.if.call(e,e&&e.disabled,{hash:{},inverse:x.program(24,L,t),fn:x.program(22,b,t)}),(n||0===n)&&(s+=n),n=i.if.call(e,e&&e.showIcon,{hash:{},inverse:x.noop,fn:x.program(29,C,t)}),(n||0===n)&&(s+=n),s}function p(e,t){var n,s="";return s+='<div class="ebComponentList-iconHolder">',n=i.if.call(e,e&&e.icon,{hash:{},inverse:x.noop,fn:x.program(19,v,t)}),(n||0===n)&&(s+=n),s+='</div>\n            <div class="ebComponentList-item-name">'}function v(e,t){var n,s="";return s+='<i class="ebIcon '+_((n=e&&e.icon,n=null==n||n===!1?n:n.prefix,typeof n===S?n.apply(e):n))+"_"+_((n=e&&e.icon,n=null==n||n===!1?n:n.name,typeof n===S?n.apply(e):n)),n=i.if.call(e,e&&e.disabled,{hash:{},inverse:x.noop,fn:x.program(20,g,t)}),(n||0===n)&&(s+=n),s+='"></i>'}function g(e,t){return" ebIcon_disabled"}function b(e,t){var n,s,o="";return(s=i.name)?n=s.call(e,{hash:{}}):(s=e&&e.name,n=typeof s===S?s.call(e,{hash:{}}):s),o+=_(n)}function L(e,t){var n,s="";return n=i.if.call(e,e&&e._action,{hash:{},inverse:x.noop,fn:x.program(25,I,t)}),(n||0===n)&&(s+=n),n=i.if.call(e,e&&e.link,{hash:{},inverse:x.noop,fn:x.program(27,w,t)}),(n||0===n)&&(s+=n),s}function I(e,t){var n,s,o="";return(s=i.name)?n=s.call(e,{hash:{}}):(s=e&&e.name,n=typeof s===S?s.call(e,{hash:{}}):s),o+=_(n)}function w(e,t){var n,s,o="";return o+='<a class="ebComponentList-link" href="',(s=i.link)?n=s.call(e,{hash:{}}):(s=e&&e.link,n=typeof s===S?s.call(e,{hash:{}}):s),o+=_(n)+'">',(s=i.name)?n=s.call(e,{hash:{}}):(s=e&&e.name,n=typeof s===S?s.call(e,{hash:{}}):s),o+=_(n)+"</a>"}function C(e,t){return"</div>"}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers);var E,y="",x=this,S="function",_=this.escapeExpression;return y+='<div class="ebComponentList-',E=i.if.call(t,t&&t._separator,{hash:{},inverse:x.program(3,r,s),fn:x.program(1,o,s)}),(E||0===E)&&(y+=E),E=i.if.call(t,t&&t.disabled,{hash:{},inverse:x.noop,fn:x.program(8,c,s)}),(E||0===E)&&(y+=E),y+='" ',E=i.if.call(t,t&&t.title,{hash:{},inverse:x.noop,fn:x.program(10,h,s)}),(E||0===E)&&(y+=E),y+=">",E=i.if.call(t,t&&t._checkbox,{hash:{},inverse:x.program(17,m,s),fn:x.program(12,d,s)}),(E||0===E)&&(y+=E),y+="</div>\n"})}),define("styles!widgets/ItemsControl/ComponentList/list/_list.less",function(){return".elWidgets-ComponentList-list_border_none {\n  border: none;\n  margin: 0;\n  box-shadow: none;\n}\n"}),define("template!widgets/ItemsControl/ComponentList/list/_list.hbs",["jscore/handlebars/handlebars"],function(e){return e.template(function(e,t,i,n,s){function o(e,t){var n,s,o="";return o+='\n        <div class="elWidgets-MultiSelectBox-selectDeselectAllWrap">\n            <div class="ebMultiSelectBox-selectDeselectAll">\n                <span class="elWidgets-MultiSelectBox-selectAll ebMultiSelectBox-spanLink">'+u((n=e&&e.selectDeselectAll,n=null==n||n===!1?n:n.selectAllLabel,typeof n===d?n.apply(e):n))+"</span>",(s=i.noSpace)?n=s.call(e,{hash:{}}):(s=e&&e.noSpace,n=typeof s===d?s.call(e,{hash:{}}):s),o+=u(n)+'<span class="elWidgets-MultiSelectBox-deselectAll ebMultiSelectBox-spanLink">'+u((n=e&&e.selectDeselectAll,n=null==n||n===!1?n:n.deselectAllLabel,typeof n===d?n.apply(e):n))+'</span>\n            </div>\n            <div class="ebComponentList-separator"></div>\n        </div>\n    '}function r(e,t){var n,s="";return s+="\n            ",n=i.if.call(e,e&&e.header,{hash:{},inverse:f.program(6,a,t),fn:f.program(4,l,t)}),(n||0===n)&&(s+=n),s+="\n        "}function l(e,t){var s,o="";return o+="\n                ",s=f.invokePartial(n.menu,"menu",e,i,n),(s||0===s)&&(o+=s),o+="\n            "}function a(e,t){var s,o="";return o+="\n                ",s=f.invokePartial(n.item,"item",e,i,n),(s||0===s)&&(o+=s),o+="\n            "}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers),n=this.merge(n,e.partials);var c,h="",d="function",u=this.escapeExpression,f=this;return h+='<div data-bypassfocuslock\n     class="elWidgets-ComponentList-list ebComponentList eb_scrollbar ebComponentList_focus_forced">\n    ',c=i.if.call(t,t&&t.selectDeselectAll,{hash:{},inverse:f.noop,fn:f.program(1,o,s)}),(c||0===c)&&(h+=c),h+='\n\n    <div class="ebComponentList-items">\n        ',c=i.each.call(t,t&&t.items,{hash:{},inverse:f.noop,fn:f.program(3,r,s)}),(c||0===c)&&(h+=c),h+='\n        <div class="ebComponentList-info"></div>\n        <div class="ebComponentList-loader">\n            <div class="ebLoader">\n                <div class="ebLoader-Holder"><span class="ebLoader-Dots ebLoader-Dots_size_small"></span></div>\n            </div>\n        </div>\n    </div>\n</div>\n'})}),define("widgets/ItemsControl/ComponentList/list/ListView",["jscore/core","jscore/ext/utils","template!./_list.hbs","styles!./_list.less","widgets/utils/domUtils","template!./_listPartial.hbs","template!./_menuPartial.hbs"],function(e,t,i,n,s,o,r){"use strict";function l(e,t){e.setModifier("expandable",t,"ebComponentList-group")}function a(e,t,i){var n=e.find(".elWidgets-ComponentList-expand-arrow");n.removeModifier(t,"ebIcon"),n.setModifier(i,"","ebIcon")}return e.View.extend({getTemplate:function(){var e=t.clone(this.options);return e.items&&this.prepareItemsData(e.items),i(e,{partials:{item:o,menu:r}})},getStyle:function(){return n},prepareItemsData:function(e){var t=0,i=this.options.checkboxes,n=function(e){e.forEach(function(e){var s=e.type;"separator"===s?e._separator=!0:e.link||(e._action=!0),i&&"separator"!==s&&(e._checkbox=!0);var o=e.expandable;o&&(e._expanded=!1),e.header&&(e._headerIndex=t,t++),e.items&&n(e.items)})};n(e),this.removeInvalidSeparators(e)},removeInvalidSeparators:function(e){for(var t=0;t<e.length;t++){var i=e[t];"separator"===i.type&&(e[t-1]&&e[t+1]||(i._separator=!1,e.splice(t,1),t--))}},getItemsHolder:function(){return this.getElement().find(".ebComponentList-items")},getItems:function(){return this._allItems||(this._allItems=s.findAll(".ebComponentList-item, .ebComponentList-separator, .ebComponentList-item_icon",this.getElement())),this._allItems},getSelectableItems:function(){return this.__selectableItems||(this.__selectableItems=s.findAll(".ebComponentList-item:not(.ebComponentList-item_disabled), .ebComponentList-group_expandable_collapsed > .ebComponentList-group-header, .ebComponentList-item_icon:not(.ebComponentList-item_disabled)",this.getElement())),this.__selectableItems},getMessageInfo:function(){return this.getElement().find(".ebComponentList-info")},getLoader:function(){return this.getElement().find(".ebComponentList-loader")},showLoader:function(){this.getElement().setModifier("loading","","ebComponentList")},hideLoader:function(){this.getElement().removeModifier("loading","ebComponentList")},getSelectAllLink:function(){return s.findAll(".elWidgets-MultiSelectBox-selectAll",this.getElement())[0]},getDeSelectAllLink:function(){return s.findAll(".elWidgets-MultiSelectBox-deselectAll",this.getElement())[0]},getSelectDeSelectDiv:function(){return s.findAll(".elWidgets-MultiSelectBox-selectDeselectAllWrap",this.getElement())[0]},getGroupHolders:function(){return this.getElement().findAll(".ebComponentList-group")},getExpandableHeaderHolder:function(e){return this.getGroupHolders()[e]},setExpandedArrow:function(e){var t=this.getGroupHolders()[e];l(t,"expanded"),a(t,"rightArrow","downArrow")},setCollapsedArrow:function(e){var t=this.getGroupHolders()[e];l(t,"collapsed"),a(t,"downArrow","rightArrow")}})}),define("widgets/ItemsControl/ComponentList/list/List",["jscore/core","widgets/WidgetCore","./ListView","../../../utils/domUtils","../../../utils/parserUtils"],function(e,t,i,n,s){"use strict";function o(e){var t=e._headerIndex;e._expanded=!0,this.view.setExpandedArrow(t)}function r(e){var t=e._headerIndex;e._expanded=!1,this.view.setCollapsedArrow(t)}function l(e){var t=this.focusableItemsLevel,i=t[e],n=this.focusableItems,s=0;n.forEach(function(e){var n=t[s];i<=n&&e._expanded&&r.call(this,e),s++}.bind(this))}function a(e){e.setModifier("selected","","ebComponentList-item")}function c(e){e.removeModifier("selected","ebComponentList-item")}function h(e){if(0!==e.length)for(var t=this.view.getItems(),i=t.length,n=0;n<=i-1;n++)if(this.options.items[n].value===e[0].value){a(t[n]);break}}return t.extend({view:function(){return new i(this.options)},init:function(){var e=this.options;this._currentFocusedItem=void 0,e.selectDeselectAll===!0&&(e.selectDeselectAll={selectAllLabel:"Select All",deselectAllLabel:"Deselect All"});var t=this.getFocusableItems(e.items);this.focusableItems=t._items,this.focusableItemsLevel=t._itemsLevels,this.checkForIcons(),this.selectMode=e.selectMode||"none"},onViewReady:function(e,t){h.call(this,t),this.options.showAsDialog===!0&&this.getElement().setModifier("border","none");var i=this.view;if(i.getSelectableItems().forEach(function(e,t){e._indexInList=t,e.addEventHandler("mousemove",function(e){var i=e.originalEvent;i.pageX===this.mousePageX&&i.pageY===this.mousePageY||(this.mousePageX=i.pageX,this.mousePageY=i.pageY,this.resetCurrentItemFocus(),this.setFocusedItem(t,!0))}.bind(this)),e.addEventHandler("click",function(e){e&&e.stopPropagation&&e.stopPropagation(),this.onListItemClicked(t,e)}.bind(this))}.bind(this)),this.options.selectDeselectAll){var n=function(e){return function(t){t.originalEvent.stopPropagation(),this.view.getSelectableItems().forEach(function(t){var i=t.find(".ebCheckbox");i&&i.getProperty("checked")!==e&&i.setProperty("checked",e)}),this.onListItemClicked(-1)}.bind(this)}.bind(this);i.getSelectAllLink().addEventHandler("click",n(!0)),i.getDeSelectAllLink().addEventHandler("click",n(!1))}},getFocusableItems:function(e){var t=[],i=[],n=0,s=function(e){function o(e){i.push(n),t.push(e)}function r(e){"separator"===e.type||e.disabled||e.header||o(e)}e&&e.forEach(function(e){e.items?e.expandable?(o(e),n++,this.menu=!0,s(e.items),n--):e.items.forEach(r):r(e)}.bind(this))}.bind(this);return s(e),{_items:t,_itemsLevels:i}},checkForIcons:function(){var e=!1,t=this.options.items;t&&(t.forEach(function(t){if(t.items&&t.items.length>0){var i=!t.expandable;t.items.forEach(function(t){void 0!==t.icon&&(e=!0,i=!0)}),t.showIconLevel=i}void 0!==t.icon&&(e=!0)}.bind(this)),t.forEach(function(t){e&&t.items&&t.items.length>0?(t.icon&&(t.icon=s.parseIcons(t.icon)),t.showIcon=!0,t.showIconLevel&&t.items.forEach(function(e){e.icon=s.parseIcons(e.icon),e.showIcon=!0})):e&&(t.icon=s.parseIcons(t.icon),t.showIcon=!0)}.bind(this)))},getItems:function(){return this.options.items},showMessageInfo:function(e){this.view.getMessageInfo().setText(e),this.getElement().setModifier("info","","ebComponentList")},hideMessageInfo:function(){this.getElement().removeModifier("info","ebComponentList")},showLoader:function(){this.view.showLoader()},hideLoader:function(){this.view.hideLoader()},setFocusedItem:function(e,t){if(!(e<0)){e%=this.focusableItems.length,this._currentFocusedItem=this.view.getSelectableItems()[e];var i=this._currentFocusedItem;i&&(i.setModifier("focused","","ebComponentList-item"),t||n.scrollIntoView(i,this.getElement()))}},resetCurrentItemFocus:function(){var e=-1,t=this._currentFocusedItem;return void 0!==t&&(t.removeModifier("focused","ebComponentList-item"),e=t._indexInList,delete this._currentFocusedItem),e},setSelectedItem:function(e){this.clearSelection(e),a(this.view.getSelectableItems()[e])},clearSelection:function(e){for(var t=this.view.getSelectableItems(),i=t.length,n=0;n<=i-1;n++)n!==e&&c(t[n])},onListItemClicked:function(e,t){var i=this._currentFocusedItem;if(void 0!==e||void 0!==i){e=void 0!==e?e:i._indexInList,this.resetCurrentItemFocus(),this.setFocusedItem(e);var n=this.view.getSelectableItems();switch(this.selectMode){case"single":this.clearSelection(e),a(n[e])}var s=this.focusableItems;if(this.options.checkboxes){var r=[];n.forEach(function(e){e.find(".ebCheckbox").getProperty("checked")&&r.push(s[e._indexInList])}.bind(this)),this.trigger("itemSelected",r)}else{var c=s[e];if(c.expandable){var h=c._expanded;return l.call(this,e),void(h||o.call(this,c))}"function"==typeof c.action&&c.directAction===!0?c.action(t):this.trigger("itemSelected",c)}}},reset:function(){this.menu&&l.call(this,0)},isExpanded:function(e){var t=this.focusableItems[e]._expanded;return void 0===t||t}})}),define("styles!widgets/ItemsControl/ComponentList/_componentList.less",function(){return".elWidgets-ComponentList {\n  z-index: 1500;\n}\n.elWidgets-ComponentList_animated {\n  opacity: 0;\n  transition: opacity .3s;\n}\n.elWidgets-ComponentList_show {\n  opacity: 1;\n}\n"}),define("text!widgets/ItemsControl/ComponentList/_componentList.html",function(){return'<div class="elWidgets-ComponentList"></div>\n'}),define("widgets/ItemsControl/ComponentList/ComponentListView",["jscore/core","text!./_componentList.html","styles!./_componentList.less"],function(e,t,i){return e.View.extend({getTemplate:function(){return t},getStyle:function(){return i}})}),define("widgets/ItemsControl/ComponentList/ComponentList",["jscore/core","widgets/WidgetCore","./ComponentListView","widgets/utils/domUtils","./list/List","widgets/Dialog"],function(e,t,i,n,s,o){"use strict";function r(){var e=this.options,t=e.container||e.parent,i=t.getPosition(),s=n.isTouchZoomActive()?n.getDocumentPosition(t):i,o=this._userOffsets||{};return o.top=o.top||0,o.left=o.left||0,{documentTop:s.top+o.top,documentLeft:s.left+o.left,viewportTop:i.top+o.top,viewportLeft:i.left+o.left}}function l(){this.posInterval||(this.posInterval=setInterval(function(){var e=r.call(this),t=this.position;t.viewportTop===e.viewportTop&&t.viewportLeft===e.viewportLeft||this.hide()}.bind(this),1e3/24)),requestAnimationFrame(function(){this.options.persistent||h.call(this)}.bind(this))}function a(t){this.getElement().contains(e.Element.wrap(t.originalEvent.target))||(c.call(this),this.hide())}function c(){var e=this.clickBodyEventId;e&&(e.destroy(),delete this.clickBodyEventId);var t=this.touchBodyEventId;t&&(t.destroy(),delete this.touchBodyEventId)}function h(){var t=e.Element.wrap(document.documentElement);this.clickBodyEventId||(this.clickBodyEventId=t.addEventHandler("click",a.bind(this))),this.touchBodyEventId||(this.touchBodyEventId=t.addEventHandler("touchend",a.bind(this)))}var d=6;return t.extend({view:function(){return new i(this.options)},init:function(){var e=this.options;this.selectedItems=e.selectedItems||[],this._userOffsets={top:0,left:0},e.selectDeselectAll===!0&&(e.selectDeselectAll={selectAllLabel:"Select All",deselectAllLabel:"Deselect All"}),this.showAsDialog=e.showAsDialog===!0},onViewReady:function(){if(this.setList(),this.showAsDialog)return this.setDialog();var e=this.getElement();this.list.attachTo(e),e.addEventHandler("mousedown",function(e){e.preventDefault()}),this.options.animate&&e.setModifier("animated",void 0,"elWidgets-ComponentList")},onDestroy:function(){this.doHide();var e=this.dialog;e&&e.destroy();var t=this.list;t&&t.destroy()},getFocusableItems:function(e){return s.prototype.getFocusableItems(e)},isExpanded:function(e){return this.list.isExpanded(e)},setList:function(){this.list=new s(this.options,this.selectedItems),this.list.addEventHandler("itemSelected",function(e){var t=this.options;switch(t.selectMode){case"single":this.selectedItems[0]=e}this.trigger("itemSelected",e),t.checkboxes||this.hide()}.bind(this))},setListStyle:function(e,t){var i=this.getElement();return"height"===e&&"auto"===t?(i.removeStyle("max-height"),void this.list.getElement().removeStyle("max-height")):void i.setStyle(e,t)},getSelectableItemsElements:function(){return this.list.view.getSelectableItems()},getCurrentFocusedItem:function(){return this.list._currentFocusedItem},setDialog:function(){var e=this.options,t=e.checkboxes,i=t!==!0?"Cancel":"Done";this.dialog=new o({content:this.list,topRightCloseBtn:t!==!0,fullContent:!0,visible:!1,closable:!0,buttons:[{caption:e.dismissLabel||i,color:"darkBlue",action:this.hide.bind(this)}]});var n=this.dialog;n.addEventHandler("hide",this.hide.bind(this)),n.attachTo(this.getElement())},getItems:function(){return this.options.items},show:function(){if(this.deleteTransitionEvent(),this.render(),this.isShowing=!0,this.showAsDialog){var e=this.dialog;e.isVisible()||e.show()}else l.call(this);this.options.animate&&this.getElement().setModifier("show",void 0,"elWidgets-ComponentList")},hide:function(){if(this.isShowing=!1,this.options.animate){var e=this.getElement();e.removeModifier("show","elWidgets-ComponentList"),this.deleteTransitionEvent(),this.transitionEvent=e.addEventHandler(n.transitionEventName,function(){this.doHide(),this.deleteTransitionEvent()}.bind(this))}else this.doHide();this.list.resetCurrentItemFocus()},toggle:function(){this.isShowing=!this.isShowing,this.isShowing?this.show():this.hide()},isVisible:function(){return this.isShowing},doHide:function(){clearInterval(this.posInterval),delete this.posInterval,this.getElement().detach(),c.call(this);var e=this.dialog;e&&e.hide(),this.list.reset(),this.trigger("hide")},showLoader:function(){this.isVisible()&&this.list.showLoader()},hideLoader:function(){this.list.hideLoader()},setPositionOffsets:function(e){this._userOffsets=e,this.render()},render:function(){function t(){w=!0,f=v+"px"}function i(){var e=8,t=g-m.viewportLeft-e,i=m.viewportLeft+c-e;t>=i?s.setStyle({left:m.documentLeft,width:t+"px"}):s.setStyle({left:e,width:i+"px"})}var s=this.getElement();if(s.detach(),this.showAsDialog)return void e.Element.wrap(document.body).append(s);var o,l=this.options,a=l.parent,c=a.getProperty("offsetWidth"),h=a.getProperty("offsetHeight"),u=l.width||c+"px",f=l.height||"250px";l.minWidth&&s.setStyle("min-width",l.minWidth),"auto"===u&&0!==c&&s.setStyle("min-width",c+"px");var m=r.call(this);this.position=m;var p=e.Window,v=p.getProperty("innerHeight"),g=p.getProperty("innerWidth"),b=m.documentTop+h+d,L=parseInt(f),I=parseInt(u);u.indexOf("%")>-1&&(u=g*I/100);var w=!1;"auto"===f?t():f.indexOf("px")>-1&&L>=v-h?t():f.indexOf("%")>-1&&(L=v*L/100,L>=v-h?t():f=L+"px"),s.setStyle({position:"fixed",display:"block",top:b+"px",left:m.documentLeft+"px",width:u,"max-height":f});var C=this.list,E=C.getElement();E.setStyle({"max-height":f}),e.Element.wrap(document.body).append(s);var y=s.getProperty("offsetHeight"),x=s.getProperty("offsetWidth"),S=m.viewportTop+h+d;if(S+y>=v){var _=m.documentTop-y-d;if(s.setStyle({top:_+"px"}),_<0){var k=m.viewportTop-2*d,A=v-S-d,F=k>A?k:A,H=k>A?d:b;s.setStyle({top:H+"px",maxHeight:F+"px"}),E.setStyle({"max-height":F+"px"})}else w&&(o={"max-height":y},s.setStyle(o),E.setStyle(o))}else w&&(o={"max-height":v-b-d+"px"},s.setStyle(o),E.setStyle(o));"auto"===u&&C.view.getItemsHolder().getProperty("offsetHeight")>s.getProperty("offsetHeight")&&s.setStyle({width:s.getProperty("offsetWidth")+n.getScrollbarWidth()+"px"}),m.viewportLeft+x>g?m.viewportLeft+c<x?i():s.setStyle({left:m.documentLeft-(x-c)+"px"}):"0px"===u&&i()},deleteTransitionEvent:function(){this.transitionEvent&&(this.transitionEvent.destroy(),delete this.transitionEvent)},showMessageInfo:function(e){this.list.showMessageInfo(e)},hideMessageInfo:function(){this.list.hideMessageInfo()},setFocusedItem:function(e,t){this.list.setFocusedItem(e,t)},resetCurrentItemFocus:function(){return this.list.resetCurrentItemFocus()},setSelectedItem:function(e){this.list.setSelectedItem(e)},clearSelection:function(){this.list.clearSelection()},onListItemClicked:function(e){this.list.onListItemClicked(e)}})}),define("widgets/ItemsControl/ItemsControl",["widgets/WidgetCore","./ComponentList/ComponentList","../utils/keyboardUtils","jscore/ext/utils","jscore/ext/privateStore"],function(e,t,i,n,s){"use strict";function o(){g(this).enabled&&(this.removeModifier("disabled"),this.enableKeyboardControl(),this.onEnable())}function r(){this.setModifier("disabled"),this.disableKeyboardControl(),this.onDisable()}function l(e){var i=[];g(this).componentList&&(i=g(this).componentList.selectedItems,g(this).componentList.destroy());var s={};n.extend(s,g(this).options),n.extend(s,{items:n.clone(e,!0),parent:this.getElement(),selectedItems:i}),g(this).componentList=new t(s),a.call(this)||g(this).componentList.setFocusedItem(0),g(this).componentList.addEventHandler("itemSelected",function(e){e&&(this.getFocusableElement().focus(),g(this)._onItemSelectedTimeout&&cancelAnimationFrame(g(this)._onItemSelectedTimeout),g(this)._onItemSelectedTimeout=requestAnimationFrame(function(){this.onItemSelected(e)}.bind(this)))}.bind(this)),g(this).componentList.addEventHandler("hide",function(){this.onListHide()}.bind(this))}function a(){var e=this.getFocusableElement().getNative();return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e.hasAttribute("contenteditable")}function c(){g(this).keyBoardControl={arrow_up:d.bind(this),arrow_down:h.bind(this),enter:f.bind(this),tab:m.bind(this),escape:p.bind(this),space:v.bind(this)}}function h(e){var t=g(this).componentList;if(g(this).keyboardControlEnabled===!0){if(t.isVisible()){var i=t.resetCurrentItemFocus(),n=u.call(this,i,1);t.setFocusedItem(n)}else this.showList();e.preventDefault()}}function d(e){if(g(this).keyboardControlEnabled===!0){var t=g(this).componentList;if(t.isVisible()){var i=t.resetCurrentItemFocus(),n=u.call(this,i,-1);t.setFocusedItem(n)}e.preventDefault()}}function u(e,t){var i,n=a.call(this)?-1:0,s=g(this).focusableItems.length-1,o=e+t,r=g(this).focusableItemsLevel,l=g(this).componentList;if(o<n){var c=r[s];if(c>0){for(i=s;c<=r[i];)i+=t;if(!l.isExpanded(i))return i}return s}if(o>s)return n;if(e===-1||n===-1)return o;var h=r[e];if(e<o){if(!l.isExpanded(e))for(;h<r[o];)if(o+=t,o>s)return n;return o}if(h<r[o]){for(i=o;h<r[i];)i+=t;if(!l.isExpanded(i))return i}return o}function f(e){if(g(this).keyboardControlEnabled===!0)if(g(this).options.checkboxes)this.toggle();else{var t=g(this).componentList;t.isVisible()?t.onListItemClicked():this.showList()}e.preventDefault()}function m(){var e=g(this).componentList;!g(this).options.checkboxes&&g(this).keyboardControlEnabled===!0&&e.isVisible()&&e.onListItemClicked(),this.hideList()}function p(){this.hideList()}function v(e){if(g(this).options.checkboxes){if(this.isKeyboardControlled()){var t=g(this).componentList,i=t.getCurrentFocusedItem();t.isVisible()&&void 0!==i?i.find(".ebCheckbox").trigger("click"):this.showList()}e.preventDefault()}}var g=s.create();return e.extend({init:function(){g(this).options=n.clone(this.options,!0),g(this).items=[],g(this).componentList=void 0,g(this).enabled=void 0===g(this).options.enabled||g(this).options.enabled,this.onInit()},onViewReady:function(){var e=g(this).options;e.modifiers&&this.setModifiers(e.modifiers),c.call(this),g(this).enabled?this.enable():this.disable(),this.setItems(e.items||[]);var t=this.getFocusableElement();e.quickItemFocus===!0&&t.addEventHandler("keypress",function(e){function t(){if(void 0!==r.name)return r.name;if(void 0!==r.header)return r.header;throw new Error("Item not defined correctly")}function n(e){d.setFocusedItem(e)}function s(){r=c[h],o=t(),o.toLowerCase().charCodeAt(0)===l?(n(h),a=!0):h=u.call(this,h,1)}e.preventDefault();var o,r,l,a,c,h,d=g(this).componentList;if(g(this).keyboardControlEnabled===!0&&d.isVisible()){if(c=g(this).focusableItems,l=void 0!==e.originalEvent.key?e.originalEvent.key.toLowerCase().charCodeAt(0):String.fromCharCode(e.originalEvent.keyCode).toLowerCase().charCodeAt(0),l===i.SPACE)return void console.log("reserved key");var f=d.resetCurrentItemFocus();if(h=u.call(this,f,1),a=!1,f===-1){do s.call(this);while(0!==h&&!a);return}for(;f!==h&&!a;)s.call(this);a||n(f)}}.bind(this)),t.addEventHandler("focus",function(){this.trigger("focus")},this),e.bindClick!==!1&&this.getElement().addEventHandler("click",function(e){this.getFocusableElement().focus(),this.trigger("click"),this.toggle()},this),this.onControlReady()},onDestroy:function(){var e=g(this).componentList;e&&e.destroy()},getFocusableElement:function(){return this.getElement()},onInit:function(){},onControlReady:function(){},setWidth:function(e){g(this).options.width=e;var t=g(this).componentList;t&&(t.options.width=e,t.setListStyle("width",e))},setMinWidth:function(e){g(this).options.minWidth=e;var t=g(this).componentList;t&&(t.options.minWidth=e,t.setListStyle("min-width",e))},setHeight:function(e){g(this).options.height=e;var t=g(this).componentList;t&&(t.options.height=e,"auto"===e&&t.setListStyle("height",e))},setItems:function(e){if(e.length>0){l.call(this,e),g(this).items=e;var i=t.prototype.getFocusableItems(e);g(this).focusableItems=i._items,g(this).focusableItemsLevel=i._itemsLevels,o.call(this)}else{var n=g(this).componentList;n&&(n.destroy(),g(this).componentList=void 0),r.call(this)}this.onItemsSet()},getItems:function(e){if(e=void 0!==e?e:"default","default"===e)return g(this).items;if("focusable"===e)return g(this).focusableItems;throw new Error("Invalid arguments")},setFilter:function(e){var t=[],i=[],n=function(t){return"separator"===t.type||e(t)};if(g(this).items.forEach(function(e){if(e.items){var s=[];e.items.forEach(function(e){n(e)&&(s.push(e),"separator"!==e.type&&i.push(e))}),s.length>0&&t.push({header:e.header,items:s})}else n(e)&&(t.push(e),"separator"!==e.type&&i.push(e))}),g(this).componentList){var s=g(this).componentList.isVisible();l.call(this,t),s&&i.length>0?g(this).componentList.show():0===i.length&&g(this).componentList.hide()}return g(this).focusableItems=i,i},setFocusedItem:function(e){var t=g(this).componentList;if(t){for(var i=-1,n=g(this).focusableItems,s=0;s<n.length;s++){var o=n[s];if(o.name===e.name||o.value===e.value){i=s;break}}t.resetCurrentItemFocus(),i>-1&&t.setFocusedItem(i)}},setSelectedItem:function(e){var t=g(this).componentList;if(t){for(var i=-1,n=g(this).focusableItems,s=0;s<n.length;s++){var o=n[s];if(o.name===e.name&&o.value===e.value){i=s;break}}i>-1&&t.setSelectedItem(i)}},clearSelection:function(){var e=g(this).componentList;e&&e.clearSelection()},onItemsSet:function(){},onListShow:function(){},onListHide:function(){},showMessageInfo:function(e){var t=g(this).componentList;t&&g(this).enabled&&(t.showMessageInfo(e),g(this).keyboardControlEnabled=!1)},hideMessageInfo:function(){var e=g(this).componentList;e&&g(this).enabled&&(e.hideMessageInfo(),g(this).keyboardControlEnabled=!0)},isListShowing:function(){var e=g(this).componentList;return e&&e.isShowing},showList:function(){var e=g(this).componentList;e&&g(this).enabled&&(e.show(),this.onListShow())},hideList:function(){var e=g(this).componentList;e&&e.hide()},toggle:function(){this.isListShowing()?this.hideList():this.showList()},showLoader:function(){g(this).enabled&&(g(this).componentList||(g(this).forcedShow=!0,l.call(this,[])),this.showList(),this.disableKeyboardControl(),g(this).componentList.resetCurrentItemFocus(),
g(this).componentList.showLoader())},hideLoader:function(){var e=g(this).componentList;e&&(this.enableKeyboardControl(),e.hideLoader(),g(this).forcedShow===!0&&(e.destroy(),g(this).componentList=void 0,g(this).forcedShow=void 0))},enable:function(){g(this).enabled=!0,o.call(this)},onEnable:function(){},disable:function(){this.hideList(),g(this).enabled=!1,r.call(this)},onDisable:function(){},enableKeyboardControl:function(){g(this).keyboardControlEnabled=!0,void 0===g(this)._kbCtrlEvtId&&(g(this)._kbCtrlEvtId=i.addKeyHandler(this.getFocusableElement(),g(this).keyBoardControl))},disableKeyboardControl:function(){g(this).keyboardControlEnabled=!1,i.removeKeyHandler(this.getFocusableElement(),g(this)._kbCtrlEvtId),delete g(this)._kbCtrlEvtId},isKeyboardControlled:function(){return g(this).keyboardControlEnabled},setCheckboxes:function(e){var t=g(this).componentList.getSelectableItemsElements(),i=g(this).focusableItems;i&&i.forEach(function(i,n){var s=e(i);void 0!==s&&t[n].find(".ebCheckbox").setProperty("checked",s)}.bind(this))},onItemSelected:function(e){},setOption:function(e,t){g(this).options[e]=t}})}),define("widgets/ItemsControl",["widgets/ItemsControl/ItemsControl"],function(e){return e});