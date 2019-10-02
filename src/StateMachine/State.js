import { sgFactory } from '../SceneTree/SGFactory.js';

/** Class representing a state. */
class State {
  /**
   * Create a state.
   * @param {string} name - The name value.
   */
  constructor(name) {
    this.__name = name ? name : this.constructor.name;

    this.__stateEvents = [];
    this.__activationActions = [];
    this.__deactivationActions = [];
  }

  /**
   * The getName method.
   * @return {any} - The return value.
   */
  getName() {
    return this.__name;
  }

  /**
   * The setName method.
   * @param {string} name - The name param.
   */
  setName(name) {
    this.__name = name;
  }

  /**
   * The setStateMachine method.
   * @param {any} stateMachine - The stateMachine param.
   */
  setStateMachine(stateMachine) {
    this.__stateMachine = stateMachine;
  }

  /**
   * The getStateMachine method.
   * @return {any} - The return value.
   */
  getStateMachine() {
    return this.__stateMachine;
  }

  /**
   * The activate method.
   */
  activate() {
    this.__stateEvents.forEach(stateEvent => {
      stateEvent.activate();
    });
    this.__activationActions.forEach(action => {
      action.activate();
    });
  }

  /**
   * The deactivate method.
   */
  deactivate() {
    this.__stateEvents.forEach(stateEvent => {
      stateEvent.deactivate();
    });
    this.__deactivationActions.forEach(action => {
      action.activate();
    });
  }

  /**
   * The addStateEvent method.
   * @param {any} stateEvent - The stateEvent param.
   */
  addStateEvent(stateEvent) {
    stateEvent.setState(this);
    this.__stateEvents.push(stateEvent);
  }

  /**
   * The getStateEvent method.
   * @param {any} index - The index param.
   * @return {any} - The return value.
   */
  getStateEvent(index) {
    return this.__stateEvents[index];
  }

  /**
   * The addActivationAction method.
   * @param {any} action - The action param.
   */
  addActivationAction(action) {
    action.setState(this);
    this.__activationActions.push(action);
  }

  /**
   * The getActivationAction method.
   * @param {any} index - The index param.
   * @return {any} - The return value.
   */
  getActivationAction(index) {
    return this.__activationActions[index];
  }

  /**
   * The addDeactivationAction method.
   * @param {any} action - The action param.
   */
  addDeactivationAction(action) {
    action.setState(this);
    this.__deactivationActions.push(action);
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
    const j = {
      name: this.__name,
      type: this.constructor.name,
    };

    const stateEventsJson = [];
    for (const stateEvent of this.__stateEvents) {
      stateEventsJson.push(stateEvent.toJSON(context, flags));
    }
    j.stateEvents = stateEventsJson;

    const activationActionsJson = [];
    for (const stateEvent of this.__activationActions) {
      activationActionsJson.push(stateEvent.toJSON(context, flags));
    }
    j.activationActions = activationActionsJson;

    const deactivationActionsJson = [];
    for (const stateEvent of this.__deactivationActions) {
      deactivationActionsJson.push(stateEvent.toJSON(context, flags));
    }
    j.deactivationActions = deactivationActionsJson;

    return j;
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {object} context - The context param.
   * @param {number} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    this.__name = j.name;

    for (const stateEventJson of j.stateEvents) {
      const stateEvent = sgFactory.constructClass(stateEventJson.type);
      stateEvent.fromJSON(stateEventJson, context);
      this.addStateEvent(stateEvent);
    }
    for (const activationActionJson of j.activationActions) {
      const activationAction = sgFactory.constructClass(
        activationActionJson.type
      );
      activationAction.fromJSON(activationActionJson, context);
      this.addActivationAction(activationAction);
    }
    for (const deactivationActionJson of j.deactivationActions) {
      const deactivationAction = sgFactory.constructClass(
        deactivationActionJson.type
      );
      deactivationAction.fromJSON(deactivationActionJson, context);
      this.addDeactivationAction(deactivationAction);
    }
  }
}

sgFactory.registerClass('State', State);

export { State };
