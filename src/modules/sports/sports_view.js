var model = require('./sports_model.js');
var Backbone = require('backbone');
var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap');
var Components = require('../../lib/react_components.js');
var $ = require('jquery');
var App = require('../../app.js');

App.initModule("Sports", "View");
App.Sports.View.Components = {};

App.Sports.View.Components.ListSports = React.createClass({
    itemSelected: function(id) {
        this.props.sportSelected(id);
    },
    render: function() {
        var listSportsData = this.props.collection.map(function(item){
            return <tr onClick={this.itemSelected.bind(this,item.get('id'))} ref={"sportItem"+item.get('id')} key={item.get('id')}>
                <td>{item.get('title')}</td>
              </tr>;
        }, this);
        return (
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Sport</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSportsData}
                    </tbody>
                </table>
                <Components.EmptyList collection={this.props.collection} />
            </div>
        );
    }
});

App.Sports.View.Components.Sports = React.createClass({
    mixins: [App.BackboneMixin],
    getBackboneModels: function() {
        return [this.props.collection];
    },
    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-xs-12 col-md-9">
                      <h1 className="top-10 bottom-5">Sports</h1>
                    </div>
                </div>
                <hr/>
                <Components.loading model={this.props.collection} modal={false}>
                    <App.Sports.View.Components.ListSports
                        sportSelected={this.props.sportSelected}
                        collection={this.props.collection} />
                </Components.loading>
            </div>
        );
    }
});

App.Sports.View.ListSports = Backbone.View.extend({
    sportSelected: function(id){
        this.trigger('sports:selectedSport',id);
    },
    reactRender: function() {
        return (
            <App.Sports.View.Components.Sports
                sportSelected={this.sportSelected.bind(this)}
                collection={this.collection} />
        );
    },
    render: function() {
        React.render(
            this.reactRender(),
            App.Region.main()
        );
    }
});

App.Sports.View.Components.ListEvents = React.createClass({
    itemSelected: function(id) {
        this.props.eventSelected(id);
    },
    render: function() {
        var listSportsData = this.props.collection.map(function(item){
            return <tr onClick={this.itemSelected.bind(this,item.get('id'))} key={item.get('id')}>
                <td>{item.get('title')}</td>
                <td>{item.get('event_type')}</td>
                <td>{item.get('home_team')}</td>
                <td>{item.get('away_team')}</td>
                <td>{item.get('status')}</td>
              </tr>;
        }, this);
        return (
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Event Type</th>
                            <th>Home Team</th>
                            <th>Away Team</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSportsData}
                    </tbody>
                </table>
                <Components.EmptyList collection={this.props.collection} />
            </div>
        );
    }
});

App.Sports.View.Components.Events = React.createClass({
    mixins: [App.BackboneMixin],
    getBackboneModels: function() {
        return [this.props.collection];
    },
    handleBack: function() {
        this.props.handleBack();
    },
    render: function() {
        return (
            <div>
                <button type="button" onClick={this.handleBack} className="btn btn-link btn-app"> {'<- back to sports'}</button>
                <div className="row">
                    <div className="col-xs-12 col-md-9">
                      <h1 className="top-10 bottom-5">Events</h1>
                    </div>
                </div>
                <hr/>
                <Components.loading model={this.props.collection} modal={false}>
                    <App.Sports.View.Components.ListEvents
                        eventSelected={this.props.eventSelected}
                        collection={this.props.collection} />
                </Components.loading>
            </div>
        );
    }
});

App.Sports.View.ListEvents = Backbone.View.extend({
    eventSelected: function(id){
        this.trigger('sports:selectedEvent',id);
    },
    handleBack: function() {
        this.trigger('sports:listSports'); 
    },
    render: function() {
        React.render(
            <App.Sports.View.Components.Events
                eventSelected={this.eventSelected.bind(this)}
                handleBack={this.handleBack.bind(this)}
                collection={this.collection} />,
            App.Region.main()
        );
    }
});

App.Sports.View.Components.ListOutcomes = React.createClass({
    render: function() {
        var listSportsData = this.props.collection.map(function(item){
            return <tr key={item.get('id')}>
                <td>{item.get('description')}</td>
                <td>{item.get('market')}</td>
                <td>{item.get('price')}</td>
                <td>{item.get('price_decimal')}</td>
              </tr>;
        }, this);
        return (
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Market</th>
                            <th>Price</th>
                            <th>Decimal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSportsData}
                    </tbody>
                </table>
                <Components.EmptyList collection={this.props.collection} />
            </div>
        );
    }
});

App.Sports.View.Components.Outcomes = React.createClass({
    mixins: [App.BackboneMixin],
    getBackboneModels: function() {
        return [this.props.collection];
    },
    handleBack: function() {
        this.props.handleBack();
    },
    render: function() {
        return (
            <div>
                <button type="button" onClick={this.handleBack} className="btn btn-link btn-app"> {'<- back to events'}</button>
                <div className="row">
                    <div className="col-xs-12 col-md-9">
                      <h1 className="top-10 bottom-5">Outcomes</h1>
                    </div>
                </div>
                <hr/>
                <Components.loading model={this.props.collection} modal={false}>
                    <App.Sports.View.Components.ListOutcomes
                        collection={this.props.collection} />
                </Components.loading>
            </div>
        );
    }
});

App.Sports.View.ListOutcomes = Backbone.View.extend({
    handleBack: function() {
        this.trigger('sports:listEvents'); 
    },
    render: function() {
        React.render(
            <App.Sports.View.Components.Outcomes
                handleBack={this.handleBack.bind(this)}
                collection={this.collection} />,
            App.Region.main()
        );
    }
});

module.exports = App;