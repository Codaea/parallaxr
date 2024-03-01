import { defineStore } from "pinia";
import { useApplication } from "vue3-pixi";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

export interface Layer {
    id: string;
    name: string;
    url: string;
    visible: boolean;
    speed: number; // animation speed
    position: { x: number, y: number };
}

export interface Meta {
    imageDimensions: { width: number, height: number };
    videoLength: number;
    canvasRef: HTMLCanvasElement;
}

export const useLayerStore = defineStore('layerStore', {
    state: () => ({
        layers: [] as Layer[],
        meta: {
            imageDimensions: {
                width: 1,
                height: 1
            },
            videoLength: 0,
            canvasRef: null as HTMLCanvasElement | null
        } as Meta,
    }),
    actions: {
        addLayer(url : string, name: string, imageDimensions: { width: number, height: number }) {
            const layer: Layer = {
                id: Math.random().toString(),
                name: name,
                visible: true,
                url: url,
                speed: 1,
                position: { x: 0, y: 0 }
            }

            if (this.layers.length == 0) { // first layer
                console.log(imageDimensions)
                this.meta.imageDimensions = imageDimensions
            }

            this.layers.push(layer)
        },
        onExport() {
            console.log('export')
          
            const app = useApplication()
            const ffmpeg = new FFmpeg()

            app.value.ticker.stop() // stop ticker for render
          
            for (const layer of this.layers) { // reset all positions
                layer.position = { x: 0, y: 0 }
            } 
            ffmpeg.load()
            const canvas = this.meta.canvasRef

            async function writeFrame(i:number, url:string) {
                const fileData = await fetchFile(url)
                ffmpeg.writeFile(`frame%04d`, fileData )
                // ffmpeg.writeFile(`frame00${i}`, fileData )
            }

            for (let i = 0 ; i < this.meta.videoLength; i++) { // render all frames and copy to ffmpeg fs
                
                const url = canvas.toDataURL()
                writeFrame(i, url)
                app.value.ticker.update()
            }

            const fps = this.meta.fps
            
            // render video via ffmpeg
            ffmpeg.exec(['-r', '30', // fps
            '-s', '1920x1080', // dimensions
             '-i', 'frame%04d', // input
              'out.mp4'])   // output

            ffmpeg.readFile('out.mp4').then((data) => {
                const blob = new Blob([data], { type: 'video/mp4' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
            
            })
          },
          changeFPS(fps: number) {
            const app = useApplication()

            app.value.ticker.maxFPS = fps 
          }
        
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