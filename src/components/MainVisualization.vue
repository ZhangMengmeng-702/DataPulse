<template>
  <div class="flex gap-4 w-full h-full">
    <div class="w-1/4 min-w-0"><LeftPanel /></div>
    <div class="w-1/2 min-w-0"><CenterMap /></div>
    <div class="w-1/4 min-w-0"><RightPanel /></div>
  </div>
</template>

<script setup>
import LeftPanel from './panels/LeftPanel.vue'
import CenterMap from './panels/CenterMap.vue'
import RightPanel from './panels/RightPanel.vue'
</script>
