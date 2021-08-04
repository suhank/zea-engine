  float viewDist = length(v_viewPos);

  if (floatGeomBuffer != 0) {
    fragColor.r = float(passId); 
    fragColor.g = float(v_drawItemId);
    fragColor.b = 0.0;// TODO: store poly-id or something.
    fragColor.a = viewDist;
  }
  // int drawItemId = int(v_drawItemId + 0.5);
  // float dist;
  // if (isOrthographic > 0) {
  //   dist = v_viewPos.z;
  // } else {
  //   dist = length(v_viewPos);
  // }
 
  // if (floatGeomBuffer != 0) {
  //   fragColor.r = float(passId);
  //   fragColor.g = float(drawItemId) - 0.1;
  //   fragColor.b = 0.0;// TODO: store poly-id or something.
  //   fragColor.a = dist;
  // }
  // else {
  //   ///////////////////////////////////
  //   // UInt8 buffer
  //   // fragColor.r = mod(v_drawItemId, 256.) / 256.;
  //   // fragColor.g = (floor(v_drawItemId / 256.) + (float(passId) * 64.)) / 256.;


  //   // // encode the dist as a 16 bit float
  //   // vec2 float16bits = encode16BitFloatInto2xUInt8(dist);
  //   // fragColor.b = float16bits.x;
  //   // fragColor.a = float16bits.y;
  // }