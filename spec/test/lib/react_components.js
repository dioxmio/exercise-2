var React = require('react');
var Components = require('../../../src/lib/react_components.js');
var Sinon = require('sinon');
var Backbone = require('backbone');

describe("Components.loading", function(){
  
  var server;
  var tesingModel = Backbone.Model.extend({
    url: function() {
        return "/testing";
    }
  });

  beforeEach(function() {
    server = Sinon.fakeServer.create();
  });

  var TestUtils = React.addons.TestUtils;

  it("model not loading", function() {

    var model = new tesingModel();

    var component = TestUtils.renderIntoDocument(
      <Components.loading model={model} modal={false}>
        <div>
          child
        </div>
      </Components.loading>
    );

    var node = React.findDOMNode(component.refs.loader);
    expect(node).toEqual(null);
  });

  it("model fetching", function() {

    server.respondWith("GET", 
                        "/testing",
                       [200, { "Content-Type": "application/json" },
                        '{"id": "1"}']);

    var model = new tesingModel();
    model.fetch();

    var component = TestUtils.renderIntoDocument(
      <Components.loading model={model} modal={false}>
        <div>
          child
        </div>
      </Components.loading>
    );
    var node = React.findDOMNode(component.refs.loader);
    var nodeModal = React.findDOMNode(component.refs.modal);
    expect(nodeModal).toEqual(null);
    expect(node != null).toBeTruthy();
  });

  it("model fetching modal", function() {

    server.respondWith("GET", 
                        "/testing",
                       [200, { "Content-Type": "application/json" },
                        '{"id": "1"}']);

    var model = new tesingModel();
    model.fetch();
    
    var component = TestUtils.renderIntoDocument(
      <Components.loading model={model} modal={true}>
        <div>
          child
        </div>
      </Components.loading>
    );
    var nodeLoader = React.findDOMNode(component.refs.loader);
    var nodeModal = React.findDOMNode(component.refs.modal);
    expect(nodeLoader).toEqual(null);
    expect(nodeModal != null).toBeTruthy();
  });

  it("many model saving", function() {

    var model1 = new tesingModel();
    model1.save();
    var model2 = new tesingModel();
    model2.save();

    var component = TestUtils.renderIntoDocument(
      <Components.loading model={[model1,model2]} modal={false}>
        <div>
          child
        </div>
      </Components.loading>
    );
    var node = React.findDOMNode(component.refs.loader);
    expect(node != null).toBeTruthy();
  });

  it("model fetching and response", function() {

    server.respondWith("GET", 
                        "/testing",
                       [200, { "Content-Type": "application/json" },
                        '{"id": "1"}']);

    var model = new tesingModel();
    model.fetch();

    var component = TestUtils.renderIntoDocument(
      <Components.loading model={model} modal={false}>
        <div>
          child
        </div>
      </Components.loading>
    );
    var node = React.findDOMNode(component.refs.loader);
    var nodeModal = React.findDOMNode(component.refs.modal);
    expect(nodeModal).toEqual(null);
    expect(node != null).toBeTruthy();

    server.respond();

    var component = TestUtils.renderIntoDocument(
      <Components.loading model={model} modal={false}>
        <div>
          child
        </div>
      </Components.loading>
    );
    var node = React.findDOMNode(component.refs.loader);
    expect(node).toEqual(null);
  });

  it("model fetching and response modal", function() {

    server.respondWith("GET", 
                        "/testing",
                       [200, { "Content-Type": "application/json" },
                        '{"id": "1"}']);

    var model = new tesingModel();
    model.fetch();

    var component = TestUtils.renderIntoDocument(
      <Components.loading model={model} modal={true}>
        <div>
          child
        </div>
      </Components.loading>
    );
    var node = React.findDOMNode(component.refs.loader);
    var nodeModal = React.findDOMNode(component.refs.modal);
    expect(node).toEqual(null);
    expect(nodeModal != null).toBeTruthy();

    server.respond();

    var component = TestUtils.renderIntoDocument(
      <Components.loading model={model} modal={true}>
        <div>
          child
        </div>
      </Components.loading>
    );
    var node = React.findDOMNode(component.refs.loader);
    var nodeModal = React.findDOMNode(component.refs.modal);
    expect(node).toEqual(null);
    expect(nodeModal).toEqual(null);
  });

});