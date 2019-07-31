testingHarness.registerTest('Groups', (domElement, resources)=> {
  const scene = new Visualive.Scene(resources);
  scene.setupGrid(10.0, 10);

  const asset = new Visualive.AssetItem('Groups');
  scene.getRoot().addChild(asset);

  const makeMaterial = (name, color) => {
    const material = new Visualive.Material(name, 'SimpleSurfaceShader');
    material.getParameter('BaseColor').setValue(color);
    return material;
  }

  const materials = {
    red: makeMaterial('red', new Visualive.Color(0.6, 0.0, 0.0)),
    redish: makeMaterial('redish', new Visualive.Color(1.0, 0.5, 0.5)),
    green: makeMaterial('green', new Visualive.Color(0.0, 1.0, 0.0)),
    blue: makeMaterial('blue', new Visualive.Color(0.0, 0.0, 0.7))
  }
  const categories = [
    'FooBar',
    'Foo',
    'Bar'
  ]
  const geoms = [
    new Visualive.Sphere(0.8, 40),
    new Visualive.Cylinder(0.7, 1.2, 34)
  ]

  const addMeshShape = (name, shape, pos, materialName, categoryValue)=>{
    const geomItem = new Visualive.GeomItem(name, shape, materials[materialName]);
    geomItem.setLocalXfo(new Visualive.Xfo(pos));
    geomItem.addParameter(new Visualive.StringParameter('Category', categoryValue))
    return geomItem;
  }

  for(let k=0; k<4; k++){
    const level = new Visualive.TreeItem('level'+k);
    for(let i=0; i<10; i++){
      const materialName = Object.keys(materials)[i%4]
      for(let j=0; j<10; j++){
        const categoryName = categories[j%4]
        const geomItem = addMeshShape(
          'Geom-'+k+"-"+i+"-"+j,
          geoms[(i+j)%geoms.length],
          new Visualive.Vec3(i*3.4, j*3.4, k*5), 
          materialName, 
          categoryName
          );
        level.addChild(geomItem);
      }
    }
    asset.addChild(level);
  }

  {
    const group = new Visualive.Group('Path Items');
    group.setPaths([
      'root/Groups/level0/Geom-0-5-0',
      ["root", "Groups", "level0", "Geom-0-4-0"],
      ["root", "Groups", "level0", "Geom-0-6-0"]
    ])
    scene.getRoot().addChild(group);
    group.setSelected(true)
  }

  {
    // Level2 green Spheres
    const group = new Visualive.Group('Level2 green Foo Items');
    const groupQueries = group.getParameter('Queries');
    {
      const query = new Visualive.QueryParameter('level2 Items');
      query.setQueryType(Visualive.QueryParameter.QUERY_TYPES.PATH)
      query.setMatchType(Visualive.QueryParameter.QUERY_MATCH_TYPE.REGEX)
      query.setValue('level2')
      groupQueries.addItem(query)
    }
    {
      const query = new Visualive.QueryParameter();
      query.setQueryType(Visualive.QueryParameter.QUERY_TYPES.MATERIAL)
      query.setMatchType(Visualive.QueryParameter.QUERY_MATCH_TYPE.EXACT)
      query.setValue('green')
      groupQueries.addItem(query)
    }
    {
      const query = new Visualive.QueryParameter();
      query.setQueryType(Visualive.QueryParameter.QUERY_TYPES.PROPERTY)
      query.setMatchType(Visualive.QueryParameter.QUERY_MATCH_TYPE.EXACT)
      query.setPropertyName('Category')
      query.setValue('Foo')
      groupQueries.addItem(query)
    }
    scene.getRoot().addChild(group);
    group.setSelected(true)
  }

  {
    // Level3 red* Spheres
    const group = new Visualive.Group('Level3 red* Spheres');
    const groupQueries = group.getParameter('Queries');
    {
      const query = new Visualive.QueryParameter('level2 Items');
      query.setQueryType(Visualive.QueryParameter.QUERY_TYPES.PATH)
      query.setMatchType(Visualive.QueryParameter.QUERY_MATCH_TYPE.REGEX)
      query.setValue('level3')
      groupQueries.addItem(query)
    }
    {
      const query = new Visualive.QueryParameter();
      query.setQueryType(Visualive.QueryParameter.QUERY_TYPES.MATERIAL)
      query.setMatchType(Visualive.QueryParameter.QUERY_MATCH_TYPE.REGEX)
      query.setValue('^red')
      groupQueries.addItem(query)
    }
    {
      const query = new Visualive.QueryParameter();
      query.setQueryType(Visualive.QueryParameter.QUERY_TYPES.MATERIAL)
      query.setMatchType(Visualive.QueryParameter.QUERY_MATCH_TYPE.REGEX)
      query.setMatchType(Visualive.QueryParameter.QUERY_MATCH_TYPE.REGEX)
      query.setValue('^blue')
      groupQueries.addItem(query)
    }
    scene.getRoot().addChild(group);
    group.setSelected(true)
  }


  const renderer = new Visualive.GLRenderer(domElement);
  renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(-15, -15, 20), new Visualive.Vec3(10, 10, 0));
  renderer.setScene(scene);
  renderer.frameAll();
  renderer.resumeDrawing();

  renderer.getViewport().mouseDownOnGeom.connect((event)=>{
    const geomItem = event.intersectionData.geomItem;
    console.log(geomItem.getPath())
    if(event.ctrlKey){
      geomItem.setSelected(!geomItem.getSelected());

      if(geomItem.getSelected()) {
        if(currGeom)
          currGeom.setSelected(false)
        currGeom = geomItem;
      }
      else {
        currGeom = undefined;
      }
    }
    // if(currMat){
      // console.log(geomItem.getPath() + " setMaterial:" + currMat.getName())
    //   geomItem.setMaterial(currMat);
    // }
  });
});