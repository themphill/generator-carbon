/**
 * Shows the Dashboard view
 *
 * @module <%= appName %>
 * @submodule Views
 * @class Dashboard
 * @extends Ibp.Carbon.Views.PageView
 */
Ibp.<%= appName %>.Views.Dashboard = Ibp.Carbon.Views.PageView.extend({
    /**
     * The name of the component
     *
     * @property name
     * @type String
     */
    name: 'Dashboard',

    /**
     * This view's template function
     *
     * @property template
     * @type Function
     */
    template: Ibp.<%= appName %>.Templates.dashboard,

    /**
     * References to child views
     *
     * @property views
     * @type Object
     */
    views: {},

    /**
     * Page container
     *
     * @property $container
     * @type jQuery Object
     */
    $container: null,

    /**
     * A list of events and handlers from this view's section of the UI
     *
     * @property events
     * @type Object
     */
    events: {},

    /**
     * Runs when the component is created
     *
     * @method init
     * @param {Object} options Data passed in on component instance creation
     */
    init: function (options) {
        _.bindAll(this);

        this.$container = options.$container;

        this.views = {};

        this.render();
    },

    /**
     * Render the view
     *
     * @method render
     * @return {View}
     */
    render: function () {
        this.$el.html(this.template());

        this.$container.html(this.$el);

        return this;
    },

    /**
     * Takes care of unrendering child views specific to this view
     *
     * @method onUnrender
     */
    onUnrender: function () {
        _.invoke(this.views, 'unrender');
    }
});
