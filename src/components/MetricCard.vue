<template>
  <div class="dp-panel metric-card flex flex-col justify-between p-3 h-full">
    <!-- 指标名称 -->
    <div class="flex items-center justify-between">
      <span class="text-dp-sub text-[14px]">{{ metric.name }}</span>
      <span class="trend-badge" :class="trendClass">
        <span v-if="metric.trend === 'up'">▲</span>
        <span v-else-if="metric.trend === 'down'">▼</span>
        <span v-else>—</span>
      </span>
    </div>

    <!-- 超大脉动数字 -->
    <div class="flex items-baseline gap-1 mt-1">
      <span :key="metric.value" class="dp-pulse-num text-brand font-bold leading-none num">
        {{ metric.value }}
      </span>
      <span class="text-dp-sub text-[14px]">{{ metric.unit }}</span>
    </div>

    <!-- 底部小幅趋势曲线 -->
    <div class="spark h-[34px] mt-1">
      <BaseChart :option="sparkOption" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseChart from './BaseChart.vue'

const props = defineProps({
  metric: { type: Object, required: true }
})

const trendClass = computed(() => {
  if (props.metric.trend === 'up') return 'up'
  if (props.metric.trend === 'down') return 'down'
  return 'flat'
})

const color = computed(() => {
  if (props.metric.trend === 'up') return '#00E4C8'
  if (props.metric.trend === 'down') return '#FF5D73'
  return '#00D8FF'
})

const sparkOption = computed(() => ({
  grid: { left: 0, right: 0, top: 4, bottom: 0 },
  xAxis: { type: 'category', show: false, data: props.metric.trendData.map((_, i) => i) },
  yAxis: { type: 'value', show: false, scale: true },
  series: [
    {
      type: 'line',
      data: props.metric.trendData,
      smooth: true,
      symbol: 'none',
      lineStyle: { width: 2, color: color.value },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: color.value + '55' },
            { offset: 1, color: color.value + '00' }
          ]
        }
      }
    }
  ]
}))
</script>

<style scoped>
.metric-card {
  min-width: 0;
}
.num {
  font-size: 40px;
}
.trend-badge {
  font-size: 12px;
  padding: 1px 6px;
  border-radius: 10px;
}
.trend-badge.up {
  color: #00e4c8;
  background: rgba(0, 228, 200, 0.12);
}
.trend-badge.down {
  color: #ff5d73;
  background: rgba(255, 93, 115, 0.12);
}
.trend-badge.flat {
  color: #00d8ff;
  background: rgba(0, 216, 255, 0.12);
}
</style>
