var React = require('react');
var Init = require('../initTestApp.js');
var App = require('../../../src/modules/sports/sports_app.js');
var Component = require('../../../src/lib/react_components.js');
var Sinon = require('sinon');
var Backbone = require('backbone');

describe("Sports.App", function(){

  it("App list sports",function(){

    var stubSportsApi = Sinon.stub(App.API, "listSports");
    var stubNavigate = Sinon.stub(Backbone.history, "navigate");

    App.Sports.trigger("sports:listSports");

    expect(stubSportsApi.called).toBeTruthy();
    expect(stubNavigate.withArgs("").called).toBeTruthy();

    stubSportsApi.restore();
    stubNavigate.restore();

  });

   it("App list events",function(){

    var id = 1;
    var stubEventsApi = Sinon.stub(App.API, "listEvents");
    var stubNavigate = Sinon.stub(Backbone.history, "navigate");

    App.Sports.trigger("sports:listEvents",id);

    expect(stubEventsApi.called).toBeTruthy();
    expect(stubNavigate.withArgs("events/"+id).called).toBeTruthy();

    stubEventsApi.restore();
    stubNavigate.restore();

  });

  it("App list outcomes",function(){

    var params = { "sport_id":1, "event_id":2 };
    var stubEventsApi = Sinon.stub(App.API, "listOutcomes");
    var stubNavigate = Sinon.stub(Backbone.history, "navigate");

    App.Sports.trigger("sports:listOutcomes",params);

    expect(stubEventsApi.called).toBeTruthy();
    expect(stubNavigate.withArgs("events/" + params.sport_id  + "/outcomes/" + params.event_id).called).toBeTruthy();

    stubEventsApi.restore();
    stubNavigate.restore();

  });

  it("Api test list sports",function(){
    var stubInit = Sinon.stub(App.Sports.Controller.ListSports.prototype, "initialize", function() {return 0});

    App.API.listSports();

    expect(stubInit.called).toBeTruthy();
    stubInit.restore();

  });

  it("Api test list events",function(){
    var stubInit = Sinon.stub(App.Sports.Controller.ListEvents.prototype, "initialize", function() {return 0});

    App.API.listEvents("1");

    expect(stubInit.called).toBeTruthy();
    stubInit.restore();

  });

  it("Api test list outcomes",function(){
    var stubInit = Sinon.stub(App.Sports.Controller.ListOutcomes.prototype, "initialize", function() {return 0});

    App.API.listOutcomes();

    expect(stubInit.called).toBeTruthy();
    stubInit.restore();

  });

});