import {
    isMobileDevice,
    Async,
    Signal
} from '../Math';

let ResourceLoaderWorker = require("worker-loader?inline!./ResourceLoaderWorker.js");

class ResourceLoader {
    constructor(resources) {
        this.__resources = resources;
        this.__callbacks = {};
        this.loaded = new Signal();
    }

    __constructWorker() {
        let worker = new ResourceLoaderWorker();
        worker.onmessage = (event) => {
            this.__receiveFileData(event.data);
            worker.terminate();
        };
        return worker;
    }

    resolveURL(filePath) {
        if(!this.__resources)
            console.error("Resources dict not provided");
        let parts = filePath.split('/');
        let curr = this.__resources;
        for(let part of parts){
            if(part in curr)
                curr = curr[part];
            else{
                console.error("Unable to resolve URL:" + filePath);
                return null;
            }
        }
        return curr;
    }
    
    resourceAvailable(filePath) {
        return this.resolveURL(filePath) != null;
    }

    loadResources(filePath, callback) {
        if(!(filePath in this.__callbacks))
            this.__callbacks[filePath] = [];
        this.__callbacks[filePath].push(callback);

        let url = this.resolveURL(filePath);
        if(!url){
            console.error("Invalid filePath:'"+ filePath + "' not foundin Resources:" + JSON.stringify(this.__resources, null, 2));
        }
        let worker = this.__constructWorker();
        worker.postMessage({
            name: filePath,
            url
        });
    }

    __receiveFileData(fileData) {
        let name = fileData.name;
        for(let callback of this.__callbacks[name])
            callback(name, fileData.entries);
        this.loaded.emit(name);
    }

};

export {
    ResourceLoader
};