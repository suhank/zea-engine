

#ifdef ENABLE_MULTI_DRAW

#ifdef EMULATE_MULTI_DRAW

uniform int geomItemId;
int getGeomItemId() {
  return geomItemId;
}

vec4 getDrawItemIds() {
  return vec4(float(geomItemId), 0.0, -1.0, -1.0);
}

#else // EMULATE_MULTI_DRAW

uniform sampler2D drawIdsTexture;

int getGeomItemId() {
  ivec2 drawIdsTextureSize = textureSize(drawIdsTexture, 0);
  ivec2 drawIdsArrayCoords = ivec2(gl_DrawID % drawIdsTextureSize.x, gl_DrawID / drawIdsTextureSize.x);
  return int(texelFetch(drawIdsTexture, drawIdsArrayCoords, 0).r + 0.5);
}

vec4 getDrawItemIds() {
  ivec2 drawIdsTextureSize = textureSize(drawIdsTexture, 0);
  ivec2 drawIdsArrayCoords = ivec2(gl_DrawID % drawIdsTextureSize.x, gl_DrawID / drawIdsTextureSize.x);
  vec4 color = texelFetch(drawIdsTexture, drawIdsArrayCoords, 0);
  // Note: a 0 value in the texture means no sub-geom index is being rendered. 
  // subtract off 1 to get the true sub-geom index.
  return vec4(color.r, color.g - 1.0, color.b, color.a);
}

#endif // EMULATE_MULTI_DRAW

#else // ENABLE_MULTI_DRAW

uniform int geomItemId;

#ifdef ENABLE_FLOAT_TEXTURES

attribute float instancedIds;    // instanced attribute..
uniform int instancedDraw;

int getGeomItemId() {
  if (instancedDraw == 0) {
    return geomItemId;
  }
  else {
    return int(instancedIds);
  }
}

vec4 getDrawItemIds() {
  if (instancedDraw == 0) {
    return vec4(float(geomItemId), 0.0, -1.0, -1.0);
  }
  else {
    return vec4(float(instancedIds), 0.0, -1.0, -1.0);
  }
}

#else

int getGeomItemId() {
  return geomItemId;
}

vec4 getDrawItemIds() {
    return vec4(float(geomItemId), 0.0, -1.0, -1.0);
}

#endif // ENABLE_FLOAT_TEXTURES
#endif // ENABLE_MULTI_DRAW

