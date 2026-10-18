import { beforeEach, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import { useRetailStore } from './retail'
import { createCsv } from '../utils/csv'

beforeEach(() => setActivePinia(createPinia()))

it('applies combined filters, aggregates revenue and resets pagination after a new search', async () => {
  const store = useRetailStore()
  expect(store.filtered).toHaveLength(108)
  store.region = 'North'
  store.category = 'Home & Living'
  expect(store.filtered).toHaveLength(12)
  expect(store.regions[0].revenue).toBe(store.filtered.reduce((n, r) => n + r.revenue, 0))
  store.page = 2
  store.search = 'not-a-product'
  await nextTick()
  expect(store.page).toBe(1)
  expect(store.pageRows).toHaveLength(0)
  expect(store.pages).toBe(1)
  store.reset()
  expect(store.filtered).toHaveLength(108)
})

it('exports complete row selections and protects CSV cells containing quotes or formulas', () => {
  const store = useRetailStore()
  const csv = createCsv(store.searched, ['sku', 'revenue'])
  expect(csv.split('\r\n')).toHaveLength(109)
  expect(createCsv([{ name: 'a,"b"' }, { name: '=SUM(A1)' }], ['name'])).toBe(
    'name\r\n"a,""b"""\r\n"\'=SUM(A1)"',
  )
})

it('preserves a region target when the table is filtered to that region', () => {
  const store = useRetailStore()
  const southTarget = store.regions.find((row) => row.name === 'South').attainment
  store.region = 'South'
  expect(store.regions[0].attainment).toBe(southTarget)
  store.period = 'q2'
  expect(store.regions[0].attainment).toBe(southTarget - 2)
})
