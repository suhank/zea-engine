

const count = 2000000

function m_log(txt) {
  document.body.appendChild(document.createTextNode(txt));
  document.body.appendChild(document.createElement('br'));
} 

testingHarness.registerTest('MemoryTest_SignalsArray', (domElement, resources) => {
  const Z = ZeaEngine;
  const start = performance.now();
  let data = [];
  for(let i=0; i<count; i++) {
    data.push(new VZisualive.Signal());
  }
  m_log("Done 'MemoryTest_SignalsArray':" + (performance.now() - start));
  // Results: Chrome spikes to 1.44 Gigs of Ram. Settling down to 1.42 Gigs after a minute.
  // Takes ~660 Ms.
});

testingHarness.registerTest('MemoryTest_XfosArray', (domElement, resources) => {
  const Z = ZeaEngine;
  const start = performance.now();
  let data = [];
  for(let i=0; i<count; i++) {
    data.push(new Z.Xfo(new Z.Vec3(i, i * 0.2, i * 0.4)));
  }
  m_log("Done 'MemoryTest_XfosArray':" + (performance.now() - start));
  // Results: Chrome spikes to 2.43 Gigs of Ram. Settling down to 2.33Gigs after a minute.
  // Takes ~1915 Ms.
});

testingHarness.registerTest('MemoryTest_Float32Arrays', (domElement, resources) => {
  const Z = ZeaEngine;
  const start = performance.now();
  let data = [];
  for(let i=0; i<count; i++) {
    const array = new Float32Array(10);

    // Create a temp Vec3 to wrap the array to set its values.
    const tr = new Z.Vec3(array.buffer, 28);
    tr.set(i, i * 0.2, i * 0.4);

    data.push(array);
  }
  m_log("Done 'MemoryTest_Float32Arrays':" + (performance.now() - start));
  // Results: Chrome spikes to 1.55 Gigs of Ram. Settling down to 1.45 Gigs after a minute.
  // Takes ~2200 Ms.
});



testingHarness.registerTest('MemoryTest_Float32Arrays_ReuseClasses', (domElement, resources) => {
  const Z = ZeaEngine;
  const start = performance.now();
  let data = [];
  const tr = new Z.Vec3();
  for(let i=0; i<count; i++) {
    const array = new Float32Array(10);

    // Create a temp Vec3 to wrap the array to set its values.
    tr.setDataArray(array);
    tr.set(i, i * 0.2, i * 0.4);

    // const tr = new Float32Array(array.buffer, 28, 3);
    // tr[0] = i; tr[1] = i * 0.2; tr[2] = i * 0.4;
    data.push(array);
  }
  m_log("Done 'MemoryTest_Float32Arrays_ReuseClasses':" + (performance.now() - start));
  // Results: Chrome spikes to 1.32 Gigs of Ram. Settling down to 1.3Gigs after a minute.
  // Takes ~528 Ms.
});


testingHarness.registerTest('MemoryTest_Float32ArraysContiguous', (domElement, resources) => {
  const Z = ZeaEngine;
  const start = performance.now();
  window.data = new Float32Array(10 * count);
  m_log("Done 'MemoryTest_Float32ArraysContiguous':" + (performance.now() - start));
  // Results: Chrome spikes to 1.09 Gigs of Ram. Settling down to 1.02Gigs after a minute.
  // Takes ~11 Ms.
});

testingHarness.registerTest('MemoryTest_GeomItemsArray', (domElement, resources) => {
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
  m_log("Done 'MemoryTest_GeomItemsArray':" + (performance.now() - start));

  let index = 0
  for(let i=0; i<count0; i++) {
    for(let j=0; j<count; j+=(count/10)) {
      m_log(`${i}.${j}:${times[index]}`);
      index++;
    }
  }

  // == Pre-multiple Inheritance ==
  //  Results: Chrome spikes to ~ 4 Gigs of Ram. Settling down to 3.0 Gigs after a minute.
  // Takes ~77000 Ms.

  // Results: Chrome spikes to 2.34 Gigs of Ram. Settling down to 2.3Gigs after a minute.
  // Takes ~2038 Ms.
});
