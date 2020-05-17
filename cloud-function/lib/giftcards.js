var _ = require('underscore');
var pstack = require('pstack');

Giftcards = function (core, params, req, res) {
	var lib = {};
	lib = {
		api_key: 'f72fdf6c3f735191b25fadf4425aef4b',
		// Get the brand list for a given curency code
		brands: function (callback) {
			// Call the mock-api
			core.apicall("GET", "https://us-east1-prizeout-non-prod.cloudfunctions.net/mock-api/inventory/brands", {
				api_key: lib.api_key,
				currency_code: params.currency_code
			}, function (response) {
				// Send back the response
				callback(response);
			});
		},
		// Get the available currency codes
		available_currency_codes: function (callback) {
			// Call the mock-api
			core.apicall("GET", "https://us-east1-prizeout-non-prod.cloudfunctions.net/mock-api/inventory/available_currency_codes", {
				api_key: lib.api_key
			}, function (response) {
				// Send back the response
				callback(response);
			});
		}
	};
	return lib;
}

module.exports = Giftcards;