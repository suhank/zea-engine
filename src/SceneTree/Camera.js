
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
        this.__isOrthographic = false;
        this.__fov = 1.0; // Radians
        this.__far = 1000.0; // meters
        this.__near = 0.1;
        this.__focalDistance = 5.0;
        this.__viewMatrix = new Mat4();
        this.orbitRate = isMobileDevice() ? -0.002 : 0.01;
        this.dollySpeed = 0.02;
        this.mouseWheelDollySpeed = 0.002;
        this.__defaultManipulationState = 'orbit';
        this.__manipulationState = this.__defaultManipulationState;
        this.__mouseDragDelta = new Vec2();
        this.__keyboardMovement = false;
        this.__keysPressed = [];

        this.__maxVel = 0.05;
        this.__velocity = new Vec3();

        this.viewMatChanged = new Signal();
        this.clippingRangesChanged = new Signal();
        this.projectionParamChanged = new Signal();

        // Initial viewing coords of a person standing 3 meters away from the
        // center of the stage looking at something 1 meter off the ground.
        this.setPositionAndTarget(new Vec3(3, 1.75, 3), new Vec3(0, 1, 0));

    }

    //////////////////////////////////////////////
    // Deprectated property getters/setters.

    get near() {
        return this.getNear();
    }

    get far() {
        return this.getFar();
    }

    get fov() {
        return this.getFov();
    }

    get focalDistance() {
        return this.getFocalDistance();
    }

    set focalDistance(dist) {
        this.setFocalDistance(dist);
    }

    get isOrthographic() {
        return this.getIsOrthographic();
    }

    get viewMatrix() {
        return this.getViewMatrix();
    }

    get globalXfo() {
        return this.getGlobalXfo();
    }

    set globalXfo(xfo) {
        this.setGlobalXfo(xfo);
    }

    get localXfo() {
        return this.getLocalXfo();
    }

    set localXfo(xfo) {
        this.setLocalXfo(xfo);
    }

    //////////////////////////////////////////////
    // getters/setters.

    getNear() {
        return this.__near;
    }

    setNear(value) {
        this.__near = value;
        this.projectionParamChanged.emit();
    }

    getFar() {
        return this.__far;
    }

    setFar(value) {
        this.__far = value;
        this.projectionParamChanged.emit();
    }

    getFov() {
        return this.__fov;
    }

    getFocalDistance() {
        return this.__focalDistance;
    }

    setFocalDistance(dist) {
        this.__focalDistance = dist;
        this.__near = this.__focalDistance * 0.01;
        this.__far = this.__focalDistance * 200.0;
        this.clippingRangesChanged.emit();
    }

    getIsOrthographic() {
        return this.__isOrthographic;
    }

    getViewMatrix() {
        return this.__viewMatrix;
    }

    setGlobalXfo(xfo) {
        super.setGlobalXfo(xfo);
        this.__viewMatrix = xfo.inverse().toMat4();
        this.viewMatChanged.emit(this.__viewMatrix, this.__globalXfo);
    }

    getLocalXfo() {
        return super.getLocalXfo();
    }

    setLocalXfo(xfo) {
        super.setLocalXfo(xfo);
        this.__viewMatrix = this.__globalXfo.inverse().toMat4();
        this.viewMatChanged.emit(this.__viewMatrix, this.__globalXfo);
    }

    getDefaultManipMode() {
        return this.__defaultManipulationState;
    }

    setDefaultManipMode(mode) {
        this.__defaultManipulationState = mode;
    }

    setPositionAndTarget(position, target) {
        this.focalDistance = position.distanceTo(target);
        let xfo = new Xfo();
        xfo.setLookAt(position, target, new Vec3(0.0, 1.0, 0.0));
        this.globalXfo = xfo;
    }

    look(mouseDelta, viewport) {
        if (this.__keyboardMovement) {
            this.__mouseDownCameraXfo = this.__globalXfo.clone();
            this.__mouseDownZaxis = this.__globalXfo.ori.getZaxis();
            let targetOffset = this.__mouseDownZaxis.scale(-this.__focalDistance);
            this.__mouseDownCameraTarget = this.__globalXfo.tr.add(targetOffset);
        }

        let globalXfo = this.__mouseDownCameraXfo.clone();

        // Orbit
        let orbit = new Quat();
        orbit.rotateY(mouseDelta.x * this.orbitRate * 0.12);
        // globalXfo.ori.multiplyInPlace(orbit);
        globalXfo.ori = orbit.multiply(globalXfo.ori);

        // Pitch
        let pitch = new Quat();
        pitch.rotateX(mouseDelta.y * this.orbitRate * 0.12);
        globalXfo.ori.multiplyInPlace(pitch);

        if (this.__keyboardMovement) {
            // Avoid generating a signal because we have an animation frame occuring.
            // see: onKeyPressed
            this.__globalXfo = globalXfo;
            this.__viewMatrix = globalXfo.inverse().toMat4();
        } else
            this.globalXfo = globalXfo;
    }

    orbit(mouseDelta, viewport) {
        if (this.__keyboardMovement) {
            this.__mouseDownCameraXfo = this.__globalXfo.clone();
            this.__mouseDownZaxis = this.__globalXfo.ori.getZaxis();
            let targetOffset = this.__mouseDownZaxis.scale(-this.__focalDistance);
            this.__mouseDownCameraTarget = this.__globalXfo.tr.add(targetOffset);
        }

        let globalXfo = this.__mouseDownCameraXfo.clone();

        // Orbit
        let orbit = new Quat();
        orbit.rotateY(mouseDelta.x * -this.orbitRate);
        // globalXfo.ori.multiplyInPlace(orbit);
        globalXfo.ori = orbit.multiply(globalXfo.ori);

        // Pitch
        let pitch = new Quat();
        pitch.rotateX(mouseDelta.y * -this.orbitRate);
        globalXfo.ori.multiplyInPlace(pitch);

        globalXfo.tr = this.__mouseDownCameraTarget.add(globalXfo.ori.getZaxis().scale(this.__focalDistance));

        if (this.__keyboardMovement) {
            // Avoid generating a signal because we have an animation frame occuring.
            // see: onKeyPressed
            this.__globalXfo = globalXfo;
            this.__viewMatrix = globalXfo.inverse().toMat4();
        } else
            this.globalXfo = globalXfo;
    }

    pan(mouseDelta, viewport) {
        let xAxis = new Vec3(1, 0, 0);
        let yAxis = new Vec3(0, 1, 0);

        let cameraPlaneHeight = 2.0 * this.__focalDistance * Math.tan(0.5 * this.__fov);
        let cameraPlaneWidth = cameraPlaneHeight * (viewport.getWidth() / viewport.getHeight());
        let delta = new Xfo();
        delta.tr = xAxis.scale(-(mouseDelta.x / viewport.getWidth()) * cameraPlaneWidth)
        delta.tr.addInPlace(yAxis.scale((mouseDelta.y / viewport.getHeight()) * cameraPlaneHeight));

        this.globalXfo = this.__mouseDownCameraXfo.multiply(delta);
    }

    dolly(mouseDelta, viewport) {
        let dollyDist = mouseDelta.x * this.dollySpeed;
        let delta = new Xfo();
        delta.tr.set(0, 0, dollyDist);
        this.globalXfo = this.__mouseDownCameraXfo.multiply(delta);
    }

    panAndZoom(panDelta, dragDist, viewport) {

        let xAxis = new Vec3(1, 0, 0);
        let yAxis = new Vec3(0, 1, 0);

        let cameraPlaneHeight = 2.0 * this.__focalDistance * Math.tan(0.5 * this.__fov);
        let cameraPlaneWidth = cameraPlaneHeight * (viewport.getWidth() / viewport.getHeight());
        let delta = new Xfo();
        delta.tr = xAxis.scale(-(panDelta.x / viewport.getWidth()) * cameraPlaneWidth)
        delta.tr.addInPlace(yAxis.scale((panDelta.y / viewport.getHeight()) * cameraPlaneHeight));


        let zoomDist = dragDist * this.__focalDistance;
        this.focalDistance = this.__mouseDownFocalDist + zoomDist;
        delta.tr.z += zoomDist;
        this.globalXfo = this.__mouseDownCameraXfo.multiply(delta);
    }

    initDrag(mouseDownPos) {
        this.__mouseDownPos = mouseDownPos;
        this.__mouseDragDelta.set(0, 0);
        this.__mouseDownCameraXfo = this.__globalXfo.clone();
        this.__mouseDownZaxis = this.__globalXfo.ori.getZaxis();
        let targetOffset = this.__mouseDownZaxis.scale(-this.__focalDistance);
        this.__mouseDownCameraTarget = this.__globalXfo.tr.add(targetOffset);
        this.__mouseDownFocalDist = this.__focalDistance;
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
        let zoomDist = event.deltaY * this.mouseWheelDollySpeed * this.__focalDistance;
        this.__globalXfo.tr.addInPlace(this.__globalXfo.ori.getZaxis().scale(zoomDist));
        if (this.__defaultManipulationState == 'orbit')
            this.focalDistance = this.__focalDistance + zoomDist;
        this.globalXfo = this.__globalXfo;
    }

    __integrateVelocityChange(velChange) {
        let delta = new Xfo();
        delta.tr = this.__velocity.normalize().scale(this.__maxVel);
        this.globalXfo = this.__globalXfo.multiply(delta);
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
            boundingBox.addBox3(treeItem.boundingBox);

        if (!boundingBox.isValid())
            return;

        let cameraZaxis = this.__globalXfo.ori.getZaxis();
        let targetOffset = cameraZaxis.scale(-this.__focalDistance);
        let currTarget = this.__globalXfo.tr.add(targetOffset);
        let newTarget = boundingBox.center();

        let transformedBBox = new Box3();
        let mat4 = this.__globalXfo.toMat4();
        mat4.translation.set(0, 0, 0);
        transformedBBox.addBox3(boundingBox, mat4);
        let boundingBoxSize = transformedBBox.size();
        let boundingBoxRad = (boundingBoxSize.x + boundingBoxSize.z) * 0.25;

        let cameraPlaneHeight = 2.0 * this.__focalDistance * Math.tan(0.5 * this.__fov);
        let cameraPlaneWidth = cameraPlaneHeight * (viewport.getWidth() / viewport.getHeight());

        let newFocalDistanceX = ((boundingBoxRad * 2.0) / cameraPlaneWidth) * this.__focalDistance * 1.2;
        let newFocalDistanceY = (boundingBoxSize.y / cameraPlaneHeight) * this.__focalDistance * 1.2;
        let newFocalDistance = Math.max(newFocalDistanceX, newFocalDistanceY);

        let pan = newTarget.subtract(currTarget);
        let dolly = cameraZaxis.scale(newFocalDistance - this.__focalDistance);

        let globalXfo = this.__globalXfo.clone();
        globalXfo.tr.addInPlace(pan);
        globalXfo.tr.addInPlace(dolly);
        this.globalXfo = globalXfo;
        this.focalDistance = newFocalDistance;
    }

    updateProjectionMatrix(mat, aspect) {
        mat.setPerspectiveMatrix(this.__fov, aspect, this.__near, this.__far);
    }
};

export {
    Camera
};
//export default Camera;