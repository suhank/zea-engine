import { SystemDesc } from '../SystemDesc'
import { BinReader } from './BinReader'
import { PointsProxy, LinesProxy, MeshProxy } from './Geometry/GeomProxies'
import { EventEmitter } from '../Utilities/index'
import { resourceLoader } from './resourceLoader'

// The GeomLibrary parses geometry data using workers.
// This can be difficult to debug, so you can disable this
// by setting the following boolean to false, and uncommenting
// the import of parseGeomsBinary
const multiThreadParsing = true
// @ts-ignore
import GeomParserWorker from 'web-worker:./Geometry/GeomParserWorker'
import { parseGeomsBinary } from './Geometry/parseGeomsBinary'
import { StreamFileParsedEvent } from '../Utilities/Events/StreamFileParsedEvent'
import { RangeLoadedEvent } from '../Utilities/Events/RangeLoadedEvent'

const isMobile = SystemDesc.isMobileDevice
let numCores = window.navigator.hardwareConcurrency
if (!numCores) {
  if (isMobile) numCores = 4
  else numCores = 6
}
numCores-- // always leave one main thread code spare.
let workerId = 0
const workers: any[] = []
const listeners: any[] = []

const getWorker = (geomLibraryId: any, fn: any) => {
  const __workerId = workerId
  if (!workers[__workerId]) {
    listeners[__workerId] = {}
    const worker = new GeomParserWorker()
    worker.onmessage = (event: Record<any, any>) => {
      const data = event.data
      listeners[__workerId][data.geomLibraryId](data)
    }
    workers[__workerId] = worker
  }
  listeners[__workerId][geomLibraryId] = fn

  const worker = workers[__workerId]
  workerId = (__workerId + 1) % numCores
  return worker
}

// import {
//     parseGeomsBinary
// } from './Geometry/parseGeomsBinary.js';

/** Class representing a geometry library.
 */
