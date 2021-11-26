/* eslint-disable guard-for-in */
import throttle from 'lodash/throttle';
import { TreeItem, GeomItem, ParameterOwner } from '../SceneTree/index';
import { SystemDesc } from '../SystemDesc';
import { create3DContext } from './GLContext';
import { GLScreenQuad } from './GLScreenQuad';
import { GLViewport } from './GLViewport';
import { Registry } from '../Registry';
import { VRViewport } from './VR/VRViewport';
import { GLMaterialLibrary } from './Drawing/GLMaterialLibrary';
import { GLGeomLibrary } from './Drawing/GLGeomLibrary';
import { GLGeomItemLibrary } from './Drawing/GLGeomItemLibrary';
import { ResizedEvent } from '../Utilities/Events/ResizedEvent';
import { SceneSetEvent } from '../Utilities/Events/SceneSetEvent';
import { ViewChangedEvent } from '../Utilities/Events/ViewChangedEvent';
import { XrViewportEvent } from '../Utilities/Events/XrViewportEvent';
import { ZeaMouseEvent } from '../Utilities/Events/ZeaMouseEvent';
import { ZeaWheelEvent } from '../Utilities/Events/ZeaWheelEvent';
import { ZeaTouchEvent } from '../Utilities/Events/ZeaTouchEvent';
import { KeyboardEvent } from '../Utilities/Events/KeyboardEvent';
let activeGLRenderer;
let pointerIsDown = false;
let pointerLeft = false;
const registeredPasses = {};
/**
 * Class representing a GL base renderer.
 *
 * @extends ParameterOwner
 */
