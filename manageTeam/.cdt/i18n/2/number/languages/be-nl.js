/* Copyright (c) Ericsson 2019 */

/*! 
 * numeral.js language configuration
 * language : belgium-dutch (be-nl)
 * author : Dieter Luypaert : https://github.com/moeriki
 */
define("i18n/number/languages/be-nl",[],function(){"use strict";return{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:" mln",billion:" mld",trillion:" bln"},ordinal:function(n){var i=n%100;return 0!==n&&i<=1||8===i||i>=20?"ste":"de"},currency:{symbol:"€ "}}});