/* Copyright (c) Ericsson 2019 */

define("widgets/utils/keyboardUtils",[],function(){"use strict";var e={},t={BACKSPACE:8,TAB:9,ENTER:13,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,ARROW_LEFT:37,ARROW_UP:38,ARROW_RIGHT:39,ARROW_DOWN:40,DELETE:46},i=function(t,i){var n,a=t.originalEvent.keyCode;if(Object.keys(i).some(function(t){if(e[t.toUpperCase()]===a)return n=i[t],!0}),n)return n(t)},n=function(e,t){if(!e||!t)throw new Error("Missing event argument");return e.addEventHandler("keydown",function(e){return i(e,t)})},a=function(e,t){t&&e.removeEventHandler(t)};return Object.keys(t).forEach(function(i){Object.defineProperty(e,i,{value:t[i],writable:!1})}),e.addKeyHandler=n,e.removeKeyHandler=a,e}),define("text!widgets/Pagination/_pagination.html",function(){return'<ul class="ebPagination">\n\t<li class="ebPagination-previous">\n\t\t<a class="ebPagination-previousAnchor" href="#"></a>\n\t</li>\n\t<li class="ebPagination-pagesContainer">\n\t\t<ul class="ebPagination ebPagination-pages">\n\t\t</ul>\n\t</li>\n\t<li class="ebPagination-next">\n\t\t<a class="ebPagination-nextAnchor" href="#"></a>\n\t</li>\n</ul>\n'}),define("widgets/Pagination/PaginationView",["jscore/core","text!./_pagination.html"],function(e,t){var i=e.View.extend({afterRender:function(){var e=this.getElement();this.previous=e.find("."+i.EL_PREVIOUS_CLASS),this.previousAnchor=e.find("."+i.EL_PREVIOUS_ANCHOR_CLASS),this.nextAnchor=e.find("."+i.EL_NEXT_ANCHOR_CLASS),this.pages=e.find("."+i.EL_PAGES_CLASS)},getTemplate:function(){return t},getPreviousLi:function(){return this.previous},getPrevious:function(){return this.previousAnchor},getWrapper:function(){return this.getElement()},getPages:function(){return this.pages},getNext:function(){return this.nextAnchor}},{EL_PAGES_CLASS:"ebPagination-pages",EL_PREVIOUS_CLASS:"ebPagination-previous",EL_PREVIOUS_ANCHOR_CLASS:"ebPagination-previousAnchor",EL_NEXT_ANCHOR_CLASS:"ebPagination-nextAnchor"});return i}),define("widgets/Pagination/Pagination",["jscore/core","widgets/WidgetCore","./PaginationView","widgets/utils/domUtils","jscore/ext/privateStore","widgets/utils/keyboardUtils"],function(e,t,i,n,a,s){"use strict";function r(){for(var e=this.view.getPages().children(),t=e.length;t--;)e[t].remove()}function h(e){return w(this).url&&"string"==typeof w(this).url?w(this).url+"/"+e:w(this).url&&"function"==typeof w(this).url?w(this).url(e):""}function o(e){this.options.onPageChange&&this.options.onPageChange(e),this.trigger("pagechange",e)}function g(t,i){var n=e.Element.parse('<li class="ebPagination-entry"><a class="ebPagination-entryAnchor" href="#'+h.call(this,t)+'">'+t+"</a></li>");return n.children()[0].addEventHandler("click",function(e){u.call(this,t,e)}.bind(this)),i&&n.children()[0].setModifier("current"),n}function l(){var t=e.Element.parse('<li class="ebPagination-entry"><a class="ebPagination-entryAnchor ebPagination-entryAnchor_dots" href="#">...</a></li>');return t.children()[0].addEventHandler("click",function(e){e.preventDefault()}.bind(this)),t}function c(e){this.previousPage(),this.view.getPrevious().setAttribute("href","#"+h.call(this,w(this).selectedPage)),w(this).url||e.preventDefault()}function d(e){this.nextPage(),this.view.getNext().setAttribute("href","#"+h.call(this,w(this).selectedPage)),w(this).url||e.preventDefault()}function u(e,t){this.setPage(e),w(this).url||t.preventDefault()}function P(){var e=window.getComputedStyle(this.view.getPreviousLi().getNative(),null),t=parseInt(e.getPropertyValue("margin-left"),10),i=parseInt(e.getPropertyValue("margin-right"),10);w(this).pagePadding=8,w(this).pageMargin=t+i,w(this).minWidth=this.view.getPrevious().getProperty("offsetWidth")+w(this).pageMargin}function f(t){var i=e.Element.parse('<li class="ebPagination-entry"><a style="width:auto" class="ebPagination-entryAnchor ebPagination-entryAnchor_current" href="#">'+t+"</a></li>");this.view.getPages().append(i),w(this).numberWidth=i.children()[0].getProperty("offsetWidth")-8,i.remove()}function v(e,t){t.getNative().parentNode.insertBefore(e.getNative(),t.getNative())}function p(e,t){t.getNative().parentNode.insertBefore(e.getNative(),t.getNative().nextSibling)}function E(e,t,i){var n=g.call(this,e,w(this).selectedPage===e);return t?t.call(this,n,i):this.view.getPages().append(n),w(this).freeSpace-=this.getPageWidth(e),w(this).currPage=w(this).selectedPage===e?n:w(this).currPage,n}var w=a.create();return t.extend({View:i,onViewReady:function(){w(this).totalPages=this.options.pages||0,w(this).selectedPage=this.options.selectedPage||1,w(this).url=this.options.url,this.view.getPrevious().addEventHandler("click",c,this),this.view.getNext().addEventHandler("click",d,this),this.view.getPrevious().addEventHandler("keypress",function(e){e.originalEvent.keyCode===s.ENTER&&c.call(this)},this),this.view.getNext().addEventHandler("keypress",function(e){e.originalEvent.keyCode===s.ENTER&&nextPageClickHandle.call(this)},this),w(this).windowEvtId=e.Window.addEventHandler("resize",this.redraw.bind(this)),this.getElement().setStyle("max-width",this.options.maxWidth||"500px")},onDestroy:function(){e.Window.removeEventHandler(w(this).windowEvtId)},onDOMAttach:function(){this.setPage(w(this).selectedPage)},redraw:function(){r.call(this),f.call(this,1),P.call(this),w(this).freeSpace=this.calculateFreeSpace();var e=w(this).selectedPage-1,t=w(this).selectedPage+1,i=E.call(this,1);1!==w(this).selectedPage&&w(this).selectedPage!==w(this).totalPages&&E.call(this,w(this).selectedPage);var n;1!==w(this).totalPages&&(n=E.call(this,w(this).totalPages));for(var a=w(this).currPage,s=w(this).currPage;w(this).freeSpace>0;)if(t<w(this).totalPages&&w(this).freeSpace-this.getPageWidth(t)>=0&&(s=E.call(this,t,p,s),t++),e>1&&w(this).freeSpace-this.getPageWidth(e)>=0&&(a=E.call(this,e,v,a),e--),e<=1&&t>=w(this).totalPages||w(this).freeSpace-this.getPageWidth(e)<0&&w(this).freeSpace-this.getPageWidth(t)<0){e>1&&(this.view.getPages().children()[1].remove(),p(l.call(this),i)),t<w(this).totalPages&&(this.view.getPages().children()[this.view.getPages().children().length-2].remove(),v(l.call(this),n));break}this.view.getPrevious().removeModifier("disabled"),this.view.getNext().removeModifier("disabled"),1===w(this).selectedPage&&this.view.getPrevious().setModifier("disabled"),w(this).selectedPage===w(this).totalPages&&this.view.getNext().setModifier("disabled")},previousPage:function(){w(this).selectedPage>1&&(w(this).selectedPage--,this.setPage(w(this).selectedPage))},nextPage:function(){w(this).selectedPage<w(this).totalPages&&(w(this).selectedPage++,this.setPage(w(this).selectedPage))},setPage:function(e){e>0&&e<=w(this).totalPages&&(w(this).selectedPage=e,this.redraw(),o.call(this,e))},getSelectedPage:function(){return w(this).selectedPage},setPages:function(e){e>0&&(w(this).totalPages=e,w(this).selectedPage>e?this.setPage(e):this.redraw())},calculateFreeSpace:function(){var e=this.view.getWrapper().getProperty("offsetWidth")-w(this).pageMargin;return Math.floor(e-2*w(this).minWidth)},getPageWidth:function(e){return Math.max((0===e?1:e.toString().length)*w(this).numberWidth+w(this).pageMargin+w(this).pagePadding,w(this).minWidth)}})}),define("widgets/Pagination",["widgets/Pagination/Pagination"],function(e){return e});