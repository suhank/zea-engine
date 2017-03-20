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
    FatLinesMaterial
} from '../../SceneTree';

class MarkerpenTool {
    constructor(name) {
        this.__name = name;
        this.__treeItem = new TreeItem(name+'MarkerpenTool');
        this.__strokeCount = 0;

        // Stroke Signals
        this.strokeStarted = new Signal();
        this.strokeEnded = new Signal();
        this.strokeSegmentAdded = new Signal();
    }

    getTreeItem(){
        return this.__treeItem;
    }

    startStroke(xfo, color, thickness) {
        this.__lineGeom = new Lines('MarkerpenTool_Stroke'+this.__strokeCount);
        this.__lineGeom.lineThickness = thickness;

        this.__used = 0;
        this.__vertexCount = 100;
        this.__lineGeom.setNumVertices(this.__vertexCount);
        this.__lineGeom.setNumSegments(this.__vertexCount-1);
        this.__lineGeom.vertices.setValue(this.__used, xfo.tr);

        let material = new FatLinesMaterial('stroke');
        material.color = color;

        let geomItem = new GeomItem('Stroke'+this.__strokeCount, this.__lineGeom, material);
        this.__treeItem.addChild(geomItem);

        this.__strokeCount++;

        this.strokeStarted.emit({
            xfo,
            color, 
            thickness
        });
    }

    endStroke() {

    }

    addSegmentToStroke(xfo) {
        this.__used++;

        let realloc = false;
        if(this.__used >= this.__lineGeom.getNumSegments()){
            this.__vertexCount = this.__vertexCount * 2;
            this.__lineGeom.setNumVertices(this.__vertexCount);
            this.__lineGeom.setNumSegments(this.__vertexCount-1);
            realloc = true;
        }

        this.__lineGeom.vertices.setValue(this.__used, xfo.tr);
        this.__lineGeom.setSegment(this.__used-1, this.__used-1, this.__used);

        if(realloc){
            this.__lineGeom.geomDataTopologyChanged.emit();
        }
        else{
            this.__lineGeom.geomDataChanged.emit({'indicesChanged':true});
        }
    }
};

export {
    MarkerpenTool
};