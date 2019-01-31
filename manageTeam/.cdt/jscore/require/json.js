define('PluginInterface', function () {
    'use strict';

    var PluginInterface = {
        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, '\\f')
                .replace(/[\b]/g, '\\b')
                .replace(/[\n]/g, '\\n')
                .replace(/[\t]/g, '\\t')
                .replace(/[\r]/g, '\\r')
                .replace(/[\u2028]/g, '\\u2028')
                .replace(/[\u2029]/g, '\\u2029');
        },

        parse: function(name, content, config) {
            if (config.isBuild) {
                return this.jsEscape(content);
            }

            return content;
        },

        parseName: function(fileName) {
            return fileName;
        },

        load: function (fileName, req, onLoad, config) {
            fileName = this.parseName(fileName);

            this.fetch(req.toUrl(fileName), function(content) {
                content = this.parse(fileName, content, config);
                onLoad(content);
            }.bind(this), function(err) {
                onLoad.error(err);
            }.bind(this));
        },

        write: function(name, content, config) {
            return "define(function () { return '" + content + "';});\n";
        },

        writeFile: function (pluginName, fileName, req, write, config) {
            this.load(fileName, req, function(content) {
                var definition = this.write(pluginName + "!" + fileName, content, config);
                write.asModule(pluginName + "!" + fileName, fileName, definition);
            }.bind(this), config);
        },

        fetch: function(url, callback, errback) {
            if (typeof process !== 'undefined' && process.versions && !!process.versions.node) {
                var fs = nodeRequire('fs');
                var file = fs.readFileSync(url, 'utf8');
                if (file.indexOf('\uFEFF') === 0) {
                    file = file.substring(1);
                }
                callback(file);
            } else {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);

                xhr.onreadystatechange = function (evt) {
                    if (xhr.readyState === 4) {
                        if (xhr.status > 399 && xhr.status < 600) {
                            var err = new Error(url + ' HTTP status: ' + xhr.status);
                            err.xhr = xhr;
                            errback(err);
                        } else {
                            callback(xhr.responseText);
                        }
                    }
                };
                xhr.send(null);
            }

        },

        extend: function(obj) {
            var Plugin = {};
            var prop;
            for (prop in PluginInterface) {
                Plugin[prop] = PluginInterface[prop];
            }

            for (prop in obj) {
                Plugin[prop] = obj[prop];
            }
            return Plugin;
        }
    };

    return PluginInterface;
});

define('json',['PluginInterface'], function (PluginInterface) {
    'use strict';

    return PluginInterface.extend({

        parseName: function(name) {
            if (!/\.json$/.test(name)) {
                name += '.json';
            }
            return name;
        },

        parse: function(name, content, config) {
            return JSON.parse(content);
        },

        write: function(name, content, config) {
            return "define(function () { return "+JSON.stringify(content)+";});\n";
        }

    });

});



