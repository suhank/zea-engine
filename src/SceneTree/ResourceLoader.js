import {
    isMobileDevice
} from '../BrowserDetection.js';
import {
    Async,
    Signal
} from '../Math';

let ResourceLoaderWorker = require("worker-loader?inline!./ResourceLoaderWorker.js");
let FreeMemWorker = require("worker-loader?inline!./FreeMemWorker.js");
// For synchronous loading, uncomment these lines.
// import {
//     ResourceLoaderWorker_onmessage
// } from './ResourceLoaderWorker.js';


class ResourceLoader {
    constructor(resources) {
        this.__resources = resources;
        this.loaded = new Signal();
        this.progressIncremented = new Signal();
        this.allResourcesLoaded = new Signal();

        this.__totalWork = 0;
        this.__totalWorkByCategory = {};
        this.__doneWork = 0;
        this.__doneWorkByCategory = {};
        this.__callbacks = {};
        this.__workCategories = {};

        this.__workers = [];
        this.__constructWorkers();
        this.__nextWorker = 0;
    }

    freeData(buffer){
        // Note: Explicitly transfer data to a web worker and then 
        // terminate the worker. (hacky way to free TypedArray memory explicitly)
        let worker = new FreeMemWorker();
        worker.postMessage(buffer, [buffer]);
        worker.terminate();
    }

    addResourceURL(resourcePath, url) {

        let parts = resourcePath.split('/');
        let filename = parts.pop();
        if(parts[0] == '.' && this.__resources['.'] == undefined)
            parts.shift();
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
        curr[filename] = url;
    }

    __constructWorkers() {
        let __constructWorker = ()=>{
            let worker = new ResourceLoaderWorker();
            worker.onmessage = (event) => {
                if(event.data.type == 'loaded') {
                    this.addWorkDone(event.data.name, 1); // loading done...
                }
                else if(event.data.type == 'finished') {
                    this.__onFinishedReceiveFileData(event.data);
                }
            };
            return worker;
        }
        for(let i=0; i<3; i++){
            this.__workers.push(__constructWorker());
        }
    }

    __terminateWorkers() {
        for (let worker of this.__workers)
            worker.terminate();
        this.__workers = [];
    }

    resolveURL(filePath) {
        if(!this.__resources)
            throw("Resources dict not provided");
        let parts = filePath.split('/');
        if(parts[0] == '.' && this.__resources['.'] == undefined)
            parts.shift();
        let curr = this.__resources;
        for(let part of parts){
            if(part in curr)
                curr = curr[part];
            else{
                // console.warn("Unable to resolve URL:" + filePath);
                return null;
            }
        }
        return curr;
    }
    
    resourceAvailable(filePath) {
        return this.resolveURL(filePath) != null;
    }

    __initCategory(name){
        if(!(name in this.__workCategories))
            this.__workCategories[name] = { callbacks:[], totalWork:0, doneWork:0 };
    }

    // Add work to the total work pile... We never know how big the pile will get.
    addWork(name, amount){
        this.__initCategory(name);
        this.__totalWork += amount;
        this.__workCategories[name].totalWork += amount;
        // console.log("addWork:" + name + " amount:" + amount + " done:" + this.__workCategories[name].doneWork + " totol:" + this.__workCategories[name].totalWork + " overall done:" + this.__doneWork + " overall totol:" + this.__totalWork);
        this.progressIncremented.emit((this.__doneWork / this.__totalWork) * 100);
    }

    //Add work to the 'done' pile. The done pile should eventually match the total pile.
    addWorkDone(name, amount){
        this.__doneWork += amount;
        this.__workCategories[name].doneWork += amount;
        // console.log("addWorkDone:" + name + " amount:" + amount + " done:" + this.__workCategories[name].doneWork + " totol:" + this.__workCategories[name].totalWork + " overall done:" + this.__doneWork + " overall totol:" + this.__totalWork);
        // if(this.__doneWork == this.__totalWork){
        //     console.log("===========DOOOONE=================");
        // }
        this.progressIncremented.emit((this.__doneWork / this.__totalWork) * 100);
        if(this.__doneWork > this.__totalWork) {
            throw("Mismatch between work loaded and work done.")
        }
        if(this.__doneWork == this.__totalWork) {
            this.allResourcesLoaded.emit();
        }
    }

    loadResource(name, callback, addLoadWork=true) {
        this.__initCategory(name);
        this.__workCategories[name].callbacks.push(callback);

        if(!(name in this.__callbacks))
            this.__callbacks[name] = [];
        this.__callbacks[name].push(callback);

        // If the loader was suspended, resume. 
        if(this.__workers.length == 0){
            this.__constructWorkers();
        }

        let url = this.resolveURL(name);
        if(!url){
            throw("Invalid name:'"+ name + "' not found in Resources:" + JSON.stringify(this.__resources, null, 2));
        }

        if(addLoadWork){ 
            this.addWork(name, 3);// Add work in 2 chunks. Loading, unpacking, parsing.
        }
        else{
            // the work for loading and parsing the work is already registered..
            // See BinAsset. It knows that it will load a sequwnce of files
            // and has already registered this work once is determined the 
            // toal number of files in the stream.
        }

        this.__workers[this.__nextWorker].postMessage({
            name,
            url
        });
        this.__nextWorker = (this.__nextWorker+1)%this.__workers.length;

        // For synchronous loading, uncomment these lines.
        // ResourceLoaderWorker_onmessage({
        //     name,
        //     url
        // },()=>{
        //     this.addWorkDone(1); // loading done...
        // }, (result, transferables)=>{
        //     if(result.type == 'finished')
        //         this.__onFinishedReceiveFileData(result);
        // });
    }

    __onFinishedReceiveFileData(fileData) {
        let name = fileData.name;
        this.addWorkDone(name, 1); // unpacking done...
        for(let callback of this.__callbacks[name]){
            callback(fileData.entries);
        }
        this.loaded.emit(name);
        this.addWorkDone(name, 1); // parsing done...

    }

    suspend() { 
        this.__terminateWorkers();
    }

};

export {
    ResourceLoader
};