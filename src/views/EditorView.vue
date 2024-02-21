<script setup lang="ts">
import { ref } from 'vue'
import PreviewWindowVue from '../components/PreviewWindow.vue';


const images = ref([])
</script>

<template>
  <div class="editor">
    <h1>This is an editor page</h1>
    <div class="toolbar">
      <h2>Layers</h2>
      <ul>
        <li>open image(s)</li>
      </ul>
      <ul>
        <li v-for="image in images" :key="image">Image</li>
      </ul>
    </div>
    <div class="preview_render">
      <h2>Preview</h2>
        <PreviewWindowVue/>
    </div>
  </div>
</template>
