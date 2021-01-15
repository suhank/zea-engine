/* eslint-disable @typescript-eslint/no-empty-function */
import { EventEmitter } from './EventEmitter'

describe('EventEmitter', () => {
  it("doesn't allow duplication.", () => {
    const eventEmitter = new EventEmitter()

    const cb = () => {}

    expect(() => {
      eventEmitter.on('fake', cb)
      eventEmitter.on('fake', cb)
    }).toThrow()
  })

  it('calls the listener at least once.', () => {
    const eventEmitter = new EventEmitter()

    const mockFn = jest.fn()

    const event = {
      detail: 'foo',
    }

    eventEmitter.on('fake', mockFn)
    eventEmitter.emit('fake', event)

    expect(mockFn).toHaveBeenCalledWith(event)
  })

  it('calls the listener more than once.', () => {
    const eventEmitter = new EventEmitter()

    const mockFn = jest.fn()

    const event = {
      detail: 'foo',
    }

    eventEmitter.on('fake', mockFn)
    eventEmitter.emit('fake', event)
    eventEmitter.emit('fake', event)

    expect(mockFn).toHaveBeenCalledTimes(2)
  })

  it('calls the listener only once.', () => {
    const eventEmitter = new EventEmitter()

    const mockFn = jest.fn()

    const event = {
      detail: 'foo',
    }

    eventEmitter.once('fake', mockFn)
    eventEmitter.emit('fake', event)
    eventEmitter.emit('fake', event)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('stops calling the listener.', () => {
    const eventEmitter = new EventEmitter()

    const mockFn = jest.fn()

    const event = {
      detail: 'foo',
    }

    eventEmitter.on('fake', mockFn)
    eventEmitter.emit('fake', event)
    eventEmitter.off('fake', mockFn)
    eventEmitter.emit('fake', event)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('fails when trying to unregister a listener that was not registered.', () => {
    const eventEmitter = new EventEmitter()

    const notRegistered = () => {}

    const fn = () => {
      eventEmitter.off('fake', notRegistered)
    }

    expect(fn).toThrow()
  })

  it('fails when trying to unregister a listener more than once.', () => {
    const eventEmitter = new EventEmitter()

    const cb = () => {}

    const fn = () => {
      eventEmitter.off('fake', cb)
      eventEmitter.off('fake', cb)
    }

    expect(fn).toThrow()
  })
})
