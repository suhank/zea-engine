import { setupVisualTest } from '../setup-visual-test.js'

import { 
  Vec3,
  Xfo,
  Color,
  AssetItem,
  TreeItem,
  Material,
  BillboardItem,
  Label,
  Scene,
  GLRenderer 
} from '../dist/index.esm.js'

describe('2.0-Labels', () => {
  setupVisualTest(async (appData) => {
    const { scene, renderer, compareRendererToRefImage, cleanup } = appData
    const asset = new TreeItem('labels')

    let index = 0
    const addLabel = (lineEndPos, pos, color, name)=> {
      const label = new Label(name, 'Labels')
      label.getParameter('fontSize').setValue(48)
      label.getParameter('fontColor').setValue(color)
      label.getParameter('backgroundColor').setValue(new Color(0.3, 0.3, 0.3))
      
      const billboard = new BillboardItem('billboard'+index, label)
      const xfo = new Xfo(pos)
      billboard.setLocalXfo(xfo)
      billboard.getParameter('PixelsPerMeter').setValue(300)
      billboard.getParameter('AlignedToCamera').setValue(true)
      billboard.getParameter('Alpha').setValue(1)
      // billboard.getParameter('lineEnd').addElement(lineEndPos)
      // billboard.getChildByName('line0').getMaterial().getParameter('Color').setValue(new Color(.7, .7, .7))
      asset.addChild(billboard)
    
      index++
    }
    addLabel(new Vec3(1, 0, 0), new Vec3(1, 1, 1), new Color(0, 1, 0), "Hello")
    addLabel(new Vec3(-1, 0, 0), new Vec3(-1, -1, 1), new Color(1, 1, 0), "Long")
    addLabel(new Vec3(0, 0, 0), new Vec3(0, 0.05, 0.08), new Color(1, 1, 0), "MyCustomLabel")
    
    scene.getRoot().addChild(asset)

    it('Render Labels - front', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()
      await compareRendererToRefImage('2.0-Labels-Top.png', 2)
    })
    it('Render Labels - back', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(-2, -2, 2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      await compareRendererToRefImage('2.0-Labels-Below.png', 2)
    })
    it('Cleanup', async () => {
      cleanup()
    })
  })
})
