const DEGTORAD = Math.PI / 180;
Math.HALF_PI = Math.PI * 0.5;
// Defines used to explicity specify types for WebGL.
const UInt32 = 1;
const SInt32 = 2;
const Float32 = 3;

Math.radToDeg = function(rad) {
    return rad / DEGTORAD;
}
Math.degToRad = function(deg) {
    return deg * DEGTORAD;
}

Number.isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


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

String.prototype.hash = ()=>{
    return hashStr(this);
}


//trimming space from both side of the string
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}
 
//trimming space from left side of the string
String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}
 
//trimming space from right side of the string
String.prototype.rtrim = function() {
    return this.replace(/\s+$/,"");
}

//pads left
String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}
 
//pads right
String.prototype.rpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
}


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

Math.lerp  = (a, b, t) => {
    return a + t * (b - a);
}

Math.clamp = function(value, min, max) {
    return Math.min(Math.max(value, min), max);
}


Math.nearestPow2 = function(value) {
    return Math.pow(2, Math.round(Math.log(value) / Math.log(2)));
}

Math.nearestPow10 = function(value) {
    return Math.pow(10, Math.round(Math.log10(value) / Math.log10(10)));
}

Math.nextPow2 = function(value) {
    let exp = 0;
    while (value > 0) {
        exp++;
        value = value >> 1;
    }
    return (1 << exp);
}
Math.fract = function(value) {
    if (value == 0)
        return 0;
    if (value < 0) {
        if (value > -1.0)
            return -value;
        return -value % Math.floor(-value)
    }
    if (value < 1.0)
        return value;
    return value % Math.floor(value)
}



Math.smoothStep = (edge0, edge1, x)=>{
    let t = Math.clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
}


export {
    SInt32,
    UInt32,
    Float32,
    hashStr,
    JSON_stringify_fixedPrecision
};