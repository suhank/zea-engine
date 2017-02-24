
/*
Unused so far...
class GLFileTexture extends GLTexture2D {
    constructor(gl, texture) {
        super(gl);
        this.__texture = texture;
        if (this.__texture.isLoaded()) {
            this.__onLoaded();
        }
        else {
            this.__texture.loaded.connect(this.__onLoaded, this);
        }
    }

    __onLoaded() {
        this.__configure({
            'width': this.__texture.width,
            'height': this.__texture.height,
            'channels': this.__texture.channels,
            'format': this.__texture.format,
            'filter': this.__texture.filter,
            'wrap': this.__texture.wrap,
            'flipY': this.__texture.flipY
        });

        this.__loaded = true;
        this.updated.emit();
    }
}
*/