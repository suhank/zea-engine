import Vec2 from './Vec2.js';

class BinTreeRectBorder {
    constructor(value, movable = false) {
        this.value = value;
        this.movable = movable;
    }
};

class BinTreeRect {
    constructor(pos, right, top) {
        this.pos = pos;
        this.right = right;
        this.top = top;
    }

    get size() {
        return new Vec2(this.right.value - this.pos.x, this.top.value - this.pos.y);
    }
};

class BinTreeNode {
    constructor(rect, rootNode = false) {
        this.rect = rect;
        this.child0 = undefined;
        this.child1 = undefined;
        this.occupied = false;
        this.rootNode = rootNode;
        if (this.rootNode) {
            this.rect.right.ownerNode = this;
            this.rect.top.ownerNode = this;
        }
    }

    insert(rectSize, closestFit = undefined) {
        if (this.child0 != undefined && this.child1 != undefined) {
            // try inserting into first child
            let res = this.child0.insert(rectSize, closestFit);
            if (res != undefined)
                return res

            // no room, insert into second.
            return this.child1.insert(rectSize, closestFit);
        } else {

            // if there's already a rectSize here, return...
            if (this.occupied) {
                return undefined;
            }
            let delta = rectSize.subtract(this.rect.size);

            // (if we're too small, return)

            // Using a custom epsilon after packing was failing on simple cases. 
            // See TestBinTree2
            let eps = 0.00001;
            if (delta.x > eps || delta.y > eps) {
                // If we can fit the cluster into the node by moving only one of the sides.
                // Check for movable sides, and if so return this as a possibility of expanding the canvas.
                if (closestFit &&
                    ((this.rect.right.movable && delta.x > 0 && delta.y <= 0) ||
                     (this.rect.top.movable && delta.y > 0 && delta.x <= 0) ||
                     (this.rect.right.movable && delta.x > 0 && this.rect.top.movable && delta.y > 0 ))) {
                    
                    // Generate a cost metric to find the node that requires 
                    // the smallest ajustment of the borders.
                    let cost = 0;
                    if (this.rect.right.movable && delta.x > 0)
                        cost += delta.x;
                    if (this.rect.top.movable && delta.y > 0)
                        cost += delta.y;

                    if (!closestFit.node || cost < closestFit.cost) {
                        closestFit.node = this;
                        closestFit.delta = delta;
                        closestFit.cost = cost;
                    }
                }
                return undefined;
            }

            // if we're just right, accept..
            if (Math.abs(delta.x) < eps && Math.abs(delta.y) < eps) {
                if(this.rect.top.movable){
                    this.sliceHorizontal(this.rect.top.value);
                    this.child0.setOccupied();
                    return this.child0;
                }
                if(this.rect.right.movable){
                    this.sliceVertical(this.rect.right.value);
                    this.child0.setOccupied();
                    return this.child0;
                }
                this.setOccupied();
                return this;
            }

            // otherwise, gotta split this node and create some kids
            if (delta.x < delta.y)
                this.sliceVertical(this.rect.pos.x + rectSize.x);
            else
                this.sliceHorizontal(this.rect.pos.y + rectSize.y);

            return this.child0.insert(rectSize, closestFit);
        }
    }

    setOccupied() {
        this.occupied = true;
    }

    sliceVertical(xDivisor) {
        let child0rect = new BinTreeRect(this.rect.pos, new BinTreeRectBorder(xDivisor), this.rect.top);
        let child1rect = new BinTreeRect(new Vec2(xDivisor, this.rect.pos.y), this.rect.right, this.rect.top);
        this.child0 = new BinTreeNode(child0rect);
        this.child1 = new BinTreeNode(child1rect);
    }

    sliceHorizontal(yDivisor) {
        let child0rect = new BinTreeRect(this.rect.pos, this.rect.right, new BinTreeRectBorder(yDivisor));
        let child1rect = new BinTreeRect(new Vec2(this.rect.pos.x, yDivisor), this.rect.right, this.rect.top);
        this.child0 = new BinTreeNode(child0rect);
        this.child1 = new BinTreeNode(child1rect);
    }

    resizeAndInsert(rectSize, delta) {
        if (delta.x > 0 && this.rect.right.movable && delta.y > 0 && this.rect.top.movable) {
            this.rect.right.value += delta.x;
            this.rect.top.value += delta.y;
            this.sliceVertical(this.rect.right.value);
            this.child0.sliceHorizontal(this.rect.top.value);
            this.child0.child0.setOccupied();
            return this.child0.child0;
        }
        else if (delta.x > 0 && this.rect.right.movable){
            this.rect.right.value += delta.x;
            this.sliceVertical(this.rect.right.value);
            let res = this.child0.insert(rectSize);
            if (res == undefined)
                console.log("We should fit now~!!");
            return res;
        }
        else if (delta.y > 0 && this.rect.top.movable) {
            this.rect.top.value += delta.y;
            this.sliceHorizontal(this.rect.top.value);
            let res = this.child0.insert(rectSize);
            if (res == undefined)
                console.log("We should fit now~!!");
            return res;
        }
        else {
            throw ("Why are we here!!");
        }
    }
};

export {
    BinTreeRect,
    BinTreeRectBorder,
    BinTreeNode
};

export default BinTreeNode;
