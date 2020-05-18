"use strict";

/**
 * Generic Redis error.
 */
class RedisError extends Error
{
    /**
     * Creates a new instance of this class.
     *
     * @param {String} message the error message. 
     */
    constructor(message)
    {
        super(message);
        this.name = this.constructor.name;
    }
}

module.exports = RedisError;