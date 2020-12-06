import { EventEmitter } from './EventEmitter'

/**
 * An Allocation1D represents an allocated block of memory.
 *
 */
class Allocation1D {
  /**
   * Initializes the allocation
   * @param {number} size - The size of the allocated block of memory.
   * @param {number} start - The start of the allocated block of memory.
   */
  constructor(size = 0, start = 0) {
    this.size = size
    this.start = start
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
    this.reservedSpace = 0
    this.freeSpace = 0
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
    if (this.allocationsMap[id]) {
      const index = this.allocationsMap[id]
      const allocation = this.allocations[index]
      // Resizing smaller
      if (size == allocation.size) {
        return allocation
      } else if (size < allocation.size) {
        // Split this block into 2. We use the first one for our item, and the second is put on the free list.
        const splitBlockSize = allocation.size - size
        this.allocations.splice(index + 1, 0, new Allocation1D(allocation.start + size, splitBlockSize))
        this.freeList.push(index + 1)
        this.freeSpace += splitBlockSize
        allocation.size = size

        return allocation
      } else {
        // Try to consume any free blocks directly to our right.
        let freeMemoryToTheRight = 0
        let nextIndex = index + 1
        while (this.freeList.includes(nextIndex)) {
          freeMemoryToTheRight += this.allocations[this.freeList].size
          nextIndex++
          if (allocation.size + freeMemoryToTheRight >= size) {
            break
          }
        }
        if (allocation.size + freeMemoryToTheRight >= size) {
          let consumed = 0
          for (let i = index + 1; i < nextIndex; i++) {
            if (i < nextIndex - 1 || allocation.size + freeMemoryToTheRight == size) {
              // consume this free block
              consumed += this.allocations[i].size
              this.freeList.splice(this.freeList.indexOf(i), 1)
              this.allocations.splice(i, 1)
            } else {
              // We want to shrink the last block
              const prevAllocation = this.allocations[i]
              prevAllocation.start += size - consumed
              prevAllocation.size -= size - consumed
            }
          }
        } else {
          // free up this slot an find a  new one
          this.freeList.push(index)
          delete this.allocationsMap[id]
          this.freeSpace += this.allocations[id].size
        }
      }
    }

    let freeItemIndex = -1
    this.freeList.some((index) => {
      const allocation = this.allocations[index]
      if (allocation.size == size) {
        freeItemIndex = index
        return true
      } else if (allocation.size > size) {
        freeItemIndex = index
        return false // keep looking for a better match
      } else {
        return false
      }
    })

    if (freeItemIndex != -1) {
      const freeItem = this.allocations[freeItemIndex]
      this.freeSpace -= freeItem.size
      this.freeList.splice(freeItemIndex, 1)
      if (freeItem.size > size) {
        // Split this block into 2. We use the first one for our item, and the second is put on the free list.
        const splitBlockSize = freeItem.size - size
        this.allocations.splice(freeItemIndex + 1, 0, new Allocation1D(freeItem.start + size, splitBlockSize))
        this.freeList.push(freeItemIndex + 1)
        this.freeSpace += splitBlockSize

        // sort the free list from biggest to smallest
        this.freeList.sort((a, b) => this.allocations[a].size < this.allocations[b].size)

        this.allocations[freeItemIndex].size = size
      }
      this.allocationsMap[id] = freeItemIndex
    } else {
      const start = this.reservedSpace
      const index = this.allocations.length
      this.reservedSpace += size
      this.emit('resized', { reservedSpace: this.reservedSpace })
      this.allocations.push(new Allocation1D(start, size))
      this.allocationsMap[id] = index
    }
    return this.allocations[id]
  }

  /**
   * Deallocate space for an existing item, making it free for other uses.
   *
   * @param {number} id - The unique numerical identifer for the block.
   */
  deallocate(id) {
    if (this.allocations[id]) {
      this.freeList.push(this.allocations[id])
      delete this.allocations[id]
    }
  }

  /**
   * Returns the ratio of fragmented memory over reserved memory.
   *
   * @return {number} The fragmentation ratio. Between 0 and some value less than 1
   */
  getFragmentation() {
    return this.freeSpace / this.reservedSpace
  }

  /**
   * Defragment the memory space reducing memory requirements.
   */
  defragment() {
    // move the freeblocks to the end of the memory so that
    // we can then reduce the memory used.
  }
}

export { Allocator1D }
