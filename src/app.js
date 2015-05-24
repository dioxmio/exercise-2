"use strict";

import Backbone from 'backbone';
import $ from 'jquery';
Backbone.$ = $;
import _ from 'underscore';
var Marionette = require('backbone.marionette');

var App = new Backbone.Marionette.Application();

App.config = {
	api : {},
	anonymous_routes : [ "" ]
};

App.initModule = function(moduleName, property) {
	if (App[moduleName] == undefined) {
		App[moduleName] = _.extend({}, Backbone.Events);
	}
	App[moduleName][property] = {};
}

App.url = function(relativeUrl, model) {
	var url = '/betvictor_api';
	if (model && model.get('id')) {
		relativeUrl += "/" + model.get('id');
	}
	return url + relativeUrl + ".json";
}

App.addInitializer(function(){
    //App.Navigation.View.renderNav();
});

App.on('start', function() {
	if (Backbone.history) {
		Backbone.history.start();
	}
});

App.Router = Marionette.AppRouter.extend({
	onRoute : function(route, url, params) {
		//App.Navigation.trigger("route:change", url);
	}
});

module.exports = App;
