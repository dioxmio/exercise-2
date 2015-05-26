var React = require('react');
var Init = require('../initTestApp.js');
var App = require('../../../src/modules/sports/sports_model.js');
var Component = require('../../../src/lib/react_components.js');
var Sinon = require('sinon');
var Backbone = require('backbone');


describe("Sports.Model", function(){

  var server;

  beforeEach(function() {
    server = Sinon.fakeServer.create();
  });

  afterEach(function () {
    server.restore();
  });

  it("fetching sports", function() {
    server.respondWith("GET", 
                        /^(\/betvictor_api\/sports.json\?_=)/,
                       [200, { "Content-Type": "application/json" },
                        '[{ "id": "1", "title":"basket"}, {"id": 2, "title":"football"}]']);

    var result = App.request('sports:listSports');
    server.respond();
    expect(result.size()).toEqual(2);
  });

  it("fetching events", function() {
    server.respondWith("GET", 
                        /^(\/betvictor_api\/sports\/1.json\?_=)/,
                       [200, { "Content-Type": "application/json" },
                        '[{ "id": "1", "title":"t1"}]']);

    var result = App.request('sports:listEvents',1);
    server.respond();
    expect(result.size()).toEqual(1);
  });

  it("fetching outcomes", function() {
    server.respondWith("GET", 
                        /^(\/betvictor_api\/sports\/1\/events\/2.json\?_=)/,
                       [200, { "Content-Type": "application/json" },
                        '[{ "id": "1", "description":"d1"}]']);
    var params = { "sport_id":1, "event_id":2 };
    var result = App.request('sports:listOutcomes',params);
    server.respond();
    expect(result.size()).toEqual(1);
  });

});