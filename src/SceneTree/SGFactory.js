/* eslint-disable new-cap */
/* eslint-disable prefer-rest-params */
/**
 * Factory class desinged build objects from persisted data.
 * Class name as a string is required because on minification processes class names changes.
 */
class SGFactory {
  /**
   * Create a SG factory.
   */
  constructor() {
    this.__registeredClasses = {}
    this.__classNames = {}
    this.__classList = []
  }

  /**
   * Registers a new class in the factory.
   *
   * @param {string} classname - The classname value.
   * @param {function} cls - The class function.
   */
  registerClass(classname, cls) {
    this.__registeredClasses[classname] = {
      cls,
      callbacks: [],
    }

    // Note: we often register classes under multiple names to provide backwards compatiblity.
    // e.g.
    // sgFactory.registerClass('NumberParameter', NumberParameter)
    // sgFactory.registerClass('Property_SInt32', NumberParameter)
    // if (this.__classList.indexOf(cls) != -1)
    //   console.warn("Class already registered:", classname, " as:",  this.__classNames[this.__classList.indexOf(cls)])

    const id = this.__classList.length
    this.__classList.push(cls)

    this.__classNames[id] = classname
  }

  /**
   * Returns class function by specifying its name.
   *
   * @param {string} classname - The class name value.
   * @return {function|undefined} - Returns class function if exists.
   */
  getClass(classname) {
    if (this.__registeredClasses[classname]) return this.__registeredClasses[classname].cls
  }

  /**
   * Returns class name using passing an instantiated object.
   * If it is not registered, the name in constructor is returned.
   *
   * @param {object} inst - Instanciated class
   * @return {string} - Returns class name.
   */
  getClassName(inst) {
    const id = this.__classList.indexOf(inst.constructor)
    if (this.__classNames[id]) return this.__classNames[id]
    console.warn('Class not registered:', inst.constructor.name)
    return inst.constructor.name

    // if (this.__classNames[inst.constructor.name])
    //   return this.__classNames[inst.constructor.name]
    // return inst.constructor.name
  }

  /**
   * Accepting the class name and N number of arguments, instantiates a new object of the specified class.
   * If the class is not registered, then `null` is returned. <br>
   * **Note:** Although the class arguments are not literally specified in the parameters,
   * you can pass them(As many as needed).
   *
   * @param {string} classname - The classname value.
   * @return {object|null} - The return value.
   */
  constructClass(classname /* , ...args */) {
    const classData = this.__registeredClasses[classname]
    if (!classData) {
      console.warn('Factory not registered:' + classname)
      return null
    }
    this.__constructing = true
    const args = Array.prototype.slice.call(arguments, 1)
    const inst = new classData.cls(...args)
    this.__constructing = false
    // this.invokeCallbacks(inst)
    return inst
  }

  /*
  
  /**
   * The isConstructing method.
   * @return {any} - The return value.
  isConstructing() {
    return this.__constructing
  }
  /**
   * The registerCallback method.
   * @param {any} classname - The classname value.
   * @param {any} callback - The callback value.
  registerCallback(classname, callback) {
    const classData = this.__registeredClasses[classname]
    if (!classData) {
      console.warn('Factory not registered:' + classname)
      return
    }
    classData.callbacks.push(callback)
  }

   * The invokeCallbacks method.
   * @param {any} inst - The inst value.
   
  invokeCallbacks(inst) {
    if (this.__classNames[inst.constructor.name]) {
      const classData = this.__registeredClasses[
        this.__classNames[inst.constructor.name]
      ]
      for (const callback of classData.callbacks) callback(inst)
    }
  }*/
}

const sgFactory = new SGFactory()
export { sgFactory }
