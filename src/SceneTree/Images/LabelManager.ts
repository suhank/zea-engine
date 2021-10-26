import { EventEmitter } from '../../Utilities/index'
import { loadTextfile, loadBinfile } from '../Utils'

// eslint-disable-next-line require-jsdoc
function getLanguage() {
  if (!globalThis.navigator) return 'en'

  // Check if a language is explicitly selected.
  const searchParams = new URLSearchParams(window.location.search)
  if (searchParams.has('lang')) return searchParams.get('lang')

  const nav = globalThis.navigator
  let i
  let language

  const clean = (language: string) => {
    if (language.startsWith('en')) return 'En'
    else if (language.startsWith('es')) return 'Es'
    else if (language.startsWith('fr')) return 'Fr'
    else if (language.startsWith('gb') || language.startsWith('de')) return 'Gb'
    return language
  }

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (i = 0; i < nav.languages.length; i++) {
      language = nav.languages[i]
      if (language && language.length) {
        return clean(language)
      }
    }
  }

  // support for other well known properties in browsers
  // const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage']
  // for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
  //   language = nav[browserLanguagePropertyKeys[i]]
  //   if (language && language.length) {
  //     return clean(language)
  //   }
  // }

  return null
}

/** Class representing a label manager.
 * @private
 */
class LabelManager extends EventEmitter {
  protected __language: any
  protected __foundLabelLibraries: Record<string, any>
  protected __labelLibraries: Record<string, any>
  /**
   * Create a label manager.
   */
  constructor() {
    super()
    this.__labelLibraries = {}

    this.__language = getLanguage()
    this.__foundLabelLibraries = {}
  }

  /**
   * Load a label library into the manager.
   * @param name - The name of the library.
   * @param url- The json data of of the library.
   */
  loadLibrary(name: string, url: string) {
    const stem = name.substring(0, name.lastIndexOf('.'))
    this.__foundLabelLibraries[stem] = url

    if (name.endsWith('.labels')) {
      loadTextfile(url, (text: any) => {
        this.__labelLibraries[stem] = JSON.parse(text)
        this.emit('labelLibraryLoaded', { library: stem })
      })
    } else if (name.endsWith('.xlsx')) {
      // @ts-ignore
      const XLSX = globalThis.XLSX
      // Note: example taken from here..
      // https://stackoverflow.com/questions/8238407/how-to-parse-excel-file-in-javascript-html5
      // and here:
      // https://github.com/SheetJS/js-xlsx/tree/master/demos/xhr
      loadBinfile(url, (data: any) => {
        const unit8array = new Uint8Array(data)
        // @ts-ignore
        const workbook = XLSX.read(unit8array, {
          type: 'array',
        })
        const json: { [key: string]: any } = {}
        workbook.SheetNames.forEach(function (sheetName: any) {
          // Here is your object
          // @ts-ignore
          const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {})
          // @ts-ignore
          rows.forEach(function (row: any) {
            const identifier = row.Identifier
            delete row.Identifier
            json[identifier] = row
          })
        })

        this.__labelLibraries[stem] = json
        this.emit('labelLibraryLoaded', { library: stem })
      })
    }
  }

  /**
   * Checks if the library is found.
   * @param name - The name of the library.
   * @return - Returns true if the library is found.
   */
  isLibraryFound(name: string) {
    return name in this.__foundLabelLibraries
  }

  /**
   * Checks if the library is loaded.
   * @param name - The name of the library.
   * @return - Returns true if the library is loaded.
   */
  isLibraryLoaded(name: string) {
    return name in this.__labelLibraries
  }

  /**
   * The getLabelText method.
   * @param libraryName - The name of the library.
   * @param labelName - The name of the label.
   * @return - The return value.
   */
  getLabelText(libraryName: string, labelName: string) {
    const library = this.__labelLibraries[libraryName]
    if (!library) {
      throw new Error(
        "LabelLibrary: '" +
          libraryName +
          "' not found in LabelManager. Found: [" +
          Object.keys(this.__labelLibraries) +
          ']'
      )
    }
    const label = library[labelName]
    if (!label) {
      throw new Error(
        "Label: '" +
          labelName +
          "' not found in LabelLibrary: '" +
          libraryName +
          "'. Found: [" +
          Object.keys(library) +
          ']'
      )
    }
    const labelText = label[this.__language]
    if (!labelText) {
      if (label['En']) return label['En']
      throw new Error("labelText: '" + this.__language + "' not found in Label. Found: [" + Object.keys(label) + ']')
    }
    return labelText
  }

  /**
   * The setLabelText method.
   * @param libraryName - The name of the library.
   * @param labelName - The name of the label.
   * @param labelText - The text of the label.
   */
  setLabelText(libraryName: string, labelName: string, labelText: string) {
    let library = this.__labelLibraries[libraryName]
    if (!library) {
      library = {}
      this.__labelLibraries[libraryName] = library
    }
    let label = library[labelName]
    if (!label) {
      label = {}
      library[labelName] = label
    }
    label[this.__language] = labelText
    // TODO: Push to server.
  }

  setLanguage(ln: any) {
    this.__language = ln
  }
}

const labelManager = new LabelManager()

export { LabelManager, labelManager }
