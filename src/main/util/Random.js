"use strict";

/**
 * Random seed.
 * 
 * @type Number
 */
let s = 0x5eac;

/**
 * Pseudorandom number generator.
 *
 * @example const a = Random.range(123);
 * @example assert(0 <= n && n < 123);
 * @memberof util
 */
class Random
{
    /**
     * Seeds the pseudorandom number generator.
     *
     * @param {Number} seed the next pseudorandom number generator seed.
     */
    static seed(seed)
    {
        s = seed >>> 0;
    }

    /**
     * Generates the next pseudorandom integer.
     *
     * Uses a 32-bit Xorshift PNRG as described by George Marsaglia.
     * @see http://excamera.com/sphinx/article-xorshift.html
     *
     * @param {Number} max the maximum integer to generate, exclusive.
     * @returns {Number} the next pseudorandom unsigned integer from 0 to max.
     */
    static range(max)
    {
        s ^= s << 13;
        s ^= s >>> 17;
        s ^= s << 5;
        return s % max;
    }
}

module.exports = Random;