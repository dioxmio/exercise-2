//Init Backbone
import Backbone from 'backbone';
import BackboneSync from './lib/sync.js';
Backbone.$ = $;

//Init application
import app from './app.js';
import $ from 'jquery';

//Application Dependencies
import react_components from './lib/react_components.js';
import regions from './lib/regions.js';
import controller from './lib/controller.js';
import mixin from './lib/mixin.js';
import paginated from './lib/paginated.js';
// Application Modules
import sports_app from './modules/sports/sports_app.js';

$(document).ready(function() {
    app.start();
});
