<template>
  <div class="root w-full h-full overflow-hidden relative">
    <StarfieldBg />
    <div class="dp-screen" :style="screenStyle">
      <div class="flex flex-col h-full px-5 py-3 gap-3">
        <!-- 顶部通栏 8% -->
        <div style="height: 8%"><DashboardHeader :rate="store.refreshRate" /></div>
        <!-- 中上核心指标区 15% -->
        <div style="height: 15%"><CoreMetrics /></div>
        <!-- 中部主体可视化区 55% -->
        <div style="height: 55%"><MainVisualization /></div>
        <!-- 底部辅助数据区 22% -->
        <div style="height: 22%"><BottomPanel /></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useDashboardStore } from './stores/dashboard'
import StarfieldBg from './components/StarfieldBg.vue'
import DashboardHeader from './components/DashboardHeader.vue'
import CoreMetrics from './components/CoreMetrics.vue'
import MainVisualization from './components/MainVisualization.vue'
import BottomPanel from './components/BottomPanel.vue'

const store = useDashboardStore()

// 1920*1080 基准等比缩放，适配任意大屏
const scale = ref(1)
function calcScale() {
  scale.value = Math.min(window.innerWidth / 1920, window.innerHeight / 1080)
}
const screenStyle = computed(() => ({
  transform: `scale(${scale.value})`,
  left: `${(window.innerWidth - 1920 * scale.value) / 2}px`,
  top: `${(window.innerHeight - 1080 * scale.value) / 2}px`
}))

let timer
onMounted(() => {
  store.init()
  calcScale()
  window.addEventListener('resize', calcScale)
  // 5 秒脉动刷新
  timer = setInterval(() => store.refresh(), store.refreshRate * 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer)
  window.removeEventListener('resize', calcScale)
})
</script>

<style scoped>
.root {
  background: var(--dp-bg);
}
.dp-screen {
  position: absolute;
}
</style>
