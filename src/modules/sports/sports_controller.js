import view from './sports_view.js';
import App from '../../app.js';

App.initModule("Sports", "Controller");

App.Sports.Controller.List = App.Controller.Base.extend({
	initialize : function(options) {
	  this.collection = App.request('sports:list');
		this.view = new App.Sports.View.List({
			collection : this.collection,
		});
		this.show(this.view);
		this.listenTo(this.view, 'sports:selected', this.selectedSport);
	},
	selectedSport: function() {
	    console.log("selected sport");
	}
});