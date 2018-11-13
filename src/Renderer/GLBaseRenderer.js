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
    ValueSetMode,
    resourceLoader
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


const registeredPasses = {};

class GLBaseRenderer {
    constructor(canvasDiv, options = {}) {
        this.__drawItems = [];
        this.__drawItemsIndexFreeList = [];
        this.__geoms = [];
        this.__shaders = {};
        this.__passes = {};

        this.__viewports = [];
        this.__activeViewport = undefined;
        this.__continuousDrawing = false;
        this.__redrawRequested = false;
        this.__isMobile = SystemDesc.isMobileDevice;

        this.__drawSuspensionLevel = 1;
        this.__shaderDirectives = {};
        this.__preproc = { };


        this.mirrorVRisplayToViewport = true;

        // Function Bindings.
        this.renderGeomDataFbos = this.renderGeomDataFbos.bind(this);
        this.requestRedraw = this.requestRedraw.bind(this);

        this.__collector = new GLCollector(this);

        this.resized = new Signal();
        this.keyPressed = new Signal();
        this.sceneSet = new Signal(true);
        this.vrViewportSetup = new Signal(true);
        this.sessionClientSetup = new Signal(true);
        
        this.envMapAssigned = new Signal(true);

        // Signals to abstract the user view. 
        // i.e. when a user switches to VR mode, the signals 
        // simply emit the new VR data.
        this.viewChanged = new Signal();
        this.redrawOccured = new Signal();
        this.treeItemGlobalXfoChanged = new Signal();

        this.setupWebGL(canvasDiv, options.webglOptions ? options.webglOptions : {});
        
        for(let passtype in registeredPasses) {
            for(let cls of registeredPasses[passtype]){
                this.addPass(new cls(), passtype);
            }
        }

        this.addViewport('main');


        this.__supportVR = options.supportVR !== undefined ? options.supportVR : true;
        this.__displayVRGeometry = options.displayVRGeometry !== undefined ? options.displayVRGeometry : true;
        this.__vrViewport = undefined;
        if(this.__supportVR && !navigator.getVRDisplays && window.WebVRPolyfill != undefined){
            this.__vrpolyfill = new WebVRPolyfill();
        }

        resourceLoader.loaded.connect(this.renderGeomDataFbos);
        

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

    setupGrid(gridSize, gridColor, resolution, lineThickness) {
        this.__gridTreeItem = new TreeItem('GridTreeItem');

        const gridMaterial = new Material('gridMaterial', 'LinesShader');
        gridMaterial.getParameter('Color').setValue(gridColor, ValueSetMode.DATA_LOAD);
        const grid = new Grid(gridSize, gridSize, resolution, resolution, true);
        this.__gridTreeItem.addChild(new GeomItem('GridItem', grid, gridMaterial));

        const axisLine = new Lines();
        axisLine.setNumVertices(2);
        axisLine.setNumSegments(1);
        axisLine.setSegment(0, 0, 1);
        axisLine.getVertex(0).set(gridSize * -0.5, 0.0, 0.0);
        axisLine.getVertex(1).set(gridSize * 0.5, 0.0, 0.0);

        const gridXAxisMaterial = new Material('gridXAxisMaterial', 'LinesShader');
        gridXAxisMaterial.getParameter('Color').setValue(new Color(gridColor.luminance(), 0, 0), ValueSetMode.DATA_LOAD);
        this.__gridTreeItem.addChild(new GeomItem('xAxisLineItem', axisLine, gridXAxisMaterial));

        const gridZAxisMaterial = new Material('gridZAxisMaterial', 'LinesShader');
        gridZAxisMaterial.getParameter('Color').setValue(new Color(0, gridColor.luminance(), 0), ValueSetMode.DATA_LOAD);
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

        vp.createGeomDataFbo(this.__floatGeomBuffer);

        vp.viewChanged.connect((data) => {
            if (!this.__vrViewportPresenting)
                this.viewChanged.emit(data);
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


    activateViewport(vp) {
        if(this.__activeViewport == vp) 
            return;

        this.__activeViewport = vp;
    }

    activateViewportAtPos(offsetX, offsetY) {
        if (this.__vrViewportPresenting)
            return this.__vrViewport;
        const vp = this.getViewportAtPos(offsetX, offsetY);
        if(vp && vp != this.__activeViewport)
            this.activateViewport(vp);
    }

    getActiveViewport() {
        if (this.__vrViewportPresenting)
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
        if(this.__renderGeomDataFbosRequested == true)
            return;

        this.__renderGeomDataFbosRequested = true;
        const onAnimationFrame = () => {
            for (let vp of this.__viewports)
                vp.renderGeomDataFbo();
            this.__renderGeomDataFbosRequested = false;
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

        if (this.__vrViewportPresenting) {
            var hmdCanvasSize = this.__vrViewport.getHMDCanvasSize();
            this.__glcanvas.width = hmdCanvasSize[0];
            this.__glcanvas.height = hmdCanvasSize[1];
        } else {
            this.__glcanvas.width = this.__glcanvas.clientWidth * window.devicePixelRatio;
            this.__glcanvas.height = this.__glcanvas.clientHeight * window.devicePixelRatio;

            for (let vp of this.__viewports)
                vp.resize(this.__glcanvas.width, this.__glcanvas.height);

            this.resized.emit(this.__glcanvas.width, this.__glcanvas.height)
            this.requestRedraw();
        }

    }

    getDiv() {
        return this.__glcanvasDiv;
    }

    setupWebGL(canvasDiv, webglOptions) {

        this.__glcanvas = document.createElement('canvas');
        this.__glcanvas.style.position = webglOptions.canvasPosition ? webglOptions.canvasPosition : 'absolute';
        this.__glcanvas.style.left = '0px';
        this.__glcanvas.style.top = '0px';
        this.__glcanvas.style.width = '100%';
        this.__glcanvas.style.height = '100%';
        
        this.__glcanvasDiv = canvasDiv;
        this.__glcanvasDiv.appendChild(this.__glcanvas);

        onResize(this.__glcanvas, (event) => {
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


        // Note: Mobile devices don't provide much support for reading data back from float textures,
        // and checking compatibility is patchy at best.
        this.__floatGeomBuffer = !SystemDesc.isMobileDevice;
        this.__gl.floatGeomBuffer = this.__floatGeomBuffer;
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
        // this.__texture0 = new GLTexture2D(this.__gl, {
        //     format: 'RGB',
        //     type: 'UNSIGNED_BYTE',
        //     width: 1,
        //     height: 1,
        //     filter: 'NEAREST',
        //     mipMapped: false,
        //     wrap: 'CLAMP_TO_EDGE',
        //     data: new Uint8Array(3)
        // });

        // // gl.activeTexture(this.__gl.TEXTURE0);
        // this.__gl.bindTexture(this.__gl.TEXTURE_2D, this.__texture0.getTexHdl());

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

        const onWheel = (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            if (activeGLRenderer) {
                this.onWheel(event);
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

        document.addEventListener('keypress', (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            const key = String.fromCharCode(event.keyCode).toLowerCase();
            const vp = activeGLRenderer.getActiveViewport();
            if (!vp || !vp.onKeyPressed(key, event)) {
                // We are setting up key listeners in the state machine now.
                // We cannot simply assume all handers are hooked up here.
                // event.stopPropagation();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            const key = String.fromCharCode(event.keyCode).toLowerCase();
            const vp = activeGLRenderer.getActiveViewport();
            if (!vp || !vp.onKeyDown(key, event)) {
                // We are setting up key listeners in the state machine now.
                // We cannot simply assume all handers are hooked up here.
                // event.stopPropagation();
            }
        });
        document.addEventListener('keyup', (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            const key = String.fromCharCode(event.keyCode).toLowerCase();
            const vp = activeGLRenderer.getActiveViewport();
            if (!vp || !vp.onKeyUp(key, event)) {
                // We are setting up key listeners in the state machine now.
                // We cannot simply assume all handers are hooked up here.
                // event.stopPropagation();
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

    onWheel(event) {
        this.__viewports[0].onWheel(event);
    }

    frameAll(viewportIndex = 0) {
        this.__viewports[viewportIndex].frameView([this.__scene.getRoot()]);
    }

    /////////////////////////
    // Render Items setup

    addPass(pass, passtype=0) {

        if(!this.__passes[passtype])
            this.__passes[passtype] = [];

        let index = 0;
        for(let key in this.__passes) {
            if(key == passtype)
                break;
            index += this.__passes[key].length;
        }
        index += this.__passes[passtype].length;

        pass.updated.connect(this.requestRedraw.bind(this));
        pass.init(this.__gl, this.__collector, index);
        this.__passes[passtype].push(pass);
        this.requestRedraw();
        return index;
    }

    getPass(index) {
        let offset = 0;
        for(let key in this.__passes) {
            const passSet = this.__passes[key];
            if((index - offset) < passSet.length)
                return passSet[index - offset];
            offset += passSet.length;
        }
    }

    findPass(constructor) {
        for(let key in this.__passes) {
            const passSet = this.__passes[key];
            for(let pass of passSet) {
                if (pass.constructor == constructor)
                    return pass;
            }
        }
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
                // Always get the last display. Additional displays are added at the end.(e.g. [Polyfill, HMD])
                let vrvp = new VRViewport(this, displays[displays.length-1], this.__displayVRGeometry);

                vrvp.presentingChanged.connect((state)=>{
                    this.__vrViewportPresenting = state;
                    if(state){
                        vrvp.viewChanged.connect(this.viewChanged.emit);
                        // vrvp.actionStarted.connect(this.actionStarted.emit);
                        // vrvp.actionEnded.connect(this.actionEnded.emit);
                        // vrvp.actionOccuring.connect(this.actionOccuring.emit);
                        
                        // Let the passes know that VR is starting.
                        // They can do things like optimize shaders.
                        for(let key in this.__passes) {
                            const passSet = this.__passes[key];
                            for(let pass of passSet) {
                                pass.startPresenting();
                            }
                        }
                    }
                    else {
                        vrvp.viewChanged.disconnect(this.viewChanged.emit);
                        // vrvp.actionStarted.disconnect(this.actionStarted.emit);
                        // vrvp.actionEnded.disconnect(this.actionEnded.emit);
                        // vrvp.actionOccuring.disconnect(this.actionOccuring.emit);

                        for(let key in this.__passes) {
                            const passSet = this.__passes[key];
                            for(let pass of passSet) {
                                pass.stopPresenting();
                            }
                        }
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

    drawItemChanged() {
        for (let vp of this.__viewports)
            vp.invalidateGeomDataBuffer();
        this.requestRedraw();
    }

    // Request a single redraw, usually in response to a signal/event.
    requestRedraw() {

        // If a redraw has already been requested, then simply return and wait.
        if (this.__vrViewportPresenting)
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

    // drawVP(viewport, renderstate) {
    //     viewport.draw(renderstate);
    // }

    drawScene(renderstate) {

        renderstate.profileJSON = {};
        renderstate.boundRendertarget = undefined;
        renderstate.materialCount = 0;
        renderstate.drawCalls = 0;
        renderstate.drawCount = 0;

        for(let key in this.__passes) {
            const passSet = this.__passes[key];
            for(let pass of passSet) {
                if (pass.enabled)
                    pass.draw(renderstate);
            }
        }
    }

    drawSceneSelectedGeoms(renderstate){
        for(let key in this.__passes) {
            const passSet = this.__passes[key];
            for(let pass of passSet) {
                if (pass.enabled)
                    pass.drawSelectedGeoms(renderstate);
            }
        }
    }
    
    drawSceneGeomData(renderstate){
        for(let key in this.__passes) {
            const passSet = this.__passes[key];
            for(let pass of passSet) {
                if (pass.enabled)
                    pass.drawGeomData(renderstate);
            }
        }
    }

    // draw() {
    //     if (this.__drawSuspensionLevel > 0)
    //         return;

    //     const gl = this.__gl;
    //     const renderstate = {};

    //     if (this.__vrViewport) {
    //         if (this.__vrViewport.isPresenting()) {
    //             this.__vrViewport.draw(renderstate);
    //             return;
    //         } 
    //         // Cannot upate the view, else it sends signals which
    //         // end up propagating through the websocket. 
    //         // TODO: Make the head invisible till active
    //         // else
    //         //     this.__vrViewport.updateHeadAndControllers();
    //     }
        
    //     const len=this.__viewports.length;
    //     for(let i=0; i< len; i++){
    //         this.drawVP(this.__viewports[i], renderstate);
    //     }

    //     if (this.__collector.newItemsReadyForLoading())
    //     this.__collector.finalize();

    //     renderstate.profileJSON = {};
    //     renderstate.boundRendertarget = undefined;
    //     renderstate.materialCount = 0;
    //     renderstate.drawCalls = 0;
    //     renderstate.drawCount = 0;

    //     for(let key in this.__passes) {
    //         const passSet = this.__passes[key];
    //         for(let pass of passSet) {
    //             if (pass.enabled)
    //                 pass.draw(renderstate);
    //         }
    //     }

    //     // gl.viewport(0, 0, this.__glcanvas.width, this.__glcanvas.height);
    //     // gl.disable(gl.SCISSOR_TEST);

    //     this.redrawOccured.emit();
    // }


    //////////////////////////////////////////
    // Static Methods


    static registerPass(cls, passtype){
        if(!registeredPasses[passtype])
            registeredPasses[passtype] = [];
        registeredPasses[passtype].push(cls);
    }
};


export {
    GLBaseRenderer,
    PassType
};
// export default GLBaseRenderer;