const getFileFolder = function (filePath: string) {
  return filePath.substring(0, filePath.lastIndexOf('/')) + '/'
}

const loadFile = function (
  url: string,
  responseType: XMLHttpRequestResponseType,
  onSucceed: (xhr: XMLHttpRequest) => void,
  onFail: (statusTest: string) => void,
  onProgress: (total: number, loaded: number) => void = undefined
) {
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

const loadTextfile = function (
  url: string,
  onSucceed: (result: string) => void,
  onFail: (statusTest: string) => void = undefined,
  onProgress: (total: number, loaded: number) => void = undefined
) {
  loadFile(
    url,
    'text',
    (xhr: XMLHttpRequest) => {
      onSucceed(xhr.responseText)
    },
    (statusText: string) => {
      if (onFail != undefined) onFail(statusText)
      else {
        throw new Error('Unable to XHR File:' + url)
      }
    },
    onProgress
  )
}

const loadJSONfile = function (
  url: string,
  onSucceed: (result: object, xhr: XMLHttpRequest) => void,
  onFail: (statusTest: string) => void = undefined,
  onProgress: (total: number, loaded: number) => void = undefined
) {
  loadFile(
    url,
    'json',
    (xhr: XMLHttpRequest) => {
      onSucceed(xhr.response, xhr)
    },
    (statusText: string) => {
      if (onFail != undefined) onFail(statusText)
      else {
        throw new Error('Unable to XHR File:' + url)
      }
    },
    onProgress
  )
}

const loadXMLfile = function (
  url: string,
  onSucceed: (result: Document) => void,
  onFail: (statusTest: string) => void = undefined,
  onProgress: (total: number, loaded: number) => void = undefined
) {
  loadFile(
    url,
    'document',
    (xhr: XMLHttpRequest) => {
      onSucceed(xhr.responseXML)
    },
    (statusText: string) => {
      if (onFail != undefined) onFail(statusText)
      else {
        throw new Error('Unable to XHR File:' + url)
      }
    },
    onProgress
  )
}

const loadBinfile = function (
  url: string,
  onSucceed: (result: ArrayBuffer) => void,
  onFail: (statusTest: string) => void = undefined,
  onProgress: (total: number, loaded: number) => void = undefined
) {
  loadFile(
    url,
    'arraybuffer',
    (xhr: XMLHttpRequest) => {
      onSucceed(xhr.response)
    },
    (statusText: string) => {
      if (onFail != undefined) onFail(statusText)
      else {
        throw new Error('Unable to XHR File:' + url)
      }
    },
    onProgress
  )
}

export { getFileFolder, loadTextfile, loadJSONfile, loadXMLfile, loadBinfile }
