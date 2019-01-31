define([
    'jscore/core',
    'text!./_addTeam.html',
    'styles!./_addTeam.less'
], function (core, template, styles) {
    'use strict';

    const _prefix = '.eaManageTeam-rAddTeam';

    return core.View.extend({

        getTemplate: function () {
            return template;
        },

        getStyle: function () {
            return styles;
        },

        getHello: function () {
            return this.getElement().find(_prefix + '-hello');
        }

    });

});
