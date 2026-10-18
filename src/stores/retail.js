import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { records } from '../data/sales'
import { sum, money } from '../utils/format'
export const useRetailStore = defineStore('retail', () => {
  const period = ref('q3'),
    region = ref('All regions'),
    category = ref('All categories'),
    search = ref(''),
    page = ref(1),
    sort = ref('revenue'),
    direction = ref(-1),
    supplier = ref('Cedar Supply')

  const filtered = computed(() =>
    records.filter(
      (r) =>
        r.period === period.value &&
        (region.value === 'All regions' || region.value === r.region) &&
        (category.value === 'All categories' || category.value === r.category),
    ),
  )
  const kpis = computed(() => {
    const rows = filtered.value,
      revenue = sum(rows, 'revenue'),
      orders = sum(rows, 'orders'),
      previous = sum(rows, 'previousRevenue'),
      previousOrders = sum(rows, 'previousOrders')
    return [
      {
        label: 'Total revenue',
        value: money(revenue),
        change: `+${((revenue / previous - 1) * 100).toFixed(1)}%`,
      },
      {
        label: 'Total orders',
        value: orders.toLocaleString(),
        change: `+${((orders / previousOrders - 1) * 100).toFixed(1)}%`,
      },
      {
        label: 'Average order value',
        value: money(revenue / orders),
        change: `${((revenue / orders / (previous / previousOrders) - 1) * 100).toFixed(1)}%`,
      },
      {
        label: 'Active products',
        value: String(new Set(rows.map((r) => r.sku)).size),
        change: 'Illustrative assortment',
      },
    ]
  })
  const regions = computed(() =>
    ['North', 'Central', 'South']
      .filter((n) => region.value === 'All regions' || region.value === n)
      .map((n) => {
        const rows = filtered.value.filter((r) => r.region === n)
        return {
          name: n,
          revenue: sum(rows, 'revenue'),
          orders: sum(rows, 'orders'),
          attainment:
            [106, 98, 92][['North', 'Central', 'South'].indexOf(n)] +
            (period.value === 'q3' ? 2 : 0),
        }
      }),
  )
  const suppliers = computed(() =>
    ['Cedar Supply', 'Meadow Goods', 'Harbor Trading', 'Willow Partners'].map((name, i) => ({
      name,
      delivery: [98.2, 96.4, 92.8, 97.1][i] + (period.value === 'q2' ? -0.8 : 0),
      fill: [97.4, 95.8, 93.5, 96.2][i],
      quality: [96, 94, 89, 95][i],
    })),
  )
  const supplierKpis = computed(() => [
    { label: 'Demo suppliers', value: '4', note: 'Fictional supplier network' },
    {
      label: 'Avg. on-time delivery',
      value: (sum(suppliers.value, 'delivery') / 4).toFixed(1) + '%',
      note: 'Simulated delivery metrics',
    },
    {
      label: 'Avg. fill rate',
      value: (sum(suppliers.value, 'fill') / 4).toFixed(1) + '%',
      note: 'Simulated fulfillment metrics',
    },
    {
      label: 'Suppliers on track',
      value: suppliers.value.filter((s) => s.delivery >= 95).length + ' / 4',
      note: 'Delivery target: at least 95%',
    },
  ])
  const searched = computed(() =>
    filtered.value
      .filter((r) => (r.product + ' ' + r.sku).toLowerCase().includes(search.value.toLowerCase()))
      .slice()
      .sort(
        (a, b) =>
          direction.value *
          (typeof a[sort.value] === 'number'
            ? a[sort.value] - b[sort.value]
            : a[sort.value].localeCompare(b[sort.value])),
      ),
  )
  const pages = computed(() => Math.max(1, Math.ceil(searched.value.length / 9))),
    pageRows = computed(() => searched.value.slice((page.value - 1) * 9, page.value * 9))
  function reset() {
    period.value = 'q3'
    region.value = 'All regions'
    category.value = 'All categories'
    search.value = ''
    page.value = 1
  }
  function toggleSort(key) {
    direction.value = sort.value === key ? -direction.value : 1
    sort.value = key
  }

  watch([period, region, category, search], () => (page.value = 1))
  return {
    period,
    region,
    category,
    search,
    page,
    pages,
    pageRows,
    supplier,
    filtered,
    kpis,
    regions,
    suppliers,
    supplierKpis,
    searched,
    reset,
    toggleSort,
  }
})
