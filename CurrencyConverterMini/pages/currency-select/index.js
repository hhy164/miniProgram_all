import { currencies } from '../../utils/currency-config.js'

Page({
  data: {
    type: '', // 'from' 或 'to'
    currencies,
    selectedIndex: 0
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

  handleCurrencySelect(e) {
    const index = e.currentTarget.dataset.index
    const pages = getCurrentPages()
    const prevPage = pages[pages.length - 2]

    // 更新上一页数据
    if (this.data.type === 'from') {
      prevPage.setData({ fromCurrencyIndex: index })
    } else {
      prevPage.setData({ toCurrencyIndex: index })
    }

    // 触发汇率更新
    prevPage.updateConversion()

    // 返回上一页
    wx.navigateBack()
  }
}) 