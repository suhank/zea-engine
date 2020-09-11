<a name="Tests for `Quat` Class"></a>

### Tests for Quat Class

Use this code to guide yourself on how to implement this class.
```javascript
import { Quat } from './Quat'

describe('Quat', () => {
  it('creates Quat from buffer', () => {
    const float32Array = Float32Array.of(1, 0, 0, 0)
    const quat = Quat.createFromBuffer(float32Array.buffer, 0)

    expect(quat).toEqual(new Quat(1, 0, 0, 0))
  })
})

```