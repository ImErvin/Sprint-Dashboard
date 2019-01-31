define([
    'jscore/core',
    'text!./_myWidget.html',
    'styles!./_myWidget.less'
], function (core, template, styles) {
    'use strict';

    return core.View.extend({

        getTemplate: function () {
            return template;
        },

        getStyle: function () {
            return styles;
        }

    });

});
