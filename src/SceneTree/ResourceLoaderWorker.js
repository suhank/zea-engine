import {
    loadBinfile
} from './Utils.js';

import {
    Unpack
} from '../external/Unpack.js';

let ResourceLoaderWorker_onmessage = function(req, onLoaded, onDone) {
    loadBinfile(req.url, (data) => {
        onLoaded();
        let unpack = new Unpack(data);
        let entries = unpack.getEntries();
        let result = {
            type: 'finished',
            name: req.name,
            url: req.url,
            entries: {}
        };
        let transferables = [];
        for (let entry of entries) {
            let unpacked = unpack.decompress(entry.name);
            if (entry.name.endsWith('.packed')) {
                let unpack2 = new Unpack(unpacked.buffer);
                unpacked = unpack2.decompress(unpack2.getEntries()[0].name);
                unpack2.close();
                result.entries[unpack2.getEntries()[0].name] = unpacked;
            } else {
                transferables.push(unpacked.buffer);
                result.entries[entry.name] = unpacked;
            }
        }

        onDone(result, transferables);
    }, (statusText) => {
        console.warn("Unable to Load URL:"+ req.url);
    });
}
self.onmessage = function(event){
    ResourceLoaderWorker_onmessage(event.data, 
    ()=>{
        self.postMessage({
            type:'loaded'
        });
    },
    (result, transferables)=>{
        self.postMessage(result, transferables);
    });
}
// export {
//     ResourceLoaderWorker_onmessage
// };