class GLBaseRenderer extends ParameterOwner {
    /**
     * Create a GL base renderer.
     * @param $canvas - The canvas element.
     * @param options - The options value.
     */
    constructor($canvas, options = {}) {
        super();
        this.listenerIDs = {};
        this.directives = [];
        this.solidAngleLimit = 0.004;
        this.__glcanvas = null;
        this.__scene = null;
        this.__shaderDirectives = {};
        this.__renderGeomDataFbosRequested = false;
        this.__shaders = {};
        this.__passes = {};
        this.__passesRegistrationOrder = [];
        this.__passCallbacks = [];
        this.__viewports = [];
        this.__activeViewport = undefined;
        this.__continuousDrawing = false;
        this.__redrawRequested = false;
        this.__isMobile = false;
        this.__drawSuspensionLevel = 0;
        this.__xrViewportPresenting = false;
        this.floatGeomBuffer = true;
        this.__supportXR = false;
        this.__xrViewport = undefined;
        this.screenQuad = null;
        if (!SystemDesc.gpuDesc) {
            throw new Error('Unable to create renderer. WebGL not Supported');
        }
        this.__isMobile = SystemDesc.isMobileDevice;
        // Function Bindings.
        this.requestRedraw = this.requestRedraw.bind(this);
        this.__gl = this.setupWebGL($canvas, options);
        this.screenQuad = new GLScreenQuad(this.__gl, { directives: this.directives });
        this.bindEventHandlers();
        this.addViewport('main');
        this.glMaterialLibrary = new GLMaterialLibrary(this);
        this.glMaterialLibrary.on('updated', () => {
            this.requestRedraw();
        });
        this.glGeomLibrary = new GLGeomLibrary(this);
        this.glGeomLibrary.on('updated', () => {
            this.requestRedraw();
        });
        this.glGeomItemLibrary = new GLGeomItemLibrary(this, options);
        this.glGeomItemLibrary.on('updated', () => {
            this.requestRedraw();
        });
        // eslint-disable-next-line guard-for-in
        for (const passType in registeredPasses) {
            for (const cls of registeredPasses[passType]) {
                // eslint-disable-next-line new-cap
                this.addPass(new cls(), parseInt(passType), false); // TODO: is parseInt ok?
            }
        }
        // ////////////////////////////////////////////
        // WebXR
        this.__supportXR = options.supportXR !== undefined ? options.supportXR : true;
        this.__xrViewportPromise = new Promise((resolve, reject) => {
            var _a, _b;
            if (this.__supportXR) {
                // if(!navigator.xr && window.WebVRPolyfill != undefined) {
                //     this.__vrpolyfill = new WebVRPolyfill();
                // }
                if ((_a = navigator) === null || _a === void 0 ? void 0 : _a.xr) {
                    const setupXRViewport = () => {
                        // Note: could cause a context loss on machines with
                        // multi-gpus (integrated Intel).
                        // This is because the may force the context to switch
                        // to the discrete GPU.
                        // TODO: Provide a system to re-load the GPU data.
                        // this.__gl.setCompatibleXRDevice(device);
                        this.__gl.makeXRCompatible().then(() => {
                            this.__xrViewport = this.__setupXRViewport();
                            let event = new XrViewportEvent(this.__xrViewport);
                            this.emit('xrViewportSetup', event);
                            resolve(this.__xrViewport);
                        });
                    };
                    (_b = navigator) === null || _b === void 0 ? void 0 : _b.xr.isSessionSupported('immersive-vr').then((isSupported) => {
                        if (isSupported) {
                            setupXRViewport();
                        }
                    }).catch((reason) => {
                        console.warn('Unable to setup XR:' + reason);
                    });
                    // TODO:
                    // navigator.xr.on('devicechange', checkForXRSupport);
                }
            }
        });
    }
    /**
     * The addShaderPreprocessorDirective method.
     * @param name - The name value.
     * @param value - The value param.
     */
    addShaderPreprocessorDirective(name, value) {
        // const gl = this.__gl
        if (value)
            this.__shaderDirectives[name] = '#define ' + name + ' = ' + value;
        else
            this.__shaderDirectives[name] = '#define ' + name;
        const directives = [];
        // eslint-disable-next-line guard-for-in
        for (const key in this.__shaderDirectives) {
            directives.push(this.__shaderDirectives[key]);
        }
        this.directives = directives;
    }
    /**
     * Returns HTMLCanvasElement's width
     *
     * @return - The return value.
     */
    getWidth() {
        return this.__glcanvas.width;
    }
    /**
     * Returns HTMLCanvasElement's Height
     * @return - The return value.
     */
    getHeight() {
        return this.__glcanvas.height;
    }
    // //////////////////////////////////////
    // Viewports
    /**
     * Adds a new viewport(viewing region) to the scene.
     *
     * @param name - The name of the viewport.
     * @return - The return value.
     */
    addViewport(name) {
        // TODO: We may need to merge GLBaseRenderer into GLRenderer to avoid this nasty cast.
        const renderer = this;
        const vp = new GLViewport(renderer, name, this.getWidth(), this.getHeight());
        const updated = () => {
            this.requestRedraw();
        };
        const viewChanged = (data) => {
            if (!this.__xrViewportPresenting) {
                this.emit('viewChanged', data);
            }
        };
        vp.on('updated', updated);
        vp.on('viewChanged', viewChanged);
        this.__viewports.push(vp);
        this.__activeViewport = vp;
        return vp;
    }
    /**
     * Returns a viewport element by specifying its index in the list of viewports.
     *
     * @param index - The index value.
     * @return - The return value.
     */
    getViewport(index = 0) {
        return this.__viewports[index];
    }
    /**
     * Returns a viewport element under the specified XY coordinates.
     *
     * @param offsetX - The viewport offset in the X axis.
     * @param offsetY - The viewport offset in the Y axis.
     * @return - The return value.
     */
    getViewportAtPos(offsetX, offsetY) {
        for (const vp of this.__viewports) {
            const x = vp.getPosX();
            const y = vp.getPosY();
            const width = vp.getWidth();
            const height = vp.getHeight();
            if (offsetX >= x && offsetY >= y && offsetX <= width + x && offsetY <= height + y)
                return vp;
        }
        return undefined;
    }
    /**
     * Sets as `active` the specified viewport.
     *
     * @param vp - The viewport.
     */
    activateViewport(vp) {
        if (this.__activeViewport == vp)
            return;
        this.__activeViewport = vp;
    }
    /**
     * Sets as àctive` the viewport under the specified XY coordinates.
     *
     * @param offsetX - The viewport offset in the X axis.
     * @param offsetY - The viewport offset in the Y axis.
     */
    activateViewportAtPos(offsetX, offsetY) {
        if (this.__xrViewportPresenting)
            return;
        const vp = this.getViewportAtPos(offsetX, offsetY);
        if (vp && vp != this.__activeViewport)
            this.activateViewport(vp);
    }
    /**
     * Returns current active viewport.
     *
     * @return - The return value.
     */
    getActiveViewport() {
        return this.__activeViewport;
    }
    /**
     * The suspendDrawing method.
     */
    suspendDrawing() {
        this.__drawSuspensionLevel++;
    }
    /**
     * The resumeDrawing method.
     */
    resumeDrawing() {
        this.__drawSuspensionLevel--;
        if (this.__drawSuspensionLevel == 0) {
            this.renderGeomDataFbos();
            this.requestRedraw();
        }
    }
    /**
     * The renderGeomDataFbos method. Frame buffer (FBO).
     */
    renderGeomDataFbos() {
        if (this.__renderGeomDataFbosRequested == true)
            return;
        this.__renderGeomDataFbosRequested = true;
        const onAnimationFrame = () => {
            for (const vp of this.__viewports)
                vp.renderGeomDataFbo();
            this.__renderGeomDataFbosRequested = false;
        };
        window.requestAnimationFrame(onAnimationFrame);
    }
    // //////////////////////////////////////
    // Scene
    /**
     * Returns current scene(Environment where all assets live) object.
     *
     * @return - The return value.
     */
    getScene() {
        return this.__scene;
    }
    /**
     * Sets scene to the renderer.
     *
     * @param scene - The scene value.
     */
    setScene(scene) {
        this.__scene = scene;
        this.addTreeItem(this.__scene.getRoot());
        let event = new SceneSetEvent(this.__scene);
        this.emit('sceneSet', event);
    }
    /**
     * Adds tree items to the renderer, selecting the correct pass to delegate rendering too, and listens to future changes in the tree.
     *
     * @param treeItem - The tree item to add.
     */
    addTreeItem(treeItem) {
        // Note: we can have BaseItems in the tree now.
        if (!(treeItem instanceof TreeItem))
            return;
        const id = treeItem.getId();
        const listenerIDs = {};
        this.listenerIDs[id] = listenerIDs;
        if (treeItem instanceof GeomItem) {
            const geomParam = treeItem.geomParam;
            if (geomParam.value == undefined) {
                // we will add this geomItem once it receives its geom.
                const geomAssigned = () => {
                    delete listenerIDs['Geometry.valueChanged'];
                    this.assignTreeItemToGLPass(treeItem);
                };
                listenerIDs['Geometry.valueChanged'] = geomParam.once('valueChanged', geomAssigned);
            }
            else {
                this.assignTreeItemToGLPass(treeItem);
            }
        }
        else {
            this.assignTreeItemToGLPass(treeItem);
        }
        // Traverse the tree adding items until we hit the leaves (which are usually GeomItems.)
        for (const childItem of treeItem.getChildren()) {
            if (childItem)
                this.addTreeItem(childItem);
        }
        listenerIDs['childAdded'] = treeItem.on('childAdded', (event) => {
            this.addTreeItem(event.childItem);
        });
        listenerIDs['childRemoved'] = treeItem.on('childRemoved', (event) => {
            this.removeTreeItem(event.childItem);
        });
        this.renderGeomDataFbos();
    }
    /**
     * Searches through the passes and finds the appropriate pass to draw the given tree items.
     *
     * @param treeItem - The tree item to assign.
     */
    assignTreeItemToGLPass(treeItem) {
        if (treeItem instanceof GeomItem) {
            const geomItem = treeItem;
            this.glGeomItemLibrary.addGeomItem(geomItem);
        }
        let handled = false;
        for (let i = this.__passesRegistrationOrder.length - 1; i >= 0; i--) {
            const pass = this.__passesRegistrationOrder[i];
            const rargs = {
                continueInSubTree: true,
            };
            handled = pass.itemAddedToScene(treeItem, rargs);
            if (handled) {
                if (!rargs.continueInSubTree)
                    return;
                break;
            }
        }
        if (!handled) {
            for (const passCbs of this.__passCallbacks) {
                const rargs = {
                    continueInSubTree: true,
                };
                const handled = passCbs.itemAddedFn(treeItem, rargs);
                if (handled) {
                    if (!rargs.continueInSubTree)
                        return;
                    break;
                }
            }
        }
    }
    /**
     * Remove tree items from the scene.
     *
     * @param treeItem - The tree item to remove.
     */
    removeTreeItem(treeItem) {
        // Note: we can have BaseItems in the tree now.
        if (!(treeItem instanceof TreeItem))
            return;
        const id = treeItem.getId();
        const listenerIDs = this.listenerIDs[id];
        delete this.listenerIDs[id];
        treeItem.removeListenerById('childAdded', listenerIDs['childAdded']);
        treeItem.removeListenerById('childRemoved', listenerIDs['childRemoved']);
        for (let i = this.__passesRegistrationOrder.length - 1; i >= 0; i--) {
            const pass = this.__passesRegistrationOrder[i];
            const rargs = {
                continueInSubTree: true,
            };
            const handled = pass.itemRemovedFromScene(treeItem, rargs);
            if (handled) {
                if (!rargs.continueInSubTree)
                    return;
                break;
            }
        }
        for (const passCbs of this.__passCallbacks) {
            if (!passCbs.itemRemovedFn)
                continue;
            const rargs = {
                continueInSubTree: true,
            };
            const handled = passCbs.itemRemovedFn(treeItem, rargs);
            if (handled) {
                if (!rargs.continueInSubTree)
                    return;
                break;
            }
        }
        // Traverse the tree adding items till we hit the leaves (which are usually GeomItems).
        for (const childItem of treeItem.getChildren()) {
            if (childItem)
                this.removeTreeItem(childItem);
        }
        if (treeItem instanceof GeomItem) {
            const geomItem = treeItem;
            if (listenerIDs['Geometry.valueChanged']) {
                const geomParam = treeItem.geomParam;
                geomParam.removeListenerById('valueChanged', listenerIDs['Geometry.valueChanged']);
            }
            this.glGeomItemLibrary.removeGeomItem(geomItem);
        }
        this.renderGeomDataFbos();
    }
    // ///////////////////////
    // Renderer Setup
    /**
     * Getter for gl.
     */
    get gl() {
        return this.__gl;
    }
    /**
     * The getGL method.
     * @return - The return value.
     */
    getGL() {
        return this.__gl;
    }
    /**
     * Handle the canvas's parent resizing.
     *
     * @param newWidth - The new width of the canvas.
     * @param newHeight - The new height of the canvas.
     *
     * @private
     */
    handleResize(newWidth, newHeight) {
        if (this.__xrViewportPresenting) {
            return;
        }
        const width = Math.max(4, newWidth);
        const height = Math.max(4, newHeight);
        this.__glcanvas.width = width;
        this.__glcanvas.height = height;
        this.__viewports.forEach((viewport) => {
            viewport.resize(width, height);
        });
        const event = new ResizedEvent(width, height);
        this.emit('resized', event);
        this.requestRedraw();
    }
    /**
     * Returns host div of the canvas element.
     *
     * @return - The return value.
     */
    getDiv() {
        return this.__glcanvas.parentElement;
    }
    /**
     * Setups the WebGL configuration for the renderer, specifying the canvas element where our
     * @private
     * @param $canvas - The $canvas element.
     * @param webglOptions - The webglOptions value.
     */
    setupWebGL($canvas, webglOptions) {
        const { tagName } = $canvas;
        if (!['DIV', 'CANVAS'].includes(tagName)) {
            throw new Error('Only CANVAS and DIV are valid root elements.');
        }
        const rootIsDiv = tagName === 'DIV';
        this.__glcanvas = $canvas;
        if (rootIsDiv) {
            console.warn('@GLBaseRenderer#setupWebGL.', 'Using a DIV as root element is deprecated.', 'Use a CANVAS instead.', 'See: https://docs.zea.live/zea-engine/#/getting-started/get-started-with-engine?id=basic-setup');
            this.__glcanvas = document.createElement('canvas');
            $canvas.appendChild(this.__glcanvas);
        }
        else {
            this.__glcanvas = $canvas;
        }
        this.__glcanvas.style['touch-action'] = 'none';
        this.__glcanvas.parentElement.style.position = 'relative';
        this.__glcanvas.style.position = 'absolute';
        // Rapid resizing of the canvas would cause issues with WebGL.
        // FrameBuffer objects would end up all black. So here we throttle
        // the resizing of the canvas to ensure 2 resize commands are not
        // closer than 100ms appart.
        const throttledResize = throttle((entries) => {
            for (const entry of entries) {
                if (!Array.isArray(entries) || !entries.length || !entry.contentRect) {
                    return;
                }
                const displayWidth = Math.round(entry.contentRect.width);
                const displayHeight = Math.round(entry.contentRect.height);
                this.handleResize(displayWidth, displayHeight);
            }
        }, 500);
        const resizeObserver = new ResizeObserver(throttledResize);
        this.handleResize(this.__glcanvas.parentElement.clientWidth, this.__glcanvas.parentElement.clientHeight);
        // https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
        try {
            // only call us of the number of device pixels changed
            // @ts-ignore
            resizeObserver.observe(this.__glcanvas.parentNode, { box: 'device-pixel-content-box' });
        }
        catch (ex) {
            // device-pixel-content-box is not supported so fallback to this
            // @ts-ignore
            resizeObserver.observe(this.__glcanvas.parentNode, { box: 'content-box' });
        }
        webglOptions.preserveDrawingBuffer = true;
        webglOptions.antialias = webglOptions.antialias != undefined ? webglOptions.antialias : true;
        webglOptions.depth = true;
        webglOptions.stencil = false;
        webglOptions.alpha = webglOptions.alpha ? webglOptions.alpha : false;
        // Note: Due to a change in Chrome (version 88-89), providing true here caused a pause when creating
        // an WebGL context, if the XR device was unplugged. We also call 'makeXRCompatible' when setting
        // up the XRViewport, so we to get an XR Compatible context anyway.
        webglOptions.xrCompatible = false;
        // Most applications of our engine will prefer the high-performance context by default.
        webglOptions.powerPreference = webglOptions.powerPreference || 'high-performance';
        const gl = create3DContext(this.__glcanvas, webglOptions);
        if (!gl)
            alert('Unable to create WebGL context. WebGL not supported.');
        if (gl.name == 'webgl2') {
            this.addShaderPreprocessorDirective('ENABLE_ES3');
        }
        if (gl.floatTexturesSupported) {
            this.addShaderPreprocessorDirective('ENABLE_FLOAT_TEXTURES');
        }
        {
            const ext = gl.name == 'webgl2' ? gl.getExtension('WEBGL_multi_draw') : null;
            if (ext && !webglOptions.disableMultiDraw) {
                gl.multiDrawArrays = ext.multiDrawArraysWEBGL.bind(ext);
                gl.multiDrawElements = ext.multiDrawElementsWEBGL.bind(ext);
                gl.multiDrawElementsInstanced = ext.multiDrawElementsInstancedWEBGL.bind(ext);
                gl.multiDrawArraysInstanced = ext.multiDrawArraysInstancedWEBGL.bind(ext);
            }
            else {
                this.addShaderPreprocessorDirective('EMULATE_MULTI_DRAW');
            }
        }
        // Note: Mobile devices don't provide much support for reading data back from float textures,
        // and checking compatibility is patchy at best.
        // Note: We are now pushing on high-end mobile devices.
        // Galaxy and above. We need this. We need to accurately determine
        // if the float buffer is not supported.
        if (SystemDesc.browserName == 'Safari' && gl.name == 'webgl') {
            this.floatGeomBuffer = false;
        }
        else {
            this.floatGeomBuffer =
                webglOptions.floatGeomBuffer != undefined ? webglOptions.floatGeomBuffer : gl.floatTexturesSupported;
        }
        gl.floatGeomBuffer = this.floatGeomBuffer;
        return gl;
    }
    /**
     * Binds IO event handlers to the canvas
     */
    bindEventHandlers() {
        // ////////////////////////////////
        // Setup event handlers
        const isValidCanvas = () => this.getWidth() > 0 && this.getHeight();
        /** Mouse Events Start */
        const isMobileSafariMouseEvent = (event) => {
            if (SystemDesc.isMobileDevice && SystemDesc.browserName == 'Safari') {
                console.warn('Mobile Safari is triggering mouse event:', event.type);
                return true;
            }
            return false;
        };
        this.__glcanvas.addEventListener('mousedown', (event) => {
            if (isMobileSafariMouseEvent(event)) {
                return;
            }
            const pointerEvent = new ZeaMouseEvent(event, this.__glcanvas.getBoundingClientRect());
            pointerIsDown = true;
            activeGLRenderer = this;
            this.activateViewportAtPos(pointerEvent.rendererX, pointerEvent.rendererY);
            const viewport = this.getActiveViewport();
            if (viewport) {
                viewport.onPointerDown(pointerEvent);
            }
            pointerLeft = false;
        });
        document.addEventListener('mouseup', (event) => {
            if (isMobileSafariMouseEvent(event)) {
                return;
            }
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            const pointerEvent = new ZeaMouseEvent(event, this.__glcanvas.getBoundingClientRect());
            pointerIsDown = false;
            const viewport = this.getActiveViewport();
            if (viewport) {
                viewport.onPointerUp(pointerEvent);
            }
            if (pointerLeft) {
                if (viewport) {
                    viewport.onPointerLeave(pointerEvent);
                }
                activeGLRenderer = undefined;
            }
        });
        document.addEventListener('mousemove', (event) => {
            if (isMobileSafariMouseEvent(event)) {
                return;
            }
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            const pointerEvent = new ZeaMouseEvent(event, this.__glcanvas.getBoundingClientRect());
            if (!pointerIsDown)
                this.activateViewportAtPos(pointerEvent.rendererX, pointerEvent.rendererY);
            const viewport = this.getActiveViewport();
            if (viewport) {
                viewport.onPointerMove(pointerEvent);
            }
        });
        this.__glcanvas.addEventListener('mouseenter', (event) => {
            if (isMobileSafariMouseEvent(event)) {
                return;
            }
            if (!pointerIsDown) {
                activeGLRenderer = this;
                const pointerEvent = new ZeaMouseEvent(event, this.__glcanvas.getBoundingClientRect());
                this.activateViewportAtPos(pointerEvent.rendererX, pointerEvent.rendererY);
                if (!pointerIsDown) {
                    const viewport = this.getActiveViewport();
                    if (viewport) {
                        viewport.onPointerEnter(pointerEvent);
                    }
                }
                pointerLeft = false;
            }
        });
        this.__glcanvas.addEventListener('mouseleave', (event) => {
            if (isMobileSafariMouseEvent(event)) {
                return;
            }
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            const pointerEvent = new ZeaMouseEvent(event, this.__glcanvas.getBoundingClientRect());
            if (!pointerIsDown) {
                const viewport = this.getActiveViewport();
                if (viewport) {
                    viewport.onPointerLeave(pointerEvent);
                }
                activeGLRenderer = undefined;
            }
            else {
                pointerLeft = true;
            }
        });
        /** Mouse Events End */
        /** Touch Events Start */
        this.__glcanvas.addEventListener('touchstart', (event) => {
            activeGLRenderer = this;
            const viewport = this.getActiveViewport();
            const pointerEvent = new ZeaTouchEvent(event, this.__glcanvas.getBoundingClientRect());
            viewport.onPointerDown(pointerEvent);
        }, { passive: true });
        this.__glcanvas.addEventListener('touchend', (event) => {
            const viewport = this.getActiveViewport();
            const pointerEvent = new ZeaTouchEvent(event, this.__glcanvas.getBoundingClientRect());
            viewport.onPointerUp(pointerEvent);
        }, { passive: true });
        this.__glcanvas.addEventListener('touchmove', (event) => {
            const viewport = this.getActiveViewport();
            const pointerEvent = new ZeaTouchEvent(event, this.__glcanvas.getBoundingClientRect());
            viewport.onPointerMove(pointerEvent);
        }, { passive: true });
        this.__glcanvas.addEventListener('touchcancel', (event) => {
            const viewport = this.getActiveViewport();
            const pointerEvent = new ZeaTouchEvent(event, this.__glcanvas.getBoundingClientRect());
            viewport.onTouchCancel(pointerEvent);
        }, { passive: true });
        /** Touch Events End */
        const onWheel = (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            if (activeGLRenderer) {
                const pointerEvent = new ZeaWheelEvent(event, this.__glcanvas.getBoundingClientRect());
                const vp = activeGLRenderer.getActiveViewport();
                if (vp) {
                    vp.onWheel(pointerEvent);
                }
            }
        };
        /** DOMMouseScroll is for mozilla. */
        window.addEventListener('wheel', onWheel, { passive: false });
        window.oncontextmenu = function () {
            return false;
        };
        document.addEventListener('keydown', (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            const keyboardEvent = new KeyboardEvent(event);
            const vp = activeGLRenderer.getActiveViewport();
            if (vp) {
                vp.onKeyDown(keyboardEvent);
            }
        });
        document.addEventListener('keyup', (event) => {
            if (activeGLRenderer != this || !isValidCanvas())
                return;
            const keyboardEvent = new KeyboardEvent(event);
            const vp = activeGLRenderer.getActiveViewport();
            if (vp) {
                vp.onKeyUp(keyboardEvent);
            }
        });
    }
    /**
     * Returns canvas that was used to generate the gl context.
     *
     * @return - The return value.
     */
    getGLCanvas() {
        return this.__glcanvas;
    }
    /**
     * Frames the specified viewport to the entire scene.
     * > See also: ${Viewport#frameView}
     * @param viewportIndex - The viewportIndex value. If multiple viewports are configured, a viewport index will need to be provided.
     */
    frameAll(viewportIndex = 0) {
        this.__viewports[viewportIndex].frameView([this.__scene.getRoot()]);
    }
    // ///////////////////////
    // Render Items Setup
    /**
     * A factory function used to construct new shader objects. If that specified shader has already been constructed, it returns the existing shader.
     * @param shaderName - The shader name.
     * @return - The return value.
     */
    getOrCreateShader(shaderName) {
        let glShader = this.__shaders[shaderName];
        if (!glShader) {
            glShader = Registry.constructClass(shaderName);
            if (!glShader)
                console.error('@GLBaseRenderer#getOrCreateShader - Shader not registered with the Registry:', shaderName);
            glShader.setGLContext(this.__gl);
            this.__shaders[shaderName] = glShader;
        }
        return glShader;
    }
    /**
     * The addPass method.
     * @param pass - The pass value.
     * @param passType - The passType value.
     * @param updateIndices - The updateIndices value.
     * @return - The return value.
     */
    addPass(pass, passType = -1, updateIndices = true) {
        if (passType == -1)
            passType = pass.getPassType();
        if (!this.__passes[passType])
            this.__passes[passType] = [];
        let index = 0;
        for (const key in this.__passes) {
            if (key == passType.toString())
                break;
            index += this.__passes[key].length;
        }
        index += this.__passes[passType].length;
        pass.on('updated', (event) => {
            this.requestRedraw();
            // If a pass is requesting an update, it is because geometry or
            // visibility is changing and the geom data Fbo will also be out
            // of date.
            this.renderGeomDataFbos();
        });
        pass.init(this, index);
        this.__passes[passType].push(pass);
        if (updateIndices) {
            // Now update all the  subsequent pass indices because the
            // indices after will have changed.
            let offset = 0;
            for (const key in this.__passes) {
                const passSet = this.__passes[key];
                passSet.forEach((pass, index) => {
                    pass.setPassIndex(offset + index);
                });
                offset += passSet.length;
            }
        }
        this.__passesRegistrationOrder.push(pass);
        this.requestRedraw();
        return index;
    }
    /**
     * The getPass method.
     * @param index - The index value.
     * @return - The return value.
     */
    getPass(index) {
        let offset = 0;
        for (const key in this.__passes) {
            const passSet = this.__passes[key];
            if (index - offset < passSet.length)
                return passSet[index - offset];
            offset += passSet.length;
        }
        return undefined;
    }
    // ///////////////////////
    // VR Setup
    /**
     * The supportsVR method.
     * @return - The return value.
     */
    supportsVR() {
        var _a;
        console.warn('@GLBaseRenderer#supportVR - Deprecated Method. Please instead connect to the vrViewportSetup signal.');
        return this.__supportXR && ((_a = navigator) === null || _a === void 0 ? void 0 : _a.xr) != null;
    }
    /**
     * The __setupXRViewport method.
     * @return - The return value.
     * @private
     */
    __setupXRViewport() {
        // Always get the last display. Additional displays are added at the end.(e.g. [Polyfill, HMD])
        const xrvp = new VRViewport(this);
        const emitViewChanged = (event) => {
            this.emit('viewChanged', event);
        };
        xrvp.on('presentingChanged', (event) => {
            const state = event.state;
            this.__xrViewportPresenting = state;
            if (state) {
                // Let the passes know that VR is starting.
                // They can do things like optimize shaders.
                for (const key in this.__passes) {
                    const passSet = this.__passes[key];
                    for (const pass of passSet) {
                        pass.startPresenting();
                    }
                }
                xrvp.on('viewChanged', emitViewChanged);
            }
            else {
                xrvp.off('viewChanged', emitViewChanged);
                this.emit('updated');
                for (const key in this.__passes) {
                    const passSet = this.__passes[key];
                    for (const pass of passSet) {
                        pass.stopPresenting();
                    }
                }
                const viewXfo = this.getViewport().getCamera().globalXfoParam.value;
                const event = new ViewChangedEvent('CameraAndPointer', viewXfo);
                this.emit('viewChanged', event);
                this.requestRedraw();
            }
        });
        return xrvp;
    }
    /**
     * The getVRViewport method.
     * @return - The return value.
     */
    getVRViewport() {
        return this.__xrViewport;
    }
    /**
     * The getXRViewport method.
     * @return - The return value.
     */
    getXRViewport() {
        return this.__xrViewportPromise;
    }
    /**
     * The isXRViewportPresenting method.
     * @return - The return value.
     */
    isXRViewportPresenting() {
        return this.__xrViewportPresenting;
    }
    // //////////////////////////
    // Rendering
    /**
     * The isContinuouslyDrawing method.
     * @return - The return value.
     */
    isContinuouslyDrawing() {
        return this.__continuousDrawing;
    }
    /**
     * The startContinuousDrawing method.
     */
    startContinuousDrawing() {
        if (this.isContinuouslyDrawing() || this.__xrViewportPresenting)
            return;
        const onAnimationFrame = () => {
            if (this.__continuousDrawing && !this.__xrViewportPresenting)
                window.requestAnimationFrame(onAnimationFrame);
            for (const vp of this.__viewports)
                vp.draw();
        };
        this.__continuousDrawing = true;
        window.requestAnimationFrame(onAnimationFrame);
    }
    /**
     * The stopContinuousDrawing method.
     */
    stopContinuousDrawing() {
        this.__continuousDrawing = false;
    }
    /**
     * The toggleContinuousDrawing method.
     */
    toggleContinuousDrawing() {
        if (!this.__continuousDrawing) {
            this.startContinuousDrawing();
        }
        else {
            this.stopContinuousDrawing();
        }
    }
    /**
     * The drawItemChanged method.
     */
    drawItemChanged() {
        for (const vp of this.__viewports)
            vp.invalidateGeomDataBuffer();
        this.requestRedraw();
    }
    /**
     * Request a single redraw, usually in response to a signal/event.
     * @return - The return value.
     */
    requestRedraw() {
        // If a redraw has already been requested, then simply return and wait.
        if (this.__redrawRequested ||
            this.__continuousDrawing ||
            this.__xrViewportPresenting ||
            this.__drawSuspensionLevel > 0) {
            return false;
        }
        const onAnimationFrame = () => {
            this.__redrawRequested = false;
            for (const vp of this.__viewports) {
                vp.draw();
            }
        };
        window.requestAnimationFrame(onAnimationFrame);
        this.__redrawRequested = true;
        return true;
    }
    /**
     * Forces a redraw of the viewports
     */
    forceRender() {
        if (!this.__redrawRequested) {
            console.warn('@GlBaseRenderer#forceRender - Scene is not dirty');
            return;
        }
        this.__redrawRequested = false;
        for (const vp of this.__viewports) {
            vp.draw();
        }
    }
    /**
     * The bindGLBaseRenderer method.
     * @param renderstate - The renderstate value.
     */
    bindGLBaseRenderer(renderstate) {
        renderstate.gl = this.__gl;
        renderstate.shaderopts = { directives: this.directives }; // we will start deprecating this in favor os a simpler directives
        const gl = this.__gl;
        if (!renderstate.viewports || renderstate.viewports.length == 1) {
            renderstate.bindRendererUnifs = (unifs) => {
                const { cameraMatrix, viewMatrix, projectionMatrix, eye, isOrthographic } = unifs;
                if (cameraMatrix) {
                    gl.uniformMatrix4fv(cameraMatrix.location, false, renderstate.cameraMatrix.asArray());
                }
                const vp = renderstate.viewports[0];
                if (viewMatrix) {
                    gl.uniformMatrix4fv(viewMatrix.location, false, vp.viewMatrix.asArray());
                }
                if (projectionMatrix) {
                    gl.uniformMatrix4fv(projectionMatrix.location, false, vp.projectionMatrix.asArray());
                }
                if (eye) {
                    // for monocular rendering, we just render viewport 0
                    gl.uniform1i(eye.location, 0);
                }
                if (isOrthographic) {
                    // Left or right eye, when rendering sterio VR.
                    gl.uniform1i(isOrthographic.location, vp.isOrthographic);
                }
            };
            renderstate.bindViewports = (unifs, cb) => cb();
        }
        else {
            renderstate.bindRendererUnifs = (unifs) => {
                // Note: the camera matrix should be the head position instead
                // of the eye position. The inverse(viewMatrix) can be used
                // when we want the eye pos.
                const { cameraMatrix } = unifs;
                if (cameraMatrix) {
                    gl.uniformMatrix4fv(cameraMatrix.location, false, renderstate.cameraMatrix.asArray());
                }
            };
            renderstate.bindViewports = (unifs, cb) => {
                renderstate.viewports.forEach((vp, index) => {
                    let vp_region = vp.region;
                    gl.viewport(vp_region[0], vp_region[1], vp_region[2], vp_region[3]);
                    const { viewMatrix, projectionMatrix, eye, isOrthographic } = unifs;
                    if (viewMatrix) {
                        gl.uniformMatrix4fv(viewMatrix.location, false, vp.viewMatrix.asArray());
                    }
                    if (projectionMatrix) {
                        gl.uniformMatrix4fv(projectionMatrix.location, false, vp.projectionMatrix.asArray());
                    }
                    if (eye) {
                        // Left or right eye, when rendering sterio VR.
                        gl.uniform1i(eye.location, index);
                    }
                    if (isOrthographic) {
                        // Left or right eye, when rendering sterio VR.
                        gl.uniform1i(isOrthographic.location, vp.isOrthographic);
                    }
                    cb();
                });
            };
        }
    }
    /**
     * The drawScene method.
     * @param renderstate - The renderstate value.
     */
    drawScene(renderstate) {
        // Bind already called by GLRenderer.
        renderstate.directives = [...this.directives, '#define DRAW_COLOR'];
        renderstate.shaderopts.directives = renderstate.directives;
        for (const key in this.__passes) {
            const passSet = this.__passes[key];
            for (const pass of passSet) {
                if (pass.enabled)
                    pass.draw(renderstate);
            }
        }
    }
    /**
     * The drawHighlightedGeoms method.
     * @param renderstate - The renderstate value.
     */
    drawHighlightedGeoms(renderstate) {
        this.bindGLBaseRenderer(renderstate);
        renderstate.directives = [...this.directives, '#define DRAW_HIGHLIGHT'];
        renderstate.shaderopts.directives = renderstate.directives;
        for (const key in this.__passes) {
            const passSet = this.__passes[key];
            for (const pass of passSet) {
                if (pass.enabled)
                    pass.drawHighlightedGeoms(renderstate);
            }
        }
    }
    /**
     * The drawSceneGeomData method.
     * @param renderstate - The renderstate value.
     * @param mask - The mask value
     */
    drawSceneGeomData(renderstate, mask = 255) {
        this.bindGLBaseRenderer(renderstate);
        renderstate.directives = [...this.directives, '#define DRAW_GEOMDATA'];
        renderstate.shaderopts.directives = renderstate.directives;
        renderstate.floatGeomBuffer = this.floatGeomBuffer;
        for (const key in this.__passes) {
            // Skip pass categories that do not match
            // the mask. E.g. we may not want to hit
            // "Overlay" geoms such as labels,
            // or we might be trying to move labels and don't
            // want to grab normal geoms.
            if ((Number.parseInt(key) & mask) == 0)
                continue;
            const passSet = this.__passes[key];
            for (const pass of passSet) {
                if (pass.enabled)
                    pass.drawGeomData(renderstate);
            }
        }
    }
    // ////////////////////////////////////////
    // Static Methods
    /**
     * The registerPass method.
     * @param cls - The cls value.
     * @param passType - The passType value.
     */
    static registerPass(cls, passType) {
        if (!registeredPasses[passType])
            registeredPasses[passType] = [];
        registeredPasses[passType].push(cls);
    }
    /**
     * The destroy is called by the system to cause explicit resources cleanup.
     * Users should never need to call this method directly.
     */
    destroy() {
        this.resizeObserver.disconnect();
    }
}
export { GLBaseRenderer };
//# sourceMappingURL=GLBaseRenderer.js.map