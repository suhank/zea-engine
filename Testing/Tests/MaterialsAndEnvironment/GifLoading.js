﻿
class GIFSurfaceShader extends ZeaEngine.GLShader {
    constructor(gl) {
        super(gl);

        this.__shaderStages['VERTEX_SHADER'] = ZeaEngine.shaderLibrary.parseShader('GIFSurfaceShader.vertexShader', `
precision highp float;

attribute vec3 positions;
#ifdef ENABLE_TEXTURES
attribute vec2 texCoords;
#endif

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

<%include file="stack-gl/transpose.glsl"/>
<%include file="drawItemId.glsl"/>
<%include file="drawItemTexture.glsl"/>
<%include file="modelMatrix.glsl"/>

/* VS Outputs */
varying vec4 v_viewPos;
#ifdef ENABLE_TEXTURES
varying vec2 v_texCoords;
#endif


void main(void) {
    int drawItemId = getDrawItemId();
    mat4 modelMatrix = getModelMatrix(drawItemId);
    mat4 modelViewMatrix = viewMatrix * modelMatrix;

    v_viewPos = (modelViewMatrix * vec4(positions, 1.0));
    gl_Position = projectionMatrix * v_viewPos;

    v_texCoords = texCoords;
    v_texCoords.y = 1.0 - v_texCoords.y;// Flip y
}
`);

        this.__shaderStages['FRAGMENT_SHADER'] = ZeaEngine.shaderLibrary.parseShader('GIFSurfaceShader.fragmentShader', `
precision highp float;

<%include file="stack-gl/gamma.glsl"/>
<%include file="materialparams.glsl"/>
<%include file="utils/ImageStream.glsl"/>

uniform color BaseColor;

#ifdef ENABLE_TEXTURES
uniform sampler2D BaseColorTex;
uniform int BaseColorTexType;
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
    vec4 baseColor = BaseColor;
    if(BaseColorTexType > 0)
        baseColor      = toLinear(sampleStreamFrame(v_texCoords, BaseColorTexIndex, BaseColorTex, BaseColorTexDesc));
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
        paramDescs.push({ name: 'BaseColor', defaultValue: new ZeaEngine.Color(1.0, 0.0, 0.5) }); 
        return paramDescs;
    }

    static isTransparent() {
        return true;
    }
    
    bind(renderstate, key) {
        if (renderstate.pass != 'ADD')
            return false;
        return super.bind(renderstate, key);
    }
};

ZeaEngine.Registry.register('GIFSurfaceShader', GIFSurfaceShader);

testingHarness.registerTest('MaterialsAndEnvironment/GifLoading', (domElement, resources)=> {
    const Z = ZeaEngine;

    // giffPath = "Assets/Progress.gif";
    // giffPath = "Assets/loading.gif";
    // giffPath = "Assets/chuck-norris-super-kick.gif";

    const scene = new Z.Scene(resources);
    
    scene.setupGrid(60.0, 6);

    const setupGifPlayers = (name, pos)=>{

        const image =  new Z.GIFImage();
        image.getParameter('FilePath').setUrl("Assets/" + name);
        const treeItem = new Z.TreeItem(image.getName());

        const atlasmaterial = new Z.Material('mat', 'FlatSurfaceShader');
        atlasmaterial.getParameter('BaseColor').setImage(image);

        const geomItem1 = new Z.GeomItem('geomItem1', new Z.Plane(5.0, 3.0), atlasmaterial);
        geomItem1.setLocalXfo(new Z.Xfo(pos.add(new Z.Vec3(0, -3, 0))));
        treeItem.addChild(geomItem1);

        const gifmaterial = new Z.Material('mat', 'GIFSurfaceShader');
        gifmaterial.getParameter('BaseColor').setImage(image);

        const geomItem2 = new Z.GeomItem('geomItem2', new Z.Plane(5.0, 3.0), gifmaterial);
        geomItem2.setLocalXfo(new Z.Xfo(pos.add(new Z.Vec3(0, 1, 0))))
        treeItem.addChild(geomItem2);

        image.play();


        scene.getRoot().addChild(treeItem);

    }
    setupGifPlayers("lg.colorful-progress-loader.gif", new Z.Vec3(-6, 0, 0))
    setupGifPlayers("arrowGif.gif", new Z.Vec3(0, 0, 0))
    setupGifPlayers("transparency.gif", new Z.Vec3(6, 0, 0))



    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(12,18,8), new Z.Vec3(0,0,0));
    renderer.setScene(scene);



    renderer.resumeDrawing();

});
