"use strict";

const AbstractCommands = require("./AbstractCommands");

/**
 * Redis commands.
 */
class Commands extends AbstractCommands
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Client} client the Redis client that will run the commands.
     */
    constructor(client)
    {
        super(client);
        this._strings = new Strings(client);
     }

    /**
     * Commands that return a buffer as a UTF-8 string.
     *
     * @returns {Redis} the commands that return a buffer as a UTF-8 string.
     */
    string()
    {
        return this._strings;
    }
}

/**
 * Commands that return a buffer as a UTF-8 string.
 */
class Strings extends AbstractCommands
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Client} client the Redis client that will run the commands.
     */
    constructor(client)
    {
        super(client);
    }

    /**
     * Runs the the specified command arguments with a callback.
     *
     * @param {Array} args the command arguments.
     */
    _cc(args)
    {
        const callback = args.pop();
        args.push((err, result) => callback(err, Strings._mapper(result)));
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
            args.push((err, result) => err === null ? resolve(Strings._mapper(result)) : reject(err));
            this._client.command(args);
        });
    }

    /**
     * Buffer to string mapper.
     *
     * @param {Object} r the result to map.
     * @returns {Object} the result with buffers mapped to strings.
     */
    static _mapper(r)
    {
        if(r instanceof Array)
        {
            return r.map(Strings._mapper);
        }
        else if(r instanceof Buffer)
        {
            return r.toString();
        }
        else
        {
            return r;
        }
    }
}

module.exports = Commands;