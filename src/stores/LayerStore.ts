import { defineStore } from "pinia";

export interface Layer {
    id: string;
    name: string;
    url: string;
    visible: boolean;
    speed: number; // animation speed

}

export interface Meta {
    imageDimensions: { width: number, height: number };
}

export const useLayerStore = defineStore('layerStore', {
    state: () => ({
        layers: [] as Layer[],
        meta: {
            imageDimensions: {
                width: 1,
                height: 1
            }
        } as Meta
    }),
    actions: {
        addLayer(url : string, name: string, imageDimensions: { width: number, height: number }) {
            const layer: Layer = {
                id: Math.random().toString(),
                name: name,
                visible: true,
                url: url,
                speed: 1
            }

            if (this.layers.length == 0) { // first layer
                console.log(imageDimensions)
                this.meta.imageDimensions = imageDimensions
            }

            this.layers.push(layer)
        },
        
    },
    getters: {
        getLayers(): Layer[] {
            return this.layers as Layer[]
        },
        getLayerById(id): Layer | undefined {
            return Object.values(this.layers).find(layer => id === layer.id);
        }
        
    }


})