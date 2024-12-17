const BASE_URL = 'YOUR_EXCHANGE_RATE_API'

export const fetchRates = async () => {
  try {
    const response = await wx.request({
      url: BASE_URL,
      method: 'GET'
    })
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch exchange rates')
  }
} 