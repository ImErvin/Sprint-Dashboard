/* Copyright (c) Ericsson 2019 */

define("i18n/number/languages/en-us",[],function(){"use strict";return{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(n){var i=n%10;return 1===~~(n%100/10)?"th":1===i?"st":2===i?"nd":3===i?"rd":"th"},currency:{symbol:"$"}}});