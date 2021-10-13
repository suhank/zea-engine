

#ifdef ENABLE_MULTI_DRAW

uniform sampler2D drawIdsTexture;

#ifdef EMULATE_MULTI_DRAW

uniform int drawId;
int getDrawItemId() {
  return drawId;
}

ivec3 getDrawItemIds() {
  return ivec3(drawId, 0, -1);
}

#else // EMULATE_MULTI_DRAW

int getDrawItemId() {
  ivec2 drawIdsTextureSize = textureSize(drawIdsTexture, 0);
  ivec2 drawIdsArrayCoords = ivec2(gl_DrawID % drawIdsTextureSize.x, gl_DrawID / drawIdsTextureSize.x);
  return int(texelFetch(drawIdsTexture, drawIdsArrayCoords, 0).r + 0.5);
}

ivec3 getDrawItemIds() {
  ivec2 drawIdsTextureSize = textureSize(drawIdsTexture, 0);
  ivec2 drawIdsArrayCoords = ivec2(gl_DrawID % drawIdsTextureSize.x, gl_DrawID / drawIdsTextureSize.x);
  vec4 color = texelFetch(drawIdsTexture, drawIdsArrayCoords, 0);
  return ivec3(int(color.r + 0.5), int(color.g + 0.5), int(color.b));
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

ivec3 getDrawItemIds() {
  if (instancedDraw == 0) {
    return ivec3(drawItemId, 0, -1);
  }
  else {
    return ivec3(instancedIds, 0, -1);
  }
}

#else

int getDrawItemId() {
  return drawItemId;
}

ivec3 getDrawItemIds() {
  return ivec3(drawItemId, 0, -1);
}

#endif // ENABLE_FLOAT_TEXTURES
#endif // ENABLE_MULTI_DRAW

