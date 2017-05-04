import shaderLibrary  from '../../SceneTree/ShaderLibrary';
import Shader  from '../../SceneTree/Shader';

class DebugImportantSamplesShader extends Shader {
    
    constructor(name) {
        super(name);
        this.__shaderStages['VERTEX_SHADER'] = shaderLibrary.parseShader('DebugImportantSamplesShader.vertexShader', `
precision highp float;

attribute vec2 positions;    //(location = 0)

void main() {
    gl_Position = vec4(vec2(-1.0,-1.0)+(positions*2.0), 0.0, 1.0);
    gl_PointSize = 2.0;
}`);
        this.__shaderStages['FRAGMENT_SHADER'] = shaderLibrary.parseShader('DebugImportantSamplesShader.fragmentShader', `
precision highp float;

void main(void) {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`);
    }
};

export default DebugImportantSamplesShader;




