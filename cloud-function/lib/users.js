var _			= require('underscore');
var pstack		= require('pstack');
var validator	= require('validator');
var fstool		= require('fs-tool');

Users = function(core, params, req, res) {
	var lib = {};
	lib = {
		// Returns the list of available brands
		available_balance: function(callback) {
			if (!params.email || !validator.isEmail(params.email)) {
				callback(core.errorResponse('Invalid user email', {code: 'invalid_email'}));
				return false;
			}
			if (!params.currency_code) {
				callback(core.errorResponse('Invalid currency code', {code: 'invalid_currency_code'}));
				return false;
			}
			core.db().select().from('mock_partner_users').where('email', params.email.toLowerCase()).where('currency_code', params.currency_code.toUpperCase()).then(function(response) {
				console.log("response",response);
				if (!response) {
					callback(core.errorResponse('Something went wrong, please try again.', {code: 'invalid_sql_response'}));
					return false;
				}
				if (response && response.length==0) {
					// No user, create one
					var userData	= {
						email:				params.email.toLowerCase(),
						currency_code:		params.currency_code.toUpperCase(),
						balance_in_cents:	_.random(15, 500)*100
					};
					core.db().returning('*').insert(userData).into('mock_partner_users').then(function(response) {
						console.log("insert response",response);
						callback(userData);
					});
				} else {
					callback({
						email:				params.email.toLowerCase(),
						balance_in_cents:	response[0].balance_in_cents,
						currency_code:		response[0].currency_code
					});
				}
				
			});
		},
	};
	return lib;
}

module.exports = Users;