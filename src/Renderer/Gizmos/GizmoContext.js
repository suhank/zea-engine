import TreeItem from '../../SceneTree/TreeItem';
import LinearTranslationGizmo from './LinearTranslationGizmo.js';
import PlanarTranslationGizmo from './PlanarTranslationGizmo.js';
import AxialRotationGizmo from './AxialRotationGizmo.js';

class GizmoContext {
    constructor(renderer) {
        this.__renderer = renderer;
        this.__selectionManager = undefined;
        this.treeItem = new TreeItem('GizmoContext');

        {
            let x_gizmoXfo = new Xfo();
            x_gizmoXfo.ori.rotateZ(Math.PI * -0.5);
            let z_gizmoXfo = new Xfo();
            z_gizmoXfo.ori.rotateX(Math.PI * 0.5);

            this.__gizmos = [];
            this.__gizmos.push(new LinearTranslationGizmo(this.__renderer.gl, this, "X", new Color(1, 0, 0, 1), x_gizmoXfo));
            this.__gizmos.push(new LinearTranslationGizmo(this.__renderer.gl, this, "Y", new Color(0, 1, 0, 1), new Xfo()));
            this.__gizmos.push(new LinearTranslationGizmo(this.__renderer.gl, this, "Z", new Color(0, 0, 1, 1), z_gizmoXfo));
        }

        {
            let zy_gizmoXfo = new Xfo();
            zy_gizmoXfo.ori.rotateZ(Math.PI * 0.5);
            let yx_gizmoXfo = new Xfo();
            yx_gizmoXfo.ori.rotateX(Math.PI * -0.5);

            this.__gizmos.push(new PlanarTranslationGizmo(this.__renderer.gl, this, "XZ", new Color(0, 1, 0, 1), new Xfo()));
            this.__gizmos.push(new PlanarTranslationGizmo(this.__renderer.gl, this, "ZY", new Color(1, 0, 0, 1), zy_gizmoXfo));
            this.__gizmos.push(new PlanarTranslationGizmo(this.__renderer.gl, this, "YX", new Color(0, 0, 1, 1), yx_gizmoXfo));
        }

        {
            let x_gizmoXfo = new Xfo();
            x_gizmoXfo.ori.rotateZ(Math.PI * -0.5);
            let z_gizmoXfo = new Xfo();
            z_gizmoXfo.ori.rotateX(Math.PI * 0.5);

            this.__gizmos.push(new AxialRotationGizmo(this.__renderer.gl, this, "X", new Color(1, 0, 0, 1), x_gizmoXfo));
            this.__gizmos.push(new AxialRotationGizmo(this.__renderer.gl, this, "Y", new Color(0, 1, 0, 1), new Xfo()));
            this.__gizmos.push(new AxialRotationGizmo(this.__renderer.gl, this, "Z", new Color(0, 0, 1, 1), z_gizmoXfo));
        }

        let gizmoPass = this.__renderer.getGizmoPass();
        for (let gizmo of this.__gizmos)
            gizmoPass.addGizmo(gizmo);

        this.hideGizmos();
    }

    setSelectionManager(selectionManager) {
        this.__selectionManager = selectionManager;
        this.__selectionManager.selectionChanged.connect((selection) => {
            if (selection.size > 0){
                this.updateContextXfo();
                this.showGizmos();
            }
            else
                this.hideGizmos();
        }, this);
    }

    showGizmos() {
        for (let gizmo of this.__gizmos)
            gizmo.setVisible(true);
        this.__renderer.requestRedraw();
    }
    
    hideGizmos() {
        for (let gizmo of this.__gizmos)
            gizmo.setVisible(false);
        this.__renderer.requestRedraw();
    }

    updateContextXfo() {
        let selection = this.__selectionManager.selection;

        if (selection.size == 1){
            this.treeItem.globalXfo = selection.values().next().value.globalXfo;
        }
        else {
            let xAxis = new Vec3();
            let yAxis = new Vec3();
            let zAxis = new Vec3();
            let pos = new Vec3();
            let count = 0;
            for (let geomItem of selection) {
                let mat3 = geomItem.globalXfo.ori.toMat3();
                xAxis.addInPlace(mat3.xAxis);
                yAxis.addInPlace(mat3.yAxis);
                zAxis.addInPlace(mat3.zAxis);
                pos.addInPlace(geomItem.globalXfo.tr);
                count++;
            }
            let mat3 = new Mat3();
            mat3.xAxis.setFromOther(xAxis.normalize());
            mat3.yAxis.setFromOther(yAxis.normalize());
            mat3.zAxis.setFromOther(zAxis.normalize());
            let xfo = new Xfo();
            xfo.ori.setFromMat3(mat3);
            xfo.tr.setFromOther(pos.scale(1.0/count));
            this.treeItem.globalXfo = xfo;
        }

        this.__renderer.renderGeomDataFbos();
    }

    beginManipulation() {
        this.__initialXfos = [];
        for (let geomItem of this.__selectionManager.selection) {
            this.__initialXfos.push(geomItem.globalXfo.clone());
        }
        this.__initialContextXfo = this.treeItem.globalXfo.clone();
    }

    endManipulation() {}

    translate(delta) {
        let idx = 0;
        for (let geomItem of this.__selectionManager.selection) {
            let globalXfo = this.__initialXfos[idx].clone();
            globalXfo.tr.addInPlace(delta);
            geomItem.globalXfo = globalXfo;
            idx++;
        }
        // this.updateContextXfo();

        let gizmoXfo = this.__initialContextXfo.clone();
        gizmoXfo.tr.addInPlace(delta);
        this.treeItem.globalXfo = gizmoXfo;
    }

    rotate(axis, angle) {
        let idx = 0;
        let rot = new Xfo();
        rot.ori.setFromAxisAndAngle(axis, angle);
        for (let geomItem of this.__selectionManager.selection) {
            let xfo = this.__initialXfos[idx].clone();
            xfo.tr.subtractInPlace(this.__initialContextXfo.tr);
            xfo = rot.multiply(xfo);
            xfo.tr.addInPlace(this.__initialContextXfo.tr);

            geomItem.globalXfo = xfo;
            idx++;
        }
        // this.updateContextXfo();

        let gizmoXfo = this.__initialContextXfo.clone();
        gizmoXfo.ori = rot.ori.multiply(gizmoXfo.ori);
        this.treeItem.globalXfo = gizmoXfo;
    }

    scale(scl) {
        // let idx = 0;
        // for (let geomItem of this.__selectionManager.selection) {
        //     // Scaling can cause skewing when not applied in local space. 
        //     // Here we extract the orthogonal scale values to that then are used as the global matrix.
        //     let scaledMatrix = scl.multiply(this.__initialXfos[idx]);
        //     let orthogonalMatrix = this.__initialXfos[idx].clone();
        //     orthogonalMatrix.xAxis.scaleInPlace(scaledMatrix.xAxis.dot(this.__initialXfos[idx].xAxis));
        //     orthogonalMatrix.yAxis.scaleInPlace(scaledMatrix.yAxis.dot(this.__initialXfos[idx].yAxis));
        //     orthogonalMatrix.zAxis.scaleInPlace(scaledMatrix.zAxis.dot(this.__initialXfos[idx].zAxis));
        //     // Note: this will cause a new local matrix to be computed. 
        //     // Sapphire does not currently support manipulation of nodes in the hierarchy. (only leaf Geom nodes.)
        //     // This means we can garuantee that no non-orthognal scale is caused.
        //     geomItem.globalXfo = orthogonalMatrix;
        //     idx++;
        // }
        // this.updateContextXfo();
    }
};

export default GizmoContext;