var view = require('./sports_view.js');
var App = require('../../app.js');

App.initModule("Sports", "Controller");

App.Sports.Controller.ListSports = App.Controller.Base.extend({
	initialize : function(options) {
	  this.collection = App.request('sports:listSports');
	  this.view = this.getView(this.collection);
		this.show(this.view);
		this.listenTo(this.view, 'sports:selectedSport', this.selectedSport);
	},
	selectedSport: function(id) {
			App.Sports.trigger("sports:listEvents",id);
	},
	getView: function(collection) {
		return new App.Sports.View.ListSports({
			collection : collection,
		});
	}
});

App.Sports.Controller.ListEvents = App.Controller.Base.extend({
	initialize : function(options) {
		this.options = options;
		this.collection = App.request('sports:listEvents',options.id);
		this.view = new App.Sports.View.ListEvents({
			collection : this.collection,
		});
		this.show(this.view);
		this.listenTo(this.view, 'sports:selectedEvent', this.selectedEvent);
		this.listenTo(this.view, 'sports:listSports', this.handleBack);
	},
	selectedEvent: function(id) {
			App.Sports.trigger("sports:listOutcomes",{"sport_id":this.options.id, "event_id":id});
	},
	handleBack: function() {
			App.Sports.trigger("sports:listSports");
	}
});

App.Sports.Controller.ListOutcomes = App.Controller.Base.extend({
	initialize : function(options) {
		this.options = options;
		this.collection = App.request('sports:listOutcomes',options);
		this.view = new App.Sports.View.ListOutcomes({
			collection : this.collection,
		});
		this.show(this.view);
		this.listenTo(this.view, 'sports:listEvents', this.handleBack);
	},
	handleBack: function() {
			App.Sports.trigger("sports:listEvents",this.options.sport_id);
	}
});

//easier for testing
module.exports = App;
