"use strict";

const Commands = require("./Commands");
const Cluster = require("./Cluster");
const ClusterBatch = require("./ClusterBatch");

/**
 * Redis cluster client API.
 */
class RedisCluster extends Commands
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Object} opts the connection options.
     */
    constructor(opts)
    {
        super(new Cluster(opts));
    }

    /**
     * Redis command batch.
     *
     * @returns {ClusterBatch} the newly created command batch.
     */
    batch()
    {
        return new ClusterBatch(this._client);
    }

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
    }

    /**
     * Redis MULTI command queue.
     */
    multi()
    {
        throw new Error("not implemented yet");
    }

    /**
     * Redis command pipeline.
     */
    pipeline()
    {
        throw new Error("not implemented yet");
    }

    /**
     * Quits the cluster connection gracefully.
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
     * Terminates the cluster connection forcefully.
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

module.exports = RedisCluster;