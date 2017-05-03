import {
    Points
} from './Points.js';
import {
    Lines
} from './Lines.js';
import {
    Mesh
} from './Mesh.js';
import {
    BinReader
} from '../BinReader.js';


let parseGeomsBinary = (toc, geomIndexOffset, range, isMobileDevice, dataSlice) => {
    let geomDatas = [];
    let offset = toc[range[0]];
    let transferables = [];
    for (let i = range[0]; i < range[1]; i++) {
        let geomReader = new BinReader(dataSlice, toc[i] - offset, isMobileDevice);
        let className = geomReader.loadStr();
        let geom;
        switch (className) {
            case 'Points':
                geom = new Points();
                break;
            case 'Lines':
                geom = new Lines();
                break;
            case 'Mesh':
                geom = new Mesh();
                break;
            default:
                throw ("Unsupported Geom type:" + className);
        }
        geom.readBinary(geomReader);

        let geomBuffers = geom.genBuffers();
        if (geomBuffers.indices)
            transferables.push(geomBuffers.indices.buffer);
        for (let name in geomBuffers.attrBuffers)
            transferables.push(geomBuffers.attrBuffers[name].values.buffer);
        geomDatas.push({
            name: geom.name,
            type: className,
            geomBuffers,
            bbox: geom.boundingBox
        });

    }

    self.postMessage({
        type: 'geomDatas',
        geomIndexOffset,
        range,
        geomDatas
    }, transferables);
    return geomDatas;
}

self.onmessage = function(event) {
    parseGeomsBinary(event.data.toc, event.data.geomIndexOffset, event.data.geomsRange, event.data.isMobileDevice, event.data.dataSlice);
}
