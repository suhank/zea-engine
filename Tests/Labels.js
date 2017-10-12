
var Labels = (domElement, resources)=> {
    
    const scene = new Visualive.Scene(resources);

    const asset = new Visualive.TreeItem('labels');
    scene.getRoot().addChild(asset);

    const linesMaterial = new Visualive.Material('LabelLinesMaterial', 'LinesShader');
    linesMaterial.addParameter('color', new Visualive.Color(.7, .7, .7));

    let index = 0;
    const addLabel = (basePose, pos, color, text)=> {
        const label = new Visualive.Label(text);
        label.getParameter('fontSize').setValue(48);
        label.getParameter('fontColor').setValue(color);
        const billboard = new Visualive.BillboardItem('billboard'+index, label);
        const xfo = new Visualive.Xfo(pos);
        billboard.setLocalXfo(xfo);
        billboard.getParameter('scale').setValue(3.5);
        billboard.getParameter('flags').setValue(1);
        billboard.getParameter('alpha').setValue(0.1);
        // billboard.getParameter('color').setValue(new Visualive.Color(.53, 1.0, .53));
        scene.getRoot().addChild(billboard);


        const line = new Visualive.Lines();
        line.setNumVertices(2);
        line.setNumSegments(1);
        line.setSegment(0, 0, 1);
        line.setVertex(1, basePose.subtract(pos));
        const lineItem = new Visualive.GeomItem('Line', line, linesMaterial);

        billboard.addChild(lineItem);


        const timeoutId = setTimeout(() => {
            console.log(label.getParameter('text').getValue() + ": changed");
            billboard.getParameter('alpha').setValue(1.0);
        }, (0.5 + Math.random()) * 2000);

        index++;
    }
    addLabel(new Visualive.Vec3(1, 0, 0), new Visualive.Vec3(1, 1, 1), new Visualive.Color(0, 1, 0), "Short Text...");
    addLabel(new Visualive.Vec3(-1, 0, 0), new Visualive.Vec3(-3, 1, -2), new Visualive.Color(1, 1, 0), "Label text can be long and have spaces");


    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(10, 6, 12), new Visualive.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.setupGrid(20, new Visualive.Color(0.2, 0.2, 0.2), 10, 0);
    renderer.resumeDrawing();

    //////////////////////////////////
    // Setup the UI
    const uicontroller = new Visualive.UIController();
    VisualiveUI.renderUI(renderer, uicontroller);
}