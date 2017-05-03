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


let parseGeomsBinary = (data, toc, range, isMobileDevice)=>{
    let geomDatas = [];
    let offset =  toc[range[0]];
    for (let i = range[0]; i < range[1]; i++) {
        let geomReader = new BinReader(data, toc[i]-offset, isMobileDevice);
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
        geomDatas.push({
            name: geom.name,
            type: className,
            geomBuffers,
            bbox: geom.boundingBox
        });
    }
    return geomDatas;
}

onmessage = function (ev) {
  console.log(ev.data);  // prints "hi"
  postMessage("ho");     // sends "ho" back to the creator
}

export {
    parseGeomsBinary
};