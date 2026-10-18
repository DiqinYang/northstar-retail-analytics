<script setup>
import { useWorkspace } from '../composables/useWorkspace'
import EChart from '../components/EChart.vue'
import { useChartOptions } from '../composables/useChartOptions'
const { salesOption, mixOption, deliveryOption, radarOption } = useChartOptions()
const { period, kpis, regions, money } = useWorkspace()
</script>
<template>
  <div class="kpis">
    <article class="kpi" v-for="(k, i) in kpis">
      <div>
        {{ k.label }}<span>{{ ['↗', '▣', '◈', '◎'][i] }}</span>
      </div>
      <h2>{{ k.value }}</h2>
      <p>
        <b>{{ k.change }}</b
        ><span v-if="i < 3"> vs previous period</span>
      </p>
      <div class="mini-track"><i :style="{ width: 65 + i * 7 + '%' }"></i></div>
    </article>
  </div>
  <div class="charts">
    <section class="panel sales">
      <div class="panel-heading">
        <div>
          <h3>Sales performance</h3>
          <p>Monthly revenue · USD</p>
        </div>
        <span class="key"><i></i>Selected period <i class="pale"></i>Previous period</span>
      </div>
      <EChart :option="salesOption" label="Monthly revenue" />
    </section>
    <section class="panel mix">
      <div class="panel-heading">
        <div>
          <h3>Category mix</h3>
          <p>Revenue contribution</p>
        </div>
        <span>•••</span>
      </div>
      <EChart :option="mixOption" label="Category revenue" />
    </section>
  </div>
  <section class="panel">
    <div class="panel-heading">
      <div>
        <h3>Regional performance</h3>
        <p>Compare revenue, orders and target attainment</p>
      </div>
      <span class="soft-tag">{{ period === 'q3' ? 'Q3' : 'Q2' }} 2026</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>REGION</th>
          <th>REVENUE</th>
          <th>ORDERS</th>
          <th>AVG. ORDER</th>
          <th>TARGET ATTAINMENT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in regions">
          <td>
            <b>{{ r.name }}</b>
          </td>
          <td>{{ money(r.revenue) }}</td>
          <td>{{ r.orders.toLocaleString() }}</td>
          <td>{{ money(r.revenue / r.orders) }}</td>
          <td>
            <div class="progress">
              <i :style="{ width: Math.min(100, r.attainment) + '%' }"></i>
            </div>
            <span>{{ r.attainment }}%</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
