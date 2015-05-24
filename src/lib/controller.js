import Backbone from 'backbone';

var Marionette = require('backbone.marionette');
import _ from 'underscore';
import App from '../app.js';

App.Controller = {};

App.Controller.Base = Backbone.Marionette.Controller
		.extend({
			constructor : function(options) {
				options = options || {};
				this.region = options.region || App.request("default:region");
				this._instance_id = _.uniqueId("controller");
				this._view = undefined;
				// Register controller in global registry
				App.execute("register:instance", this, this._instance_id);
				Backbone.Marionette.Controller.prototype.constructor.apply(
						this, arguments);
			},
			close : function() {
				App.execute("unregister:instance", this, this._instance_id);
				Backbone.Marionette.Controller.prototype.destroy.apply(this,
						arguments);
			},
			show : function(view, options) {
				options = options || {};
				_.defaults(options, {
					region : this.region
				});
				// Unbind listener if we are showing different view
				// that should pervent controller from closing
				if (this._mainView && view !== this._mainView) {
					this.stopListening(this._mainView, "close", this.close);
				}
				this._setMainView(view);
				// Once view is closed, controller should be closed as well
				this.listenTo(view, "close", this.close);
				// Spinner functionality
				if (options.loading) {

				} else {
					App.Region.show(view);
				}
			},
			remove : function(model, options) {
				options = options || {};
				_.defaults(options, {
					showSuccess : true,
					successMessage : 'Record has been successfully removed',
					successTitle : 'Success!',
					errorTitle : "Error",
					showError : true,
					errorMessage : "Delete Action failed"
				});

				var errorHandler = function() {
					// Render error message
					if (options.showError) {
						App.vent.trigger('notify:error', {
							title : options.errorTitle,
							text : options.errorMessage
						});
					}

					if (options.highlightForm && options.view) {
						// Map errors information
						var errors = prepareModelInfo(
								arguments,
								function(error) {
									var responseError = error[0].responseJSON ? error[0].responseJSON.errors
											: "Server Error"
									return {
										errors : responseError,
										model : error[0].model
									};
								});
						if (errors[0].errors) {
							model.set('errors', errors[0].errors);
						}
					}
				};

				var successHandler = function() {
					model.unset('error', {
						silent : true
					});
					if (options.showSuccess) {
						App.vent.trigger('notify:success', {
							title : options.successTitle,
							text : options.successMessage
						});
					}

					var afterCallback = _.bind(function(success) {
						if (_.isFunction(options.afterRemove)) {
							options.afterRemove.call(this, success);
						}
					}, this);

					afterCallback(true);
				};

				model.destroy().done(successHandler).fail(errorHandler);

			},
			save : function(model, options) {
				options = options || {};
				_.defaults(options, {
					showSuccess : true,
					successMessage : 'Record has been successfully saved',
					successTitle : 'Success!',
					showError : true,
					errorTitle : "Oops!",
					errorMessage : "Please review the error messages below",
					highlightForm : true,
					waitAllPromises : false,
					saveMethod : 'save'
				});

				var afterCallback = _.bind(function(success) {
					if (_.isFunction(options.afterSave)) {
						options.afterSave.call(this, success);
					}
				}, this);

				// Build respone error/success information into data that's
				// consumed by error handler
				var prepareModelInfo = function(args, mapper) {
					var result;
					// There's three arguments passed if only one deferred
					// object been used.
					// We always convert it to array
					if (!_.isObject(args[1]) && args.length === 3) {
						result = [ args ];
					} else {
						result = args;
					}
					// Call mapper method to format error messages properly
					return _.map(result, mapper);
				};

				var errorHandler = function() {
					// Render error message
					if (options.showError) {
						App.vent.trigger('notify:error', {
							title : options.errorTitle,
							text : options.errorMessage
						});
					}

					if (options.highlightForm && options.view) {
						// Map errors information
						var errors = prepareModelInfo(
								arguments,
								function(error) {
									var responseError = error[0].responseJSON ? error[0].responseJSON
											: "Server Error"
									return {
										errors : responseError,
										model : error[0].model
									};
								});
						if (errors[0].errors) {
							model.set('errors', errors[0].errors);
						}
					}
					afterCallback(false);
				};

				var successHandler = function() {
					model.unset('error', {
						silent : true
					});
					if (options.showSuccess) {
						App.vent.trigger('notify:success', {
							title : options.successTitle,
							text : options.successMessage
						});
					}

					if (options.highlightForm && options.view) {
						var successes = prepareModelInfo(arguments, function(
								success) {
							return {
								model : success[2].model
							};
						});
					}
					afterCallback(true);
				};

				// Build set of the promises by calling model save method
				var promises = _.chain([ model ]).flatten().map(
						function(model) {
							var def = model[options.saveMethod]();
							def.model = model;
							return def;
						}).toArray().value();

				// Wait for all promises all together
				/*
				 * if(options.waitAllPromises === true) { var result =
				 * $.whenAll.apply($, promises);
				 * result.success.done(successHandler);
				 * result.failure.fail(errorHandler); } else {
				 */
				_.each(promises, function(promise) {
					promise.done(successHandler).fail(errorHandler);
				});
				// }
			},
			_setMainView : function(view) {
				this._mainView = view;
				this.listenTo(view, "close", this.close);
			}
		});