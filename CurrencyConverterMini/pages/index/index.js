// 获取应用实例
const app = getApp()

Page({
  data: {
    currencies: [
      { code: 'CNY', label: '🇨🇳 人民币 (CNY)' },
      { code: 'USD', label: '🇺🇸 美元 (USD)' },
      { code: 'EUR', label: '🇪🇺 欧元 (EUR)' },
      { code: 'GBP', label: '🇬🇧 英镑 (GBP)' },
      { code: 'JPY', label: '🇯🇵 日元 (JPY)' },
      { code: 'HKD', label: '🇭🇰 港币 (HKD)' },
      { code: 'KRW', label: '🇰🇷 韩元 (KRW)' },
      { code: 'AUD', label: '🇦🇺 澳元 (AUD)' },
      { code: 'CAD', label: '🇨🇦 加元 (CAD)' },
      { code: 'SGD', label: '🇸🇬 新加坡元 (SGD)' },
      { code: 'MYR', label: '🇲🇾 马来西亚林吉特 (MYR)' },
      { code: 'THB', label: '🇹🇭 泰铢 (THB)' }
    ],
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
          lastUpdated: new Date(time_last_updated * 1000).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
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
      return {
        ...pair,
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

  // 处理源货币变化
  handleFromCurrencyChange(e) {
    this.setData({
      fromCurrencyIndex: e.detail.value
    })
    this.updateConversion()
  },

  // 处理目标货币变化
  handleToCurrencyChange(e) {
    this.setData({
      toCurrencyIndex: e.detail.value
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