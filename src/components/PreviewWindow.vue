<script setup lang="ts">
import { onMounted, onRenderTracked, ref } from 'vue'
import { Application, useApplication, useScreen, useRenderer, useStage } from 'vue3-pixi'
import { useLayerStore } from '@/stores/LayerStore'

import PixiLayerComponent from './PixiLayerComponent.vue'

const { layers, meta } = useLayerStore()



onMounted(() => {
  let { app } = useLayerStore()
  app = useApplication()
  meta.canvasRef = document.getElementById('canvas') as HTMLCanvasElement

})

</script>

<template>
  <Application id="canvas" :width="meta.imageDimensions.width" :height="meta.imageDimensions.height">
    <PixiLayerComponent v-for="layer in layers" :key="layer.id" :layer="layer" />
  </Application>
</template>
