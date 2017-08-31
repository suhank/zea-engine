let getFileFolder = function(filePath) {
    return filePath.substring(0, filePath.lastIndexOf("/")) + '/';
}

let loadfile = function(url, responseType, onSucceed, onFail, onProgress) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = responseType;
    try {
        xhr.addEventListener("timeout", function(event) {
            throw("The request for " + url + " timed out.");
        });
        xhr.addEventListener("error", function(event) {
            throw("xhr.error xhr.readyState:" + xhr.readyState);
            onFail(xhr.statusText);
        });
        xhr.addEventListener("abort", function(event) {
            throw("xhr.abort xhr.readyState:" + xhr.readyState);
            onFail(xhr.statusText);
        });
        xhr.addEventListener("loadend", function(event) {
            onSucceed(xhr);
        });
        xhr.open("GET", url, true);
        xhr.send();
        // xhr.open();
    } catch (err) {
        onFail(err);
    }
}


let loadTextfile = function(url, onSucceed, onFail = undefined, onProgress = undefined) {
    loadfile(url, 'text',
        (xhr) => {
            onSucceed(xhr.responseText);
        },
        (statusText) => {
            if (onFail != undefined)
                onFail(statusText);
            else {
                throw("Unable to XHR File:" + url);
            }
        },
        (total, loaded) => {
            if (onProgress != undefined)
                onProgress(total, loaded);
        });
}

let loadBinfile = function(url, onSucceed, onFail = undefined, onProgress = undefined) {
    loadfile(url, 'arraybuffer',
        (xhr) => {
            onSucceed(xhr.response);
        },
        (statusText) => {
            if (onFail != undefined)
                onFail(statusText);
            else {
                throw("Unable to XHR File:" + url);
            }
        },
        (total, loaded) => {
            if (onProgress != undefined)
                onProgress(total, loaded);
        });
}


export {
    getFileFolder,
    loadTextfile,
    loadBinfile
};