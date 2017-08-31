
import {
    Operator
} from './Operator.js';

class ExplodePartsOperator extends Operator {
    constructor(assetItem) {
        super(assetItem);

        this.__explodeValue = 0.0;
        this.__parts = [];
        this.__resolvedParts = [];
        this.__dist = 1.0;
        this.__stages = 2;
    }

    setExplodeDist(dist) {
        this.__dist = dist;
    }

    connectParts(partGroups) {
        // e.g. [['.a/b/c'], [./foo]]
        this.__stages = partGroups.length;
        let offset = 0;
        for(let i=0; i<partGroups.length; i++) {
            let partGroup = partGroups[i];
            if(typeof partGroup == 'string') {
                partGroup = [partGroup];
            }
            for(let path of partGroup) {
                let treeItem = this.__assetItem.resolvePath(path);
                if(treeItem) {
                    this.__resolvedParts[offset] = treeItem
                    this.__parts[offset] = {
                        stage: i,
                        initialXfo: treeItem.getGlobalXfo().clone(),
                        dir: new Visualive.Vec3(0, 0, 1)
                    };
                    offset++;
                }
            }
        }
    }

    setExplodeValue(explodeValue) {
        this.__explodeValue = explodeValue;
        this.evaluate();
    }

    evaluate(){

        let smoothStep = ( edge0, edge1, x)=>{
            let t = Math.clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
            return t * t * (3.0 - 2.0 * t);
        }

        for(let i=0; i<this.__parts.length; i++) {
            let resolvedPart = this.__resolvedParts[i];
            if(!resolvedPart){
                continue;
            }
            let part = this.__parts[i];
            let edge0 = part.stage / (this.__stages+1);
            let edge1 = (part.stage + 2) / (this.__stages+1);
            let dist = this.__dist * smoothStep(edge0, edge1, this.__explodeValue);

            let globalXfo = part.initialXfo.clone();
            globalXfo.tr.addInPlace(part.dir.scale(dist));

            resolvedPart.setGlobalXfo(globalXfo);
        }
    }
};

export {
    ExplodePartsOperator
};
//export default AssetItem;