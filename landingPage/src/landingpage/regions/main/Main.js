define([
    'jscore/core',
    'layouts/LauncherTiles',
    'widgets/Dialog',
    'widgets/InlineMessage',
    'widgets/Notification',
    '../../widgets/LauncherControls',
    './MainView',
], function (core, LauncherTiles, Dialog, InlineMessage, Notification, LauncherControls, View, Dictionary) {

    return core.Region.extend({

        View: View,

        onStart: function () {
            this.allApps = this.options.apps;

            var container = this.view.getContainer();

            this.controls = new LauncherControls({});
            this.controls.addEventHandler(LauncherControls.prototype.VIEW_CHANGE, function () {
                this.updateAppTiles();
                this.savePreferences(true); // save preferred view quietly
            }.bind(this));
            this.controls.attachTo(container);

            this.launcherTiles = new LauncherTiles({});

            this.launcherTiles.addEventHandler(LauncherTiles.prototype.LAUNCHER_FAVORITE, function (app) {
                if (this.isShowOnlyFavorites()) {
                    this.updateAppTiles();
                }
                this.savePreferences();
            }.bind(this));

            this.launcherTiles.addEventHandler(LauncherTiles.prototype.LAUNCHER_LAUNCH, function (app) {
                // can track last time appName was launched, etc.
                console.log("Launched app '" + app.title + "' (" + app.appName + ") at " + new Date());

                // here, let's do a custom handler for one app
                if (app.appName === "logViewer") {
                    var dialog = new Dialog({
                        type: "information",
                        header: app.title,
                        content: Dictionary.get('infoCustomLaunchAction'),
                        buttons: [
                            {
                                caption: "OK",
                                color: 'darkBlue',
                                action: function () {
                                    dialog.hide();
                                }
                            }
                        ]
                    });
                    dialog.show();
                }
            });
            this.launcherTiles.attachTo(container);

            this.updateAppTiles();
        },

        onStop: function () {
            this.view.destroy(); // regions with uit views should call view.destroy()
        },

        updateAppTiles: function () {
            this.hideMessage();

            var appsToShow;
            if (this.isShowOnlyFavorites()) {
                appsToShow = this.allApps.filter(function (app) {
                    return app.favorite;
                });
            }
            else {
                appsToShow = this.allApps;
            }

            this.controls.setAppCount(appsToShow.length, this.allApps.length);

            this.launcherTiles.setOptions({
                apps: appsToShow,
                showFavorites: true
            });

            if (this.allApps.length === 0) {
                this.showMessage("error", Dictionary.get('errorNoAppsTitle'), Dictionary.get('errorNoAppsDescription'));
            }
            else if (appsToShow.length === 0) {
                this.showMessage("dialogInfo", Dictionary.get('infoNoFavoriteAppsTitle'), Dictionary.get('infoNoFavoriteAppsDescription'));
            }
        },

        isShowOnlyFavorites: function () {
            return this.controls.isShowOnlyFavorites();
        },

        getDisplayView: function () {
            return this.controls.getDisplayView();
        },
        setDisplayView: function (view) {
            this.controls.setDisplayView(view);
        },

        showMessage: function (icon, header, description) {
            var message = this.view.getMessage();
            if (this.infoW) {
                // Remove InlineMessage previously displayed
                this.infoW.destroy();
            }
            this.infoW = new InlineMessage({
                "icon": icon,
                "header": header,
                "description": description
            });
            this.infoW.attachTo(message);
            message.setModifier("visible");
        },

        hideMessage: function () {
            var message = this.view.getMessage();
            if (this.infoW) {
                // Remove InlineMessage previously displayed
                this.infoW.destroy();
                this.infoW = undefined;
            }
            message.removeModifier("visible");
        },

        savePreferences: function (quiet) {
            //TODO make REST call to save state of favorites, user's current view selection, etc.

            if (!quiet) {
                var notificationW = new Notification({
                    label: Dictionary.get('preferencesSaved'),
                    color: "green",
                    icon: "tick",
                    showAsToast: true,
                    autoDismiss: true,
                    autoDismissDuration: 1000
                });
                notificationW.attachTo(this.getElement());
            }
        }
    });

});
