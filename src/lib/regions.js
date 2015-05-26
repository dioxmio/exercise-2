var $ = require('jquery');
var React = require('react/addons');
var App = require('../app.js');

App.Region = {
	show : function(view) {
		if (this._view) {
			React.unmountComponentAtNode(this.main());
			this._view.trigger('close');
			this._view.remove();
		}
		view.render();
		this._view = view;
	},
	main : function() {
		return $("#content")[0]
	},
	navigation : function() {
		return $("#navigation")[0]
	}
}
