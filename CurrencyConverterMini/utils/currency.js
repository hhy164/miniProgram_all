export const formatCurrency = (value, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(value)
}

export const calculateRate = (amount, fromRate, toRate) => {
  return (amount * toRate / fromRate).toFixed(2)
} 