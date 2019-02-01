define([
    'jscore/core',
    './AddTeamView',
    'common/RestService',
    'i18n!manageteam/dictionary.json'
], function (core, View, RestService, dictionary) {
    'use strict';

    var teamData;

    return core.Region.extend({

        view: function () {
            return new View({
                team: teamData
            })
        },
        
        init: function(teamInfo){
            teamData = teamInfo.team;
        },

        onStart: function () {
            this.view.getNameInput().setValue(teamData.name);
            this.view.getMembersInput().setValue(teamData.members);
            this.view.getProjectInput().setValue(teamData.projects);
            this.view.getReposInput().setValue(teamData.repos);
            this.view.addSaveEventHandler(function () {
                var team = {
                    name:  this.view.getNameInput().getValue(),
                    members:  this.view.getMembersInput().getValue(),
                    projects:  this.view.getProjectInput().getValue(),
                    repos:  this.view.getReposInput().getValue()
                }

                RestService.putTeams(team, function (data) { 
                    this.getEventBus().publish('switchMessage', {
                        region: 'ShowTeams',
                        team: team
                    });
                 }.bind(this), function (data) { console.log("error") });

                
            }.bind(this));
        },



        onStop: function () {

        }

    });

});
