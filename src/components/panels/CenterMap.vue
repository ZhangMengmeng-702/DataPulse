<template>
  <section class="dp-panel center-map flex flex-col h-full relative overflow-hidden">
    <div class="dp-title">全局核心态势 · 数据脉动热力图</div>
    <div class="flex-1 min-h-0 relative">
      <BaseChart v-if="ready" :option="mapOption" />
      <div v-else class="absolute inset-0 flex items-center justify-center text-dp-sub text-[14px]">
        地图加载中…
      </div>
      <!-- 中心标题浮层 -->
      <div class="map-center-label">
        <div class="text-[13px] text-dp-sub">实时活跃节点</div>
        <div class="text-brand font-bold text-[26px] glow">{{ activeCount }}</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import { useDashboardStore } from '../../stores/dashboard'
import BaseChart from '../BaseChart.vue'

const store = useDashboardStore()
const { mapPoints } = storeToRefs(store)

const ready = ref(false)
const GEO_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'

const activeCount = computed(() => mapPoints.value.length)

onMounted(async () => {
  try {
    const res = await fetch(GEO_URL)
    const geoJson = await res.json()
    echarts.registerMap('china', geoJson)
    ready.value = true
  } catch (e) {
    ready.value = false
    console.warn('地图 GeoJSON 加载失败，请检查网络或替换为本地地图数据', e)
  }
})

const mapOption = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: (p) => {
      if (p.seriesType === 'effectScatter') {
        const v = p.value
        return `${p.name}<br/>活跃度：${v[2]}`
      }
      return p.name
    }
  },
  geo: {
    map: 'china',
    roam: false,
    zoom: 1.18,
    top: '6%',
    bottom: '4%',
    label: { show: false },
    itemStyle: {
      areaColor: 'rgba(0, 216, 255, 0.04)',
      borderColor: 'rgba(0, 216, 255, 0.35)',
      borderWidth: 1,
      shadowColor: 'rgba(0, 216, 255, 0.4)',
      shadowBlur: 12
    },
    emphasis: {
      itemStyle: { areaColor: 'rgba(0, 216, 255, 0.15)' },
      label: { show: false }
    }
  },
  series: [
    {
      name: '活跃点位',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: mapPoints.value,
      symbolSize: (val) => 6 + val[2] / 8,
      showEffectOn: 'render',
      rippleEffect: { brushType: 'stroke', scale: 3.5, period: 4 },
      itemStyle: {
        color: '#00D8FF',
        shadowColor: '#00D8FF',
        shadowBlur: 10
      },
      zlevel: 2
    },
    {
      name: '次要点位',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: mapPoints.value.map((p) => ({ ...p, value: [p.value[0], p.value[1], p.value[2] * 0.4] })),
      symbolSize: (val) => 3 + val[2] / 12,
      itemStyle: { color: '#7B61FF', opacity: 0.7 },
      zlevel: 1
    }
  ]
}))
</script>

<style scoped>
.center-map {
  background:
    radial-gradient(600px 400px at 50% 50%, rgba(0, 216, 255, 0.06), transparent 70%),
    linear-gradient(180deg, rgba(0, 216, 255, 0.04), rgba(8, 16, 33, 0.2));
}
.map-center-label {
  position: absolute;
  left: 50%;
  top: 54%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}
.glow {
  text-shadow: 0 0 16px rgba(0, 216, 255, 0.8);
}
</style>
