

testingHarness.registerTest('NURBSGridCloud', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    scene.setupGrid(24.0, 24);

    // // 1Gb per Million instances.
    // // 1Mb per instance?
    // window.surfaceItems = [];
    // const makeInst = (id)=>{
    //     const inst = new GLNURBSSurfaceDrawItem(id);
    //     window.surfaceItems.push(inst);

    // }
    // for(let i=0; i<5000000; i++) {
    //     makeInst(i);
    // }


    let size = 2;
    let quads = {};
    // Note: Quads never seemed to be longer than 32 segements. (if regularly tesselated.)
    let maxQuadSize = 6;// pow(2 x) == 64
    for(let i=2; i<maxQuadSize; i++) {
        for(let j=i; j<maxQuadSize; j++) {
            let x = Math.pow(2, i);
            let y = Math.pow(2, j);
            quads[x+'-'+y] = new Z.Plane(x*0.1, y*0.1, x, y);
        }
    }

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }


    function getRandomQuadSize(min=2) {
      let max = Math.floor(maxQuadSize-1);
      // pdb : y = 1/(pow(x, p);
      let r = Math.pow(Math.random(), 4);
      return Math.floor(r * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }



    let up = new Z.Vec3(0.0, 1.0, 0.0);

    // for(let i=2; i<700; i++) {
    //     let xi = getRandomQuadSize(2);
    //     console.log(xi + ":" + Math.pow(2, xi))
    // }

    //////////////////////4
    // Note: Surface counts
    // Chassis: Geoms: 76 Surfaces: 8464
    // Siege: Geoms: 40 Surfaces: 9884
    // CARROSSERIE: Geoms: 395 Surfaces: 48960
    
    function getNumSurfacesQuadSize(pct) {
      let min = 5000;
      let max = 10000;///17000;
      let r = Math.pow(pct, 3);
      return Math.floor(r * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
    }

    let total = 0;
    for(let i=2; i<17; i++) {
        let count = getNumSurfacesQuadSize((i/16));//getRandomIntInclusive(10, 10000);
        console.log((i/16)*100 + '% :' +  count);

        const material = new Z.Material('material', 'SimpleSurfaceShader');
        material.addParameter('BaseColor', Z.Color.random());

        let treeItem = new Z.TreeItem('Tree'+i);
        treeItem.setLocalXfo(new Z.Xfo(new Z.Vec3(i*5+((Math.random()-0.5) * 20), (Math.random()-0.5) * 10, (Math.random()-0.5) * 10)));

        let addGeomItem = (shape, xfo, index, material)=>{
            const geomItem = new Z.GeomItem(shape.name+'Item'+index, shape, material);
            geomItem.setLocalXfo(xfo);
            treeItem.addChild(geomItem, false);
        }

        for(let j=0; j<count; j++) {
            let xi = getRandomQuadSize(2);
            let yi = getRandomQuadSize(xi);
            let quadName = Math.pow(2, xi)+'-'+Math.pow(2, yi);

            let tr = new Z.Vec3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5);
            tr.scaleInPlace(20);
            let xfo = new Z.Xfo(tr);
            xfo.ori.setFromDirectionAndUpvector(tr.normalize(), up);
            addGeomItem(quads[quadName], xfo, j, material)
        }
        scene.getRoot().addChild(treeItem, false);

        total += count;
    }

    for(let name in quads) {
        console.log("Refs:" + name + ":" + quads[name].numRefs());
    }
    console.log("total:" + total);

    
    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(15, 15, 2), new Z.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.frameAll();
    renderer.resumeDrawing();

});