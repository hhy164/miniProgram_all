Page({
  data: {
    type: '', // 'from' 或 'to'
    currencies: [
      { code: 'CNY', label: '🇨🇳 人民币 (CNY)', name: '人民币' },
      { code: 'USD', label: '🇺🇸 美元 (USD)', name: '美元' },
      { code: 'EUR', label: '🇪🇺 欧元 (EUR)', name: '欧元' },
      { code: 'GBP', label: '🇬🇧 英镑 (GBP)', name: '英镑' },
      { code: 'JPY', label: '🇯🇵 日元 (JPY)', name: '日元' },
      { code: 'HKD', label: '🇭🇰 港币 (HKD)', name: '港币' },
      { code: 'KRW', label: '🇰🇷 韩元 (KRW)', name: '韩元' },
      { code: 'AUD', label: '🇦🇺 澳元 (AUD)', name: '澳元' },
      { code: 'CAD', label: '🇨🇦 加元 (CAD)', name: '加元' },
      { code: 'SGD', label: '🇸🇬 新加坡元 (SGD)', name: '新加坡元' },
      { code: 'MYR', label: '🇲🇾 马来西亚林吉特 (MYR)', name: '马来西亚林吉特' },
      { code: 'THB', label: '🇹🇭 泰铢 (THB)', name: '泰铢' }
    ],
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