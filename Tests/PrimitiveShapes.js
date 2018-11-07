
testingHarness.registerTest('PrimitiveShapes', (domElement, resources)=> {

    const scene = new Visualive.Scene(resources);

    const standardMaterial = new Visualive.Material('surfaces', 'SimpleSurfaceShader');
    standardMaterial.getParameter('BaseColor').setValue(new Visualive.Color(89 / 255, 182 / 255, 92 / 255));

    const linesMaterial = new Visualive.Material('lines', 'LinesShader');
    linesMaterial.getParameter('Color').setValue(new Visualive.Color(1.0, 0.3, .4));

    const pointsMaterial = new Visualive.Material('points', 'SimpleSurfaceShader');
    pointsMaterial.getParameter('BaseColor').setValue(new Visualive.Color(1.0, 0.3, .4));

    const addShape = (name, shape, pos, material)=>{
        const geomItem = new Visualive.GeomItem(name+'Item', shape, material);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));
        scene.getRoot().addChild(geomItem);
    }

    addShape('Disc', new Visualive.Disc(2.0, 22), new Visualive.Vec3(-9, 0, 0), standardMaterial);
    addShape('Plane', new Visualive.Plane(2.0, 1.5, 22, 22), new Visualive.Vec3(-6, 0, 0), standardMaterial);
    addShape('Cuboid', new Visualive.Cuboid(1.5, 2.0, 1.0), new Visualive.Vec3(-3, 0, 0), standardMaterial);
    addShape('Cone', new Visualive.Cone(1.2, 4.0), new Visualive.Vec3(0, 0, 0), standardMaterial);
    addShape('Cylinder', new Visualive.Cylinder(1.2, 4.0, 32, 2, true), new Visualive.Vec3(3, 0, 0), standardMaterial);
    addShape('Torus', new Visualive.Torus(0.4, 1.3), new Visualive.Vec3(6, 0, 0), standardMaterial);
    addShape('Sphere', new Visualive.Sphere(1.4, 13), new Visualive.Vec3(9, 0, 0), standardMaterial);


    addShape('Circle', new Visualive.Circle(2.2, 12), new Visualive.Vec3(-6, 6, 0), linesMaterial);
    addShape('Rect', new Visualive.Rect(1.5, 2.0), new Visualive.Vec3(-3, 6, 0), linesMaterial);
    addShape('Cross', new Visualive.Cross(1.5), new Visualive.Vec3(0, 6, 0), linesMaterial);
    addShape('Grid', new Visualive.Grid(1.5, 2.0), new Visualive.Vec3(3, 6, 0), linesMaterial);
    addShape('LinesCuboid', new Visualive.LinesCuboid(1.5, 2.0, 3.0), new Visualive.Vec3(6, 6, 0), linesMaterial);

    {
        const width = 200;
        const height = 100;
        const camera = new Visualive.Camera();

        const aspect = width / height;
        const projectionMatrix = new Visualive.Mat4();
        camera.updateProjectionMatrix(projectionMatrix, aspect);
        const invProj = projectionMatrix.inverse();
        const frustum = new Visualive.LinesCuboid(2, 2, 2);
        // console.log(":"+frustum.__vertexAttributes.get('positions'))
        console.log("new Vec3(0.0, 0.0, -1.0):"+invProj.transformVec3(new Visualive.Vec3(0.0, 0.0, -1.0)))
        console.log("new Vec3(0.0, 0.0,  1.0):"+invProj.transformVec3(new Visualive.Vec3(0.0, 0.0,  1.0)))

        frustum.setVertex(0, invProj.transformVec3(frustum.getVertex(0)));
        frustum.setVertex(1, invProj.transformVec3(frustum.getVertex(1)));
        frustum.setVertex(2, invProj.transformVec3(frustum.getVertex(2)));
        frustum.setVertex(3, invProj.transformVec3(frustum.getVertex(3)));

        frustum.setVertex(4, invProj.transformVec3(frustum.getVertex(4)));
        frustum.setVertex(5, invProj.transformVec3(frustum.getVertex(5)));
        frustum.setVertex(6, invProj.transformVec3(frustum.getVertex(6)));
        frustum.setVertex(7, invProj.transformVec3(frustum.getVertex(7)));

        // console.log(":"+frustum.__vertexAttributes.get('positions'))

        addShape('frustum', frustum, new Visualive.Vec3(0, 0, 0), linesMaterial);
    }

    addShape('PointGrid', new Visualive.PointGrid(2.2, 1.5, 12, 12), new Visualive.Vec3(-6, 12, 0), pointsMaterial);


    const renderer = new Visualive.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(15, 2, 15), new Visualive.Vec3(0, 0, 0));
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.setScene(scene);
    // renderer.frameAll();
    renderer.resumeDrawing();
});