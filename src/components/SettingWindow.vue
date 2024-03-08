<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

import { useLayerStore } from '@/stores/LayerStore'

const { meta, onExport, changeFPS } = useLayerStore()
</script>

<template>
    <div class="bg-white text-black">
        <h1>Settings</h1>
    </div>
    <ul>
        <li class="list-none mt-2 mb-2">
            <p>width</p>
            <InputNumber class="text-black mr-2" v-model="meta.imageDimensions.width" />
            <p>height</p>
          <InputNumber class="text-black" v-model="meta.imageDimensions.height" />
        </li>
        <li>
          <p>Fps</p>
          <InputNumber class="text-black" v-model="meta.fps" @update:modelValue="changeFPS()" />
        </li>
        <li>
          <p>Duration (seconds)</p>
          <InputNumber class="text-black" v-model="meta.videoLength" />
        </li>
        <li class="mt-2">
          <Button label="export" @click="onExport()"/>
        </li>
    </ul>
</template>
