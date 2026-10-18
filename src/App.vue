<script setup>
import { useWorkspace } from './composables/useWorkspace'
import { RouterView } from 'vue-router'
import ReportFilters from './components/ReportFilters.vue'
const { tab, tabs, notice, exportCSV } = useWorkspace()
</script>
<template>
  <aside>
    <div class="brand"><b class="brand-symbol">N</b> NORTHSTAR<span>ANALYTICS WORKSPACE</span></div>
    <div class="nav-label">WORKSPACE</div>
    <nav>
      <button v-for="(item, i) in tabs" :class="{ active: tab === i }" @click="tab = i">
        <span>{{ ['◫', '◈', '▤'][i] }}</span
        >{{ item }}
      </button>
    </nav>
    <div class="aside-bottom">
      <span class="status-dot"></span> Local demo · No live connections
      <p>Built with Vue 3 + ECharts</p>
      <div class="person">
        <b>DA</b>
        <div>Demo analyst<small>Portfolio workspace</small></div>
      </div>
    </div>
  </aside>
  <main>
    <header>
      <div>Workspace <span>/</span> {{ tabs[tab] }}</div>
      <div class="demo-tag">SYNTHETIC DATA</div>
    </header>
    <div class="content">
      <div class="heading">
        <div>
          <div class="eyebrow">RETAIL INTELLIGENCE / PORTFOLIO EDITION</div>
          <h1>{{ tabs[tab] }}</h1>
          <p>
            {{
              [
                'A clear view of sales, categories and commercial performance.',
                'Understand delivery performance across your supplier network.',
                'Explore the figures behind the dashboard.',
              ][tab]
            }}
          </p>
        </div>
        <button class="export" @click="exportCSV">↓ &nbsp; Export CSV</button>
      </div>
      <ReportFilters />
      <RouterView />

      <footer>
        <span class="status-dot"></span> Rebuilt portfolio demo. All names, records and metrics are
        fictional.<span>Vue 3 · ECharts · Client-side interactions</span>
      </footer>
      <div v-if="notice" class="toast" role="status">{{ notice }}</div>
    </div>
  </main>
</template>
