define([
    'jscore/core',
    'text!./_main.html',
    'styles!./_main.less'
], function (core, template, styles) {

    return core.View.extend({

        getTemplate: function () {
            return template;
        },

        getStyle: function () {
            return styles;
        },

        getContainer: function () {
            return this.getElement().find(".eaLandingPage-Container");
        },

        getMessage: function () {
            return this.getElement().find(".eaLandingPage-Message");
        },

        // addApplication: function(){
        //     this.getElement().find('./manageTeam.js').addEventHandler('click', fn);
        // },

        getApplication: function(){
            return this.getElement().find('./manageTeam.js');
        }

    });

});
