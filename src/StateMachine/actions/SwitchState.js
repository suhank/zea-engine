import { sgFactory } from '../../SceneTree/SGFactory.js'

import { StringParameter } from '../../SceneTree/Parameters'

import { StateAction } from '../StateAction.js'

/** Class representing switching a state.
 * @extends StateAction
 */
class SwitchState extends StateAction {
  /**
   * Create a switch state.
   */
  constructor() {
    super()
    this.__targetStateParam = this.addParameter(
      new StringParameter('TargetState', '')
    )
  }

  /**
   * The activate method.
   */
  activate() {
    this.__state
      .getStateMachine()
      .activateState(this.__targetStateParam.getValue())
  }
}

sgFactory.registerClass('SwitchState', SwitchState)
export { SwitchState }
