"use strict";

/**
 * Redis protocol buffer.
 */
class RespBuffer
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Buffer} b the buffer to read from.
     */
    constructor(b)
    {
        this.b = b;
        this.p = 0;
    }

    /**
     * Finds the next CRLF.
     *
     * 1. CR not found, at least 2 bytes needed.
     * 2. CR found, expect LF, 1 byte needed.
     * 3. LF found, no further bytes needed.
     *
     * @param {Boolean} cr indicates if CR was the last character read.
     * @returns {Number} the minimum number of bytes needed to finish reading.
     */
    findCRLF(cr)
    {
        let f = cr;
        let p = this.p;
        let b = this.b;
        let len = b.length;
        while(p < len)
        {
            let char = b[p++];
            if(char === 0x0D)
            {
                f = true;
            }
            else if(f)
            {
                if(char === 0x0A)
                {
                    this.p = p;
                    return 0;
                }
                else
                {
                    f = false;
                }
            }
        }
        this.p = p;
        return f ? 1 : 2;
    }

    /**
     * Determines if the buffer has any remaining bytes.
     *
     * @returns {Boolean} indicates if the buffer has any remaining bytes.
     */
    hasRemaining()
    {
        return this.p < this.b.length;
    }

    /**
     * Reads the a byte from the buffer and advances the buffer position by one.
     *
     * @returns {Number} the next byte in the buffer.
     */
    readNext()
    {
        return this.b[this.p++];
    }

    /**
     * Determines the number of remaining bytes that can be read.
     *
     * @returns {Number} the number of remaining bytes that can be read.
     */
    remaining()
    {
        return this.b.length - this.p;
    }

    /**
     * Replaces the buffer.
     *
     * @param {Buffer} buffer the new buffer to use.
     */
    replace(buffer)
    {
        this.b = buffer;
        this.p = 0;
    }
}

module.exports = RespBuffer;