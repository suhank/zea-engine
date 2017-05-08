import Vec3 from '../../Math/Vec3';
import Mat4 from '../../Math/Mat4';
import GLFbo from '../GLFbo.js';
import GLPass from '../GLPass.js';
import GLTexture2D from '../GLTexture2D.js';
import GLShader from '../GLShader.js';
import DepthMapShader from '../Shaders/DepthMapShader.js';

class GLDepthPass extends GLPass {
    constructor(gl, volSize, textureSize) {
        super(gl);

        this.__ext_std_derivatives = gl.getExtension("OES_standard_derivatives");
        let shader = new DepthMapShader();
        let glshader = new GLShader(gl, shader);
        this.setExplicitShader(glshader);

        glshader.updated.connect(this.updated.emit, this.updated);

        this.__volSize = volSize;
        this.__dir = new Vec3();
        this.__dir.set(-0.75, 0.5, 0.25); // The direction of the light source.
        this.__pos = new Vec3(0.0, 0.0, 0.0);
        this.__up = new Vec3(0.0, 1.0, 0.0);
        this.__lightViewMatrix = new Mat4();
        this.__lightProjectionMatrix = new Mat4();

        this.__lightProjectionMatrix.setOrthographicMatrix(
            this.__volSize * -0.5,
            this.__volSize * 0.5,
            this.__volSize * -0.5,
            this.__volSize * 0.5,
            this.__volSize * -0.5,
            this.__volSize * 0.5
        );

        let colorTexture = new GLTexture2D(gl, {
            format: 'UNSIGNED_BYTE',
            channels: 'RGB',
            width: textureSize,
            height: textureSize
        });
        this.__fbo = new GLFbo(gl, colorTexture, true);

    }

    get fbo() {
        return this.__fbo;
    }

    get lightSourceDir() {
        return this.__dir;
    }

    set lightSourceDir(dir) {
        this.__dir = dir;
    }

    get lightViewMatrix() {
        return this.__lightViewMatrix;
    }

    get lightProjectionMatrix() {
        return this.__lightProjectionMatrix;
    }

    get numSamples() {
        return this.__numSamples;
    }

    set numSamples(val) {
        this.__numSamples = val;
    }

    bind(renderstate) {

        let unifs = renderstate['unifs'];
        this.__dir.normalizeInPlace();

        if (this.__dir.dot(this.__up) > 1 - 10e-10) {
            this.__lightViewMatrix.set(
                0, -1, 0, 0,
                0, 0, 1, 0, -1, 0, 0, 0,
                0, 0, 0, 1
            );
        } else {
            let zAxis = this.__dir;
            let xAxis = this.__up.cross(zAxis);
            let yAxis = zAxis.cross(xAxis);
            xAxis.normalizeInPlace();
            yAxis.normalizeInPlace();

            this.__lightViewMatrix.set(
                xAxis.x, yAxis.x, zAxis.x, 0.0,
                xAxis.y, yAxis.y, zAxis.y, 0.0,
                xAxis.z, yAxis.z, zAxis.z, 0.0,
                0.0, 0.0, 0.0, 1.0
            );
        }

        this.__gl.uniformMatrix4fv(unifs['lightViewMatrix']['location'], false, this.__lightViewMatrix.asArray());
        this.__gl.uniformMatrix4fv(unifs['lightProjectionMatrix']['location'], false, this.__lightProjectionMatrix.asArray());
        this.__gl.uniform1f(unifs['near']['location'], this.__volSize * -0.5);
        this.__gl.uniform1f(unifs['far']['location'], this.__volSize * 0.5);

    }

    bindForReading(renderstate) {

        let unifs = renderstate['unifs'];

        this.__gl.uniformMatrix4fv(unifs['lightViewMatrix']['location'], false, this.lightViewMatrix.asArray());
        this.__gl.uniformMatrix4fv(unifs['lightProjectionMatrix']['location'], false, this.__lightProjectionMatrix.asArray());

        if ('totalLuminance' in unifs)
            this.__gl.uniform1f(unifs['totalLuminance']['location'], renderstate['totalLuminance']);

        if ('lightSourceDir' in unifs)
            this.__gl.uniform3fv(unifs['lightSourceDir']['location'], this.lightSourceDir.asArray());

        if ('depthTexture' in unifs) {
            let unit = renderstate['boundTextures']++;
            let texId = this.__gl.TEXTURE0 + unit;
            this.__gl.activeTexture(texId);
            this.__gl.bindTexture(this.__gl.TEXTURE_2D, this.fbo.depthTextureGL);
            // this.__gl.bindTexture(this.__gl.TEXTURE_2D, this.fbo.colorTexture.glTex);
            this.__gl.uniform1i(unifs['depthTexture']['location'], unit);

            if ('depthTextureSize' in unifs) {
                let width = this.__fbo.width;
                let height = this.__fbo.height;
                this.__gl.uniform2fv(unifs['depthTextureSize']['location'], [width, height]);
            }
        }
    }

    draw(renderstate) {
        this.__fbo.bindAndClear();
        this.__gl.enable(this.__gl.CULL_FACE);
        this.__gl.enable(this.__gl.DEPTH_TEST);

        super.draw(renderstate);
    }
};

export {
    GLDepthPass
};
// export default GLDepthPass;