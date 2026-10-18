export const sum = (arr, k) => arr.reduce((s, r) => s + r[k], 0)
export const money = (n) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
