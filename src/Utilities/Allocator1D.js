import { EventEmitter } from './EventEmitter'
import { MathFunctions } from './MathFunctions'

/**
 * An Allocation1D represents an allocated block of memory.
 *
 */
class Allocation1D {
  /**
   * Initializes the allocation
   * @param {number} start - The start of the allocated block of memory.
   * @param {number} size - The size of the allocated block of memory.
   */
  constructor(start = 0, size = 0) {
    this.start = start
    this.size = size
  }
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
class Allocator1D extends EventEmitter {
  /**
   * Initializes the allocator ready to start work
   */
  constructor() {
    super()
    this.freeList = []
    this.allocations = []
    this.allocationsMap = {} // A mapping of id to index within the allocations list
    this.allocatedSpace = 0
    this.reservedSpace = 0
    this.freeSpace = 0
  }

  /**
   * Returns the Allocates for the given Id.
   *
   * @param {number} id - The unique numerical identifer for the block.
   * @return {Allocation1D} - The allocation
   */
  getAllocation(id) {
    return this.allocations[this.allocationsMap[id]]
  }

  /**
   * Allocates space for a new or existing item. The id is a handle that the consuming code uses to
   * track allocations.
   *
   * @param {number} id - The unique numerical identifer for the block.
   * @param {number} size - The name of the event.
   * @return {Allocation1D} - The new allocation
   */
  allocate(id, size) {
    if (this.allocationsMap[id] != undefined) {
      const index = this.allocationsMap[id]
      const allocation = this.allocations[index]
      // Resizing smaller
      if (size == allocation.size) {
        return allocation
      } else if (size < allocation.size) {
        // Split this block into 2. We use the first one for our item, and the second is put on the free list.
        const splitBlockSize = allocation.size - size
        // this.allocations.splice(index + 1, 0, new Allocation1D(allocation.start + size, splitBlockSize))
        this.addBlock(index + 1, new Allocation1D(allocation.start + size, splitBlockSize))
        this.freeBlock(index + 1)
        allocation.size = size

        return allocation
      } else {
        // Try to consume any free blocks directly to our right.
        const nextIndex = index + 1
        if (this.freeList.includes(nextIndex) && allocation.size + this.allocations[nextIndex].size >= size) {
          const freeBlock = this.allocations[nextIndex]
          if (allocation.size + freeBlock.size == size) {
            // consume this free block
            allocation.size += freeBlock.size
            this.freeSpace -= freeBlock.size
            this.freeList.splice(this.freeList.indexOf(nextIndex), 1)
            // this.allocations.splice(nextIndex, 1)
            this.removeBlock(nextIndex)
            return allocation
          } else {
            // We want to shrink the next block by the amount we consumed
            const consumed = size - allocation.size
            allocation.size += consumed
            this.freeSpace -= consumed
            freeBlock.start += consumed
            freeBlock.size -= consumed
            return allocation
          }
        } else {
          // free up this slot an find a new one
          // If the slot was at the end of the allocated memory, just decrement
          // the allocated space making it immediately available for use.
          delete this.allocationsMap[id]
          if (allocation.start + allocation.size == this.allocatedSpace) {
            this.removeBlock(index)
            this.allocatedSpace -= allocation.size
          } else {
            this.freeBlock(index)
          }
        }
      }
    }

    let freeItemIndex = -1
    for (let i = 0; i < this.freeList.length; i++) {
      const freeIndex = this.freeList[i]
      const allocation = this.allocations[freeIndex]
      if (allocation.size == size) {
        freeItemIndex = freeIndex
        break
      } else if (allocation.size > size) {
        freeItemIndex = freeIndex
      }
    }

    if (freeItemIndex != -1) {
      const freeItem = this.allocations[freeItemIndex]
      this.freeSpace -= freeItem.size
      this.freeList.splice(this.freeList.indexOf(freeItemIndex), 1)
      if (freeItem.size > size) {
        // Split this block into 2. We use the first one for our item, and the second is put on the free list.
        const splitBlockSize = freeItem.size - size
        // this.allocations.splice(freeItemIndex + 1, 0, new Allocation1D(freeItem.start + size, splitBlockSize))
        this.addBlock(freeItemIndex + 1, new Allocation1D(freeItem.start + size, splitBlockSize))
        this.freeBlock(freeItemIndex + 1)

        // sort the free list from biggest to smallest
        this.freeList.sort((a, b) => this.allocations[a].size < this.allocations[b].size)

        this.allocations[freeItemIndex].size = size
      }
      this.allocationsMap[id] = freeItemIndex
    } else {
      const start = this.allocatedSpace
      const index = this.allocations.length
      this.allocatedSpace += size
      const reserved = MathFunctions.nextPow2(this.allocatedSpace)
      if (reserved != this.reservedSpace) {
        this.reservedSpace = reserved
        this.emit('resized', { reservedSpace: this.reservedSpace })
      }
      this.allocations.push(new Allocation1D(start, size))
      this.allocationsMap[id] = index
    }
    return this.allocations[this.allocationsMap[id]]
  }

