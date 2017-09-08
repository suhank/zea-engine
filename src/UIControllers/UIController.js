import {
    Vec2,
    Signal
} from '../Math';

class UIController {
    constructor() {

        this.__widgetPanels = [];

        // User purely to force React to rebuild the UI (e.g. after loading a JSON definition async.)
        this.__version = 0;
    }

    addWidgetPanel(widgetPanel) {
        this.__widgetPanels.push(widgetPanel);
    }

    getWidgetPanels() {
    	return this.__widgetPanels;
    }


    toJSON() {
        return {
            "ff": 3
        }
    }


    fromJSON(j) {
    }
};

export {
    UIController
};