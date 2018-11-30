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
// import {
//     GLTexture2D
// } from './GLTexture2D.js';
import {
    VRViewport
} from './VR/VRViewport.js';


let activeGLRenderer = undefined;
let mouseIsDown = false;
let mouseLeft = false;


const registeredPasses = {};

class GLBaseRenderer {
    constructor(canvasDiv, options = {}) {

        if(!SystemDesc.gpuDesc) {
            console.warn("Unable to create renderer");
            return;
        }

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

        this.__vrViewportPresenting = false;

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

        

        this.__supportXR = options.supportXR !== undefined ? options.supportXR : true;
        this.__vrViewport = undefined;
        if(this.__supportXR){
            // if(!navigator.xr && window.WebVRPolyfill != undefined) {
            //     this.__vrpolyfill = new WebVRPolyfill();
            // }
            if(navigator.xr) {
                navigator.xr.requestDevice().then((device) => {
                    device.supportsSession({immersive: true}).then(() => {

                        // Note: could cause a context loss on machines with
                        // multi-gpus (integrated Intel). 
                        // This is because the may force the context to switch 
                        // to the discrete GPU.
                        // TODO: Provide a system to re-load the GPU data. 
                        this.__gl.setCompatibleXRDevice(device);

                        this.__setupVRViewport(device);
                    });
                });
                // TODO:
                // navigator.xr.addEventListener('devicechange', checkForXRSupport);
            }
            

        }

        // Do we need this? I think not.
        // resourceLoader.loaded.connect(this.renderGeomDataFbos);
        

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
        console.warn("Deprecated Method. Please use scene.setupGrid");
        return this.__scene.setupGrid(gridSize, resolution, gridColor);
    }

    ////////////////////////////////////////
    // Scene

    getScene() {
        return this.__scene;
    }

    setScene(scene) {
        this.__scene = scene;
        this.__collector.addTreeItem(this.__scene.getRoot());

        const camera = scene.getRoot().getChildByName('Camera')
        if(camera && this.__viewports.length > 0)
            this.__viewports[0].setCamera(camera)

        if (this.__gizmoContext)
            this.__gizmoContext.setSelectionManager(scene.getSelectionManager());

        this.__scene.getRoot().treeItemGlobalXfoChanged.connect(this.treeItemGlobalXfoChanged.emit);
        
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

    resizeFbos(width, height) {
    }

    __onResize() {

        if (!this.__vrViewportPresenting) {
            this.__glcanvas.width = this.__glcanvas.clientWidth * window.devicePixelRatio;
            this.__glcanvas.height = this.__glcanvas.clientHeight * window.devicePixelRatio;

            for (let vp of this.__viewports)
                vp.resize(this.__glcanvas.width, this.__glcanvas.height);

            this.resizeFbos(this.__glcanvas.width, this.__glcanvas.height);

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
        webglOptions.xrCompatible = true;
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
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            if (!mouseIsDown) {
                const vp = activeGLRenderer.getActiveViewport();
                if (vp) {
                    vp.onMouseLeave(event);
                    event.preventDefault();
                }
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
            if (mouseLeft){
                const vp = activeGLRenderer.getActiveViewport();
                if (vp) {
                    vp.onMouseLeave(event);
                    event.preventDefault();
                }
                activeGLRenderer = undefined;
            }
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
        return this.__supportXR && navigator.xr != null;
    }

    __setupVRViewport(device) {

        // Always get the last display. Additional displays are added at the end.(e.g. [Polyfill, HMD])
        const vrvp = new VRViewport(this, navigator.xr, device);

        vrvp.presentingChanged.connect((state)=>{
            this.__vrViewportPresenting = state;
            if(state){
                vrvp.viewChanged.connect(this.viewChanged.emit);
                
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

                for(let key in this.__passes) {
                    const passSet = this.__passes[key];
                    for(let pass of passSet) {
                        pass.stopPresenting();
                    }
                }

                this.viewChanged.emit({
                    interfaceType: 'CameraAndPointer',
                    viewXfo: this.getViewport().getCamera().getGlobalXfo()
                })
            }
        })
        this.__vrViewport = vrvp;
        this.vrViewportSetup.emit(vrvp);
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
        if (this.isContinuouslyDrawing() || this.__vrViewportPresenting)
            return;

        const onAnimationFrame = ()=>{
            if (this.__continuousDrawing && !this.__vrViewportPresenting)
                window.requestAnimationFrame(onAnimationFrame);
            for(let vp of this.__viewports)
                vp.draw();
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

        // If a redraw has already been requested, then simply return and wait.
        if (this.__redrawRequested || this.__continuousDrawing)
            return false;

        const onAnimationFrame = () => {
            this.__redrawRequested = false;
            for(let vp of this.__viewports){
                vp.draw();
            }
        }
        window.requestAnimationFrame(onAnimationFrame);
        this.__redrawRequested = true;
        return true;
    }

    drawScene(renderstate) {
        if (this.__collector.newItemsReadyForLoading())
            this.__collector.finalize();

        if (this.__collector.newItemsReadyForLoading())
            this.__collector.finalize();

        renderstate.shaderopts = this.__preproc;

        for(let key in this.__passes) {
            const passSet = this.__passes[key];
            for(let pass of passSet) {
                if (pass.enabled)
                    pass.draw(renderstate);
            }
        }
    }

    drawSceneSelectedGeoms(renderstate){
        renderstate.shaderopts = this.__preproc;

        if (this.__collector.newItemsReadyForLoading())
            this.__collector.finalize();

        for(let key in this.__passes) {
            const passSet = this.__passes[key];
            for(let pass of passSet) {
                if (pass.enabled)
                    pass.drawSelectedGeoms(renderstate);
            }
        }
    }
    
    drawSceneGeomData(renderstate){
        renderstate.shaderopts = this.__preproc;

        if (this.__collector.newItemsReadyForLoading())
            this.__collector.finalize();

        for(let key in this.__passes) {
            const passSet = this.__passes[key];
            for(let pass of passSet) {
                if (pass.enabled)
                    pass.drawGeomData(renderstate);
            }
        }
    }

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
