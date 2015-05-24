import controller from './sports_controller';
import Backbone from 'backbone';
import App from '../../app.js';

App.initModule("Sports");

App.Sports.Router = App.Router.extend({
	appRoutes : {
		"" : "listSports",
	}
});

var API = {
	listSports : function(id) {
		return new App.Sports.Controller.List();
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
