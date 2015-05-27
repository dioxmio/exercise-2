var Backbone = require('backbone');
var BackboneSync = require('../../../src/lib/sync.js');
var Sinon = require('sinon');

describe('testing fetch promises stored', function(){

  var server;
  var tesingModel = Backbone.Model.extend({
    url: function() {
        return "/testing";
    }
  });

  beforeEach(function() {
    server = Sinon.fakeServer.create();
  });

  it('promise stored in model', function(){
    server.respondWith("GET", 
                        "/testing",
                       [200, { "Content-Type": "application/json" },
                        '{"id": "1"}']);

    var model = new tesingModel();
    model.fetch();

    expect(model._fetch != undefined).toBeTruthy();
    expect(model._fetch.state()).toEqual("pending");

    server.respond();

    expect(model._fetch.state()).toEqual("resolved");
  });

  it('promise stored in model and abort', function(){
    server.respondWith("GET", 
                        "/testing",
                       [200, { "Content-Type": "application/json" },
                        '{"id": "1"}']);

    var model = new tesingModel();
    model.fetch();

    expect(model._fetch != undefined).toBeTruthy();
    expect(model._fetch.state()).toEqual("pending");

    var stubAbort = Sinon.stub(model._fetch, "abort", function() {return 0});
    model.fetch();

    expect(stubAbort.called).toBeTruthy();
    stubAbort.restore();
  });

  it('promise stored in model when saving', function(){
    server.respondWith("POST", 
                        "/testing",
                       [200, { "Content-Type": "application/json" },
                        '{"id": "1"}']);

    var model = new tesingModel();
    model.save();

    expect(model._store != undefined).toBeTruthy();
    expect(model._store.state()).toEqual("pending");

    server.respond();

    expect(model._store.state()).toEqual("resolved");
  })

});