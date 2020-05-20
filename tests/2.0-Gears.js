import { setupVisualTest } from '../setup-visual-test.js'

import { 
  Vec3,
  Xfo,
  Color,
  AssetItem,
  Cylinder,
  Material,
  GeomItem,
  GearsOperator,
} from '../dist/index.esm.js'

describe('2.0-Gears', () => {
  setupVisualTest(async (appData) => {
    const { scene, renderer, compareRendererToRefImage, cleanup } = appData
    
    scene.setupGrid(10.0, 10)

    const asset = new AssetItem("gears")
    scene.getRoot().addChild(asset)

    const gearsOp = new GearsOperator("Gears")
    asset.addChild(gearsOp)

    let index = 0;
    let sign = 1;
    let prevTeeth = 0;
    let prevRatio = 1.0;
    const addGear = (pos, radius, teeth, axis, color) => {
      const gearGeom = new Cylinder(radius, 0.2, teeth);
      const gearmaterial = new Material("gearmaterial", "SimpleSurfaceShader");
      gearmaterial.getParameter("BaseColor").setValue(color);
      const geomItem = new GeomItem("gear" + index++, gearGeom, gearmaterial);
      const xfo = new Xfo();
      xfo.tr = pos;
      // xfo.ori.setFromDirectionAndUpvector(axis, new Vec3(1, 0, 0));
      geomItem.setLocalXfo(xfo);
      asset.addChild(geomItem);
    
      const ratio = (prevTeeth > 0 ? prevTeeth / teeth : 1.0) * sign;
      console.log(index, ratio)
      prevTeeth = teeth;
      prevRatio = ratio;
      sign = -sign;
    
      const gear = gearsOp.getParameter("Gears").addElement();
      gear.getMember("Ratio").setValue(ratio);
      gear.getMember("Axis").setValue(axis);
      // const gearGeoms = gear.getMember('Items')
      // gearGeoms.addElement(binding.geomItem);
      gear.getOutput().setParam(geomItem.getParameter("GlobalXfo"));
    }
    addGear(
      new Vec3(0, 0, 0),
      2.5,
      12,
      new Vec3(0, 0, 1),
      new Color(1.0, 0.0, 0.0)
    )
    addGear(
      new Vec3(3.5, 0, 0),
      1.2,
      8,
      new Vec3(0, 0, 1),
      new Color(0.0, 0.0, 1.0)
    )
    addGear(
      new Vec3(3.5, 1.6, 0),
      0.6,
      5,
      new Vec3(0, 0, 1),
      new Color(1.0, 1.0, 0.0)
    )

    const revolutionsParam = gearsOp.getParameter("Revolutions")
    
    it('Render Gears - front', async () => {
      revolutionsParam.setValue(2.0)
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(-5, 5, 6), new Vec3(0, 0, 0.4))
      await compareRendererToRefImage('2.0-Gears-front.png', 2)
    })
    it('Render Gears - back', async () => {
      revolutionsParam.setValue(2.4)
      renderer
        .getViewport()
        .getCamera()
        .setPositionAndTarget(new Vec3(-5, 5, 6), new Vec3(0, 0, 0.4))

      await compareRendererToRefImage('2.0-Gears-back.png', 2)
    })
    it('Cleanup', async () => {
      cleanup()
    })
  })
})