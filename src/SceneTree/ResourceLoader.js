import {
    isMobileDevice,
    Async,
    Signal
} from '../Math';

let ResourceLoaderWorker = require("worker-loader?inline!./ResourceLoaderWorker.js");
// For synchronous loading, uncomment these lines.
// import {
//     ResourceLoaderWorker_onmessage
// } from './ResourceLoaderWorker.js';


class ResourceLoader {
    constructor(resources) {
        this.__resources = resources;
        this.__callbacks = {};
        this.loaded = new Signal();
        this.progressIncremented = new Signal();

        this.__loading = {};
        this.__totalWork = 0;
        this.__doneWork = 0;

        this.__workers = [];
        for(let i=0; i<3; i++)
            this.__workers.push(this.__constructWorker());
        this.__nextWorker = 0;
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
            if(event.data.type == 'loaded') {
                this.addWorkDone(1); // loading done...
            }
            if(event.data.type == 'finished') {
                //worker.terminate();
                this.__onFinishedReceiveFileData(event.data);
            }
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

    // Add work to the total work pile... We never know how big the pile will get.
    addWork(amount){
        this.__totalWork += amount;
        this.progressIncremented.emit((this.__doneWork / this.__totalWork) * 100);
    }

    //Add work to the 'done' pile. The done pile should eventually match the total pile.
    addWorkDone(amount){
        this.__doneWork += amount;
        // console.log("addWorkDone:" + amount + " done:" + this.__doneWork + " totol:" + this.__totalWork);
        // if(this.__doneWork == this.__totalWork){
        //     console.log("===========DOOOONE=================");
        // }
        this.progressIncremented.emit((this.__doneWork / this.__totalWork) * 100);
    }

    loadResource(name, callback, addLoadWork=true) {
        if(!(name in this.__callbacks))
            this.__callbacks[name] = [];
        this.__callbacks[name].push(callback);

        let url = this.resolveURL(name);
        if(!url){
            console.error("Invalid name:'"+ name + "' not found in Resources:" + JSON.stringify(this.__resources, null, 2));
        }

        if(addLoadWork){ 
            this.addWork(3);// Add work in 2 chunks. Loading, unpacking, parsing.
        }
        else{
            // the work for loading and parsing the work is already registered..
            // See BinAsset. It knows that it will load a sequwnce of files
            // and has already registered this work once is determined the 
            // toal number of files in the stream.
        }

        // let worker = this.__constructWorker();
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
        this.addWorkDone(1); // unpacking done...
        for(let callback of this.__callbacks[name]){
            callback(fileData.entries);
        }
        this.loaded.emit(name);
        this.addWorkDone(1); // parsing done...


        delete this.__loading[name];
    }

};

export {
    ResourceLoader
};