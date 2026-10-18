<script setup>
import { useWorkspace } from '../composables/useWorkspace'
import EChart from '../components/EChart.vue'
import { useChartOptions } from '../composables/useChartOptions'
const { salesOption, mixOption, deliveryOption, radarOption } = useChartOptions()
const { supplier, suppliers, supplierKpis } = useWorkspace()
</script>
<template>
  <div class="kpis">
    <article class="kpi" v-for="k in supplierKpis">
      <div>{{ k.label }}</div>
      <h2>{{ k.value }}</h2>
      <p>{{ k.note }}</p>
      <div class="mini-track"><i></i></div>
    </article>
  </div>
  <div class="charts supplier-charts">
    <section class="panel">
      <div class="panel-heading">
        <div>
          <h3>Delivery reliability</h3>
          <p>On-time delivery rate by demo supplier</p>
        </div>
        <span class="soft-tag">Target ≥ 95%</span>
      </div>
      <EChart :option="deliveryOption" label="Supplier delivery rates" />
    </section>
    <section class="panel">
      <div class="panel-heading">
        <div>
          <h3>Supplier scorecard</h3>
          <p>Illustrative evaluation dimensions</p>
        </div>
        <label class="sr-only" for="supplier">Supplier</label
        ><select id="supplier" v-model="supplier">
          <option v-for="s in suppliers">{{ s.name }}</option>
        </select>
      </div>
      <EChart :option="radarOption" label="Supplier scorecard" />
    </section>
  </div>
  <section class="panel">
    <div class="panel-heading">
      <div>
        <h3>Supplier performance details</h3>
        <p>Fictional suppliers · all values are simulated</p>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>SUPPLIER</th>
          <th>ON-TIME DELIVERY</th>
          <th>FILL RATE</th>
          <th>QUALITY SCORE</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in suppliers">
          <td>
            <b>{{ s.name }}</b>
          </td>
          <td>{{ s.delivery }}%</td>
          <td>{{ s.fill }}%</td>
          <td>{{ s.quality }} / 100</td>
          <td>
            <span class="pill" :class="{ warning: s.delivery < 95 }">{{
              s.delivery >= 95 ? 'On track' : 'Needs attention'
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
