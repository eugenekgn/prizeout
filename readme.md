# Giftcard Booking

We are going to sell giftcards on a minimalistic website.

The users identify using their email address (ignore passwords on this task), they select their currency & can then browse the available giftcards.

They can click a giftcard to see its details, and purchase a quantity of up to 5 giftcards at a time.

We need to keep track of our users' purchases & balances.

We list the available brands & we purchase the giftcards from a mock-api located at `https://us-east1-prizeout-non-prod.cloudfunctions.net/mock-api/`.

We have built the basics of the website & the API to get you started.

User accounts are generated with a random balance, and stored in the `mock_partner_users` table in the database.

## Tasks

- Load & display the giftcards
- Create a giftcard details directive. Show that directive when a user clicks a giftcard on the giftcard list.
- Create a giftcard booking process. The user should be allowed to buy up to 5 giftcards at a time.
- Create a record of the purchases.
- Keep track of the user's balances.
- Secure the ajax requests between the client-side & the API (Example: signing, encryption, ...)
- Add comments on the scalability of your code wherever you deem fit. 

## MySQL Database

Feel free to add any tables you like to this database! You can connect with the tool of your choosing.

- Username: eugene_kagan_05052020174200
- Database name: eugene_kagan_05052020174200_db
- Password: XZREZ5PtV5Oabtkv
- Server: 35.190.180.147
- Port: 3306

## Tech Stack

- Node 8+
- Angular 1 (https://angularjs.org/)

## Installation

**API (Cloud Function):**

Installation:

Edit `cloud-function/cloud-function-handler.js`, set the mysql database connection credentials on line 20.

	cd cloud-function && npm install

Launch on localhost *(port 8850)*

	node run-local

**Website:**

Installation:

	cd website && npm install http-server -g

Launch on localhost *(port 8080)*:

	http-server -c-1


## Giftcard API Specs

- **Server:** `https://us-east1-prizeout-non-prod.cloudfunctions.net/mock-api/`
- **API KEY:** `f72fdf6c3f735191b25fadf4425aef4b`

### Get the currency codes for which there is inventory available

**Endpoint:**

	/inventory/available_currency_codes
	
**Parameters:**

- **api_key:** Required.
	
**Method:**

	GET
	
**Response:**

	{"currency_codes": ["USD", "AUD", "CAD"]}

### Get the available brands

**Endpoint:**

	/inventory/brands
	
**Parameters:**

- **api_key:** Required.
- **currency_code:** Optional. "USD", "AUD" or "CAD"
	
**Method:**

	GET
	
**Response:**

	{
		"amazonus": {
			"brand_code": "amazonus",
			"name": "Amazon.com",
			"image_url": "https://uploadedimages.giftbit.com/amazonus/amazon-30ec8f7a-616a-46aa-aa3f-cafbca10bddc.jpg",
			"disclaimer": "Amazon.com Gift Cards (\"GCs\") sold by Giftbit Inc., an authorized and independent reseller of Amazon.com Gift Cards. Except as required by law, GCs cannot be transferred for value or redeemed for cash. GCs may be used only for purchases of eligible goods at Amazon.com or certain of its affiliated websites. For complete terms and conditions, see http://www.amazon.com/gc-legal. GCs are issued by ACI Gift Cards, Inc., a Washington corporation. All Amazon �, � & � are IP of Amazon.com, Inc. or its affiliates. No expiration date or service fees.",
			"description": "Available to be redeemed on Amazon.com only. This gift card can be used towards millions of items at Amazon.com. This gift is sent in US Currency.",
			"regions": [
			2
			],
			"fund_currencyisocode": "USD",
			"embeddable": true,
			"variable_price": true,
			"min_price_in_cents": 200,
			"max_price_in_cents": 200000
		},
		"itunesus": {
			"brand_code": "itunesus",
			"name": "App Store & iTunes",
			"image_url": "https://uploadedimages.giftbit.com/itunesus/giftbititunes-4aa41b13-163d-4cdc-9eda-a2374843c798.png",
			"disclaimer": "Valid only on iTunes Store for U.S. Requires iTunes account and prior acceptance of license and usage terms. To open an account you must be 13+ and in the U.S. Compatible software, hardware, and Internet access required. Not redeemable for cash, no refunds or exchanges (except as required by law). Code may not be used to purchase any other merchandise, allowances or iTunes gifting. Data collection and use subject to Apple Customer Privacy Policy, see www.apple.com/privacy, unless stated otherwise. Risk of loss and title for code passes to purchaser on transfer. Codes are issued and managed by Apple Value Services, LLC (�Issuer�). Neither Apple nor Issuer is responsible for any loss or damage resulting from lost or stolen codes or use without permission. Apple and its licensees, affiliates, and licensors make no warranties, express or implied, with respect to code or the iTunes Store and disclaim any warranty to the fullest extent available. These limitations may not apply to you. Void where prohibited. Not for resale. Subject to full terms and conditions, see www.apple.com/legal/itunes/us/gifts.html. Content and pricing subject to availability at the time of actual download. Content purchased from the iTunes Store is for personal lawful use only. Don�t steal music. � 2012 Apple Inc. All rights reserved. iTunes is a registered trademark of Apple Inc., All rights reserved. Apple is not a participant in or sponsor of this promotion. Mac and OS X are trademarks of Apple Inc., registered in the U.S. and other countries.",
			"description": "Redeem your iTunes Code for music, movies, TV shows, games, apps, books, and more on the iTunes Store, the App Store, the iBooks Store, or the Mac App Store.",
			"regions": [
			2
			],
			"fund_currencyisocode": "USD",
			"embeddable": true,
			"variable_price": true,
			"min_price_in_cents": 500,
			"max_price_in_cents": 50000
		},
		...
	}



### Book a giftcard

**Endpoint:**

	/inventory/purchase
	
**Parameters:**

- **api_key:** Required.
- **brand_code:** Required. The brand code from the brand list
- **currency_code:** Required. The giftcard's currency code
- **value:** Required. The giftcard value
	
**Method:**

	POST
	
**Response:**

	{
		"brand_code": "woolworthsaud",
		"value": 10000,
		"currency_code": "AUD",
		"date": "2020-04-09T20:14:49.824Z",
		"status": "completed",
		"quantity": 1,
		"giftcard_code": "92e43b54",
		"booking_id": "1870b32b-47e9-46c0-868e-daf1ecd4c1bd"
	}



## Note

- Set your IDE to use tabs, not spaces. 1 tab = 4 spaces.
- Do not use ES6.
- Keep the code formatting consistent.# prizeout


