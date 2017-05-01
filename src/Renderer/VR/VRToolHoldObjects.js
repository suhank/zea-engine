import {
    Xfo,
    Mat4
} from '../../Math';

class VRToolHoldObjects {
    constructor(vrStage, vrHead, vrControllers) {

        this.__vrStage = vrStage;
        this.__vrHead = vrHead;
        this.__vrControllers = vrControllers;

        this.__projMatrix = new Mat4();
        this.__projMatrix.setOrthographicMatrix(-0.03, 0.03, -0.03, 0.03, 0.0, 0.06);
        this.createGeomDataFbo();

        this.__pressedButtonCount = [];
        this.__pressedButtons = [];
        this.__heldGeomItems = [];
        this.__heldGeomItemOffsets = [];

        let bindController = (id) => {
            let vrController = this.__vrControllers[id];
            vrController.setHandleColor(new Color(0, 0, 1));

            vrController.buttonPressed.connect(() => {
                if(!this.__active)
                    return;
                this.__pressedButtonCount++;
                this.__pressedButtons[id] = true;
                this.__heldGeomItems[id] = this.getGeomItemAtController(id);
                this.initAction();
            }, this);

            vrController.buttonReleased.connect(() => {
                if(!this.__active)
                    return;
                this.__pressedButtonCount--;
                this.__pressedButtons[id] = false;
                this.__heldGeomItems[id] = undefined;
                this.initAction();
            }, this);
        }
        for(let id =0; id<this.__vrControllers.length; id++) {
            bindController(id);
        }
    }

    createGeomDataFbo(idCount = 2) {
        let gl = this.__vrStage.getRenderer().gl;
        this.__geomDataBuffer = new GLTexture2D(gl, {
            format: 'FLOAT',
            channels: 'RGBA',
            width: idCount,
            height: 1,
        });
        this.__geomDataBufferFbo = new GLFbo(gl, this.__geomDataBuffer, true);
        this.__geomDataBufferFbo.setClearColor([0, 0, 0, 0]);
    }

    getGeomItemAtController(vrController) {
        let xfo = vrController.getTipXfo();

        this.__geomDataBufferFbo.bindAndClear();
        gl.viewport(id, 0, 1, 1);

        let renderstate = {
            viewMatrix: xfo.inverse().toMat4(),
            projectionMatrix: __projMatrix,
            isOrthographic: true,
            materialCount: 0,
            drawCalls: 0,
            drawCount: 0
        };

        let gl = this.__renderer.gl;
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.depthMask(true);

        renderer.getGeomDataPass().draw(renderstate);

        gl.finish();
        gl.readPixels(id, 0, 1, 1, gl.RGBA, gl.FLOAT, pixels);
        let geomItemId = Math.round(pixels[0]);
        return renderer.getDrawItem(geomItemId);
    }

    initAction() {
        
        if(this.__pressedButtonCount == 2 && this.__heldGeomItems[0] == this.__heldGeomItems[1]){
            let xfo0 = this.__vrControllers[0].getTipXfo();
            let xfo1 = this.__vrControllers[1].getTipXfo();
            let grabXfo = new Xfo();
            grabXfo.tr = xfo0.tr.lerp(xfo1.tr, 0.5);
            grabXfo.ori = xfo0.ori.lerp(xfo1.ori, 0.5);

            let heldGeom = this.__heldGeomItems[0];
            this.__heldGeomItemOffsets[0] = grabXfo.inverse().multiply(heldGeom.offsetXfo);

            //heldGeom.
            this.__2handedGrab = true;
        }
        else{
            for (let i=0;i < this.__heldGeomItems.length; i++){
                let grabXfo = this.__vrControllers[i].getTipXfo();
                let heldGeom = this.__heldGeomItems[0];
                this.__heldGeomItemOffsets[i] = grabXfo.inverse().multiply(heldGeom.globalXfo);
            }
            this.__2handedGrab = false;
        }
    }

    evalTool() {
        
        if(this.__2handedGrab) {
            let xfo0 = this.__vrControllers[0].getTipXfo();
            let xfo1 = this.__vrControllers[1].getTipXfo();
            let grabXfo = new Xfo();
            grabXfo.tr = xfo0.tr.lerp(xfo1.tr, 0.5);
            grabXfo.ori = xfo0.ori.lerp(xfo1.ori, 0.5);
            grabbedItem.geomItem.globalXfo = grabXfo.multiply(this.__heldGeomItemOffsets[0]);
        }
        else {
            for (let i=0; i<this.__heldGeomItems.length; i++){
                this.__heldGeomItems[i].globalXfo.globalXfo = this.__vrControllers[i].getTipXfo().multiply(this.__heldGeomItemOffsets[i]);
            }
        }
    }


};

export {
    VRToolHoldObjects
};