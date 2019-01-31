/* Copyright (c) Ericsson 2019 */

/*! 
 * numeral.js language configuration
 * language : french (fr)
 * author : Adam Draper : https://github.com/adamwdraper
 */
define("i18n/number/languages/fr",[],function(){return{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(n){return 1===n?"er":"e"},currency:{symbol:"€"}}});