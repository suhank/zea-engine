

class State {
    constructor(name) {
        this.__name = name ? name : this.constructor.name;
        this.__flags = 0; // 1 == inactive, 2 == deactivating.  4=active, 8 == activatating.


        this.__stateEvents = [];
        this.__activationActions = [];
        this.__deactivationActions = [];
    }

    getName(){
        return this.__name;
    }
    setName(name){
        this.__name = name;
    }

    setStateMachine(stateMachine) {
        this.__stateMachine = stateMachine;
    }

    getStateMachine() {
        return this.__stateMachine;
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
        stateEvent.setState(this);
        this.__stateEvents.push(stateEvent);
    }

    addActivationAction(action) {
        action.setState(this);
        this.__activationActions.push(action);
    }

    addDeactivationAction(action) {
        action.setState(this);
        this.__deactivationActions.push(action);
    }

};

export {
    State
};
