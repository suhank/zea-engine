
import {
    isMobileDevice
} from '../BrowserDetection.js';
import {
    Vec2,
    Vec3,
    Quat,
    Mat4,
    Box3,
    Xfo,
    Signal
} from '../Math';
import {
    TreeItem
} from './TreeItem.js';

class Camera extends TreeItem {
    constructor(name = undefined) {
        if (name == undefined)
            name = "Camera";
        super(name);

        this.__defaultManipulationState = 'orbit';
        this.__manipulationState = this.__defaultManipulationState;
        this.__mouseDragDelta = new Vec2();
        this.__keyboardMovement = false;
        this.__keysPressed = [];
        this.__maxVel = 0.002;
        this.__velocity = new Vec3();

        this.__isOrthographicParam = this.addParameter('isOrthographic', false);
        this.__fovParam = this.addParameter('fov', 1.0);
        this.__nearParam = this.addParameter('near', 0.1);
        this.__farParam = this.addParameter('far', 1000.0);
        this.__focalDistanceParam = this.addParameter('focalDistance', 5.0);
        this.__orbitRateParam = this.addParameter('orbitRate', isMobileDevice() ? -0.002 : 0.01);
        this.__dollySpeedParam = this.addParameter('dollySpeed', 0.02);
        this.__mouseWheelDollySpeedParam = this.addParameter('mouseWheelDollySpeed', 0.002);

        this.__viewMatParam = this.addParameter('viewMat', new Mat4());
        let _cleanViewMat = (xfo)=>{
            return this.__globalXfoParam.getValue().inverse().toMat4();
        }
        this.__globalXfoParam.valueChanged.connect((changeType)=>{
            this.__viewMatParam.setDirty(_cleanViewMat);
        });

        this.viewMatChanged = this.__viewMatParam.valueChanged;
        this.projectionParamChanged = new Signal();
        this.__isOrthographicParam.valueChanged.connect(this.projectionParamChanged.emit);
        this.__fovParam.valueChanged.connect(this.projectionParamChanged.emit);
        this.__nearParam.valueChanged.connect(this.projectionParamChanged.emit);
        this.__farParam.valueChanged.connect(this.projectionParamChanged.emit);

        // Initial viewing coords of a person standing 3 meters away from the
        // center of the stage looking at something 1 meter off the ground.
        this.setPositionAndTarget(new Vec3(3, 1.75, 3), new Vec3(0, 1, 0));
    }

    //////////////////////////////////////////////
    // Deprectated property getters/setters.

    get near() {
        console.warn(("near is deprectated. Please use 'getNear'"));
        return this.getNear();
    }

    get far() {
        console.warn(("far is deprectated. Please use 'getFar'"));
        return this.getFar();
    }

    get fov() {
        console.warn(("fov is deprectated. Please use 'getFov'"));
        return this.getFov();
    }

    get focalDistance() {
        console.warn(("focalDistance is deprectated. Please use 'getFocalDistance'"));
        return this.getFocalDistance();
    }

    set focalDistance(dist) {
        console.warn(("focalDistance is deprectated. Please use 'getFocalDistance'"));
        this.setFocalDistance(dist);
    }

    get isOrthographic() {
        console.warn(("get isOrthographic is deprectated. Please use 'getIsOrthographic'"));
        return this.getIsOrthographic();
    }

    get viewMatrix() {
        console.warn(("get viewMatrix is deprectated. Please use 'getViewMatrix'"));
        return this.getViewMatrix();
    }

    get globalXfo() {
        console.warn(("get localXfo is deprectated. Please use 'getLocalXfo'"));
        return this.getGlobalXfo();
    }

    set globalXfo(xfo) {
        console.warn(("set globalXfo is deprectated. Please use 'setGlobalXfo'"));
        this.setGlobalXfo(xfo);
    }

    get localXfo() {
        console.warn(("set localXfo is deprectated. Please use 'getLocalXfo'"));
        return this.getLocalXfo();
    }

    set localXfo(xfo) {
        console.warn(("set localXfo is deprectated. Please use 'setLocalXfo'"));
        this.setLocalXfo(xfo);
    }

    //////////////////////////////////////////////
    // getters/setters.

    getNear() {
        return this.__nearParam.getValue();
    }

    setNear(value) {
        this.__nearParam.setValue(value);
    }

    getFar() {
        return this.__farParam.getValue();
    }

    setFar(value) {
        this.__farParam.setValue(value);
    }

    getFov() {
        return this.__fovParam.getValue();
    }

