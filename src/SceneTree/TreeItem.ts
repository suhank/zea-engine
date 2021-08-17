/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Xfo, Box3, Color } from '../Math/index'
import { Registry } from '../Registry'
// import { BooleanParameter, Parameter, XfoParameter } from './Parameters/index'
import { BooleanParameter } from './Parameters/BooleanParameter'

import { XfoParameter } from './Parameters/XfoParameter'
import { BaseItem } from './BaseItem'
import { CalcGlobalXfoOperator } from './Operators/CalcGlobalXfoOperator'
import { BoundingBoxParameter } from './Parameters/BoundingBoxParameter'
import { BinReader } from './BinReader'
import { BaseClass } from '../Utilities/BaseClass'
import { Operator } from './Operators'
import { Parameter } from './Parameters'

let selectionOutlineColor = new Color('#03E3AC')
selectionOutlineColor.a = 0.1

let branchSelectionOutlineColor = selectionOutlineColor.lerp(new Color('white'), 0.5)
branchSelectionOutlineColor.a = 0.1

/**
 * Class representing an Item in the scene tree with hierarchy capabilities (has children).
 * It has the capability to add and remove children.
 * <br>
 * <br>
 * **Parameters**
 * * **Visible(`BooleanParameter`):** Shows/Hides the item.
 * * **LocalXfo(`XfoParameter`):** Specifies the offset of this tree item from its parent.
 * * **GlobalXfo(`XfoParameter`):** Provides the computed world Xfo of this tree item.
 * * **BoundingBox(`BoundingBox`):** Provides the bounding box for the tree item and all of its children in the 3d scene.
 *
 * **Events**
 * * **globalXfoChanged:** Emitted when the value of GlobalXfo parameter changes. TODO
 * * **visibilityChanged:** Emitted when the visibility on the tree item changes. TODO
 * * **highlightChanged:** Emitted when the highlight on the tree item changes. TODO
 * * **childAdded:** Emitted when a item is added as a child.
 * * **childRemoved:** Emitted when an item is removed from the child nodes.
 * * **pointerDown:** Emitted when a pointerDown event happens in an item.
 * * **pointerUp:** Emitted when a pointerUp event happens in an item.
 * * **pointerMove:** Emitted when a pointerMove event happens in an item.
 * * **pointerEnter:** Emitted when a pointerEnter event happens in an item.
 *
 * @extends {BaseItem}
 */
class TreeItem extends BaseItem {
  __disableBoundingBox: boolean
  __boundingBoxParam: BoundingBoxParameter
  __childItems: BaseItem[]

  __childItemsEventHandlers: Array<number>
  __childItemsMapping: Record<string, number>

  __globalXfoParam: XfoParameter
  __localXfoParam: XfoParameter

  __highlightMapping: Record<string, Color>
  __highlights: Array<string>

  __visible: boolean
  __visibleCounter: number
  __visibleParam: BooleanParameter
  globalXfoOp: Operator

  // vars used in AssetItem.ts:
  // __geomLibrary: any
  // __materials: any
  // loaded: any
  /**
   * Creates a tree item with the specified name.
   *
   * @param {string} name - The name of the tree item. It's the identifier of the tree item.
   * It's an identifier intended to be human readable.
   * It's included in the path that we use to access a particular item.
   * It's used to display it in the tree.
   */
  constructor(name?: string) {
    super(name)

    // Controls if this TreeItem or its children contribute to the bounding boxes
    // in the scene. If set to false, Camera framing will ignore this item,
    this.__disableBoundingBox = false

    this.__visibleCounter = 1 // Visible by Default.
    this.__visible = true
    this.__highlightMapping = {}
    this.__highlights = []

    this.__childItems = []
    this.__childItemsEventHandlers = []
    this.__childItemsMapping = {}

    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
    this.onPointerMove = this.onPointerMove.bind(this)
    this.onPointerEnter = this.onPointerEnter.bind(this)
    this.onPointerLeave = this.onPointerLeave.bind(this)

    // /////////////////////////////////////
    // Add parameters.

    this.__visibleParam = this.addParameter(new BooleanParameter('Visible', true))
    this.__localXfoParam = this.addParameter(new XfoParameter('LocalXfo', new Xfo()))
    this.__globalXfoParam = this.addParameter(new XfoParameter('GlobalXfo', new Xfo()))
    this.__boundingBoxParam = <BoundingBoxParameter>this.addParameter(new BoundingBoxParameter('BoundingBox', this))

    // Bind handlers
    this.setBoundingBoxDirty = this.setBoundingBoxDirty.bind(this)
    this.childNameChanged = this.childNameChanged.bind(this)
    this.globalXfoOp = new CalcGlobalXfoOperator(this.__globalXfoParam, this.__localXfoParam)
    this.__globalXfoParam.on('valueChanged', (event: any) => {
      this.setBoundingBoxDirty()
      // Note: deprecate this event.
      this.emit('globalXfoChanged', event)
    })

    this.__visibleParam.on('valueChanged', () => {
      this.__visibleCounter += this.__visibleParam.getValue() ? 1 : -1
      this.updateVisibility()
    })
  }

