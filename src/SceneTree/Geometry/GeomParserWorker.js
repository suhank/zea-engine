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


let parseGeomsBinary = (toc, geomIndexOffset, geomsRange, isMobileDevice, dataSlice) => {
    let geomDatas = [];
    let offset = toc[geomsRange[0]];
    // console.log("offset:" +  offset);
    let transferables = [];
    for (let i = geomsRange[0]; i < geomsRange[1]; i++) {
        let geomReader = new BinReader(dataSlice, toc[i] - offset, isMobileDevice);
        let className = geomReader.loadStr();
        // console.log(i + ":" + offset + ".className:" +  className + " pos:" + (toc[i] - offset) + " dataSlice.byteLength:" +  dataSlice.byteLength);
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
        geomsRange,
        geomDatas
    }, transferables);
}

self.onmessage = function(event) {
    parseGeomsBinary(event.data.toc, event.data.geomIndexOffset, event.data.geomsRange, event.data.isMobileDevice, event.data.dataSlice);
}
