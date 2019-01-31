define([
    'jscore/core',
    './AddTeamView',
    'i18n!manageteam/dictionary.json'
], function (core, View, dictionary) {
    'use strict';

    return core.Region.extend({

        View: View,

        onStart: function () {
            var count = 0;

            this.sayHelloEvtId = this.getEventBus().subscribe('sayhello', function () {
                count++;
                this.view.getHello().setText(dictionary.hello + ' ' + count);
            }.bind(this));
        },

        onStop: function () {
            this.getEventBus().unsubscribe('sayhello', this.sayHelloEvtId);
        }

    });

});
