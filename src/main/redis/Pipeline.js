"use strict";

const Batch = require("./Batch");
const RespWriter = require("./RespWriter");

/**
 * Redis pipeline operation.
 */
class Pipeline extends Batch
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Client} client the redis client that will execute this batch.
     */
    constructor(client)
    {
        super(client);
        this._callback = this._reply.bind(this);
        this._errors = null;
        this._replies = [];
    }

    /**
     * Runs the command with the specified arguments within this batch.
     *
     * @param {Array} args the command arguments.
     */
    _c(args)
    {
        const callback = RespWriter.callbackFromArgs(args);
        if(callback === void(null))
        {
            args.push(this._callback);
        }
        else
        {
            args[args.length - 1] = (err, result) =>
            {
                callback(err, result);
                this._reply(err, result);
            };
        }
        this._queue.addLast(args);
    }

    _exec(callback)
    {
        this._queue.addLast([0, "PING", () =>
        {
            callback(this._error, this._replies);
            this._error = null;
            this._replies = null;
        }]);
        this._client.commandPipeline(this._queue);
        this._queue = null;
    }

    /**
     * Called when a single batch command replies.
     *
     * @param {Error} err any error that occured.
     * @param {Object} reply the command reply.
     */
    _reply(err, reply)
    {
        this._error = this.error || err;
        this._replies.push(reply);
    }
}

module.exports = Pipeline;