import { defineStore } from 'pinia'
import type { Application } from 'pixi.js'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export interface Layer {
  id: string
  name: string
  url: string
  visible: boolean
  speed: number // animation speed
  position: { x: number; y: number }
}

export interface Meta {
  imageDimensions: { width: number; height: number }
  videoLength: number,
  fps: number,
  canvasRef: HTMLCanvasElement
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
      fps: 30,
      canvasRef: null as HTMLCanvasElement | null
    } as Meta,
    app: null as Application | null
  }),
  actions: {
    addLayer(url: string, name: string, imageDimensions: { width: number; height: number }) {
      const layer: Layer = {
        id: Math.random().toString(),
        name: name,
        visible: true,
        url: url,
        speed: 1,
        position: { x: 0, y: 0 }
      }

      if (this.layers.length == 0) {
        // first layer
        console.log(imageDimensions)
        this.meta.imageDimensions = imageDimensions
      }

      this.layers.push(layer)
    },
    async onExport() {
      console.log('export')

      if (this.app === null) {
        return
      }

      const app = this.app
      app.ticker.stop() // stop ticker for render

      for (const layer of this.layers) {
        // reset all positions
        layer.position = { x: 0, y: 0 }
      }

      const canvas = this.meta.canvasRef as HTMLCanvasElement

      const zip = new JSZip()
      let frameCount = 0
      const blobPromises = []

      const totalFrames = this.meta.videoLength * this.meta.fps

      for (let i = 0; i < totalFrames; i++) {
        const blobPromise = new Promise<void>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              // Add the blob to the zip file
              // Use padStart to add leading zeros to the frame count
              const frameName = `frame${String(frameCount).padStart(4, '0')}.png`
              zip.file(frameName, blob)
              frameCount++
            }
           resolve()
          })
        })
        blobPromises.push(blobPromise)
        await blobPromise

        for (const layer of this.layers) {
          layer.position.x += layer.speed
        }
        app.render()


      }

      // Wait for all blobs to be created before generating the zip file
      Promise.all(blobPromises).then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          saveAs(content, 'frames.zip')
        })
      })

      //      const fps = this.meta.fps
      app.ticker.start()
    },
    changeFPS(fps: number) {
      const app = this.app
      if (app === null) {
        return
      }
      this.meta.fps = fps
      app.ticker.maxFPS = fps
    }
  },
})
