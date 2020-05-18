"use strict";

const Commands = require("./Commands");
const Deque = require("../util/Deque");

/**
 * Redis batch operation.
 */
class Batch extends Commands
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Client} client the redis client that will execute this batch.
     */
    constructor(client)
    {
        super(client);
        this._client = client;
        this._queue = new Deque();
    }

    _c(args)
    {
        this._queue.addLast(args);
    };

    exec(callback)
    {
        this._queue.addLast([0, "PING", callback]);
        this._client.commandPipeline(this._queue);
        this._queue = null;
    }
}

module.exports = Batch;
