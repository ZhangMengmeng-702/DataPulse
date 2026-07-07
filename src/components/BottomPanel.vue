<template>
  <div class="grid grid-cols-3 gap-4 w-full h-full">
    <!-- 模块1：细分业务数据 -->
    <section class="dp-panel flex flex-col min-h-0">
      <div class="dp-title">细分业务数据</div>
      <div class="flex-1 min-h-0 px-4 py-2 grid grid-cols-2 gap-3 content-center">
        <div v-for="b in bizData" :key="b.name" class="biz-cell">
          <div class="text-dp-sub text-[13px]">{{ b.name }}</div>
          <div class="flex items-baseline gap-1">
            <span class="text-brand font-bold text-[24px] dp-pulse-num">{{ b.value }}</span>
            <span class="text-dp-sub text-[12px]">{{ b.unit }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 模块2：数据预警统计 -->
    <section class="dp-panel flex flex-col min-h-0">
      <div class="dp-title">数据预警统计</div>
      <div class="flex-1 min-h-0 px-4 flex items-center justify-around">
        <div v-for="a in alarmStat" :key="a.name" class="alarm-cell">
          <div class="num" :style="{ color: a.color }">{{ a.value }}</div>
          <div class="text-dp-sub text-[13px] mt-1">{{ a.name }}</div>
        </div>
      </div>
    </section>

    <!-- 模块3：接口调用态势 -->
    <section class="dp-panel flex flex-col min-h-0">
      <div class="dp-title">接口调用态势（近7日）</div>
      <div class="flex-1 min-h-0 px-2 pb-2">
        <BaseChart :option="apiOption" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '../stores/dashboard'
import BaseChart from './BaseChart.vue'

const store = useDashboardStore()
const { bizData, alarmStat, apiStat } = storeToRefs(store)

const apiOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  legend: {
    top: 0,
    textStyle: { color: '#B0C4DE', fontSize: 11 },
    itemWidth: 10,
    itemHeight: 10
  },
  grid: { left: 8, right: 12, top: 28, bottom: 4, containLabel: true },
  xAxis: {
    type: 'category',
    data: apiStat.value.map((d) => d.day),
    axisLine: { lineStyle: { color: 'rgba(176,196,222,0.3)' } },
    axisLabel: { color: '#B0C4DE', fontSize: 10 }
  },
  yAxis: {
    type: 'value',
    splitLine: { lineStyle: { color: 'rgba(176,196,222,0.08)' } },
    axisLabel: { color: '#B0C4DE', fontSize: 10 }
  },
  series: [
    {
      name: '成功',
      type: 'bar',
      data: apiStat.value.map((d) => d.success),
      barWidth: 10,
      itemStyle: {
        borderRadius: [3, 3, 0, 0],
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
          { offset: 0, color: '#00E4C8' }, { offset: 1, color: '#00D8FF' }
        ] }
      }
    },
    {
      name: '失败',
      type: 'bar',
      data: apiStat.value.map((d) => d.fail),
      barWidth: 10,
      itemStyle: { borderRadius: [3, 3, 0, 0], color: '#FF5D73' }
    }
  ]
}))
</script>

<style scoped>
.biz-cell {
  border-left: 2px solid var(--dp-brand);
  padding-left: 10px;
  background: rgba(0, 216, 255, 0.04);
  border-radius: 0 4px 4px 0;
}
.alarm-cell {
  text-align: center;
}
.alarm-cell .num {
  font-size: 30px;
  font-weight: bold;
  text-shadow: 0 0 12px currentColor;
}
</style>
