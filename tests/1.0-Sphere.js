import { setupVisualTest } from '../setup-visual-test.js'
import { Vec3, Color, Sphere, Material, GeomItem } from '../dist/index.esm.js'

describe('1.0-simple Sphere', () => {
  it('Render a simple Sphere', async () => {
    console.log('Render a simple Sphere')
    setupVisualTest(async (appData) => {
      const { scene, renderer, compareRendererToRefImage } = appData
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

      const geomItem = new GeomItem('Sphere', new Sphere(1.5, 6), standardMaterial)
      scene.getRoot().addChild(geomItem)
      
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      await compareRendererToRefImage('1.0-SimpleSphere.png', 2)
    })
  })
})

describe('1.1-dense Sphere', async () => {
  setupVisualTest(async (appData) => {
    console.log('Render a dense Sphere')
    const { scene, renderer, compareRendererToRefImage } = appData
    
    const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
    standardMaterial.getParameter('BaseColor').setValue(new Color(200 / 255, 50 / 255, 50 / 255))

    const geomItem = new GeomItem('Sphere', new Sphere(1.5, 30), standardMaterial)
    scene.getRoot().addChild(geomItem)

    it('Render a dense Sphere - top', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      console.log('compareRendererToRefImage')
      await compareRendererToRefImage('1.1-DenseSphere-Top.png', 2)

      console.log('Render a dense Sphere - done')
    })
    it('Render a dense Sphere - below', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, -2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      console.log('compareRendererToRefImage')
      await compareRendererToRefImage('1.1-DenseSphere-Below.png', 2)

      console.log('Render a dense Sphere - done')
    })
  })
})
