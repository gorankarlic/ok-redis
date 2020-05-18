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
 * Redis asynchronous commands.
 *
 * @type AbstractClient
 */
Commands.prototype.async = {};

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
    this._client.command(args);
};