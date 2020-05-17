var _ = require('underscore');
var pstack = require('pstack');
var validator = require('validator');
var fstool = require('fs-tool');
var uuid = require('uuid')

Inventory = function (core, params, req, res) {
	var lib = {};
	lib = {
		purchase: async function (core, callback, req) {

			const userEmail = req.body.email

			//I would validate with some express middleware
			if (!validator.isEmail(userEmail) || req.body.currencyCode === null) {
				callback(core.errorResponse('Missing Params' + userEmail, { code: '400 ' }), 400)
				return false;
			}

			// I think that queries should be moved out into another layer i.e repository
			const userRes = await core.db().select().from('mock_partner_users').where('email', userEmail)
			const user = userRes[0] || null

			if (user.id === null) {
				callback(core.errorResponse('Invalid User', { code: '400 ' }), 400)
				return false;
			}

			const orderItems = req.body.orderItems || []
			const currencyCode = req.body.currencyCode
			const order_total_in_cents = orderItems.reduce(function (accum, curr) {
				accum += curr.total
				return accum
			}, 0) * 100

			//enough money to make purcahse 
			if (order_total_in_cents > user.balance_in_cents) {
				callback(core.errorResponse("Balance is too low to make a purchase", { code: '400 ' }), 400)
				return false;
			}

			const newOrder = {
				userId: user.id,
				purchase_total: order_total_in_cents,
				currency_code: currencyCode
			}

			const order = await core.db().returning('*').insert(newOrder).into('order')
			const orderId = order[0]

			const orderDetails = orderItems.map(function (brand) {
				return {
					order_id: orderId,
					brand_code: brand.brandCode,
					total: brand.total * 100 //convert back to cents - hacky
				}
			})

			// should do some sort of shema validation here
			const order_details = await core.db().returning('*').insert(orderDetails).into('order_details')

			//update user balance
			const u = await core.db()
				.from('mock_partner_users')
				.returning('*')
				.where('id', '=', user.id)
				.update({ balance_in_cents: user.balance_in_cents - order_total_in_cents });

			// lot's of assumptions here
			const response = orderDetails.map(function (brand) {
				return {
					"brand_code": brand.brandCode,
					"value": brand.total,
					"currency_code": currencyCode,
					"date": new Date(),
					"status": "completed",
					"quantity": 1,
					"giftcard_code": "",
					"booking_id": core.uuidv4()
				}
			})

			callback(response);
		}
	};
	return lib;
}

module.exports = Inventory;