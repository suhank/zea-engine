let getFileFolder = function(filePath) {
    return filePath.substring(0, filePath.lastIndexOf("/")) + '/';
}

let loadfile = function(filePath, responseType, onSucceed, onFail) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = responseType;
    xhr.open("GET", filePath, true);
    xhr.ontimeout = function() {
        console.error("The request for " + filePath + " timed out.");
    };
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
}


let loadTextfile = function(filePath, onSucceed, onFail = undefined, scope = undefined) {
    loadfile(filePath, 'text', function(xhr) {
            onSucceed.call(scope, filePath, xhr.responseText);
        },
        function(statusText) {
            if (onFail != undefined)
                onFail.call(scope, statusText, filePath);
            else{
                console.error("File not found:" + filePath);
            }
        });
}

let loadBinfile = function(filePath, onSucceed, onFail = undefined, scope = undefined) {
    loadfile(filePath, 'arraybuffer', function(xhr) {
            onSucceed.call(scope, filePath, xhr.response);
        },
        function(statusText) {
            if (onFail != undefined)
                onFail.call(scope, statusText, filePath);
            else{
                console.error("File not found:" + filePath);
            }
        });
}


export {
    getFileFolder,
    loadTextfile,
    loadBinfile
};