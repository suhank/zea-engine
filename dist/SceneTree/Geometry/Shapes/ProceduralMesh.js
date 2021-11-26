import { Mesh } from '../Mesh';
/**
 * Base Class for procedural meshes generated by mathematical functions.
 *
 * @extends {Mesh}
 */
class ProceduralMesh extends Mesh {
    /**
     * Creates an instance of ProceduralMesh.
     */
    constructor() {
        super();
        this.dirtyTopology = true;
        this.dirtyVertices = true;
        // Parameters that specify topology settings.
        // Add parameters to this list to ensure the topology is recomputed.
        // All other param changes will only trigger a resize
        this.topologyParams = [];
    }
    /**
     * This method can be overridden in derived classes
     * to perform general updates (see GLPass or BaseItem).
     * @param event - The event object emitted by the parameter.
     * @private
     */
    parameterValueChanged(event) {
        this.setBoundingBoxDirty();
        if (this.topologyParams.includes(event.param.getName())) {
            this.dirtyTopology = true;
            this.emit('geomDataTopologyChanged');
        }
        else {
            this.dirtyVertices = true;
            this.setBoundingBoxDirty();
            // Let the renderer know that the geometry has changed and must be re-uploaded to the GPU.
            this.emit('geomDataChanged');
        }
        super.parameterValueChanged(event);
    }
    /**
     * If the Procedural geometry is out of date, for example if a parameter has been changed,
     * this method explicitly forces the geometry to be recomputed.
     */
    update() {
        if (this.dirtyTopology) {
            // Clear the topology so that vertex normals can be recomputed.
            this.vertexEdges = [];
            this.dirtyTopology = false;
            this.dirtyVertices = false;
            this.rebuild();
        }
        else if (this.dirtyVertices) {
            this.dirtyVertices = false;
            this.resize();
        }
    }
    /**
     * Returns the bounding box for geometry.
     * @return - The return value.
     */
    getBoundingBox() {
        this.update();
        return super.getBoundingBox();
    }
    /**
     * Returns the number of vertex attributes.
     *
     * @return - The return value.
     */
    getNumVertices() {
        this.update();
        return super.getNumVertices();
    }
    /**
     * Compute vertex normals.
     * @param hardAngle - The hardAngle value in radians.
     * @return - The return value.
     */
    computeVertexNormals(hardAngle = 1.0 /* radians */) {
        this.update();
        return super.computeVertexNormals(hardAngle);
    }
    /**
     * The computeHardEdgesIndices method.
     * @param hardAngle - The hardAngle value in radians.
     * @return - The return value.
     */
    computeHardEdgesIndices(hardAngle = 1.0) {
        this.update();
        return super.computeHardEdgesIndices(hardAngle);
    }
    // ////////////////////////////////////////
    // Rendering
    /**
     * The genBuffers method.
     * @param opts - The opts value.
     * @return - The return value.
     */
    genBuffers(opts) {
        this.update();
        return super.genBuffers(opts);
    }
    // ////////////////////////////////////////
    // Persistence
    /**
     * The toJSON method encodes this type as a json object for persistence.
     *
     * @param context - The context value.
     * @return - Returns the json object.
     */
    toJSON(context) {
        if (!context)
            context = {};
        context.skipTopology = true;
        context.skipAttributes = ['positions', 'normals', 'texCoords'];
        const j = super.toJSON(context);
        context.skipTopology = false;
        context.skipAttributes = [];
        return j;
    }
}
export { ProceduralMesh };
//# sourceMappingURL=ProceduralMesh.js.map