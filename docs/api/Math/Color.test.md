<a name="Tests for `Color` Class"></a>

### Tests for Color Class

Use this code to guide yourself on how to implement this class.
```javascript
import { Color } from './Color'

describe('Color', () => {
  it('creates Color from buffer', () => {
    const float32Array = Float32Array.of(255, 200, 30, 24)
    const color = Color.createFromBuffer(float32Array.buffer, 0)

    expect(color).toEqual(new Color(255, 200, 30, 24))
  })
})

```