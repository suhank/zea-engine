<a name="Tests for `Box2` Class"></a>

### Tests for Box2 Class

Use this code to guide yourself on how to implement this class.
```javascript
import { Box2 } from './Box2'

describe.skip('Box2', () => {
  describe('#on', () => {
    it('needs a callback.', () => {
      const eventEmitter = new EventEmitter()

      const fn = () => {
        eventEmitter.on('fake')
      }

      expect(fn).to.throw()
    })

    it("doesn't allow duplication.", () => {
      const eventEmitter = new EventEmitter()

      const fake = sinon.fake()

      const fn = () => {
        eventEmitter.on('fake', fake)
        eventEmitter.on('fake', fake)
      }

      expect(fn).to.throw()
    })

    it('calls the listener.', () => {
      const eventEmitter = new EventEmitter()

      const fake = sinon.fake()

      const event = {
        detail: 'foo',
      }

      eventEmitter.on('fake', fake)
      eventEmitter.emit('fake', event)

      expect(fake).to.have.been.calledWith(event)
    })

    it('calls the listener multiple times.', () => {
      const eventEmitter = new EventEmitter()

      const fake = sinon.fake()

      const event = {
        detail: 'foo',
      }

      eventEmitter.on('fake', fake)
      eventEmitter.emit('fake', event)
      eventEmitter.emit('fake', event)

      expect(fake).to.have.been.calledWith(event)
    })
  })

  describe('#once', () => {
    it('calls the listener only once.', () => {
      const eventEmitter = new EventEmitter()

      const fake = sinon.fake()

      const event = {
        detail: 'foo',
      }

      eventEmitter.once('fake', fake)
      eventEmitter.emit('fake', event)
      eventEmitter.emit('fake', event)

      expect(fake).to.have.been.calledOnceWith(event)
    })
  })

  describe('#off', () => {
    it('needs a callback', () => {
      const eventEmitter = new EventEmitter()

      const fn = () => {
        eventEmitter.off('fake')
      }

      expect(fn).to.throw()
    })

    it('stops calling the listener.', () => {
      const eventEmitter = new EventEmitter()

      const fake = sinon.fake()

      const event = {
        detail: 'foo',
      }

      eventEmitter.on('fake', fake)
      eventEmitter.emit('fake', event)
      eventEmitter.off('fake', fake)
      eventEmitter.emit('fake', event)

      expect(fake).to.have.been.calledOnceWith(event)
    })

    it('fails when trying to unregister a listener that was not registered.', () => {
      const eventEmitter = new EventEmitter()

      const notRegistered = () => {}

      const fn = () => {
        eventEmitter.off('fake', notRegistered)
      }

      expect(fn).to.throw()
    })

    it('fails when trying to unregister a listener more than once.', () => {
      const eventEmitter = new EventEmitter()

      const cb = () => {}

      const fn = () => {
        eventEmitter.off('fake', cb)
        eventEmitter.off('fake', cb)
      }

      expect(fn).to.throw()
    })
  })
})

```