type TypedArray =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Uint8ClampedArray
  | Float32Array
  | Float64Array

interface GPUDescription {
  vendor: string
  renderer: string
  gpuVendor: string
  maxTextureSize: number
  supportsWebGL: boolean
  supportsWebGL2: boolean
}

interface SystemDescription {
  isMobileDevice: boolean
  isIOSDevice: boolean
  browserName: string
  webGLSupported: boolean
  deviceCategory: string
  hardwareConcurrency: number
  fullVersion?: any
  majorVersion?: any
  appName?: any
  userAgent?: any
  gpuDesc?: GPUDescription
}
