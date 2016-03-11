/**
 * Main app entry point
 *
 * @module <%= appName %>
 * @submodule Views
 * @class Main
 * @main <%= appName %>
 */
Ibp.<%= appName %>.Views.Main = Ibp.Backbone.View.extend({
    /**
     * The name of the component
     *
     * @property name
     * @type String
     */
    name: 'Main',

    /**
     * Selector for the main app container
     *
     * @property el
     * @type String
     */
    el: '#app-main',

    /**
     * This view's template function
     *
     * @property template
     * @type Function
     */
    template: Ibp.<%= appName %>.Templates.main,

    /**
     * Model to hold view state
     *
     * @property state
     * @type Model
     */
    state: null,

    /**
     * References to child views
     *
     * @property views
     * @type Object
     */
    views: {},

    /**
     * Selector for the dashboard container element
     *
     * @property dashboardEl
     * @type String
     */
    dashboardEl: '#<%= namespace %>-dashboard',

    /**
     * Runs when the component is created
     *
     * @method init
     * @param {Object} options Data passed in on component instance creation
     */
    init: function (options) {
        // set initial state
        this.state = new Ibp.Carbon.Models.State({
            // whether the Dashboard view is rendered
            isDashboardRendered: false,
            // whether this is first time we're rendering the app
            isInitialRender: true
        });

        // render app header and container to page
        this.render();
    },

    /**
     * Render the app default view
     *
     * @method render
     * @return {View}
     */
    render: function () {
        this.$el.append(this.template());

        this.renderNotifications();

        this.renderDashboard();

        return this;
    },

    /**
     * Initializes the Notifications Manager View
     *
     * @method renderNotifications
     */
    renderNotifications: function () {
        this.views.notifications = new Ibp.Carbon.Views.NotificationManager();
    },

    /**
     * Renders Dashboard View
     *
     * @method renderDashboard
     */
    renderDashboard: function () {
        if (!this.views.dashboard) {
            this.views.dashboard = new Ibp.<%= appName %>.Views.Dashboard({
                $container: this.$(this.dashboardEl)
            });
        }

        if (!this.state.get('isDashboardRendered')) {
            this.state.toggle('isDashboardRendered');

            // only animate the view for transitions, i.e. not the initial app load
            if (this.state.get('isInitialRender')) {
                this.state.toggle('isInitialRender');
            }
            else {
                this.views.dashboard.show();
            }
        }
    }
});
