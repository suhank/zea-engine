import Signal from '../Math/Signal';

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
        else if (geomItem.selected)
            return;
        geomItem.selected = true;
        this.__selection.add(geomItem);
        this.selectionChanged.emit(this.__selection);
    }

    deselectGeom(geomItem) {
        if (geomItem.selected) {
            geomItem.selected = false;
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
            if (!geomItem.selected) {
                geomItem.selected = true;
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
            if (geomItem.selected) {
                geomItem.selected = false;
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
            geomItem.selected = false;
        this.__selection.clear();
        if (emitSignal)
            this.selectionChanged.emit(this.__selection);
        return true;
    }
};

export default SelectionManager;

