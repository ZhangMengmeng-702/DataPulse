<template>
  <div class="flex flex-col gap-3 h-full">
    <!-- 模块1：数据来源分布（饼图） -->
    <section class="dp-panel flex-1 flex flex-col min-h-0">
      <div class="dp-title">数据来源分布</div>
      <div class="flex-1 min-h-0 px-2 pb-2">
        <BaseChart :option="pieOption" />
      </div>
    </section>

    <!-- 模块2：时段数据流量排行（横向柱状图 TOP10） -->
    <section class="dp-panel flex-1 flex flex-col min-h-0">
      <div class="dp-title">时段数据流量排行 TOP10</div>
      <div class="flex-1 min-h-0 px-2 pb-2">
        <BaseChart :option="barOption" />
      </div>
    </section>

    <!-- 模块3：最新数据日志滚动列表 -->
    <section class="dp-panel flex-1 flex flex-col min-h-0">
      <div class="dp-title">最新数据日志</div>
      <div class="flex-1 min-h-0 overflow-hidden px-3 pb-2 relative">
        <div class="log-track" :style="{ animationDuration: duration }">
          <div v-for="(log, i) in loopLogs" :key="i" class="log-row" :class="log.level">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-tag">{{ tagText(log.level) }}</span>
            <span class="log-msg">{{ log.msg }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '../../stores/dashboard'
import BaseChart from '../BaseChart.vue'

const store = useDashboardStore()
const { dataSource, trafficRank, logs } = storeToRefs(store)

const pieOption = computed(() => ({
  tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
  legend: {
    bottom: 0,
    textStyle: { color: '#B0C4DE', fontSize: 11 },
    itemWidth: 10,
    itemHeight: 10
  },
  color: ['#00D8FF', '#00E4C8', '#7B61FF', '#3A7BD5', '#FF5D73'],
  series: [
    {
      type: 'pie',
      radius: ['38%', '62%'],
      center: ['50%', '44%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: 'rgba(8,16,33,0.6)',
        borderWidth: 2,
        opacity: 0.85
      },
      label: { color: '#B0C4DE', fontSize: 11, formatter: '{d}%' },
      labelLine: { length: 6, length2: 6 },
      data: dataSource.value
    }
  ]
}))

const barOption = computed(() => ({
  grid: { left: 8, right: 24, top: 6, bottom: 6, containLabel: true },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'value', show: false },
  yAxis: {
    type: 'category',
    inverse: true,
    data: trafficRank.value.map((d) => d.hour),
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#B0C4DE', fontSize: 11 }
  },
  series: [
    {
      type: 'bar',
      data: trafficRank.value.map((d) => d.value),
      barWidth: 9,
      itemStyle: {
        borderRadius: 4,
        color: {
          type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [
            { offset: 0, color: '#00D8FF' },
            { offset: 1, color: '#00E4C8' }
          ]
        }
      },
      label: { show: true, position: 'right', color: '#B0C4DE', fontSize: 11 }
    }
  ]
}))

// 日志无缝滚动：复制一份实现循环
const loopLogs = computed(() => [...logs.value, ...logs.value])
const duration = computed(() => `${Math.max(8, logs.value.length * 1.6)}s`)

function tagText(level) {
  return level === 'error' ? '错误' : level === 'warn' ? '警告' : '信息'
}
</script>

<style scoped>
.log-track {
  animation: dp-scroll-up linear infinite;
}
.log-row {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  font-size: 12px;
  color: #b0c4de;
  border-bottom: 1px dashed rgba(0, 216, 255, 0.08);
}
.log-time {
  color: #00d8ff;
  font-family: monospace;
}
.log-tag {
  padding: 0 6px;
  border-radius: 8px;
  font-size: 11px;
}
.log-row.info .log-tag {
  color: #00e4c8;
  background: rgba(0, 228, 200, 0.12);
}
.log-row.warn .log-tag {
  color: #ffb547;
  background: rgba(255, 181, 71, 0.12);
}
.log-row.error {
  color: #ff5d73;
}
.log-row.error .log-tag {
  color: #ff5d73;
  background: rgba(255, 93, 115, 0.14);
}
.log-msg {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
