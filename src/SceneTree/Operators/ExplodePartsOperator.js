import {
    Vec2,
    Vec3
} from '../../Math';
import {
    Operator
} from './Operator.js';
import {
    Parameter,
    NumberParameter,
    Vec2Parameter,
    Vec3Parameter,
    ListParameter,
    StructParameter,
    TreeItemParameter,
    KinematicGroupParameter
} from '../Parameters';

import {
    sgFactory
} from '../SGFactory.js';

class ExplodePartParameter extends StructParameter {
    constructor(name) {
        super(name);

        this.__movementParam = this._addMember(new Vec2Parameter('MovementTiming', new Vec2(0, 1), [new Vec2(0, 0), new Vec2(1, 1)]));
        this.__multiplierParam =  this._addMember(new NumberParameter('Multiplier', 1.0));
        // this.__multiplierParam =  this._addMember(new NumberParameter('Offset', 0.0));
        this.__axisParam = this._addMember(new Vec3Parameter('Axis', new Vec3(1,0,0)));
        this.__itemsParam = this._addMember(new KinematicGroupParameter('Items'));
        this.__initialXfos = [];
        this.__itemsParam.elementAdded.connect((elem, index)=>{
            this.__initialXfos[index] = elem.getGlobalXfo();
        })
    }

    getMovementTiming() {
        return this.__movementParam.getValue();
    }
    getMultiplier() {
        return this.__multiplierParam.getValue();
    }
    getAxis() {
        return this.__axisParam.getValue();
    }
    getCount() {
        return this.__itemsParam.getCount();
    }
    getInitialXfo() {
        return this.__itemsParam.getInitialXfo();
    }
    getXfo() {
        return this.__itemsParam.getXfo();
    }
    setXfo(xfo) {
        this.__itemsParam.setXfo(xfo);
    }

    setDirty(cleanerFn) {
        return this.__itemsParam.setDirty(cleanerFn);
    }
    removeCleanerFn(cleanerFn) {
        return this.__itemsParam.removeCleanerFn(cleanerFn);
    }
}


class ExplodePartsOperator extends Operator {
    constructor(name) {
        super(name);

        this.addParameter(new NumberParameter('Explode', 0.0, [0,1]));
        this.addParameter(new NumberParameter('Dist', 1.0));
        this.__parentItemParam = this.addParameter(new TreeItemParameter('RelativeTo'));
        this.__parentItemParam.valueChanged.connect(()=>{
            // compute the local xfos
        })

        this.__itemsParam = this.addParameter(new ListParameter('Parts', ExplodePartParameter));
        this.__itemsParam.elementAdded.connect((value, index) => {
            this.__outputs[index] = value;
            const parentItem = this.__parentItemParam.getValue();
            if(parentItem)
                this.__localXfos[index] = parentItem.getGlobalXfo().inverse().multiply(value.getXfo());
        })
        this.__itemsParam.elementRemoved.connect((value, index) => {
            this.__outputs.splice(index, 1);
            const parentItem = this.__parentItemParam.getValue();
            if(parentItem)
                this.__localXfos.splice(index, 1);
        })

        this.__localXfos = [];
        this.__parts = [];
        this.__stages = 2;
    }

    evaluate(){

        const explode = this.getParameter('Explode').getValue();
        const explodeDist = this.getParameter('Dist').getValue();
        const parentItem = this.__parentItemParam.getValue();
        let parentXfo;
        if(parentItem)
            parentXfo = parentItem.getGlobalXfo();

        for(let i=0; i<this.__outputs.length; i++) {
            const part = this.__outputs[i];
            if(part.getCount() == 0)
                continue;

            const explodeDir = part.getAxis();
            const movement = part.getMovementTiming();
            let xfo;
            if(parentItem)
                xfo = this.__localXfos[i].clone();
            else
                xfo = part.getInitialXfo().clone();

            let t = 1.0 - (i / (this.__outputs.length+1));
            const dist = explodeDist * Math.smoothStep(movement.x, movement.y, explode) * t;
   
            const tr = xfo.tr;
            tr.addInPlace(explodeDir.scale(/*part.offset + */(dist * part.getMultiplier())));

            if(parentItem)
                part.setXfo(parentXfo.multiply(xfo), 1);
            else
                part.setXfo(xfo, 1);
        }
    }

    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        return super.toJSON(context);
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);
    }

    destroy(){
        clearTimeout(this.__timeoutId);
        super.destroy();
    };

};

sgFactory.registerClass('ExplodePartsOperator', ExplodePartsOperator);

export {
    ExplodePartsOperator
};
//export default AssetItem;