
precision highp float;

uniform highp int occlusionCulling;
uniform highp vec2 viewportSize;

/* VS Outputs */
varying vec4 v_color;
varying vec2 v_screenSpaceSize;

#ifdef ENABLE_ES3
  out vec4 fragColor;
#endif
void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  int drawItemId = int(v_color.g);
  fragColor = v_color;
  
  if (occlusionCulling != 0) {
    // Calculate a simple stochastic transparency to ensure that bounding boxes don't completely occlude each other. 
    // see e2e-test: occlusion-culling-occluded-by-hidden-bbox
    int x = drawItemId + int(gl_FragCoord.x * viewportSize.x);
    int y = 1 + drawItemId + int(gl_FragCoord.y * viewportSize.y);
    // The a value contains the screen space radius of the bounding sphere. 
    // The value should will range from 0..2. A full screen bounding boox will be 2.0
    // We the bounding radius to generate a stochatsic
    // transparency the is denser for smaller items on screen, and sparser
    // for bigger items. This is so that many big bounding boxes do not occlude
    // smaller items in the scene.
    int modX = 3 + int(round(v_screenSpaceSize.x * 10.0));
    int modY = 3 + int(round(v_screenSpaceSize.y * 10.0));
    if ((x + y) % modX != 0 || (x + y) % modY != 0) discard;
    fragColor.r = 1.0;
    fragColor.a = 1.0;
  }


#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
