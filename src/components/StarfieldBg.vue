<template>
  <canvas ref="cv" class="absolute inset-0 w-full h-full pointer-events-none"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 全局背景：轻微星空粒子浮动（1px、透明度 0.3、缓慢无规律移动、无闪烁）
const cv = ref(null)
let ctx, raf, stars, w, h

function init() {
  const canvas = cv.value
  ctx = canvas.getContext('2d')
  w = canvas.width = window.innerWidth
  h = canvas.height = window.innerHeight
  const count = Math.floor((w * h) / 9000)
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1 + 0.4,
    a: Math.random() * 0.3 + 0.1,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15
  }))
}

function draw() {
  ctx.clearRect(0, 0, w, h)
  for (const s of stars) {
    s.x += s.vx
    s.y += s.vy
    if (s.x < 0) s.x = w
    if (s.x > w) s.x = 0
    if (s.y < 0) s.y = h
    if (s.y > h) s.y = 0
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(0, 216, 255, ${s.a})`
    ctx.fill()
  }
  raf = requestAnimationFrame(draw)
}

function onResize() {
  cancelAnimationFrame(raf)
  init()
  draw()
}

onMounted(() => {
  init()
  draw()
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', onResize)
})
</script>
