var Backbone = require('backbone'); 
var _ = require('underscore');
var App = require('../../app.js');

App.initModule("Sports", "Model");

App.Sports.Model.ListSports = Backbone.Collection.extend({
    url: function() {
        return App.url('/sports',this)
    }
});

App.Sports.Model.ListEvents = Backbone.Collection.extend({
    url: function() {
        return App.url('/sports/'+this.sport_id,this)
    }
});

App.Sports.Model.ListOutcomes = Backbone.Collection.extend({
    url: function() {
        return App.url('/sports/' + this.sport_id + '/events/' + this.event_id ,this)
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

App.reqres.setHandler('sports:listOutcomes', function(ids, options){
    var model = new App.Sports.Model.ListOutcomes();
    model.sport_id = ids.sport_id;
    model.event_id = ids.event_id;
    model.fetch(_.extend({cache: false}, options || {}));
    return model;
});

module.exports = App;