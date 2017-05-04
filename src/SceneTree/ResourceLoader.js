import {
    isMobileDevice,
    Async,
    Signal
} from '../Math';

let ResourceLoaderWorker = require("worker-loader?inline!./ResourceLoaderWorker.js");

class ResourceLoader {
    constructor(resources) {
        this.__resources = resources;

        this.workers = [];
        let logicalProcessors = window.navigator.hardwareConcurrency;
        for (let i = 0; i < logicalProcessors; i++) {
            this.workers[i] = this.__constructWorker();
        }
        this.__mostResentlyHired = 0;

        this.__callbacks = {};

        this.loaded = new Signal();
    }

    __constructWorker() {
        let worker = new ResourceLoaderWorker();
        worker.onmessage = (event) => {
            this.__recieveFileData(event.data);
        };
        return worker;
    }

    resolveURL(filePath) {
        let parts = filePath.split('/');
        let curr = this.__resources;
        for(let part of parts){
            if(part in curr)
                curr = curr[part];
            else
                return null;
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
        this.workers[this.__mostResentlyHired].postMessage({
            name: filePath,
            url
        });

        this.__mostResentlyHired = (this.__mostResentlyHired + 1) % this.workers.length;
    }

    __recieveFileData(fileData) {
        let name = fileData.name;
        for(let callback of this.__callbacks[name])
            callback(name, fileData.entries);
        this.loaded.emit(name);
    }

};

export {
    ResourceLoader
};