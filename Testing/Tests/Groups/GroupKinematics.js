
testingHarness.registerTest('Groups/GroupKinematics', (domElement, resources)=> {
    const Z = ZeaEngine

    const scene = new Z.Scene(resources)
    scene.setupGrid(60.0, 6)

    const standardMaterial1 = new Z.Material('surfaces', 'SimpleSurfaceShader')
    standardMaterial1.getParameter('BaseColor').setValue(new Z.Color(89 / 255, 182 / 255, 92 / 255))

    const standardMaterial2 = new Z.Material('surfaces', 'SimpleSurfaceShader')
    standardMaterial2.getParameter('BaseColor').setValue(new Z.Color(89 / 255, 89 / 255, 182 / 255))

    const group1 = new Z.Group('group1')
    group1.getParameter('Material').setValue(standardMaterial1)
    // group1.getParameter('InitialXfoMode').setValue(Z.Group.INITIAL_XFO_MODES.disabled)
    scene.getRoot().addChild(group1)

    const group2 = new Z.Group('group2')
    group2.getParameter('Material').setValue(standardMaterial2)
    // group2.getParameter('InitialXfoMode').setValue(Z.Group.INITIAL_XFO_MODES.disabled)
    scene.getRoot().addChild(group2)

    const group3 = new Z.Group('group3')
    scene.getRoot().addChild(group3)

    const group4 = new Z.Group('group4')
    scene.getRoot().addChild(group4)

    const addShape = (name, shape, pos, group0, group1)=>{
        const geomItem = new Z.GeomItem(name+'Item', shape, standardMaterial1)
        geomItem.setLocalXfo(new Z.Xfo(pos))
        scene.getRoot().addChild(geomItem)
        group0.addItem(geomItem) 
        group1.addItem(geomItem)
    }

    addShape('Disc', new Z.Disc(2.0, 22), new Z.Vec3(-9, 0, 0), group1, group3)
    addShape('Plane', new Z.Plane(2.0, 1.5, 22, 22), new Z.Vec3(-6, 0, 0), group1, group3)
    addShape('Cuboid', new Z.Cuboid(1.5, 2.0, 1.0), new Z.Vec3(-3, 0, 0), group1, group3)
    addShape('Cone', new Z.Cone(1.2, 4.0), new Z.Vec3(0, 0, 0), group2, group3)
    addShape('Cylinder', new Z.Cylinder(1.2, 4.0, 32, 2, true), new Z.Vec3(3, 0, 0), group2, group4)
    addShape('Torus', new Z.Torus(0.4, 1.3), new Z.Vec3(6, 0, 0), group2, group4)
    addShape('Sphere', new Z.Sphere(1.4, 13), new Z.Vec3(9, 0, 0), group2, group4)

    const renderer = new Z.GLRenderer(domElement)
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(15, 2, 15), new Z.Vec3(0, 0, 0))
    renderer.setScene(scene)
    renderer.frameAll()
    renderer.resumeDrawing()

    const q1 = new Z.Quat();
    q1.setFromAxisAndAngle(new Z.Vec3(0, 0, 1), -0.03)
    const xfo1 = group3.getParameter('GlobalXfo').getValue()

    const q2 = new Z.Quat();
    q2.setFromAxisAndAngle(new Z.Vec3(0, 0, 1), 0.05)
    const xfo2 = group4.getParameter('GlobalXfo').getValue()
    setInterval(function(){
        xfo1.ori = q1.multiply(xfo1.ori)
        group3.getParameter('GlobalXfo').setValue(xfo1)

        xfo2.ori = q2.multiply(xfo2.ori)
        group4.getParameter('GlobalXfo').setValue(xfo2)
     }, 100);
    
})