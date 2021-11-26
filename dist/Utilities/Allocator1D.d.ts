import { EventEmitter } from './EventEmitter';
/**
 * An Allocation1D represents an allocated block of memory.
 *
 */
declare class Allocation1D {
    start: number;
    size: number;
    /**
     * Initializes the allocation
     * @param start - The start of the allocated block of memory.
     * @param size - The size of the allocated block of memory.
     */
    constructor(start?: number, size?: number);
}
/**
 * An 1D allocator is used to manage packing multiple smaller blocks of data
 * into a single large block of memory, supporting resizing and re-allocating.
 * As allocations are changed, fragmentation occurs as blocks must be moved
 *
 * Example:
 * ```javascript
 * const allocator = new Allocator1D()
 *
 * let memory = new Uint32Array(25)
 * allocator.on('resize', () => {
 *   memory = new Uint32Array(allocator.reservedSpace)
 * })
 * allocator.on('dataReallocated', (event) => {
 *   // during allocation, a defragment might occur, which means
 *   // we need to reload some of our data.
 * })
 *
 * allocator.allocate(1, 5)
 * allocator.allocate(2, 10)
 * allocator.allocate(3, 10)
 * allocator.allocate(4, 20)
 * allocator.allocate(3, 20) // resize 3 to grow the allocated space.
 * allocator.allocate(1, 7) // resize 1 to fit into the previous space of 3, leaving a new free block.
 * allocator.allocate(1, 10) // resize 1 to fit into the previous space of 3, consuming the free block.
 * ```
 *
 */
declare class Allocator1D extends EventEmitter {
    freeList: any[];
    allocations: any[];
    allocationsMap: Record<number, number>;
    allocatedSpace: number;
    reservedSpace: number;
    freeSpace: number;
    /**
     * Initializes the allocator ready to start work
     */
    constructor();
    /**
     * Returns the Allocates for the given Id.
     *
     * @param id - The unique numerical identifer for the block.
     * @return - The allocation
     */
    getAllocation(id: number): Allocation1D;
    /**
     * Allocates space for a new or existing item. The id is a handle that the consuming code uses to
     * track allocations.
     *
     * @param id - The unique numerical identifer for the block.
     * @param size - The name of the event.
     * @return - The new allocation
     */
    allocate(id: number, size: number): Allocation1D;
    /**
     * Adds a new block
     * @private
     *
     * @param index - The index where the block should be inserted.
     * @param allocation - The allocation to insert
     */
    addBlock(index: number, allocation: Allocation1D): void;
    /**
     * Remove a new block
     * @private
     *
     * @param index - The index where the block should be removed
     */
    removeBlock(index: number): void;
    /**
     * Frees a block by either growing neighboring blocks or adding a new free block
     * @private
     *
     * @param index - The index of the block to free.
     */
    freeBlock(index: number): void;
    /**
     * Deallocate space for an existing item, making it free for other uses.
     *
     * @param id - The unique numerical identifer for the block.
     */
    deallocate(id: number): void;
    /**
     * Returns the ratio of fragmented memory over reserved memory.
     *
     * @return The fragmentation ratio. Between 0 and some value less than 1
     */
    getFragmentation(): number;
    /**
     * Defragment the memory space reducing memory requirements.
     * TODO: Implement this method.
     */
    defragment(): void;
    /**
     * Checks that the allocations are consistent and not corrupt in any way.
     */
    verifyConsistency(): void;
}
export { Allocator1D, Allocation1D };
