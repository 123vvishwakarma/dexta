'use strict'; 
module.exports = function (app, client) {
    client.on('connect', function() {
	    console.log('Redis client connected');
	});

	client.on('error', function (err) {
	    console.log('Something went wrong ' + err);
	});
};