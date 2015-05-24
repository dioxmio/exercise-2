import $ from 'jquery';
import React from 'react/addons';
import App from '../app.js';

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
