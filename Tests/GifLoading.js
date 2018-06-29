
class GIFSurfaceShader extends Visualive.GLShader {
    constructor(gl) {
        super(gl);

        this.__shaderStages['VERTEX_SHADER'] = Visualive.shaderLibrary.parseShader('GIFSurfaceShader.vertexShader', `
precision highp float;

attribute vec3 positions;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec4 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_texCoords;
#endif


void main(void) {
    mat4 modelMatrix = getModelMatrix();
    mat4 modelViewMatrix = viewMatrix * modelMatrix;

    v_viewPos = (modelViewMatrix * vec4(positions, 1.0));
    gl_Position = projectionMatrix * v_viewPos;

    v_texCoords = texCoords;
    v_texCoords.y = 1.0 - v_texCoords.y;// Flip y
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = Visualive.shaderLibrary.parseShader('GIFSurfaceShader.fragmentShader', `
precision highp float;

<%include file="stack-gl/gamma.glsl"/>
<%include file="materialparams.glsl"/>
<%include file="utils/ImageStream.glsl"/>

uniform color BaseColor;

#ifdef ENABLE_TEXTURES
uniform sampler2D BaseColorTex;
// uniform bool BaseColorTexConnected;
uniform vec4 BaseColorTexDesc;
uniform int BaseColorTexIndex;
#endif

/* VS Outputs */
varying vec4 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_texCoords;
#endif


#ifdef ENABLE_ES3
    out vec4 fragColor;
#endif

void main(void) {

#ifndef ENABLE_TEXTURES
    vec4 baseColor = BaseColor;
#else
    //vec4 baseColor      = getColorParamValue(BaseColor, BaseColorTex, BaseColorTexConnected, v_texCoords);
    // vec4 baseColor      = toLinear(texture2D(BaseColorTex, v_texCoords));
    vec4 baseColor      = toLinear(sampleStreamFrame(v_texCoords, BaseColorTexIndex, BaseColorTex, BaseColorTexDesc));
#endif

    baseColor.rgb = baseColor.rgb * baseColor.a;

#ifndef ENABLE_ES3
    vec4 fragColor;
#endif
    fragColor = baseColor;


#ifdef ENABLE_INLINE_GAMMACORRECTION
    fragColor.rgb = toGamma(fragColor.rgb);
#endif

#ifndef ENABLE_ES3
    gl_FragColor = fragColor;
#endif

}
`);

        this.nonSelectable = true;
        this.finalize();
    }

    static getParamDeclarations() {
        const paramDescs = super.getParamDeclarations();
        paramDescs.push({ name: 'BaseColor', defaultValue: new Visualive.Color(1.0, 1.0, 0.5) }); 
        return paramDescs;
    }

    isTransparent() {
        return true;
    }
    
    bind(renderstate, key) {
        if (renderstate.pass != 'ADD')
            return false;
        return super.bind(renderstate, key);
    }
};

Visualive.sgFactory.registerClass('GIFSurfaceShader', GIFSurfaceShader);

testingHarness.registerTest('GifLoading', (domElement, resources)=> {

    // giffPath = "Assets/Progress.gif";
    // giffPath = "Assets/loading.gif";
    // giffPath = "Assets/chuck-norris-super-kick.gif";

    const scene = new Visualive.Scene(resources);
    const setupGifPlayers = (path, pos)=>{

        const image =  new Visualive.FileImage(path);
        const treeItem = new Visualive.TreeItem(image.getName());

        // Check that the gif is loaded only once.
        const image2 =  new Visualive.FileImage(path);

        const atlasmaterial = new Visualive.Material('mat', 'FlatSurfaceShader');
        atlasmaterial.getParameter('BaseColor').setValue(image);

        const geomItem1 = new Visualive.GeomItem('geomItem1', new Visualive.Plane(5.0, 3.0), atlasmaterial);
        geomItem1.setLocalXfo(new Visualive.Xfo(pos.add(new Visualive.Vec3(0, -3, 0))));
        treeItem.addChild(geomItem1);

        const gifmaterial = new Visualive.Material('mat', 'GIFSurfaceShader');
        gifmaterial.getParameter('BaseColor').setValue(image);

        const geomItem2 = new Visualive.GeomItem('geomItem2', new Visualive.Plane(5.0, 3.0), gifmaterial);
        geomItem2.setLocalXfo(new Visualive.Xfo(pos.add(new Visualive.Vec3(0, 1, 0))))
        treeItem.addChild(geomItem2);


        const gifmaterial2 = new Visualive.Material('mat', 'GIFSurfaceShader');
        gifmaterial2.getParameter('BaseColor').setValue(image2);

        const geomItem3 = new Visualive.GeomItem('geomItem3', new Visualive.Plane(5.0, 3.0), gifmaterial2);
        geomItem3.setLocalXfo(new Visualive.Xfo(pos.add(new Visualive.Vec3(0, 4, 0))));
        treeItem.addChild(geomItem3);

        let frame = 0;
        let param1 = image.getParameter('StreamAtlasIndex');
        let incrementingValue = true;
        let incrementFrame = () => {
            param1.setValue(frame);
            if(incrementingValue)
                setTimeout(incrementFrame, image.getFrameDelay(frame));
            frame = (frame+1) % param1.getRange()[1];
        }
        incrementFrame();

        let param2 = image2.getParameter('StreamAtlasIndex');
        let frame2 = 0;
        let incrementFrame2 = () => {
            incrementingValue = true;
            param2.setValue(frame2);
            if(incrementingValue)
                setTimeout(incrementFrame2, image.getFrameDelay(frame));
            frame2 = (frame2+1) % param2.getRange()[1];
        }
        incrementFrame2();

        scene.getRoot().addChild(treeItem);

    }
    setupGifPlayers("Assets/lg.colorful-progress-loader.gif", new Visualive.Vec3(-3, 0, 0))
    setupGifPlayers("Assets/arrowGif.gif", new Visualive.Vec3(3, 0, 0))



    const renderer = new Visualive.GLVisualiveRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2,8,12), new Visualive.Vec3(0,0,0));
    renderer.setScene(scene);



    renderer.resumeDrawing();


    //////////////////////////////////
    // Setup the UI

    // let sliderController1 = new Visualive.SliderController(param1);
    // let sliderController2 = new Visualive.SliderController(param2);

    // let widgetPanel = new Visualive.UIWidgetPanel();
    // widgetPanel.addWidgetController(sliderController1);
    // widgetPanel.addWidgetController(sliderController2);

    // let uicontroller = new Visualive.UIController();
    // uicontroller.addWidgetPanel(widgetPanel);

    // VisualiveUI.renderUI(renderer, uicontroller);
});
