define([
    'jscore/core',
    './ViewTeamsView',
    'common/RestService',
    'common/Models',
    '../../widgets/team-form/TeamForm',
    'i18n!manageteam/dictionary.json'
], function (core, View, restService , models , dictionary) {
    'use strict';

    return core.Region.extend({
        View:View,
        onStart: function () {
             restService.getTeams(this.renderTeams.bind(this),this.error.bind(this));
        },

        renderTeams:function(teams){
           this.teams = teams;
           teams.forEach(function(team){
               var element = this.view.getTableRowTemplate({teamName: team.name});
               this.view.addRowToTable(element);
            }.bind(this));
        },

        error:function(err){
        }

    });
});
