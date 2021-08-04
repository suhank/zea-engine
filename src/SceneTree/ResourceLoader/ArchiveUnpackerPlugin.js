import { SystemDesc } from '../../SystemDesc.js'
import ArchiveUnpackerWorker from 'web-worker:./ArchiveUnpackerWorker.js'
// For synchronous loading, uncomment these lines.
// import {
//     ResourceLoaderWorker_onmessage
// } from './ArchiveUnpackerWorker.js';

function checkStatus(response) {
  if (!response.ok) {
    return false
  }

  return response
}

const numCores = SystemDesc.hardwareConcurrency - 1 // always leave one main thread code spare.

/**
 * Archive unpacker plugin.
 */
class ArchiveUnpackerPlugin {
  constructor() {
    this.__callbacks = {}
    this.__workers = []
    this.__nextWorker = 0
  }

  init(resourceLoader) {
    this.resourceLoader = resourceLoader
  }

  /**
   * The type of file this plugin handles.
   * @return {string} The type of file.
   */
  getType() {
    return 'archive'
  }

  /**
   * The __getWorker method.
   * @return {any} - The return value.
   * @private
   */
  __getWorker() {
    const __constructWorker = () => {
      return new Promise((resolve, reject) => {
        const worker = new ArchiveUnpackerWorker()
        // const worker = new Worker(this.__resourceLoaderFile.url);

        worker.postMessage({
          type: 'init',
        })
        worker.onmessage = (event) => {
          if (event.data.type === 'WASM_LOADED') {
            resolve(worker)
          } else if (event.data.type === 'FINISHED') {
            // const data = event.data
            // const text = [
            //   '==================== ArchiveUnpackerWorker.js ====================',
            //   `Filename: ${data.resourceId}`,
            //   '------------------------------------------------------',
            // ];
            // for(const file in data.entries) {
            //   text.push(`${file}:${data.entries[file].byteLength}`);
            // }
            // console.log(text.join('\n'))

            this.__onFinishedReceiveFileData(event.data)
          } else if (event.data.type === 'ERROR') {
            const data = event.data
            reject(new Error(`Unable to load Resource: ${data.resourceId}`))
          }
        }
      })
    }

    this.__nextWorker = (this.__nextWorker + 1) % numCores
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

  /**
   * Loads an archive file, returning a promise that resolves to the JSON data value.
   * Note: using the resource loader to centralize data loading enables progress to be tracked and displayed
   * @param {string} url - The url of the data to load.
   * @return {Promise} - The promise value.
   */
  loadFile(url) {
    this.resourceLoader.incrementWorkload(1) //  start loading.

    const promise = new Promise(
      (resolve, reject) => {
        if (!(url in this.__callbacks)) this.__callbacks[url] = []
        this.__callbacks[url].push(resolve)
        fetch(url)
          .then((response) => {
            this.resourceLoader.incrementWorkDone(1) // done loading
            if (checkStatus(response)) return response.arrayBuffer()
            else {
              reject(new Error(`loadArchive: ${response.status} - ${response.statusText} : ${url}`))
            }
          })
          .then((buffer) => {
            const resourceId = url
            if (!(resourceId in this.__callbacks)) this.__callbacks[resourceId] = []
            this.__callbacks[resourceId].push(resolve)

            this.__getWorker().then((worker) => {
              worker.postMessage({
                type: 'unpack',
                resourceId,
                buffer,
              })
            })
          })
      },
      () => {}
    )

    return promise
  }

  /**
   * The __onFinishedReceiveFileData method.
   * @param {object} fileData - The fileData value.
   * @private
   */
  __onFinishedReceiveFileData(fileData) {
    const resourceId = fileData.resourceId
    const callbacks = this.__callbacks[resourceId]
    if (callbacks) {
      for (const callback of callbacks) {
        callback(fileData.entries)
      }
      delete this.__callbacks[resourceId]
    }
  }
}

export { ArchiveUnpackerPlugin }
