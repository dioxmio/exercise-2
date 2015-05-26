//Init Backbone
var Backbone = require('backbone');
var BackboneSync = require('./lib/sync.js');
var $ = require('jquery');
Backbone.$ = $;

//Init application
var app = require('./app.js');


//Application Dependencies
var react_components = require('./lib/react_components.js');
var regions = require('./lib/regions.js');
var controller = require('./lib/controller.js');
var mixin = require('./lib/mixin.js');
var paginated = require('./lib/paginated.js');
// Application Modules
var sports_app = require('./modules/sports/sports_app.js');

$(document).ready(function() {
    app.start();
});
