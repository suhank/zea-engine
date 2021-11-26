const getFileFolder = function (filePath) {
    return filePath.substring(0, filePath.lastIndexOf('/')) + '/';
};
const loadFile = function (url, responseType, onSucceed, onFail, onProgress = undefined) {
    try {
        const xhr = new XMLHttpRequest();
        xhr.responseType = responseType;
        xhr.addEventListener('timeout', (event) => {
            throw new Error('The request for ' + url + ' timed out.');
        });
        xhr.addEventListener('error', (event) => {
            throw new Error('The request for ' + url + ': xhr.readyState:' + xhr.readyState);
            onFail(xhr.statusText);
        });
        xhr.addEventListener('abort', (event) => {
            throw new Error('The request for ' + url + ': xhr.readyState:' + xhr.readyState);
            onFail(xhr.statusText);
        });
        xhr.addEventListener('progress', (event) => {
            if (onProgress)
                onProgress(event.total, event.loaded);
        });
        xhr.addEventListener('loadend', (event) => {
            if (xhr.status == 200)
                onSucceed(xhr);
            else
                onFail(xhr.statusText);
        });
        xhr.open('GET', url, true);
        xhr.send();
        // xhr.open();
    }
    catch (err) {
        onFail(err);
    }
};
const loadTextfile = function (url, onSucceed, onFail = undefined, onProgress = undefined) {
    loadFile(url, 'text', (xhr) => {
        onSucceed(xhr.responseText);
    }, (statusText) => {
        if (onFail != undefined)
            onFail(statusText);
        else {
            throw new Error('Unable to XHR File:' + url);
        }
    }, onProgress);
};
const loadJSONfile = function (url, onSucceed, onFail = undefined, onProgress = undefined) {
    loadFile(url, 'json', (xhr) => {
        onSucceed(xhr.response, xhr);
    }, (statusText) => {
        if (onFail != undefined)
            onFail(statusText);
        else {
            throw new Error('Unable to XHR File:' + url);
        }
    }, onProgress);
};
const loadXMLfile = function (url, onSucceed, onFail = undefined, onProgress = undefined) {
    loadFile(url, 'document', (xhr) => {
        onSucceed(xhr.responseXML);
    }, (statusText) => {
        if (onFail != undefined)
            onFail(statusText);
        else {
            throw new Error('Unable to XHR File:' + url);
        }
    }, onProgress);
};
const loadBinfile = function (url, onSucceed, onFail = undefined, onProgress = undefined) {
    loadFile(url, 'arraybuffer', (xhr) => {
        onSucceed(xhr.response);
    }, (statusText) => {
        if (onFail != undefined)
            onFail(statusText);
        else {
            throw new Error('Unable to XHR File:' + url);
        }
    }, onProgress);
};
export { getFileFolder, loadTextfile, loadJSONfile, loadXMLfile, loadBinfile };
//# sourceMappingURL=Utils.js.map