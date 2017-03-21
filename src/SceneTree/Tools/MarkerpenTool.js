import {
    Vec3,
    Color,
    Xfo,
    Signal
} from '../../Math';
import {
    TreeItem,
    Lines,
    GeomItem,
    LinesMaterial,
    FatLinesMaterial
} from '../../SceneTree';

class MarkerpenTool {
    constructor(name) {
        this.__name = name;
        this.__treeItem = new TreeItem(name+'MarkerpenTool');
        this.__strokeCount = 0;

        this.__strokes = {};

        // Stroke Signals
        this.strokeStarted = new Signal();
        this.strokeEnded = new Signal();
        this.strokeSegmentAdded = new Signal();
    }

    getTreeItem(){
        return this.__treeItem;
    }

    startStroke(xfo, color, thickness) {
        let lineGeom = new Lines('MarkerpenTool_Stroke'+this.__strokeCount);
        lineGeom.lineThickness = 0;//thickness;

        let used = 0;
        let vertexCount = 100;
        lineGeom.setNumVertices(vertexCount);
        lineGeom.setNumSegments(vertexCount-1);
        lineGeom.vertices.setValue(used, xfo.tr);

        // let material = new FatLinesMaterial('stroke');
        let material = new LinesMaterial('stroke');
        material.color = color;

        // TODO: Cristyan, add a guid here...
        let id = 'Stroke'+this.__strokeCount;

        let geomItem = new GeomItem(id, lineGeom, material);
        this.__treeItem.addChild(geomItem);

        this.__strokeCount++;

        this.__strokes[id] = {
            geomItem,
            used,
            vertexCount
        };

        this.strokeStarted.emit({
            id,
            xfo,
            color, 
            thickness
        });
        return id;
    }

    endStroke(id) {

    }

    addSegmentToStroke(id, xfo) {
        let stroke = this.__strokes[id];
        let lineGeom = stroke.geomItem.geom;
        stroke.used++;

        let realloc = false;
        if(stroke.used >= lineGeom.getNumSegments()){
            stroke.vertexCount = stroke.vertexCount + 100;
            lineGeom.setNumVertices(stroke.vertexCount);
            lineGeom.setNumSegments(stroke.vertexCount-1);
            realloc = true;
        }

        lineGeom.vertices.setValue(stroke.used, xfo.tr);
        lineGeom.setSegment(stroke.used-1, stroke.used-1, stroke.used);

        if(realloc){
            lineGeom.geomDataTopologyChanged.emit({'indicesChanged':true});
        }
        else{
            lineGeom.geomDataChanged.emit({'indicesChanged':true});
        }
        lineGeom.__strokeCount = stroke.used;
    }

    removeStroke(id) {
        let geomItem = this.__treeItem.getChildByName(id);
        this.__treeItem.removeChildByHandle(geomItem);
    }


    removeSegmentFromStroke(id) {
        let stroke = this.__strokes[id];
        let lineGeom = stroke.geomItem.geom;
        stroke.used--;
        lineGeom.setSegment(stroke.used-1, 0, 0);
        lineGeom.geomDataChanged.emit({'indicesChanged':true});
    }
};

export {
    MarkerpenTool
};