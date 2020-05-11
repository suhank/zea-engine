import { Vec3, Color, Cuboid, Material, GeomItem } from '../dist/index.esm.js'
import { setupVisualTest } from '../testing-server/setup-visual-test.js'

describe('1.0-simple Cuboid', () => {
  it('Render a simple Cuboid', async () => {
    console.log('Render a simple Cuboid')
    setupVisualTest(async (appData) => {
      const { scene, renderer, compareRendererToRefImage } = appData
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

      const geomItem = new GeomItem('Cuboid', new Cuboid(1.5, 2.0, 1.0), standardMaterial)
      scene.getRoot().addChild(geomItem)
      renderer.frameAll()

      await compareRendererToRefImage('1.0-SimpleCuboid.png', 2)
    })
  })
})

describe('1.1-dense Cuboid', () => {
  it('Render a dense Cuboid', async () => {
    setupVisualTest(async (appData) => {
      console.log('Render a dense Cuboid')
      const { scene, renderer, compareRendererToRefImage } = appData

      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(200 / 255, 50 / 255, 50 / 255))

      const geomItem = new GeomItem('Cuboid', new Cuboid(1.5, 2.0, 0.1), standardMaterial)
      scene.getRoot().addChild(geomItem)
      renderer.frameAll()

      console.log('compareRendererToRefImage')
      await compareRendererToRefImage('1.1-DenseCuboid.png', 2)
    })
  })
})
