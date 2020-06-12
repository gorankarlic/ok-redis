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
        if(args[args.length - 1] instanceof Function)
        {
            return this._cc(args);
        }
        else
        {
            return this._cp(args);
        }
    }

    /**
     * Runs the the specified command arguments with a callback.
     *
     * @param {Array} args the command arguments.
     */
    _cc(args)
    {
        this._client.command(args);
    }

    /**
     * Runs the the specified command arguments with a promise.
     *
     * @param {Array} args the command arguments.
     */
    _cp(args)
    {
        return new Promise((resolve, reject) =>
        {
            args.push((err, result) => err === null ? resolve(result) : reject(err));
            this._client.command(args);
        });
    }/*[GENERATED]*/
}

module.exports = AbstractCommands;