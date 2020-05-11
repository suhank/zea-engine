import { Vec3, Color, Plane, Disc, Cuboid, Cone, Material, GeomItem } from '../dist/index.esm.js'
import { setupVisualTest } from '../testing-server/setup-visual-test.js'

/*
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

describe('1.0-simple Disc', () => {
  it('Render a simple Disc', async () => {
    console.log('Render a simple Disc')
    setupVisualTest(async (appData) => {
      const { scene, renderer, compareRendererToRefImage } = appData
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

      const geomItem = new GeomItem('Disc', new Disc(2.0, 6), standardMaterial)
      scene.getRoot().addChild(geomItem)
      renderer.frameAll()

      await compareRendererToRefImage('1.0-SimpleDisc.png', 2)
    })
  })
})

describe('1.1-dense Disc', () => {
  it('Render a dense Disc', async () => {
    setupVisualTest(async (appData) => {
      console.log('Render a dense Disc')
      const { scene, renderer, compareRendererToRefImage } = appData

      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, 2.7), new Vec3(0, 0, 0.4))
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(200 / 255, 50 / 255, 50 / 255))

      const geomItem = new GeomItem('Disc', new Disc(20.0, 22), standardMaterial)
      scene.getRoot().addChild(geomItem)
      renderer.frameAll()

      console.log('compareRendererToRefImage')
      await compareRendererToRefImage('1.1-DenseDisc.png', 2)
    })
  })
})


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

describe('1.0-simple Cone', () => {
  it('Render a simple Cone', async () => {
    console.log('Render a simple Cone')
    setupVisualTest(async (appData) => {
      const { scene, renderer, compareRendererToRefImage } = appData
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

      const geomItem = new GeomItem('Cone', new Cone(1.5, 2.0, 6), standardMaterial)
      scene.getRoot().addChild(geomItem)
      renderer.frameAll()

      await compareRendererToRefImage('1.0-SimpleCone.png', 2)
    })
  })
})

describe('1.1-dense Cone', async () => {
  setupVisualTest(async (appData) => {
    console.log('Render a dense Cone')
    const { scene, renderer, compareRendererToRefImage } = appData
    
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

      console.log('compareRendererToRefImage')
      await compareRendererToRefImage('1.1-DenseCone-Top.png', 2)

      console.log('Render a dense Cone - done')
    })
    it('Render a dense Cone - below', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, -2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      console.log('compareRendererToRefImage')
      await compareRendererToRefImage('1.1-DenseCone-Below.png', 2)

      console.log('Render a dense Cone - done')
    })
  })
})

import { Cylinder } from '../dist/index.esm.js'

describe('1.0-simple Cylinder', () => {
  it('Render a simple Cylinder', async () => {
    console.log('Render a simple Cylinder')
    setupVisualTest(async (appData) => {
      const { scene, renderer, compareRendererToRefImage } = appData
      
      const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
      standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

      const geomItem = new GeomItem('Cylinder', new Cylinder(1.5, 2.0, 6), standardMaterial)
      scene.getRoot().addChild(geomItem)
      renderer.frameAll()

      await compareRendererToRefImage('1.0-SimpleCylinder.png', 2)
    })
  })
})
describe('1.1-dense Cylinder', async () => {
  setupVisualTest(async (appData) => {
    console.log('Render a dense Cylinder')
    const { scene, renderer, compareRendererToRefImage } = appData
    
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

      console.log('compareRendererToRefImage')
      await compareRendererToRefImage('1.1-DenseCylinder-Top.png', 2)

      console.log('Render a dense Cylinder - done')
    })
    it('Render a dense Cylinder - below', async () => {
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(2, 2, -2.7), new Vec3(0, 0, 0.4))
      renderer.frameAll()

      console.log('compareRendererToRefImage')
      await compareRendererToRefImage('1.1-DenseCylinder-Below.png', 2)

      console.log('Render a dense Cylinder - done')
    })
  })
})

*/