"use strict";

const Batch = require("./Batch");

/**
 * Redis MULTI batch operation.
 */
class Multi extends Batch
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Client} client the redis client that will execute this batch.
     */
    constructor(client)
    {
        super(client);
    }

    _exec(callback)
    {
        this._queue.addFirst([0, "MULTI"]);
        this._queue.addLast([0, "EXEC", callback]);
        this._client.commandPipeline(this._queue);
    }
}

module.exports = Multi;