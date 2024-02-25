<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Application, useApplication, useScreen, useRenderer, useStage } from 'vue3-pixi'
import { useLayerStore } from '@/stores/LayerStore'

import PixiLayerComponent from './PixiLayerComponent.vue'

const { layers, meta } = useLayerStore()


onMounted(() => {
  const app = useApplication()
  const screen = useScreen(app)
  const render = useRenderer(app)
  const stage = useStage(app)
})
// update layer positions on tick
</script>

<template>
  <Application :width="meta.imageDimensions.width" :height="meta.imageDimensions.height">
    <PixiLayerComponent v-for="layer in layers" :key="layer.id" :layer="layer" />
  </Application>
</template>
