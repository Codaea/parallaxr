<script setup lang="ts">
import FileUpload from 'primevue/fileupload';
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'

import { useLayerStore } from '@/stores/LayerStore'

const { layers } = useLayerStore()

const {addLayer} = useLayerStore()

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
  <div class="bg-gray-800 w-64">
    <div class="flex items-center justify-center">
      <h1>Layers</h1>
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
    </div>

    <ul class="overflow-y-scroll overflow-x-hidden">
      <li v-for="layer in layers" :key="layer.id">
        <div class="flex flex-row bg-gray-700 mt-2 mb-2">
          <div class="flex-none w-16 ml-2 mr-2">
            <div class="flex items-center justify-center w-full h-full ">
                <img class="w-full object-cover" :src="layer.url" :alt="layer.name"/> <!-- TODO fix goofy css and get this to center-->
            </div>
          </div>
          <div class="flex-auto w-48">
            <div class="flex item-center justify-center">
              <span class="mt-2">{{ layer.name }}</span>
            </div>
            <div class="mr-7">
              <InputNumber class="text-black" v-model.number="layer.speed" />
              <Slider class="mt-4 ml-3 mb-4" v-model="layer.speed" :min="-25" :max="25" />
            </div>
          </div>
        </div>
      </li>
    </ul>
    
  </div>
</template>
