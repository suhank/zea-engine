
import {
    Signal,
} from '../Math';
import {
    GLTexture2D
} from './GLTexture2D.js';

import './Shaders/GLSL/ImageStream.js';


class GLImageStream {
    constructor(gl, streamImage) {

        this.__gl = gl;
        this.__streamImage = streamImage;
        this.ready = new Signal(true);
        this.updated = new Signal();
        this.resized = new Signal();

        // To support playing back the same image atlas through many different streams. 
        // (e.g. the same Gif progress bar in many places)
        // The GLImageStream should own an instance of GLTexture2D instead of extending it.
        // this would enable multiple streams to share a reference.     
        const configure = ()=>{
            const params = this.__streamImage.getParams();
            if(!params.data.__atlasTexture){
                params.data.__atlasTexture = new GLTexture2D(gl, params);
            }
            this.__atlasTexture = params.data.__atlasTexture;
        }

        if (this.__streamImage.isLoaded()) {
            configure();
        } else {
            this.__streamImage.loaded.connect(() => {
                configure();
            });
        }

        this.__descParam = this.__streamImage.getParameter('StreamAtlasDesc');
        this.__indexParam = this.__streamImage.getParameter('StreamAtlasIndex');
        this.__indexParam.valueChanged.connect(this.updated.emit);

    }

    bindToUniform(renderstate, unif) {

        if(!this.__atlasTexture.bindToUniform(renderstate, unif, 2)){
            return false;
        }

        let textureDescUnif = renderstate.unifs[unif.name+'Desc'];
        if (textureDescUnif){
            this.__gl.uniform4f(textureDescUnif.location, ...this.__descParam.getValue().asArray());
        }

        
        let textureIndexUnif = renderstate.unifs[unif.name+'Index'];
        if (textureIndexUnif){
            this.__gl.uniform1i(textureIndexUnif.location, this.__indexParam.getValue());
        }

        return true;
    }

};

export {
    GLImageStream
};