class GeomLibrary extends EventEmitter {
  protected __streamInfos: Record<any, any>
  protected __genBuffersOpts: Record<any, any>
  protected loadCount: number
  protected queue: any
  protected loadContext: any
  protected __numGeoms: number
  protected geoms: any[]
  protected basePath: string
  protected __loadedCount: number
  /**
   * Create a geom library.
   */
  constructor() {
    super()
    this.__streamInfos = {}
    this.__genBuffersOpts = {}

    this.loadCount = 0
    this.queue = []

    this.on('streamFileParsed', (event) => {
      this.loadCount--
      if (this.loadCount < numCores && this.queue.length) {
        const { geomFileID, geomsData } = this.queue.pop()
        this.readBinaryBuffer(geomFileID, geomsData.buffer, this.loadContext)
      }
    })

    this.__receiveGeomDatas = this.__receiveGeomDatas.bind(this)
    // if (multiThreadParsing) {
    //   for (let i = 0; i < numCores; i++) {
    //     if (!workers[i]) {

    //   // this.__receiveGeomDatas(event.data.key, event.data.geomDatas, event.data.geomIndexOffset, event.data.geomsRange)
    //       this.__constructWorker()
    //     }
    //   }
    // }

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
   * @param {boolean} incrementProgress - If true, the progress bar is incremented and decremented.
   * @return {Promise} the promise resolves once the file is loaded, but not parsed.
   */
  loadGeomFile(geomFileID: number, incrementProgress = false) {
    if (incrementProgress) resourceLoader.incrementWorkload(1)
    const promise = new Promise((resolve) => {
      const geomFileUrl = this.basePath + geomFileID + '.zgeoms'

      resourceLoader.loadFile('archive', geomFileUrl).then((entries: any) => {
        const geomsData = entries[Object.keys(entries)[0]]

        const streamFileParsed = (event: any) => {
          if (event.geomFileID == geomFileID) {
            resourceLoader.incrementWorkDone(1)
            this.off('streamFileParsed', streamFileParsed)
            resolve(promise)
          }
        }
        this.on('streamFileParsed', streamFileParsed)

        if (this.loadCount < numCores) {
          this.loadCount++
          this.readBinaryBuffer(geomFileID, geomsData.buffer, this.loadContext)
        } else {
          this.queue.splice(0, 0, {
            geomFileID,
            geomsData,
          })
        }
      })
    })
  }

  /**
   * Loads the geometry files for this GeomLibrary.
   * @param {Record<any,any>} geomLibraryJSON - The json data describing the data needed to be loaded by the geom library
   * @param {string} basePath - The base path of the file. (this is theURL of the zcad file without its extension.)
   * @param {Record<any,any>} context - The value param.
   */
  loadGeomFilesStream(geomLibraryJSON: Record<any, any>, basePath: string, context: Record<any, any>) {
    const numGeomFiles = geomLibraryJSON.numGeomsPerFile.length
    resourceLoader.incrementWorkload(numGeomFiles)

    this.__numGeoms = geomLibraryJSON.numGeoms
    this.basePath = basePath
    this.loadContext = context

    for (let geomFileID = 0; geomFileID < numGeomFiles; geomFileID++) {
      this.loadGeomFile(geomFileID, false)
    }
  }

  /**
   * The setGenBufferOption method.
   * @param {string} key - The key value.
   * @param {any} value - The value param.
   */
  setGenBufferOption(key: string, value: any) {
    this.__genBuffersOpts[key] = value
  }

  /**
   * The setNumGeoms method.
   * @param {any} expectedNumGeoms - The expectedNumGeoms value.
   */
  setNumGeoms(expectedNumGeoms: any) {
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
  getGeom(index: number) {
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
  loadArchive(fileUrl: any) {
    resourceLoader.loadArchive(fileUrl).then((entries: any) => {
      this.loadBin(entries)
    })
  }

  /**
   * The readBinaryBuffer method.
   * @param {number} geomFileID - The key value.
   * @param {Buffer} buffer - The buffer value.
   * @param {Record<any,any>} context - The context value.
   * @return {any} - The return value.
   */
  readBinaryBuffer(geomFileID: any, buffer: Buffer, context: Record<any, any>) {
    const reader = new BinReader(buffer, 0, isMobile)
    const numGeoms = reader.loadUInt32()

    // Geoms within a given file are offset into the array of geometries of the library.
    // Note: One day, the geom library should already know all the offsets for each file before loading.
    const geomIndexOffset = reader.loadUInt32()
    this.__streamInfos[geomFileID] = {
      total: numGeoms,
      done: 0,
    }

    if (numGeoms == 0) {
      const event = new StreamFileParsedEvent(geomFileID, 0)
      this.emit('streamFileParsed', event)

      return numGeoms
    }
    if (this.__numGeoms == -1) {
      // Note: for loading geom streams, we need to know the total number
      // ahead of time to be able to generate accurate progress reports.
      this.__numGeoms = numGeoms
      // throw("Loading cannot start will we know how many geoms.");
    }

    const toc = reader.loadUInt32Array(numGeoms)

    if (multiThreadParsing) {
      let numCores = window.navigator.hardwareConcurrency
      if (!numCores) {
        if (isMobile) numCores = 2
        else numCores = 4
      }
      const numGeomsPerWorkload = Math.max(1, Math.floor(numGeoms / numCores + 1))

      // TODO: Use SharedArrayBuffer once available.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer

      let offset = 0
      while (offset < numGeoms) {
        const bufferSliceStart = toc[offset]
        let bufferSliceEnd
        let geomsRange
        if (offset + numGeomsPerWorkload >= numGeoms) {
          geomsRange = [offset, numGeoms]
          bufferSliceEnd = buffer.byteLength
        } else {
          geomsRange = [offset, offset + numGeomsPerWorkload]
          bufferSliceEnd = toc[geomsRange[1]]
        }
        const bufferSlice = buffer.slice(bufferSliceStart, bufferSliceEnd)
        offset += numGeomsPerWorkload

        // ////////////////////////////////////////////
        // Multi Threaded Parsing
        getWorker(this.getId(), this.__receiveGeomDatas).postMessage(
          {
            geomLibraryId: this.getId(),
            geomFileID,
            toc,
            geomIndexOffset,
            geomsRange,
            isMobileDevice: reader.isMobileDevice,
            bufferSlice,
            genBuffersOpts: this.__genBuffersOpts,
            context: {
              versions: context.versions,
            },
          },
          [bufferSlice]
        )
      }

      // ////////////////////////////////////////////
      // Multi Threaded Parsing
      // const bufferSlice = buffer.slice(toc[0], buffer.byteLength)
      // this.__workers[this.__nextWorker].postMessage(
      //   {
      //     key,
      //     toc,
      //     geomIndexOffset,
      //     geomsRange: [0, numGeoms],
      //     isMobileDevice: reader.isMobileDevice,
      //     bufferSlice,
      //     genBuffersOpts: this.__genBuffersOpts,
      //     context: {
      //       versions: context.versions,
      //     },
      //   },
      //   [bufferSlice]
      // )
      // this.__nextWorker = (this.__nextWorker + 1) % this.__workers.length
    } else {
      // ////////////////////////////////////////////
      // Main Threaded Parsing
      const bufferSlice = buffer.slice(toc[0], buffer.byteLength)
      const geomsRange = [0, numGeoms]
      // const geomsRange = [3, 4]
      // const bufferSlice = buffer.slice(toc[3], toc[4])
      parseGeomsBinary(
        {
          geomFileID,
          toc,
          geomIndexOffset,
          geomsRange,
          isMobileDevice: reader.isMobileDevice,
          bufferSlice,
          genBuffersOpts: this.__genBuffersOpts,
          context,
        },
        (data: any) => {
          this.__receiveGeomDatas(data)
        }
      )
    }
  }

  /**
   * The __receiveGeomDatas method.
   * @param {any} data - The data received back from the web worker
   * @private
   */
  __receiveGeomDatas(data: any) {
    const { geomLibraryId, geomFileID, geomDatas, geomIndexOffset, geomsRange } = data
    if (geomLibraryId != this.getId()) throw new Error('Receiving workload for a different GeomLibrary')
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
          throw new Error('Unsupported Geom type:')
      }
      this.geoms[offset + i] = proxy
    }
    const event = new RangeLoadedEvent(storedRange)
    this.emit('rangeLoaded', event)

    const loaded = storedRange[1] - storedRange[0]
    // console.log("GeomLibrary Loaded:" + loaded);

    // Each file in the stream has its own counter for the number of
    // geoms, and once each stream file finishes parsing, we fire a signal.
    const streamInfo = this.__streamInfos[geomFileID]
    streamInfo.done += loaded
    // console.log('__receiveGeomDatas:', geomFileID + ' Loaded:' + streamInfo.done + ' of :' + streamInfo.total)
    if (streamInfo.done == streamInfo.total) {
      const event = new StreamFileParsedEvent(geomFileID, streamInfo.done) // TODO: done returns an 'any' type
      this.emit('streamFileParsed', event)
    }

    // Once all the geoms from all the files are loaded and parsed
    // fire the loaded signal.
    this.__loadedCount += loaded
    // console.log("this.__loadedCount:" + this.__loadedCount +" this.__numGeoms:" + this.__numGeoms);
    if (this.__loadedCount == this.__numGeoms) {
      // console.log("GeomLibrary Loaded:" + this.__name + " count:" + geomDatas.length + " loaded:" + this.__loadedCount);
      this.emit('loaded')
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method encodes this type as a json object for persistence.
   * @return {object} - Returns the json object.
   */
  toJSON() {
    return {
      numGeoms: this.geoms.length,
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