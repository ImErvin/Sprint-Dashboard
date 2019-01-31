/* Copyright (c) Ericsson 2019 */

/*!
 * language : english australia (uk)
 * for now copy paste from en-gb as per note
 * Ref: https://github.com/angular/angular.js/blob/master/src/ngLocale/angular-locale_en-au.js
 */
define("i18n/number/languages/en-au",[],function(){"use strict";return{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(n){var i=n%10;return 1===~~(n%100/10)?"th":1===i?"st":2===i?"nd":3===i?"rd":"th"},currency:{symbol:"$"}}});