  /**
   * Adds a new block
   * @private
   *
   * @param {number} index - The index where the block should be inserted.
   * @param {Allocation1D} allocation - The allocation to insert
   */
  addBlock(index, allocation) {
    this.allocations.splice(index, 0, allocation)
    for (const id in this.allocationsMap) {
      if (this.allocationsMap[id] >= index) {
        this.allocationsMap[id]++
      }
    }
    for (let i = 0; i < this.freeList.length; i++) {
      if (this.freeList[i] >= index) {
        this.freeList[i]++
      }
    }
  }

  /**
   * Remove a new block
   * @private
   *
   * @param {number} index - The index where the block should be inserted.
   * @param {Allocation1D} allocation - The allocation to insert
   */
  removeBlock(index) {
    this.allocations.splice(index, 1)
    for (const id in this.allocationsMap) {
      if (this.allocationsMap[id] > index) {
        this.allocationsMap[id]--
      }
    }
    for (let i = 0; i < this.freeList.length; i++) {
      if (this.freeList[i] > index) {
        this.freeList[i]--
      }
    }
  }

  /**
   * Frees a block by either growing neighboring blocks or adding a new free block
   * @private
   *
   * @param {number} index - The index of the block to free.
   */
  freeBlock(index) {
    const allocation = this.allocations[index]
    this.freeSpace += allocation.size

    // check for free blocks on either side of the allocated space
    // and allow them to consume this block intead of adding a new smaller
    // block.
    const prevIndex = index - 1
    if (this.freeList.includes(prevIndex)) {
      const prevAllocation = this.allocations[prevIndex]
      prevAllocation.size += allocation.size
      this.removeBlock(index)
      return
    }

    const nextIndex = index + 1
    if (this.freeList.includes(nextIndex)) {
      const nextAllocation = this.allocations[nextIndex]
      nextAllocation.start -= allocation.size
      nextAllocation.size += allocation.size
      this.removeBlock(index)
      return
    }

    this.freeList.push(index)
  }

  /**
   * Deallocate space for an existing item, making it free for other uses.
   *
   * @param {number} id - The unique numerical identifer for the block.
   */
  deallocate(id) {
    const index = this.allocationsMap[id]
    if (index == undefined) {
      throw new Error(`allocation ${id} does not exist.`)
    }
    this.freeBlock(index)
    delete this.allocationsMap[id]
  }

  /**
   * Returns the ratio of fragmented memory over reserved memory.
   *
   * @return {number} The fragmentation ratio. Between 0 and some value less than 1
   */
  getFragmentation() {
    return this.freeSpace / this.allocatedSpace
  }

  /**
   * Defragment the memory space reducing memory requirements.
   * TODO: Implement this method.
   */
  defragment() {
    // move the freeblocks to the end of the memory so that
    // we can then reduce the memory used.
  }

  /**
   * Checks that the allocations are consistent and not corrupt in any way.
   */
  verifyConsistency() {
    if (Object.keys(this.allocationsMap).length + this.freeList.length != this.allocations.length) {
      throw new Error('number of blocks does not match the number of allocations')
    }

    // eslint-disable-next-line guard-for-in
    for (const id in this.allocationsMap) {
      const index = this.allocationsMap[id]
      if (this.freeList.includes(index)) {
        // eslint-disable-next-line no-throw-literal
        throw new Error('block of used memory is also on the free list')
      }
    }
    let size = 0
    for (let i = 0; i < this.allocations.length; i++) {
      const allocation = this.allocations[i]
      if (allocation.start != size) {
        // eslint-disable-next-line no-throw-literal
        throw 'blocks of memory are not sequential'
      }
      size += allocation.size
    }
    if (size != this.allocatedSpace) {
      // eslint-disable-next-line no-throw-literal
      throw `allocated size: ${this.allocatedSpace}  does not match allocated blocks: ${size}`
    }
    if (this.reservedSpace < this.allocatedSpace) {
      // eslint-disable-next-line no-throw-literal
      throw `reserved space: ${this.reservedSpace} is less than allocated space: ${this.allocatedSpace}`
    }
  }
}

export { Allocator1D }
