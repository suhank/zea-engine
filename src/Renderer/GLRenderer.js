import {
    Signal
} from '../Math';
import {
    setupWebGL,
    onResize
} from '../external/webgl-utils.js';
import {
    loadBinfile,
    GeomItem,
    Lines,
    Mesh,
    Grid,
    LinesMaterial
} from '../SceneTree';
import {
    GLScreenQuad
} from './GLScreenQuad.js';
import {
    GLCollector
} from './GLCollector.js';
import {
    GLForwardPass
} from './Passes/GLForwardPass.js';
import {
    GLGeomDataPass
} from './Passes/GLGeomDataPass.js';
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
    constructor(canvasDiv, options={}, webglOptions={}) {

        this.__drawItems = [];
        this.__drawItemsIndexFreeList = [];
        this.__geoms = [];
        this.__shaders = {};
        this.__passes = [];
        this.__viewports = [];
        this.__activeViewport = undefined;
        this.__continuousDrawing = false;
        this.__redrawRequested = false;

        this.__collector = new GLCollector(this);

        this.__drawSuspensionLevel = 1;
        this.__renderstate = {};

        this.resized = new Signal();
        this.keyPressed = new Signal();
        this.vrViewportSetup = new Signal(true);

        // Signals to abstract the user view. 
        // i.e. when a user switches to VR mode, the signals 
        // simply emit the new VR data.
        this.viewChanged = new Signal();
        this.pointerMoved = new Signal();
        this.redrawOccured = new Signal();

        // Stroke Signals
        this.actionStarted = new Signal();
        this.actionEnded = new Signal();
        this.actionOccuring = new Signal();

        this.setupWebGL(canvasDiv, webglOptions);

        // this.__defaultGeomsPass = new GLForwardPass(this.__collector);
        // this.__geomDataPass = new GLGeomDataPass(this.__collector);
        // this.__gizmoPass = new GizmoPass(this.__collector);
        // this.__gizmoContext = new GizmoContext(this);

        this.addViewport('main');

        this.__vrViewport = undefined;
        this.mirrorVRisplayToViewport = true;
        if (navigator.getVRDisplays)
            this.__setupVRViewport();

        if (options.displayStats) {
            this.__stats = new Stats();
            this.__stats.dom.style.position = 'absolute';
            this.__stats.dom.style.top = 0;
            this.__stats.dom.style.left = 0;
            this.__stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
            canvasDiv.appendChild(this.__stats.dom);
        }

        if(options.resources){
            loadBinfile(
                options.resources,
                (path, data) => {
                    /////////////////////////////////
                    // Un-pack the data.
                    let unpack = new Unpack(data);
                    let entries = unpack.getEntries();
                    this.__resources = {};
                    for(let res of entries){
                        this.__resources[res.name] = unpack.decompress(res.name);
                    }

                    //if (options.displayLogo)
                    {
                        let logo = new Image();
                        logo.src = URL.createObjectURL(new Blob([this.__resources['LogoSmall.png'].buffer]));
                        logo.style.position = 'absolute';
                        logo.style.top = '10px';
                        logo.style.left = '10px';
                        canvasDiv.appendChild(logo);
                    }

                    //if (options.displayLoading)
                    {
                        let loadingDiv = document.createElement("div");
                        loadingDiv.style.position = 'absolute';
                        loadingDiv.style.top = '50%';
                        loadingDiv.style.left = '50%';
                        let loading = new Image();
                        loading.src = URL.createObjectURL(new Blob([this.__resources['loading.gif'].buffer]));
                        loading.style.width = '20%';
                        loading.style.height = '20%';
                        loading.style.transform = 'translate(-50%, -50%)';
                        loadingDiv.appendChild(loading);
                        canvasDiv.appendChild(loadingDiv);
                        this.__loadingImg = loadingDiv;
                    }  
                },
                () => {

                },
                this);
        }

    }

    getScene() {
        return this.__scene;
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
        let gridMaterial = new LinesMaterial('gridMaterial');
        gridMaterial.color = gridColor;
        let grid = new Grid('Grid', gridSize, gridSize, resolution, resolution);
        // grid.lineThickness = lineThickness;
        this.__gridItem = new GeomItem('GridItem', grid, gridMaterial);
        // let gridDrawItem = new GLDrawItem(this.__gl, this.__gridItem, new GLLines(this.__gl, grid), this.addMaterial(gridMaterial));
        this.__collector.addGeomItem(this.__gridItem);
    }

    toggleDrawGrid() {
        this.__gridItem.visible = !this.__gridItem.visible;
        this.requestRedraw();
    }

    toggleDebugPanel() {
        if (this.__stats) {
            if (this.__stats.dom.style.visibility == "hidden")
                this.__stats.dom.style.visibility = "visible";
            else
                this.__stats.dom.style.visibility = "hidden";
        }
    }

    setScene(scene) {
        this.__scene = scene;
        this.__collector.addTreeItem(this.__scene.getRoot());
        this.__collector.finalize();

        if (this.__gizmoContext)
            this.__gizmoContext.setSelectionManager(scene.getSelectionManager());
    }

    addViewport(name) {
        let vp = new GLViewport(this, name, this.getWidth(), this.getHeight());
        vp.updated.connect(() => {
            this.requestRedraw();
        }, this);

        // vp.createGeomDataFbo();
        // vp.setGeomDataPass(this.__geomDataPass);
        // vp.setGizmoPass(this.__gizmoPass);

        vp.viewChanged.connect((data)=>{
            this.viewChanged.emit(data);
        }, this);
        vp.mouseMoved.connect((event, mousePos, ray)=>{
            this.pointerMoved.emit({
                mousePos: mousePos.toJSON(),
                ray: ray.toJSON()
            });
        }, this);
        vp.actionStarted.connect((data)=>{
            this.actionStarted.emit(data);
        }, this);
        vp.actionEnded.connect((data)=>{
            this.actionEnded.emit(data);
        }, this);
        vp.actionOccuring.connect((data)=>{
            this.actionOccuring.emit(data);
        }, this);

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

    activateViewportAtPos(offsetX, offsetY) {
        this.__activeViewport = this.getViewportAtPos(offsetX, offsetY);
        return this.__activeViewport;
    }

    getActiveViewport() {
        return this.__activeViewport;
    }

    suspendDrawing() {
        this.__drawSuspensionLevel++;
    }

    resumeDrawing() {
        this.__drawSuspensionLevel--;
        if (this.__drawSuspensionLevel == 0) {
            if(this.__loadingImg)
                this.__glcanvasDiv.removeChild(this.__loadingImg);
                
            // New Items may have been added during the pause.
            // this.renderGeomDataFbos();
            this.requestRedraw();
        }
    }

    renderGeomDataFbos() {
        for (let vp of this.__viewports)
            vp.renderGeomDataFbo();
    }


    /////////////////////////
    // Renderer Setup

    get gl() {
        return this.__gl;
    }

    __onResize() {

        if (this.__vrViewport && this.__vrViewport.isPresenting()) {
            var hmdCanvasSize = this.__vrViewport.getHMDCanvasSize();
            this.__glcanvas.width = hmdCanvasSize[0];
            this.__glcanvas.height = hmdCanvasSize[1];
        } else {
            // Emulate the Vive HMD resolution.
            // this.__glcanvas.width = 2160;
            // this.__glcanvas.height = 1200;
            this.__glcanvas.width = this.__glcanvas.offsetWidth * window.devicePixelRatio;
            this.__glcanvas.height = this.__glcanvas.offsetHeight * window.devicePixelRatio;
        }
        this.__onResizeViewports();
        this.resized.emit(this.__glcanvas.width, this.__glcanvas.height)
        this.requestRedraw();

    }

    __onResizeViewports() {
        for (let vp of this.__viewports)
            vp.resize(this.__glcanvas.width, this.__glcanvas.height);
    }

    getDiv(){
        return this.__glcanvasDiv;
    }

    setupWebGL(canvasDiv, webglOptions) {
        this.__glcanvas = document.createElement('canvas');
        this.__glcanvas.style.width = '100%';
        this.__glcanvas.style.height = '100%';
        this.__glcanvasDiv = canvasDiv;
        this.__glcanvasDiv.appendChild(this.__glcanvas);

        let _this = this;
        onResize(canvasDiv, function(event) {
            _this.__onResize();
        });
        this.__onResize();

        webglOptions.preserveDrawingBuffer = true;
        webglOptions.alpha = true;
        this.__gl = setupWebGL(this.__glcanvas, webglOptions);

        this.__isFragDepthAvailable = this.__gl.getExtension("EXT_frag_depth");

        this.__gl.screenQuad = new GLScreenQuad(this.__gl);
        this.__screenQuad = this.__gl.screenQuad;

        // Setup event handlers
        this.__glcanvas.onmouseenter = function(event) {
            if (!mouseIsDown) {
                activeGLRenderer = _this;
                // TODO: Check mouse pos.
                activeGLRenderer.activateViewportAtPos(event.offsetX, event.offsetY);
                mouseLeft = false;
            }
        }
        this.__glcanvas.onmouseleave = function(event) {
            if (!mouseIsDown) {
                activeGLRenderer = undefined;
            } else {
                mouseLeft = true;
            }
        }

        document.onmousedown = function(event) {
            if (!activeGLRenderer)
                return;
            mouseIsDown = true;
            let vp = activeGLRenderer.getActiveViewport();
            if (vp) {
                vp.onMouseDown(event);
                event.preventDefault();
                event.stopPropagation();
            }
            mouseLeft = false;
            return false;
        };
        document.onmouseup = function(event) {
            if (!activeGLRenderer)
                return;
            // if(mouseIsDown && mouseMoveDist < 0.01)
            //     mouseClick(event);
            mouseIsDown = false;
            let vp = activeGLRenderer.getActiveViewport();
            if (vp) {
                vp.onMouseUp(event);
                event.preventDefault();
                event.stopPropagation();
            }
            if (mouseLeft)
                activeGLRenderer = undefined;
            return false;
        };
        document.onmousemove = function(event) {
            if (!activeGLRenderer)
                return;
            if (!mouseIsDown)
                activeGLRenderer.activateViewportAtPos(event.offsetX, event.offsetY);

            let vp = activeGLRenderer.getActiveViewport();
            if (vp) {
                vp.onMouseMove(event);
                event.preventDefault();
                event.stopPropagation();
            }
            return false;
        };
        document.onkeypress = function(event) {
            if (!activeGLRenderer)
                return;
            let key = String.fromCharCode(event.keyCode).toLowerCase();
            let vp = activeGLRenderer.getActiveViewport();
            if (!vp || !vp.onKeyPressed(key)) {
                _this.onKeyPressed(key);
            }
        };
        document.onkeydown = function(event) {
            if (!activeGLRenderer)
                return;
            let key = String.fromCharCode(event.keyCode).toLowerCase();
            let vp = activeGLRenderer.getActiveViewport();
            if (!vp || !vp.onKeyDown(key)) {
                _this.onKeyDown(key);
            }
        };
        document.onkeyup = function(event) {
            if (!activeGLRenderer)
                return;
            let key = String.fromCharCode(event.keyCode).toLowerCase();
            let vp = activeGLRenderer.getActiveViewport();
            if (!vp || !vp.onKeyUp(key)) {
                _this.onKeyUp(key);
            }
        };

        this.__glcanvas.addEventListener("touchstart", (event)=>{
            _this.getViewport().onTouchStart(event);
        }, false);
        this.__glcanvas.addEventListener("touchmove", (event)=>{
            _this.getViewport().onTouchMove(event);
        }, false);
        this.__glcanvas.addEventListener("touchend", (event)=>{
            _this.getViewport().onTouchEnd(event);
        }, false);
        this.__glcanvas.addEventListener("touchcancel", (event)=>{
            _this.getViewport().onTouchCancel(event);
        }, false);
    }

    getGLCanvas() {
        return this.__glcanvas;
    }

    getScreenQuad() {
        return this.__screenQuad;
    }

    onKeyPressed(key) {

        // If running in electron, avoid handling hotkeys..
        if (window.process === undefined || process.browser == true) {
            switch (key) {
                case 'd':
                    this.toggleDebugPanel();
                    return true;
            }
        }
    }
    onKeyDown(key) {

    }
    onKeyUp(key) {

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
        pass.updated.connect(this.requestRedraw, this);
        this.__passes.push(pass);
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
        return navigator.getVRDisplays != null;
    }

    __setupVRViewport() {
        //this.frameData = new VRFrameData();
        let renderer = this;
        return navigator.getVRDisplays().then(function(displays) {
            if (displays.length > 0) {
                let vrDisplay = displays[0];
                
                let vrvp = new VRViewport(renderer, vrDisplay);
                
                vrvp.viewChanged.connect((data)=>{
                    renderer.viewChanged.emit(data);
                }, renderer);
                vrvp.actionStarted.connect((data)=>{
                    renderer.actionStarted.emit(data);
                }, renderer);
                vrvp.actionEnded.connect((data)=>{
                    renderer.actionEnded.emit(data);
                }, renderer);
                vrvp.actionOccuring.connect((data)=>{
                    renderer.actionOccuring.emit(data);
                }, renderer);

                renderer.__vrViewport = vrvp;

                renderer.vrViewportSetup.emit(vrvp);
            } else {
                //setStatus("WebVR supported, but no VRDisplays found.")
                console.warn("WebVR supported, but no VRDisplays found.");
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

        let renderer = this;

        function onAnimationFrame() {
            if (renderer.isContinuouslyDrawing()){
                if(!renderer.getVRViewport() || !renderer.getVRViewport().isContinuouslyDrawing())
                    window.requestAnimationFrame(onAnimationFrame);
            }
            renderer.draw();
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
        let renderer = this;

        function onAnimationFrame() {
            renderer.__redrawRequested = false;
            renderer.draw();
        }
        window.requestAnimationFrame(onAnimationFrame);
        this.__redrawRequested = true;
        return true;
    }

    drawVP(viewport) {
        viewport.draw(this.__renderstate);
    }

    drawScene(renderstate, vrView = false) {
        renderstate.profileJSON = {};
        renderstate.materialCount = 0;
        renderstate.drawCalls = 0;

        // this.__defaultGeomsPass.draw(this.__renderstate);
        for (let pass of this.__passes) {
            if (pass.enabled)
                pass.draw(renderstate);
        }

        // console.log(JSON.stringify(renderstate.profileJSON, null, ' '));
        // console.log("materialCount:" + renderstate.materialCount);
        // console.log("drawCalls:" + renderstate.drawCalls);
    }

    draw() {
        if (this.__drawSuspensionLevel > 0)
            return;
        if (this.__stats)
            this.__stats.begin();

        for (let vp of this.__viewports)
            this.drawVP(vp);

        if (this.__stats)
            this.__stats.end();
        // console.log("Draw Calls:" + this.__renderstate['drawCalls']);

        this.redrawOccured.emit();
    }
};

export {
    GLRenderer
};