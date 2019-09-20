import { sgFactory } from '../../SceneTree/SGFactory.js';

import { TreeItemParameter } from '../../SceneTree/Parameters';
import { StateEvent } from '../StateEvent.js';

/** Class representing a geom being clicked.
 * @extends StateEvent
 */
class GeomClicked extends StateEvent {
  /**
   * Create a geom clicked.
   * @param {any} name - The name value.
   */
  constructor(name) {
    super(name);
    this.__geomParam = this.addParameter(new TreeItemParameter('TreeItem'));
    this.__geomParam.valueChanged.connect(() => {
      this.__geom = this.__geomParam.getValue();
    });
  }

  /**
   * The __geomClicked method.
   * @param {any} event - The event param.
   * @private
   */
  __geomClicked(event) {
    event.vleStopPropagation = true;
    this.__onEvent();
  }

  /**
   * The activate method.
   */
  activate() {
    if (this.__geom) {
      this.__geom.mouseDown.connect(this.__geomClicked.bind(this));
    }
  }

  /**
   * The deactivate method.
   */
  deactivate() {
    if (this.__geom) {
      this.__geom.mouseDown.disconnect(this.__geomClicked.bind(this));
    }
  }
}

sgFactory.registerClass('GeomClicked', GeomClicked);

export { GeomClicked };
