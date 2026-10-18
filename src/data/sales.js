export const names = [
  ['Linen storage basket', 'Ceramic serving set', 'Cotton throw', 'Bamboo organizer'],
  ['Daily hand wash', 'Botanical body lotion', 'Gentle face cleanser', 'Mineral sunscreen'],
  ['Roasted coffee', 'Oat breakfast mix', 'Sparkling citrus water', 'Herbal tea selection'],
]
export const categories = ['Home & Living', 'Personal Care', 'Food & Beverage']
export const records = []
;['q2', 'q3'].forEach((p, pi) =>
  ['North', 'Central', 'South'].forEach((r, ri) =>
    categories.forEach((c, ci) =>
      names[ci].forEach((product, i) =>
        [0, 1, 2].forEach((m) => {
          const orders = 110 + ri * 37 + ci * 19 + i * 13 + m * 21 + pi * 18
          const previous = 92 + ri * 33 + ci * 17 + i * 12 + m * 17 + pi * 15
          records.push({
            sku: `DEMO-${ci + 1}${i + 1}0`,
            product,
            category: c,
            region: r,
            period: p,
            month: m,
            orders,
            previousOrders: previous,
            revenue: orders * (24 + ci * 9 + i * 5),
            previousRevenue: previous * (24 + ci * 9 + i * 5),
          })
        }),
      ),
    ),
  ),
)
