// Note: the older code imported drawItemId.glsl and newer code is importing geomItemId.glsl
// This code keeps compatibility with the older shaders.

#ifdef ENABLE_MULTI_DRAW

#ifdef EMULATE_MULTI_DRAW

uniform int drawItemId;
int getDrawItemId() {
  return drawItemId;
}

#else // EMULATE_MULTI_DRAW

uniform sampler2D drawIdsTexture;

int getDrawItemId() {
  ivec2 drawIdsTextureSize = textureSize(drawIdsTexture, 0);
  ivec2 drawIdsArrayCoords = ivec2(gl_DrawID % drawIdsTextureSize.x, gl_DrawID / drawIdsTextureSize.x);
  return int(texelFetch(drawIdsTexture, drawIdsArrayCoords, 0).r + 0.5);
}

#endif // EMULATE_MULTI_DRAW

#else // ENABLE_MULTI_DRAW

uniform int drawItemId;

#ifdef ENABLE_FLOAT_TEXTURES

attribute float instancedIds;    // instanced attribute..
uniform int instancedDraw;

int getDrawItemId() {
  if (instancedDraw == 0) {
    return drawItemId;
  }
  else {
    return int(instancedIds);
  }
}

#else

int getDrawItemId() {
  return drawItemId;
}

vec4 getDrawItemIds() {
    return vec4(float(drawItemId), 0.0, -1.0, -1.0);
}

#endif // ENABLE_FLOAT_TEXTURES
#endif // ENABLE_MULTI_DRAW

