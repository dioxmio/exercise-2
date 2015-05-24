import model from './sports_model.js';
import Backbone from 'backbone';
import React from 'react/addons';
import ReactBootstrap from 'react-bootstrap';
import Components from '../../lib/react_components.js';
import $ from 'jquery';
import App from '../../app.js';

App.initModule("Sports", "View");

var ListSports = React.createClass({
    itemSelected: function(id) {
        this.props.sportSelected(id);
    },
    render: function() {
        console.log("here I am");
        var listSportsData = this.props.collection.map(function(item){
            console.log("item");
            return <tr onClick={this.itemSelected.bind(this,item.get('id'))} key={item.get('id')}>
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

var Sports = React.createClass({
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
                <Components.paginationSummaryComponent collection={this.props.collection}/>
                <Components.loading model={this.props.collection} modal={false}>
                    <ListSports
                        sportSelected={this.props.sportSelected}
                        collection={this.props.collection} />
                    <Components.paginationComponent collection={this.props.collection}/>
                </Components.loading>
            </div>
        );
    }
});

App.Sports.View.List = Backbone.View.extend({
    sportSelected: function(id){
        this.trigger('sports:selected',id);
    },
    render: function() {
        React.render(
            <Sports
                sportSelected={this.sportSelected.bind(this)}
                collection={this.collection} />,
            App.Region.main()
        );
    }
});
