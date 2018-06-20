import {
    Vec3,
    Xfo,
    Color
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    SystemDesc
} from '../BrowserDetection.js';
import {
    onResize
} from '../external/onResize.js';
import {
    TreeItem,
    GeomItem,
    Lines,
    Mesh,
    Grid,
    Material,
    ValueSetMode
} from '../SceneTree';
import {
    create3DContext
} from './GLContext.js';
import {
    GLScreenQuad
} from './GLScreenQuad.js';
import {
    GLCollector
} from './GLCollector.js';
import {
    GLGeomDataPass
} from './Passes/GLGeomDataPass.js';
import {
    GL2DOverlayPass
} from './Passes/GL2DOverlayPass.js';
import {
    GLForwardPass
} from './Passes/GLForwardPass.js';
import {
    GLTransparencyPass
} from './Passes/GLTransparencyPass.js';
import {
    GLBillboardsPass
} from './Passes/GLBillboardsPass.js';
import {
    GizmoPass
} from './Passes/GizmoPass.js';
import {
    GizmoContext
} from './Gizmos/GizmoContext.js';
import {
    GLViewport
} from './GLViewport.js';
import {
    GLMesh
} from './GLMesh.js';
import {
    GLLines
} from './GLLines.js';
import {
    GLTexture2D
} from './GLTexture2D.js';
import {
    GLShader
} from './GLShader.js';
import {
    GLMaterial
} from './GLMaterial.js';
import {
    GLDrawItem
} from './GLDrawItem.js';
import {
    VRViewport
} from './VR/VRViewport.js';


let activeGLRenderer = undefined;
let mouseIsDown = false;
let mouseLeft = false;
// Hack to see if the code is running in node.js.
// This is beause in node, we have no 'window', so this code should not run. 
if (process === 'undefined' || process.browser == true) {
    let onWheel = function(event) {
        if (activeGLRenderer) {
            activeGLRenderer.onWheel(event);
            event.preventDefault();
            event.stopPropagation();
        }
        return false;
    }
    if (window.addEventListener)
    /** DOMMouseScroll is for mozilla. */
        window.addEventListener('DOMMouseScroll', onWheel, false);
    /** IE/Opera. */
    window.onmousewheel = document.onmousewheel = onWheel;
    window.oncontextmenu = function() {
        return false;
    }
}

class GLRenderer {
    constructor(canvasDiv, options = {}, webglOptions = {}) {
        this.__drawItems = [];
        this.__drawItemsIndexFreeList = [];
        this.__geoms = [];
        this.__shaders = {};
        this.__passes = [];
        this.__viewports = [];
        this.__activeViewport = undefined;
        this.__continuousDrawing = false;
        this.__redrawRequested = false;
        this.__supportVR = options.supportVR !== undefined ? options.supportVR : true;
        this.__isMobile = SystemDesc.isMobileDevice;

        this.__drawSuspensionLevel = 1;
        this.__shaderDirectives = {};
        this.__preproc = { };

        this.__vrViewport = undefined;
        this.mirrorVRisplayToViewport = true;

        // Function Bindings.
        this.requestRedraw = this.requestRedraw.bind(this);

        this.__collector = new GLCollector(this);

        this.resized = new Signal();
        this.keyPressed = new Signal();
        this.sceneSet = new Signal(true);
        this.vrViewportSetup = new Signal(true);
        this.sessionClientSetup = new Signal(true);

        // Signals to abstract the user view. 
        // i.e. when a user switches to VR mode, the signals 
        // simply emit the new VR data.
        this.viewChanged = new Signal();
        this.pointerMoved = new Signal();
        this.redrawOccured = new Signal();
        this.treeItemGlobalXfoChanged = new Signal();

        // Stroke Signals
        this.actionStarted = new Signal();
        this.actionEnded = new Signal();
        this.actionOccuring = new Signal();

        this.setupWebGL(canvasDiv, webglOptions);


        // this.__geomDataPass = new GLGeomDataPass(this.__gl, this.__collector, this.__floatGeomBuffer);
        // this.__gizmoPass = new GizmoPass(this.__collector);
        // this.__gizmoContext = new GizmoContext(this);

        this.addPass(new GL2DOverlayPass(this.__gl, this.__collector));
        this.addPass(new GLForwardPass(this.__gl, this.__collector));
        this.addPass(new GLTransparencyPass(this.__gl, this.__collector));
        this.addPass(new GLBillboardsPass(this));

        // Note: Audio contexts have started taking a long time to construct
        // (Maybe a regresion in Chrome?)
        // Setup the Audio context.
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.__audioCtx = new AudioContext();
        this.viewChanged.connect(this.__updateListenerPosition.bind(this));
        


        this.addViewport('main');

    }

