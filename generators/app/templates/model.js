Ibp.<%= appName %>.Models.<%= appName %> = Ibp.Backbone.Model.extend({
    name: '<%= namespace %>',

    validators: {},

    url: function () {
        var url = BootstrappedData.apiUrlBase + '<%= namespace %>';

        return this.isNew() ? url : url + '/' + this.id;
    },

    init: function (options) {

    }
});
