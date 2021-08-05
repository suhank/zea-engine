const getFileFolder = function (filePath: string) {
  return filePath.substring(0, filePath.lastIndexOf('/')) + '/'
}

const loadFile = function (url: string, responseType: any, onSucceed: any, onFail: any, onProgress: any) {
  try {
    const xhr = new XMLHttpRequest()
    xhr.responseType = responseType
    xhr.addEventListener('timeout', function (event) {
      throw new Error('The request for ' + url + ' timed out.')
    })
    xhr.addEventListener('error', function (event) {
      throw new Error('The request for ' + url + ': xhr.readyState:' + xhr.readyState)
      onFail(xhr.statusText)
    })
    xhr.addEventListener('abort', function (event) {
      throw new Error('The request for ' + url + ': xhr.readyState:' + xhr.readyState)
      onFail(xhr.statusText)
    })
    xhr.addEventListener('loadend', function (event) {
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
    (total: any, loaded: any) => {
      if (onProgress != undefined) onProgress(total, loaded)
    }
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
    (total: any, loaded: any) => {
      if (onProgress != undefined) onProgress(total, loaded)
    }
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
    (total: any, loaded: any) => {
      if (onProgress != undefined) onProgress(total, loaded)
    }
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
    (total: any, loaded: any) => {
      if (onProgress != undefined) onProgress(total, loaded)
    }
  )
}

export { getFileFolder, loadTextfile, loadJSONfile, loadXMLfile, loadBinfile }
