import {
    loadBinfile
} from './Utils.js';

import {
    Unpack
} from '../external/Unpack.js';

self.onmessage = function(event) {
    loadBinfile(event.data.url, (data) => {
        let unpack = new Unpack(data);
        let entries = unpack.getEntries();
        let result = {
            type: 'finished',
            name: event.data.name,
            url: event.data.url,
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

        self.postMessage(result, transferables);
    }, (statusText) => {
        console.warn("Unable to Load URL:"+ event.data.url);
    }, (total, loaded) => {
        self.postMessage({
            type: 'progress',
            name: event.data.name,
            url: event.data.url,
            total,
            loaded
        });
    });
}