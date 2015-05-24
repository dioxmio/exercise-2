import controller from './sports_controller';
import Backbone from 'backbone';
import App from '../../app.js';

App.initModule("Sports");

App.Sports.Router = App.Router.extend({
	appRoutes : {
		"" : "listSports",
		"events/:id": "listEvents"
	}
});

var API = {
	listSports: function(id) {
		return new App.Sports.Controller.ListSports();
	},
	listEvents: function(id) {
		return new App.Sports.Controller.ListEvents({"id":id});
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
