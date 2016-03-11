/**
 * Router for <%= appName %>
 * To trigger page navigation in a view, `this.publish('navigate', '<url fragment>')`
 *
 * @module CallExtension
 * @submodule <%= appName %>
 * @class Main
 */
Ibp.<%= appName %>.Routers.Main = Backbone.Router.extend({
    /**
     * The name of the component
     *
     * @property name
     * @type String
     */
    name: 'Main',

    /**
     * Routes defines the url fragments that will be matched as routes for the app
     *
     * @property routes
     * @type Object
     */
    routes: {
        '': 'dashboard'
    },

    /**
     * Eventhub subscription handlers
     *
     * @property subscriptions
     * @type Object
     */
    subscriptions: {
        'navigate': 'handleNavigation'
    },

    /**
     * Handle navigate events published on the event hub
     *
     * @method handleNavigation
     * @param {String} fragment The URI fragment to navigate to
     */
    handleNavigation: function (fragment) {
        var options = {
                trigger: true
            };

        this.navigate(fragment, options);
    },

    /**
     * Render the main app view
     *
     * @method dashboard
     */
    dashboard: function () {
        Ibp.<%= appName %>.App.renderDashboard();
    }
});
