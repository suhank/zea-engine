<a name="Tests for `RGBA` Class"></a>

### Tests for RGBA Class

Use this code to guide yourself on how to implement this class.
```javascript
import { RGBA } from './RGBA'

describe('RGBA', () => {
  it('creates RGBA from buffer', () => {
    const uInt8Array = Uint8Array.of(255, 20, 150, 1)
    const rgba = RGBA.createFromBuffer(uInt8Array.buffer, 0)

    expect(rgba).toEqual(new RGBA(255, 20, 150, 1))
  })
})

```