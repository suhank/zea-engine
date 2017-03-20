import {
    Vec3,
    Color,
    Xfo
} from '../../Math';
import {
    TreeItem,
    Lines,
    GeomItem,
    FatLinesMaterial
} from '../../SceneTree';

class MarkerpenTool {
    constructor() {
        this.__treeItem = new TreeItem('MarkerpenTool');
        this.__strokeCount = 0;
    }

    getTreeItem(){
        return this.__treeItem;
    }

    startStroke(xfo, color, lineThickness) {
        this.__lineGeom = new Lines('MarkerpenTool_Stroke'+this.__strokeCount);
        this.__lineGeom.lineThickness = lineThickness;

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