import { Registry } from '../Registry'

/**
 * @private
 */
const sgFactory: Record<any, any> = {
  registerClass: (blueprintName: any, blueprint: any) => {
    console.warn(`'sgFactory' is deprecated, Please use 'Registry.register'`)
    Registry.register(blueprintName, blueprint)
  },
  constructClass: (blueprintName: any, ...args: any[]) => {
    console.warn(`'sgFactory' is deprecated, Please use 'Registry.constructClass'`)
    console.warn('...args not used in constructClass')
    Registry.constructClass(blueprintName) // TODO: , Registry.constructClass(blueprintName, ...args) --
  },
}

export { sgFactory }
