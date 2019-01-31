define([
    'jscore/core',
    './ViewTeamsView',
    'common/RestService',
    'common/Models',
    'i18n!widgetsolution/dictionary.json'
], function (core, View, restService , models , dictionary) {
    'use strict';

    return core.Region.extend({
        View:View,
        onStart: function () {
             restService.getTeams(this.renderTeams.bind(this),this.error.bind(this));
        },

        renderTeams:function(teams){
           teams.forEach(function(team){
               var element = this.view.getTableRowTemplate({teamName: team.name});
               this.view.addRowToTable(element);
            });
        },

        error:function(err){
        }

    });
});
