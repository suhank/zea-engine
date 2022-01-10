function checkStatus(response: any) {
  if (!response.ok) {
    return false
  }

  return response
}

/**
 * JSON loader plugin.
 */
class JsonLoaderPlugin {
  resourceLoader: any
  init(resourceLoader: any): void {
    this.resourceLoader = resourceLoader
  }

  /**
   * The type of file this plugin handles.
   * @return The type of file.
   */
  getType(): string {
    return 'json'
  }

  loadFile(url: string): Promise<unknown> {
    this.resourceLoader.incrementWorkload(1)

    const promise = new Promise(
      (resolve, reject) => {
        fetch(url).then((response) => {
          this.resourceLoader.incrementWorkDone(1)
          if (checkStatus(response)) resolve(response.json())
          else reject(`loadJSON: ${response.status} - ${response.statusText} : ${url}`)
        })
      }
      // () => {}
    )

    return promise
  }
}

export { JsonLoaderPlugin }