  /**
   * Sets the owner (another TreeItem) of the current TreeItem.
   * @param {TreeItem} parentItem - The parent item.
   */
  setOwner(parentItem: TreeItem) {
    if (this.__ownerItem) {
      // this.__ownerItem.off('globalXfoChanged', this._setGlobalXfoDirty)
      const owner_TreeItem = <TreeItem>this.__ownerItem
      if (owner_TreeItem) {
        // The effect of the invisible owner is removed.
        if (!owner_TreeItem.isVisible()) this.__visibleCounter++ // TODO:(review) __ownerItem is casted to TreeItem
        const index = owner_TreeItem.getChildIndex(this)
        if (index >= 0) owner_TreeItem.unbindChild(index, this)
      }
    }

    super.setOwner(parentItem)

    // this._setGlobalXfoDirty()
    if (this.__ownerItem) {
      const owner_TreeItem = <TreeItem>this.__ownerItem
      if (owner_TreeItem) {
        // The effect of the invisible owner is added.
        if (!owner_TreeItem.isVisible()) this.__visibleCounter--

        this.globalXfoOp.getInput('ParentGlobal').setParam(owner_TreeItem.getParameter('GlobalXfo'))
        // this.__ownerItem.on('globalXfoChanged', this._setGlobalXfoDirty)
      }
    } else {
      this.globalXfoOp.getInput('ParentGlobal').setParam(undefined)
    }
    this.updateVisibility()
  }

  /**
   * The updatePath method.
   * @private
   */
  protected updatePath(): void {
    super.updatePath()
    for (const childItem of this.__childItems) {
      if (childItem) (<TreeItem>childItem).updatePath()
    }
  }

  /**
   * Returns the parent of current TreeItem.
   *
   * @return {TreeItem|undefined} - Returns the parent item.
   */
  getParentItem(): TreeItem | undefined {
    return <TreeItem>this.getOwner() // TODO: TreeItem cast
  }

  /**
   * Sets the parent of current TreeItem.
   *
   * @param {TreeItem} parentItem - The parent item.
   */
  setParentItem(parentItem: TreeItem): void {
    this.setOwner(parentItem)
  }

  // ////////////////////////////////////////
  // Global Matrix

  /**
   * @deprecated
   * Returns the value of local Xfo transform parameter.
   *
   * @return {Xfo} - Returns the local Xfo.
   */
  getLocalXfo(): Xfo {
    console.warn(`Deprecated. use "getParameter('LocalXfo').getValue()"`)
    return this.__localXfoParam.getValue()
  }

  /**
   * @deprecated
   * Sets the local Xfo transform parameter.
   *
   * @param {Xfo} xfo - The local xfo transform.
   */
  setLocalXfo(xfo: Xfo): void {
    console.warn(`Deprecated. use "getParameter('LocalXfo').setValue(xfo)"`)
    this.__localXfoParam.setValue(xfo)
  }

  /**
   * @deprecated
   * Returns the global Xfo transform.
   *
   * @return {Xfo} - Returns the global Xfo.
   */
  getGlobalXfo(): Xfo {
    console.warn(`Deprecated. use "getParameter('GlobalXfo').getValue()"`)
    return this.__globalXfoParam.getValue()
  }

  /**
   * @deprecated
   * Sets the global Xfo transform.
   * @param {Xfo} xfo - The global xfo transform.
   */
  setGlobalXfo(xfo: Xfo): void {
    console.warn(`Deprecated. use "getParameter('GlobalXfo').setValue(xfo)"`)
    this.__globalXfoParam.setValue(xfo)
  }

  // ////////////////////////////////////////
  // Visibility

  /**
   * @deprecated
   * Returns visible parameter value for current TreeItem.
   *
   * @return {boolean} - The visible param value.
   */
  getVisible(): boolean {
    console.warn('Deprecated. Use #isVisible')
    return this.isVisible()
  }

  /**
   * Returns visible parameter value for current TreeItem.
   *
   * @return {boolean} - The visible param value.
   */
  isVisible(): boolean {
    // Should never be more than 1, but can be less than 0.
    return this.__visibleCounter > 0
  }

