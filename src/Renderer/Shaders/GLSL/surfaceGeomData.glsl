  uniform int floatGeomBuffer;
  uniform int passId;
  
  vec4 setFragColor_geomData(vec3 v_viewPos, int floatGeomBuffer, int passId, float v_drawItemId, int isOrthographic){
    vec4 fragColor;
    //float viewDist = length(v_viewPos);
    float viewDist;
    if (isOrthographic > 0) {
      viewDist= v_viewPos.z;
    } else {
      viewDist = length(v_viewPos);
    }
    if (floatGeomBuffer != 0) {
      fragColor.r = float(passId); 
      fragColor.g = float(v_drawItemId);
      fragColor.b = 0.0;// TODO: store poly-id or something.
      fragColor.a = viewDist;
    }
    else {
      ///////////////////////////////////
      // UInt8 buffer
      // fragColor.r = (mod(v_drawItemId, 256.) + 0.5) / 255.;
      // fragColor.g = (floor(v_drawItemId / 256.) + 0.5) / 255.;

      // encode the dist as a 16 bit float
      // vec2 float16bits = encode16BitFloatInto2xUInt8(viewDist);
      // fragColor.b = float16bits.x;
      // fragColor.a = float16bits.y;
    }

    return fragColor;
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