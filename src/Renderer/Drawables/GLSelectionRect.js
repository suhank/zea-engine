
import {
    Rect,
    GeomItem
} from '../../SceneTree/SceneTree.js';

import {
    GLLines
} from '../GLLines.js';

import {
    GLDrawItem
} from '../GLDrawItem.js';

class GLSelectionRect extends GLDrawItem {
    constructor(gl) {

        let selectionRect = new Rect('selectionRect', 0.5, 0.5);
        let selectionRectGeomItem = new GeomItem('selectionRect', selectionRect);
        selectionRectGeomItem.setVisible(false);

        let glGeom = new GLLines(gl, selectionRect);
        super(gl, selectionRectGeomItem, glGeom);

        this.__selectionRectGeomItem = selectionRectGeomItem
    }   

    getVisible(){
        return this.__selectionRectGeomItem.getVisible();
    }

    setVisible(val){
        this.__selectionRectGeomItem.setVisible(val);
    }

    get globalXfo(){
        return this.__selectionRectGeomItem.globalXfo;
    }

    set globalXfo(val){
        this.__selectionRectGeomItem.globalXfo = val;
    }

    get globalXfoChanged(){
        return this.__selectionRectGeomItem.globalXfoChanged;
    }
};

export {
    GLSelectionRect
};