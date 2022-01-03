/* eslint-disable new-cap */
/* eslint-disable require-jsdoc */
import { Color } from '../../Math/index';
import { Registry } from '../../Registry';
import { HDRImage } from './HDRImage';
import { BooleanParameter } from '../Parameters/BooleanParameter';
/**
 * An EnvMap can load High Dynamic Range environment map images, necessary for high quality PBR lighting.
 *
 *
 * **Parameters**
 * * **HeadLightMode(`BooleanParameter`):** Enables Headlight mode so that the environment lighting is aligned with the camera.
 * With Headlight mode on, the top of the env map is aligned with the direction of the camera, so a the view is generally well lit.
 *
 * @extends HDRImage
 */
class EnvMap extends HDRImage {
    /**
     * Create an env map.
     * @param name - The name value.
     * @param params - The params value.
     */
    constructor(name, params = {}) {
        super(name, params);
        this.headlightModeParam = new BooleanParameter('HeadLightMode', false);
        this.addParameter(this.headlightModeParam);
        this.utf8decoder = new TextDecoder();
        this.shCoeffs = [];
    }
    /**
     * The __decodeData method.
     * @param entries - The entries value.
     * @return
     * @private
     */
    __decodeData(entries) {
        const samples = entries.samples;
        if (samples) {
            this.luminanceData = JSON.parse(this.utf8decoder.decode(samples));
            if (this.luminanceData.shCoeffs) {
                for (let i = 0; i < 9; i++) {
                    this.shCoeffs[i] = new Color(this.luminanceData.shCoeffs[i * 3 + 0], this.luminanceData.shCoeffs[i * 3 + 1], this.luminanceData.shCoeffs[i * 3 + 2]);
                }
            }
        }
        return super.__decodeData(entries);
    }
    /**
     * Calculate the luminance of the Environment in the direction.
     *
     * @param dir - The dir value.
     * @return - The return value.
     */
    dirToLuminance(dir) {
        // normal is assumed to have unit length
        const x = dir.x;
        const y = dir.y;
        const z = dir.z;
        // band 0
        const result = this.shCoeffs[0].scale(0.886227);
        // band 1
        result.addInPlace(this.shCoeffs[1].scale(2.0 * 0.511664 * y));
        result.addInPlace(this.shCoeffs[2].scale(2.0 * 0.511664 * z));
        result.addInPlace(this.shCoeffs[3].scale(2.0 * 0.511664 * x));
        // band 2
        result.addInPlace(this.shCoeffs[4].scale(2.0 * 0.429043 * x * y));
        result.addInPlace(this.shCoeffs[5].scale(2.0 * 0.429043 * y * z));
        result.addInPlace(this.shCoeffs[6].scale(0.743125 * z * z - 0.247708));
        result.addInPlace(this.shCoeffs[7].scale(2.0 * 0.429043 * x * z));
        result.addInPlace(this.shCoeffs[8].scale(0.429043 * (x * x - y * y)));
        return result.luminance();
    }
}
Registry.register('EnvMap', EnvMap);
export { EnvMap };
//# sourceMappingURL=EnvMap.js.map