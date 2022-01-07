
precision highp float;

uniform highp int occlusionCulling;

/* VS Outputs */
varying vec4 v_color;

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
    int x = drawItemId + int(gl_FragCoord.x * 1400.0); // TODO: use the current viewport dimensions here
    int y = drawItemId + int(gl_FragCoord.y * 1000.0);
    // The a value contains the screen space radius of the bounding sphere. 
    // The value should will range from 0..2. A full screen bounding boox will be 2.0
    // We the bounding radius to generate a stochatsic
    // transparency the is denser for smaller items on screen, and sparser
    // for bigger items. This is so that many big boudning boxes do not occlude
    // smaller items in the scene.
    int modX = 3 + int(ceil(v_color.a * 100.0));
    int modY = 7 + int(ceil(v_color.a * 100.0));
    if (x % modX != 0 || y % modY != 0) discard;
    fragColor.a = 1.0;
  }


#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
