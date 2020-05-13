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
        balanceInCents: data.balance_in_cents,
        currencyCode: data.currency_code,
        email: data.email
    }
}

export const getCurrencyCodes = async () => {
    const respose = await axios.post('/available_currency_codes');

    const data = respose.data
    //Why am I getting a string? this drove me nuts for minute and a half!
    return { currencyCodes: JSON.parse(data).currency_codes }
}

export const getGiftcardBrands = async (currencyCode) => {

    const respose = await axios.get('/brands', {
        api_code: '',
        currency_code: currencyCode
    });

    const giftCardsData = Object.values(JSON.parse(respose.data))

    return giftCardsData
}
