import Backbone from 'backbone'; 
import _ from 'underscore';
import App from '../../app.js';

App.initModule("Sports", "Model");

App.Sports.Model.Sport = Backbone.Model.extend({
    defaults: function() {
        return {};
    }
    /*url: function() {
        return App.url('/sports',this)
    }*/
});

App.Sports.Model.ListSports = App.Paginated.extend({
    model: App.Sports.Model.Sport,
    url: function() {
        return App.url('/sports',this)
    }
});

App.reqres.setHandler('sports:list', function(id, options){
    var model = new App.Sports.Model.ListSports();
    model.fetch(_.extend({cache: false}, options || {}));
	return model;
});
