import { currencies } from '../../utils/currency-config.js'

Page({
  data: {
    type: '', // 'from' 或 'to'
    currencies,
    filteredCurrencies: currencies,
    selectedIndex: 0,
    searchText: ''
  },

  onLoad(options) {
    this.setData({
      type: options.type,
      selectedIndex: parseInt(options.currentIndex || 0)
    })
  },

  // 处理返回按钮点击
  handleBack() {
    wx.navigateBack()
  },

  // 处理搜索输入
  handleSearch(e) {
    const searchText = e.detail.value.toLowerCase()
    this.setData({ searchText })

    if (!searchText) {
      this.setData({ filteredCurrencies: this.data.currencies })
      return
    }

    const filtered = this.data.currencies.filter(currency =>
      currency.name.toLowerCase().includes(searchText) ||
      currency.code.toLowerCase().includes(searchText)
    )

    this.setData({ filteredCurrencies: filtered })
  },

  // 清除搜索
  clearSearch() {
    this.setData({
      searchText: '',
      filteredCurrencies: this.data.currencies
    })
  },

  handleCurrencySelect(e) {
    const index = e.currentTarget.dataset.index
    const originalIndex = this.data.currencies.findIndex(
      c => c.code === this.data.filteredCurrencies[index].code
    )
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]

    // 更新上一页数据
    if (this.data.type === 'from') {
      prevPage.setData({ fromCurrencyIndex: originalIndex })
    } else {
      prevPage.setData({ toCurrencyIndex: originalIndex })
    }

    // 触发汇率更新
    prevPage.updateConversion()

    // 返回上一页
    wx.navigateBack()
  }
}) 