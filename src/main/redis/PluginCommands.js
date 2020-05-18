"use strict";

const Commands = require("./Commands");

/**
 * Creates a new instance of this class.
 *
 * @class
 * @classdesc Redis plugin commands.
 * @param {AbstractClient} client the Redis client that will run the commands.
 */
function PluginCommands(client)
{
    Commands.call(this, client);
}

PluginCommands.prototype = Object.create(Commands.prototype);
PluginCommands.prototype.constructor = PluginCommands;
module.exports = PluginCommands;

PluginCommands.prototype.getEntity = function(key, done)
{
    Commands.prototype.hgetall.call(this, key, function(err, result)
    {
        if(err)
        {
            done(err);
        }
        else if(result === null)
        {
            done(null, null);
        }
        else
        {
            const map = {};
            for(let n = 0; n < result.length; n += 2)
            {
                map[result[n]] = result[n+1];
            }
            done(null, map);
        }
    });
};

PluginCommands.prototype.setEntity = function(key, entity, done)
{
    const args = [key];
    for(const key of Object.keys(entity))
    {
        const value = entity[key];
        if(value === null || value === void(0))
        {
            continue;
        }
        args.push(key);
        args.push(value);
    }
    args.push(done);
    Commands.prototype.hmset.apply(this, key, args);
};