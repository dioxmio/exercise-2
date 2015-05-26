//Loading Application Dependencies for testing
var Backbone = require('backbone');
var BackboneSync = require('../../src/lib/sync.js');
var $ = require('jquery');
Backbone.$ = $;
//Init application
var App = require('../../src/app.js');
//Application Dependencies
var react_components = require('../../src/lib/react_components.js');
var regions = require('../../src/lib/regions.js');
var controller = require('../../src/lib/controller.js');
var mixin = require('../../src/lib/mixin.js');
var paginated = require('../../src/lib/paginated.js');