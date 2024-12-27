// 货币配置
export const currencyConfig = {
  // 货币国旗映射
  flagEmojis: {
    CNY: '🇨🇳', USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', JPY: '🇯🇵',
    HKD: '🇭🇰', KRW: '🇰🇷', AUD: '🇦🇺', CAD: '🇨🇦', SGD: '🇸🇬',
    THB: '🇹🇭', MYR: '🇲🇾', IDR: '🇮🇩', PHP: '🇵🇭', INR: '🇮🇳',
    NZD: '🇳🇿', CHF: '🇨🇭', SEK: '🇸🇪', DKK: '🇩🇰', NOK: '🇳🇴',
    ILS: '🇮🇱', RUB: '🇷🇺', SAR: '🇸🇦', AED: '🇦🇪', BRL: '🇧🇷',
    ZAR: '🇿🇦'
  },

  // 货币名称映射
  currencyNames: {
    CNY: '人民币', USD: '美元', EUR: '欧元', GBP: '英镑', JPY: '日元',
    HKD: '港币', KRW: '韩元', AUD: '澳元', CAD: '加元', SGD: '新加坡元',
    THB: '泰铢', MYR: '马来西亚林吉特', IDR: '印尼盾', PHP: '菲律宾比索',
    INR: '印度卢比', NZD: '新西兰元', CHF: '瑞士法郎', SEK: '瑞典克朗',
    DKK: '丹麦克朗', NOK: '挪威克朗', ILS: '以色列谢克尔', RUB: '俄罗斯卢布',
    SAR: '沙特里亚尔', AED: '阿联酋迪拉姆', BRL: '巴西雷亚尔', ZAR: '南非兰特'
  },

  // 常用货币优先显示顺序
  preferredCurrencies: ['CNY', 'USD', 'EUR', 'JPY', 'HKD'],

  // 获取货币国旗
  getFlag(code) {
    return this.flagEmojis[code] || '🌐'
  },

  // 获取货币名称
  getName(code) {
    return this.currencyNames[code] || code
  },

  // 生成货币标签
  getLabel(code) {
    return `${this.getFlag(code)} ${this.getName(code)} (${code})`
  },

  // 常用货币对
  popularPairs: [
    { from: 'CNY', to: 'USD', amount: 100 },
    { from: 'CNY', to: 'EUR', amount: 100 },
    { from: 'CNY', to: 'JPY', amount: 100 }
  ]
} 