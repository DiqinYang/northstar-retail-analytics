<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { init, use } from 'echarts/core'
import { LineChart, PieChart, BarChart, RadarChart } from 'echarts/charts'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GraphicComponent,
  MarkLineComponent,
  RadarComponent,
} from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
use([
  LineChart,
  PieChart,
  BarChart,
  RadarChart,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GraphicComponent,
  MarkLineComponent,
  RadarComponent,
  SVGRenderer,
])
const props = defineProps({
  option: { type: Object, required: true },
  label: { type: String, required: true },
})
const host = ref(null)
let chart, observer
const update = () =>
  chart?.setOption({ ...props.option, animation: false, textStyle: { fontFamily: 'Arial' } }, true)
onMounted(() => {
  chart = init(host.value, null, { renderer: 'svg' })
  update()
  observer = new ResizeObserver(() => chart?.resize())
  observer.observe(host.value)
})
watch(() => props.option, update, { deep: true })
onUnmounted(() => {
  observer?.disconnect()
  chart?.dispose()
  chart = undefined
})
</script>
<template><div ref="host" class="chart" role="img" :aria-label="label"></div></template>
