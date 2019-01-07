import {
    Signal
} from '../Utilities';


const RULES_EXEC_MODE = {
    AUTO: 0,
    MANUAL: 1
}


const RULES_COMBINE_MODE = {
    AND: 0,
    OR: 1
}

const RULES_TYPE = {
    NAME: 0,
    PROPERTY: 1
}

const MATCH_TYPE = {
    EXACT: 0,
    IGNORECASE: 1,
    CONTAINS: 2,
    CONTAINS_IGNORECASE: 3,
    FUZZY: 4,
    REGEX: 5
}

class SelectionSetBase {
    constructor(name = 'Folder') {
        this.__name = name;
        this.nameChanged = new Signal();
    }

    getName() {
        return this.__name;
    }

    setName(name) {
        const prevname = this.__name;
        this.__name = name;
        this.nameChanged.emit(name, prevname)
    }
}

class SelectionSetFolder extends SelectionSetBase {
    constructor(name = 'Folder') {
        super(name)
        this.__selectionSets = [];
        this.__selectionSetMapping = {};
        this.recompute = new Signal();
    }

    __recompute(selSet) {
        this.recompute.emit(selSet)
    }

    addSelectionSet(selSet) {
        this.__selectionSets.push(selSet);
        this.__selectionSetMapping[selSet.getName()] = this.__selectionSets.length - 1;

        selSet.nameChanged.connect((newName, oldName) => {
            const index = this.__selectionSetMapping[oldName];
            delete this.__selectionSetMapping[oldName]
            this.__selectionSetMapping[newName] = index;
        })
        selSet.recompute.connect(selSet => this.__recompute(selSet));
    }

    createSelectionSetFolder(name) {
        this.addSelectionSet(new SelectionSetFolder(name));
        this.selectionSets.push(selSet);
        this.__selectionSetMapping[name] = this.selectionSets.length - 1;

        selSet.nameChanged.connect((newName, oldName) => {
            const index = this.__selectionSetMapping[oldName];
            delete this.__selectionSetMapping[oldName]
            this.__selectionSetMapping[newName] = index;
        })
    }

    createSelectionSet(name) {
        const selSet = new SelectionSet(name);
        this.addSelectionSet(selSet);
        return selSet;
    }

    removeSelectionSet(name) {
        // TODO
    }

    apply(treeItem) {
        for (let selSet of this.__selectionSets) {
            selSet.apply(treeItem);
        }
    }

    remove(treeItem) {
        for (let selSet of this.__selectionSets) {
            selSet.remove(treeItem);
        }
    }
}

class SelectionSetsRoot extends SelectionSetFolder {

    constructor(rootItem) {
        super('SelectionSets')

        this.__childAdded = this.__childAdded.bind(this);
        this.__childRemoved = this.__childRemoved.bind(this);

        this.__rootItem = rootItem;
        this.__childAdded(rootItem)
    }

    __recompute(selSet) {
        this.__rootItem.traverse((treeItem) => {
            selSet.apply(treeItem);
        });
    }

    __childAdded(treeItem) {

        this.apply(treeItem);

        for (let childItem of treeItem.getChildren()) {
            this.__childAdded(childItem);
        }

        treeItem.childAdded.connect(this.__childAdded);
        treeItem.childRemoved.connect(this.__childRemoved);
    }

    __childRemoved(treeItem) {

        this.remove(treeItem);

        treeItem.childAdded.disconnect(this.__childAdded);
        treeItem.childRemoved.disconnect(this.__childRemoved);

        for (let childItem of treeItem.getChildren()) {
            this.__childRemoved(childItem);
        }
    }
}



class SelectionRule {

    constructor() {
        this.ruleChanged = new Signal();
        this.__matchValue = "";
        this.__matchedValue = undefined;
        this.__matchType = MATCH_TYPE.EXACT;
    }

    getMatchValue() {
        return this.__matchValue;
    }

    setMatchValue(value) {
        this.__matchValue = value;
        this.__updateMatchedValue();
        this.ruleChanged.emit();
    }

    getMatchType() {
        return this.__matchType;
    }

    __updateMatchedValue() {
        // https://regex101.com/
        switch (this.__matchType) {
            case MATCH_TYPE.EXACT:
                this.__matchedValue = this.__matchValue;
                break;
            case MATCH_TYPE.CONTAINS:
            case MATCH_TYPE.REGEX:
                this.__matchedValue = new RegExp(this.__matchValue);
                break;
            case MATCH_TYPE.IGNORECASE:
                this.__matchedValue = new RegExp(`^${this.__matchValue}$`, 'i');

            case MATCH_TYPE.CONTAINS_IGNORECASE:
                this.__matchedValue = new RegExp(`${this.__matchValue}`, 'i');
                break;
            case MATCH_TYPE.FUZZY: // TODO
                break;
            case MATCH_TYPE.REGEX:
                this.__matchedValue = new RegExp(this.__matchValue);
                break;
            default:
                throw ("Unknown Match type")
        }
    }

