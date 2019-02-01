/* Copyright (c) Ericsson 2019 */

define("text!widgets/ComboMultiSelect/_comboMultiSelect.html",function(){return'<div class="ebComboMultiSelect">\n    <textarea class="ebComboMultiSelect-textarea ebTextArea" autocomplete="off"></textarea>\n    <button type="button" class="ebComboMultiSelect-helper">\n        <span class="ebComboMultiSelect-iconHolder">\n            <i class="ebIcon ebIcon_small ebIcon_downArrow_10px eb_noVertAlign"></i>\n        </span>\n    </button>\n    <div class="ebComboMultiSelect-listHolder"></div>\n\n    <div class="ebComboMultiSelect-body"></div>\n</div>'}),define("widgets/ComboMultiSelect/ComboMultiSelectView",["jscore/core","text!./_comboMultiSelect.html"],function(t,e){"use strict";var i=".ebComboMultiSelect-";return t.View.extend({afterRender:function(){this.textarea=this.getElement().find(i+"textarea"),this.helper=this.getElement().find(i+"helper"),this.listHolder=this.getElement().find(i+"listHolder")},getTemplate:function(){return e},getTextArea:function(){return this.textarea},getHelper:function(){return this.helper},getListHolder:function(){return this.listHolder}})}),define("widgets/utils/textUtils",[],function(){"use strict";var t={getTextWidth:function(e,i){var s=t.getTextWidth.canvas||(t.getTextWidth.canvas=document.createElement("canvas")),n=s.getContext("2d");n.font=i;var o=n.measureText(e);return Math.round(o.width)}};return t}),define("widgets/utils/keyboardUtils",[],function(){"use strict";var t={},e={BACKSPACE:8,TAB:9,ENTER:13,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46},i=function(e,i){var s,n=e.originalEvent.keyCode;if(Object.keys(i).some(function(e){if(t[e.toUpperCase()]===n)return s=i[e],!0}),s)return s(e)},s=function(t,e){if(!t||!e)throw new Error("Missing event argument");return t.addEventHandler("keydown",function(t){return i(t,e)})},n=function(t,e){e&&t.removeEventHandler(e)};return Object.keys(e).forEach(function(i){Object.defineProperty(t,i,{value:e[i],writable:!1})}),t.addKeyHandler=s,t.removeKeyHandler=n,t}),define("text!widgets/ComboMultiSelect/selectList/_selectList.html",function(){return'<ul class="ebComboMultiSelectList"></ul>'}),define("widgets/ComboMultiSelect/selectList/SelectListView",["jscore/core","text!./_selectList.html"],function(t,e){"use strict";return t.View.extend({getTemplate:function(){return e}})}),define("template!widgets/ComboMultiSelect/selectList/item/_item.html",["jscore/handlebars/handlebars"],function(t){return t.template(function(t,e,i,s,n){function o(t,e){var s,n,o="";return o+='title="',(n=i.title)?s=n.call(t,{hash:{}}):(n=t&&t.title,s=typeof n===h?n.call(t,{hash:{}}):n),o+=r(s)+'"'}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,t.helpers);var l,c,a="",h="function",r=this.escapeExpression,d=this;return a+='<li class="ebComboMultiSelectList-item" ',l=i.if.call(e,e&&e.title,{hash:{},inverse:d.noop,fn:d.program(1,o,n)}),(l||0===l)&&(a+=l),a+='>\n    <span class="ebComboMultiSelectList-itemTitle">',(c=i.name)?l=c.call(e,{hash:{}}):(c=e&&e.name,l=typeof c===h?c.call(e,{hash:{}}):c),a+=r(l)+'</span>\n    <i class="ebComboMultiSelectList-itemClose ebIcon ebIcon_close ebIcon_interactive"></i>\n</li>'})}),define("widgets/ComboMultiSelect/selectList/item/ItemView",["jscore/core","template!./_item.html"],function(t,e){"use strict";var i=".ebComboMultiSelectList-";return t.View.extend({getTemplate:function(){return e(this.options)},getCloseIcon:function(){return this.getElement().find(i+"itemClose")}})}),define("widgets/ComboMultiSelect/selectList/item/Item",["jscore/core","./ItemView"],function(t,e){"use strict";return t.Widget.extend({ITEM_CLOSE:"item:close",ITEM_SELECT:"item:select",view:function(){return new e(this.options.data)},onViewReady:function(){this.data={name:this.options.data.name,value:this.options.data.value,title:this.options.data.title},this.options.enabled===!1?this.disable():this.enable()},getData:function(){return this.data},getPosition:function(){return this.getElement().getPosition()},enable:function(){void 0===this._selectEvtId&&(this._selectEvtId=this.getElement().addEventHandler("click",function(){this.select()},this));var t=this.view.getCloseIcon();void 0===this._closeEvtId&&(this._closeEvtId=t.addEventHandler("click",function(){this.trigger(this.ITEM_CLOSE,this)},this)),this.getElement().addEventHandler("click",function(t){t&&t.stopPropagation&&t.stopPropagation(),this.select()}.bind(this)),this.getElement().removeModifier("disabled"),t.removeModifier("disabled","ebIcon")},disable:function(){this._selectEvtId&&(this._selectEvtId.destroy(),delete this._selectEvtId);var t=this.view.getCloseIcon();this._closeEvtId&&(this._closeEvtId.destroy(),delete this._closeEvtId),this.getElement().setModifier("disabled"),t.setModifier("disabled","","ebIcon")},select:function(t){t&&t.silent===!0||this.trigger(this.ITEM_SELECT,this),this.getElement().setModifier("active")},unselect:function(){this.getElement().removeModifier("active")}})}),define("widgets/ComboMultiSelect/selectList/SelectList",["jscore/core","./item/Item","widgets/utils/domUtils","./SelectListView"],function(t,e,i,s){"use strict";function n(t){var e=this._childItems.indexOf(t);e!==-1&&this._childItems.splice(e,1),t.destroy(),this.trigger(this.LIST_CHANGE)}function o(t){return this._childItems.some(function(e){return l(t,e.getData())})}function l(t,e){return t.name===e.name&&t.title===e.title&&t.value===e.value}function c(){var t=this.getElement().getPosition(),e=this._childItems[this._childItems.length-1];return{x:e?Math.floor(e.getPosition().right-t.left):0,y:e?Math.floor(e.getPosition().top-t.top):0}}function a(t){if(this.options.onItemRemove){var e=function(){t===this.getSelectedItem()&&this.setSelectedItem(void 0),n.call(this,t)},i=function(){this.getSelectedItem()&&this.getSelectedItem().unselect()};this.options.onItemRemove(t,e.bind(this),i.bind(this))}else t===this.getSelectedItem()&&this.setSelectedItem(void 0),n.call(this,t)}return t.Widget.extend({LIST_CHANGE:"list:change",LIST_SELECT:"list:select",View:s,init:function(t){this._childItems=[]},onViewReady:function(){this.setSelectCount(this.options.selectCount),this.setItems(this.options.items)},getItems:function(){var t=[];return this._childItems.forEach(function(e){t.push(e.getData())}),t},getLastItemPosition:function(){return c.call(this)},getLastItem:function(){return this._childItems[this._childItems.length-1]},emptyList:function(){this._childItems.forEach(function(t){t.destroy()}),this._childItems=[]},getSelectCount:function(){return this.selectCount},setSelectCount:function(t){this.selectCount=t,1===this.selectCount?this.getElement().setModifier("select","single"):this.getElement().removeModifier("select","single")},setItems:function(t){this.emptyList(),t=t||[],t.forEach(this.addItem.bind(this))},addItem:function(t){if(!o.call(this,t)){var i=new e({data:t,enabled:this.isEnabled()});i.addEventHandler(e.prototype.ITEM_SELECT,this.setSelectedItem,this),i.addEventHandler(e.prototype.ITEM_CLOSE,function(t){a.call(this,t)}.bind(this),this),this.getSelectCount()===this._childItems.length&&this.removeItem(this.getLastItem()),this._childItems.push(i),i.attachTo(this.getElement()),this.trigger(this.LIST_CHANGE)}},isEnabled:function(){return this.enabled},enable:function(){this.enabled=!0,this._childItems.forEach(function(t){t.enable()})},disable:function(){this.enabled=!1,this._childItems.forEach(function(t){t.disable()})},selectPreviousItem:function(){var t=this._childItems.length;if(0!==t){if(void 0===this.selectedItem)return void this.getLastItem().select();var e=this._childItems.indexOf(this.selectedItem)-1,i=this._childItems[e>0?e:0];i.select()}},selectNextItem:function(){var t=this._childItems.length;if(0!==t){var e=this._childItems.indexOf(this.selectedItem)+1,i=this._childItems[e!==t?e:t-1];i.select()}},getSelectedItem:function(){return this.selectedItem},setSelectedItem:function(t){void 0!==this.selectedItem&&this.selectedItem.unselect(),this.selectedItem=t,this.trigger(this.LIST_SELECT)},removeItem:function(t){void 0!==t&&a.call(this,t)}})}),define("widgets/utils/AutoCompleteWidget",["widgets/ItemsControl"],function(t){"use strict";function e(){var t=this.getFocusableElement().getValue(),e=i(t);t!==e&&this.getFocusableElement().setValue(e),this.autoComplete&&this.autoComplete.caseInsensitive&&(e=e.toLowerCase());var s=this.setFilter(function(t){return this.autoComplete&&this.autoComplete.caseInsensitive?t._lowerCaseName&&t._lowerCaseName.indexOf(e)!==-1||t._lowerCaseTitle&&t._lowerCaseTitle.indexOf(e)!==-1:t.name&&t.name.indexOf(e)!==-1||t.title&&t.title.indexOf(e)!==-1}.bind(this));0===s.length?this.autoComplete.message.notFound?(this.showMessageInfo(this.autoComplete.message.notFound),this.showList()):this.hideList():(this.hideMessageInfo(),this.showList())}function i(t){return t.replace(/\r?\n/g,"")}return t.extend({onViewReady:function(){var e=this.options.autoComplete||{};this.autoComplete={enabled:void 0===e.enabled||e.enabled,message:e.message||{},caseInsensitive:e.caseInsensitive},t.prototype.onViewReady.call(this),this.options.bindClick!==!1&&this.getElement().addEventHandler("click",function(){this.setFilter(function(){return!0})}.bind(this))},setItems:function(e){this.allItems=e;var i=function(t){t.name&&(t._lowerCaseName=t.name.toLowerCase()),t.title&&(t._lowerCaseTitle=t.title.toLowerCase())};this.autoComplete&&this.autoComplete.caseInsensitive&&this.allItems.forEach(function(t){t.items?t.items.forEach(function(t){i(t)}):i(t)}),t.prototype.setItems.apply(this,arguments)},enable:function(){void 0===this._acInputEvtId&&this.autoComplete.enabled===!0&&this.options.bindClick!==!1&&(this._acInputEvtId=this.getFocusableElement().addEventHandler("input",e,this)),t.prototype.enable.call(this)},disable:function(){this._acInputEvtId&&(this.getFocusableElement().removeEventHandler(this._acInputEvtId),delete this._acInputEvtId),t.prototype.disable.call(this)},setOption:function(e,i){this.options[e]=i,t.prototype.setOption.call(this,e,i)}})}),define("widgets/ComboMultiSelect/ComboMultiSelect",["jscore/core","../utils/AutoCompleteWidget","./selectList/SelectList","../utils/keyboardUtils","widgets/utils/domUtils","../utils/textUtils","./ComboMultiSelectView","jscore/ext/privateStore"],function(t,e,i,s,n,o,l,c){"use strict";function a(){var t=this.view.getTextArea();this.getValue().length>0?t.setAttribute("placeholder",""):(t.setAttribute("placeholder",v(this).placeholder),t.removeStyle("height"),t.removeStyle("padding-top"),t.removeStyle("text-indent"))}function h(){var t=f.call(this);if(0===t.start&&0===t.end){var e=v(this).selectList.getSelectedItem();void 0!==e?v(this).selectList.removeItem(e):v(this).selectList.setSelectedItem(v(this).selectList.getLastItem())}}function r(t){var e=v(this).selectList.getSelectedItem();void 0!==e&&(v(this).selectList.removeItem(e),t.preventDefault())}function d(t){var e=f.call(this);0===e.start&&0===e.end&&v(this).selectList.selectPreviousItem()}function u(t){var e=f.call(this);if(0===e.start&&0===e.end){var i=v(this).selectList,s=i.getSelectedItem(),n=i.getLastItem();if(void 0===s||void 0===n)return;s===n?v(this).selectList.setSelectedItem(void 0):i.selectNextItem(),t.preventDefault()}}function m(t){var e=this.getFocusableElement(),i=n.getElementDimensions(e),s=v(this).selectList.getLastItemPosition(),l=s.y||4,c=s.x,a=l+22;if(t===!0||!v(this).textAreaInnerWidth){var h=parseInt(e.getStyle("padding-left")),r=parseInt(e.getStyle("padding-right"));v(this).textAreaInnerWidth=i.width-h-r-2}var d=o.getTextWidth(e.getValue(),e.getStyle("font")),u=v(this).textAreaInnerWidth-s.x,m=u<.2*v(this).textAreaInnerWidth;m&&1!==v(this).selectList.getSelectCount()&&(c=0,l+=16,a+=16,u=0);var f=Math.ceil((d-u)/v(this).textAreaInnerWidth);f+=m?-1:0,f>0&&(a+=16*f);var g=i.height!==a;return e.setStyle({"padding-top":l+"px",height:a+"px","text-indent":c+"px"}),g}function f(){var t=this.getFocusableElement();return{start:t.getProperty("selectionStart"),end:t.getProperty("selectionEnd")}}var v=c.create();return e.extend({View:l,onInit:function(){v(this).touch=t.Window.isTouch&&t.Window.isTouch(),v(this).touch&&this.setOption("showAsDialog",!0);var e=this.options;v(this).selectList=new i({selectCount:e?e.selectCount:void 0,items:this.options.value,onItemRemove:this.options.onItemRemove}),v(this).placeholder=this.options.placeholder||"",v(this).additionalKeyControls={backspace:h.bind(this),delete:r.bind(this),arrow_left:d.bind(this),arrow_right:u.bind(this)},v(this).selectList.addEventHandler(i.prototype.LIST_CHANGE,function(){m.call(this)&&this.isListShowing()&&(this.hideList(),this.showList()),a.call(this),this.trigger("change")},this),v(this).selectList.addEventHandler(i.prototype.LIST_SELECT,function(){this.getFocusableElement().focus()},this)},onControlReady:function(){v(this).selectList.attachTo(this.view.getListHolder()),a.call(this),v(this).windowEvtId=t.Window.addEventHandler("resize",this.resize.bind(this)),this.getElement().addEventHandler("change",this.trigger.bind(this,"change")),v(this).touch&&this.view.getTextArea().setAttribute("readonly","readonly")},onDOMAttach:function(){m.call(this)},onDestroy:function(){v(this).windowEvtId&&(t.Window.removeEventHandler(v(this).windowEvtId),delete v(this).windowEvtId),e.prototype.onDestroy.call(this)},resize:function(){m.call(this,!0)&&this.isListShowing()&&(this.hideList(),this.showList())},setValue:function(t){void 0!==t&&(v(this).selectList.setItems(t),a.call(this))},getValue:function(){return v(this).selectList.getItems()},getFocusableElement:function(){return this.view.getTextArea()},onFocusableElementInput:function(){m.call(this)},setPlaceholder:function(t){v(this).placeholder=t,a.call(this)},onEnable:function(){1===v(this).selectList.getSelectCount()&&void 0===v(this).keyDownEvtId&&(v(this).keyDownEvtId=this.getFocusableElement().addEventHandler("keydown",function(t){t.originalEvent.keyCode!==s.TAB&&1===v(this).selectList.getItems().length&&t.preventDefault()},this)),v(this).additionalKeyEvtId||(v(this).additionalKeyEvtId=s.addKeyHandler(this.getFocusableElement(),v(this).additionalKeyControls)),v(this).selectList.enable();var t=this.view;t.getTextArea().removeAttribute("disabled"),t.getHelper().removeAttribute("disabled")},onDisable:function(){v(this).selectList.disable();var t=this.getFocusableElement();void 0!==v(this).keyDownEvtId&&(t.removeEventHandler(v(this).keyDownEvtId),delete v(this).keyDownEvtId),v(this).additionalKeyEvtId&&(s.removeKeyHandler(t,v(this).additionalKeyEvtId),delete v(this).additionalKeyEvtId),t.setAttribute("disabled","disabled"),this.view.getHelper().setAttribute("disabled","disabled")},onItemSelected:function(t){var e=this.getFocusableElement();e.setValue(""),e.focus(),v(this).selectList.addItem(t),v(this).selectList.setSelectedItem(void 0),this.setFilter(function(t){return!0})},reset:function(){this.setValue([]),delete v(this).selectedItem},restore:function(){var t=this.options.value;t?this.setValue(t):this.reset()}})}),define("widgets/ComboMultiSelect",["widgets/ComboMultiSelect/ComboMultiSelect"],function(t){return t});