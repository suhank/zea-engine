import { Vec3 } from '../../Math/index';
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
declare class EnvMap extends HDRImage {
    protected utf8decoder: TextDecoder;
    protected shCoeffs: any[];
    protected luminanceData: any;
    headlightModeParam: BooleanParameter;
    /**
     * Create an env map.
     * @param name - The name value.
     * @param params - The params value.
     */
    constructor(name?: string, params?: Record<string, any>);
    /**
     * The __decodeData method.
     * @param entries - The entries value.
     * @return
     * @private
     */
    __decodeData(entries: Record<string, any>): Promise<void>;
    /**
     * Calculate the luminance of the Environment in the direction.
     *
     * @param dir - The dir value.
     * @return - The return value.
     */
    dirToLuminance(dir: Vec3): any;
}
export { EnvMap };
