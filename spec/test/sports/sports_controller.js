var React = require('react');
var Init = require('../initTestApp.js');
var App = require('../../../src/modules/sports/sports_controller.js');
var Sinon = require('sinon');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

describe("Sports.Controller", function(){

  it("controller creation", function(){

      var listSportsView = new Backbone.View();
      var stubShow = Sinon.stub(App.Controller.Base.prototype, "show", function() {return 0});
      var stubView = Sinon.stub(App.Sports.Controller.ListSports.prototype, "getView", function() { return listSportsView;});
      var stubListenTo = Sinon.stub(Marionette.Controller.prototype, "listenTo", function() { return listSportsView;});
      var spyRequest = Sinon.spy(App, "request");
      spyRequest.withArgs("sports:listSports");

      var listSports = new App.Sports.Controller.ListSports();
      
      expect(stubShow.called).toBeTruthy();
      expect(stubView.called).toBeTruthy();
      expect(stubListenTo.called).toBeTruthy();
      expect(spyRequest.withArgs("sports:listSports").called).toBeTruthy();
      
      stubShow.restore();
      stubView.restore();
      stubListenTo.restore();
      spyRequest.restore();

  });

  it("controller view trigger", function(){
      var listSportsView = new Backbone.View();
      var stubShow = Sinon.stub(App.Controller.Base.prototype, "show", function() {return 0});
      var stubView = Sinon.stub(App.Sports.Controller.ListSports.prototype, "getView", function() { return listSportsView;});
      var stubListSports = Sinon.stub(App.Sports.Controller.ListSports.prototype, "selectedSport", function() { return 0;});
      var spyRequest = Sinon.spy(App, "request");
      spyRequest.withArgs("sports:listSports");

      var listSports = new App.Sports.Controller.ListSports();
      listSportsView.trigger('sports:selectedSport','12');
      
      expect(stubListSports.called).toBeTruthy();

      stubListSports.restore();
      stubShow.restore();
      stubView.restore();
      spyRequest.restore();
  });

  it("controller view selected", function(){
      var listSportsView = new Backbone.View();
      var stubShow = Sinon.stub(App.Controller.Base.prototype, "show", function() {return 0});
      var stubView = Sinon.stub(App.Sports.Controller.ListSports.prototype, "getView", function() { return listSportsView;});
      var selectedTrigger = Sinon.spy(App.Sports, "trigger");
      
      var listSports = new App.Sports.Controller.ListSports();
      listSports.selectedSport();

      
      expect(selectedTrigger.called).toBeTruthy();
    
      stubShow.restore();
      stubView.restore();
      selectedTrigger.restore();
  });

});
