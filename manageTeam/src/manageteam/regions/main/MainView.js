define([
    'jscore/core',
    'text!./_main.html',
    'styles!./_main.less'
], function (core, template, styles) {
    'use strict';

    return core.View.extend({

        getTemplate: function () {
            return template;
        },

        getStyle: function () {
            return styles;
        },

        getHello: function () {
            return this.getElement().find('.eaManageTeam-rMain-hello');
        }

    });

});
