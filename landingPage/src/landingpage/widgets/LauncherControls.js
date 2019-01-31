define([
    'jscore/core',
    'uit!./_launcherControls.html',
    'i18n!landingPage/dictionary.json'
], function (core, View, Dictionary) {

    return core.Widget.extend({

        VIEW_CHANGE: 'view:change',

        view: function() {
            return new View({
                "i18n": Dictionary,
                "favoritesInfoOptions": {
                    "content": Dictionary.get('favoritesInfo')
                }
            });
        },

        /**
         * Populate the content of the widget.
         *
         * @method onViewReady
         */
        onViewReady: function() {
            var viewElt = this.view.getElement();

            var favoritesGroup = viewElt.find(".eaLandingPage-Controls-FavoritesGroup").findAll("input");
            favoritesGroup.forEach(function(radio){
                radio.addEventHandler("click", function(){
                    this.trigger(this.VIEW_CHANGE);
                }.bind(this));
            }.bind(this));
        },

        /**
         * Clean up
         * @method onDestroy
         */
        onDestroy: function () {
            this.view.destroy(); // widgets with uit views should call view.destroy()
        },

        /**
         * Is the display switcher set to show only favorite apps?
         * @returns {boolean} true if set to show only favorites
         */
        isShowOnlyFavorites: function() {
            var view = this.getDisplayView();
            return view === "favorites";
        },

        /**
         * Get current setting of display switcher
         * @returns {String} favorites | all
         */
        getDisplayView: function() {
            return this.view.getElement().find(".eaLandingPage-Controls-FavoritesGroup").find("input:checked").getValue();
        },

        /**
         * Set the display switcher
         * @param {String} displayView - favorites | all
         */
        setDisplayView: function(displayView) {
            var choice = this.view.getElement().find(".eaLandingPage-Controls-FavoritesGroup input[value='" + displayView + "']");
            if (choice) {
                choice.setProperty("checked", true);
            }
        },

        /**
         * Update the app count shown out of total
         * @param {integer} numApps - number of apps showing
         * @param {integer} totalApps - total number of apps
         */
        setAppCount: function(numApps, totalApps) {
            var viewElt = this.view.getElement();
            viewElt.find(".eaLandingPage-Controls-AppCount").setText(
                replaceParams(Dictionary.get('countOfTotal'), {"count":numApps, "total":totalApps})
            );
        }

    });

    /**
     * Replaces substitution patterns in i18n string that look like <param>.
     * @method replaceParams
     * @param {String} str Original string containing <param> patterns.
     * @param {Object} params Object containing {param: value} properties.
     * @returns {String} Resulting string after param substitutions.
     */
    function replaceParams(str, params) {
        var pattern, output = str;
        for (var p in params) {
            pattern = "<" + p + ">";
            output = output.replace(pattern, params[p]);
        }
        return output;
    }
});
