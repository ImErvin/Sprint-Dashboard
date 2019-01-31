/* Copyright (c) Ericsson 2018 */

define("container/Helpers",[],function(){return{clone:function(e){return void 0!==e?JSON.parse(JSON.stringify(e)):void 0},isObject:function(e){return e===Object(e)&&!(e instanceof Array)},extend:function(e){return Array.prototype.forEach.call(Array.prototype.slice.call(arguments,1),function(t){if(t)for(var n in t){var r=t[n],o=e[n];this.isObject(r)&&this.isObject(o)?e[n]=this.extend(o,r):e[n]=r}}.bind(this)),e},resolvedPromise:function(e){return new Promise(function(t,n){t(e)})},requirePromise:function(e,t){return new Promise(function(n,r){t?require(t,e,function(){n(arguments)},r):require(e,function(){n(arguments)},r)})},getJSON:function(e){return new Promise(function(t,n){var r=new XMLHttpRequest;r.open("GET",e,!0),r.addEventListener("load",function(){if(404===this.status)return n("File not found (404)");try{t(JSON.parse(r.responseText))}catch(e){n(e)}}),r.addEventListener("error",function(e){n(e)}),r.send(null)})}}}),define("container/PackageProperties",["./Helpers"],function(e){function t(t,n){var r=t.properties||{},o=r[n]||{},i=e.clone(r["*"]||{});return e.extend(i,o)}var n=e.requirePromise,r=e.clone;return{resolveTitle:function(t,n){var r=require.s.contexts[t].config;return r.i18n&&r.i18n.locales.length>0?e.requirePromise(["i18n!"+t+"/app.json"],{context:t}).then(function(e){return e[0].title||e[0].name},function(){return n.title||n.name}):e.resolvedPromise(n.title||n.name)},getProperties:function(r,o){var i;return n([o+"/config"]).then(function(n){return i=e.extend(n[0],t(r,o)),this.createContext(o,i),this.resolveTitle(o,i)}.bind(this)).then(function(e){return i.title=e,i})},createContext:function(e,t){if(require.s.contexts[e])return require.s.contexts[e].config;var n=require.s.contexts._.config,o={context:e,baseUrl:n.baseUrl,paths:r(n.paths||{}),resources:n.resources,i18n:r(n.i18n),packages:r(n.packages||[])};if(void 0!==n.waitSeconds&&(o.waitSeconds=n.waitSeconds),t.libs)for(var i in t.libs){var c=i+"/"+t.libs[i];o.paths[i]=c}if(t.assets&&(o.paths.assets="assets/"+t.assets),t.paths)for(var a in t.paths)o.paths[a]=t.paths[a];return t.i18n&&(o.i18n=t.i18n),t.packages&&t.packages.forEach(function(e){o.packages.push(e)}),o.children=t.children,t.script?o.script=t.script:o.script=e+"/"+e,require.config(o),require.s.contexts[e].config.packages.forEach(function(t){"assets"===t.name&&(require.s.contexts[e].config.paths.assets=t.location)}),o}}}),define("container/APIImpl",["jscore/core","./PackageProperties","require"],function(e,t,n){function r(){throw new Error("Plugin Failed to Load.")}function o(e,t,n){t=JSON.parse(JSON.stringify(t));var r=new RegExp(n),o=e.split("/"),c=r.exec(e),a=null!==c?c.slice(1):[];if(0===a.length)return t;var s=[];a.forEach(function(e){o.indexOf(e)!==-1&&(s.push({target:o.indexOf(e),value:e}),o[o.indexOf(e)]="*")});for(var u=0;u<t.length;u++)t[u]=i(t[u],s);return t}function i(e,t){var n,r=e.url.split("/");for(n=0;n<t.length;n++)void 0!==r[t[n].target]&&(r[t[n].target]=t[n].value);if(e.url=r.join("/"),void 0!==e.children)for(n=0;n<e.children.length;n++)e.children[n]=i(e.children[n],t);return e}function c(e,r,o,i){var c=n.config?n.config():n.getConfig();require({waitSeconds:0,context:c.context},[e+"/config"],function(e){t.createContext(r,{packages:e.packages||[]}),require({context:r},["container/api"],function(e){e.setEventBus(u.prototype.getEventBus()),e.setConfig(u.prototype.getConfig()),o()},i)},i)}var a=new e.EventBus,s={defaultApp:"",name:"ENM"},u=function(e){e=e||{},this._packageProperties=e.packageProperties};return require({context:"_"},["container/Plugin"],function(e){u.prototype.plugin={execute:e.execute.bind(e),hasMethod:e.hasMethod.bind(e)}}),u.prototype.plugin={execute:r,hasMethod:r},u.prototype.getEventBus=function(){return a},u.prototype.setEventBus=function(e){a=e},u.prototype.getConfig=function(){return s},u.prototype.setConfig=function(e){s=e},u.prototype.setProperties=function(e){this._packageProperties=e},u.prototype.setBreadcrumb=function(e){this._packageBreadcrumb=e},u.prototype.getBreadcrumb=function(){var e=window.location.hash;return e=e.indexOf("?")!==-1?window.location.hash.substr(0,e.indexOf("?")):e,o(e,this._packageBreadcrumb,this._packageNamespace)},u.prototype.setNamespace=function(e){this._packageNamespace=e},u.prototype.setContainerName=function(e){a.publish("container:name",e)},u.prototype.registerLibrary=function(e,t,r,o){var i,c,a=n.config?n.config():n.getConfig(),s=a.packages,u={};for(i=0;i<s.length;i++)if(c=s[i],u[c.name]=c.location.split("/")[1],c.name===e)return c.location===e+"/"+t?void(r&&r()):(o&&o(),void console.error(c.location+" already loaded. Cannot load conflicting version."));require({context:a.context},[e+"/"+t+"/config"],function(n){if(n.packages)for(i=0;i<n.packages.length;i++){c=n.packages[i];var p=c.location.split("/")[1];if(u[c.name]&&u[c.name]!==p)return o&&o(),void console.error(c.name+" "+u[c.name]+" is already loaded. "+e+" depends on "+p);s.push(c),a.paths[c.name]=c.location}s.push({name:e,location:e+"/"+t}),a.paths[e]=e+"/"+t,r&&r()})},u.prototype.loadLibraryModule=function(e,t,r){for(var o=n.config?n.config():n.getConfig(),i=o.packages,c=e.split("/")[0],a=!1,s=0;s<i.length;s++){var u=i[s];u.name===c&&(a=!0)}a?require({context:o.context},[e],t,r):(console.error(c+" is not registered. Call registerLibrary() before calling this function."),r&&r())},u.prototype.loadAppModule=function(e,t,n){function r(){require({waitSeconds:0,context:e},[e],t,n)}if(require.s.contexts[e])r();else{var o=e.split("/")[0];c(o,e,r,n)}},u.prototype.getProperties=function(e,n,r){if(e){var o=t.getProperties(s,e);return n&&o.then(n,r),o}return this._packageProperties},u.prototype.setLocale=function(e){var t=n.config?n.config():n.getConfig(),r=t.i18n||{},o={};for(var i in r)o[i]=r[i];o.locale=e,require.config({i18n:o})},u.prototype.getLocale=function(){return requirejs.s.contexts._.config.i18n.locale},u}),define("container/Plugin",["./APIImpl"],function(e){var t;return{load:function(){var n=e.prototype.getConfig().plugin;return new Promise(function(r,o){e.prototype.getProperties(n,function(i){require({context:n},["container/api"],function(c){c.setConfig(e.prototype.getConfig()),c.setEventBus(e.prototype.getEventBus()),require({context:n},[i.script],function(e){t=e,r()},o)},o)}.bind(this),o)})},runHook:function(e){var n=Array.prototype.slice.call(arguments,1);return new Promise(function(r,o){t&&t[e]?t[e].apply(t,[r,o].concat(n)):r()})},hasMethod:function(e){return t&&t.methods&&"function"==typeof t.methods[e]},execute:function(e){if(!this.hasMethod(e))throw new Error("Method does not exist.");return t.methods[e].apply(t.methods,Array.prototype.slice.call(arguments,1))}}});