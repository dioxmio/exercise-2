var React = require('react');
var Init = require('../initTestApp.js');
var App = require('../../../src/modules/sports/sports_view.js');
var Components = require('../../../src/lib/react_components.js');
var Sinon = require('sinon');
var Backbone = require('backbone');

describe("Sports.View", function(){
  
  var TestUtils = React.addons.TestUtils;

  it("List Sports Component Selected", function(){
    var callback = Sinon.spy();
    var collection = new Backbone.Collection({"title": "footable","id":1});
    var spyRequest = Sinon.spy(collection, "map");

    var listSportsRender = TestUtils.renderIntoDocument(
      <App.Sports.View.Components.ListSports 
        collection={collection}
        sportSelected={callback} />
    );
    var node = React.findDOMNode(listSportsRender.refs.sportItem1);
    React.addons.TestUtils.Simulate.click(node);
    expect(callback.withArgs(1).called).toBeTruthy();
    expect(spyRequest.called).toBeTruthy();

    spyRequest.reset();
    callback.reset();
  });

  it("Sports Component", function(){
    var collection = new Backbone.Collection({"title": "footable","id":1});
    var listSportsRender = TestUtils.renderIntoDocument(
      <App.Sports.View.Components.Sports
        collection={collection}/>
    );
    
    var listSports = TestUtils.scryRenderedComponentsWithType(listSportsRender, App.Sports.View.Components.ListSports);
    var loading = TestUtils.scryRenderedComponentsWithType(listSportsRender, Components.Loading);
    
    expect(listSports != undefined).toBeTruthy();
    expect(loading != undefined).toBeTruthy();
  });

  it("Sports View", function(){
    var collection = new Backbone.Collection({"title": "footable","id":1}); 
    var listSports = new App.Sports.View.ListSports();
    listSports.collection = collection;

    var listSportsRender = TestUtils.renderIntoDocument(
      listSports.reactRender()
    );

    var sports = TestUtils.scryRenderedComponentsWithType(listSportsRender, App.Sports.View.Components.Sports);
    expect(sports != undefined).toBeTruthy();
  });

  it("Sports View Selected", function(){
    var collection = new Backbone.Collection({"title": "footable","id":1}); 
    var listSports = new App.Sports.View.ListSports();
    listSports.collection = collection;
    var selectedTrigger = Sinon.spy(listSports, "trigger");

    listSports.sportSelected(10);

    expect(selectedTrigger.withArgs('sports:selectedSport',10).called).toBeTruthy();
  });

});
