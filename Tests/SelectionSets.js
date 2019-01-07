
function log(txt) {
  document.body.appendChild(document.createTextNode(txt));
  document.body.appendChild(document.createElement('br'));
} 

testingHarness.registerTest('SelectionSet_SimpleTree', (domElement, resources) => {

    const scene = new Visualive.Scene(resources);

    const material = new Visualive.Material('material', 'SimpleSurfaceShader');
    material.getParameter('BaseColor').setValue(new Visualive.Color(89 / 255, 182 / 255, 92 / 255));
    let cuboid = new Visualive.Cuboid(0.6, 2.0, 0.2);

    let geomItem0 = new Visualive.GeomItem('Item0', cuboid, material);
    geomItem0.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0,0,3)));
    geomItem0.addParameter(new Visualive.NumberParameter('LayerID', 2))
    geomItem0.addParameter(new Visualive.StringParameter('Desc', "This is a steel beam"))
    scene.getRoot().addChild(geomItem0);

    let geomItem1 = new Visualive.GeomItem('Item1', cuboid, material);
    geomItem1.addParameter(new Visualive.NumberParameter('LayerID', 3))
    geomItem1.addParameter(new Visualive.StringParameter('Desc', "This is a wooden beam"))
    scene.getRoot().addChild(geomItem1);

    let geomItem2 = new Visualive.GeomItem('Item2', cuboid, material);
    geomItem2.addParameter(new Visualive.StringParameter('Desc', "This is a concrete block"))
    scene.getRoot().addChild(geomItem2);


    let geomItem3 = new Visualive.GeomItem('Item3', cuboid, material);
    geomItem3.addParameter(new Visualive.NumberParameter('LayerID', 2))
    geomItem3.addParameter(new Visualive.StringParameter('Desc', "This is a big Concrete block"))
    scene.getRoot().addChild(geomItem3);

    let geomItem4 = new Visualive.GeomItem('HVAC3', cuboid, material);
    geomItem4.addParameter(new Visualive.NumberParameter('LayerID', 2))
    geomItem4.addParameter(new Visualive.StringParameter('Desc', "This is a big Concrete block"))
    scene.getRoot().addChild(geomItem4);

    {
      const set = scene.selectionSets.createSelectionSet('PropertyRule_MatchName');
      const rule0 = set.addRule(Visualive.SelectionSet.RULES_TYPE.NAME)
      rule0.setMatchValue('Item1');

      log("PropertyRule_MatchName matches")
      const treeItems = set.getTreeItems();
      for(let treeItem of treeItems) {
        log(treeItem.getName());
      }
    }

    {
      const set = scene.selectionSets.createSelectionSet('Set1');
      const rule0 = set.addRule(Visualive.SelectionSet.RULES_TYPE.NAME)
      rule0.setMatchValue('Item*');
      rule0.setMatchType(Visualive.SelectionSet.MATCH_TYPE.REGEX);

      log("Set1 matches")
      const treeItems = set.getTreeItems();
      for(let treeItem of treeItems) {
        log(treeItem.getName());
      }
    }


    {
      const set = scene.selectionSets.createSelectionSet('PropertyRule_MatchNumber');
      const rule0 = set.addRule(Visualive.SelectionSet.RULES_TYPE.PROPERTY)
      rule0.setPropName('LayerID');
      rule0.setMatchValue(2);

      log("PropertyRule_MatchNumber matches")
      const treeItems = set.getTreeItems();
      for(let treeItem of treeItems) {
        log(treeItem.getName());
      }
    }

    {
      const set = scene.selectionSets.createSelectionSet('PropertyRule_ContainsIgnoreCase');
      const rule0 = set.addRule(Visualive.SelectionSet.RULES_TYPE.PROPERTY)
      rule0.setPropName('Desc');
      rule0.setMatchValue('CONCRETE');
      rule0.setMatchType(Visualive.SelectionSet.MATCH_TYPE.CONTAINS_IGNORECASE);

      log("PropertyRule_ContainsIgnoreCase matches")
      const treeItems = set.getTreeItems();
      for(let treeItem of treeItems) {
        log(treeItem.getName());
      }
    }


    {
      const set = scene.selectionSets.createSelectionSet('PropertyRule_MatchName PropertyRule_ContainsIgnoreCase');

      const rule0 = set.addRule(Visualive.SelectionSet.RULES_TYPE.NAME)
      rule0.setMatchValue('Item*');
      rule0.setMatchType(Visualive.SelectionSet.MATCH_TYPE.REGEX);

      const rule1 = set.addRule(Visualive.SelectionSet.RULES_TYPE.PROPERTY)
      rule1.setPropName('Desc');
      rule1.setMatchValue('CONCRETE');
      rule1.setMatchType(Visualive.SelectionSet.MATCH_TYPE.CONTAINS_IGNORECASE);

      log("PropertyRule_MatchName PropertyRule_ContainsIgnoreCase matches")
      const treeItems = set.getTreeItems();
      for(let treeItem of treeItems) {
        log(treeItem.getName());
      }
    }

});



testingHarness.registerTest('SelectionSet_BigTree', (domElement, resources) => {

    const scene = new Visualive.Scene(resources);

    const material = new Visualive.Material('material', 'SimpleSurfaceShader');
    material.getParameter('BaseColor').setValue(new Visualive.Color(89 / 255, 182 / 255, 92 / 255));
    let cuboid = new Visualive.Cuboid(0.6, 2.0, 0.2);

    let total = 0;
    const count0 = 10;
    for(let i=0; i<count0; i++) {

      const count = 5000
      const rootItem = new Visualive.TreeItem('Tree' + i);
      for(let j=0; j<count; j++) {
        let geomItem = new Visualive.GeomItem('Item'+j, cuboid, material);
        geomItem.addParameter(new Visualive.NumberParameter('LayerID', i))
        geomItem.addParameter(new Visualive.StringParameter('Desc', "This is a concrete beam"))
        rootItem.addChild(geomItem);

        total++;
      }

      scene.getRoot().addChild(rootItem);
    }


  {
      const set = scene.selectionSets.createSelectionSet('PropertyRule_MatchName PropertyRule_ContainsIgnoreCase');
      set.setRuleExecMode(Visualive.SelectionSet.RULES_EXEC_MODE.MANUAL)
      const rule0 = set.addRule(Visualive.SelectionSet.RULES_TYPE.NAME)
      rule0.setMatchValue('Item1'); 
      rule0.setMatchType(Visualive.SelectionSet.MATCH_TYPE.REGEX);

      // const rule1 = set.addRule(Visualive.SelectionSet.RULES_TYPE.PROPERTY)
      // rule1.setPropName('Desc');
      // rule1.setMatchValue('CONCRETE');
      // rule1.setMatchType(Visualive.SelectionSet.MATCH_TYPE.CONTAINS_IGNORECASE);


      const start = performance.now();
      set.execute();

      log(`total geom items: ${total}`  )
      log("PropertyRule_MatchName PropertyRule_ContainsIgnoreCase matches")
      const treeItems = set.getTreeItems();

      log("Done 'SelectionSet_BigTree':" + (performance.now() - start));

      for(let treeItem of treeItems) {
        log(treeItem.getPath());
      }
    }

});
