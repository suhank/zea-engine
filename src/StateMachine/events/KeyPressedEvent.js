import { sgFactory } from '../../SceneTree/SGFactory.js';

import { Parameter } from '../../SceneTree/Parameters';
import { StateEvent } from '../StateEvent.js';

/** Class representing a key pressed event.
 * @extends StateEvent
 */
class KeyPressedEvent extends StateEvent {
  /**
   * Create a key pressed event.
   * @param {any} name - The name value.
   */
  constructor(name) {
    super(name);
    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.__keyParam = this.addParameter(new Parameter('Key', ''));
  }

  /**
   * The onKeyPressed method.
   * @param {any} event - The event param.
   */
  onKeyPressed(event) {
    console.log(event.key);
    if (event.key == this.__keyParam.getValue()) {
      this.__onEvent();
    }
  }

  /**
   * The activate method.
   */
  activate() {
    document.addEventListener('keydown', this.onKeyPressed);
  }

  /**
   * The deactivate method.
   */
  deactivate() {
    document.removeEventListener('keydown', this.onKeyPressed);
  }
}

sgFactory.registerClass('KeyPressedEvent', KeyPressedEvent);

export { KeyPressedEvent };
