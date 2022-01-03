interface GPUDescription {
    vendor: string;
    renderer: string;
    gpuVendor: string;
    maxTextureSize: number;
    supportsWebGL: boolean;
    supportsWebGL2: boolean;
}
interface SystemDescription {
    isMobileDevice: boolean;
    isIOSDevice: boolean;
    browserName: string;
    webGLSupported: boolean;
    deviceCategory: string;
    hardwareConcurrency: number;
    fullVersion?: any;
    majorVersion?: any;
    appName?: any;
    userAgent?: any;
    gpuDesc?: GPUDescription;
}
declare const SystemDesc: SystemDescription;
export { SystemDesc };
