

import {
    Parameter,
    NumberParameter,
    Vec2Parameter,
    Vec3Parameter,
    ColorParameter
} from '../../SceneTree/Parameters';
import {
    StateAction
} from '../StateAction.js';

class MoveCamera extends StateAction {
    constructor(camera) {
        super()

        this.__interpTimeParam = this.addParameter(new NumberParameter('interpTime', 1.0));
        this.__updateFrequencyParam = this.addParameter(new NumberParameter('updateFrequency', 30));

        // this.__cameraPathParam = this.addParameter('cameraPath', "");
        // this.__cameraPathParam.valueChanged.connect((changeType)=>{
        //     this.__camera = this.__state.getStateMachine().getTreeItem().resolvePath(this.__cameraPathParam.getValue());
        // });
        this.__cameraPosParam = this.addParameter('cameraPos', new Vec3Parameter());
        this.__cameraTargetParam = this.addParameter('cameraTarget', new Vec3Parameter());

        this.__camera = camera;
    }

    setCameraPosisionAndTarget(pos, target){
        this.__cameraPosParam.setValue(pos);
        this.__cameraTargetParam.setValue(target);
    }

    start(){

        const interpTime = this.__interpTimeParam.getValue();
        if(interpTime > 0.0) {

            const posStart = this.__camera.getGlobalXfo().tr;
            const targetStart = this.__camera.getTargetPostion();
            const distStart = posStart.subtract(targetStart).length();
            
            const posEnd = this.__cameraPosParam.getValue();
            const targetEnd = this.__cameraTargetParam.getValue();
            const distEnd = posEnd.subtract(targetEnd).length();

            let settingCameraDirection = true;
            let smooth_t_prev = 0;

            const updateFrequency = this.__updateFrequencyParam.getValue();
            let step = 0;
            const steps = Math.round(interpTime * updateFrequency);
            let modifyingCameraXfo = false;
            const onCameraChanged = ()=>{
                if(!modifyingCameraXfo) {
                    settingCameraDirection = false;
                }
            }
            this.__camera.globalXfoChanged.connect(onCameraChanged);
            const timerCallback = () => {
                step++;
                if (step < steps) {
                    const t = step / steps;
                    const smooth_t = Math.smoothStep(0.0, 1.0, t);
                    const delta = (smooth_t - smooth_t_prev) / (1.0 - t);
                    smooth_t_prev = smooth_t;

                    const posNow = this.__camera.getGlobalXfo().tr;
                    const targetNow = this.__camera.getTargetPostion();
                    const distNow = posNow.subtract(targetNow).length();
                    let newPos = posNow;
                    const newTarget = targetNow.lerp(targetEnd, delta);
                    if(settingCameraDirection) {
                        newPos = posNow.lerp(posEnd, delta);
                    }

                    const newVec = newPos.subtract(newTarget);
                    const newDist = newVec.length();
                    const idealDist = Math.lerp(distNow, distEnd, delta);
                    // console.log("t:" + t + " delta: " + delta + " distNow:" + distNow + " idealDist:" + idealDist);
                    newVec.scaleInPlace(idealDist / newVec.length());

                    modifyingCameraXfo = true;
                    this.__camera.setPositionAndTarget(newTarget.add(newVec), newTarget);
                    modifyingCameraXfo = false;

                    this.__timeoutId = window.setTimeout(timerCallback, 1000/updateFrequency);
                }
                else {
                    // this.__camera.setPositionAndTarget(posEnd, targetEnd);
                    this.__camera.globalXfoChanged.disconnect(onCameraChanged);
                    this.__camera.movementFinished.emit();
                    this.__timeoutId = undefined;
                    this.__onDone();
                }
            };
            timerCallback();
        }
        else {
            this.__camera.setPositionAndTarget(newTarget.add(newVec), newTarget);
        }
    }


    cancel() {
        if(this.__timeoutId){
            clearTimeout(this.__timeoutId);
            this.__timeoutId = undefined;
        }
    }
    
};

export {
    MoveCamera
};
