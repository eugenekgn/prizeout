import _axios from 'axios';
import { get } from 'lodash'

const axios = _axios.create({
    baseURL: 'http://localhost:8850',
    timeout: 200000,
})


export const getUserBalance = async (email, currencyCode) => {

    const requestBody = {
        email,
        currency_code: currencyCode
    }
    const respose = await axios.post('/user/available_balance', requestBody);

    const data = get(respose, 'data')

    return {
        balance_in_cents: data.balance_in_cents,
        currencyCode: data.currency_code,
        email: data.email
    }
}

export const getCurrencyCodes = async () => {
    const respose = await axios.post('/available_currency_codes');

    const data = respose.data
    //Why am I getting a string? this drove me nuts for minute and a half!
    return { currency_codes: JSON.parse(data).currency_codes }
}

export const getGiftcardBrands = async (currency_code) => {

    const respose = await axios.get('/brands', {
        api_code: '',
        currency_code
    });

    const giftCardsData = Object.values(JSON.parse(respose.data))
    return giftCardsData || []
}

export const purchase = async (email, currencyCode, card) => {

    const orderItems = card.map((item) => {
        return {
            brandCode: item.brand_code,
            name: item.name,
            total: item.currentValue
        }
    })

    // I knwo tha this was the requirements but I made some assumptions around this. I would like to speak about it. 
    /*
    - **api_key:** Required.
    - **brand_code:** Required. The brand code from the brand list
    - **currency_code:** Required. The giftcard's currency code
    - **value:** Required. The giftcard value
    */

    try {
        const respose = await axios.post('/inventory/purchase', {
            api_key: 'test',
            email,
            currencyCode,
            orderItems
        });

        return respose.data
    }
    catch (error) {
        return { error: error.message }
    }
}


