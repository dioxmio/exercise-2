var React = require('react');
var Init = require('../initTestApp.js');
var App = require('../../../src/modules/sports/sports_app.js');
var Component = require('../../../src/lib/react_components.js');
var Sinon = require('sinon');
var Backbone = require('backbone');

describe("Sports.App", function(){

  it("App list sports",function(){

    var sportsApi = Sinon.stub(App.API, "listEvents");

    App.Sports.trigger("sports:listEvents","1");

    expect(sportsApi.called).toBeTruthy();
    sportsApi.restore();

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