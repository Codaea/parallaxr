<script setup lang="ts">
import InputNumber from 'primevue/inputnumber'
import Slider from 'primevue/slider'

import { useLayerStore } from '@/stores/LayerStore'

const { layers } = useLayerStore()
</script>

<template>
    <div class="bg-gray-800 w-64">
        <div class="flex items-center justify-center">
          <h1>Layers</h1>
        </div>
        <ul>
          <li v-for="layer in layers" :key="layer.id">
            <div>
              <div class="flex item-center justify-center"><span>{{ layer.name }}</span></div>
              <InputNumber class="text-black" v-model.number="layer.speed" />
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
</template>
