// Basic NPM Modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const redis = require('redis');
const client = redis.createClient();

// Express framework initialization
const app = express();

// Logger initialization
app.use(logger('dev'));

// Schema reference
app.schema = {};

// Set Port
app.set('port', process.env.PORT || 8080);

// Configuration reference
app.config = require('./config/devConfig.js');

// Common Function reference
app.common = require('./dextra/functions/common');

//Redis database connection
require('./onServerStart/redisConnection.js')(app, client);
// Mongoose Database connection (with auto-increment initialization)
require('./onServerStart/mongooseConnection.js')(app, mongoose);

// Handle uncaught exception
require('./onServerStart/uncaughtException.js')(app);

// API Router reference
require('./router.js')(app);
require('./models')(app, mongoose);

// Data Access Layer reference
app.crud = require('./dal/crud');

// Server Start
const listener = app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
	//Call script
	require('./onServerStart/scripts.js')(app);
});