    addShaderPreprocessorDirective(name, value) {
        if(value)
            this.__shaderDirectives[name] = '#define ' + name + " = " + value;
        else 
            this.__shaderDirectives[name] = '#define ' + name;
        const directives = [];
        for(const key in this.__shaderDirectives) {
            directives.push(this.__shaderDirectives[key]);
        }
        this.__preproc.defines = directives.join('\n')+'\n';
        this.__gl.shaderopts = this.__preproc
    }


    getShaderPreproc() {
        return this.__preproc;
    }


    getWidth() {
        return this.__glcanvas.width;
    }

    getHeight() {
        return this.__glcanvas.height;
    }

    getCollector() {
        return this.__collector;
    }

    getAudioContext() {
        return this.__audioCtx;
    }

    // getGeomDataPass() {
    //     return this.__geomDataPass;
    // }

    setupGrid(gridSize, gridColor, resolution, lineThickness) {
        this.__gridTreeItem = new TreeItem('GridTreeItem');

        const gridMaterial = new Material('gridMaterial', 'LinesShader');
        gridMaterial.getParameter('color').setValue(gridColor, ValueSetMode.DATA_LOAD);
        const grid = new Grid(gridSize, gridSize, resolution, resolution, true);
        this.__gridTreeItem.addChild(new GeomItem('GridItem', grid, gridMaterial));

        const axisLine = new Lines();
        axisLine.setNumVertices(2);
        axisLine.setNumSegments(1);
        axisLine.setSegment(0, 0, 1);
        axisLine.getVertex(0).set(gridSize * -0.5, 0.0, 0.0);
        axisLine.getVertex(1).set(gridSize * 0.5, 0.0, 0.0);

        const gridXAxisMaterial = new Material('gridXAxisMaterial', 'LinesShader');
        gridXAxisMaterial.getParameter('color').setValue(new Color(gridColor.luminance(), 0, 0), ValueSetMode.DATA_LOAD);
        this.__gridTreeItem.addChild(new GeomItem('xAxisLineItem', axisLine, gridXAxisMaterial));

        const gridZAxisMaterial = new Material('gridZAxisMaterial', 'LinesShader');
        gridZAxisMaterial.getParameter('color').setValue(new Color(0, gridColor.luminance(), 0), ValueSetMode.DATA_LOAD);
        const geomOffset = new Xfo();
        geomOffset.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.5);
        const zAxisLineItem = new GeomItem('zAxisLineItem', axisLine, gridZAxisMaterial);
        zAxisLineItem.setGeomOffsetXfo(geomOffset);
        this.__gridTreeItem.addChild(zAxisLineItem);

        this.__gridTreeItem.setSelectable(false, true);
        this.__collector.addTreeItem(this.__gridTreeItem);

