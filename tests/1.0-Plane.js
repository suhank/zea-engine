import { setupVisualTest } from '../testing-server/setup-visual-test.js'
import { Vec3, Color, Plane, Material, GeomItem } from '../dist/index.esm.js'

describe('1.0-Simple plane', () => {
  it('Render a simple plane', async () => {
    console.log('Render a simple plane')
    setupVisualTest(async (appData) => {
      const { scene, renderer, compareRendererToRefImage } = appData
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

      const geomItem = new GeomItem('Plane', new Plane(2.0, 1.5, 3, 3), standardMaterial)
      scene.getRoot().addChild(geomItem)
      renderer.frameAll()

      await compareRendererToRefImage('1.0-SimplePlane.png', 2)
    })
  })
})

describe('1.1-dense plane', () => {
  it('Render a dense plane', async () => {
    setupVisualTest(async (appData) => {
      console.log('Render a dense plane')
      const { scene, renderer, compareRendererToRefImage } = appData

      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(200 / 255, 50 / 255, 50 / 255))

      const geomItem = new GeomItem('Plane', new Plane(20.0, 10.5, 22, 21), standardMaterial)
      scene.getRoot().addChild(geomItem)
      renderer.frameAll()

      console.log('compareRendererToRefImage')
      await compareRendererToRefImage('1.1-DensePlane.png', 2)
    })
  })
})