  /**
   * Sets visible parameter value.
   *
   * @param {boolean} val - The val param.
   */
  setVisible(visible: boolean): void {
    this.__visibleParam.setValue(visible)
  }

  /**
   * Updates current TreeItem visible state and propagates its value to children elements.
   *
   * @param {number} val - The val param.
   */
  propagateVisibility(val: number): void {
    this.__visibleCounter += val
    this.updateVisibility()
  }

  /**
   * The __updateVisibility method.
   * @return {boolean} - Returns a boolean.
   * @private
   */
  protected updateVisibility(): boolean {
    const visible = this.__visibleCounter > 0
    if (visible != this.__visible) {
      this.__visible = visible
      for (const childItem of this.__childItems) {
        if (childItem instanceof TreeItem) childItem.propagateVisibility(this.__visible ? 1 : -1)
      }
      this.emit('visibilityChanged', { visible })
      return true
    }
    return false
  }

  // ////////////////////////////////////////
  // Highlights

  /**
   * Adds a highlight to the tree item.
   *
   * @param {string} name - The name of the tree item.
   * @param {Color} color - The color of the highlight.
   * @param {boolean} propagateToChildren - A boolean indicating whether to propagate to children.
   */
  addHighlight(name: string, color: Color, propagateToChildren = false): void {
    // If the highlight was already in the list,
    // remove it and put it at the top.
    if (name in this.__highlightMapping) {
      if (this.__highlights[this.__highlights.length - 1] != name) {
        // The highlight was already in the list, but not at the top. Move it to the top.
        const id = this.__highlights.indexOf(name)
        this.__highlights.splice(id, 1)
        this.__highlights.push(name)
        this.emit('highlightChanged', { name, color })
      } else {
        // This item is already highlighted with this highlight
        if (!this.__highlightMapping[name].isEqual(color)) {
          this.__highlightMapping[name] = color
          this.emit('highlightChanged', { name, color })
        }
      }
    } else {
      this.__highlights.push(name)
      this.__highlightMapping[name] = color
      this.emit('highlightChanged', { name, color })
    }

    if (propagateToChildren) {
      this.__childItems.forEach((childItem: any) => {
        if (childItem instanceof TreeItem) childItem.addHighlight(name, color, propagateToChildren)
      })
    }
  }

  /**
   * Removes a highlight to the tree item.
   *
   * @param {string} name - The name of the tree item.
   * @param {boolean} propagateToChildren - A boolean indicating whether to propagate to children.
   */
  removeHighlight(name: string, propagateToChildren = false): void {
    if (name in this.__highlightMapping) {
      if (this.__highlights[this.__highlights.length - 1] == name) {
        this.__highlights.pop()
        delete this.__highlightMapping[name]

        if (this.__highlights.length > 0) {
          const nextName = this.__highlights[this.__highlights.length - 1]
          const nextColor = this.__highlightMapping[nextName]
          this.emit('highlightChanged', { name: nextName, color: nextColor })
        } else {
          // The last highlight was removed, so emit an event saying we are no longer highlighted.
          this.emit('highlightChanged', {})
        }
      } else {
        // The removed highlight was not the current highlight, so no change needs to be shown.
        const id = this.__highlights.indexOf(name)
        this.__highlights.splice(id, 1)
        delete this.__highlightMapping[name]
        this.emit('highlightChanged', {})
      }
      if (propagateToChildren) {
        this.__childItems.forEach((childItem: any) => {
          if (childItem instanceof TreeItem) childItem.removeHighlight(name, propagateToChildren)
        })
      }
    }
  }

  /**
   * Returns the color of the current highlight.
   *
   * @return {Color} - The color value.
   */
  getHighlight(): Color {
    const check = this.__highlights.length > 0
    if (!check) {
      throw Error('highlight length > 0')
    }
    return this.__highlightMapping[this.__highlights[this.__highlights.length - 1]]
  }

  /**
   * Returns `true` if this items has a highlight color assigned.
   *
   * @return {boolean} - `True` if this item is highlighted.
   */
  isHighlighted(): boolean {
    return this.__highlights.length > 0
  }

  // ////////////////////////////////////////
  // Bounding Box

  /**
   * Getter for a bounding box.
   * @private
   */
  get boundingBox(): Box3 {
    console.warn("getter is deprecated. Please use 'getBoundingBox'")
    return this.getBoundingBox()
  }

