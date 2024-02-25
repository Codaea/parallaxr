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
  <div class="flex flex-col h-screen bg-gray-900 text-white">
    <div class="w-full h-16 bg-gray-700 flex items-center">
      <ul>
        <li>
          <FileUpload
            class="ml-2"
            mode="basic"
            name="layerUpload"
            url="dummy"
            customUpload
            @uploader="onUpload"
            accept=".png"
            :auto="true"
          />
        </li>
      </ul>
    </div>
    <div class="flex flex-row h-screen">
      <div class="bg-gray-800 w-64">
        <div class="flex items-center justify-center">
        <h1>Layers</h1>
      </div>
        <ul>
          <li v-for="layer in layers" :key="layer.id">
            <div>
              <br />
              <img :src="layer.url" :alt="layer.name" width="230" />
            </div>
          </li>
        </ul>
      </div>
      <div class="flex-grow">
        <PreviewWindowVue />
      </div>
    </div>
  </div>
</template>
