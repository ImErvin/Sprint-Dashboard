define([
    'jscore/core',
    'text!./_teamForm.html',
    'styles!./_teamForm.less'
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
