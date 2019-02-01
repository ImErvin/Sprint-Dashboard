/* Copyright (c) Ericsson 2019 */

define("text!widgets/DateTimePicker/_dateTimePicker.html",function(){return'<div data-namespace="ebDateTimePicker">\n    <div data-name="dateHolder"></div>\n    <div data-name="timeHolder"></div>\n</div>'}),define("widgets/DateTimePicker/DateTimePickerView",["jscore/core","text!./_dateTimePicker.html","widgets/utils/dataNameUtils"],function(e,t,i){"use strict";var s=e.View.extend({getTemplate:function(){return i.translate(null,t,this)},getDateHolder:function(){return this[s.EL_DATE_HOLDER]},getTimeHolder:function(){return this[s.EL_TIME_HOLDER]}},{EL_DATE_HOLDER:"dateHolder",EL_TIME_HOLDER:"timeHolder"});return s}),define("widgets/DateTimePicker/DateTimePicker",["widgets/WidgetCore","./DateTimePickerView","widgets/DatePicker","widgets/TimePicker","jscore/ext/utils"],function(e,t,i,s,n){"use strict";function a(e){var t={};if(e instanceof Date)t.hours=e.getHours(),t.minutes=e.getMinutes(),t.seconds=e.getSeconds();else{var i;this.options.defaultDate&&this.options.defaultDate instanceof Date?i=this.options.defaultDate:this.options.defaultDate&&this.options.defaultDate instanceof Function?i=this.options.defaultDate():(i=new Date,i.setMinutes(0),i.setSeconds(0),i.setMilliseconds(0)),t.hours=i.getHours(),t.minutes=i.getMinutes(),t.seconds=i.getSeconds()}return t}return e.extend({View:t,init:function(e){this.options=e||{};var t=this.options.value;this.datePicker=new i({value:t,dateInRange:this.options.dateInRange,disableDay:this.options.disableDay,defaultDate:this.options.defaultDate});var r=a.call(this,t),d={labels:{hours:"h",minutes:"m",seconds:"s"}};n.extend(d,e),n.extend(d,r),this.timePicker=new s(d)},onViewReady:function(){this.view.getDateHolder().append(this.datePicker.getElement()),this.view.getTimeHolder().append(this.timePicker.getElement()),this.datePicker.addEventHandler("dateselect",function(){var e=this.getValue();e&&this.trigger("dateselect",e)}.bind(this));var e=function(){this.trigger("change",this.getValue())}.bind(this);this.datePicker.addEventHandler("change",e),this.timePicker.addEventHandler("change",e)},setValue:function(e){this.datePicker.setValue(e);var t=a.call(this,e);this.timePicker.setValue(t.hours,t.minutes,t.seconds)},getValue:function(){var e=this.datePicker.getValue();if(null===e)return e;var t=this.timePicker.getValue();return e.setHours(t.hours||0),e.setMinutes(t.minutes||0),e.setSeconds(t.seconds||0),e}})}),define("widgets/DateTimePicker",["widgets/DateTimePicker/DateTimePicker"],function(e){return e});