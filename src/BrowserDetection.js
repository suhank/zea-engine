
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

function getBrowserDesc() {
    const nVer = navigator.appVersion;
    const nAgt = navigator.userAgent;
    let browserName = navigator.appName;
    let fullVersion = '' + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset, verOffset, ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }

    // TOOD: Parse Samsung userAgent
    // https://developer.samsung.com/technical-doc/view.do?v=T000000203

    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
        (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return {
        browserName,
        fullVersion,
        majorVersion,
        appName: navigator.appName,
        userAgent: navigator.userAgent
    };
}

function getGPUDesc() {
    const canvas = document.createElement('canvas');
    let context = canvas.getContext('webgl');
    if(!context)
        return;

    const debugInfo = context.getExtension('WEBGL_debug_renderer_info');
    const vendor = context.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    const renderer = context.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    const maxTextureSize = context.getParameter(context.MAX_TEXTURE_SIZE);
    let gpuVendor;
    if (renderer.match(/NVIDIA/i)) {
        gpuVendor = "NVidia";
    }
    else if (renderer.match(/AMD/i)) {
        gpuVendor = "AMD";
    }
    else if (renderer.match(/Intel/i)) {
        gpuVendor = "Intel";
    }
    else if (renderer.match(/Mali/i)) {
        gpuVendor = "ARM";
    }

    return {
        vendor,
        renderer,
        gpuVendor,
        maxTextureSize
    }
}

function isWebGLSupported() {

    return getGPUDesc() != undefined;
}

function getSystemDesc() {
    const isMobile = isMobileDevice();
    const browserDesc = getBrowserDesc();
    const gpuDesc = getGPUDesc();

    // We divide devices into 3 categories.
    // 0: low end, we dial everything down as much as possible
    // 1: mid-range, Enb maps and Textures go to mid-lods. 
    //    Typically these devices are laptops, so the textures can't be too blurry
    // 2: High-end: turn up as much as needed.
    let deviceCategory;
    if (!isMobile && gpuDesc.gpuVendor == 'NVidia' && browserDesc.browserName == 'Chrome' && gpuDesc.renderer.match(/GTX/i)) {
        deviceCategory = 'High';
    } else  if (!isMobile && (gpuDesc.gpuVendor == 'Intel' || browserDesc.browserName != 'Chrome')) {
        deviceCategory = 'Medium';
    }
    else {
        deviceCategory = 'Low';
    }
        // deviceCategory = 'Low';
    
    return {
        isMobileDevice: isMobile,
        isIOSDevice: isIOSDevice(),
        browserName: browserDesc.browserName,
        fullVersion: browserDesc.fullVersion,
        majorVersion: browserDesc.majorVersion,
        appName: browserDesc.appName,
        userAgent: browserDesc.userAgent,
        webGLSupported: (browserDesc != undefined),
        gpuDesc,
        deviceCategory
    }
}

const SystemDesc = getSystemDesc();

export {
    SystemDesc
};