import { Vec3 } from '../dist/index.esm.js'
import { setupVisualTest } from '../setup-visual-test.js'

describe('0.0-Grid', () => {
  it('Render a simple grid', async () => {
    setupVisualTest(async (appData) => {
      const { scene, renderer, compareRendererToRefImage, cleanup } = appData

      scene.setupGrid(5.0, 50)
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 1.7), new Vec3(0, 0, 0.4))

      await compareRendererToRefImage('0.0-Grid.png', 2)
      cleanup()
    })
  })
})
