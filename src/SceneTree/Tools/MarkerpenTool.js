
import {
    Color
} from '../Math';
import {
    Lines,
    TreeItem,
    GeomItem,
    Material
} from '../../SceneTree';

class MarkerpenTool {
    constructor(name) {
        this.__treeItem = new TreeItem(name);
        this.__strokes = [];

        this.__color = new Color(1,0,0);
        this.__thickness = 0.1;
    }

    getTreeItem() {
        return this.__treeItem;
    }

    startStroke(xfo) {

        const id = this.__strokes.length;
        const used = 0;
        const vertexCount = 100;

        const lineGeom = new Lines();
        lineGeom.setNumVertices(vertexCount);
        lineGeom.setNumSegments(vertexCount - 1);
        lineGeom.vertices.setValue(used, xfo.tr);

        lineGeom.lineThickness = this.__thickness;
        const material = new Material('stroke', 'FatLinesShader');
        material.addParameter('color', this.__color);

        const geomItem = new GeomItem(id, lineGeom, material);
        this.__treeItem.addChild(geomItem);

        this.__currStroke = {
            lineGeom,
            used,
            vertexCount
        }
        return id;
    }

    endStroke() {
        this.__strokes.push(this.__currStroke);
        this.__currStroke = undefined;
    }

    addSegmentToStroke(xfo) {
        const stroke = this.__currStroke;
        const lineGeom = stroke.lineGeom;
        stroke.used++;

        let realloc = false;
        if (stroke.used >= lineGeom.getNumSegments()) {
            stroke.vertexCount = stroke.vertexCount + 100;
            lineGeom.setNumVertices(stroke.vertexCount);
            lineGeom.setNumSegments(stroke.vertexCount - 1);
            realloc = true;
        }

        lineGeom.vertices.setValue(stroke.used, xfo.tr);
        lineGeom.setSegment(stroke.used - 1, stroke.used - 1, stroke.used);

        if (realloc) {
            lineGeom.geomDataTopologyChanged.emit({
                'indicesChanged': true
            });
        } else {
            lineGeom.geomDataChanged.emit({
                'indicesChanged': true
            });
        }

        return id;
    }

    clear() {
        this.__strokes = [];
        this.__treeItem.removeAllChildren();
    };

    destroy() {
        this.__treeItem.getParentItem().removeChildByHandle(this.__treeItem);
        this.__treeItem = null;
    };
};
export {
    MarkerpenTool
};
// MarkerpenTool