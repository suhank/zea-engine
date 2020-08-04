/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
import { EventEmitter } from '../Utilities/index'

// const asyncLoading = true;
import ResourceLoaderWorker from 'web-worker:./ResourceLoader/ResourceLoaderWorker.js'
// For synchronous loading, uncomment these lines.
// import {
//     ResourceLoaderWorker_onmessage
// } from './ResourceLoaderWorker.js';

/**
 * Class for delegating resource loading, enabling an abstraction of a cloud file system to be implemented.
 *
 * **Events**
 * * **loaded:** emitted when a file has finished loading
 * * **progressIncremented:** emitted when a loading of processing task has been incremented
 * * **allResourcesLoaded:** emitted when all outstanding resources are loaded. This event can be used to signal the completion of load.
 */
class ResourceLoader extends EventEmitter {
  /**
   * Create a resource loader.
   */
  constructor() {
    super()
    this.__adaptor = undefined
    this.__totalWork = 0
    this.__doneWork = 0
    this.__callbacks = {}

    this.__workers = []
    this.__nextWorker = 0

    let baseUrl
    if (globalThis.navigator) {
      const scripts = document.getElementsByTagName('script')
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i]
        if (script.src.includes('zea-engine')) {
          const parts = script.src.split('/')
          parts.pop()
          parts.pop()
          baseUrl = parts.join('/')
          break
        }
      }
      if (!baseUrl) {
        baseUrl = 'https://unpkg.com/@zeainc/zea-engine@0.1.3'
      }
      this.wasmUrl = baseUrl + '/public-resources/unpack.wasm'
    }

    if (!baseUrl) {
      baseUrl = 'https://unpkg.com/@zeainc/zea-engine@0.1.3'
    }
    this.wasmUrl = baseUrl + '/public-resources/unpack.wasm'
  }

  /**
   * The setAdaptor method.
   * @param {object} adaptor - The adaptor object.
   */
  setAdaptor(adaptor) {
    this.__adaptor = adaptor
  }

  /**
   * The getAdaptor method.
   * @return {object} - The adaptor object.
   */
  getAdaptor() {
    return this.__adaptor
  }

  // /////////////////////////////////////////////////
  // Workers

  /**
   * The __getWorker method.
   * @return {any} - The return value.
   * @private
   */
  __getWorker() {
    const __constructWorker = () => {
      return new Promise((resolve) => {
        const worker = new ResourceLoaderWorker()
        // const worker = new Worker(this.__resourceLoaderFile.url);

        worker.postMessage({
          type: 'init',
          wasmUrl: this.wasmUrl,
        })
        worker.onmessage = (event) => {
          if (event.data.type === 'WASM_LOADED') {
            resolve(worker)
          } else if (event.data.type === 'FINISHED') {
            const data = event.data

            // const text = [
            //   '==================== ResourceLoaderWorker.js ====================',
            //   `Filename: ${data.resourceId}`,
            //   '------------------------------------------------------',
            // ];
            // for(const file in data.entries) {
            //   text.push(`${file}:${data.entries[file].byteLength}`);
            // }
            // console.log(text.join('\n'))

            this.addWorkDone(event.data.resourceId, 1) // loading done...
            this.__onFinishedReceiveFileData(event.data)
          } else if (event.data.type === 'ERROR') {
            const data = event.data
            console.error('Unable to load Resource:', data.resourceId, ' With url:', data.url)
          }
        }
      })
    }

    this.__nextWorker = (this.__nextWorker + 1) % 3
    if (this.__workers[this.__nextWorker] == undefined) this.__workers[this.__nextWorker] = __constructWorker()
    return this.__workers[this.__nextWorker]
  }

  /**
   * The __terminateWorkers value.
   * @private
   */
  __terminateWorkers() {
    for (const worker of this.__workers) worker.terminate()
    this.__workers = []
  }

  // /////////////////////////////////////////////////
  // URLS

  /**
   * Given some value, which could be an IR or a path, return the unique identifier.
   * @param {string} value - The file value.
   * @param {string} key - The key value.
   * @return {string} - The resolved fileId if an adaptor is installed, else the original value.
   */
  resolveFileId(value, key = undefined) {
    if (this.__adaptor) return this.__adaptor.resolveFileId(value, key)
    return value
  }

  /**
   * The resolveFilename method.
   * @deprecated
   * @param {string} value - The file value.
   * @param {string} key - The key value.
   * @return {string} - The resolved URL if an adaptor is installed, else the original value.
   */
  resolveFilename(value, key = undefined) {
    if (this.__adaptor) return this.__adaptor.resolveFilename(value, key)
    const filename = value.split(value.lastIndexOf('/'))[1]
    return filename
  }

  /**
   * The resolveURL method.
   * @deprecated
   * @param {string} value - The file value.
   * @param {string} key - The key value.
   * @return {string} - The resolved URL if an adaptor is installed, else the original value.
   */
  resolveURL(value, key = undefined) {
    if (this.__adaptor) return this.__adaptor.resolveURL(value, key)
    return value
  }

  /**
   * The loadURL method.
   * @param {string} resourceId - The resourceId value.
   * @param {string} url - The url value.
   * @param {function} callback - The callback value.
   * @param {boolean} addLoadWork - The addLoadWork value.
   * @return {any} - The return value.
   * @deprecated
   * @private
   */
  loadURL(resourceId, url, callback, addLoadWork = true) {
    console.warn('Please call loadUrl instead,')
    return this.loadUrl(resourceId, url, callback, addLoadWork)
  }

  /**
   * The loadUrl method.
   * @param {string} resourceId - The resourceId value.
   * @param {string} url - The url value.
   * @param {function} callback - The callback value.
   * @param {boolean} addLoadWork - The addLoadWork value.
   */
  loadUrl(resourceId, url, callback, addLoadWork = true) {
    if (addLoadWork) {
      this.addWork(resourceId, 3) // Add work in 2 chunks. Loading, unpacking, parsing.
    } else {
      // the work for loading and parsing the work is already registered..
      // See BinAsset. It knows that it will load a sequence of files
      // and has already registered this work once is determined the
      // total number of files in the stream.
    }

    if (!(resourceId in this.__callbacks)) this.__callbacks[resourceId] = []
    this.__callbacks[resourceId].push(callback)

    function checkStatus(response) {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`)
      }
      return response
    }
    fetch(url)
      .then((response) => checkStatus(response) && response.arrayBuffer())
      .then((buffer) => {
        this.__getWorker().then((worker) => {
          worker.postMessage({
            type: 'unpack',
            resourceId,
            buffer,
          })
        })
      })
  }

  /**
   * The __onFinishedReceiveFileData method.
   * @param {object} fileData - The fileData value.
   * @private
   */
  __onFinishedReceiveFileData(fileData) {
    const resourceId = fileData.resourceId
    this.addWorkDone(resourceId, 1) // unpacking done...
    const callbacks = this.__callbacks[resourceId]
    if (callbacks) {
      for (const callback of callbacks) {
        callback(fileData.entries)
      }
      delete this.__callbacks[resourceId]
    }
    this.emit('loaded', { resourceId })
    this.addWorkDone(resourceId, 1) // parsing done...
  }

  // /////////////////////////////////////////////////
  // Work

  /**
   * Add work to the total work pile.. We never know how big the pile will get.
   *
   * @param {string} resourceId - The resourceId value.
   * @param {number} amount - The amount value.
   */
  addWork(resourceId, amount) {
    this.__totalWork += amount
    const percent = (this.__doneWork / this.__totalWork) * 100
    this.emit('progressIncremented', { percent })
  }

  /**
   * Add work to the 'done' pile. The done pile should eventually match the total pile.
   *
   * @param {string} resourceId - The resourceId value.
   * @param {number} amount - The amount value.
   */
  addWorkDone(resourceId, amount) {
    this.__doneWork += amount

    const percent = (this.__doneWork / this.__totalWork) * 100
    this.emit('progressIncremented', { percent })
    if (this.__doneWork > this.__totalWork) {
      throw new Error('Mismatch between work loaded and work done.')
    }
    if (this.__doneWork == this.__totalWork) {
      this.emit('allResourcesLoaded', {})
    }
  }
}

const resourceLoader = new ResourceLoader()
export { resourceLoader }
