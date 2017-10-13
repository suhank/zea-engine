
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
#extension GL_OES_standard_derivatives : enable
precision highp float;

<%include file="stack-gl/gamma.glsl"/>
<%include file="materialparams.glsl"/>
<%include file="utils/ImageStream.glsl"/>

// uniform color _baseColor;

#ifdef ENABLE_TEXTURES
uniform sampler2D _baseColorTex;
// uniform bool _baseColorTexConnected;
uniform vec4 _baseColorTexDesc;
uniform int _baseColorTexIndex;
#endif

/* VS Outputs */
varying vec4 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_texCoords;
#endif


void main(void) {

#ifndef ENABLE_TEXTURES
    vec4 baseColor = _baseColor;
#else
    //vec4 baseColor      = getColorParamValue(_baseColor, _baseColorTex, _baseColorTexConnected, v_texCoords);
    // vec4 baseColor      = toLinear(texture2D(_baseColorTex, v_texCoords));
    vec4 baseColor      = toLinear(sampleStreamFrame(v_texCoords, _baseColorTexIndex, _baseColorTex, _baseColorTexDesc));
#endif

    baseColor.rgb = baseColor.rgb * baseColor.a;

    gl_FragColor = baseColor;


#ifdef ENABLE_INLINE_GAMMACORRECTION
    gl_FragColor.rgb = toGamma(gl_FragColor.rgb);
#endif

}
`);

        this.addParameter('baseColor', new Visualive.Color(1.0, 1.0, 0.5));
        this.nonSelectable = true;
        this.finalize();
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
    giffPath = "Assets/lg.colorful-progress-loader.gif";
    // giffPath = "Assets/loading.gif";
    // giffPath = "Assets/chuck-norris-super-kick.gif";

    let scene = new Visualive.Scene(resources);
    let image =  new Visualive.FileImage2D(giffPath, scene.getResourceLoader());

    let atlasmaterial = new Visualive.Material('mat', 'FlatSurfaceShader');
    atlasmaterial.addParameter('baseColor', image);

    let geomItem1 = new Visualive.GeomItem('geomItem1', new Visualive.Plane(5.0, 3.0), atlasmaterial);
    geomItem1.getLocalXfo().tr.set(-3, 2, 0);
    // geomItem1.getLocalXfo().ori.setFromAxisAndAngle(new Visualive.Vec3(0, 1, 0), Math.PI * 0.5);
    scene.getRoot().addChild(geomItem1);
    // geomItem2.updateGlobalXfo();


    let gifmaterial = new Visualive.Material('mat', 'GIFSurfaceShader');
    gifmaterial.addParameter('baseColor', image);

    let geomItem2 = new Visualive.GeomItem('geomItem2', new Visualive.Plane(5.0, 3.0), gifmaterial);
    geomItem2.getLocalXfo().tr.set(3, 2, 0);
    // geomItem.getLocalXfo().ori.setFromAxisAndAngle(new Visualive.Vec3(0, 1, 0), Math.PI * 0.5);
    scene.getRoot().addChild(geomItem2);
    // geomItem2.updateGlobalXfo();


    let renderer = new Visualive.GLVisualiveRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(5,2,5), new Visualive.Vec3(0,2,0));
    renderer.setScene(scene);

    let frame = 0;
    let param = image.getParameter('StreamAtlasIndex');
    let incrementingValue = false;
    let incrementFrame = () => {
        frame++;
        incrementingValue = true;
        param.setValue(frame % param.getRange()[1]);
        incrementingValue = false;
    }
    let id = setInterval(incrementFrame, 50);
    param.valueChanged.connect(()=>{
        if(!incrementingValue) {
            clearInterval(id);
        }
    });

    renderer.resumeDrawing();


    //////////////////////////////////
    // Setup the UI

    let sliderController = new Visualive.SliderController(param);

    let widgetPanel = new Visualive.UIWidgetPanel();
    widgetPanel.addWidgetController(sliderController);

    let uicontroller = new Visualive.UIController();
    uicontroller.addWidgetPanel(widgetPanel);

    VisualiveUI.renderUI(renderer, uicontroller);
});
