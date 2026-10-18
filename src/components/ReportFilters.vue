<script setup>
import { useWorkspace } from '../composables/useWorkspace'

const { period, region, category, filtered, reset, tab } = useWorkspace()
</script>
<template>
  <section class="filters">
    <label
      >Reporting period<select v-model="period">
        <option value="q3">Jul – Sep 2026</option>
        <option value="q2">Apr – Jun 2026</option>
      </select></label
    ><label v-if="tab !== 1"
      >Region<select v-model="region">
        <option>All regions</option>
        <option>North</option>
        <option>Central</option>
        <option>South</option>
      </select></label
    ><label v-if="tab !== 1"
      >Category<select v-model="category">
        <option>All categories</option>
        <option>Home & Living</option>
        <option>Personal Care</option>
        <option>Food & Beverage</option>
      </select></label
    ><button class="reset" @click="reset">↻ &nbsp; Reset filters</button
    ><span class="record-count">{{ tab === 1 ? 4 : filtered.length }} demo records</span>
  </section>
</template>
