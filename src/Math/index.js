

function isIOSDevice() {
    return (navigator.userAgent.match(/iPhone/i) || 
        navigator.userAgent.match(/iPad/i) || 
        navigator.userAgent.match(/iPod/i));
}
function isMobileDevice() {
    return (navigator.userAgent.match(/Android/i) || 
        navigator.userAgent.match(/webOS/i) || 
        navigator.userAgent.match(/iPhone/i) || 
        navigator.userAgent.match(/iPad/i) || 
        navigator.userAgent.match(/iPod/i) || 
        navigator.userAgent.match(/BlackBerry/i) || 
        navigator.userAgent.match(/Pixel/i) || 
        navigator.userAgent.match(/Windows Phone/i));
}

export {
    isIOSDevice,
    isMobileDevice
};

export * from './Common.js';
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
