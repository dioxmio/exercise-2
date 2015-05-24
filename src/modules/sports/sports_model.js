import Backbone from 'backbone'; 
import _ from 'underscore';
import App from '../../app.js';

App.initModule("Sports", "Model");

App.Sports.Model.Sport = Backbone.Model.extend({
    defaults: function() {
        return {};
    }
});

App.Sports.Model.ListSports = App.Paginated.extend({
    model: App.Sports.Model.Sport,
    url: function() {
        return App.url('/sports',this)
    }
});

App.Sports.Model.Event = Backbone.Model.extend({
    defaults: function() {
        return {};
    }
});

App.Sports.Model.ListEvents = Backbone.Collection.extend({
    model: App.Sports.Model.Sport,
    url: function() {
        return App.url('/sports/'+this.sport_id,this)
    }
});

App.reqres.setHandler('sports:listSports', function(id, options){
    var model = new App.Sports.Model.ListSports();
    model.fetch(_.extend({cache: false}, options || {}));
	return model;
});

App.reqres.setHandler('sports:listEvents', function(id, options){
    var model = new App.Sports.Model.ListEvents();
    model.sport_id = id;
    model.fetch(_.extend({cache: false}, options || {}));
    return model;
});
