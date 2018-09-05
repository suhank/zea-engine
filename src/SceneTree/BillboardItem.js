import {
    Color,
    Vec3
} from '../Math';
import {
    ValueSetMode,
    Parameter,
    BooleanParameter,
    NumberParameter,
    ColorParameter,
    Vec3Parameter,
    ImageParameter
} from './Parameters';
import {
    TreeItem
} from './TreeItem.js';
import {
    GeomItem
} from './GeomItem.js';
import {
    Material
} from './Material.js';
import {
    Lines
} from './Geometry/Lines.js';

class BillboardItem extends TreeItem {
    constructor(name, image) {
        super(name);
        const imageParam = this.addParameter(new ImageParameter('image'));
        if(image)
            imageParam.setValue(image)// Note: this dirties the param and will ensure it is saved to JSON
        this.addParameter(new NumberParameter('scale', 0.01));
        this.addParameter(new NumberParameter('alpha', 1.0));
        this.addParameter(new ColorParameter('color', new Color(1.0, 1.0, 1.0)));
        this.addParameter(new BooleanParameter('alignedToCamera', false));
        const lineParam = this.addParameter(new BooleanParameter('line', false));
        let line;
        lineParam.valueChanged.connect(()=>{

            if(lineParam.getValue()){
                const linesMaterial = new Material('LabelLinesMaterial', 'LinesShader');
                linesMaterial.getParameter('Color').setValue(new Color(0.0, 0.0, 0.0), ValueSetMode.OPERATOR_SETVALUE);
                linesMaterial.getParameter('Opacity').setValue(1.0, ValueSetMode.OPERATOR_SETVALUE);

                const lineGeom = new Visualive.Lines();
                lineGeom.setNumVertices(2);
                lineGeom.setNumSegments(1);
                lineGeom.setSegment(0, 0, 1);

                line = new GeomItem('line')
                line.setGeometry(lineGeom, ValueSetMode.OPERATOR_SETVALUE)
                line.setMaterial(linesMaterial, ValueSetMode.OPERATOR_SETVALUE);
                updateLinePoints();
                this.addChild(line, false)
            }
            else {
                if(line) {
                    this.removeChildByHandle(line);
                    line = null;
                }
            }
        })

        const startParam = this.addParameter(new Vec3Parameter('lineStartOffset'));
        const endParam = this.addParameter(new Vec3Parameter('lineEnd', new Vec3(0, 0, -1)));
        const updateLinePoints = ()=>{
            if(line) {
                const invGlobalXfo = this.__globalXfoParam.getValue().inverse();
                const start = startParam.getValue();
                const end = endParam.getValue();
                const lineGeom = line.getGeometry();
                lineGeom.setVertex(0, start);
                lineGeom.setVertex(1, invGlobalXfo.transformVec3(end));
            }
        }

        startParam.valueChanged.connect(updateLinePoints);
        endParam.valueChanged.connect(updateLinePoints);
        this.__globalXfoParam.valueChanged.connect(updateLinePoints);
    }


    //////////////////////////////////////////
    // Persistence

    toJSON(context) {
        return super.toJSON(context);
    }

    fromJSON(j, context) {
        return super.fromJSON(j, context);
    }

};

import {
    sgFactory
} from './SGFactory.js';
sgFactory.registerClass('BillboardItem', BillboardItem);

export {
    BillboardItem,
    BillboardLine
};