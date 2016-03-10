Ibp.<%= appName %>.Views.Main = Ibp.Backbone.View.extend({
    name: 'main',
    template: Ibp.<%= appName %>.Templates.main,
    notifyEl: '#notifications',
    dashboardEl: '#<%= namespace %>-dashboard',

    init: function () {
        // render app title and container to page
        this.render();

        // set up notifications
        this.notifyView = new Ibp.Carbon.Views.Notify({
            el: this.notifyEl
        });
    },

    render: function () {
        this.$el.append(this.template());

        return this;
    }
});