    setFov(value) {
        this.__fovParam.setValue(value);
    }

    getFocalDistance() {
        return this.__focalDistanceParam.getValue();
    }

    setFocalDistance(dist) {
        this.__focalDistanceParam.setValue(dist);
        this.__nearParam.setValue(dist * 0.01);
        this.__farParam.setValue(dist * 200.0);
    }

    getIsOrthographic() {
        return this.__isOrthographicParam.getValue();
    }

    setIsOrthographic(value) {
        this.__isOrthographicParam.setValue(value);
    }

    getViewMatrix() {
        return this.__viewMatParam.getValue();
    }

    getDefaultManipMode() {
        return this.__defaultManipulationState;
    }

    setDefaultManipMode(mode) {
        this.__defaultManipulationState = mode;
    }

    setPositionAndTarget(position, target) {
        this.setFocalDistance(position.distanceTo(target));
        let xfo = new Xfo();
        xfo.setLookAt(position, target, new Vec3(0.0, 1.0, 0.0));
        this.setGlobalXfo(xfo);
    }

    getTargetPostion() {
        let focalDistance = this.__focalDistanceParam.getValue();
        let xfo = this.getGlobalXfo();
        let target = xfo.ori.getZaxis();
        target.scaleInPlace(-focalDistance);
        target.addInPlace(xfo.tr);
        return target;
    }

    look(mouseDelta, viewport) {
        let focalDistance = this.__focalDistanceParam.getValue();
        let orbitRate = this.__orbitRateParam.getValue();

        if (this.__keyboardMovement) {
            let globalXfo = this.getGlobalXfo();
            this.__mouseDownCameraXfo = globalXfo.clone();
            this.__mouseDownZaxis = globalXfo.ori.getZaxis();
            let targetOffset = this.__mouseDownZaxis.scale(-focalDistance);
            this.__mouseDownCameraTarget = globalXfo.tr.add(targetOffset);
        }

        let globalXfo = this.__mouseDownCameraXfo.clone();

        // Orbit
        let orbit = new Quat();
        orbit.rotateY(mouseDelta.x * orbitRate * 0.12);
        // globalXfo.ori.multiplyInPlace(orbit);
        globalXfo.ori = orbit.multiply(globalXfo.ori);

        // Pitch
        let pitch = new Quat();
        pitch.rotateX(mouseDelta.y * orbitRate * 0.12);
        globalXfo.ori.multiplyInPlace(pitch);

        if (this.__keyboardMovement) {
            // TODO: debug this potential regression. we now use the generic method which emits a signal.
            // Avoid generating a signal because we have an animation frame occuring.
            // see: onKeyPressed
            this.setGlobalXfo(globalXfo);
        } else {
            this.setGlobalXfo(globalXfo);
        }
    }

    orbit(mouseDelta, viewport) {
        let focalDistance = this.__focalDistanceParam.getValue();
        let orbitRate = this.__orbitRateParam.getValue();

        if (this.__keyboardMovement) {
            let globalXfo = this.getGlobalXfo();
            this.__mouseDownCameraXfo = globalXfo.clone();
            this.__mouseDownZaxis = globalXfo.ori.getZaxis();
            let targetOffset = this.__mouseDownZaxis.scale(-focalDistance);
            this.__mouseDownCameraTarget = globalXfo.tr.add(targetOffset);
        }

        let globalXfo = this.__mouseDownCameraXfo.clone();

        // Orbit
        let orbit = new Quat();
        orbit.rotateY(mouseDelta.x * -orbitRate);
        // globalXfo.ori.multiplyInPlace(orbit);
        globalXfo.ori = orbit.multiply(globalXfo.ori);

        // Pitch
        let pitch = new Quat();
        pitch.rotateX(mouseDelta.y * -orbitRate);
        globalXfo.ori.multiplyInPlace(pitch);

        globalXfo.tr = this.__mouseDownCameraTarget.add(globalXfo.ori.getZaxis().scale(focalDistance));

        if (this.__keyboardMovement) {
            // TODO: debug this potential regression. we now use the generic method which emits a signal.
            // Avoid generating a signal because we have an animation frame occuring.
            // see: onKeyPressed
            this.setGlobalXfo(globalXfo);
        } else {
            this.setGlobalXfo(globalXfo);
        }
    }

