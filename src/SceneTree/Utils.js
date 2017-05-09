let getFileFolder = function(filePath) {
    return filePath.substring(0, filePath.lastIndexOf("/")) + '/';
}

let loadfile = function(url, responseType, onSucceed, onFail) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = responseType;
    try {
        xhr.open("GET", url, true);
        xhr.ontimeout = function() {
            console.error("The request for " + url + " timed out.");
        };
        xhr.onerror = function() {
            onFail(xhr.statusText);
        }
        xhr.onload = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status == 0) { // Note: .status == 0 for local files. 
                    onSucceed(xhr);
                } else {
                    onFail(xhr.statusText);
                }
            }
        };
        xhr.send(null);
    } catch (err) {
        onFail(err);
    }
}


let loadTextfile = function(url, onSucceed, onFail = undefined, scope = undefined) {
    loadfile(url, 'text', function(xhr) {
            onSucceed.call(scope, url, xhr.responseText);
        },
        function(statusText) {
            if (onFail != undefined)
                onFail.call(scope, statusText, url);
            else{
                console.error("File not found:" + url);
            }
        });
}

let loadBinfile = function(url, onSucceed, onFail = undefined, scope = undefined) {
    loadfile(url, 'arraybuffer', function(xhr) {
            onSucceed.call(scope, url, xhr.response);
        },
        function(statusText) {
            if (onFail != undefined)
                onFail.call(scope, statusText, url);
            else{
                console.error("File not found:" + url);
            }
        });
}


export {
    getFileFolder,
    loadTextfile,
    loadBinfile
};