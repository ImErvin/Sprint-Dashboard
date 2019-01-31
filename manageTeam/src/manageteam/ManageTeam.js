define([
    'jscore/core',
    'i18n!manageteam/dictionary.json',
    'layouts/TopSection',
    './regions/show-teams/ViewTeamsRegion',
    './regions/add-team/AddTeamRegion'
], function (core, dictionary,
             TopSection,
             ShowTeamsRegion,
             AddTeamRegion
             ) {

    'use strict';

    return core.App.extend({

        /**
         * Called when the app is first instantiated in the current tab for the first time.
         */
        onStart: function () {
            var topSection = new TopSection({
                    breadcrumb: this.options.breadcrumb,
                    title: this.options.properties.title,
                    context: this.getContext(),
                    defaultActions: [{
                        type: 'button',
                        name: dictionary.sayHello,
                        action: function () {
                            eventBus.publish('sayhello');
                        }
                    }]
                });
            this.showTeamsRegion = new ShowTeamsRegion({context: this.getContext()});


            topSection.setContent(this.showTeamsRegion);
            topSection.attachTo(this.getElement());
            var subscriptionId = this.getEventBus().subscribe('switchMessage',function(data){
                       if( data.region === 'ShowTeams'){
                           topSection.setContent(this.showTeamsRegion);
                           this.addEditTeamRegion.stop();

                       }else if(data.region === 'EditTeam'){
                           this.addEditTeamRegion = new AddTeamRegion({context: this.getContext(), team: data.team});
                           topSection.setContent(this.addEditTeamRegion);
                       }
                   }.bind(this));
        },

        /**
         * This method is called when the user has left your app to view a different app.
         */
        onPause: function () {

        },

        /**
         * Called when the user navigates back to the application.
         */
        onResume: function () {

        },

        /**
         * Called before the user is about to leave your app, either by navigating away or closing the tab.
         */
        onBeforeLeave: function () {

        }

        // See complete documentation about the application lifecycle in the Container docs.

    });

});
