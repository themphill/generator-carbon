/**
 * <%= appName %> Collection
 *
 * @module <%= appName %>
 * @submodule Collections
 * @class <%= appName %>
 * @extends Ibp.Backbone.Collection
 */
Ibp.<%= appName %>.Collections.<%= appName %> = Ibp.Backbone.Collection.extend({
    /**
     * The name of the component
     *
     * @property name
     * @type String
     */
    name: '<%= appName %>',

    /**
     * A reference to the class constructor of the model that this is a collection of
     *
     * @property model
     * @type Model
     */
    model: Ibp.<%= appName %>.Models.<%= appName %>,

    /**
     * The URL for performing CRUD actions
     *
     * @property url
     * @type String
     */
    url: BootstrappedData.apiUrlBase + '<%= namespace %>',

    /**
     * A list of events and handlers triggered on this collection
     * You can also listen for events on models in this collection
     *
     * @property events
     * @type Object
     */
    events: {},

    /**
     * A list of events and handlers triggered on the global EventHub
     *
     * @property subscriptions
     * @type Object
     */
    subscriptions: {},

    /**
     * Runs when the component is created
     *
     * @method init
     * @param {Object} options Data passed in on component instance creation
     */
    init: function (options) {
        this.listenTo(this, 'save', this.save);
        this.listenTo(this, 'delete', this.destroy);
    },

    /**
     * Saves the given attributes on the model and notifies of the result
     *
     * @method save
     * @param model {Model} The model to save
     * @param changed {Object} The new attributes to save
     */
    save: function (model, changed) {
        var _this = this,
            isNew = model.isNew(),
            attrs = changed || model.changed;

        this.publish('notify', {type: 'saving'});

        model.isSaving = true;

        model.save(attrs, {
            wait: true,
            patch: true,
            validate: true,
            success: function () {
                var notification = {
                    type: 'success',
                    msg: 'Successfully saved ' + model.names[_.first(_.keys(attrs))] + '.'
                };

                model.isSaving = false;

                if (isNew) {
                    _this.add(model);

                    notification.msg = 'Successfully created ' + model.get('name') + '.';
                }

                _this.publish('notify', notification);
            },
            error: function () {
                model.isSaving = false;

                _this.publish('notify', {type: 'error', msg: 'Error saving ' + model.get('name') + '.'});
            }
        });
    },

    /**
     * Delete event handler
     * Destroys the model that triggers the event
     *
     * @method destroy
     * @param model {Model} The model to be destroyed
     */
    destroy: function (model) {
        var _this = this,
            modelName = model.get('name');

        // use the 'saving' notification template to display the 'deleting' message
        this.publish('notify', {type: 'saving', msg: 'Deleting...'});

        model.destroy({
            wait: true,
            success: function () {
                _this.publish('notify', {type: 'success', msg: 'Successfully deleted ' + modelName + '.'});
            },
            error: function () {
                _this.publish('notify', {type: 'error', msg: 'Could not delete ' + modelName + '.'});
            }
        });
    },
});
