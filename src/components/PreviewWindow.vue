<script setup lang="ts">
import { Application, onTick, Loader } from 'vue3-pixi'
import { useLayerStore } from '@/stores/LayerStore'

const { layers, meta } = useLayerStore()
</script>

<template>
  <h1>Preview Window</h1>
  <Application :width="meta.imageDimensions.width" :height="meta.imageDimensions.height">
    <!-- TODO: form to screen-->
    <container  :position="{x: 0, y: 0 }">
      <tiling-sprite
        v-for="layer in layers"
        :key="layer.id"
        :texture="layer.url"
        :position="{ x: 0, y: 0 }"
        :scale="{ x: 1, y: 1 }"
        :width="meta.imageDimensions.width"
        :height="meta.imageDimensions.height"
      />
    </container>
  </Application>
</template>
