import React from 'react/addons';
import _ from 'underscore';
import $ from 'jquery';

var Components = {};

  Components.paginationComponent = React.createClass({
    renderSimplePagination: function() {
        var html = [];
        var results = this.props.collection.totalPages;
        for(var i=0; i < results; i++) {
            html.push(<li className={ this.currentPage() == (i) ? "disabled" : ""} key={i}>
                <a onClick={this.goTo} href='#' className='page'>{i+1}</a>
            </li>);
        }
        return html;
    },
    complexPagination: function() {
        var html = [];
        var results = this.props.collection.totalPages-1;
        html.push(<li className={ this.currentPage() == 0 ? "disabled" : ""} key={0}>
            <a onClick={this.goTo} href='#' className='page'>{1}</a>
        </li>);

        if(this.currentPage() - 1 <= 0) {
            html.push(<li className={ this.currentPage() == 1 ? "disabled" : ""} key={1}>
                    <a onClick={this.goTo} href='#' className='page'>{2}</a>
            </li>);
            html.push(<li className={ this.currentPage() == 2 ? "disabled" : ""} key={2}>
                <a onClick={this.goTo} href='#' className='page'>{3}</a>
            </li>);
            html.push(<li className={"disabled"} key={3}>
                <a onClick={void(0)} className='page'>...</a>
            </li>);
        }

        if(this.currentPage() - 1 > 0 && this.currentPage() + 1 < results) {
            html.push(<li className={"disabled"} key={-1}>
                <a onClick={void(0)} className='page'>...</a>
            </li>);
            html.push(<li key={this.currentPage()}>
                <a onClick={this.goTo} href='#' className='disabled'>{this.currentPage()}</a>
            </li>);
            html.push(<li className={"disabled"} key={this.currentPage()+1}>
                <a onClick={this.goTo} href='#' className='disabled'>{this.currentPage()+1}</a>
            </li>);
            html.push(<li key={this.currentPage()+2}>
                <a onClick={this.goTo} href='#' className='page'>{this.currentPage()+2}</a>
            </li>);
            html.push(<li key={-2}>
                <a onClick={void(0)} className='page'>...</a>
            </li>);
        }

        if(this.currentPage() + 1 >= results) {
            html.push(<li className={"disabled"} key={results-3}>
                <a onClick={void(0)} className='page'>...</a>
            </li>);
            html.push(<li className={ this.currentPage() == results-2 ? "disabled" : ""} key={results-2}>
                <a onClick={this.goTo} href='#' className='page'>{results-1}</a>
            </li>);
            html.push(<li className={ this.currentPage() == results-1 ? "disabled" : ""} key={results-1}>
                <a onClick={this.goTo} href='#' className='page'>{results}</a>
            </li>);

        }

        html.push(<li className={ this.currentPage() == results ? "disabled" : ""} key={results}>
            <a onClick={this.goTo} href='#' className='page'>{results+1}</a>
        </li>);

        return html;
    },
    renderPages: function() {
        if(!this.props.collection.totalPages || this.props.collection.totalPages < 6) {
            return this.renderSimplePagination();
        }
        return this.complexPagination();
    },
    isDisabled: function(e) {
      return $(e.target).parent().hasClass("disabled");
    },
    goTo: function(e){
      e.preventDefault();
      var page = $(e.target).text();
      if(!this.isDisabled(e)) {
        this.props.collection.getPage(parseInt(page)-1);
      }
    },
    prev: function(e) {
      e.preventDefault();
      if(!this.isDisabled(e)) {
        this.props.collection.getPreviousPage();
      }
    },
    next: function(e) {
      e.preventDefault();
      if(!this.isDisabled(e)) {
        this.props.collection.getNextPage();
      }
    },
    currentPage: function() {
      return this.props.collection.state.currentPage || 0;
    },
    render: function() {
      var pages = this.renderPages();
      return (
        <div className="text-center">
          <div className="pagination pagination-centered" >
            <ul className="pagination pagination-centered" >
              <li className={ this.currentPage() == 0 ? "disabled" : ""}><a href="#" onClick={this.prev} className="first">Prev</a></li>
              {pages}
              <li className={ (this.currentPage() == this.props.collection.totalPages-1 || this.props.collection.totalPages == 0) ? "disabled" : ""} ><a href="#" onClick={this.next} className="last">Next</a></li>
            </ul>
          </div>
        </div>
      );
    }
  });

  Components.paginationSummaryComponent = React.createClass({
    render: function() {
      var maxItems = (this.props.collection.state.currentPage + 1) * (this.props.collection.state.perPage);
      if(maxItems > this.props.collection.totalRecords) {
        maxItems = this.props.collection.totalRecords || 0;
      }
      return (
        <h5>
          Displaying {(((this.props.collection.state.currentPage) * this.props.collection.state.perPage)+1) || 0}
          &nbsp; - {maxItems} ouf {this.props.collection.totalRecords || 0}
        </h5>
      );
    }
  });

  Components.loading = React.createClass({
    hasFinishedSavingItem: function(item) {
      if(!item._store || item._store.state() != "pending") {
        return true;
      }
      return false;
    },
    hasFinishedSavingArray: function(modelArray) {
      _.each(modelArray, function(item){
        if(!this.hasFinishedSavingItem(item)){
          return false;
        }
      },this);
      return true;
    },
    hasFinishedLoadingItem: function(item) {
      if(!item._fetch || item._fetch.state() != "pending") {
        return true;
      }
      return false;
    },
    hasFinishedLoadingArray: function(modelArray) {
      _.each(modelArray, function(item){
        if(!this.hasFinishedLoadingItem(item)){
          return false;
        }
      },this);
      return true;
    },
    hasFinishedLoading: function() {
      if( Object.prototype.toString.call(this.props.model) === '[object Array]' ) {
        return this.hasFinishedLoadingArray(this.props.model);
      } else {
        return this.hasFinishedLoadingItem(this.props.model);
      }
    },
    hasFinishedSaving: function() {
      if( Object.prototype.toString.call(this.props.model) === '[object Array]' ) {
        return this.hasFinishedSavingArray(this.props.model);
      } else {
        return this.hasFinishedSavingItem(this.props.model);
      }
    },
    render: function() {
        var children = <div className="app-loader"/>;
        if(this.hasFinishedSaving(this.props.model) && this.hasFinishedLoading(this.props.model)) {
            return <div>{this.props.children}</div>;
        }
        if(this.props.modal === true) {
            children = <div className="cover">{this.props.children}<div className="save-spining"></div><div className="save-loader"></div></div>;
        }
        return children;
    }
  });

  Components.valuePairView = React.createClass({
    render: function() {
      return (
        <div className="bottom-30">
          <div className="row">
            <div className="col-xs-4 col-sm-2 regular-text">
              <strong>{this.props.label}</strong>
            </div>
            <div className="col-xs-8 col-sm-10 regular-text">
              {this.props.value}
            </div>
          </div>
        </div>
      )
    }
  });

  Components.valuePairLinkView = React.createClass({
    selected: function() {
      this.props.clickAction(this.props.model.get('id'));
    },
    render: function() {
      return (
        <div className="bottom-30">
          <div className="row">
            <div className="col-xs-4 col-sm-2 regular-text">
              {this.props.label}:
            </div>
            <div className="col-xs-8 col-sm-10 regular-text">
              <button type="button" onClick={this.selected} value="cancel" className="btn btn-link btn-app">{this.props.value}</button>
            </div>
          </div>
        </div>
      )
    }
  });

Components.EmptyList = React.createClass({
    render: function() {
        var emptyMessage= React.addons.classSet({
          'displayNone': (this.props.collection._fetch && this.props.collection._fetch.state() != "pending") && (this.props.collection.size() != 0),
          'errorListMessage': true,
          'text-danger': true
        });
        return (
            <div className={emptyMessage}>
                <strong>No items were found</strong>
            </div>
        );
    }
});


module.exports = Components;

