<a name="Tests for `Mat4` Class"></a>

### Tests for Mat4 Class

Use this code to guide yourself on how to implement this class.
```javascript
import { Mat4 } from './Mat4'

describe('Mat4', () => {
  it('creates Mat4 from buffer', () => {
    const float32Array = Float32Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
    const mat4 = Mat4.createFromBuffer(float32Array.buffer, 0)

    expect(mat4).toEqual(new Mat4(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16))
  })
})

```