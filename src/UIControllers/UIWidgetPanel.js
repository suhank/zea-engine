import {
    Vec2,
    Color,
    Signal
} from '../Math';

class UIWidgetPanel {
    constructor() {
        this.__label = '';
        this.__color = new Color(1, 1, 1, .2);
        this.__pos = new Vec2();
        this.__margins = [20,20,20,20];
        this.__alignment = 'vertical';
        this.__enabled = true;

        this.__widgetControllers = [];
    }

    getLabel() {
        return this.__label;
    }

    setLabel(label) {
        this.__label = label;
    }

    getColor() {
        return this.__color;
    }

    setColor(color) {
        this.__color = color;
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


    addWidgetController(widgetController) {
        this.__widgetControllers.push(widgetController);
    }

    getWidgetControllers(){
        return this.__widgetControllers;
    }
};

export {
    UIWidgetPanel
};