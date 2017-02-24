
    function Writer(initialSize) {
      if (initialSize == null) {
        initialSize = 1024;
      }
      this.buffer = new ArrayBuffer(initialSize);
      this.view = new DataView(this.buffer);
      this.offset = 0;
    }

    Writer.prototype.checkSize = function(bytesToWrite) {
      var remaining;
      remaining = this.buffer.byteLength - this.offset;
      if (remaining < bytesToWrite) {
        return this.enlarge(bytesToWrite - remaining);
      }
    };

    Writer.prototype.enlarge = function(minimum) {
      var dst, newBuffer, newSize, src;
      newSize = Math.max(this.buffer.byteLength * 2, this.buffer.byteLength + minimum * 2);
      newBuffer = new ArrayBuffer(newSize);
      src = new Uint8Array(this.buffer);
      dst = new Uint8Array(newBuffer);
      dst.set(src);
      this.buffer = newBuffer;
      return this.view = new DataView(this.buffer);
    };

    Writer.prototype.uint8 = function(value) {
      this.checkSize(1);
      this.view.setUint8(this.offset, value, true);
      return this.offset += 1;
    };

    Writer.prototype.int8 = function(value) {
      this.checkSize(1);
      this.view.setInt8(this.offset, value, true);
      return this.offset += 1;
    };

    Writer.prototype.uint16 = function(value) {
      this.checkSize(2);
      this.view.setInt16(this.offset, value, true);
      return this.offset += 2;
    };

    Writer.prototype.int16 = function(value) {
      this.checkSize(2);
      this.view.setUint16(this.offset, value, true);
      return this.offset += 2;
    };

    Writer.prototype.uint32 = function(value) {
      this.checkSize(4);
      this.view.setUint32(this.offset, value, true);
      return this.offset += 4;
    };

    Writer.prototype.int32 = function(value) {
      this.checkSize(4);
      this.view.setInt32(this.offset, value, true);
      return this.offset += 4;
    };

    Writer.prototype.float32 = function(value) {
      this.checkSize(4);
      this.view.setFloat32(this.offset, value, true);
      return this.offset += 4;
    };

    Writer.prototype.float64 = function(value) {
      this.checkSize(8);
      this.view.setFloat64(this.offset, value, true);
      return this.offset += 8;
    };

    Writer.prototype.getBuffer = function() {
      return this.buffer.slice(0, this.offset);
    };

    function Reader(buffer) {
      this.buffer = buffer;
      this.view = new DataView(buffer);
      this.offset = 0;
    }

    Reader.prototype.uint8 = function() {
      var value;
      value = this.view.getUint8(this.offset, true);
      this.offset += 1;
      return value;
    };

    Reader.prototype.uint8array = function(length) {
      var value;
      value = new Uint8Array(this.buffer, this.offset, length);
      this.offset += length;
      return value;
    };

    Reader.prototype.int8 = function() {
      var value;
      value = this.view.getInt8(this.offset, true);
      this.offset += 1;
      return value;
    };

    Reader.prototype.int8array = function(length) {
      var value;
      value = new Int8Array(this.buffer, this.offset, length);
      this.offset += length;
      return value;
    };

    Reader.prototype.uint16 = function() {
      var value;
      value = this.view.getUint16(this.offset, true);
      this.offset += 2;
      return value;
    };

    Reader.prototype.uint16array = function(length) {
      var padding, value;
      padding = this.offset % 2;
      this.offset += padding;
      value = new Uint16Array(this.buffer, this.offset, length);
      this.offset += length * 2;
      return value;
    };

    Reader.prototype.int16 = function() {
      var value;
      value = this.view.getInt16(this.offset, true);
      this.offset += 2;
      return value;
    };

    Reader.prototype.int16array = function(length) {
      var padding, value;
      padding = this.offset % 2;
      this.offset += padding;
      value = new Int16Array(this.buffer, this.offset, length);
      this.offset += length * 2;
      return value;
    };

    Reader.prototype.uint32 = function() {
      var value;
      value = this.view.getUint32(this.offset, true);
      this.offset += 4;
      return value;
    };

    Reader.prototype.uint32array = function(length) {
      var padding, value;
      padding = (4 - (this.offset % 4)) % 4;
      this.offset += padding;
      value = new Uint32Array(this.buffer, this.offset, length);
      this.offset += length * 4;
      return value;
    };

    Reader.prototype.int32 = function() {
      var value;
      value = this.view.getInt32(this.offset, true);
      this.offset += 4;
      return value;
    };

    Reader.prototype.int32array = function(length) {
      var padding, value;
      padding = (4 - (this.offset % 4)) % 4;
      this.offset += padding;
      value = new Int32Array(this.buffer, this.offset, length);
      this.offset += length * 4;
      return value;
    };

    Reader.prototype.float32 = function() {
      var value;
      value = this.view.getFloat32(this.offset, true);
      this.offset += 4;
      return value;
    };

    Reader.prototype.float32array = function(length) {
      var padding, value;
      padding = (4 - (this.offset % 4)) % 4;
      this.offset += padding;
      value = new Float32Array(this.buffer, this.offset, length);
      this.offset += length * 4;
      return value;
    };

    Reader.prototype.float64 = function() {
      var value;
      value = this.view.getFloat64(this.offset, true);
      this.offset += 8;
      return value;
    };

    Reader.prototype.float64array = function(length) {
      var padding, value;
      padding = (8 - (this.offset % 8)) % 8;
      this.offset += padding;
      value = new Float64Array(this.buffer, this.offset, length);
      this.offset += length * 8;
      return value;
    };

    Reader.prototype.arraybuffer = function(length) {
      var result;
      result = this.buffer.slice(this.offset, this.offset + length);
      this.offset += length;
      return result;
    };

export {
    Writer,
    Reader
};
