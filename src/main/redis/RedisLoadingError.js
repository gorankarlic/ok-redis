"use strict";

const RedisError = require("./RedisError");

/**
 * Redis LOADING error.
 */
class RedisLoadingError extends RedisError
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

module.exports = RedisLoadingError;