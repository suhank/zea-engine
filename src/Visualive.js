

function isMobileDevice() {
    if (navigator.userAgent.match(/Android/i) || 
        navigator.userAgent.match(/webOS/i) || 
        navigator.userAgent.match(/iPhone/i) || 
        navigator.userAgent.match(/iPad/i) || 
        navigator.userAgent.match(/iPod/i) || 
        navigator.userAgent.match(/BlackBerry/i) || 
        navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    } else {
        return false;
    }
}

export {
    isMobileDevice
};

export * from './Math/Math.js';
export * from './SceneTree/SceneTree.js';
export * from './Renderer/Renderer.js';

