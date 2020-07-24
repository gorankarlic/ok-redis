"use strict";

const Batch = require("./Batch");
const Client = require("./Client");
const Commands = require("./Commands");
const Multi = require("./Multi");
const Pipeline = require("./Pipeline");

/**
 * Redis client API.
 */
class RedisClient extends Commands
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Object} opts the connection options.
     */
    constructor(opts)
    {
        super(new Client(opts));
    }

    /**
     * Redis batch command.
     *
     * @returns {Batch} the newly created command batch.
     */
    batch()
    {
        return new Batch(this._client);
    };

    /**
     * Connects the client.
     *
     * @param {Function} done the function to call when connected.
     */
    connect(done)
    {
        if(done === void null)
        {
            return new Promise((resolve, reject) => this._client.connect((err, result) => err === null ? resolve(result) : reject(err)));
        }
        else
        {
            this._client.connect(done);
        }
    };

    /**
     * Redis MULTI command queue.
     *
     * @returns {Multi} the newly created multi batch.
     */
    multi()
    {
        return new Multi(this._client);
    };

    /**
     * Redis command pipeline.
     *
     * @returns {Pipeline} the newly created multi batch.
     */
    pipeline()
    {
        return new Pipeline(this._client);
    }

    /**
     * Quits the client connection gracefully.
     *
     * @see http://redis.io/commands/quit
     * @param {Function} done the function to call when the client quits.
     */
    quit(done)
    {
        if(done === void null)
        {
            return new Promise((resolve, reject) => this._client.quit((err, result) => err === null ? resolve(result) : reject(err)));
        }
        else
        {
            this._client.quit(done);
        }
    }
    /**
     * Terminates the client connection forcefully.
     *
     * @param {Function} done the function to call when the connection terminates.
     */
    terminate(done)
    {
        if(done === void null)
        {
            return new Promise((resolve, reject) => this._client.terminate((err, result) => err === null ? resolve(result) : reject(err)));
        }
        else
        {
            this._client.terminate(done);
        }
    }
}

module.exports = RedisClient;