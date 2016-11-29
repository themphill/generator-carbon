(function () {
    $.ajaxSetup({
        statusCode: {
            // handle api errors from non-sync ajax requests
            400: function (jqXHR) {
                var error;

                try {
                    error = $.parseJSON(jqXHR.responseText);
                } catch (e) {
                    // not much we can do here
                }

                Ibp.EventHub.trigger('apiError', error);
            },
            // unauthorized
            401: function () {
                location.href = "/logout.php";
            },
            403: function () {
                location.href = "/logout.php";
            }
        }
    });

// Initialize your collection with the appropriate BootstappedData property
    // Set Up Models & Collections
    // Ibp.<%= appName %>.Data.<%= appName %> = new Ibp.<%= appName %>.Collections.<%= appName %>(BootstrappedData.<%= appName %>);

    // App Entry Point - Init main view and launch app
    Ibp.<%= appName %>.App = new Ibp.<%= appName %>.Views.Main();

    // Enable routing
    Ibp.<%= appName %>.Router = new Ibp.<%= appName %>.Routers.Main({});
    Backbone.history.start({root: '<%= namespace %>'});
})();
