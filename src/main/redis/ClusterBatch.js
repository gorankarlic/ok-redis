"use strict";

const Batch = require("./Batch");
const RespWriter = require("./RespWriter");

/**
 * Redis cluster batch operation.
 */
class ClusterBatch extends Batch
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Cluster} client the redis client that will execute this batch.
     */
    constructor(client)
    {
        super(client);
        this._rw = 0;
        this._slot = -1;
    }

    _c(args)
    {
        const type = args[0];
        const index = type & 0xF;
        this._queue.addLast(args);
        this._rw |= type >>> 4;
        if(this._slot === -1 && index !== 0)
        {
            this._slot = RespWriter.slotFromArgs(args, index);
        }
    }

    exec(callback)
    {
        this._queue.addLast([0, "PING", callback]);
        this._client.commandPipeline(this._queue, this._slot, this._rw);
        this._queue = null;
    }
}

module.exports = ClusterBatch;