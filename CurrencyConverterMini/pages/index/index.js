import { formatDateTime } from '../../utils/index.js'
import { currencies } from '../../utils/currency-config.js'

Page({
  data: {
    currencies,
    fromCurrencyIndex: 0,
    toCurrencyIndex: 1,
    amount: '1',
    convertedAmount: '',
    rate: '',
    lastUpdated: '',
    popularConversions: [],
    exchangeRates: {}
  },

  onLoad() {
    this.fetchExchangeRates()
  },

  // 导航到货币选择页面
  navigateToCurrencySelect(e) {
    const type = e.currentTarget.dataset.type
    const currentIndex = type === 'from' ? this.data.fromCurrencyIndex : this.data.toCurrencyIndex
    wx.navigateTo({
      url: `/pages/currency-select/index?type=${type}&currentIndex=${currentIndex}`
    })
  },

  // 获取汇率数据
  async fetchExchangeRates() {
    try {
      const response = await new Promise((resolve) => {
        wx.request({
          url: 'https://api.exchangerate-api.com/v4/latest/USD',
          success: resolve
        })
      })

      if (response.statusCode === 200) {
        const { rates, time_last_updated } = response.data
        this.setData({
          exchangeRates: rates,
          lastUpdated: formatDateTime(time_last_updated)
        })
        this.updateConversion()
        this.updatePopularConversions()
      }
    } catch (error) {
      wx.showToast({
        title: '获取汇率失败',
        icon: 'none'
      })
    }
  },

  // 更新转换结果
  updateConversion() {
    const { currencies, fromCurrencyIndex, toCurrencyIndex, amount, exchangeRates } = this.data
    const fromCurrency = currencies[fromCurrencyIndex].code
    const toCurrency = currencies[toCurrencyIndex].code

    if (exchangeRates && amount) {
      // 计算汇率
      const baseRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency]
      const converted = (parseFloat(amount) * baseRate).toFixed(2)

      this.setData({
        convertedAmount: converted,
        rate: baseRate.toFixed(4)
      })
    }
  },

  // 更新常用货币转换
  updatePopularConversions() {
    const popularPairs = [
      { from: 'CNY', to: 'USD', amount: 100 },
      { from: 'CNY', to: 'EUR', amount: 100 },
      { from: 'CNY', to: 'JPY', amount: 100 }
    ]

    const newPopularConversions = popularPairs.map(pair => {
      const rate = this.data.exchangeRates[pair.to] / this.data.exchangeRates[pair.from]
      const fromCurrency = this.data.currencies.find(c => c.code === pair.from)
      const toCurrency = this.data.currencies.find(c => c.code === pair.to)
      return {
        ...pair,
        fromName: fromCurrency.name,
        toName: toCurrency.name,
        convertedAmount: (pair.amount * rate).toFixed(2)
      }
    })

    this.setData({
      popularConversions: newPopularConversions
    })
  },

  // 处理输入金额变化
  handleAmountInput(e) {
    this.setData({
      amount: e.detail.value
    })
    this.updateConversion()
  },

  // 切换货币
  switchCurrencies() {
    const { fromCurrencyIndex, toCurrencyIndex } = this.data
    this.setData({
      fromCurrencyIndex: toCurrencyIndex,
      toCurrencyIndex: fromCurrencyIndex
    })
    this.updateConversion()
  }
}) 