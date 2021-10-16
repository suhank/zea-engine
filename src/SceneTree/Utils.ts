const getFileFolder = function (filePath: string) {
  return filePath.substring(0, filePath.lastIndexOf('/')) + '/'
}

const loadFile = function (url: string, responseType: any, onSucceed: any, onFail: any, onProgress: any = undefined) {
  try {
    const xhr = new XMLHttpRequest()
    xhr.responseType = responseType
    xhr.addEventListener('timeout', (event) => {
      throw new Error('The request for ' + url + ' timed out.')
    })
    xhr.addEventListener('error', (event) => {
      throw new Error('The request for ' + url + ': xhr.readyState:' + xhr.readyState)
      onFail(xhr.statusText)
    })
    xhr.addEventListener('abort', (event) => {
      throw new Error('The request for ' + url + ': xhr.readyState:' + xhr.readyState)
      onFail(xhr.statusText)
    })
    xhr.addEventListener('progress', (event) => {
      if (onProgress) onProgress(event.total, event.loaded)
    })
    xhr.addEventListener('loadend', (event) => {
      if (xhr.status == 200) onSucceed(xhr)
      else onFail(xhr.statusText)
    })
    xhr.open('GET', url, true)
    xhr.send()
    // xhr.open();
  } catch (err) {
    onFail(err)
  }
}

const loadTextfile = function (url: string, onSucceed: any, onFail: any = undefined, onProgress: any = undefined) {
  loadFile(
    url,
    'text',
    (xhr: any) => {
      onSucceed(xhr.responseText)
    },
    (statusText: any) => {
      if (onFail != undefined) onFail(statusText)
      else {
        throw new Error('Unable to XHR File:' + url)
      }
    },
    onProgress
  )
}

const loadJSONfile = function (url: any, onSucceed: any, onFail: any = undefined, onProgress: any = undefined) {
  loadFile(
    url,
    'json',
    (xhr: any) => {
      onSucceed(xhr.response, xhr)
    },
    (statusText: any) => {
      if (onFail != undefined) onFail(statusText)
      else {
        throw new Error('Unable to XHR File:' + url)
      }
    },
    onProgress
  )
}

const loadXMLfile = function (url: any, onSucceed: any, onFail: any = undefined, onProgress: any = undefined) {
  loadFile(
    url,
    'document',
    (xhr: any) => {
      onSucceed(xhr.responseXML)
    },
    (statusText: any) => {
      if (onFail != undefined) onFail(statusText)
      else {
        throw new Error('Unable to XHR File:' + url)
      }
    },
    onProgress
  )
}

const loadBinfile = function (url: any, onSucceed: any, onFail: any = undefined, onProgress: any = undefined) {
  loadFile(
    url,
    'arraybuffer',
    (xhr: any) => {
      onSucceed(xhr.response)
    },
    (statusText: any) => {
      if (onFail != undefined) onFail(statusText)
      else {
        throw new Error('Unable to XHR File:' + url)
      }
    },
    onProgress
  )
}

export { getFileFolder, loadTextfile, loadJSONfile, loadXMLfile, loadBinfile }
