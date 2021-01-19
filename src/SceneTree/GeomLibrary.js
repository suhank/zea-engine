import { SystemDesc } from '../SystemDesc.js'
import { BinReader } from './BinReader.js'
import { loadBinfile } from './Utils.js'
import { PointsProxy, LinesProxy, MeshProxy } from './Geometry/GeomProxies.js'
import { EventEmitter } from '../Utilities/index'
import { resourceLoader } from './resourceLoader.js'

// The GeomLibrary parses geometry data using workers.
// This can be difficult to debug, so you can disable this
// by setting the following boolean to false, and uncommenting
// the import of parseGeomsBinary
const multiThreadParsing = true

import GeomParserWorker from 'web-worker:./Geometry/GeomParserWorker.js'

// import {
//     parseGeomsBinary
// } from './Geometry/parseGeomsBinary.js';

/** Class representing a geometry library.
 */
class GeomLibrary extends EventEmitter {
  /**
   * Create a geom library.
   */
  constructor() {
    super()
    this.__streamInfos = {}
    this.__genBuffersOpts = {}

    this.__workers = []
    this.__nextWorker = 0

    this.numCores = window.navigator.hardwareConcurrency
    if (!this.numCores) {
      if (isMobile) this.numCores = 4
      else this.numCores = 6
    }
    this.numCores-- // always leave one main thread code spare.

    this.loadCount = 0
    this.queue = []

    this.on('streamFileParsed', (event) => {
      this.loadCount--
      if (this.loadCount < this.numCores && this.queue.length) {
        const { geomFileID, geomsData } = this.queue.pop()
        this.readBinaryBuffer(geomFileID, geomsData.buffer, this.loadContext)
      }
    })

    if (multiThreadParsing) {
      for (let i = 0; i < 3; i++) {
        this.__workers.push(this.__constructWorker())
      }
    }

    this.clear()
  }

  /**
   * The clear method.
   */
  clear() {
    this.__loadedCount = 0
    this.__numGeoms = -1
    this.geoms = []
  }

  /**
   * The returns true if all the geometries have been loaded and the loaded event has already been emitted.
   * @return {Boolean} - True if all geometries are already loaded, else false.
   */
  isLoaded() {
    return this.__loadedCount == this.__numGeoms
  }

  /**
   * Loads a single geometry file for this GeomLibrary.
   *
   * @private
   *
   * @param {number} geomFileID - The index of the file to load
   * @param {boolean} addWork - If true, the progress bar is incremented and decremented.
   * @returns {Promise} the promise resoolves once the file is loaded, but not parsed.
   */
  loadGeomFile(geomFileID, addWork = false) {
    if (addWork) resourceLoader.addWork('GeomLibrary', 1)
    return new Promise((resolve) => {
      const geomFileUrl = this.basePath + geomFileID + '.zgeoms'

      resourceLoader.loadFile('archive', geomFileUrl).then((entries) => {
        const geomsData = entries[Object.keys(entries)[0]]

        if (this.loadCount < this.numCores) {
          this.loadCount++
          this.readBinaryBuffer(geomFileID, geomsData.buffer, this.loadContext)
        } else {
          this.queue.splice(0, 0, {
            geomFileID,
            geomsData,
          })
        }

        const streamFileParsed = (event) => {
          if (event.key == geomFileID) {
            resourceLoader.addWorkDone('GeomLibrary', 1)
            this.off('streamFileParsed', streamFileParsed)
            resolve()
          }
        }
        this.on('streamFileParsed', streamFileParsed)
      })
    })
  }

  /**
   * Loads the geometry files for this GeomLibrary.
   * @param {string} basePath - The base path of the file. (this is theURL of the zcad file without its extension.)
   * @param {number} numGeomFiles - The number of geom files to load in the stream
   * @param {object} context - The value param.
   */
  loadGeomFilesStream(basePath, numGeoms, numGeomFiles, context) {
    resourceLoader.addWork('GeomLibrary', numGeomFiles)

    this.__numGeoms = numGeoms
    this.basePath = basePath
    this.loadContext = context

    for (let geomFileID = 0; geomFileID < numGeomFiles; geomFileID++) {
      this.loadGeomFile(geomFileID, false)
    }
  }

  /**
   * The __constructWorker method.
   * @return {GeomParserWorker} - Returns a GeomParserWorker.
   * @private
   */
  __constructWorker() {
    const worker = new GeomParserWorker()
    worker.onmessage = (event) => {
      this.__recieveGeomDatas(event.data.key, event.data.geomDatas, event.data.geomIndexOffset, event.data.geomsRange)
    }
    return worker
  }

  /**
   * The __terminateWorkers method.
   * @private
   */
  __terminateWorkers() {
    for (const worker of this.__workers) worker.terminate()
    this.__workers = []
  }

  /**
   * The setGenBufferOption method.
   * @param {any} key - The key value.
   * @param {any} value - The value param.
   */
  setGenBufferOption(key, value) {
    this.__genBuffersOpts[key] = value
  }

  /**
   * The setNumGeoms method.
   * @param {any} expectedNumGeoms - The expectedNumGeoms value.
   */
  setNumGeoms(expectedNumGeoms) {
    this.__numGeoms = expectedNumGeoms
  }

  /**
   * Returns the number of geometries the GeomLibrary has, or will have at the end of loading.
   * @return {number} - The number of geometries.
   */
  getNumGeoms() {
    return this.__numGeoms
  }

  /**
   * The getGeom method.
   * @param {number} index - The index value.
   * @return {BaseGeom} - The stored geometry
   */
  getGeom(index) {
    if (index >= this.geoms.length) {
      // console.warn("Geom index invalid:" + index);
      return null
    }
    return this.geoms[index]
  }

