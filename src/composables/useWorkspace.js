import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useRetailStore } from '../stores/retail'
import { ref, onScopeDispose } from 'vue'
import { money } from '../utils/format'
import { createCsv } from '../utils/csv'
export function useWorkspace() {
  const store = useRetailStore(),
    route = useRoute(),
    router = useRouter()
  const tabs = ['Retail overview', 'Supplier performance', 'Data explorer']
  const paths = ['/', '/suppliers', '/records']
  const tab = computed({
    get: () => Math.max(0, paths.indexOf(route.path)),
    set: (index) => router.push(paths[index]),
  })
  const notice = ref('')
  let timer
  onScopeDispose(() => clearTimeout(timer))
  function exportCSV() {
    const rows = tab.value === 1 ? store.suppliers : store.searched
    const keys =
      tab.value === 1
        ? ['name', 'delivery', 'fill', 'quality']
        : ['sku', 'product', 'category', 'region', 'period', 'month', 'orders', 'revenue']
    const csv = createCsv(rows, keys)
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'synthetic-' + (tab.value === 1 ? 'suppliers' : 'sales') + '.csv'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 500)
    notice.value = 'Exported ' + rows.length + ' synthetic records'
    clearTimeout(timer)
    timer = setTimeout(() => (notice.value = ''), 3000)
  }
  return {
    ...storeToRefs(store),
    reset: store.reset,
    toggleSort: store.toggleSort,
    tab,
    tabs,
    money,
    notice,
    exportCSV,
  }
}
