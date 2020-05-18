"use strict";

const RedisError = require("./RedisError");

/**
 * Redis TRYAGAIN error.
 */
class RedisTryAgainError extends RedisError
{
    /**
     * Creates a new instance of this class.
     *
     * @param {String} message the original Redis error message.
     */
    constructor(message)
    {
        super(message);
        this.name = this.constructor.name;
    }
}

module.exports = RedisTryAgainError;