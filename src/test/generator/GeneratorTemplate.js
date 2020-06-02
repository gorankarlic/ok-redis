"use strict";

/**
 * Creates a new instance of this class.
 *
 * @class
 * @classdesc Redis commands.
 * @param {AbstractClient} client the Redis client that will run the commands.
 */
function Commands(client)
{
    this._client = client;
}

Commands.prototype.constructor = Commands;
module.exports = Commands;

/**
 * Redis client that will run the commands.
 *
 * @type AbstractClient
 */
Commands.prototype._client = null;

/**
 * Runs the the specified command arguments.
 *
 * @param {Array} args the command arguments.
 */
Commands.prototype._c = function(args)
{
    if(args[args.length - 1] instanceof Function)
    {
        return this._cc(args);
    }
    else
    {
        return this._cp(args);
    }
};

/**
 * Runs the the specified command arguments.
 *
 * @param {Array} args the command arguments.
 */
Commands.prototype._cc = function(args)
{
    this._client.command(args);
};

/**
 * Runs the the specified command arguments.
 *
 * @param {Array} args the command arguments.
 */
Commands.prototype._cp = function(args)
{
    return new Promise((resolve, reject) =>
    {
        args.push((err, result) => err === null ? resolve(result) : reject(err));
        this._client.command(args);
    });
};