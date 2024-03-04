<script setup lang="ts">
import FileUpload from 'primevue/fileupload'
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import PreviewWindowVue from '../components/PreviewWindow.vue'

import { useLayerStore } from '@/stores/LayerStore'

const { addLayer, layers, meta, onExport } = useLayerStore()

function onUpload(event: any) {// TODO fix type
  const file = event.files[0]

  const url = URL.createObjectURL(file)
  const name = file.name

  // check dimensions
  let imageDimensions = { width: 0, height: 0 }

  let img = new Image()
  img.onload = function () {
    // TODO fix this bullshit fuckery
    imageDimensions.width = (this as any).width;
    imageDimensions.height = (this as any).height;

    addLayer(url, name, imageDimensions)
  }
  img.src = url
}
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-900 text-white overflow-visible">
    <div class="w-full h-16 bg-gray-700 flex items-center">
      <ul class="flex space-x-4 ">
        <li class="list-none" >
          <FileUpload
            class="ml-2 "
            mode="basic"
            name="layerUpload"
            url="dummy"
            customUpload
            @uploader="onUpload"
            accept=".png"
            :auto="true"
          />
        </li>
        <li class="list-none">
          <InputNumber class="text-black mr-2" v-model="meta.imageDimensions.width" />
          <span></span>
          <InputNumber class="text-black" v-model="meta.imageDimensions.height" />
        </li>
        <li>
          <Button label="export" @click="onExport()"/>
        </li>
      </ul>
    </div>
    <div class="flex flex-row  h-screen">
      <div class="bg-gray-800 w-64">
        <div class="flex items-center justify-center">
          <h1>Layers</h1>
        </div>
        <ul>
          <li v-for="layer in layers" :key="layer.id">
            <div>
              <div class="flex item-center justify-center"><span>{{ layer.name }}</span></div>
              
              <InputText class="text-black" v-model.number="layer.speed" /> <!-- TODO move this to InputNumber Component primevues-->
              <Slider class="mt-4 ml-3 mr-2" v-model="layer.speed" :min="-25" :max="25" />
              <br />
              <div class="ml-2 mr-2 object-contain max-h-full max-w-full">
              <img 
              :src="layer.url" :alt="layer.name" />
            </div>
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
