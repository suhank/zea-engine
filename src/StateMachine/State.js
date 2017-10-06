

class State {
    constructor(stateMachine) {
        this.__stateMachine = stateMachine;
        this.__flags = 0; // 1 == inactive, 2 == deactivating.  4=active, 8 == activatating.
    }
    activate() {
        this.__flags = 4;

    }
    deactivate() {
        this.__flags = 1;
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
};

export {
    State
};
