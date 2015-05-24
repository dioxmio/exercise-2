import Backbone from 'backbone';
import Paginator from 'backbone.paginator';
import _ from 'underscore';
import App from '../app.js';

Backbone.Paginator = Paginator;

App.Paginated = Backbone.PageableCollection.extend({
	url : function() {
		return _.result(this, 'url');
	},
	state : {
		firstPage : 0,
		currentPage : 0,
		perPage : 10,
		totalPages : 0
	},
	queryParams : {
		'perPage' : function() {
			return this.state.perPage;
		},
		'pageNumber' : function() {
			return this.state.currentPage;
		}
	},
	parse : function(response, options) {
		this.totalRecords = response.total_count;
		this.perPage = response.per_page;
		this.totalPages = response.total_pages;
		return response.objects;
	},
	setFilter : function(filter) {
	    this.queryParams = _.extend({}, _.pick(this.queryParams, 'perPage',
				'totalPages', 'firstPage', 'pageNumber'), filter);
	}
});