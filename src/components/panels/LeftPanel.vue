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
  color: ['#36C9E8', '#00D9C0', '#8B7BFF', '#5B9BF0', '#FF8FA0'],
  series: [
    {
      type: 'pie',
      radius: ['38%', '62%'],
      center: ['50%', '44%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderColor: 'rgba(6,14,31,0.55)',
        borderWidth: 2,
        opacity: 0.9,
        shadowColor: 'rgba(0,216,255,0.18)',
        shadowBlur: 8
      },
      label: { color: '#9DB2C9', fontSize: 11, formatter: '{d}%' },
      labelLine: { length: 6, length2: 6, lineStyle: { color: 'rgba(157,178,201,0.4)' } },
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
            { offset: 0, color: '#1FA8C8' },
            { offset: 1, color: '#00E4C8' }
          ]
        },
        shadowColor: 'rgba(0,216,255,0.35)',
        shadowBlur: 8
      },
      label: { show: true, position: 'right', color: '#9DB2C9', fontSize: 11 }
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
  color: #9db2c9;
  border-bottom: 1px solid rgba(0, 216, 255, 0.06);
  border-radius: 4px;
  padding: 0 4px;
  transition: background 0.3s ease, color 0.3s ease;
}
.log-row:hover {
  background: rgba(0, 216, 255, 0.08);
  color: #ffffff;
}
.log-time {
  color: #5fd8f0;
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
