<script setup lang="ts">
import { onMounted } from 'vue';
import { ref } from 'vue';

import { useLayerStore } from '@/stores/LayerStore';
import type { Layer } from '@/stores/LayerStore';
import { onTick, useApplication } from 'vue3-pixi';


const props = defineProps<{
  layer: Layer;
}>();
 

const tilePosition = ref({ x: props.layer.position.x, y: props.layer.position.y })


const { meta, app } = useLayerStore();

onMounted(() => {
  useLayerStore().app = useApplication().value
})

onTick((delta) => {
  tilePosition.value.x += props.layer.speed * delta;
})

</script>

<template>
    <tiling-sprite
        :key="props.layer.id"
        :texture="props.layer.url"
        :tile-position="tilePosition"
        :width="meta.imageDimensions.width"
        :height="meta.imageDimensions.height"
        :scale="{ x: 1, y: 1 }"
      />
</template>
