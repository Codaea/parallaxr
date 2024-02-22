<script setup lang="ts">
import { Application, onTick, Loader } from 'vue3-pixi'
import { useLayerStore } from '@/stores/LayerStore';

const { layers } = useLayerStore();

</script>

<template>
    <h1>Preview Window</h1>
    <Application :width="700" :height="700"> <!-- TODO: form to screen-->
    <tiling-sprite v-for="layer in layers" :key="layer.id"
    :texture="layer.url"
      :anchor="0.5"
      :x="0"
      :y="0"
    />
    <text :text="`Hello, Vue3-Pixi!`" :x="100" :y="100" />
    </Application>
</template>
