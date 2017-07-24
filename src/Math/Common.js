const DEGTORAD = Math.PI / 180;
Math.radToDeg = function(rad) {
    return rad / DEGTORAD;
}
Math.degToRad = function(deg) {
    return deg * DEGTORAD;
}

Number.isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Defines used to explicity specify types for WebGL.
const UInt32 = 1;
const SInt32 = 2;
const Float32 = 3;

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Math.HALF_PI = Math.PI * 0.5;

let hashStr = function(str) {
    var hash = 0,
        i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

let JSON_stringify_fixedPrecision = function(val, space = 0, precision = 5) {
    return JSON.stringify(val, function(key, val) {
        return val ? (val.toFixed ? Number(val.toFixed(precision)) : val) : val;
    }, space)
}

Math.randomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

Math.clamp = function(value, min, max) {
  return Math.min(Math.max(value, min), max);
}


Math.nearestPow2 = function( value ){
  return Math.pow( 2, Math.round( Math.log( value ) / Math.log( 2 ) ) ); 
}

Math.nextPow2 = function( value ) {
    let  exp  =  0 ;
    while ( value > 0 ) {
        exp++;
        value  =  value  >>  1 ;
    }
    return  (1 << exp);
}
Math.fract = function( value ) {
    if(value == 0)
        return 0;
    if(value < 0) {
        if(value > -1.0)
            return -value;
      return -value % Math.floor(-value)  
    }
    if(value < 1.0)
        return value;
    return value % Math.floor(value)
}


export {
    SInt32,
    UInt32,
    Float32,
    hashStr,
    JSON_stringify_fixedPrecision
};

