<template>
  <div class="flex flex-col gap-3 h-full">
    <!-- 模块1：24小时数据波动趋势（折线面积图） -->
    <section class="dp-panel flex-1 flex flex-col min-h-0">
      <div class="dp-title">24小时数据波动趋势</div>
      <div class="flex-1 min-h-0 px-2 pb-2">
        <BaseChart :option="lineOption" />
      </div>
    </section>

    <!-- 模块2：数据类型占比统计（环形图） -->
    <section class="dp-panel flex-1 flex flex-col min-h-0">
      <div class="dp-title">数据类型占比统计</div>
      <div class="flex-1 min-h-0 px-2 pb-2">
        <BaseChart :option="ringOption" />
      </div>
    </section>

    <!-- 模块3：系统运行状态监控（进度条 + 状态） -->
    <section class="dp-panel flex-1 flex flex-col min-h-0">
      <div class="dp-title">系统运行状态监控</div>
      <div class="flex-1 min-h-0 px-4 py-2 flex flex-col justify-around">
        <div v-for="s in systemStatus" :key="s.name" class="status-row">
          <div class="flex justify-between text-[13px] mb-1">
            <span class="text-dp-sub">{{ s.name }}</span>
            <span :class="s.status === 'normal' ? 'text-cyan' : 'text-warn'">
              {{ s.status === 'normal' ? '正常' : '异常' }} · {{ s.percent }}%
            </span>
          </div>
          <div class="bar-bg">
            <div
              class="bar-fill"
              :class="s.status === 'normal' ? 'ok' : 'err'"
              :style="{ width: s.percent + '%' }"
            ></div>
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
const { trend24h, dataType, systemStatus } = storeToRefs(store)

const lineOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  grid: { left: 8, right: 12, top: 10, bottom: 6, containLabel: true },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: trend24h.value.map((_, i) => `${i}:00`),
    axisLine: { lineStyle: { color: 'rgba(176,196,222,0.3)' } },
    axisLabel: { color: '#B0C4DE', fontSize: 10, interval: 3 }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(176,196,222,0.08)' } },
    axisLabel: { color: '#B0C4DE', fontSize: 10 }
  },
  series: [
    {
      type: 'line',
      smooth: true,
      symbol: 'none',
      data: trend24h.value,
      lineStyle: { width: 2, color: '#00D8FF' },
      areaStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(0,216,255,0.45)' },
            { offset: 1, color: 'rgba(0,216,255,0.02)' }
          ]
        }
      }
    }
  ]
}))

const ringOption = computed(() => ({
  tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
  legend: {
    bottom: 0,
    textStyle: { color: '#B0C4DE', fontSize: 11 },
    itemWidth: 10,
    itemHeight: 10
  },
  color: ['#00D8FF', '#00E4C8', '#7B61FF'],
  series: [
    {
      type: 'pie',
      radius: ['45%', '68%'],
      center: ['50%', '44%'],
      avoidLabelOverlap: true,
      itemStyle: { borderColor: 'rgba(8,16,33,0.6)', borderWidth: 2 },
      label: { color: '#B0C4DE', fontSize: 11, formatter: '{d}%' },
      data: dataType.value
    }
  ]
}))
</script>

<style scoped>
.status-row {
  width: 100%;
}
.bar-bg {
  height: 8px;
  border-radius: 4px;
  background: rgba(176, 196, 222, 0.12);
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}
.bar-fill.ok {
  background: linear-gradient(90deg, #00d8ff, #00e4c8);
  box-shadow: 0 0 8px rgba(0, 228, 200, 0.6);
}
.bar-fill.err {
  background: linear-gradient(90deg, #ff5d73, #ff8a5d);
  box-shadow: 0 0 8px rgba(255, 93, 115, 0.6);
}
</style>
