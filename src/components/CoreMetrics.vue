<template>
  <div class="grid grid-cols-5 gap-4 w-full h-full">
    <MetricCard v-for="m in metrics" :key="m.key" :metric="m" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDashboardStore } from '../stores/dashboard'
import MetricCard from './MetricCard.vue'

const store = useDashboardStore()
const { coreMetrics: metrics } = storeToRefs(store)
</script>
