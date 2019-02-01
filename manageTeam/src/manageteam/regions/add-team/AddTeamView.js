define([
    'jscore/core',
    'template!./_addTeam.html',
    'template!./_editTeam.html',
    'styles!./_addTeam.less'
], function (core, addTemplate, editTemaplte, styles) {
    'use strict';

    var _prefix = '.eaManageTeam-rAddTeam';

    return core.View.extend({

        getTemplate: function () {
            console.log(this.options);
            if(!this.options){
                return editTemaplte(this.options);
            }else{
                return addTemplate();
            }
        },

        getStyle: function () {
            return styles;
        },

        getHello: function () {
            return this.getElement().find(_prefix + '-hello');
        },

        getNameInput: function () {
            return this.getElement().find(_prefix + '-nameInput');
        },

        getMembersInput: function () {
            return this.getElement().find(_prefix + '-membersInput');
        },

        getProjectInput: function () {
            return this.getElement().find(_prefix + '-projectInput');
        },

        getReposInput: function () {
            return this.getElement().find(_prefix + '-reposInput');
        },

        getSaveButton: function () {
            return this.getElement().find(_prefix + "-saveBtn");
        },

        addSaveEventHandler: function (saveCallBack) {
            this.getSaveButton().addEventHandler('click', saveCallBack);
        }
    });

});
