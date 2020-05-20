import { setupVisualTest } from '../setup-visual-test.js'
import { Vec3, Color, Cylinder, Material, GeomItem } from '../dist/index.esm.js'

describe('1.0-simple Cylinder', () => {
  it('Render a simple Cylinder', async () => {
    console.log('Render a simple Cylinder')
    setupVisualTest(async (appData) => {
      const { scene, renderer, compareRendererToRefImage, cleanup } = appData
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

      const geomItem = new GeomItem('Cylinder', new Cylinder(1.5, 2.0, 6), standardMaterial)
      scene.getRoot().addChild(geomItem)
      
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      await compareRendererToRefImage('1.0-SimpleCylinder.png', 2)
      
      cleanup()
    })
  })
})

describe('1.1-dense Cylinder', async () => {
  setupVisualTest(async (appData) => {
    console.log('Render a dense Cylinder')
    const { scene, renderer, compareRendererToRefImage, cleanup } = appData
    
    const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
    standardMaterial.getParameter('BaseColor').setValue(new Color(200 / 255, 50 / 255, 50 / 255))

    const geomItem = new GeomItem('Cylinder', new Cylinder(1.5, 4.0, 30), standardMaterial)
    scene.getRoot().addChild(geomItem)

    it('Render a dense Cylinder - top', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      await compareRendererToRefImage('1.1-DenseCylinder-Top.png', 2)
    })
    it('Render a dense Cylinder - below', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, -2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      await compareRendererToRefImage('1.1-DenseCylinder-Below.png', 2)
    })
    it('Cleanup', async () => {
      cleanup()
    })
  })
})
