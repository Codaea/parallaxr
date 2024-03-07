<script setup lang="ts">
import PreviewWindowVue from '../components/PreviewWindow.vue'
import OptionsWindow from '../components/OptionsWindow.vue'
import LayersWindow from '../components/LayersWindow.vue'

</script>

<template>
  <div class="flex flex-col h-screen bg-gray-900 text-white overflow-visible">
    <OptionsWindow />
    <div class="flex flex-row  h-screen">
      <LayersWindow />
      <div class="flex-grow">
        <PreviewWindowVue />
      </div>
    </div>
  </div>
</template>
