const path = require('path');
const os = require('os');
const _ = require('underscore');

// Abstracting a single cloud function into multiple dynamic http-endpoints
const Handler = require('./cloud-function-handler');

// Init the handler
var handler = new Handler({
	core: require('./lib/core.js')	// This contains the logic, with an instance of it passed to each route
});

// Define the virtual routes

/*
	Test
*/
handler.on('/', function (params, callback, req, res, core) {
	callback({
		"hello": "world"
	});
}, {
	CORS: true
});

/*
	Giftcards
*/
handler.on('/brands', function (params, callback, req, res, core) {
	core.giftcards.brands(callback);
}, {
	CORS: true
});
handler.on('/available_currency_codes', function (params, callback, req, res, core) {
	core.giftcards.available_currency_codes(callback);
}, {
	CORS: true
});

handler.on('/purchase', function (params, callback, req, res, core) {
	core.giftcards.purchase(core, callback, req);
}, {
	CORS: true
});

/*
	Users
*/
handler.on('/user/available_balance', function (params, callback, req, res, core) {
	core.users.available_balance(callback);
}, {
	CORS: true
});


exports.main = (req, res) => {

	// Start the handler
	// It'll deal with everything...
	handler.start(req, res);
};