import {
    Vec2,
    Signal
} from '../Math';

class UIWidgetController {
    constructor(parameter) {
        this.__parameter = parameter;
        this.valueChanged = new Signal();
        this.__parameter.valueChanged.connect(()=>{
            this.valueChanged.emit(this.__parameter.getValue());
        });

        this.__label = this.__parameter.getName();
        this.__pos = new Vec2();
        this.__enabled = true;
    }

    getLabel() {
        return this.__label;
    }

    setLabel(label) {
        this.__label = label;
    }

    getPos() {
        return this.__pos;
    }

    setPos(pos) {
        this.__pos = pos;
    }

    getEnabled() {
        return this.__enabled;
    }

    setEnabled(enabled) {
        this.__enabled = enabled;
    }

    getValue(){
        return this.__parameter.getValue();
    }

    setValue(value, mode = 0) {
        switch (mode) {
            case 0:
                // Add change. Maybe merge with previous change.
                this.__parameter.setValue(value);
                break;
            case 1:
                // Start action. Create Undo object...
            case 2:
                // End action. Close Undo object...
        }
    }

};

export {
    UIWidgetController
};