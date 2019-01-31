define([
    'jscore/core',
    'widgets/InlineMessage',
    './regions/main/Main'
], function (core, InlineMessage, Main) {

    return core.App.extend({

        onStart: function () {

            this.getElement().setStyle({
                position: "relative",
                width: "100%",
                height: "100%"
            });

            //TODO Normally get this app list from a REST call that returns only apps the user is allowed to access based on user role, license, etc.
            this.apps = [
                {
                    "appName": "TeamManagement",
                    "title": "Team Management",
                    "subtitle": "Manage Teams",
                    "url": "#ManageTeam",
                    "icon": "eye",
                    "color": "#ff7600",
                    "description": "Manage, Create, Edit and Delete Teams",
                    "favorite": true
                },
                {
                    "appName": "metricsmnagement",
                    "title": "Metrics Management",
                    "subtitle": "Dashboard",
                    "url": "#metricsmanagement",
                    "icon": "lock",
                    "color": "#3385c2",
                    "description": "View data",
                    "favorite": false
                }
            ];

            this.main = new Main({
                context: this.getContext(),
                apps: this.apps
            });
            this.main.start(this.getElement());
        },

        onResume: function () {

        },

        onPause: function () {

        },

        onBeforeLeave: function () {

        }
    });

});
