import { defineStore } from "pinia";

export interface Layer {
    id: string;
    name: string;
    url: string;
    visible: boolean;
    speed: number; // animation speed

}

export const useLayerStore = defineStore('layerStore', {
    state: () => ({
        layers: [] as Layer[],

    }),
    actions: {
        addLayer(url : string, name: string) {
            const layer: Layer = {
                id: Math.random().toString(),
                name: name,
                visible: true,
                url: url,
                speed: 1
            }

            this.layers.push(layer)
        },
        removeLayer(layer : Layer) {
            this.layers = this.layers.filter(l => l !== layer)
        },
        
    },
    getters: {
        getLayers(): Layer[] {
            return this.layers as Layer[]
        },
        
    }


})