    pan(mouseDelta, viewport) {
        let focalDistance = this.__focalDistanceParam.getValue();
        let fovY = this.__fovParam.getValue();
        let xAxis = new Vec3(1, 0, 0);
        let yAxis = new Vec3(0, 1, 0);

        let cameraPlaneHeight = 2.0 * focalDistance * Math.tan(0.5 * fovY);
        let cameraPlaneWidth = cameraPlaneHeight * (viewport.getWidth() / viewport.getHeight());
        let delta = new Xfo();
        delta.tr = xAxis.scale(-(mouseDelta.x / viewport.getWidth()) * cameraPlaneWidth)
        delta.tr.addInPlace(yAxis.scale((mouseDelta.y / viewport.getHeight()) * cameraPlaneHeight));

        this.setGlobalXfo(this.__mouseDownCameraXfo.multiply(delta));
    }

    dolly(mouseDelta, viewport) {
        let dollyDist = mouseDelta.x * this.__dollySpeedParam.getValue();
        let delta = new Xfo();
        delta.tr.set(0, 0, dollyDist);
        this.setGlobalXfo(this.__mouseDownCameraXfo.multiply(delta));
    }

    panAndZoom(panDelta, dragDist, viewport) {
        let focalDistance = this.__focalDistanceParam.getValue();
        let fovY = this.__fovParam.getValue();

        let xAxis = new Vec3(1, 0, 0);
        let yAxis = new Vec3(0, 1, 0);

        let cameraPlaneHeight = 2.0 * focalDistance * Math.tan(0.5 * fovY);
        let cameraPlaneWidth = cameraPlaneHeight * (viewport.getWidth() / viewport.getHeight());
        let delta = new Xfo();
        delta.tr = xAxis.scale(-(panDelta.x / viewport.getWidth()) * cameraPlaneWidth)
        delta.tr.addInPlace(yAxis.scale((panDelta.y / viewport.getHeight()) * cameraPlaneHeight));


        let zoomDist = dragDist * focalDistance;
        this.focalDistance = this.__mouseDownFocalDist + zoomDist;
        delta.tr.z += zoomDist;
        this.setGlobalXfo(this.__mouseDownCameraXfo.multiply(delta));
    }

    initDrag(mouseDownPos) {
        let focalDistance = this.__focalDistanceParam.getValue();
        this.__mouseDownPos = mouseDownPos;
        this.__mouseDragDelta.set(0, 0);
        this.__mouseDownCameraXfo = this.getGlobalXfo().clone();
        this.__mouseDownZaxis = this.getGlobalXfo().ori.getZaxis();
        let targetOffset = this.__mouseDownZaxis.scale(-focalDistance);
        this.__mouseDownCameraTarget = this.getGlobalXfo().tr.add(targetOffset);
        this.__mouseDownFocalDist = focalDistance;
    }

    onDragStart(event, mouseDownPos, viewport) {
        this.initDrag(mouseDownPos);

        if (event.altKey || event.button == 2) {
            this.__manipulationState = 'pan';
        } else if (event.ctrlKey && event.altKey) {
            this.__manipulationState = 'dolly';
        } else {
            this.__manipulationState = this.__defaultManipulationState;
        }
    }

    onDrag(event, mousePos, viewport) {
        // During requestPointerLock, the offsetX/Y values are not updated.
        // Instead we get a relative delta that we use to compute the total
        // delta for the drag.
        // if(this.__keyboardMovement){
        //     this.__mouseDragDelta.x = event.movementX;
        //     this.__mouseDragDelta.y = event.movementY;
        // }
        // else{
        //     this.__mouseDragDelta.x += event.movementX;
        //     this.__mouseDragDelta.y += event.movementY;
        // }
        if (this.__keyboardMovement) {
            this.__mouseDragDelta = mousePos;
        } else {
            this.__mouseDragDelta = mousePos.subtract(this.__mouseDownPos);
        }
        switch (this.__manipulationState) {
            case 'orbit':
                this.orbit(this.__mouseDragDelta, viewport);
                break;
            case 'look':
                this.look(this.__mouseDragDelta, viewport);
                break;
            case 'pan':
                this.pan(this.__mouseDragDelta, viewport);
                break;
            case 'dolly':
                this.dolly(this.__mouseDragDelta, viewport);
                break;
        }
    }

    onDragEnd(event, mouseUpPos, viewport) {
        return false;
    }

    onWheel(event) {
        let focalDistance = this.__focalDistanceParam.getValue();
        let mouseWheelDollySpeed = this.__mouseWheelDollySpeedParam.getValue();
        let zoomDist = event.deltaY * mouseWheelDollySpeed * focalDistance;
        let xfo = this.getGlobalXfo();
        xfo.tr.addInPlace(xfo.ori.getZaxis().scale(zoomDist));
        if (this.__defaultManipulationState == 'orbit')
            this.__focalDistanceParam.setValue( focalDistance + zoomDist);
        this.setGlobalXfo(xfo);
    }

