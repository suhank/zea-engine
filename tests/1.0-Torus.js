import { setupVisualTest } from '../testing-server/setup-visual-test.js'
import { Vec3, Color, Torus, Material, GeomItem } from '../dist/index.esm.js'

describe('1.0-simple Torus', () => {
  it('Render a simple Torus', async () => {
    console.log('Render a simple Torus')
    setupVisualTest(async (appData) => {
      const { scene, renderer, compareRendererToRefImage } = appData
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

      const geomItem = new GeomItem('Torus', new Torus(1.5, 3.0, 6), standardMaterial)
      scene.getRoot().addChild(geomItem)
      
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      await compareRendererToRefImage('1.0-SimpleTorus.png', 2)
    })
  })
})

describe('1.1-dense Torus', async () => {
  setupVisualTest(async (appData) => {
    console.log('Render a dense Torus')
    const { scene, renderer, compareRendererToRefImage } = appData
    
    const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
    standardMaterial.getParameter('BaseColor').setValue(new Color(200 / 255, 50 / 255, 50 / 255))

    const geomItem = new GeomItem('Torus', new Torus(1.5, 4.0, 30), standardMaterial)
    scene.getRoot().addChild(geomItem)

    it('Render a dense Torus - top', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      console.log('compareRendererToRefImage')
      await compareRendererToRefImage('1.1-DenseTorus-Top.png', 2)

      console.log('Render a dense Torus - done')
    })
    it('Render a dense Torus - below', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, -2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      console.log('compareRendererToRefImage')
      await compareRendererToRefImage('1.1-DenseTorus-Below.png', 2)

      console.log('Render a dense Torus - done')
    })
  })
})
