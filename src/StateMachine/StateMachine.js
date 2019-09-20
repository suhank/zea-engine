import { Signal } from '../Utilities';
import { BaseItem, ItemFlags, sgFactory } from '../SceneTree';

/** Class representing a state machine
 * @extends BaseItem
 */
class StateMachine extends BaseItem {
  /**
   * Create a state machine.
   * @param {any} name - The name value.
   */
  constructor(name) {
    super(name);
    this.__states = {};
    this.__currentState;
    this.__initialStateName;

    this.stateChanged = new Signal();

    // Always save state machines.
    // Then never come as part of the binary data.
    this.setFlag(ItemFlags.USER_EDITED);

    // Manually invoke the callbacks for cases where the StateMAchine
    // is not beingn constructed by the SGFactory.
    if (!sgFactory.isConstructing()) {
      sgFactory.invokeCallbacks(this);
    }
  }

  /**
   * The addState method.
   * @param {any} state - The state param.
   */
  addState(state) {
    state.setStateMachine(this);
    this.__states[state.getName()] = state;

    if (
      Object.keys(this.__states).length == 1 &&
      this.__initialStateName == undefined
    ) {
      this.__initialStateName = state.getName();
    }
  }

  /**
   * The getState method.
   * @param {any} name - The name param.
   * @return {any} - The return value.
   */
  getState(name) {
    return this.__states[name];
  }

  /**
   * The activateState method.
   * @param {any} name - The name param.
   */
  activateState(name) {
    // console.log("StateMachine.activateState:" + name)
    if (!this.__states[name])
      throw new Error('Invalid state transtion:' + name);
    if (this.__currentState == this.__states[name]) return;
    if (this.__currentState) this.__currentState.deactivate();
    this.__currentState = this.__states[name];
    this.__currentState.activate();

    this.stateChanged.emit(name);
  }

  /**
   * The getActiveState method.
   * @return {any} - The return value.
   */
  getActiveState() {
    return this.__currentState;
  }

  /**
   * The getActiveStateName method.
   * @return {any} - The return value.
   */
  getActiveStateName() {
    return this.__currentState.constructor.name;
  }

  /**
   * The getInitialState method.
   * @return {any} - The return value.
   */
  getInitialState() {
    return this.__initialStateName;
  }

  /**
   * The setInitialState method.
   * @param {any} name - The name param.
   */
  setInitialState(name) {
    this.__initialStateName = name;
  }

  // ////////////////////////////////////////
  // Persistence

  /**
   * The toJSON method.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   * @return {any} - The return value.
   */
  toJSON(context, flags) {
    const j = super.toJSON(context, flags);
    j.initialStateName = this.__initialStateName;

    const statesj = {};
    for (const key in this.__states) {
      statesj[key] = this.__states[key].toJSON(context, flags);
    }
    j.states = statesj;
    return j;
  }

  /**
   * The fromJSON method.
   * @param {any} j - The j param.
   * @param {any} context - The context param.
   * @param {any} flags - The flags param.
   */
  fromJSON(j, context, flags) {
    super.fromJSON(j, context, flags);
    this.__initialStateName = j.initialStateName;

    context.stateMachine = this;

    for (const key in j.states) {
      const statejson = j.states[key];
      const state = sgFactory.constructClass(statejson.type);
      if (state) {
        state.fromJSON(statejson, context);
        this.addState(state);
      } else {
        throw new Error('Invalid type:' + statejson.type);
      }
    }
    context.addPLCB(() => {
      // Disabling for now.
      // We can have state machines that are not active at all.
      // e.g. in the 850 E-Tec project.
      // this.activateState(this.__initialStateName);
    });
  }
}

sgFactory.registerClass('StateMachine', StateMachine);

export { StateMachine };
