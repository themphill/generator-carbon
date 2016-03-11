/**
 * <%= appName %> Model
 *
 * @module <%= appName %>
 * @submodule Models
 * @class <%= appName %>
 * @extends Ibp.Backbone.Model
 */
Ibp.<%= appName %>.Models.<%= appName %> = Ibp.Backbone.Model.extend({
    /**
     * The name of the component
     *
     * @property name
     * @type String
     */
    name: '<%= appName %>',

    /**
     * A component instance will be created with these properties
     *
     * @property defaults
     * @type Object
     */
    defaults: {},

    /**
     * A list of validation rules
     * See Carbon/ibp.backbone.model.js
     *
     * @property validators
     * @type Object
     */
    validators: {},

    /**
     * A list of attributes to type cast before being set on the model
     * See Carbon/mixins/model.transform.js
     *
     * @property transforms
     * @type Object
     */
    transforms: {},

    /**
     * A list of model attribute aliases that can be displayed to the user (i.e. 'acct_id: Account ID')
     * Used in Collection.save to notify when an attribute has been updated
     *
     * @property names
     * @type Object
     */
    names: {},

    /**
     * The URL for performing CRUD actions
     *
     * @method url
     * return {String}
     */
    url: function () {
        var url = BootstrappedData.apiUrlBase + '<%= namespace %>';

        return this.isNew() ? url : url + '/' + this.id;
    },

    /**
     * Runs when the component is created
     *
     * @method init
     * @param {Object} options Data passed in on component instance creation
     */
    init: function (options) {

    }
});