    __testMatchedValue(value) {
        if (this.__matchedValue == undefined)
            return false;
        switch (this.__matchType) {
            case MATCH_TYPE.EXACT:
                return value == this.__matchedValue;
            case MATCH_TYPE.IGNORECASE:
            case MATCH_TYPE.CONTAINS:
            case MATCH_TYPE.CONTAINS_IGNORECASE:
            case MATCH_TYPE.REGEX:
                return this.__matchedValue.test(value);
            case MATCH_TYPE.FUZZY:
                return false; // TODO
            default:
                throw ("Unknown Match type")
        }
    }

    setMatchType(matchType) {
        this.__matchType = matchType;
        this.__updateMatchedValue();
        this.ruleChanged.emit();
    }

    apply(treeItem) {

    }
}

class NameSelectionRule extends SelectionRule {

    constructor() {
        super();
    }

    apply(treeItem) {
        return this.__testMatchedValue(treeItem.getName());
    }
}

class PropertySelectionRule extends SelectionRule {

    constructor() {
        super();
        this.__propName = "";
    }

    getPropName() {
        return this.__propName;
    }

    setPropName(name) {
        const prevname = this.__propName;
        this.__propName = name;
        this.ruleChanged.emit();
    }

    apply(treeItem) {
        if (this.__propName == "" || this.__matchedValue == undefined)
            return false;
        const prop = treeItem.getParameter(this.__propName);
        if (!prop)
            return false;
        return this.__testMatchedValue(prop.getValue());
    }
}

class SelectionSet extends SelectionSetBase {
    constructor(name = 'SelectionSet') {
        super(name)

        this.__ruleExecMode = RULES_EXEC_MODE.AUTO;
        this.__ruleCombineMode = RULES_COMBINE_MODE.AND;
        this.__rules = [];
        this.__treeItems = [];
        this.__recompute = this.__recompute.bind(this);
        this.recompute = new Signal();
    }

    getRuleExecMode() {
        return this.__ruleExecMode;
    }

    setRuleExecMode(mode) {
        if (this.__ruleExecMode == mode)
            return;
        this.__ruleExecMode = mode;

        switch (this.__ruleExecMode) {
            case RULES_EXEC_MODE.AUTO:
                this.__recompute();
            case RULES_EXEC_MODE.MANUAL:
                break;
        }
    }

    execute() {
        this.__recompute();
    }

    __recompute() {
        this.__treeItems = [];
        this.recompute.emit(this);
    }

    __addRule(rule) {

        if (this.__ruleExecMode == RULES_EXEC_MODE.AUTO) {
            // In OR mode, more rules means more recompute, so 
            // all scene items need to be checked again.
            if (this.__ruleCombineMode == RULES_COMBINE_MODE.OR || this.__rules.length == 1)
                this.__recompute();
            else {
                this.__tighten();
            }
        }

        rule.ruleChanged.connect(() => {
            if (this.__ruleExecMode == RULES_EXEC_MODE.AUTO)
                this.__recompute()
        });
        this.__rules.push(rule);

        return rule;
    }

    removeRule(index) {
        // when a rule is removed(or disabled),
        // All scene items need to be re-applied
        this.__rules.splice(index, 1);

        if (this.__ruleExecMode == RULES_EXEC_MODE.AUTO) {
            // In AND mode, less rules means more recompute, so 
            // all scene items need to be checked again.
            if (this.__ruleCombineMode == RULES_COMBINE_MODE.AND)
                this.__recompute();
            else {
                this.__tighten();
            }
        }
    }

    addRule(ruleType) {
        switch (ruleType) {
            case RULES_TYPE.NAME:
                return this.__addRule(new NameSelectionRule());
            case RULES_TYPE.PROPERTY:
                return this.__addRule(new PropertySelectionRule());
        }
    }

    __tighten() {
        for (let treeItem of this.__treeItems) {
            for (let rule of this.__rules) {
                const res = rule.apply(treeItem);
                if (res && this.__ruleCombineMode == RULES_COMBINE_MODE.AND)
                    continue;
            }

            // Some/all rules failed. Remove the item. 
            this.__treeItems.splice(index, 1);
        }
    }

    apply(treeItem) {
        // Check if the item is already in the set.
        if (this.__treeItems.indexOf(treeItem) != -1)
            return;

        for (let rule of this.__rules) {
            const res = rule.apply(treeItem);
            if (!res && this.__ruleCombineMode == RULES_COMBINE_MODE.AND)
                return;
        }

        // All/some rules passed. Add the item. 
        this.__treeItems.push(treeItem)
    }

    remove(treeItem) {
        const index = this.__treeItems.indexOf(treeItem);
        if (index != -1) {
            // Some/all rules failed. Remove the item. 
            this.__treeItems.splice(index, 1);
        }
    }

    getTreeItems() {
        return this.__treeItems;
    }

    static get RULES_EXEC_MODE() {
        return RULES_EXEC_MODE;
    }
    
    static get RULES_TYPE() {
        return RULES_TYPE;
    }

    static get MATCH_TYPE() {
        return MATCH_TYPE;
    }

    static get RULES_COMBINE_MODE() {
        return RULES_COMBINE_MODE;
    }

}


export {
    SelectionSetsRoot,
    SelectionSetFolder,
    SelectionSet
};