  /**
   * The loadArchive method.
   * @param {any} fileUrl - The fileUrl value.
   */
  loadArchive(fileUrl) {
    resourceLoader.loadArchive(fileUrl).then((entries) => {
      this.loadBin(entries)
    })
  }

  /**
   * The readBinaryBuffer method.
   * @param {any} key - The key value.
   * @param {ArrayBuffer} buffer - The buffer value.
   * @param {object} context - The context value.
   * @return {any} - The return value.
   */
  readBinaryBuffer(key, buffer, context) {
    const isMobile = SystemDesc.isMobileDevice
    const reader = new BinReader(buffer, 0, isMobile)
    const numGeoms = reader.loadUInt32()

    // Geoms within a given file are offset into the array of geometries of the library.
    // Note: One day, the geom lirbary should already know all the offsets for each file before loading.
    const geomIndexOffset = reader.loadUInt32()
    this.__streamInfos[key] = {
      total: numGeoms,
      done: 0,
    }

    if (numGeoms == 0) {
      this.emit('streamFileParsed', { key, geomCount: 0 })
      return numGeoms
    }
    if (this.__numGeoms == -1) {
      // Note: for loading geom streams, we need to know the total number
      // ahead of time to be able to generate accurate progress reports.
      this.__numGeoms = numGeoms
      // throw("Loading cannot start will we know how many geomms.");
    }

    const toc = reader.loadUInt32Array(numGeoms)

    if (multiThreadParsing) {
      const bufferSlice = buffer.slice(toc[0], buffer.byteLength)
      // ////////////////////////////////////////////
      // Multi Threaded Parsing
      this.__workers[this.__nextWorker].postMessage(
        {
          key,
          toc,
          geomIndexOffset,
          geomsRange: [0, numGeoms],
          isMobileDevice: reader.isMobileDevice,
          bufferSlice,
          genBuffersOpts: this.__genBuffersOpts,
          context: {
            versions: context.versions,
          },
        },
        [bufferSlice]
      )
      this.__nextWorker = (this.__nextWorker + 1) % this.__workers.length
      return numGeoms
    } else {
      // ////////////////////////////////////////////
      // Main Threaded Parsing
      const bufferSlice = buffer.slice(toc[0], buffer.byteLength)
      const geomsRange = [0, numGeoms]
      // const geomsRange = [3, 4]
      // const bufferSlice = buffer.slice(toc[3], toc[4])
      parseGeomsBinary(
        {
          key,
          toc,
          geomIndexOffset,
          geomsRange,
          isMobileDevice: reader.isMobileDevice,
          bufferSlice,
          genBuffersOpts: this.__genBuffersOpts,
          context,
        },
        (data, transferables) => {
          this.__recieveGeomDatas(data.key, data.geomDatas, data.geomIndexOffset, data.geomsRange)
        }
      )
    }
    return numGeoms
  }

  /**
   * The __recieveGeomDatas method.
   * @param {any} key - The key value.
   * @param {any} geomDatas - The geomDatas value.
   * @param {any} geomIndexOffset - The offset of the file geoms in the asset.
   * @param {any} geomsRange - The range of geoms in the bin file.
   * @private
   */
  __recieveGeomDatas(key, geomDatas, geomIndexOffset, geomsRange) {
    // We are storing a subset of the geoms from a binary file
    // which is a subset of the geoms in an asset.
    // geomIndexOffset: the offset of the file geoms in the asset.
    // geomsRange: the range of geoms in the bin file.
    const offset = geomIndexOffset + geomsRange[0]
    const storedRange = [offset, geomIndexOffset + geomsRange[1]]

    for (let i = 0; i < geomDatas.length; i++) {
      const geomData = geomDatas[i]
      if (!geomData.type) continue
      let proxy
      switch (geomData.type) {
        case 'Points':
          proxy = new PointsProxy(geomData)
          break
        case 'Lines':
          proxy = new LinesProxy(geomData)
          break
        case 'Mesh':
        case 'Plane': // TODO: Support procedural shape params
        case 'Sphere':
        case 'Cone':
          proxy = new MeshProxy(geomData)
          break
        default:
          throw new Error('Unsupported Geom type:' + className)
      }
      this.geoms[offset + i] = proxy
    }
    this.emit('rangeLoaded', { range: storedRange })

    const loaded = storedRange[1] - storedRange[0]
    // console.log("GeomLibrary Loaded:" + loaded);

    // Each file in the stream has its own counter for the number of
    // geoms, and once each stream file finishes parsing, we fire a signal.
    const streamInfo = this.__streamInfos[key]
    streamInfo.done += loaded
    // console.log(key + " Loaded:" + streamInfo.done + " of :" + streamInfo.total);
    if (streamInfo.done == streamInfo.total) {
      this.emit('streamFileParsed', { key, geomCount: streamInfo.done })
    }

    // Once all the geoms from all the files are loaded and parsed
    // fire the loaded signal.
    this.__loadedCount += loaded
    // console.log("this.__loadedCount:" + this.__loadedCount +" this.__numGeoms:" + this.__numGeoms);
    if (this.__loadedCount == this.__numGeoms) {
      // console.log("GeomLibrary Loaded:" + this.__name + " count:" + geomDatas.length + " loaded:" + this.__loadedCount);
      this.__terminateWorkers()
      this.emit('loaded')
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistences.
   * @return {object} - Returns the json object.
   */
  toJSON() {
    return {
      numGeoms: this.geoms.length(),
    }
  }

  /**
   * The toString method.
   * @return {any} - The return value.
   */
  toString() {
    return JSON.stringify(this.toJSON(), null, 2)
  }
}

export { GeomLibrary }
