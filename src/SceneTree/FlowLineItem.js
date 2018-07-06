import {
    Vec2,
    Color
} from '../Math';
import {
    Signal
} from '../Utilities';
import {
    Parameter,
    ValueSetMode,
    FilePathParameter,
    NumberParameter
} from './Parameters';
import {
    TreeItem
} from './TreeItem.js';
import {
    NURBSCurve
} from './Geometry/NURBSCurve.js';

class FlowLineItem extends TreeItem {
    constructor(name, audioElement) {
        super(name, audioElement);

        this.__nurbsCurve = new NURBSCurve();
        this.__nurbsCurve.addVertexAttribute('colors', Color, 1.0);

        this.addParameter(new NumberParameter('curveFractionalLength', 0.2));
        this.addParameter(new NumberParameter('curveParam', 0.0));
        this.addParameter(new ProfileParameter('profile'));
    }
};

export {
    FlowLineItem
};

