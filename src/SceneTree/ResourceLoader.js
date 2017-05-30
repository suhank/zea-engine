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
        this.progressIncremented = new Signal();

        this.__loading = {};
        this.__totalWork = 0;
        this.__doneWork = 0;
    }

    addResourceURL(name, url) {

        let parts = name.split('/');
        parts.pop();
        let curr = this.__resources;
        for(let part of parts){
            if(part in curr)
                curr = curr[part];
            else{
                let dir = {};
                curr[part] = dir;
                curr = dir;
            }
        }
        curr[name] = url;
    }

    __constructWorker() {
        let worker = new ResourceLoaderWorker();
        worker.onmessage = (event) => {
            worker.terminate();
            if(event.data.type == 'finished')
                this.__onFinishedReceiveFileData(event.data);
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

    __addWork(amount){
        this.__totalWork += amount;
        this.progressIncremented.emit((this.__doneWork / this.__totalWork) * 100);
    }
    __addWorkDone(amount){
        this.__doneWork += amount;
        this.progressIncremented.emit((this.__doneWork / this.__totalWork) * 100);
    }

    loadResource(filePath, callback) {
        if(!(filePath in this.__callbacks))
            this.__callbacks[filePath] = [];
        this.__callbacks[filePath].push(callback);

        let url = this.resolveURL(filePath);
        if(!url){
            console.error("Invalid filePath:'"+ filePath + "' not found in Resources:" + JSON.stringify(this.__resources, null, 2));
        }

        this.__addWork(2000);// Add work in 2 chunkes of 1000. Loading + parsing.

        let worker = this.__constructWorker();
        worker.postMessage({
            name: filePath,
            url
        });
    }

    __onFinishedReceiveFileData(fileData) {
        let name = fileData.name;
        this.__addWorkDone(1000);
        for(let callback of this.__callbacks[name]){
            callback(fileData.entries);
        }
        this.loaded.emit(name);
        this.__addWorkDone(1000);

        delete this.__loading[name];
    }

};

export {
    ResourceLoader
};