  /**
   * @deprecated
   * Returns bounding box parameter value.
   * @private
   * @return {Box3} - The return value.
   */
  getBoundingBox(): Box3 {
    console.warn("getter is deprecated. Please use 'getParameter('BoundingBox').getValue()'")
    return this.__boundingBoxParam.getValue()
  }

  /**
   * The _cleanBoundingBox method.
   * @param {Box3} bbox - The bounding box value.
   * @return {Box3} - The return value.
   * @private
   */
  _cleanBoundingBox(bbox: Box3): Box3 {
    bbox.reset()
    this.__childItems.forEach((childItem: any) => {
      if (childItem instanceof TreeItem)
        if (childItem.isVisible()) {
          // console.log(" - ", childItem.constructor.name, childItem.getName(), childItem.getParameter('GlobalXfo').getValue().sc.x, childItem.getBoundingBox().toString())
          const box3 = childItem.getParameter('BoundingBox')?.getValue()
          if (box3) bbox.addBox3(box3)
        }
    })
    // console.log(this.getName(), bbox.toString())
    return bbox
  }

  /**
   * The _childBBoxChanged method.
   * @private
   */
  protected childBBoxChanged(): void {
    this.setBoundingBoxDirty()
  }

  /**
   * The _setBoundingBoxDirty method.
   * @private
   */
  protected setBoundingBoxDirty(): void {
    if (this.__boundingBoxParam) {
      // Will cause boundingChanged to emit
      this.__boundingBoxParam.setDirty(-1)
    }
  }

  // ////////////////////////////////////////
  // Children

  /**
   * Returns children list, but children are not required to have hierarchy structure(`TreeItem`).
   * Meaning that it could be another kind of item than `TreeItem`.
   * <br>
   * i.e. **BaseImage**
   *
   * @return {BaseItem[]} - List of `BaseItem` owned by current TreeItem.
   */
  getChildren(): BaseItem[] {
    return this.__childItems
  }

  /**
   * Returns the number of child elements current `TreeItem` has.
   *
   * @deprecated since version 0.0.80
   * @return {number} - The return value.
   */
  numChildren(): number {
    console.warn('Deprecated. Use #getNumChildren')
    return this.__childItems.length
  }

  /**
   * Returns the number of child elements current `TreeItem` has.
   *
   * @return {number} - The return value.
   */
  getNumChildren(): number {
    return this.__childItems.length
  }

  /**
   * Verifies if there's a child with the specified name.
   * If there's one, modifiers are applied to the name and returned.
   *
   * @param {string} name - The name value.
   * @return {string} - Returns a unique name.
   */
  generateUniqueName(name: string): string {
    if (!(name in this.__childItemsMapping)) return name

    let index = 1
    if (name.length > 4 && !Number.isNaN(parseInt(name.substring(name.length - 4))))
      index = parseInt(name.substr(name.length - 4))
    else if (name.length > 3 && !Number.isNaN(parseInt(name.substring(name.length - 3))))
      index = parseInt(name.substr(name.length - 3))
    else if (name.length > 2 && !Number.isNaN(parseInt(name.substring(name.length - 2))))
      index = parseInt(name.substr(name.length - 2))

    const names = []
    for (const c of this.__childItems) {
      // Sometimes we have an empty child slot.
      // We resize the child vector, and then populate it.
      if (c) {
        names.push(c.getName())
      }
    }

    let uniqueName = name
    while (true) {
      let suffix = '' + index
      while (suffix.length < 2) {
        suffix = '0' + suffix
      }

      uniqueName = name + suffix
      if (!names.includes(uniqueName)) break
      index++
    }
    return uniqueName
  }

  /**
   * The __updateMapping method.
   * @param {number} start - The start value.
   * @private
   */
  protected updateMapping(start: number): void {
    // If a child has been added or removed from the
    // tree item, we need to update the acceleration structure.
    for (let i = start; i < this.__childItems.length; i++) {
      this.__childItemsMapping[this.__childItems[i].getName()] = i
    }
  }

  /**
   * The _childNameChanged event handler.
   * @param {object} event - The start value.
   * @private
   */
  protected childNameChanged(event: Record<string, any>): void {
    // Update the acceleration structure.
    const index = this.__childItemsMapping[event.oldName]
    delete this.__childItemsMapping[event.oldName]
    this.__childItemsMapping[event.newName] = index
  }

