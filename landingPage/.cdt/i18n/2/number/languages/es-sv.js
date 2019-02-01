/* Copyright (c) Ericsson 2019 */

/*! 
 * numeral.js language configuration
 * language : spanish El Salvador (es-sv)
 * author : Hernan Garcia : https://github.com/hgarcia
 */
define("i18n/number/languages/es-sv",[],function(){"use strict";return{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mm",billion:"b",trillion:"t"},ordinal:function(n){var i=n%10;return 1===i||3===i?"er":2===i?"do":7===i||0===i?"mo":8===i?"vo":9===i?"no":"to"},currency:{symbol:"€"}}});