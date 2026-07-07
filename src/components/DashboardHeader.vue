<template>
  <header class="dp-header w-full h-full flex items-center justify-between px-8">
    <!-- 左侧：品牌 LOGO -->
    <div class="flex items-center gap-3">
      <div class="logo-mark">
        <span class="dot"></span>
      </div>
      <div class="leading-tight">
        <div class="text-brand font-bold tracking-widest text-[20px] glow">DataPulse</div>
        <div class="text-dp-text text-[14px] tracking-[4px]">数据脉动</div>
      </div>
    </div>

    <!-- 中间：核心主题 -->
    <h1 class="text-[28px] font-bold tracking-[2px] text-dp-text title-glow">
      全域数据态势实时监控平台
    </h1>

    <!-- 右侧：时间 / 日期 / 星期 / 刷新提示 -->
    <div class="flex items-center gap-6 text-dp-sub text-[14px]">
      <div class="flex items-center gap-2">
        <span class="ico">🕒</span>
        <span class="text-dp-text font-mono text-[18px]">{{ time }}</span>
      </div>
      <div class="text-right leading-tight">
        <div>{{ date }}</div>
        <div>{{ weekday }}</div>
      </div>
      <div class="refresh-tip">
        <span class="live-dot"></span>
        每 {{ rate }} 秒自动刷新
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({ rate: { type: Number, default: 5 } })

const time = ref('')
const date = ref('')
const weekday = ref('')
let timer

const WEEK = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

function tick() {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  time.value = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
  date.value = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
  weekday.value = WEEK[d.getDay()]
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.dp-header {
  background: linear-gradient(180deg, rgba(0, 216, 255, 0.05), transparent);
  border-bottom: 1px solid rgba(0, 216, 255, 0.12);
}
.glow {
  text-shadow: 0 0 10px rgba(0, 216, 255, 0.55);
}
.title-glow {
  text-shadow: 0 0 14px rgba(0, 216, 255, 0.32);
}
.logo-mark {
  width: 38px;
  height: 38px;
  border: 2px solid var(--dp-brand);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(0, 216, 255, 0.4);
}
.logo-mark .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--dp-brand);
  box-shadow: 0 0 10px var(--dp-brand);
  animation: dp-pulse 1s ease-in-out infinite;
}
.refresh-tip {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--dp-border);
  border-radius: 14px;
  color: var(--dp-cyan);
}
.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dp-cyan);
  box-shadow: 0 0 8px var(--dp-cyan);
  animation: dp-pulse 1s ease-in-out infinite;
}
.ico {
  filter: drop-shadow(0 0 4px rgba(0, 216, 255, 0.6));
}
</style>
