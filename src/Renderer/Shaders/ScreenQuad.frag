
precision highp float;

uniform sampler2D image;

varying vec2 v_texCoord;

#ifdef ENABLE_ES3
  out vec4 fragColor;
#endif
void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif
  fragColor = texture2D(image, v_texCoord);

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