  /**
   * Inserts a child. It accepts all kind of `BaseItem`, not only `TreeItem`.
   *
   * @param {BaseItem} childItem - The child BaseItem to insert.
   * @param {number} index - The index to add the child item.
   * @param {boolean} maintainXfo - Boolean that determines if the Xfo value is maintained.
   * @param {boolean} fixCollisions - Modify the name of the item to avoid name collisions.
   * If false, an exception wll be thrown instead if a name collision occurs.
   * @return {number} - The index of the child item in this items children array.
   */
  insertChild(childItem: BaseItem, index: number, maintainXfo = false, fixCollisions = true): BaseItem {
    if (childItem.getName() in this.__childItemsMapping) {
      if (fixCollisions) {
        childItem.setName(this.generateUniqueName(childItem.getName()))
      } else {
        throw new Error("Item '" + childItem.getName() + "' is already a child of :" + this.getPath())
      }
    }
    if (!(childItem instanceof BaseItem)) {
      throw new Error('Object is is not a tree item :' + childItem) // TODO: need better output here+ childItem.constructor.name)
    }
    childItem.on('nameChanged', this.childNameChanged)
    let newLocalXfo
    if (childItem instanceof TreeItem) {
      if (maintainXfo) {
        const globalXfo = this.getParameter('GlobalXfo')?.getValue()
        const childGlobalXfo = childItem.getParameter('GlobalXfo')?.getValue()
        newLocalXfo = globalXfo.inverse().multiply(childGlobalXfo)
      }
      childItem.on('boundingChanged', this.setBoundingBoxDirty)
      childItem.on('visibilityChanged', this.setBoundingBoxDirty)
    }

    this.__childItems.splice(index, 0, childItem)
    this.__childItemsMapping[childItem.getName()] = index
    this.updateMapping(index)
    childItem.setOwner(this)

    if (childItem instanceof TreeItem) {
      if (maintainXfo) childItem.getParameter('LocalXfo')?.setValue(newLocalXfo)
      this.setBoundingBoxDirty()

      this.__highlights.forEach((name: string) => {
        const color = this.__highlightMapping[name]
        childItem.addHighlight(name, color, true)
      })
    }

    this.emit('childAdded', { childItem, index })

    return childItem
  }

  /**
   * Adds a child. It accepts all kind of `BaseItem`, not only `TreeItem`.
   *
   * @param {BaseItem} childItem - The child BaseItem to add.
   * @param {boolean} maintainXfo - Boolean that determines if
   * the Global Xfo value is maintained. If true, when moving
   * items in the hierarchy from one parent to another, the local Xfo
   * of the item will be modified to maintain and the Global Xfo.
   * Note: this option defaults to false because we expect that is the
   * behavior users would expect when manipulating the tree in code.
   * To be safe and unambiguous, always try to specify this value.
   * @param {boolean} fixCollisions - Modify the name of the item to avoid
   * name collisions with other children of the same parent.
   * If false, an exception wll be thrown instead if a name collision occurs.
   * @return {BaseItem} childItem - The child BaseItem that was added.
   */
  addChild(childItem: BaseItem, maintainXfo = true, fixCollisions = true): BaseItem {
    const index = this.__childItems.length
    this.insertChild(childItem, index, maintainXfo, fixCollisions)
    return childItem
  }

  /**
   * Returns child element in the specified index.
   *
   * @param {number} index - The index to remove the child TreeItem.
   * @return {BaseItem|undefined} - Return the child TreeItem.
   */
  getChild(index: number): BaseItem {
    return this.__childItems[index]
  }

  /**
   * Returns child element with the specified name.
   *
   * @param {string} name - The name value.
   * @return {BaseItem|null} - Return the child BaseItem.
   */
  getChildByName(name: string): BaseItem | null {
    const index = this.__childItemsMapping[name]
    if (index != undefined) {
      return this.__childItems[index]
    }
    return null
  }

  /**
   * Returns children names as an array of strings.
   *
   * @return {string[]} - An array of names for each child.
   */
  getChildNames(): string[] {
    const names = []
    for (let i = 0; i < this.__childItems.length; i++) {
      const childItem = this.__childItems[i]
      if (childItem != null) names[i] = childItem.getName()
    }
    return names
  }

  /**
   * UnBind an item from the group. This method is called
   * automatically when an item is removed from the group.
   * @param {number} index - The index value.
   * @param {TreeItem} childItem - item to unbind.
   * @private
   */
  protected unbindChild(index: number, childItem: BaseItem): void {
    childItem.off('nameChanged', this.childNameChanged)
    if (childItem instanceof TreeItem) {
      childItem.off('boundingChanged', this.setBoundingBoxDirty)
      childItem.off('visibilityChanged', this.setBoundingBoxDirty)
    }

    this.__childItems.splice(index, 1)
    this.__childItemsEventHandlers.splice(index, 1)
    delete this.__childItemsMapping[childItem.getName()]
    this.updateMapping(index)
    if (childItem instanceof TreeItem) {
      this.setBoundingBoxDirty()
    }

    this.emit('childRemoved', { childItem, index })
  }

