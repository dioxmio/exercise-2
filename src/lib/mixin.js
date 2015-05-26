var App = require('../app.js');
// An example generic Mixin that you can add to any component that should react
// to changes in a Backbone component. The use cases we've identified thus far
// are for Collections -- since they trigger a change event whenever any of
// their constituent items are changed there's no need to reconcile for regular
// models. One caveat: this relies on getBackboneModels() to always return the
// same model instances throughout the lifecycle of the component. If you're
// using this mixin correctly (it should be near the top of your component
// hierarchy) this should not be an issue.
App.BackboneMixin = {
	__syncedModels : [],
	componentDidMount : function() {
		// Whenever there may be a change in the Backbone data, trigger a
		// reconcile.
		this.getBackboneModels().forEach(this.injectModel, this);
	},
	componentWillUnmount : function() {
		// Ensure that we clean up any dangling references when the component is
		// destroyed.
		this.__syncedModels.forEach(function(model) {
			model.off(null, model.__updater, this);
		}, this);
	},
	injectModel : function(model) {
		if (!~this.__syncedModels.indexOf(model)) {
			var updater = this.forceUpdate.bind(this, null);
			model.__updater = updater;
			model.on('add change remove sync request error', updater, this);
		}
	},
	bindTo : function(model, key) {
		return {
			value : model.get(key),
			requestChange : function(value) {
				model.set(key, value);
			}.bind(this)
		}
	},
	triggerChange : function(model) {
		if (model) {
			model.trigger('change');
			return;
		}
		_.each(__syncedModels, function(item) {
			item.trigger('change');
		});
	}
}

App.FormMixin = {
	componentWillReceiveProps : function(nextProps) {
		if (this.props.attachToForm) {
			nextProps.attachToForm = this.props.attachToForm;
			nextProps.detachFromForm = this.props.detachFromForm;
			nextProps.validate = this.props.validate;
		}
	}
}