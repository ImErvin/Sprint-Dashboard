/* Copyright (c) Ericsson 2019 */

define("text!widgets/Table/table/HeaderRow/_headerRow.html",function(){return"<thead>\n<tr></tr>\n</thead>\n"}),define("widgets/Table/table/HeaderRow/HeaderRowView",["jscore/core","text!./_headerRow.html"],function(e,t){"use strict";return e.View.extend({getTemplate:function(){return t},getBody:function(){return this.getElement().children()[0]}})}),define("widgets/Table/table/HeaderRow/HeaderRow",["widgets/table/Row","./HeaderRowView"],function(e,t){"use strict";return e.extend({View:t})}),define("widgets/table/HeaderRow",["widgets/Table/table/HeaderRow/HeaderRow"],function(e){return e});