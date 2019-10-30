import { Signal } from '../../Utilities'
import { ValueSetMode, ParamFlags, Parameter } from './Parameter.js'
import { resourceLoader } from '../ResourceLoader.js'

/** Class representing a file path parameter.
 * @extends Parameter
 */
class FilePathParameter extends Parameter {
  /**
   * Create a file path parameter.
   * @param {string} name - The name value.
   * @param {any} exts - The exts value.
   */
  constructor(name, exts) {
    super(name, '', 'FilePath')

    this.fileUpdated = new Signal()
    if (exts) this.setSupportedExts(exts)
  }

  /**
   * The setSupportedExts method.
   * @param {any} exts - The exts param.
   */
  setSupportedExts(exts) {
    // Note: supported Extensions should be in the format ext1|exts2|ext3
    this.__reextensions = new RegExp('\\.(' + exts + ')$', 'i')
  }

  /**
   * The getFilepath method.
   * @return {any} - The return value.
   */
  getFilepath() {
    if (this.__file) {
      return resourceLoader.getFilepath(this.__file.id)
    }
    return ''
  }

  /**
   * The setFilepath method.
   * @param {any} filePath - The filePath param.
   * @param {any} mode - The mode param.
   */
  setFilepath(filePath, mode) {
    const resourceId = resourceLoader.resolveFilePathToId(filePath)
    if (!resourceId) {
      console.warn('Resource unavailable:' + filePath)
      return
    }
    this.setValue(resourceId, mode)
  }

  /**
   * The getFilename method.
   * @return {any} - The return value.
   */
  getFilename() {
    if (this.__file) {
      return this.__file.name
    }
  }

  /**
   * The getExt method.
   * @return {any} - The return value.
   */
  getExt() {
    const filename = this.getFilename()
    const suffixSt = filename.lastIndexOf('.')
    if (suffixSt != -1) return filename.substring(suffixSt).toLowerCase()
  }

  /**
   * The getStem method.
   * @return {any} - The return value.
   */
  getStem() {
    const filename = this.getFilename()
    if (filename) {
      const parts = filename.split('.')
      if (parts.length == 2) return parts[0]
      else return filename
    }
  }

  /**
   * The getFileFolder method.
   * @return {any} - The return value.
   */
  getFileFolder() {
    if (this.__file) {
      if (this.__file.parent) return resourceLoader.getFile(this.__file.parent)
      return resourceLoader.getRootFolder()
    }
  }

  /**
   * The getFileFolderPath method.
   * @return {any} - The return value.
   */
  getFileFolderPath() {
    const filePath = this.getFilepath()
    if (filePath) {
      return filePath.substring(0, filePath.lastIndexOf('/')) + '/'
    }
  }

  /**
   * The getFile method.
   * @return {any} - The return value.
   */
  getFile() {
    return this.__file
  }

  /**
   * The getFileDesc method.
   * @return {any} - The return value.
   */
  getFileDesc() {
    // Can we settle on a convention?
    // console.warn("Deprecated method: 'getFileDesc'. Please use 'getFile'")
    return this.__file
  }

  /**
   * The setUrl method.
   * @param {any} url - The url param.
   * @param {any} mode - The mode param.
   */
  setUrl(url, mode = ValueSetMode.USER_SETVALUE) {
    const parts = url.split('/')
    const name = parts[parts.length - 1]

    
    let rootURL = window.location.href.split('#')[0]
    rootURL = rootURL.split('?')[0]
    if (rootURL.endsWith('.html') || rootURL.endsWith('.html')) {
      rootURL = rootURL.substring(0, rootURL.lastIndexOf('/')) + '/'
    }
    const base = rootURL
    if (parts[0] == '.') parts.shift()
    else if (parts[0] == '..') {
      item = item.substring(3)
      const baseparts = base.split('/')
      baseparts.pop()
      baseparts.pop()
      base = baseparts.join('/') + '/'
    }
    url = base + url

    this.__value = name
    this.__file = {
      id: url,
      name,
      url,
    }

    if (
      mode == ValueSetMode.USER_SETVALUE ||
      mode == ValueSetMode.REMOTEUSER_SETVALUE
    ) {
      this.__flags |= ParamFlags.USER_EDITED
    }
    this.valueChanged.emit(mode)
  }

  /**
   * The getUrl method.
   * @return {any} - The return value.
   */
  getUrl() {
    return this.__file ? this.__file.url : undefined
  }

  /**
   * The clone method.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  clone(flags) {
    const clonedParam = new FilePathParameter(this.__name)
    clonedParam.__file = this.__file
    return clonedParam
  }

  /**
   * The setDirty method.
   * @param {any} cleanerFn - The cleanerFn param.
   */
  setDirty(cleanerFn) {
    throw new Error('Cannot drive a filepath param from an oporator')
  }

  /**
   * The setValue method.
   * @param {any} value - The value param.
   * @param {any} mode - The mode param.
   * @return {any} - The return value.
   */
  setValue(value, mode = ValueSetMode.USER_SETVALUE) {
    // 0 == normal set. 1 = changed via cleaner fn, 2=change by loading/cloning code.
    if (value == undefined) {
      throw new Error('Invalid value for setValue.')
    }
    if (value.indexOf('.') > 0) {
      console.warn(
        'Deprecation warning for setValue. setValue should now only take a file id, not a path.'
      )
      return this.setFilepath(value, mode)
    }
    // Note: equality tests only work on simple types.
    // Important here because file changes cause reloads..
    if (value == this.__value) {
      return
    }

    // Note: the file path is selected by using the file browser
    // For now it can return an aboslute path(within the project)
    // and we convert to relative when we save.
    const resourceId = value
    if (!resourceLoader.resourceAvailable(resourceId)) {
      console.warn('Resource unavailable:' + resourceId)
      return
    }

    const file = resourceLoader.getFile(resourceId)
    if (this.__reextensions && !this.__reextensions.test(file.name)) {
      console.warn('Unsupported file type:' + file.name)
      return false
    }

    this.__value = value
    this.__file = file

    resourceLoader.fileUpdated.connect(id => {
      if (id == this.__value) {
        this.__file = resourceLoader.getFile(this.__value)
        this.fileUpdated.emit()
      }
    })

    if (mode == ValueSetMode.USER_SETVALUE)
      this.__flags |= ParamFlags.USER_EDITED
    this.valueChanged.emit(mode)
  }
  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    if ((this.__flags & ParamFlags.USER_EDITED) == 0) return
    const j = {}
    if (this.__file) {
      j.value = this.__file.id
      // For cases where the file ID changed.
      // e.g. if a file was deleted from the system, and
      // then re-added
      j.filepath = resourceLoader.getFilepath(this.__file.id)
    }
    return j
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    if (j.value) {
      if (j.value.indexOf('.') > 0) {
        this.setFilepath(j.value, ValueSetMode.DATA_LOAD)
        return
      } else {
        if (resourceLoader.resourceAvailable(j.value)) {
          this.setValue(j.value, ValueSetMode.DATA_LOAD)
          this.__flags |= ParamFlags.USER_EDITED
          return
        }
      }
    }
    if (j.filepath) {
      const resourceId = resourceLoader.resolveFilePathToId(j.filepath)
      if (!resourceId) {
        console.warn('Resource unavailable:' + j.filepath)
      } else {
        this.setValue(resourceId, ValueSetMode.DATA_LOAD)
        return
      }
    }
  }

  /**
   * The destroy method.
   */
  destroy() {
    super.destroy()
  }
}

export { FilePathParameter }
