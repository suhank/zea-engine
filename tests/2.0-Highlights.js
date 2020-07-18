import { setupVisualTest } from '../setup-visual-test.js'

import { 
  Vec3,
  Xfo,
  Color,
  Sphere,
  Plane,
  Cuboid,
  Cone,
  Cylinder,
  Torus,
  GeomItem,
  TreeItem,
  Material,
  Group,
} from '../dist/index.esm.js'

describe('2.0-Highlights', () => {
  setupVisualTest(async (appData) => {
    const { scene, renderer, compareRendererToRefImage, cleanup } = appData
    scene.setupGrid(60.0, 6)
    const tree1 = new TreeItem('tree1')
    scene.getRoot().addChild(tree1)
    
    const group1 = new Group('group1')
    group1.getParameter('HighlightColor').setValue(new Color('lemonchiffon'))
    scene.getRoot().addChild(group1)
    
    const group2 = new Group('group2')
    group2.getParameter('HighlightColor').setValue(new Color('mediumblue'))
    scene.getRoot().addChild(group2)
    
    const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
    standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))
    
    const addGeomItem = (shape, row, count, i) => {
      const geomItem = new GeomItem('Item'+row+'-'+i, shape, standardMaterial)
      geomItem.setLocalXfo(new Xfo(new Vec3(i * 3, row * 3, 0)))
      tree1.addChild(geomItem)
  
      group1.addItem(geomItem)
      if(i%2 == 0)
        group2.addItem(geomItem)
    }
    const addMeshShape = (shape, row, count)=>{
      for(let i=0; i<count; i++){
          addGeomItem(shape, row, count, i)
      }
    }
    addMeshShape(new Sphere(1.4, 13), 3, 1)
    addMeshShape(new Sphere(1.4, 13), 2, 3)
    addMeshShape(new Plane(2.0, 1.5), 1.4, 4)
    addMeshShape(new Cuboid(1.5, 2.0, 1.0), 0.5, 6)
    addMeshShape(new Cone(1.2, 4.0), -1, 5)
    addMeshShape(new Cylinder(1.2, 4.0, 32, 2, true), -2, 8)
    addMeshShape(new Torus(0.4, 1.3), -3, 4)

    
    renderer.getViewport().getCamera().setPositionAndTarget(new Vec3(25, 25, 13), new Vec3(10, 0, 0));

    it('Render Highlights1', async () => {
      await compareRendererToRefImage('2.0-Highlights1.png', 2)
    })
    it('Render Highlights2', async () => {
      tree1.setSelected(true)
      await compareRendererToRefImage('2.0-Highlights2.png', 2)
    })
    it('Render Highlights3', async () => {
      group1.getParameter('Highlighted').setValue(true)
      await compareRendererToRefImage('2.0-Highlights3.png', 2)
    })
    it('Render Highlights4', async () => {
      group1.getParameter('Highlighted').setValue(false)
      group2.getParameter('Highlighted').setValue(true)
      await compareRendererToRefImage('2.0-Highlights4.png', 2)
    })
    it('Cleanup', async () => {
      cleanup()
    })
  })
})
