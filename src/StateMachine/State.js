

class State {
    constructor(stateMachine) {
        this.__stateMachine = stateMachine;
        this.__flags = 0; // 1 == inactive, 2 == deactivating.  4=active, 8 == activatating.


        this.__stateEvents = [];
        this.__activationActions = [];
        this.__deactivationActions = [];
    }
    activate() {
        this.__flags = 4;

        this.__stateEvents.forEach((stateEvent)=>{
            stateEvent.activate();
        });
        this.__activationActions.forEach((action)=>{
            action.start();
        });
    }
    deactivate() {
        this.__flags = 1;

        this.__stateEvents.forEach((stateEvent)=>{
            stateEvent.deactivate();
        });
        this.__deactivationActions.forEach((action)=>{
            action.start();
        });
    }
    isActive() {
        return this.__flags & 1;
    }
    isActivating() {
        return this.__flags & 2;
    }
    isDeactivating() {
        return this.__flags & 8;
    }

    addStateEvent(stateEvent) {
        this.__stateEvents.push(stateEvent);
    }

    addActivationAction(action) {
        this.__activationActions.push(action);
    }

    addDeactivationAction(action) {
        this.__deactivationActions.push(action);
    }

};

export {
    State
};
