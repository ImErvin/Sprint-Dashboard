/* Copyright (c) Ericsson 2019 */

/*! 
 * numeral.js language configuration
 * language : netherlands-dutch (nl-nl)
 * author : Dave Clayton : https://github.com/davedx
 */
define("i18n/number/languages/nl-nl",[],function(){"use strict";return{delimiters:{thousands:".",decimal:","},abbreviations:{thousand:"k",million:"mln",billion:"mrd",trillion:"bln"},ordinal:function(n){var i=n%100;return 0!==n&&i<=1||8===i||i>=20?"ste":"de"},currency:{symbol:"€ "}}});