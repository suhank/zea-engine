import { BaseClass } from '../Utilities/BaseClass';
import { EventEmitter } from '../Utilities/index';
/** Class representing a ref counted object. RefCounted
 *  objects track ownership and allow explicit cleanup
 *  of resources. This is necessary when JavaScript
 *  objects own references to GPU resources that need to
 *  be cleaned up when the JavaScript object is destroyed.
 * @private
 */
declare class RefCounted extends EventEmitter {
    protected __refs: BaseClass[];
    protected __destroyed: boolean;
    /**
     * Create a ref counted object.
     */
    constructor();
    /**
     * Returns the unique id of the object. Every Object has a unique
     * identifier which is based on a counter that is incremented.
     * @return - The return value.
     */
    getId(): number;
    /**
     * The numRefs method.
     * @return - The return value.
     */
    numRefs(): number;
    /**
     * The addRef method.
     * @param referer - The referer value.
     * @return - The return value.
     */
    addRef(referer: BaseClass): boolean;
    /**
     * The removeRef method.
     * @param referer - The referer value.
     */
    removeRef(referer: BaseClass): void;
    /**
     * The getRefer method.
     * @param index - The index value.
     * @return - The return value.
     */
    getRefer(index: number): BaseClass;
    /**
     * The getRefIndex method.
     * @param referer - The referer value.
     * @return - The return value.
     */
    getRefIndex(referer: BaseClass): number;
    /**
     * Returns true if this object has already been destroyed.
     * @return - Returns true or false.
     */
    isDestroyed(): boolean;
    /**
     * The destroy method is invoked when the last owner
     * is removed from a RefCounted object. Derived objects can
     * override this method to perform explicit cleanup.
     * The destructing signal is triggered so observers can
     * respond to this objects destruction.
     */
    destroy(): void;
}
export { RefCounted };
