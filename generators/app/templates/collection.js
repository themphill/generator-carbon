Ibp.<%= appName %>.Collections.<%= appName %> = Ibp.Backbone.Collection.extend({
    name: '<%= namespace %>',
    model: Ibp.<%= appName %>.Models.<%= appName %>,
    url: BootstrappedData.apiUrlBase + '<%= namespace %>',

    events: {},

    subscriptions: {},

    init: function () {

    }
});
