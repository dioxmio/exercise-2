import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import App from '../app.js';
// Store the native, default sync method, we'll wrap this.
Backbone._nativeSync = Backbone.sync;

// Create our default options object
Backbone.defaultSyncOptions = {};
Backbone.defaultSyncOptions.headers = {};

// Ever so gingerly wrap the native sync in a method that combines options
Backbone.sync = function(method, model, options) {
    var removeEmptyProperties = function(model) {
        _.each(Object.keys(model.attributes), function(attribute) {
           if(!_.isNumber(model.get(attribute)) && _.isEmpty(model.get(attribute))) {
                model.unset(attribute, {silent:true});
           }
        });
    }

    if(method !== "read") {
        removeEmptyProperties(model);
    }

    var sync = Backbone._nativeSync(method, model, _.extend({},
			Backbone.defaultSyncOptions, options));
	if (model._fetch) {
		model._fetch.abort();
	}
	if (method === "read") {
		model._fetch = sync;
	} else {
		model._store = sync;
	}

	return sync;
};

module.exports = Backbone;