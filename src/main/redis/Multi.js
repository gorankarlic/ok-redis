"use strict";

const Commands = require("./Commands");
const Deque = require("../util/Deque");

/**
 * Redis MULTI batch operation.
 */
class Multi extends Commands
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
    }

    _cc(args)
    {
        this._queue.addLast(args);
    }

    _cp(args)
    {
        this._queue.addLast(args);
    }

    exec(callback)
    {
        if(callback === void null)
        {
            return new Promise((resolve, reject) =>
            {
                this._queue.addFirst([0, "MULTI"]);
                this._queue.addLast([0, "EXEC", (err, result) => err === null ? resolve(result) : reject(err)]);
                this._client.commandPipeline(this._queue);
            });
        }
        else
        {
            this._queue.addFirst([0, "MULTI"]);
            this._queue.addLast([0, "EXEC", callback]);
            this._client.commandPipeline(this._queue);
        }
    }
}

module.exports = Multi;