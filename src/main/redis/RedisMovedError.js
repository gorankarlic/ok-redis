"use strict";

const RedisError = require("./RedisError");

/**
 * Redis cluster MOVED error.
 */
class RedisMovedError extends RedisError
{
    /**
     * Creates a new instance of this class.
     *
     * @param {String} message the original Redis error message.
     * @param {Number} slot the cluster slot that has moved.
     * @param {String} host the node host name.
     * @param {Number} port the node port number.
     */
    constructor(message, slot, host, port)
    {
        super(message);
        this.name = this.constructor.name;
        this.slot = slot;
        this.host = host;
        this.port = port;
    }
}

module.exports = RedisMovedError;