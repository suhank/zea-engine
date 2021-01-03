import { Allocator1D } from './Allocator1D'

describe('Allocator1D', () => {
  it('Simple allocation.', () => {
    const allocator = new Allocator1D()

    allocator.allocate(0, 3)
    allocator.allocate(1, 5)

    expect(allocator.reservedSpace).toEqual(8)
  })

  it('Simple reallocation.', () => {
    const allocator = new Allocator1D()

    allocator.allocate(0, 3)
    allocator.allocate(1, 5)
    allocator.allocate(0, 5)

    expect(allocator.freeSpace).toEqual(3)
    expect(allocator.reservedSpace).toEqual(16)
  })

  it('Grow allocation.', () => {
    const allocator = new Allocator1D()

    allocator.allocate(0, 3)
    allocator.allocate(1, 2)
    allocator.allocate(2, 2)
    allocator.allocate(3, 1)
    // re-allocated 2 and 1, moving it to the end of the block and leaving a free block behind.
    allocator.allocate(2, 3)
    allocator.allocate(1, 7) // This will cause block 1 to be freed and grow into block 2

    // Now grow id 0 to fill the subsequent free space left by resizing 1 and 2.
    // The last fee item will be resized to contain the remaining memory.
    // (3 + 2 + 2 - 6 = 1)
    // Block 0 will totally consume block 1 and partially consume block 1.
    allocator.allocate(0, 6)

    expect(allocator.freeSpace).toEqual(1)
    expect(allocator.reservedSpace).toEqual(32)
  })

  it('Grow reallocation.', () => {
    const allocator = new Allocator1D()

    allocator.allocate(0, 3)
    allocator.allocate(1, 2)
    allocator.allocate(2, 1)

    allocator.allocate(0, 4) // move block to a new bigger slot
    allocator.allocate(1, 4) // move block 1 back into the slot left by block id 0 and then grow it into the bigger hole

    expect(allocator.freeSpace).toEqual(1)
    expect(allocator.reservedSpace).toEqual(16)
  })
})
