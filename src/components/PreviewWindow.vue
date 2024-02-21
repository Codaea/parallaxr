<script setup lang="ts">
import { Application, onTick, Loader } from 'vue3-pixi'



</script>

<template>
    <h1>Preview Window</h1>
    <Application :width="700" :height="700"> <!-- TODO: form to screen-->
    <tiling-sprite
    texture='/preview.png'
      :anchor="0.5"
      :x="0"
      :y="0"
      :width="1920"
      :height="1080"
    />
    </Application>
</template>
