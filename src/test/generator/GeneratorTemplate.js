"use strict";

/**
 * Redis commands.
 */
class AbstractCommands
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Client} client the Redis client that will run the commands.
     */
    constructor(client)
    {
        this._client = client;
    }

    /**
     * Runs the the specified command arguments.
     *
     * @param {Array} args the command arguments.
     */
    _c(args)
    {
        this._client.command(args);
    }

    /**
     * Runs the the specified command arguments with a promise.
     *
     * @param {Array} args the command arguments.
     */
    async _p(args)
    {
        try
        {
            return await new Promise((resolve, reject) =>
            {
                args.push((err, result) => err === null ? resolve(result) : reject(err));
                this._c(args);
            });
        }
        catch(e)
        {
            Error.captureStackTrace(e);
            throw e;
        }
    }

    /**
     * Runs the the specified command arguments with a promise or callback.
     *
     * @param {Array} args the command arguments.
     */
    _r(args)
    {
        if(args[args.length - 1] instanceof Function)
        {
            return this._c(args);
        }
        else
        {
            return this._p(args);
        }
    }/*[GENERATED]*/
}

module.exports = AbstractCommands;