  /**
   * Removes a child BaseItem by specifying its index.
   *
   * @param {number} index - The index value.
   */
  removeChild(index: number): void {
    const childItem = this.__childItems[index]

    if (!childItem) {
      return
    }
    this.unbindChild(index, childItem)
    childItem.setOwner(undefined)
  }

  /**
   * Removes a child BaseItem by specifying its name.
   *
   * @param {string} name - The name param.
   * @return {void} - Return the child TreeItem.
   */
  removeChildByName(name: string): void {
    const index = this.__childItemsMapping[name]
    if (index != undefined) {
      return this.removeChild(index)
    }
  }

  /**
   * Removes the provided item from this TreeItem if it is one of its children.
   * An exception is thrown if the item is not a child of this tree item.
   *
   * @param {BaseItem} childItem - The child TreeItem to remove.
   */
  removeChildByHandle(childItem: BaseItem): void {
    console.warn('Deprecated. Use #removeChild')
    const index = this.__childItems.indexOf(childItem)
    if (index == -1) throw new Error('Error in removeChildByHandle. Child not found:' + childItem.getName())
    this.removeChild(index)
  }

  /**
   * Removes all children Items.
   */
  removeAllChildren(): void {
    let index = this.__childItems.length
    while (index--) {
      this.removeChild(index)
    }
    this.setBoundingBoxDirty()
  }

  /**
   * Returns index position of the specified item.
   *
   * @param {BaseItem} childItem - The child TreeItem value.
   * @return {number} - Child index in children array.
   */
  getChildIndex(childItem: BaseItem): number {
    return this.__childItems.indexOf(childItem)
  }

  /**
   * @deprecated
   * Returns index position of the specified item.
   *
   * @param {BaseItem} childItem - The child TreeItem value.
   * @return {number} - The return value.
   */
  indexOfChild(childItem: BaseItem): number {
    console.warn('Deprecated Use #getChildIndex')
    return this.getChildIndex(childItem)
  }

  // ////////////////////////////////////////
  // Path Traversal
  // Note: Path resolution starts at the root of the
  // tree the path was generated from (so index=1, because we don't resolve root).
  // Note: When a path is made relative to an item in its tree, the path
  // starts with the child elements.

  /**
   * The resolvePath method traverses the subtree from this item down
   * matching each name in the path with a child until it reaches the
   * end of the path.
   *
   * @param {array} path - The path value.
   * @param {number} index - The index value.
   * @return {BaseItem|Parameter} - The return value.
   */
  resolvePath(path: string | string[], index = 0, displayError = false): BaseItem | Parameter<any> | null {
    if (typeof path == 'string') path = path.split('/')

    if (index == 0) {
      if (path[0] == '.' || path[0] == this.__name) index++
      else if (path[0] == '..') {
        if (this.__ownerItem) {
          return this.__ownerItem.resolvePath(path, index + 1)
        } else if (displayError) {
          throw Error('this.__ownerItem is undefined')
        } else {
          console.warn('this.__ownerItem is undefined')
        }
      } else {
        // Note: new paths should be generated starting with the name of the root object.
        // Re-enable this to debug path issues.
        // console.warn("Paths should start with the name of the root item or '.'")
      }
    }

    if (index == path.length) {
      return this
    }

    const childName = path[index]
    const childItem = this.getChildByName(childName)
    if (childItem == undefined) {
      // Maybe the name is a parameter name.
      const param = this.getParameter(path[index])
      if (param) {
        return param
      }

      // Note: consuming code should catch and display errors if necessary.
      // Silent failures are extremely difficult to debug.
      throw new Error(
        `Unable to resolve path : [${path.toString()}] after: ${this.getName()} \nNo child or parameter called : "${
          path[index]
        }"`
      )
    }
    return childItem.resolvePath(path, index + 1)
  }

  /**
   * Traverse the tree structure from this point down
   * and fire the callback for each visited item.
   * Note: Depth only used by selection sets for now.
   *
   * @param {function} callback - The callback value.
   * @param {boolean} includeThis - Fire the callback for this item.
   */
  traverse(callback: (...args: any[]) => unknown, includeThis = true): void {
    const __c = (treeItem: any, depth: any) => {
      const children = treeItem.getChildren()
      for (const childItem of children) {
        if (childItem) __t(childItem, depth + 1)
      }
    }
    const __t = (treeItem: any, depth: any) => {
      if (callback(treeItem, depth) == false) return false
      if (treeItem instanceof TreeItem) __c(treeItem, depth)
    }

    if (includeThis) {
      __t(this, 1)
    } else {
      __c(this, 0)
    }
  }