    __integrateVelocityChange(velChange) {
        let delta = new Xfo();
        delta.tr = this.__velocity.normalize().scale(this.__maxVel);
        this.setGlobalXfo(this.getGlobalXfo().multiply(delta));
    }

    onKeyPressed(key) {
        // Note: onKeyPressed is called intiallly only once, and then we 
        // get a series of calls. Here we ignore subsequent events.
        // (TODO: move this logic to GLRenderer)
        switch (key) {
            case 'w':
                if (this.__keysPressed.indexOf(key) != -1)
                    return false;
                this.__velocity.z -= 1.0;
                break;
            case 's':
                if (this.__keysPressed.indexOf(key) != -1)
                    return false;
                this.__velocity.z += 1.0;
                break;
            case 'a':
                if (this.__keysPressed.indexOf(key) != -1)
                    return false;
                this.__velocity.x -= 1.0;
                break;
            case 'd':
                if (this.__keysPressed.indexOf(key) != -1)
                    return false;
                this.__velocity.x += 1.0;
                break;
            default:
                return false;
        }
        this.__keysPressed.push(key);
        if (!this.__keyboardMovement) {
            this.__keyboardMovement = true;
            let _this = this;
            let animationFrame = function() {
                _this.__integrateVelocityChange()
                if (_this.__keyboardMovement)
                    window.requestAnimationFrame(animationFrame);
            }
            window.requestAnimationFrame(animationFrame);
        }
        return true;
    }

    onKeyDown(key) {}

    onKeyUp(key) {
        switch (key) {
            case 'w':
                this.__velocity.z += 1.0;
                break;
            case 's':
                this.__velocity.z -= 1.0;
                break;
            case 'a':
                this.__velocity.x += 1.0;
                break;
            case 'd':
                this.__velocity.x -= 1.0;
                break;
            default:
                return false;
        }
        let keyIndex = this.__keysPressed.indexOf(key);
        this.__keysPressed.splice(keyIndex, 1);
        if (this.__keysPressed.length == 0)
            this.__keyboardMovement = false;
        return true;
    }


    /////////////////////////////

    frameView(viewport, treeItems) {
        let boundingBox = new Box3();
        for (let treeItem of treeItems)
            boundingBox.addBox3(treeItem.getBoundingBox());

        if (!boundingBox.isValid())
            return;
        let focalDistance = this.__focalDistanceParam.getValue();
        let fovY = this.__fovParam.getValue();

        let globalXfo = this.getGlobalXfo().clone();
        let cameraZaxis = globalXfo.ori.getZaxis();
        let targetOffset = cameraZaxis.scale(-focalDistance);
        let currTarget = globalXfo.tr.add(targetOffset);
        let newTarget = boundingBox.center();

        let pan = newTarget.subtract(currTarget);
        globalXfo.tr.addInPlace(pan);

        // Transform the bounding box into camera space.
        let transformedBBox = new Box3();
        transformedBBox.addBox3(boundingBox, globalXfo.inverse());
        let camSpaceTarget = transformedBBox.center();

        let fovX = fovY * (viewport.getWidth() / viewport.getHeight());

        let camSpaceBBoxDepth = (transformedBBox.p0.z - transformedBBox.p1.z) * 0.5;
        // p1 is the closest corner of the transformed bbox.
        let p = transformedBBox.p1;
        let newFocalDistanceX = (Math.abs(p.x) / Math.tan(0.5 * fovX)) * 1.2;
        let newFocalDistanceY = (Math.abs(p.y) / Math.tan(0.5 * fovY)) * 1.2;
        let newFocalDistance = Math.max(newFocalDistanceX, newFocalDistanceY) - camSpaceBBoxDepth;

        let dollyDist = newFocalDistance - focalDistance;
        globalXfo.tr.addInPlace(cameraZaxis.scale(dollyDist));

        this.setFocalDistance(newFocalDistance);
        this.setGlobalXfo(globalXfo);
        
    }

    updateProjectionMatrix(mat, aspect) {
        let isOrthographic = this.__isOrthographicParam.getValue();
        let fov = this.__fovParam.getValue();
        let near = this.__nearParam.getValue();
        let far = this.__farParam.getValue();
        let focalDistance = this.__focalDistanceParam.getValue();
        mat.setPerspectiveMatrix(fov, aspect, near, far);
    }
};

export {
    Camera
};
//export default Camera;