define([
    'jscore/core',
    './MyWidgetView'
], function (core, View) {
    'use strict';

    /**
     * Basic widget template.
     *
     * Create your custom template in seconds using the live template feature provided by different tools.
     */

    return core.Widget.extend({

        View: View,

        onViewReady: function () {

        },

        onDestroy: function () {

        }

    });

});
