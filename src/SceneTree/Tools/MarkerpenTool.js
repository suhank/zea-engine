import {
    Lines,
    TreeItem,
    GeomItem,
    Material
} from '../../SceneTree';

class MarkerpenTool {
    constructor(name) {
        this.__name = name;
        this.__treeItem = new TreeItem(name + 'MarkerpenTool');
        this.__strokeCount = 0;

        this.__strokes = {};

        // Stroke Signals
        // this.strokeStarted = new Signal();
        // this.strokeEnded = new Signal();
        // this.strokeSegmentAdded = new Signal();
    }

    getTreeItem() {
        return this.__treeItem;
    }

    startStroke(xfo, color, thickness, id) {
        this.__strokeCount++;
        let replayMode = true;
        if (!id) {
            id = 'Stroke' + this.__strokeCount;
            replayMode = false;
        }

        let lineGeom = new Lines();

        let used = 0;
        let vertexCount = 100;
        lineGeom.setNumVertices(vertexCount);
        lineGeom.setNumSegments(vertexCount - 1);
        lineGeom.vertices.setValue(used, xfo.tr);

        lineGeom.lineThickness = thickness;
        let material = new Material('stroke', 'FatLinesShader');
        material.addParameter('color', color);


        let geomItem = new GeomItem(id, lineGeom, material);
        this.__treeItem.addChild(geomItem);


        this.__strokes[id] = {
            geomItem,
            used,
            vertexCount,
            replayMode,
        };

        // if(!replayMode){
        //     this.strokeStarted.emit({
        //         type: 'strokeStarted',
        //         data: {
        //             id: id,
        //             xfo: xfo.toJSON(),
        //             color: color.toJSON(),
        //             thickness: thickness
        //         }
        //     });
        // }
        return id;
    }

    endStroke(id = undefined) {
        let replayMode = true;
        if (!id) {
            id = 'Stroke' + this.__strokeCount;
            replayMode = false;
        }

        return id;
    }

    addSegmentToStroke(xfo, id = undefined) {
        let replayMode = true;
        if (!id) {
            id = 'Stroke' + this.__strokeCount;
            replayMode = false;
        }
        let stroke = this.__strokes[id];
        let lineGeom = stroke.geomItem.getGeom();
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
        lineGeom.__strokeCount = stroke.used;


        // if(!stroke.replayMode){
        //     this.strokeSegmentAdded.emit({
        //         type: 'strokeSegmentAdded',
        //         data: {
        //           id: id,
        //           xfo: xfo.toJSON()
        //         }
        //     });
        // }
        return id;
    }

    // removeStroke(id) {
    //     let geomItem = this.__treeItem.getChildByName(id);
    //     this.__treeItem.removeChildByHandle(geomItem);
    // }

    // removeSegmentFromStroke(id) {
    //     let stroke = this.__strokes[id];
    //     let lineGeom = stroke.geomItem.getGeom();
    //     stroke.used--;
    //     lineGeom.setSegment(stroke.used-1, 0, 0);
    //     lineGeom.geomDataChanged.emit({'indicesChanged':true});
    // }

    clear() {
        this.__strokeCount = 0;
        this.__strokes = {};
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