        return this.__gridTreeItem;
    }

    toggleDrawGrid() {
        this.__gridItem.visible = !this.__gridItem.visible;
        this.requestRedraw();
    }

    ////////////////////////////////////////
    // Scene

    getScene() {
        return this.__scene;
    }

    setScene(scene) {
        this.__scene = scene;
        this.__collector.addTreeItem(this.__scene.getRoot());

        if (this.__gizmoContext)
            this.__gizmoContext.setSelectionManager(scene.getSelectionManager());

        this.__scene.getRoot().treeItemGlobalXfoChanged.connect(this.treeItemGlobalXfoChanged.emit);

        if (this.supportsVR())
            this.__setupVRViewport();
        
        this.sceneSet.emit(this.__scene);
    }

    addViewport(name) {
        let vp = new GLViewport(this, name, this.getWidth(), this.getHeight());
        vp.updated.connect(() => {
            this.requestRedraw();
        });

        // if(this.__geomDataPass){
            vp.createGeomDataFbo(this.__floatGeomBuffer);
        // }

        vp.viewChanged.connect((data) => {
            this.viewChanged.emit(data);
        });
        vp.mouseMoved.connect((event, mousePos, ray) => {
            this.pointerMoved.emit({
                mousePos: mousePos,
                ray: ray
            });
        });
        vp.actionStarted.connect((data) => {
            this.actionStarted.emit(data);
        });
        vp.actionEnded.connect((data) => {
            this.actionEnded.emit(data);
        });
        vp.actionOccuring.connect((data) => {
            this.actionOccuring.emit(data);
        });

        this.__viewports.push(vp);
        return vp;
    }

    getViewport(index = 0) {
        return this.__viewports[index];
    }

    getViewportAtPos(offsetX, offsetY) {
        for (let vp of this.__viewports) {
            let x = vp.getPosX();
            let y = vp.getPosY();
            let width = vp.getWidth();
            let height = vp.getHeight();
            if (offsetX >= x && offsetY >= y && offsetX <= width + x && offsetY <= height + y)
                return vp;
        }
        return undefined;
    }

    __updateListenerPosition(data) {
        if(!this.__audioCtx)
            return;
        const listener = this.__audioCtx.listener;
        const viewXfo = data.viewXfo;
        if(listener.positionX) {
            listener.positionX.value = viewXfo.tr.x;
            listener.positionY.value = viewXfo.tr.y;
            listener.positionZ.value = viewXfo.tr.z;
        } else {
            listener.setPosition(viewXfo.tr.x, viewXfo.tr.y, viewXfo.tr.z);
        }

        const fw = viewXfo.ori.getZaxis().negate();
        if(listener.forwardX) {
          listener.forwardX.value = fw.x;
          listener.forwardY.value = fw.y;
          listener.forwardZ.value = fw.z;
        } else {
            const ydir = viewXfo.ori.getYaxis();
            listener.setOrientation(fw.x, fw.y, fw.z, ydir.x, ydir.y, ydir.z);
        }
    }

    activateViewport(vp) {

        if(this.__activeViewport == vp) 
            return;

        this.__activeViewport = vp;

        this.__updateListenerPosition({
            viewXfo: vp.getCamera().getGlobalXfo()
        });
    }

    activateViewportAtPos(offsetX, offsetY) {
        if (this.__vrViewport && this.__vrViewport.isPresenting())
            return this.__vrViewport;
        this.activateViewport(this.getViewportAtPos(offsetX, offsetY));
        return this.__activeViewport;
    }

    getActiveViewport() {
        if (this.__vrViewport && this.__vrViewport.isPresenting())
            return this.__vrViewport;
        return this.__activeViewport;
    }

    suspendDrawing() {
        this.__drawSuspensionLevel++;
    }

    resumeDrawing() {
        this.__drawSuspensionLevel--;
        if (this.__drawSuspensionLevel == 0) {
            if (this.__loadingImg)
                this.__glcanvasDiv.removeChild(this.__loadingImg);

            this.renderGeomDataFbos();
            this.requestRedraw();
        }
    }

    renderGeomDataFbos() {
        const onAnimationFrame = () => {
            for (let vp of this.__viewports)
                vp.renderGeomDataFbo();
        }
        window.requestAnimationFrame(onAnimationFrame);
    }


    /////////////////////////
    // Renderer Setup

    get gl() {
        return this.__gl;
    }

    getGL() {
        return this.__gl;
    }

    __onResize() {
        let vrVieportPresenting = false;
        if (this.__vrViewport && this.__vrViewport.isPresenting()) {
            var hmdCanvasSize = this.__vrViewport.getHMDCanvasSize();
            this.__glcanvas.width = hmdCanvasSize[0];
            this.__glcanvas.height = hmdCanvasSize[1];
            vrVieportPresenting = true;
        } else {
            // Emulate the Vive HMD resolution.
            // this.__glcanvas.width = 2160;
            // this.__glcanvas.height = 1200;
            this.__glcanvas.width = this.__glcanvas.offsetWidth;
            this.__glcanvas.height = this.__glcanvas.offsetHeight;

            this.__onResizeViewports();
            this.resized.emit(this.__glcanvas.width, this.__glcanvas.height)
            this.requestRedraw();
        }

    }

    __onResizeViewports() {
        for (let vp of this.__viewports)
            vp.resize(this.__glcanvas.width, this.__glcanvas.height);
    }

    getDiv() {
        return this.__glcanvasDiv;
    }

    setupWebGL(canvasDiv, webglOptions) {

        this.__glcanvas = document.createElement('canvas');
        this.__glcanvas.style.width = '100%';
        this.__glcanvas.style.height = '100%';
        this.__glcanvasDiv = canvasDiv;
        this.__glcanvasDiv.appendChild(this.__glcanvas);

        onResize(canvasDiv, (event) => {
            this.__onResize();
        });
        this.__onResize();

        webglOptions.preserveDrawingBuffer = true;
        webglOptions.stencil = webglOptions.stencil ? webglOptions.stencil : false;
        webglOptions.alpha = webglOptions.alpha ? webglOptions.alpha : false;
        this.__gl = create3DContext(this.__glcanvas, webglOptions);
        this.__gl.renderer = this;

        if(this.__gl.name == 'webgl2') {
            this.addShaderPreprocessorDirective('ENABLE_ES3');
        }
        if(this.__gl.floatTexturesSupported) {
            this.addShaderPreprocessorDirective('ENABLE_FLOAT_TEXTURES');
        }

        this.__gl.screenQuad = new GLScreenQuad(this.__gl, this.__preproc);
        this.__screenQuad = this.__gl.screenQuad;


        // Note: using the geom data pass crashes VR scenes.
        
        this.__floatGeomBuffer = true;//((browserDesc.browserName == "Chrome") || (browserDesc.browserName == "Firefox")) && !isMobile;
        // Note: the following returns UNSIGNED_BYTE even if the browser supports float.
        // const implType = this.__gl.getParameter(this.__gl.IMPLEMENTATION_COLOR_READ_TYPE);
        // this.__floatGeomBuffer = (implType == this.__gl.FLOAT);


        ////////////////////////////////////
        // Bind a default texture.
        // Note: if shaders have sampler2D uniforms, but we don't bind textures, then
        // they get assigned texture0. If we have no textures bound at all, then 
        // we get warnings saying.
        // there is no texture bound to the unit 0
        // Bind a default texture to unit 0 simply to avoid these warnings.
        this.__texture0 = new GLTexture2D(this.__gl, {
            format: 'RGB',
            type: 'UNSIGNED_BYTE',
            width: 1,
            height: 1,
            filter: 'NEAREST',
            mipMapped: false,
            wrap: 'CLAMP_TO_EDGE',
            data: new Uint8Array(3)
        });

        // gl.activeTexture(this.__gl.TEXTURE0);
        this.__gl.bindTexture(this.__gl.TEXTURE_2D, this.__texture0.getTexHdl());

        //////////////////////////////////
        // Setup event handlers

        const isValidCanvas = ()=> {  
            return this.__glcanvasDiv.offsetWidth > 0 && this.__glcanvasDiv.offsetHeight;
        }

        const calcRendererCoords = (event)=>{
            var rect = this.__glcanvasDiv.getBoundingClientRect();
            event.rendererX = (event.clientX - rect.left);
            event.rendererY = (event.clientY - rect.top);
        }

        this.__glcanvas.addEventListener('mouseenter', (event) => {
            if (!mouseIsDown) {
                activeGLRenderer = this;
                calcRendererCoords(event);
                // TODO: Check mouse pos.
                activeGLRenderer.activateViewportAtPos(event.rendererX, event.rendererY);
                mouseLeft = false;
            }
            event.stopPropagation();
        });
        this.__glcanvas.addEventListener('mouseleave', (event) => {
            if (!mouseIsDown) {
                activeGLRenderer = undefined;
            } else {
                mouseLeft = true;
            }
            event.stopPropagation();
        });
        this.__glcanvas.addEventListener('mousedown', (event) => {
            calcRendererCoords(event);
            mouseIsDown = true;
            activeGLRenderer = this;
            activeGLRenderer.activateViewportAtPos(event.rendererX, event.rendererY);
            const vp = activeGLRenderer.getActiveViewport();
            if (vp) {
                vp.onMouseDown(event);
                event.preventDefault();
            }
            mouseLeft = false;
            event.stopPropagation();
            return false;
        });
        document.addEventListener('mouseup', (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            // if(mouseIsDown && mouseMoveDist < 0.01)
            //     mouseClick(event);
            calcRendererCoords(event);
            mouseIsDown = false;
            const vp = activeGLRenderer.getActiveViewport();
            if (vp) {
                vp.onMouseUp(event);
                event.preventDefault();
            }
            if (mouseLeft)
                activeGLRenderer = undefined;
            event.stopPropagation();
            return false;
        });


        // document.addEventListener('dblclick', (event)=>{
        //     event.preventDefault();
        //     event.stopPropagation();
        // });
        // document.addEventListener('click', (event)=>{
        //     event.preventDefault();
        //     event.stopPropagation();
        // });

        document.addEventListener('mousemove', (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            calcRendererCoords(event);
            if (!mouseIsDown)
                activeGLRenderer.activateViewportAtPos(event.rendererX, event.rendererY);

            const vp = activeGLRenderer.getActiveViewport();
            if (vp) {
                vp.onMouseMove(event);
                event.preventDefault();
            }
            event.stopPropagation();
            return false;
        });
        document.addEventListener('keypress', (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            const key = String.fromCharCode(event.keyCode).toLowerCase();
            const vp = activeGLRenderer.getActiveViewport();
            if (!vp || !vp.onKeyPressed(key, event)) {
                this.onKeyPressed(key, event);
                event.stopPropagation();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            const key = String.fromCharCode(event.keyCode).toLowerCase();
            const vp = activeGLRenderer.getActiveViewport();
            if (!vp || !vp.onKeyDown(key, event)) {
                this.onKeyDown(key, event);
                event.stopPropagation();
            }
        });
        document.addEventListener('keyup', (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            const key = String.fromCharCode(event.keyCode).toLowerCase();
            const vp = activeGLRenderer.getActiveViewport();
            if (!vp || !vp.onKeyUp(key, event)) {
                this.onKeyUp(key, event);
                event.stopPropagation();
            }
        });

        this.__glcanvas.addEventListener("touchstart", (event) => {
            this.getViewport().onTouchStart(event);
            event.stopPropagation();
        }, false);
        this.__glcanvas.addEventListener("touchmove", (event) => {
            this.getViewport().onTouchMove(event);
            event.stopPropagation();
        }, false);
        this.__glcanvas.addEventListener("touchend", (event) => {
            this.getViewport().onTouchEnd(event);
            event.stopPropagation();
        }, false);
        this.__glcanvas.addEventListener("touchcancel", (event) => {
            this.getViewport().onTouchCancel(event);
            event.stopPropagation();
        }, false);
    }

    getGLCanvas() {
        return this.__glcanvas;
    }

    getScreenQuad() {
        return this.__screenQuad;
    }

    onKeyPressed(key, event) {
        this.keyPressed.emit(key, event);

        // If running in electron, avoid handling hotkeys..
        if (window.process === undefined || process.browser == true) {
            switch (key) {
            case 'f':
                let selection = scene.getSelectionManager().selection;
                if (selection.size == 0)
                    this.__viewport.getCamera().frameView([scene.getRoot()]);
                else
                    this.__viewport.getCamera().frameView(selection);
                break;
            case 'p':
                if(event.shiftKey)
                    this.toggleContinuousDrawing();
                break;
            case 'g':
                if(event.altKey)
                    this.__canvasDiv.requestFullscreen();
                break;
            case 'v':
                if (this.__vrViewport && this.__vrViewport.isPresenting())
                    this.mirrorVRisplayToViewport = !this.mirrorVRisplayToViewport;
                break;
            }
        }
        this.requestRedraw();
    }

    onKeyDown(key, event) {

    }
    onKeyUp(key, event) {

    }

    onWheel(event) {
        this.__viewports[0].onWheel(event);
    }

    frameAll(viewportIndex = 0) {
        this.__viewports[viewportIndex].frameView([this.__scene.getRoot()]);
    }

    /////////////////////////
    // Render Items setup

    addPass(pass) {

        // Add any items to the pass that meet the filter. 
        // for (let drawItem of this.__drawItems) {
        //     if (drawItem && pass.filter(drawItem.geomItem))
        //         pass.addDrawItem(drawItem);
        // }
        pass.updated.connect(this.requestRedraw.bind(this));
        pass.setPassIndex(this.__passes.length);
        this.__passes.push(pass);
        this.requestRedraw();
        return this.__passes.length - 1;
    }

    removePass(pass) {
        let index = this.__passes.indexOf(pass);
        this.__passes.splice(index, 1);
        this.requestRedraw();
    }

    getPass(index) {
        return this.__passes[index];
    }

    getGizmoPass() {
        return this.__gizmoPass;
    }

    /////////////////////////
    // VR Setup

    supportsVR() {
        return this.__supportVR && navigator.getVRDisplays != null;
    }

    __setupVRViewport() {
        return navigator.getVRDisplays().then((displays) => {
            if (displays.length > 0) {
                // Always get the last display. Additional displays are added at the end.(Polyfill, HMD)
                let vrvp = new VRViewport(this, displays[displays.length-1]);

                vrvp.presentingChanged.connect((state)=>{

                    if(state){
                        vrvp.viewChanged.connect(this.viewChanged.emit);
                        vrvp.actionStarted.connect(this.actionStarted.emit);
                        vrvp.actionEnded.connect(this.actionEnded.emit);
                        vrvp.actionOccuring.connect(this.actionOccuring.emit);
                    }
                    else {
                        vrvp.viewChanged.disconnect(this.viewChanged.emit);
                        vrvp.actionStarted.disconnect(this.actionStarted.emit);
                        vrvp.actionEnded.disconnect(this.actionEnded.emit);
                        vrvp.actionOccuring.disconnect(this.actionOccuring.emit);
                    }
                })


                this.__vrViewport = vrvp;
                this.vrViewportSetup.emit(vrvp);
            } else {
                //setStatus("WebVR supported, but no VRDisplays found.")
                // console.warn("WebVR supported, but no VRDisplays found.");
            }
        });
    }

    getVRViewport() {
        return this.__vrViewport;
    }

    ////////////////////////////
    // Rendering

    isContinuouslyDrawing() {
        return this.__continuousDrawing;
    }

    startContinuousDrawing() {
        if (this.isContinuouslyDrawing() || (this.getVRViewport() && this.getVRViewport().isContinuouslyDrawing()))
            return;

        let onAnimationFrame = ()=>{
            if (this.__continuousDrawing) {
                if (!this.getVRViewport() || !this.getVRViewport().isContinuouslyDrawing())
                    window.requestAnimationFrame(onAnimationFrame);
            }
            this.draw();
        }

        this.__continuousDrawing = true;
        window.requestAnimationFrame(onAnimationFrame);
    }

    stopContinuousDrawing() {
        this.__continuousDrawing = false;
    }

    toggleContinuousDrawing() {
        if (!this.__continuousDrawing) {
            this.startContinuousDrawing();
        } else {
            this.stopContinuousDrawing();
        }
    }

    // Request a single redraw, usually in response to a signal/event.
    requestRedraw() {

        // If a redraw has already been requested, then simply return and wait.
        if (this.__vrViewport && this.__vrViewport.isPresenting())
            return false;
        // return super.requestRedraw();

        // If a redraw has already been requested, then simply return and wait.
        if (this.__redrawRequested || this.__continuousDrawing)
            return false;

        let onAnimationFrame = () => {
            this.__redrawRequested = false;
            this.draw();
        }
        window.requestAnimationFrame(onAnimationFrame);
        this.__redrawRequested = true;
        return true;
    }

    drawVP(viewport, renderstate) {
        viewport.draw(renderstate);
    }

    drawScene(renderstate, vrView = false) {

        if (this.__collector.newItemsReadyForLoading())
            this.__collector.finalize();

        renderstate.profileJSON = {};
        renderstate.materialCount = 0;
        renderstate.drawCalls = 0;
        renderstate.drawCount = 0;

        for (let pass of this.__passes) {
            if (pass.enabled)
                pass.draw(renderstate);
        }

        // if (this.__displayStats) {
            // console.log(JSON.stringify(renderstate.profileJSON, null, ' '));
            // console.log("materialCount:" + renderstate.materialCount + " drawCalls:" + renderstate.drawCalls + " drawCount:" + renderstate.drawCount);
        // }
    }

    drawSceneGeomData(renderstate){
        for (let pass of this.__passes) {
            if (pass.enabled)
                pass.drawGeomData(renderstate);
        }
    }

    draw() {
        if (this.__drawSuspensionLevel > 0)
            return;

        const gl = this.__gl;
        const renderstate = {};

        if (this.__vrViewport) {
            if (this.__vrViewport.isPresenting()) {
                this.__vrViewport.draw(renderstate);
                if (this.mirrorVRisplayToViewport) {
                    gl.viewport(0, 0, this.__glcanvas.width, this.__glcanvas.height);
                    gl.disable(gl.SCISSOR_TEST);
                    this.redrawOccured.emit();
                    return;
                }
            } 
            // Cannot upate the view, else it sends signals which
            // end up propagating through the websocket. 
            // TODO: Make the head invisible till active
            // else
            //     this.__vrViewport.updateHeadAndControllers();
        }
        
        const len=this.__viewports.length;
        for(let i=0; i< len; i++){
            this.drawVP(this.__viewports[i], renderstate);
        }

        gl.viewport(0, 0, this.__glcanvas.width, this.__glcanvas.height);
        // gl.disable(gl.SCISSOR_TEST);

        this.redrawOccured.emit();
    }
};


export {
    GLRenderer
};
// export default GLRenderer;