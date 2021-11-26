/**
 * Returns a descriptor for the provided geom attribute.
 * @private
 * @param gl - The webgl context
 * @param attrDataType - The geometry attribute value.
 *
 * @return
 */
declare const genDataTypeDesc: (gl: WebGL12RenderingContext, attrDataType: any) => {
    dimension: any;
    elementSize: any;
    dataType: any;
};
declare abstract class IGeomShaderBinding {
    abstract bind(renderstate: RenderState): void;
    abstract unbind(): void;
    abstract destroy(): void;
}
declare function generateShaderGeomBinding(gl: WebGL12RenderingContext, shaderAttrs: Record<string, any>, geomAttrBuffers: Record<string, any>, indexBuffer: WebGLBuffer | null): IGeomShaderBinding;
export { generateShaderGeomBinding, genDataTypeDesc, IGeomShaderBinding };
