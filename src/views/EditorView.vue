<script setup lang="ts">
import { ref } from 'vue'
import FileUpload from 'primevue/fileupload'
import type FileUploadEvent from 'primevue/fileupload'
import PreviewWindowVue from '../components/PreviewWindow.vue'

import { useLayerStore } from '@/stores/LayerStore'

const { addLayer, layers } = useLayerStore()

function onUpload(event: FileUploadEvent) {
  const file = event.files[0]

  const url = URL.createObjectURL(file)
  const name = file.name

  // check dimensions
  let imageDimensions = { width: 0, height: 0 }

  let img = new Image()
  img.onload = function () {
    imageDimensions.width = this.width
    imageDimensions.height = this.height

    addLayer(url, name, imageDimensions)
  }
  img.src = url
}
</script>

<template>
  <div class="editor">
    <h1>This is an editor page</h1>
    <div class="toolbar">
      <h2>Layers</h2>
      <FileUpload
        mode="basic"
        name="layerUpload"
        url="dummy"
        customUpload
        @uploader="onUpload"
        accept=".png"
        :auto="true"
      />
      <ul>
        <li v-for="layer in layers" :key="layer.id">
          <div>
            <span>{{ layer.name }}</span>
            <br />
            <img :src="layer.url" :alt="layer.name" width="200px" />
          </div>
        </li>
      </ul>
    </div>
    <div class="preview_render">
      <h2>Preview</h2>
      <PreviewWindowVue />
    </div>
  </div>
</template>
