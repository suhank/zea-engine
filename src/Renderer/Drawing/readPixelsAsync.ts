// https://forum.babylonjs.com/t/speeding-up-readpixels/12739

import { WebGL12RenderingContext } from '../types/webgl'

function clientWaitAsync(gl: WebGL12RenderingContext, sync: WebGLSync, flags: number, interval_ms: number) {
  return new Promise<void>((resolve, reject) => {
    function test() {
      const res = gl.clientWaitSync(sync, flags, 0)
      if (res == gl.WAIT_FAILED) {
        reject()
        return
      }
      if (res == gl.TIMEOUT_EXPIRED) {
        setTimeout(test, interval_ms)
        return
      }
      resolve()
    }
    test()
  })
}

async function getBufferSubDataAsync(
  gl: WebGL12RenderingContext,
  target: number,
  buffer: WebGLBuffer,
  srcByteOffset: number,
  dstBuffer: ArrayBufferView,
  /* optional */ dstOffset: number = 0,
  /* optional */ length: number = 0
) {
  const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0)
  gl.flush()

  await clientWaitAsync(gl, sync, 0, 10)
  gl.deleteSync(sync)

  gl.bindBuffer(target, buffer)
  gl.getBufferSubData(target, srcByteOffset, dstBuffer, dstOffset, length)
  gl.bindBuffer(target, null)

  return dstBuffer
}

async function readPixelsAsync(
  gl: WebGL12RenderingContext,
  x: number,
  y: number,
  w: number,
  h: number,
  format: number,
  type: number,
  dest: ArrayBufferView
) {
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.PIXEL_PACK_BUFFER, buf)
  gl.bufferData(gl.PIXEL_PACK_BUFFER, dest.byteLength, gl.STREAM_READ)
  gl.readPixels(x, y, w, h, format, type, 0)
  gl.bindBuffer(gl.PIXEL_PACK_BUFFER, null)

  await getBufferSubDataAsync(gl, gl.PIXEL_PACK_BUFFER, buf, 0, dest)

  gl.deleteBuffer(buf)
  return dest
}

export { readPixelsAsync }
