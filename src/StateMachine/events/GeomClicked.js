import { sgFactory } from '../../SceneTree/SGFactory.js'

import { TreeItemParameter } from '../../SceneTree/Parameters/index'
import { StateEvent } from '../StateEvent.js'

/** Triggers an state machine event to occur when geometry is clicked.
 * @extends StateEvent
 * @private
 */
class GeomClicked extends StateEvent {
  /**
   * Create a geom clicked.
   * @param {string} name - The name value.
   */
  constructor(name) {
    super(name)
    this.__geomParam = this.addParameter(new TreeItemParameter('TreeItem'))
    this.__geomParam.valueChanged.connect(() => {
      this.__geom = this.__geomParam.getValue()
    })
    this.__geomClicked = this.__geomClicked.bind(this)
    this.__geomClickedBindId = -1;

  }

  /**
   * The __geomClicked method.
   * @param {any} event - The event that occurs.
   * @private
   */
  __geomClicked(event) {
    event.stopPropagation()
    this.__onEvent()
  }

  /**
   * The activate method.
   */
  activate() {
    if (this.__geom) {
      this.__geomClickedBindId = this.__geom.mouseDown.connect(this.__geomClicked)
    }
  }

  /**
   * The deactivate method.
   */
  deactivate() {
    if (this.__geom && this.__geomClickedBindId != -1) {
      this.__geom.mouseDown.disconnectId(this.__geomClickedBindId)
    }
    super.deactivate()
  }
}

sgFactory.registerClass('GeomClicked', GeomClicked)

export { GeomClicked }
