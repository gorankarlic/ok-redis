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
     */
    connect()
    {
        this._client.connect();
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
        this._client.quit(done);
    }
}

module.exports = RedisCluster;