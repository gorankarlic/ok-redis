"use strict";

const CRC16 = require("../util/CRC16");

/**
 * Redis hash tags.
 */
class HashTag
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        throw new Error("can not create an instance of this class");
    }

    /**
     * Gets the cluster slot for the specified key.
     *
     * @public
     * @param {Buffer|String} key the key to get the slot for.
     * @return {Number} the cluster slot for the specified key.
     */
    static slotFor(key)
    {
        return HashTag.slotForBuffer(key instanceof Buffer ? key : Buffer.from(key));
    };

    /**
     * Computes the cluster slot from the specified buffer.
     *
     * @private
     * @param {Buffer} b the buffer to get the slot for.
     * @return {Number} the cluster slot for the specified buffer.
     */
    static slotForBuffer(b)
    {
        let l = b.length;
        let p = HashTag.findChar(b, 0, l, 0x7B);
        let q;
        if(p === 0)
        {
            q = l;
        }
        else
        {
            q = HashTag.findChar(b, p, l, 0x7D);
            if(q === p)
            {
                p = 0;
                q = l;
            }
            else
            {
                q--;
            }
        }
        return CRC16.hash(b, p, q) % 16384;
    };

    /**
     * Finds the next position with the specified character.
     *
     * @private
     * @param {Buffer} b the buffer to search in.
     * @param {Number} p the position to start the search.
     * @param {Number} l the position to end the search.
     * @param {Buffer} char the character to find.
     * @return {Number} the position with the character, or the buffer length.
     */
    static findChar(b, p, l, char)
    {
        let q = p;
        while(q < l)
        {
            if(b[q++] === char)
            {
                return q;
            }
        }
        return p;
    };
}

module.exports = HashTag;