
import {
    StateAction
} from '../StateAction.js';

class MoveCamera extends StateAction {
    constructor(state, camera) {
        super(state)

        this.__interpTimeParam = this.addParameter('interpTime', new NumberParameter(1.0));
        this.__updateFrequencyParam = this.addParameter('updateFrequency', new NumberParameter(30));

        this.__interpTimeParam = this.addParameter('cameraPos', new Vec3Parameter());
        this.__updateFrequencyParam = this.addParameter('cameraTarget', new Vec3Parameter());

        this.__camera = camera;
        this.__interpTime = 1.0;
        this.__updateFrequency = 1.0/30;
    }

    setTargetCameraPosisionAndTarget(pos, target){
        this.__cameraPos = pos;
        this.__cameraTarget = target;
        this.__cameraDist = pos.subtract(target).length();
    }

    start(){

        const posStart = this.__camera.getGlobalXfo().tr;
        const targetStart = this.__camera.getTargetPostion();
        const distStart = posStart.subtract(targetStart).length();
        let settingCameraDirection = true;
        let smooth_t_prev = 0;

        const interpTime = this.__interpTimeParam.getValue();
        const updateFrequency = this.__updateFrequencyParam.getValue();
        let step = 0;
        const steps = Math.round(interpTime / (1.0/updateFrequency));
        let modifyingCameraXfo = false;
        const onCameraChanged = ()=>{
            if(!modifyingCameraXfo) {
                settingCameraDirection = false;
            }
        }
        camera.globalXfoChanged.connect(onCameraChanged);
        const timerCallback = () => {
            step++;
            if (step < steps) {
                const t = step / steps;
                const smooth_t = Math.smoothStep(0.0, 1.0, t);
                const delta = (smooth_t - smooth_t_prev) / (1.0 - t);
                smooth_t_prev = smooth_t;

                const posNow = camera.getGlobalXfo().tr;
                const targetNow = camera.getTargetPostion();
                const distNow = posNow.subtract(targetNow).length();
                let newPos = posNow;
                const newTarget = targetNow.lerp(this.__cameraTarget, delta);
                if(settingCameraDirection) {
                    newPos = posNow.lerp(this.__cameraPos, delta);
                }

                let newVec = newPos.subtract(newTarget);
                let newDist = newVec.length();
                let idealDist = Math.lerp(distNow, this.__cameraDist, delta);
                // console.log("t:" + t + " delta: " + delta + " distNow:" + distNow + " idealDist:" + idealDist);
                newVec.scaleInPlace(idealDist / newVec.length());

                modifyingCameraXfo = true;
                this.__camera.setPositionAndTarget(newTarget.add(newVec), newTarget);
                modifyingCameraXfo = false;

                this.__timeoutId = window.setTimeout(timerCallback, this.__updateFrequency*1000); // Sample at 50fps.
            }
            else {
                // this.__camera.setPositionAndTarget(posEnd, targetEnd);
                this.__camera.globalXfoChanged.disconnect(onCameraChanged);
                this.__timeoutId = undefined;
                this.__onDone();
            }
        };
        timerCallback();
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
