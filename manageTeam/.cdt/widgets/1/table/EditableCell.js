/* Copyright (c) Ericsson 2019 */

define("text!widgets/Table/table/EditableCell/_editableCell.html",function(){return"<td></td>"}),define("widgets/Table/table/EditableCell/EditableCellView",["jscore/core","text!./_editableCell.html"],function(e,t){"use strict";return e.View.extend({getTemplate:function(){return t},getBody:function(){return this.getElement()},setValue:function(e){this.getBody().setText(e)},getValue:function(){return this.getBody().getText()}})}),define("widgets/Table/table/EditableCell/EditableCell",["widgets/table/Cell","./EditableCellView"],function(e,t){"use strict";return e.extend({View:t,onCellReady:function(){var e=this.options,t=e.attribute,l=e.model;this.getElement().setAttribute("contenteditable","true"),this.getElement().addEventHandler("keydown",function(e){13!==e.originalEvent.keyCode||e.originalEvent.shiftKey||this.getElement().getNative().blur()},this),this.getElement().addEventHandler("blur",function(e){var n=this.getValue();l.setAttribute(t,n)},this),this.getElement().addEventHandler("dragover drop",function(e){return e.preventDefault(),!1}),this.getElement().addEventHandler("paste",function(e){e.preventDefault();var t=e.originalEvent.clipboardData.getData("text/plain");document.execCommand("insertHTML",!1,t)})}})}),define("widgets/table/EditableCell",["widgets/Table/table/EditableCell/EditableCell"],function(e){return e});