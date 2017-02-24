
class StandardMaterial extends Material {
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('StandardMaterial.vertexShader', `
    gl_Position = projectionMatrix * viewPos;
}
`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('StandardMaterial.fragmentShader', `
        // Need to use 'reflectance' here instead of 'ior'
`);
    }
};