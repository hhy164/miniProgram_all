import { fetchRates } from '../utils/api'
import { calculateRate } from '../utils/currency'

export default class ExchangeService {
  static async getRates() {
    try {
      const data = await fetchRates()
      return data.rates
    } catch (error) {
      throw error
    }
  }

  static convertCurrency(amount, fromCurrency, toCurrencies, rates) {
    if (!amount || !rates) return []

    return toCurrencies.map(toCurrency => ({
      currency: toCurrency,
      value: calculateRate(amount, rates[fromCurrency], rates[toCurrency])
    }))
  }
} 