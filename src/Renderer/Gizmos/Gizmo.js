import Color from '../../Math/Color';

class Gizmo {
    constructor(color, constantSizeOnScreen) {
        this.__drawItems = [];
        this.__proxyItem;
        this.__color = color;
        this.__constantSizeOnScreen = constantSizeOnScreen;
        this.__hilightColor = new Color(1,1,1,1);
    }

    __addDrawItem(drawItem) {
        drawItem.color = this.__color;
        this.__drawItems.push(drawItem);
    }

    __setProxyItem(proxyItem) {
        this.__proxyItem = proxyItem;
    }

    setGeomID(flags, id){
        // for (let drawItem of this.__drawItems){
        //     drawItem.setGeomID(id);
        // }
        this.__proxyItem.setGeomID(flags, id);
    }

    getProxyItem() {
        return this.__proxyItem;
    }

    getDrawItems() {
        return this.__drawItems;
    }

    getColor(){
        return this.__color;
    }

    getVisible() {
        return this.__visible;
    }

    setVisible(val) {
        this.__visible = val;
        for (let drawItem of this.__drawItems)
            drawItem.geomItem.setVisible(val);
        this.__proxyItem.geomItem.setVisible(val);
    }

    highlight(){
        for (let drawItem of this.__drawItems){
            drawItem.color = this.__hilightColor;
        }
    };
    
    unhighlight(){
        for (let drawItem of this.__drawItems){
            drawItem.color = this.__color;
        }
    };

    onDragStart(event, mousePos, viewport) {}

    onDrag(event, mouseDelta, viewport) {}

    onDragEnd(event, mouseDelta, viewport) {}

};

export {
    Gizmo
};
// export default Gizmo;