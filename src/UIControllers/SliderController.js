import {
    Vec2,
    Vec3,
} from '../Math';

import {
    UIWidgetController
} from './UIWidgetController.js';

class SliderController extends UIWidgetController {
    constructor(floatParameter) {
        super(floatParameter);

        // size (%), min (px), max (px)
        this.__length = new Vec3();
        this.__axis = 'x';
        this.__step = 0.01;
    }

    getWidth() {
        return this.__width;
    }

    setWidth(width) {
        this.__width = width;
    }

    getRange() {
        return this.__parameter.getRange();
    }

    setRange(range) {
        this.__parameter.setRange(range);
    }

    getStep() {
        return this.__step;
    }

    setStep(step) {
        this.__step = step;
    }
};

export {
    SliderController
};