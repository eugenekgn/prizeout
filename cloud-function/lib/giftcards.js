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
		},
		//TODO: make post
		purchase: async (core, callback, req) => {

			console.log(req.body.data)
			const userEmail = req.body.data.email
			// const purchaseOrder = req.body.orderItems || []

			console.log(req.body.data)
			const userRes = await core.db().select().from('mock_partner_users').where('email', userEmail)
			const userId = userRes[0].id


			const newOrder = {
				userId,
				purchase_total: 422
			}

			const order = await core.db().returning('*').insert(newOrder).into('order')
			console.log(order[0])
			// .then(function (response) {
			// 	console.log("insert response", response);
			// 	callback(userData);
			// });


			// var userData = {
			// 	email: params.email.toLowerCase(),
			// 	currency_code: params.currency_code.toUpperCase(),
			// 	balance_in_cents: _.random(15, 500) * 100
			// };

			callback({});
		}
	};
	return lib;
}

module.exports = Giftcards;