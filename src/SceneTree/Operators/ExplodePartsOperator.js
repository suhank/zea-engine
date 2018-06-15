import {
    Vec3
} from '../../Math';
import {
    Operator
} from './Operator.js';
import {
    Parameter,
    NumberParameter,
    ListParameter,
    KinematicGroupParameter
} from '../Parameters';

class ExplodePartsOperator extends Operator {
    constructor(name) {
        super(name);

        this.addParameter(new NumberParameter('Explode', 0.0, [0,1]));
        this.addParameter(new NumberParameter('Dist', 1.0));
        this.addParameter(new Parameter('Cascading', false, 'Boolean'));
        this.addParameter(new Parameter('BiDirectional', false, 'Boolean'));
        this.addParameter(new Parameter('LocalSpace', false, 'Boolean'));
        this.addParameter(new Parameter('Dir', new Vec3(1, 0, 0), 'Vec3'));

        this.__partsParam = this.addParameter(new ListParameter('Parts', KinematicGroupParameter));

        this.__parts = [];
        this.__stages = 2;
    }


    connectParts(partGroups) {
        // e.g. [['.a/b/c'], [./foo]]
        this.__partGroups = partGroups;
        this.__stages = partGroups.length;
        this.__parts = [];
        let localSpace = this.getParameter('LocalSpace').getValue();
        let opExplodeDir = this.getParameter('Dir').getValue();
        for(let i=0; i<partGroups.length; i++) {
            let partGroup = partGroups[i];
            if(!partGroup){
                continue;
            }

            let explodeDir = opExplodeDir.clone();
            let paths = partGroup;
            let movement = [0.0, 1.0];
            let mult = 1.0;
            if(!Array.isArray(partGroup)){
                if(partGroup.path)
                    paths = partGroup.path;
                else
                    paths = partGroup.paths;
                if(partGroup.dir){
                    explodeDir = partGroup.dir;
                }
                if(partGroup.mult){
                    mult = partGroup.mult;
                }
                if(partGroup.movement){
                    movement = partGroup.movement;
                }

                let len = explodeDir.length();
                if(len > 1.00001 || len < 0.99999){
                    mult *= len;
                    explodeDir.scaleInPlace(1.0/len);
                }
            }

            if(typeof paths[0] == 'string') {
                paths = [paths];
            }

            for(let path of paths) {
                let treeItem = this.__ownerItem.resolvePath(path);
                if(treeItem) {
                    let param;
                    if(localSpace) {
                        param = treeItem.getParameter('LocalXfo');
                    } else {
                        param = treeItem.getParameter('GlobalXfo');
                    }
                    let initialXfo = param.getValue().clone();
                    let offset = initialXfo.tr.dot(explodeDir);
                    this.__parts.push({
                        stage: i,
                        initialXfo,
                        explodeDir,
                        offset,
                        movement,
                        mult
                    });
                    this.__outputs.push(param);
                }
            }
        }
    }
    evaluate(){

        let explode = this.getParameter('Explode').getValue();
        let cascading = this.getParameter('Cascading').getValue();
        let biDirectional = this.getParameter('BiDirectional').getValue();
        let explodeDist = this.getParameter('Dist').getValue();

        for(let i=0; i<this.__parts.length; i++) {
            let part = this.__parts[i];
            let dist;
            if(cascading) {
                let edge0 = part.stage / (this.__stages+1);
                let edge1 = (part.stage + 2) / (this.__stages+1);
                dist = explodeDist * Math.smoothStep(edge0, edge1, explode);
            }
            else {
                let t = 1.0 - (part.stage / (this.__stages+1));
                if(biDirectional){
                    t -= 0.5;
                }
                dist = explodeDist * Math.smoothStep(part.movement[0], part.movement[1], explode) * t;
            }
   
            let xfo = this.__outputs[i].getValue(1);
            let tr = xfo.tr;
            tr.subtractInPlace(part.explodeDir.scale(part.explodeDir.dot(tr)));
            tr.addInPlace(part.explodeDir.scale(part.offset + (dist * part.mult)));

            this.__outputs[i].setValue(xfo, 1);
        }
    }
};

export {
    ExplodePartsOperator
};
//export default AssetItem;