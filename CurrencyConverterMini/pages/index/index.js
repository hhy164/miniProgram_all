import { CURRENCIES, DEFAULT_FROM, DEFAULT_TO } from '../../constants/currency'
import ExchangeService from '../../services/exchange'

Page({
  data: {
    currencies: CURRENCIES,
    fromCurrency: DEFAULT_FROM,
    toCurrencies: DEFAULT_TO,
    amount: '',
    results: [],
    loading: false,
    lastUpdate: ''
  },

  onLoad() {
    this.fetchExchangeRates()
  },

  async fetchExchangeRates() {
    try {
      this.setData({ loading: true })
      const rates = await ExchangeService.getRates()
      this.setData({
        rates,
        lastUpdate: new Date().toLocaleString()
      })
      this.calculateResults()
    } catch (error) {
      wx.showToast({
        title: '获取汇率失败',
        icon: 'none'
      })
    } finally {
      this.setData({ loading: false })
    }
  },

  onFromCurrencyChange(e) {
    this.setData({
      fromCurrency: e.detail.value
    })
    this.calculateResults()
  },

  onAmountInput(e) {
    this.setData({
      amount: e.detail.value
    })
    this.calculateResults()
  },

  calculateResults() {
    const { amount, fromCurrency, toCurrencies, rates } = this.data
    const results = ExchangeService.convertCurrency(
      amount,
      fromCurrency,
      toCurrencies,
      rates
    )
    this.setData({ results })
  },

  onRefresh() {
    this.fetchExchangeRates()
  }
}) 