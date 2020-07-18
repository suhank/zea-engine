import { setupVisualTest } from '../setup-visual-test.js'
import { Vec3, Color, Disc, Material, GeomItem } from '../dist/index.esm.js'

describe('1.0-simple Disc', () => {
  it('Render a simple Disc', async () => {
    console.log('Render a simple Disc')
    setupVisualTest(async (appData) => {
      const { scene, renderer, compareRendererToRefImage, cleanup } = appData
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

      const geomItem = new GeomItem('Disc', new Disc(2.0, 6), standardMaterial)
      scene.getRoot().addChild(geomItem)
      renderer.frameAll()

      await compareRendererToRefImage('1.0-SimpleDisc.png', 2)
      cleanup()
    })
  })
})

describe('1.1-dense Disc', () => {
  it('Render a dense Disc', async () => {
    setupVisualTest(async (appData) => {
      console.log('Render a dense Disc')
      const { scene, renderer, compareRendererToRefImage, cleanup } = appData

      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(200 / 255, 50 / 255, 50 / 255))

      const geomItem = new GeomItem('Disc', new Disc(20.0, 22), standardMaterial)
      scene.getRoot().addChild(geomItem)
      renderer.frameAll()

      await compareRendererToRefImage('1.1-DenseDisc.png', 2)
      cleanup()
    })
  })
})

