// import { GLPass } from '../GLPass.js';

// class GL2DOverlayPass extends GLPass {
//     constructor(gl, collector, passIndex) {
//         super(gl, collector, passIndex);

//     }

//     /////////////////////////////////////
//     // Bind to Render Tree
//     filterRenderTree() {
//         let allglshaderMaterials = this.__collector.getGLShaderMaterials();
//         this.__glshadermaterials = [];
//         for (let glshaderkey in allglshaderMaterials) {
//             let glshaderMaterials = allglshaderMaterials[glshaderkey];
//             if (!glshaderMaterials.getGLShader().isOverlay())
//                 continue;
//             this.__glshadermaterials.push(glshaderMaterials);
//         }
//     }

//     draw(renderstate) {
//         this.__gl.disable(this.__gl.CULL_FACE);
//         this.__gl.disable(this.__gl.DEPTH_TEST);

//         // Now draw all the geometries as normal....
//         super.draw(renderstate);

//         this.__gl.enable(this.__gl.CULL_FACE);
//         this.__gl.enable(this.__gl.DEPTH_TEST);
//     }
    
//     drawGeomData(renderstate){

//         // const gl = this.__gl;
//         // gl.disable(gl.BLEND);
//         // gl.disable(gl.CULL_FACE);
//         // gl.enable(gl.DEPTH_TEST);
//         // gl.depthFunc(gl.LESS);
//         // gl.depthMask(true);

//         // if(!this.__geomdatashader.bind(renderstate, this.constructor.name))
//         //     return false;

//         // if(!this.__collector.bind(renderstate))
//         //     return false;

//         // let unif = renderstate.unifs.floatGeomBuffer;
//         // if (unif){
//         //     gl.uniform1i(unif.location, this.__floatGeomBuffer ? 1 : 0);
//         // }

//         // super.drawGeomData(renderstate);
//     }
// };

// export {
//     GL2DOverlayPass
// };
// // export default GL2DOverlayPass;
