<script setup lang="ts">
import PreviewWindowVue from '../components/PreviewWindow.vue'
import LayersWindow from '../components/LayersWindow.vue'
import SettingWindow from '../components/SettingWindow.vue'
</script>

<template>
  <div class="flex flex-col h-full bg-gray-900 text-white">
    <div class="flex flex-row h-full">
      <div class="flex flex-col h-full">
        <LayersWindow class="flex-auto"/>
        <SettingWindow class="flex-none"/>
      </div>
      <div class="flex-grow">
        <PreviewWindowVue />
      </div>
    </div>
  </div>
</template>
