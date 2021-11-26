import { parseGeomsBinary } from './Geometry/parseGeomsBinary';
self.onmessage = function (event) {
    parseGeomsBinary(event.data, (data, transferables) => {
        self.postMessage(data, transferables);
    });
};
const foo = {};
export default foo;
//# sourceMappingURL=GeomParser-worker.js.map