import { Signal } from '../Math';

class SelectionManager {
    constructor(scene) {
        this.__selection = new Set();
        this.selectionChanged = new Signal();
    }

    get selection(){
        return this.__selection;
    }

    selectGeom(geomItem, replaceSelection = true) {
        if (replaceSelection)
            this.clearSelection(false);
        else if (geomItem.getSelected())
            return;
        geomItem.setSelected(true);
        this.__selection.add(geomItem);
        this.selectionChanged.emit(this.__selection);
    }

    deselectGeom(geomItem) {
        if (geomItem.getSelected()) {
            geomItem.setSelected(false);
            this.__selection.delete(geomItem);
            this.selectionChanged.emit(this.__selection);
        }
    }

    selectGeoms(selectionSet, replaceSelection = true) {
        if (!(selectionSet instanceof Set)) {
            throw ("Invalid selection type");
        }
        let changed = false;
        if (replaceSelection)
            changed = this.clearSelection(false);
        for (let geomItem of selectionSet) {
            if (!geomItem.getSelected()) {
                geomItem.setSelected(true);
                this.__selection.add(geomItem);
                changed = true;
            }
        }
        if (changed)
            this.selectionChanged.emit(this.__selection);
    }

    deselectGeoms(selectionSet) {
        let changed = false;
        for (let geomItem of selectionSet) {
            if (geomItem.getSelected()) {
                geomItem.setSelected(false);
                this.__selection.delete(geomItem);
                changed = true;
            }
        }
        if (changed)
            this.selectionChanged.emit(this.__selection);
    }

    clearSelection(emitSignal = true) {
        if(this.__selection.size == 0)
            return false;
        for (let geomItem of this.__selection)
            geomItem.setSelected(false);
        this.__selection.clear();
        if (emitSignal)
            this.selectionChanged.emit(this.__selection);
        return true;
    }
};
export {
    SelectionManager
};
// SelectionManager;

