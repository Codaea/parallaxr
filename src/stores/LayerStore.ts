import { defineStore } from "pinia";

export const useLayerStore = defineStore('layerStore', () => {
    state: () => {
        layers: [],

    }
    actions: {
        addLayer(layer) {
            this.layers.push(layer)
        },
        removeLayer(layer) {
            this.layers = this.layers.filter(l => l !== layer)
        },
        
    },
    getters: {
        getLayers() {
            return this.layers
        }
    }


})