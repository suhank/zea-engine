(function(){
  const count = 2000000

  testingHarness.registerTest('System/MemoryTest/SignalsArray', (domElement, resources) => {
    const Z = ZeaEngine;
    const start = performance.now();
    let data = [];
    for(let i=0; i<count; i++) {
      data.push(new Z.Signal());
    }
    testingHarness.log("Done 'MemoryTest_SignalsArray':" + (performance.now() - start));
    // Results: Chrome spikes to 1.44 Gigs of Ram. Settling down to 1.42 Gigs after a minute.
    // Takes ~660 Ms.

    // Store the data on the window object to avoid being garbage collected.
    window.data = data;

  });

  testingHarness.registerTest('System/MemoryTest/XfosArray', (domElement, resources) => {
    const Z = ZeaEngine;
    const start = performance.now();
    let data = [];
    for(let i=0; i<count; i++) {
      data.push(new Z.Xfo(new Z.Vec3(i, i * 0.2, i * 0.4)));
    }
    testingHarness.log("Done 'MemoryTest_XfosArray' Xfo count:", count, " time:", (performance.now() - start), "ms");
    // Results: Chrome spikes to 2.43 Gigs of Ram. Settling down to 2.33Gigs after a minute.
    // Takes ~1915 Ms.
    
    // Store the data on the window object to avoid being garbage collected.
    window.data = data;

  });

  testingHarness.registerTest('System/MemoryTest/GeomItemsArray', (domElement, resources) => {
    const Z = ZeaEngine;

    const start = performance.now();
    let data = [];
    const rootItem = new Z.TreeItem();

    const count = 50000
    const times = new Float32Array(count);
    let tmp, t1, t0 = performance.now();
    let total = 0;

    for(let i=0; i<count; i++) {
      rootItem.addChild(new Z.GeomItem("Geom"+i));


      tmp = t1;
      t1 = performance.now();
      times[total] = t1 - tmp;
      total++;
    }
    testingHarness.log("Done 'MemoryTest_GeomItemsArray' GeomItem count:", count, " time:", (performance.now() - start), "ms");

    // Store the root on the window object to avoid being garbage collected.
    window.rootItem = rootItem;

  });
})();