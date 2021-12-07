function checkStatus(response: any) {
  if (!response.ok) {
    return false
  }

  return response
}

/**
 * Text loader plugin.
 */
class TextLoaderPlugin {
  resourceLoader: any
  init(resourceLoader: any) {
    this.resourceLoader = resourceLoader
  }

  /**
   * The type of file this plugin handles.
   * @return The type of file.
   */
  getType() {
    return 'text'
  }

  loadFile(url: string) {
    this.resourceLoader.incrementWorkload(1)

    const promise = new Promise((resolve, reject) => {
      fetch(url).then((response) => {
        this.resourceLoader.incrementWorkDone(1)
        if (checkStatus(response)) resolve(response.text())
        else reject(`loadText: ${response.status} - ${response.statusText} : ${url}`)
      })
    })

    return promise
  }
}

export { TextLoaderPlugin }
