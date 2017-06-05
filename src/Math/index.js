

function isIOSDevice() {
    return (navigator.userAgent.match(/iPhone/i) || 
        navigator.userAgent.match(/iPad/i) || 
        navigator.userAgent.match(/iPod/i)) != null;
}
function isMobileDevice() {
    return (navigator.userAgent.match(/Android/i) || 
        navigator.userAgent.match(/webOS/i) || 
        navigator.userAgent.match(/iPhone/i) || 
        navigator.userAgent.match(/iPad/i) || 
        navigator.userAgent.match(/iPod/i) || 
        navigator.userAgent.match(/BlackBerry/i) || 
        navigator.userAgent.match(/Pixel/i) || 
        navigator.userAgent.match(/Windows Phone/i)) != null;
}

function getBrowserName() {
    // Opera 8.0+
    let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    if(isOpera)
        return 'Opera';

    // Firefox 1.0+
    let isFirefox = typeof InstallTrigger !== 'undefined';
    if(isFirefox)
        return 'Firefox';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    if(isSafari)
        return 'Safari';

    // Internet Explorer 6-11
    let isIE = /*@cc_on!@*/false || !!document.documentMode;
    if(isIE)
        return 'IE';

    // Edge 20+
    let isEdge = !isIE && !!window.StyleMedia;
    if(isEdge)
        return 'Edge';

    // Chrome 1+
    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    if(isChrome)
        return 'Chrome';

    // Blink engine detection
    let isBlink = (isChrome || isOpera) && !!window.CSS;
    if(isBlink)
        return 'Blink';

    return 'Unknown';
}

function getBrowserDesc() {
    return {
        isMobileDevice: isMobileDevice(),
        isIOSDevice: isIOSDevice(),
        browserName: getBrowserName()
    }
}

export {
    isIOSDevice,
    isMobileDevice,
    getBrowserName,
    getBrowserDesc
};

export {
    SInt32,
    UInt32,
    Float32,
    hashStr,
    JSON_stringify_fixedPrecision
} from './Common.js';
export * from './AttrValue.js';
export * from './Vec2.js';
export * from './Vec3.js';
export * from './Vec4.js';
export * from './Color.js';
export * from './Quat.js';
export * from './Ray.js';
export * from './Mat3.js';
export * from './Mat4.js';
export * from './Xfo.js';
export * from './Box2.js';
export * from './Box3.js';
export * from './Rect2.js';
export * from './BinTreeNode.js';
export * from './Hammersley.js';

export * from './Async.js';
export * from './Signal.js';

export * from './TypeRegistry.js';