  // ///////////////////////
  // Events

  /**
   * Causes an event to occur when a user presses a pointer(mouse, touch, pencil, etc.) over an element.
   *
   * @param {PointerEvent} event - The event value
   */
  onPointerDown(event: any) {
    this.emit('pointerDown', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onPointerDown(event)
    }
  }

  /**
   * Causes an event to occur when a user releases a mouse button over a element.
   *
   * @param {PointerEvent} event - The mouse event that occurs.
   */
  onPointerUp(event: any) {
    this.emit('pointerUp', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onPointerUp(event)
    }
  }

  /**
   * Causes an event to occur when the pointer is moving while over an element.
   *
   * @param {PointerEvent} event - The mouse event that occurs.
   */
  onPointerMove(event: any) {
    this.emit('pointerMove', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onPointerMove(event)
    }
  }

  /**
   * Causes an event to occur when the mouse pointer is moved onto an element.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onPointerEnter(event: any) {
    this.emit('pointerEnter', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onPointerEnter(event)
    }
  }

  /**
   * Causes an event to occur when the mouse pointer is moved out of an element.
   *
   * @param {MouseEvent} event - The mouse event that occurs.
   */
  onPointerLeave(event: any) {
    this.emit('pointerLeave', event)
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onPointerLeave(event)
    }
  }

  /**
   * Causes an event to occur when the mouse wheel is rolled up or down over an element.
   *
   * @param {WheelEvent } event - The wheel event that occurs.
   */
  onWheel(event: any) {
    const owner_TreeItem = <TreeItem>this.__ownerItem
    if (event.propagating && owner_TreeItem) {
      owner_TreeItem.onWheel(event)
    }
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method serializes this instance as a JSON.
   * It can be used for persistence, data transfer, etc.
   *
   * @param {Record<string, any>} context - The context value.
   * @return {Record<string, any>} - Returns the json object.
   */
  toJSON(context: Record<string, any>): Record<string, any> {
    let j = super.toJSON(context)

    // Some Items, such as the SliderSceneWidget do not need their children
    // to be saved.
    const childItemsJSON: Record<string, any> = {}
    for (const childItem of this.__childItems) {
      if (childItem) {
        const childJSON = childItem.toJSON(context)
        if (childJSON) childItemsJSON[childItem.getName()] = childJSON
      }
    }
    if (Object.keys(childItemsJSON).length > 0) {
      if (j) {
        ;(j as any).children = childItemsJSON
      } else {
        j = {
          name: this.__name,
          children: childItemsJSON,
        }
      }
    }

    return j
  }

  /**
   * The fromJSON method takes a JSON and deserializes into an instance of this type.
   *
   * @param {Record<string, any>} j - The json object this item must decode.
   * @param {Record<string, any>} context - The context value.
   */
  fromJSON(j: Record<string, any>, context: Record<string, any>, onDone?: any): void {
    super.fromJSON(j, context)

    if (context && !Number.isNaN(context.numTreeItems)) context.numTreeItems++

    // if ('bbox' in j){
    //     let box = new Box3();
    //     box.fromJSON(j.bbox);
    //     this.__boundingBoxParam.setValue(box);
    // }

    if (j.children != null) {
      const childrenJson = j.children
      if (Array.isArray(childrenJson)) {
        for (const childJson of childrenJson) {
          // Note: During loading of asset trees, we have an
          // existing tree generated by loading a bin data file.
          let childItem: BaseItem | null = this.getChildByName(childJson.name)
          if (childItem) {
            childItem.fromJSON(childJson, context)
          } else {
            if (childJson.type) {
              childItem = <BaseItem>Registry.constructClass(childJson.type)
              if (childItem) {
                // Note: we should load the json first, as it
                // may contain the unique name of the item.
                childItem.fromJSON(childJson, context)
                this.addChild(childItem, false, false)
              }
            } else {
              // Note: no need to log a warning. A child might not exist
              // if the binary tree has changed, and so the JSON data
              // can no longer be mapped.
              // console.warn("Child not found:", childName, " within ", this.getNumChildren() + " of:" + this.getPath())
            }
          }
        }
      } else {
        // eslint-disable-next-line guard-for-in
        for (const childName in childrenJson) {
          const childJson = childrenJson[childName]
          // Note: During loading of asset trees, we have an
          // existing tree generated by loading a bin data file.
          let childItem: BaseItem | null = this.getChildByName(childName)
          if (childItem) {
            childItem.fromJSON(childJson, context)
          } else if (childJson.type) {
            childItem = <BaseItem>Registry.constructClass(childJson.type)
            if (childItem) {
              // Note: we add the child now before loading.
              // This is because certain items. (e.g. Groups)
              // Calculate their global Xfo, and use it to modify
              // the transform of their members.
              // Note: Groups bind to items in the scene which are
              // already added as children, and so have global Xfos.
              // We prefer to add a child after its loaded, because sometimes
              // In the tree is asset items, who will only toggled as
              // unloaded once they are loaded(else they are considered inline assets.)
              childItem.fromJSON(childJson, context)
              this.addChild(childItem, false, false)
            }
          } else {
            // Note: When saving a bin tree, we no longer save the 'type' value
            // so that those nodes can no longer be re-created by loading the JSON
            // file. We don't want the json tree
            // to re-instate ghost tree items that have been removed from the bin tree.
            //  (as has happened in testing.)
            // console.warn("Warning loading JSON. Child not found:" + childName);
          }
        }
      }
    }

    // if (j.components) {
    //   for (const cj of j.components) {
    //     const component = Registry.constructClass(cj.type ? cj.type : cj.name)
    //     if (component) {
    //       component.fromJSON(cj, context)
    //       this.addComponent(component)
    //     }
    //   }
    // }
  }

  /**
   * Sets state of current Item(Including parameters & children) using a binary reader object.
   *
   * @param {BinReader} reader - The reader value.
   * @param {Record<string, any>} context - The context value.
   */
  readBinary(reader: BinReader, context: Record<string, any>): void {
    super.readBinary(reader, context)

    context.numTreeItems++

    const itemFlags = reader.loadUInt8()

    // const visibilityFlag = 1 << 1
    // this.setVisible(itemFlags&visibilityFlag);

    // Note: to save space, some values are skipped if they are identity values
    const localXfoFlag = 1 << 2
    if (itemFlags & localXfoFlag) {
      const xfo = new Xfo()
      xfo.tr = reader.loadFloat32Vec3()
      xfo.ori = reader.loadFloat32Quat()
      const sc = reader.loadFloat32()
      xfo.sc.set(sc, sc, sc)
      // console.log(this.getPath() + " TreeItem:" + xfo.toString());
      this.__localXfoParam.loadValue(xfo)
    }

    const bboxFlag = 1 << 3
    if (itemFlags & bboxFlag) {
      this.__boundingBoxParam.loadValue(new Box3(reader.loadFloat32Vec3(), reader.loadFloat32Vec3()))
    }

    const numChildren = reader.loadUInt32()
    if (numChildren > 0) {
      const toc = reader.loadUInt32Array(numChildren)
      for (let i = 0; i < numChildren; i++) {
        try {
          reader.seek(toc[i]) // Reset the pointer to the start of the item data.
          let childType = reader.loadStr()

          const childItem = <BaseItem>Registry.constructClass(childType)
          if (!childItem) {
            const childName = reader.loadStr()
            console.warn('Unable to construct child:' + childName + ' of type:' + childType)
            continue
          }
          reader.seek(toc[i]) // Reset the pointer to the start of the item data.
          childItem.readBinary(reader, context)

          this.addChild(childItem, false, false)
        } catch (e) {
          console.warn('Error loading tree item: ', e)
        }
      }
    }
  }

  // ////////////////////////////////////////
  // Clone and Destroy

  /**
   * The clone method constructs a new tree item, copies its values
   * from this item and returns it.
   *
   * @param {Record<string, unknown>} context - The context value.
   * @return {TreeItem} - Returns a new cloned tree item.
   */
  clone(context?: Record<string, unknown>): TreeItem {
    const cloned = new TreeItem('')
    cloned.copyFrom(this)
    return cloned
  }

  /**
   * Copies current TreeItem with all its children.
   *
   * @param {TreeItem} src - The tree item to copy from.
   * @param {Record<string, any>} context - The context value.
   */
  copyFrom(src: TreeItem, context?: Record<string, any>): void {
    super.copyFrom(src, context)

    // Share a local Xfo
    // Note: disabled for now.
    // When cloning instanced trees, the root item should
    // have a unique LocalXfoParam, as it must be re-set.
    // (The root of the tree is a cloned and attached to an Instance node that provides the transform)
    src.getChildren().forEach((srcChildItem: any) => {
      if (srcChildItem) this.addChild(srcChildItem.clone(), false, false)
    })
  }
}

Registry.register('TreeItem', TreeItem)

export { TreeItem }
