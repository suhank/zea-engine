import {
    Vec3,
    Color,
    Xfo
} from '../../Math';
import {
    Lines,
    GeomItem,
    FatLinesMaterial
} from '../../SceneTree';

class MarkerpenTool {
    constructor(ownerTreeItem) {
        this.__ownerTreeItem = ownerTreeItem;
    }

    startStroke(xfo, color, lineThickness) {
        this.__lineGeom = new Lines('MarkerpenTool_Stroke');
        this.__lineGeom.lineThickness = lineThickness;

        this.__used = 0;
        this.__vertexCount = 100;
        this.__lineGeom.setNumVertices(this.__vertexCount);
        this.__lineGeom.setNumSegments(this.__vertexCount-1);
        this.__lineGeom.vertices.setValue(this.__used, xfo.tr);

        let material = new FatLinesMaterial('stroke');
        material.color = color;

        let geomItem = new GeomItem('MarkerpenTool_Stroke'+this.__strokeCount, this.__lineGeom, this.__material);
        this.__ownerTreeItem.addChild(geomItem);

        this.__strokeCount++;
    }

    endStroke(xfo) {

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