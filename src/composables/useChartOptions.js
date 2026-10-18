import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRetailStore } from '../stores/retail'
import { categories } from '../data/sales'
import { sum, money } from '../utils/format'
export function useChartOptions() {
  const { period, filtered, suppliers, supplier } = storeToRefs(useRetailStore())
  const axis = {
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#92a399', fontSize: 10 },
    splitLine: { lineStyle: { color: '#edf2ef', type: 'dashed' } },
  }

  const months = computed(() =>
    period.value === 'q3' ? ['Jul', 'Aug', 'Sep'] : ['Apr', 'May', 'Jun'],
  )
  const selectedSupplier = computed(
    () => suppliers.value.find((row) => row.name === supplier.value) || suppliers.value[0],
  )
  const salesOption = computed(() => ({
    color: ['#2d7b61', '#b9cfc1'],
    tooltip: { trigger: 'axis', valueFormatter: money },
    grid: { left: 65, right: 30, top: 25, bottom: 40 },
    xAxis: { ...axis, type: 'category', data: months.value, boundaryGap: false },
    yAxis: {
      ...axis,
      type: 'value',
      axisLabel: { color: '#92a399', fontSize: 10, formatter: (v) => '$' + v / 1000 + 'k' },
    },
    series: [
      {
        name: 'Selected period',
        type: 'line',
        data: [0, 1, 2].map((m) =>
          sum(
            filtered.value.filter((r) => r.month === m),
            'revenue',
          ),
        ),
        smooth: true,
        symbolSize: 7,
        lineStyle: { width: 3 },
        areaStyle: { color: '#e0f0e7', opacity: 0.65 },
      },
      {
        name: 'Previous period',
        type: 'line',
        data: [0, 1, 2].map((m) =>
          sum(
            filtered.value.filter((r) => r.month === m),
            'previousRevenue',
          ),
        ),
        smooth: true,
        symbolSize: 5,
        lineStyle: { width: 2, type: 'dashed' },
      },
    ],
  }))
  const mixOption = computed(() => ({
    color: ['#286f58', '#7fb399', '#c9ddcd'],
    tooltip: { trigger: 'item', valueFormatter: money },
    legend: {
      bottom: 16,
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { fontSize: 9, color: '#718d7b' },
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '67%'],
        center: ['50%', '43%'],
        label: { show: false },
        itemStyle: { borderWidth: 5, borderColor: '#fff' },
        data: categories
          .map((name) => ({
            name,
            value: sum(
              filtered.value.filter((r) => r.category === name),
              'revenue',
            ),
          }))
          .filter((r) => r.value > 0),
      },
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '34%',
        style: { text: 'REVENUE', fontSize: 9, fill: '#8ea294' },
      },
      {
        type: 'text',
        left: 'center',
        top: '42%',
        style: {
          text: money(sum(filtered.value, 'revenue')),
          fontSize: 21,
          fontWeight: 600,
          fill: '#2a493c',
        },
      },
    ],
  }))
  const deliveryOption = computed(() => ({
    tooltip: { trigger: 'axis', valueFormatter: (v) => v + '%' },
    grid: { left: 120, right: 45, top: 20, bottom: 35 },
    xAxis: {
      ...axis,
      type: 'value',
      max: 100,
      axisLabel: { color: '#92a399', fontSize: 10, formatter: (v) => v + '%' },
    },
    yAxis: {
      ...axis,
      type: 'category',
      data: suppliers.value.map((s) => selectedSupplier.value.name),
      splitLine: { show: false },
    },
    series: [
      {
        type: 'bar',
        barWidth: 19,
        data: suppliers.value.map((s) => ({
          value: selectedSupplier.value.delivery,
          itemStyle: {
            color: selectedSupplier.value.delivery >= 95 ? '#6ca78b' : '#cfaa68',
            borderRadius: [0, 4, 4, 0],
          },
        })),
        label: { show: true, position: 'right', formatter: '{c}%', fontSize: 10, color: '#647d6c' },
        markLine: {
          symbol: 'none',
          label: { show: false },
          lineStyle: { color: '#b2c8b6', type: 'dashed' },
          data: [{ xAxis: 95 }],
        },
      },
    ],
  }))
  const radarOption = computed(() => ({
    tooltip: {},
    radar: {
      radius: '62%',
      center: ['50%', '50%'],
      indicator: ['Delivery', 'Fill rate', 'Quality', 'Responsiveness', 'Consistency'].map(
        (name) => ({ name, max: 100 }),
      ),
      axisName: { color: '#7c9584', fontSize: 10 },
      splitArea: { areaStyle: { color: ['#fff', '#f8fbf9'] } },
      splitLine: { lineStyle: { color: '#deebe1' } },
      axisLine: { lineStyle: { color: '#deebe1' } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            name: selectedSupplier.value.name,
            value: [
              selectedSupplier.value.delivery,
              selectedSupplier.value.fill,
              selectedSupplier.value.quality,
              91,
              94,
            ],
          },
        ],
        symbolSize: 4,
        lineStyle: { color: '#347e5d', width: 2 },
        itemStyle: { color: '#347e5d' },
        areaStyle: { color: '#9bc7a9', opacity: 0.45 },
      },
    ],
  }))
  return { salesOption, mixOption, deliveryOption, radarOption }
}
