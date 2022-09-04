import axios from 'axios';

const apiKey = import.meta.env.VITE_API_CURRATE
const apiKey2 = import.meta.env.VITE_API_FIXER



class ApiCurrency {
  constructor (headers) {
    this.headers = headers
  }

  getCurrency() {
    const headers = this.headers
    return axios.get("https://api.apilayer.com/fixer/symbols", {crossDomain: true, headers})
  }

  getValueByCurrency(params) {
    const headers = this.headers
    return axios.get(`https://api.apilayer.com/fixer/convert?to=${params.toCurrency}&from=${params.fromCurrency}&amount=${params.amount}`, {crossDomain: true, headers})
  }
}

const currencyApi = new ApiCurrency({'apikey': apiKey2})

export default currencyApi;