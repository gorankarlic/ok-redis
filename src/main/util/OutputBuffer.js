"use strict";

/**
 * Output buffer with position, mark and automatic reallocation.
 *
 * @example const out = new OutputBuffer(Buffer.alloc(1));
 * @example const n = out.p(4);
 * @example out.b.writeUInt32LE(123, n);
 * @example assert.strictEqual(out.buffer().length, 4);
 * @example assert.strictEqual(out.buffer().readUInt32LE(0), 123);
 */
class OutputBuffer
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Buffer} b the underlying buffer.
     */
    constructor(b)
    {
        this.b = b;
        this.l = b.length;
        this.m = 0;
        this.n = 0;
    }

    /**
     * Rellocates the buffer if neccessary, resizing it to the next power of 2.
     *
     * @public
     * @description use this method to hint the writer of the required size.
     * @param {Number} q the minimum size for the buffer.
     */
    alloc(q)
    {
        if(q > this.l)
        {
            this.realloc(q);
        }
    };

    /**
     * Returns the slice of the underlying buffer from mark to the current position.
     *
     * @public
     * @returns {Buffer} the written portion of the underlying buffer.
     */
    buffer()
    {
        return this.b.slice(this.m, this.n);
    };

    /**
     * Indicates if the buffer contains data, i. e. the current position is beyond
     * the marked position.
     *
     * @public
     * @returns {Boolean} true if the buffer contains data.
     */
    hasRemaining()
    {
        return this.n > this.m;
    };

    /**
     * Advances the buffer position by the specified number of bytes.
     *
     * @public
     * @param {Number} n the number of bytes to advance.
     * @returns {Number} the current buffer position.
     */
    p(n)
    {
        let p = this.n;
        let q = p + n;
        if(q > this.l)
        {
            this.realloc(q);
        }
        this.n = q;
        return p;
    };

    /**
     * Reallocates the buffer, resizing it to the next power of 2.
     *
     * @private
     * @param {Number} q the minimum size for the buffer.
     */
    realloc(q)
    {
        let len = 1 << (32 - Math.clz32(q));
        let b = Buffer.alloc(len);
        this.b.copy(b, 0, 0, this.n);
        this.b = b;
        this.l = len;
    };

    /**
     * Gets the number of remaining bytes, i. e. the distance between the marked
     * position and the current position.
     *
     * @public
     * @returns {Number} the number of remaining bytes.
     */
    remaining()
    {
        return this.n - this.m;
    };

    /**
     * Marks the current buffer position.
     *
     * @public
     */
    mark()
    {
        this.m = this.n;
    };

    /**
     * Resets the buffer position and mark to zero.
     *
     * @public
     */
    reset()
    {
        this.m = 0;
        this.n = 0;
    }
}

module.exports = OutputBuffer;