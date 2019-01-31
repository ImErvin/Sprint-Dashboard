/* Copyright (c) Ericsson 2019 */

define("template!widgets/Breadcrumb/BreadcrumbItem/_breadcrumbItem.hbs",["jscore/handlebars/handlebars"],function(e){return e.template(function(e,t,r,i,n){function s(e,t){var i,n,s="";return s+='href="',(n=r.url)?i=n.call(e,{hash:{}}):(n=e&&e.url,i=typeof n===l?n.call(e,{hash:{}}):n),s+=m(i)+'"'}function d(e,t){var i,n="";return n+='\n        <span class="ebBreadcrumbs-arrow" tabindex="0">\n            <i class="ebIcon ebIcon_small ebIcon_interactive ebIcon_downArrow_10px"></i>\n        </span>\n    <div class="ebBreadcrumbs-list">\n        <div class="ebComponentList">\n            ',i=r.each.call(e,e&&e.children,{hash:{},inverse:b.noop,fn:b.program(4,a,t)}),(i||0===i)&&(n+=i),n+="\n        </div>\n    </div>\n    "}function a(e,t){var i,n,s="";return s+='\n            <a href="',(n=r.url)?i=n.call(e,{hash:{}}):(n=e&&e.url,i=typeof n===l?n.call(e,{hash:{}}):n),s+=m(i)+'" class="ebComponentList-item ebComponentList-link',i=r.if.call(e,e&&e.selected,{hash:{},inverse:b.noop,fn:b.program(5,c,t)}),(i||0===i)&&(s+=i),s+='" tabindex="-1">\n                <span class="ebComponentList-link" title="',(n=r.title)?i=n.call(e,{hash:{}}):(n=e&&e.title,i=typeof n===l?n.call(e,{hash:{}}):n),s+=m(i)+'" >',(n=r.name)?i=n.call(e,{hash:{}}):(n=e&&e.name,i=typeof n===l?n.call(e,{hash:{}}):n),s+=m(i)+"</span>\n            </a>\n            "}function c(e,t){return" ebComponentList-item_selected"}this.compilerInfo=[4,">= 1.0.0"],r=this.merge(r,e.helpers);var o,h,u="",l="function",m=this.escapeExpression,b=this;return u+='<div class="ebBreadcrumbs-item">\n    <a ',o=r.if.call(t,t&&t.url,{hash:{},inverse:b.noop,fn:b.program(1,s,n)}),(o||0===o)&&(u+=o),u+=' class="ebBreadcrumbs-link" title="',(h=r.title)?o=h.call(t,{hash:{}}):(h=t&&t.title,o=typeof h===l?h.call(t,{hash:{}}):h),u+=m(o)+'" style="cursor:pointer;" tabindex="0">',(h=r.name)?o=h.call(t,{hash:{}}):(h=t&&t.name,o=typeof h===l?h.call(t,{hash:{}}):h),u+=m(o)+"</a>\n    ",o=r.if.call(t,t&&t.children,{hash:{},inverse:b.noop,fn:b.program(3,d,n)}),(o||0===o)&&(u+=o),u+="\n</div>"})}),define("widgets/Breadcrumb/BreadcrumbItem/BreadcrumbItemView",["jscore/core","template!./_breadcrumbItem.hbs"],function(e,t){"use strict";var r=e.View.extend({afterRender:function(){this.link=this.getElement().find("."+r.EL_LINK),this.arrow=this.getElement().find("."+r.EL_ARROW)},getTemplate:function(){return t(this.options.template.breadcrumb)},getLink:function(){return this.link},getArrow:function(){return this.arrow}},{EL_LINK:"ebBreadcrumbs-link",EL_ARROW:"ebBreadcrumbs-arrow"});return r}),define("widgets/Breadcrumb/BreadcrumbItem/BreadcrumbItem",["widgets/WidgetCore","./BreadcrumbItemView","widgets/utils/domUtils"],function(e,t,r){"use strict";function i(){var e=this.getElement().findAll(".ebComponentList-item"),t=this.getElement().find(".ebComponentList-item_focused");t&&t.removeModifier("focused"),e[this._currentFocusedItem]&&e[this._currentFocusedItem].setModifier("focused")}return e.extend({init:function(e){this.options=e||[],this.view=new t({template:{breadcrumb:e.breadcrumb}})},onViewReady:function(){var e=this.view.getArrow(),t=this.getElement().findAll(".ebComponentList-item"),r=this.getElement().find(".ebBreadcrumbs-list");e&&(r.addEventHandler("mousedown",function(e){e.stopPropagation(),e.preventDefault()}.bind(this)),e.addEventHandler("blur",function(e){void 0!==this._currentFocusedItem&&(t[this._currentFocusedItem].removeModifier("focused"),this._currentFocusedItem=void 0)}.bind(this)),r.addEventHandler("mouseup",function(e){e.stopPropagation(),e.preventDefault()}.bind(this)),e.addEventHandler("keydown",function(e){if(38===e.originalEvent.keyCode)e.preventDefault(),void 0===this._currentFocusedItem?this._currentFocusedItem=t.length-1:this._currentFocusedItem=this._currentFocusedItem>0?this._currentFocusedItem-1:t.length-1;else if(40===e.originalEvent.keyCode)e.preventDefault(),void 0===this._currentFocusedItem?this._currentFocusedItem=0:this._currentFocusedItem=this._currentFocusedItem<t.length-1?this._currentFocusedItem+1:0;else if(13===e.originalEvent.keyCode){var r=t[this._currentFocusedItem];r.hasModifier("selected")||r.trigger("click")}i.call(this)}.bind(this)))}})}),define("text!widgets/Breadcrumb/_breadcrumb.html",function(){return'<div class="ebBreadcrumbs"></div>'}),define("widgets/Breadcrumb/BreadcrumbView",["jscore/core","text!./_breadcrumb.html"],function(e,t){"use strict";return e.View.extend({getTemplate:function(){return t}})}),define("widgets/Breadcrumb/Breadcrumb",["widgets/WidgetCore","./BreadcrumbView","./BreadcrumbItem/BreadcrumbItem","widgets/utils/domUtils","jscore/core","jscore/ext/privateStore"],function(e,t,r,i,n,s){"use strict";function d(){a(this).dots||(a(this).dots=new r({breadcrumb:{name:"..."}}),a(this).dots.getElement().addEventHandler("click",function(){this.resize(!0)}.bind(this)),a(this).dots.getElement().addEventHandler("keypress",function(e){13===e.originalEvent.keyCode&&this.resize(!0)}.bind(this)),this.getElement().prepend(a(this).dots.getElement()),a(this).dotsWidth=a(this).dots.getElement().getProperty("offsetWidth"),a(this).dots.getElement().remove())}var a=s.create();return e.extend({View:t,init:function(e){a(this).breadcrumbItems=[],a(this).dots=void 0},onViewReady:function(){var e=this.options.data||this.options.breadcrumbs;if(!(e&&e.length>0))throw new Error("A breadcrumb array should be defined for the Breadcrumb widget!");if(e.length>1){var t=e[e.length-1].url,i=e[e.length-2];i.children&&i.children.forEach(function(e){e.url===t&&(e.selected=!0)})}e.forEach(function(t,i){var n=new r({breadcrumb:t});a(this).breadcrumbItems.push(n),n.attachTo(this.getElement()),i===e.length-1&&n.getElement().find(".ebBreadcrumbs-link").setAttribute("tabindex","-1")},this),a(this).windowEvtId=n.Window.addEventHandler("resize",function(e){this.resize()}.bind(this))},onDestroy:function(){a(this).windowEvtId&&n.Window.removeEventHandler(a(this).windowEvtId)},onDOMAttach:function(){this.resize.call(this)},resize:function(e){a(this).breadcrumbWidths||(this.getElement().setStyle("white-space","nowrap"),a(this).breadcrumbWidths=[],a(this).totalWidth=0,a(this).breadcrumbItems.forEach(function(e){var t=e.getElement().getProperty("offsetWidth");a(this).breadcrumbWidths.push(t),a(this).totalWidth+=t},this),d.call(this),a(this).dots.detach(),this.getElement().setStyle("white-space","inherit"));var t=this.getElement().getProperty("offsetWidth");a(this).breadcrumbItems.forEach(function(e){e.detach()},this),a(this).dots.detach();var r;if(t<a(this).totalWidth&&!e){a(this).breadcrumbItems[0].attach();var i=a(this).breadcrumbWidths[0],n=0;for(r=a(this).breadcrumbWidths.length-1;r>0;r--)if(i+=a(this).breadcrumbWidths[r],i+a(this).dotsWidth>t){n=r;break}for(a(this).dots.attachTo(this.getElement()),r=n+1;r<a(this).breadcrumbItems.length;r++)a(this).breadcrumbItems[r].attach()}else for(r=0;r<a(this).breadcrumbItems.length;r++)a(this).breadcrumbItems[r].attach();e&&a(this).breadcrumbItems[1].getElement().find("a").focus()}})}),define("widgets/Breadcrumb",["widgets/Breadcrumb/Breadcrumb"],function(e){return e});