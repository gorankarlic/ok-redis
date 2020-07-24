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
    }

    /**
     * Sets the return type to either Buffer or String.
     *
     * @param {Object} type the Redis command return type.
     */
    return(type)
    {
        switch(type)
        {
            case Buffer:
            {
                this._c = Commands.prototype._c;
                return this;
            }
            case String:
            {
                this._c = Strings.prototype._c;
                return this;
            }
            default:
            {
                throw new Error("return type must be Buffer or String");
            }
        }
    }
}

/**
 * Command variant that returns a UTF-8 string instead of a Buffer.
 */
class Strings
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        throw new Error("can not create an instance of this class");
    }

    /**
     * Runs the the specified command arguments with a callback.
     *
     * @param {Array} args the command arguments.
     */
    _c(args)
    {
        const callback = args.pop();
        args.push((err, result) => callback(err, Strings._mapper(result)));
        this._client.command(args);
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