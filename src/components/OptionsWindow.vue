<script setup lang="ts">
import FileUpload from 'primevue/fileupload'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

import { useLayerStore } from '@/stores/LayerStore'

const { addLayer, meta, onExport } = useLayerStore()

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
          <span>width</span>
          <InputNumber class="text-black mr-2" v-model="meta.imageDimensions.width" />
          <span>height</span>
          <InputNumber class="text-black" v-model="meta.imageDimensions.height" />
        </li>
        <li>
          <span>Fps</span>
          <InputNumber class="text-black" v-model="meta.fps" />
        </li>
        <li>
          <span>Duration (seconds)</span>
          <InputNumber class="text-black" v-model="meta.videoLength" />
        </li>
        <li>
          <Button label="export" @click="onExport()"/>
        </li>
      </ul>
    </div>
</template>
