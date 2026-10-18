<script setup>
import { useWorkspace } from '../composables/useWorkspace'

const { search, page, pages, pageRows, searched, toggleSort, money } = useWorkspace()
</script>
<template>
  <section class="panel records">
    <div class="panel-heading">
      <div>
        <h3>Sales records</h3>
        <p>Search, sort and export the current selection</p>
      </div>
      <label class="sr-only" for="search">Search records</label
      ><input id="search" placeholder="Search product or SKU…" v-model="search" />
    </div>
    <div class="table-scroll">
      <table>
        <thead>
          <tr>
            <th><button @click="toggleSort('sku')">SKU ↕</button></th>
            <th><button @click="toggleSort('product')">PRODUCT ↕</button></th>
            <th>CATEGORY</th>
            <th>REGION / MONTH</th>
            <th><button @click="toggleSort('revenue')">REVENUE ↕</button></th>
            <th>ORDERS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in pageRows">
            <td>{{ r.sku }}</td>
            <td>
              <b>{{ r.product }}</b>
            </td>
            <td>{{ r.category }}</td>
            <td>
              {{ r.region }} ·
              {{ (r.period === 'q3' ? ['Jul', 'Aug', 'Sep'] : ['Apr', 'May', 'Jun'])[r.month] }}
            </td>
            <td>{{ money(r.revenue) }}</td>
            <td>{{ r.orders }}</td>
          </tr>
          <tr v-if="!searched.length">
            <td colspan="6" class="empty">
              No records match your filters. Try another search or reset filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <span>{{ searched.length }} matching records · Page {{ page }} of {{ pages }}</span>
      <div>
        <button :disabled="page === 1" @click="page--">← Previous</button
        ><button :disabled="page === pages" @click="page++">Next →</button>
      </div>
    </div>
  </section>
</template>
