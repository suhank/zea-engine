import { setupVisualTest } from '../setup-visual-test.js'
import { Vec3, Color, Cone, Material, GeomItem } from '../dist/index.esm.js'

describe('1.0-simple Cone', () => {
  it('Render a simple Cone', async () => {
    console.log('Render a simple Cone')
    setupVisualTest(async (appData) => {
      const { scene, renderer, compareRendererToRefImage, cleanup } = appData
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

      const geomItem = new GeomItem('Cone', new Cone(1.5, 2.0, 6), standardMaterial)
      scene.getRoot().addChild(geomItem)
      renderer.frameAll()

      await compareRendererToRefImage('1.0-SimpleCone.png', 2)
      cleanup()
    })
  })
})

describe('1.1-dense Cone', async () => {
  setupVisualTest(async (appData) => {
    console.log('Render a dense Cone')
    const { scene, renderer, compareRendererToRefImage, cleanup } = appData
    
    const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
    standardMaterial.getParameter('BaseColor').setValue(new Color(200 / 255, 50 / 255, 50 / 255))

    const geomItem = new GeomItem('Cone', new Cone(1.5, 4.0, 30), standardMaterial)
    scene.getRoot().addChild(geomItem)

    it('Render a dense Cone - top', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      await compareRendererToRefImage('1.1-DenseCone-Top.png', 2)
    })
    it('Render a dense Cone - below', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, -2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      await compareRendererToRefImage('1.1-DenseCone-Below.png', 2)
    })
    it('Cleanup', async () => {
      cleanup()
    })
  })
})
