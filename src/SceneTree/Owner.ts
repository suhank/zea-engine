import { BaseItem } from './BaseItem'
import { Parameter } from './Parameters/Parameter'

interface Owner {
  /**
   * Returns the current path of the item in the tree as an array of names.
   *
   * @return {string[]} - Returns an array.
   */
  getPath(): string[]

  resolvePath(path: string[], index?: number): BaseItem | Parameter<any> | null
}

export { Owner }
