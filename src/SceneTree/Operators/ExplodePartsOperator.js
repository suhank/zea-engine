import {
    Vec2,
    Vec3
} from '../../Math';
import {
    Operator,
    XfoOperatorOutput
} from './Operator.js';
import {
    ValueSetMode,
    Parameter,
    BooleanParameter,
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

        this.__axisParam = this._addMember(new Vec3Parameter('Axis', new Vec3(1,0,0)));
        this.__movementParam = this._addMember(new Vec2Parameter('MovementTiming', new Vec2(0, 1), [new Vec2(-1, 0), new Vec2(1, 1)]));
        this.__multiplierParam =  this._addMember(new NumberParameter('Multiplier', 1.0));
        // this.__multiplierParam =  this._addMember(new NumberParameter('Offset', 0.0));
        // this.__itemsParam = this._addMember(new KinematicGroupParameter('Items'));
        // this.__initialXfos = [];
        // this.__itemsParam.elementAdded.connect((elem, index)=>{
        //     this.__initialXfos[index] = elem.getGlobalXfo();
        // });
        this.__output = new XfoOperatorOutput();

        // this.__parentItemParam = this._addMember(new TreeItemParameter('RelativeTo'));
        // this.__parentItemParam.valueChanged.connect(()=>{
        //     // compute the local xfos
        //     const parentItem = this.__parentItemParam.getValue();
        //     if(parentItem)
        //         this.__invParentSpace = parentItem.getGlobalXfo().inverse();
        //     else
        //         this.__invParentSpace = undefined;
        //     this.valueChanged.emit();
        // })
        // this.__parentItemParam.treeItemGlobalXfoChanged.connect(this.valueChanged.emit);
    }

    getOutput(){
        return this.__output;
    }

    // setDirty(cleanerFn) {
    //     // this.__itemsParam.setDirty(cleanerFn);
    //     this.__output.setDirty(cleanerFn);
    // }
    // removeCleanerFn(cleanerFn) {
    //     // return this.__itemsParam.removeCleanerFn(cleanerFn);
    //     return this.__output.removeCleanerFn(cleanerFn);
    // }


    evaluate(explode, explodeDist, t, parentXfo, parentDelta){

        // if(this.__itemsParam.getCount() == 0)
        //     return;

        // const parentItem = this.__parentItemParam.getValue();
        // let parentXfo;
        // if(parentItem) {
        //     parentXfo = this.__invParentSpace.multiply(parentItem.getGlobalXfo());
        // }

        // const explodeDir = this.getAxis();
        let explodeDir = this.__axisParam.getValue();
        const movement = this.__movementParam.getValue();
        const multiplier = this.__multiplierParam.getValue();
        let xfo;// = this.__itemsParam.getInitialXfo().clone();
        if(parentXfo){
            xfo = parentDelta.multiply(this.__itemsParam.getInitialXfo());
            explodeDir = parentXfo.ori.rotateVec3(explodeDir);
        }
        else
            xfo = this.__output.getInitialValue().clone();
            // xfo = this.__itemsParam.getInitialXfo().clone();

        const dist = explodeDist * Math.smoothStep(movement.x, movement.y, explode) * t;

        const tr = xfo.tr;
        tr.addInPlace(explodeDir.scale(/*this.offset + */(dist * multiplier)));

        // this.__output.setXfo(xfo, ValueSetMode.OPERATOR_SETVALUE);
        this.__output.setValue(xfo);
    }


    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        const j = super.toJSON();
        if(j){
            j.output = this.__output.toJSON(context);
        }
        return j;
    }

    fromJSON(j, context) {
        super.fromJSON(j, context);
        if(j.output){
            this.__output.fromJSON(j.output, context);
        }
    }

}


class ExplodePartsOperator extends Operator {
    constructor(name) {
        super(name);

        this._explodeParam = this.addParameter(new NumberParameter('Explode', 0.0, [0,1]));
        this._distParam = this.addParameter(new NumberParameter('Dist', 1.0));
        this._centeredParam = this.addParameter(new BooleanParameter('Centered', false));
        // this.__axisParam = this.addParameter(new Vec3Parameter('Axis', new Vec3(1,0,0)));
        this.__parentItemParam = this.addParameter(new TreeItemParameter('RelativeTo'));
        this.__parentItemParam.valueChanged.connect(()=>{
            // compute the local xfos
            const parentItem = this.__parentItemParam.getValue();
            if(parentItem)
                this.__invParentSpace = parentItem.getGlobalXfo().inverse();
            else
                this.__invParentSpace = undefined;
        })
        this.__parentItemParam.treeItemGlobalXfoChanged.connect(this.__opInputChanged);


        this.__itemsParam = this.addParameter(new ListParameter('Parts', ExplodePartParameter));
        this.__itemsParam.elementAdded.connect((value, index) => {
            // this.__outputs[index] = value;
            this.addOutput(value.getOutput());
        })
        this.__itemsParam.elementRemoved.connect((value, index) => {
            this.__outputs.splice(index, 1);
        })

        this.__localXfos = [];
        this.__parts = [];
        this.__stages = 2;
    }

    evaluate(){

        const explode = this._explodeParam.getValue();
        // const explodeDir = this.getParameter('Axis').getValue();
        const explodeDist = this._distParam.getValue();
        const centered = this._centeredParam.getValue();
        const parentItem = this.__parentItemParam.getValue();
        let parentXfo;
        let parentDelta;
        if(parentItem) {
            parentXfo = parentItem.getGlobalXfo();
            parentDelta = this.__invParentSpace.multiply(parentXfo);
        }

        const items = this.__itemsParam.getValue();
        for(let i=0; i<items.length; i++) {
            const part = items[i];
            let t = 1.0 - (i / (items.length+1));
            if(centered)
                t -= 0.5;
            part.evaluate(explode, explodeDist, t, parentXfo, parentDelta);
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