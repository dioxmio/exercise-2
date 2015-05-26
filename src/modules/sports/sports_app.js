var controller = require('./sports_controller');
var Backbone = require('backbone');
var App = require('../../app.js');

App.initModule("Sports");

App.Sports.Router = App.Router.extend({
	appRoutes : {
		"" : "listSports",
		"events/:id": "listEvents",
		"events/:sport_id/outcomes/:event_id": "listOutcomes"
	}
});

var API = {
	listSports: function(id) {
		return new App.Sports.Controller.ListSports();
	},
	listEvents: function(id) {
		return new App.Sports.Controller.ListEvents({"id":id});
	},
	listOutcomes: function(sport_id,event_id) {
		return new App.Sports.Controller.ListOutcomes({"sport_id":sport_id, "event_id": event_id});
	} 
};

App.addInitializer(function() {
	return new App.Sports.Router({
		controller : API
	});
});

App.Sports.on("sports:listSports", function() {
	Backbone.history.navigate("");
	API.listSports();
});

App.Sports.on("sports:listEvents", function(id) {
	Backbone.history.navigate("events/" + id);
	API.listEvents(id);
});

App.Sports.on("sports:listOutcomes", function(attributes) {
	Backbone.history.navigate("events/" + attributes.sport_id  + "/outcomes/" + attributes.event_id);
	API.listOutcomes(attributes.sport_id, attributes.event_id);
});

App.API = API;

module.exports = App;
