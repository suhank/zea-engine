
import {
    SystemDesc
} from '../BrowserDetection.js';
import {
    Vec2,
    Vec3,
    Quat,
    Mat4,
    Box3,
    Xfo
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    TreeItem
} from './TreeItem.js';
import {
    TreeItem
} from './TreeItem.js';



class Camera extends TreeItem {
    constructor(name = undefined) {
        if (name == undefined)
            name = "Camera";
        super(name);

        this.__isOrthographicParam = this.addParameter('isOrthographic', false);
        this.__fovParam = this.addParameter('fov', 1.0);
        this.__nearParam = this.addParameter('near', 0.1);
        this.__farParam = this.addParameter('far', 1000.0);
        this.__focalDistanceParam = this.addParameter('focalDistance', 5.0);

        this.__viewMatParam = this.addParameter('viewMat', new Mat4());
        let _cleanViewMat = (xfo)=>{
            return this.__globalXfoParam.getValue().inverse().toMat4();
        }
        this.__globalXfoParam.valueChanged.connect((changeType)=>{
            this.__viewMatParam.setDirty(_cleanViewMat);
        });

        this.viewMatChanged = this.__viewMatParam.valueChanged;
        this.projectionParamChanged = new Signal();
        this.movementFinished = new Signal();

        this.__isOrthographicParam.valueChanged.connect(this.projectionParamChanged.emit);
        this.__fovParam.valueChanged.connect(this.projectionParamChanged.emit);
        this.__nearParam.valueChanged.connect(this.projectionParamChanged.emit);
        this.__farParam.valueChanged.connect(this.projectionParamChanged.emit);

        // Initial viewing coords of a person standing 3 meters away from the
        // center of the stage looking at something 1 meter off the ground.
        this.setPositionAndTarget(new Vec3(3, 3, 1.75), new Vec3(0, 0, 1));
        this.setLensFocalLength('24mm')

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

    setLensFocalLength(value) {
        // https://www.nikonians.org/reviews/fov-tables
        const mapping = {
            '10mm': 100.4,
            '11mm': 95.0,
            '12mm': 90.0,
            '14mm': 81.2,
            '15mm': 77.3,
            '17mm': 70.4,
            '18mm': 67.4,
            '19mm': 64.6,
            '20mm': 61.9,
            '24mm': 53.1,
            '28mm': 46.4,
            '30mm': 43.6,
            '35mm': 37.8,
            '45mm': 29.9,
            '50mm': 27.0,
            '55mm': 24.6,
            '60mm': 22.6,
            '70mm': 19.5,
            '75mm': 18.2,
            '80mm': 17.1,
            '85mm': 16.1,
            '90mm': 15.2,
            '100mm': 13.7,
            '105mm': 13.0,
            '120mm': 11.4,
            '125mm': 11.0,
            '135mm': 10.2,
            '150mm': 9.1,
            '170mm': 8.1,
            '180mm': 7.6,
            '210mm': 6.5,
            '300mm': 4.6,
            '400mm': 3.4,
            '500mm': 2.7,
            '600mm': 2.3,
            '800mm': 1.7
        };
        if(!value in mapping) {
            console.warn("Camera lense focal length not suported:" + value)
            return;
        }
        this.__fovParam.setValue(Math.degToRad(mapping[value]));
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
        xfo.setLookAt(position, target, new Vec3(0.0, 0.0, 1.0));
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
        let cameraViewVec = globalXfo.ori.getZaxis();
        let targetOffset = cameraViewVec.scale(-focalDistance);
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
        globalXfo.tr.addInPlace(cameraViewVec.scale(dollyDist));

        this.setFocalDistance(newFocalDistance);
        this.setGlobalXfo(globalXfo);
        this.movementFinished.emit();
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