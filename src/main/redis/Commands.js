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

/**
 * APPEND key value
 *
 * (write, denyoom)
 * (arity 3, first key 1, last key 1)
 *
 * Append a value to a key.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/append
 * @since 2.0.0
 */
Commands.prototype.append = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "APPEND", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "APPEND", arg0, arg1, callback]);
    }
};

/**
 * ASKING arg
 *
 * (fast)
 * (arity 1, first key 0, last key 0)
 *
 * Help not available.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/asking
 * @since not known
 */
Commands.prototype.asking = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "ASKING"]);
    }
    else
    {
        this._c([0x0, "ASKING", callback]);
    }
};

/**
 * AUTH password
 *
 * (noscript, loading, stale, fast)
 * (arity 2, first key 0, last key 0)
 *
 * Authenticate to the server.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/auth
 * @since 1.0.0
 */
Commands.prototype.auth = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "AUTH", arg0]);
    }
    else
    {
        this._c([0x0, "AUTH", arg0, callback]);
    }
};

/**
 * BGREWRITEAOF -
 *
 * (admin)
 * (arity 1, first key 0, last key 0)
 *
 * Asynchronously rewrite the append-only file.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/bgrewriteaof
 * @since 1.0.0
 */
Commands.prototype.bgrewriteaof = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "BGREWRITEAOF"]);
    }
    else
    {
        this._c([0x0, "BGREWRITEAOF", callback]);
    }
};

/**
 * BGSAVE -
 *
 * (admin)
 * (arity -1, first key 0, last key 0)
 *
 * Asynchronously save the dataset to disk.
 *
 * @see http://redis.io/commands/bgsave
 * @since 1.0.0
 */
Commands.prototype.bgsave = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x0, "BGSAVE"];
            break;
        }
        case 1:
        {
            args = [0x0, "BGSAVE", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "BGSAVE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "BGSAVE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * BITCOUNT key [start end]
 *
 * (readonly)
 * (arity -2, first key 1, last key 1)
 *
 * Count set bits in a string.
 *
 * @see http://redis.io/commands/bitcount
 * @since 2.6.0
 */
Commands.prototype.bitcount = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("BITCOUNT: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10001, "BITCOUNT", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10001, "BITCOUNT", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "BITCOUNT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]
 *
 * (write, denyoom)
 * (arity -2, first key 1, last key 1)
 *
 * Perform arbitrary bitfield integer operations on strings.
 *
 * @see http://redis.io/commands/bitfield
 * @since 3.2.0
 */
Commands.prototype.bitfield = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("BITFIELD: wrong number of arguments");
        }
        case 1:
        {
            args = [0x20001, "BITFIELD", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20001, "BITFIELD", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "BITFIELD";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * BITOP operation destkey key [key ...]
 *
 * (write, denyoom)
 * (arity -4, first key 2, last key -1)
 *
 * Perform bitwise operations between strings.
 *
 * @see http://redis.io/commands/bitop
 * @since 2.6.0
 */
Commands.prototype.bitop = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("BITOP: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20002;
            args[1] = "BITOP";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * BITPOS key bit [start] [end]
 *
 * (readonly)
 * (arity -3, first key 1, last key 1)
 *
 * Find first bit set or clear in a string.
 *
 * @see http://redis.io/commands/bitpos
 * @since 2.8.7
 */
Commands.prototype.bitpos = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("BITPOS: wrong number of arguments");
        }
        case 2:
        {
            args = [0x10001, "BITPOS", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "BITPOS";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * BLPOP key [key ...] timeout
 *
 * (write, noscript)
 * (arity -3, first key 1, last key -2)
 *
 * Remove and get the first element in a list, or block until one is available.
 *
 * @see http://redis.io/commands/blpop
 * @since 2.0.0
 */
Commands.prototype.blpop = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("BLPOP: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "BLPOP", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "BLPOP";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * BRPOP key [key ...] timeout
 *
 * (write, noscript)
 * (arity -3, first key 1, last key -2)
 *
 * Remove and get the last element in a list, or block until one is available.
 *
 * @see http://redis.io/commands/brpop
 * @since 2.0.0
 */
Commands.prototype.brpop = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("BRPOP: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "BRPOP", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "BRPOP";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * BRPOPLPUSH source destination timeout
 *
 * (write, denyoom, noscript)
 * (arity 4, first key 1, last key 2)
 *
 * Pop a value from a list, push it to another list and return it; or block until one is available.
 *
 * @see http://redis.io/commands/brpoplpush
 * @since 2.2.0
 */
Commands.prototype.brpoplpush = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("BRPOPLPUSH: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "BRPOPLPUSH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * CLIENT GETNAME -
 *
 * (admin, noscript)
 * (arity -2, first key 0, last key 0)
 *
 * Get the current connection name.
 *
 * @see http://redis.io/commands/client
 * @since 2.6.9
 *
 * ----
 *
 * CLIENT KILL [ip:port] [ID client-id] [TYPE normal|master|slave|pubsub] [ADDR ip:port] [SKIPME yes/no]
 *
 * (admin, noscript)
 * (arity -2, first key 0, last key 0)
 *
 * Kill the connection of a client.
 *
 * @see http://redis.io/commands/client
 * @since 2.4.0
 *
 * ----
 *
 * CLIENT LIST -
 *
 * (admin, noscript)
 * (arity -2, first key 0, last key 0)
 *
 * Get the list of client connections.
 *
 * @see http://redis.io/commands/client
 * @since 2.4.0
 *
 * ----
 *
 * CLIENT PAUSE timeout
 *
 * (admin, noscript)
 * (arity -2, first key 0, last key 0)
 *
 * Stop processing commands from clients for some time.
 *
 * @see http://redis.io/commands/client
 * @since 2.9.50
 *
 * ----
 *
 * CLIENT REPLY ON|OFF|SKIP
 *
 * (admin, noscript)
 * (arity -2, first key 0, last key 0)
 *
 * Instruct the server whether to reply to commands.
 *
 * @see http://redis.io/commands/client
 * @since 3.2
 *
 * ----
 *
 * CLIENT SETNAME connection-name
 *
 * (admin, noscript)
 * (arity -2, first key 0, last key 0)
 *
 * Set the current connection name.
 *
 * @see http://redis.io/commands/client
 * @since 2.6.9
 */
Commands.prototype.client = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("CLIENT: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "CLIENT", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "CLIENT", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "CLIENT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * CLUSTER ADDSLOTS slot [slot ...]
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Assign new hash slots to receiving node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER COUNT-FAILURE-REPORTS node-id
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Return the number of failure reports active for a given node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER COUNTKEYSINSLOT slot
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Return the number of local keys in the specified hash slot.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER DELSLOTS slot [slot ...]
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Set hash slots as unbound in receiving node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER FAILOVER [FORCE|TAKEOVER]
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Forces a slave to perform a manual failover of its master.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER FORGET node-id
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Remove a node from the nodes table.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER GETKEYSINSLOT slot count
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Return local key names in the specified hash slot.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER INFO -
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Provides info about Redis Cluster node state.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER KEYSLOT key
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Returns the hash slot of the specified key.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER MEET ip port
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Force a node cluster to handshake with another node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER NODES -
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Get Cluster config for the node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER REPLICATE node-id
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Reconfigure a node as a slave of the specified master node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER RESET [HARD|SOFT]
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Reset a Redis Cluster node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER SAVECONFIG -
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Forces the node to save cluster state on disk.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER SET-CONFIG-EPOCH config-epoch
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Set the configuration epoch in a new node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER SETSLOT slot IMPORTING|MIGRATING|STABLE|NODE [node-id]
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Bind a hash slot to a specific node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER SLAVES node-id
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * List slave nodes of the specified master node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER SLOTS -
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Get array of Cluster slot to node mappings.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 */
Commands.prototype.cluster = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("CLUSTER: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "CLUSTER", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "CLUSTER", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "CLUSTER";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * COMMAND -
 *
 * (loading, stale)
 * (arity 0, first key 0, last key 0)
 *
 * Get array of Redis command details.
 *
 * @see http://redis.io/commands/command
 * @since 2.8.13
 *
 * ----
 *
 * COMMAND COUNT -
 *
 * (loading, stale)
 * (arity 0, first key 0, last key 0)
 *
 * Get total number of Redis commands.
 *
 * @see http://redis.io/commands/command
 * @since 2.8.13
 *
 * ----
 *
 * COMMAND GETKEYS -
 *
 * (loading, stale)
 * (arity 0, first key 0, last key 0)
 *
 * Extract keys given a full Redis command.
 *
 * @see http://redis.io/commands/command
 * @since 2.8.13
 *
 * ----
 *
 * COMMAND INFO command-name [command-name ...]
 *
 * (loading, stale)
 * (arity 0, first key 0, last key 0)
 *
 * Get array of specific Redis command details.
 *
 * @see http://redis.io/commands/command
 * @since 2.8.13
 */
Commands.prototype.command = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 1:
        {
            args = [0x0, "COMMAND", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "COMMAND", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "COMMAND";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * CONFIG GET parameter
 *
 * (admin, loading, stale)
 * (arity -2, first key 0, last key 0)
 *
 * Get the value of a configuration parameter.
 *
 * @see http://redis.io/commands/config
 * @since 2.0.0
 *
 * ----
 *
 * CONFIG RESETSTAT -
 *
 * (admin, loading, stale)
 * (arity -2, first key 0, last key 0)
 *
 * Reset the stats returned by INFO.
 *
 * @see http://redis.io/commands/config
 * @since 2.0.0
 *
 * ----
 *
 * CONFIG REWRITE -
 *
 * (admin, loading, stale)
 * (arity -2, first key 0, last key 0)
 *
 * Rewrite the configuration file with the in memory configuration.
 *
 * @see http://redis.io/commands/config
 * @since 2.8.0
 *
 * ----
 *
 * CONFIG SET parameter value
 *
 * (admin, loading, stale)
 * (arity -2, first key 0, last key 0)
 *
 * Set a configuration parameter to the given value.
 *
 * @see http://redis.io/commands/config
 * @since 2.0.0
 */
Commands.prototype.config = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("CONFIG: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "CONFIG", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "CONFIG", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "CONFIG";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * DBSIZE -
 *
 * (readonly, fast)
 * (arity 1, first key 0, last key 0)
 *
 * Return the number of keys in the selected database.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/dbsize
 * @since 1.0.0
 */
Commands.prototype.dbsize = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x10000, "DBSIZE"]);
    }
    else
    {
        this._c([0x10000, "DBSIZE", callback]);
    }
};

/**
 * DEBUG OBJECT key
 *
 * (admin, noscript)
 * (arity -1, first key 0, last key 0)
 *
 * Get debugging information about a key.
 *
 * @see http://redis.io/commands/debug
 * @since 1.0.0
 *
 * ----
 *
 * DEBUG SEGFAULT -
 *
 * (admin, noscript)
 * (arity -1, first key 0, last key 0)
 *
 * Make the server crash.
 *
 * @see http://redis.io/commands/debug
 * @since 1.0.0
 */
Commands.prototype.debug = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x0, "DEBUG"];
            break;
        }
        case 1:
        {
            args = [0x0, "DEBUG", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "DEBUG", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "DEBUG";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * DECR key
 *
 * (write, denyoom, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Decrement the integer value of a key by one.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/decr
 * @since 1.0.0
 */
Commands.prototype.decr = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "DECR", arg0]);
    }
    else
    {
        this._c([0x20001, "DECR", arg0, callback]);
    }
};

/**
 * DECRBY key decrement
 *
 * (write, denyoom, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Decrement the integer value of a key by the given number.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/decrby
 * @since 1.0.0
 */
Commands.prototype.decrby = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "DECRBY", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "DECRBY", arg0, arg1, callback]);
    }
};

/**
 * DEL key [key ...]
 *
 * (write)
 * (arity -2, first key 1, last key -1)
 *
 * Delete a key.
 *
 * @see http://redis.io/commands/del
 * @since 1.0.0
 */
Commands.prototype.del = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("DEL: wrong number of arguments");
        }
        case 1:
        {
            args = [0x20001, "DEL", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20001, "DEL", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "DEL";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * DISCARD -
 *
 * (noscript, fast)
 * (arity 1, first key 0, last key 0)
 *
 * Discard all commands issued after MULTI.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/discard
 * @since 2.0.0
 */
Commands.prototype.discard = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "DISCARD"]);
    }
    else
    {
        this._c([0x0, "DISCARD", callback]);
    }
};

/**
 * DUMP key
 *
 * (readonly)
 * (arity 2, first key 1, last key 1)
 *
 * Return a serialized version of the value stored at the specified key.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/dump
 * @since 2.6.0
 */
Commands.prototype.dump = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "DUMP", arg0]);
    }
    else
    {
        this._c([0x10001, "DUMP", arg0, callback]);
    }
};

/**
 * ECHO message
 *
 * (fast)
 * (arity 2, first key 0, last key 0)
 *
 * Echo the given string.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/echo
 * @since 1.0.0
 */
Commands.prototype.echo = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "ECHO", arg0]);
    }
    else
    {
        this._c([0x0, "ECHO", arg0, callback]);
    }
};

/**
 * EVAL script numkeys key [key ...] arg [arg ...]
 *
 * (noscript, movablekeys)
 * (arity -3, first key 0, last key 0)
 *
 * Execute a Lua script server side.
 *
 * @see http://redis.io/commands/eval
 * @since 2.6.0
 */
Commands.prototype.eval = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("EVAL: wrong number of arguments");
        }
        case 2:
        {
            args = [0x0, "EVAL", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "EVAL";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * EVALSHA sha1 numkeys key [key ...] arg [arg ...]
 *
 * (noscript, movablekeys)
 * (arity -3, first key 0, last key 0)
 *
 * Execute a Lua script server side.
 *
 * @see http://redis.io/commands/evalsha
 * @since 2.6.0
 */
Commands.prototype.evalsha = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("EVALSHA: wrong number of arguments");
        }
        case 2:
        {
            args = [0x0, "EVALSHA", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "EVALSHA";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * EXEC -
 *
 * (noscript, skip_monitor)
 * (arity 1, first key 0, last key 0)
 *
 * Execute all commands issued after MULTI.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/exec
 * @since 1.2.0
 */
Commands.prototype.exec = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "EXEC"]);
    }
    else
    {
        this._c([0x0, "EXEC", callback]);
    }
};

/**
 * EXISTS key [key ...]
 *
 * (readonly, fast)
 * (arity -2, first key 1, last key -1)
 *
 * Determine if a key exists.
 *
 * @see http://redis.io/commands/exists
 * @since 1.0.0
 */
Commands.prototype.exists = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("EXISTS: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10001, "EXISTS", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10001, "EXISTS", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "EXISTS";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * EXPIRE key seconds
 *
 * (write, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Set a key's time to live in seconds.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/expire
 * @since 1.0.0
 */
Commands.prototype.expire = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "EXPIRE", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "EXPIRE", arg0, arg1, callback]);
    }
};

/**
 * EXPIREAT key timestamp
 *
 * (write, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Set the expiration for a key as a UNIX timestamp.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/expireat
 * @since 1.2.0
 */
Commands.prototype.expireat = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "EXPIREAT", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "EXPIREAT", arg0, arg1, callback]);
    }
};

/**
 * FLUSHALL -
 *
 * (write)
 * (arity -1, first key 0, last key 0)
 *
 * Remove all keys from all databases.
 *
 * @see http://redis.io/commands/flushall
 * @since 1.0.0
 */
Commands.prototype.flushall = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x20000, "FLUSHALL"];
            break;
        }
        case 1:
        {
            args = [0x20000, "FLUSHALL", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20000, "FLUSHALL", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "FLUSHALL";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * FLUSHDB -
 *
 * (write)
 * (arity -1, first key 0, last key 0)
 *
 * Remove all keys from the current database.
 *
 * @see http://redis.io/commands/flushdb
 * @since 1.0.0
 */
Commands.prototype.flushdb = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x20000, "FLUSHDB"];
            break;
        }
        case 1:
        {
            args = [0x20000, "FLUSHDB", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20000, "FLUSHDB", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "FLUSHDB";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * GEOADD key longitude latitude member [longitude latitude member ...]
 *
 * (write, denyoom)
 * (arity -5, first key 1, last key 1)
 *
 * Add one or more geospatial items in the geospatial index represented using a sorted set.
 *
 * @see http://redis.io/commands/geoadd
 * @since 3.2.0
 */
Commands.prototype.geoadd = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        case 3:
        {
            throw new Error("GEOADD: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "GEOADD";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * GEODIST key member1 member2 [unit]
 *
 * (readonly)
 * (arity -4, first key 1, last key 1)
 *
 * Returns the distance between two members of a geospatial index.
 *
 * @see http://redis.io/commands/geodist
 * @since 3.2.0
 */
Commands.prototype.geodist = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("GEODIST: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "GEODIST";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * GEOHASH key member [member ...]
 *
 * (readonly)
 * (arity -2, first key 1, last key 1)
 *
 * Returns members of a geospatial index as standard geohash strings.
 *
 * @see http://redis.io/commands/geohash
 * @since 3.2.0
 */
Commands.prototype.geohash = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("GEOHASH: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10001, "GEOHASH", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10001, "GEOHASH", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "GEOHASH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * GEOPOS key member [member ...]
 *
 * (readonly)
 * (arity -2, first key 1, last key 1)
 *
 * Returns longitude and latitude of members of a geospatial index.
 *
 * @see http://redis.io/commands/geopos
 * @since 3.2.0
 */
Commands.prototype.geopos = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("GEOPOS: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10001, "GEOPOS", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10001, "GEOPOS", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "GEOPOS";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
 *
 * (write, movablekeys)
 * (arity -6, first key 1, last key 1)
 *
 * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point.
 *
 * @see http://redis.io/commands/georadius
 * @since 3.2.0
 */
Commands.prototype.georadius = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        {
            throw new Error("GEORADIUS: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "GEORADIUS";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * GEORADIUS_RO key arg arg arg arg arg ...options...
 *
 * (readonly, movablekeys)
 * (arity -6, first key 1, last key 1)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/georadius_ro
 * @since not known
 */
Commands.prototype.georadius_ro = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        {
            throw new Error("GEORADIUS_RO: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "GEORADIUS_RO";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
 *
 * (write, movablekeys)
 * (arity -5, first key 1, last key 1)
 *
 * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member.
 *
 * @see http://redis.io/commands/georadiusbymember
 * @since 3.2.0
 */
Commands.prototype.georadiusbymember = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        case 3:
        {
            throw new Error("GEORADIUSBYMEMBER: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "GEORADIUSBYMEMBER";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * GEORADIUSBYMEMBER_RO key arg arg arg arg ...options...
 *
 * (readonly, movablekeys)
 * (arity -5, first key 1, last key 1)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/georadiusbymember_ro
 * @since not known
 */
Commands.prototype.georadiusbymember_ro = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        case 3:
        {
            throw new Error("GEORADIUSBYMEMBER_RO: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "GEORADIUSBYMEMBER_RO";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * GET key
 *
 * (readonly, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Get the value of a key.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/get
 * @since 1.0.0
 */
Commands.prototype.get = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "GET", arg0]);
    }
    else
    {
        this._c([0x10001, "GET", arg0, callback]);
    }
};

/**
 * GETBIT key offset
 *
 * (readonly, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Returns the bit value at offset in the string value stored at key.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/getbit
 * @since 2.2.0
 */
Commands.prototype.getbit = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "GETBIT", arg0, arg1]);
    }
    else
    {
        this._c([0x10001, "GETBIT", arg0, arg1, callback]);
    }
};

/**
 * GETRANGE key start end
 *
 * (readonly)
 * (arity 4, first key 1, last key 1)
 *
 * Get a substring of the string stored at a key.
 *
 * @see http://redis.io/commands/getrange
 * @since 2.4.0
 */
Commands.prototype.getrange = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("GETRANGE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "GETRANGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * GETSET key value
 *
 * (write, denyoom)
 * (arity 3, first key 1, last key 1)
 *
 * Set the string value of a key and return its old value.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/getset
 * @since 1.0.0
 */
Commands.prototype.getset = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "GETSET", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "GETSET", arg0, arg1, callback]);
    }
};

/**
 * HDEL key field [field ...]
 *
 * (write, fast)
 * (arity -3, first key 1, last key 1)
 *
 * Delete one or more hash fields.
 *
 * @see http://redis.io/commands/hdel
 * @since 2.0.0
 */
Commands.prototype.hdel = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("HDEL: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "HDEL", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "HDEL";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * HEXISTS key field
 *
 * (readonly, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Determine if a hash field exists.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/hexists
 * @since 2.0.0
 */
Commands.prototype.hexists = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "HEXISTS", arg0, arg1]);
    }
    else
    {
        this._c([0x10001, "HEXISTS", arg0, arg1, callback]);
    }
};

/**
 * HGET key field
 *
 * (readonly, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Get the value of a hash field.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/hget
 * @since 2.0.0
 */
Commands.prototype.hget = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "HGET", arg0, arg1]);
    }
    else
    {
        this._c([0x10001, "HGET", arg0, arg1, callback]);
    }
};

/**
 * HGETALL key
 *
 * (readonly)
 * (arity 2, first key 1, last key 1)
 *
 * Get all the fields and values in a hash.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/hgetall
 * @since 2.0.0
 */
Commands.prototype.hgetall = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "HGETALL", arg0]);
    }
    else
    {
        this._c([0x10001, "HGETALL", arg0, callback]);
    }
};

/**
 * HINCRBY key field increment
 *
 * (write, denyoom, fast)
 * (arity 4, first key 1, last key 1)
 *
 * Increment the integer value of a hash field by the given number.
 *
 * @see http://redis.io/commands/hincrby
 * @since 2.0.0
 */
Commands.prototype.hincrby = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("HINCRBY: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "HINCRBY";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * HINCRBYFLOAT key field increment
 *
 * (write, denyoom, fast)
 * (arity 4, first key 1, last key 1)
 *
 * Increment the float value of a hash field by the given amount.
 *
 * @see http://redis.io/commands/hincrbyfloat
 * @since 2.6.0
 */
Commands.prototype.hincrbyfloat = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("HINCRBYFLOAT: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "HINCRBYFLOAT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * HKEYS key
 *
 * (readonly, sort_for_script)
 * (arity 2, first key 1, last key 1)
 *
 * Get all the fields in a hash.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/hkeys
 * @since 2.0.0
 */
Commands.prototype.hkeys = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "HKEYS", arg0]);
    }
    else
    {
        this._c([0x10001, "HKEYS", arg0, callback]);
    }
};

/**
 * HLEN key
 *
 * (readonly, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Get the number of fields in a hash.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/hlen
 * @since 2.0.0
 */
Commands.prototype.hlen = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "HLEN", arg0]);
    }
    else
    {
        this._c([0x10001, "HLEN", arg0, callback]);
    }
};

/**
 * HMGET key field [field ...]
 *
 * (readonly, fast)
 * (arity -3, first key 1, last key 1)
 *
 * Get the values of all the given hash fields.
 *
 * @see http://redis.io/commands/hmget
 * @since 2.0.0
 */
Commands.prototype.hmget = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("HMGET: wrong number of arguments");
        }
        case 2:
        {
            args = [0x10001, "HMGET", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "HMGET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * HMSET key field value [field value ...]
 *
 * (write, denyoom, fast)
 * (arity -4, first key 1, last key 1)
 *
 * Set multiple hash fields to multiple values.
 *
 * @see http://redis.io/commands/hmset
 * @since 2.0.0
 */
Commands.prototype.hmset = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("HMSET: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "HMSET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * HOST: arg ...options...
 *
 * (loading, stale)
 * (arity -1, first key 0, last key 0)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/host:
 * @since not known
 */
Commands.prototype.host = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x0, "HOST:"];
            break;
        }
        case 1:
        {
            args = [0x0, "HOST:", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "HOST:", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "HOST:";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * HSCAN key cursor [MATCH pattern] [COUNT count]
 *
 * (readonly, random)
 * (arity -3, first key 1, last key 1)
 *
 * Incrementally iterate hash fields and associated values.
 *
 * @see http://redis.io/commands/hscan
 * @since 2.8.0
 */
Commands.prototype.hscan = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("HSCAN: wrong number of arguments");
        }
        case 2:
        {
            args = [0x10001, "HSCAN", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "HSCAN";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * HSET key field value
 *
 * (write, denyoom, fast)
 * (arity -4, first key 1, last key 1)
 *
 * Set the string value of a hash field.
 *
 * @see http://redis.io/commands/hset
 * @since 2.0.0
 */
Commands.prototype.hset = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("HSET: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "HSET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * HSETNX key field value
 *
 * (write, denyoom, fast)
 * (arity 4, first key 1, last key 1)
 *
 * Set the value of a hash field, only if the field does not exist.
 *
 * @see http://redis.io/commands/hsetnx
 * @since 2.0.0
 */
Commands.prototype.hsetnx = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("HSETNX: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "HSETNX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * HSTRLEN key field
 *
 * (readonly, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Get the length of the value of a hash field.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/hstrlen
 * @since 3.2.0
 */
Commands.prototype.hstrlen = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "HSTRLEN", arg0, arg1]);
    }
    else
    {
        this._c([0x10001, "HSTRLEN", arg0, arg1, callback]);
    }
};

/**
 * HVALS key
 *
 * (readonly, sort_for_script)
 * (arity 2, first key 1, last key 1)
 *
 * Get all the values in a hash.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/hvals
 * @since 2.0.0
 */
Commands.prototype.hvals = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "HVALS", arg0]);
    }
    else
    {
        this._c([0x10001, "HVALS", arg0, callback]);
    }
};

/**
 * INCR key
 *
 * (write, denyoom, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Increment the integer value of a key by one.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/incr
 * @since 1.0.0
 */
Commands.prototype.incr = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "INCR", arg0]);
    }
    else
    {
        this._c([0x20001, "INCR", arg0, callback]);
    }
};

/**
 * INCRBY key increment
 *
 * (write, denyoom, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Increment the integer value of a key by the given amount.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/incrby
 * @since 1.0.0
 */
Commands.prototype.incrby = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "INCRBY", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "INCRBY", arg0, arg1, callback]);
    }
};

/**
 * INCRBYFLOAT key increment
 *
 * (write, denyoom, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Increment the float value of a key by the given amount.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/incrbyfloat
 * @since 2.6.0
 */
Commands.prototype.incrbyfloat = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "INCRBYFLOAT", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "INCRBYFLOAT", arg0, arg1, callback]);
    }
};

/**
 * INFO [section]
 *
 * (loading, stale)
 * (arity -1, first key 0, last key 0)
 *
 * Get information and statistics about the server.
 *
 * @see http://redis.io/commands/info
 * @since 1.0.0
 */
Commands.prototype.info = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x0, "INFO"];
            break;
        }
        case 1:
        {
            args = [0x0, "INFO", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "INFO", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "INFO";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * KEYS pattern
 *
 * (readonly, sort_for_script)
 * (arity 2, first key 0, last key 0)
 *
 * Find all keys matching the given pattern.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/keys
 * @since 1.0.0
 */
Commands.prototype.keys = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10000, "KEYS", arg0]);
    }
    else
    {
        this._c([0x10000, "KEYS", arg0, callback]);
    }
};

/**
 * LASTSAVE -
 *
 * (random, fast)
 * (arity 1, first key 0, last key 0)
 *
 * Get the UNIX time stamp of the last successful save to disk.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/lastsave
 * @since 1.0.0
 */
Commands.prototype.lastsave = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "LASTSAVE"]);
    }
    else
    {
        this._c([0x0, "LASTSAVE", callback]);
    }
};

/**
 * LATENCY arg arg ...options...
 *
 * (admin, noscript, loading, stale)
 * (arity -2, first key 0, last key 0)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/latency
 * @since not known
 */
Commands.prototype.latency = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("LATENCY: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "LATENCY", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "LATENCY", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "LATENCY";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * LINDEX key index
 *
 * (readonly)
 * (arity 3, first key 1, last key 1)
 *
 * Get an element from a list by its index.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/lindex
 * @since 1.0.0
 */
Commands.prototype.lindex = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "LINDEX", arg0, arg1]);
    }
    else
    {
        this._c([0x10001, "LINDEX", arg0, arg1, callback]);
    }
};

/**
 * LINSERT key BEFORE|AFTER pivot value
 *
 * (write, denyoom)
 * (arity 5, first key 1, last key 1)
 *
 * Insert an element before or after another element in a list.
 *
 * @see http://redis.io/commands/linsert
 * @since 2.2.0
 */
Commands.prototype.linsert = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        case 3:
        {
            throw new Error("LINSERT: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "LINSERT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * LLEN key
 *
 * (readonly, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Get the length of a list.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/llen
 * @since 1.0.0
 */
Commands.prototype.llen = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "LLEN", arg0]);
    }
    else
    {
        this._c([0x10001, "LLEN", arg0, callback]);
    }
};

/**
 * LPOP key
 *
 * (write, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Remove and get the first element in a list.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/lpop
 * @since 1.0.0
 */
Commands.prototype.lpop = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "LPOP", arg0]);
    }
    else
    {
        this._c([0x20001, "LPOP", arg0, callback]);
    }
};

/**
 * LPUSH key value [value ...]
 *
 * (write, denyoom, fast)
 * (arity -3, first key 1, last key 1)
 *
 * Prepend one or multiple values to a list.
 *
 * @see http://redis.io/commands/lpush
 * @since 1.0.0
 */
Commands.prototype.lpush = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("LPUSH: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "LPUSH", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "LPUSH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * LPUSHX key value
 *
 * (write, denyoom, fast)
 * (arity -3, first key 1, last key 1)
 *
 * Prepend a value to a list, only if the list exists.
 *
 * @see http://redis.io/commands/lpushx
 * @since 2.2.0
 */
Commands.prototype.lpushx = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("LPUSHX: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "LPUSHX", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "LPUSHX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * LRANGE key start stop
 *
 * (readonly)
 * (arity 4, first key 1, last key 1)
 *
 * Get a range of elements from a list.
 *
 * @see http://redis.io/commands/lrange
 * @since 1.0.0
 */
Commands.prototype.lrange = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("LRANGE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "LRANGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * LREM key count value
 *
 * (write)
 * (arity 4, first key 1, last key 1)
 *
 * Remove elements from a list.
 *
 * @see http://redis.io/commands/lrem
 * @since 1.0.0
 */
Commands.prototype.lrem = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("LREM: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "LREM";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * LSET key index value
 *
 * (write, denyoom)
 * (arity 4, first key 1, last key 1)
 *
 * Set the value of an element in a list by its index.
 *
 * @see http://redis.io/commands/lset
 * @since 1.0.0
 */
Commands.prototype.lset = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("LSET: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "LSET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * LTRIM key start stop
 *
 * (write)
 * (arity 4, first key 1, last key 1)
 *
 * Trim a list to the specified range.
 *
 * @see http://redis.io/commands/ltrim
 * @since 1.0.0
 */
Commands.prototype.ltrim = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("LTRIM: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "LTRIM";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * MEMORY arg arg ...options...
 *
 * (readonly)
 * (arity -2, first key 0, last key 0)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/memory
 * @since not known
 */
Commands.prototype.memory = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("MEMORY: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10000, "MEMORY", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "MEMORY", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "MEMORY";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * MGET key [key ...]
 *
 * (readonly, fast)
 * (arity -2, first key 1, last key -1)
 *
 * Get the values of all the given keys.
 *
 * @see http://redis.io/commands/mget
 * @since 1.0.0
 */
Commands.prototype.mget = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("MGET: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10001, "MGET", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10001, "MGET", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "MGET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * MIGRATE host port key| destination-db timeout [COPY] [REPLACE] [KEYS key]
 *
 * (write, movablekeys)
 * (arity -6, first key 0, last key 0)
 *
 * Atomically transfer a key from a Redis instance to another one.
 *
 * @see http://redis.io/commands/migrate
 * @since 2.6.0
 */
Commands.prototype.migrate = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        {
            throw new Error("MIGRATE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "MIGRATE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * MODULE key arg ...options...
 *
 * (admin, noscript)
 * (arity -2, first key 1, last key 1)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/module
 * @since not known
 */
Commands.prototype.module = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("MODULE: wrong number of arguments");
        }
        case 1:
        {
            args = [0x1, "MODULE", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x1, "MODULE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x1;
            args[1] = "MODULE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * MONITOR -
 *
 * (admin, noscript)
 * (arity 1, first key 0, last key 0)
 *
 * Listen for all requests received by the server in real time.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/monitor
 * @since 1.0.0
 */
Commands.prototype.monitor = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "MONITOR"]);
    }
    else
    {
        this._c([0x0, "MONITOR", callback]);
    }
};

/**
 * MOVE key db
 *
 * (write, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Move a key to another database.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/move
 * @since 1.0.0
 */
Commands.prototype.move = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "MOVE", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "MOVE", arg0, arg1, callback]);
    }
};

/**
 * MSET key value [key value ...]
 *
 * (write, denyoom)
 * (arity -3, first key 1, last key -1)
 *
 * Set multiple keys to multiple values.
 *
 * @see http://redis.io/commands/mset
 * @since 1.0.1
 */
Commands.prototype.mset = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("MSET: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "MSET", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "MSET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * MSETNX key value [key value ...]
 *
 * (write, denyoom)
 * (arity -3, first key 1, last key -1)
 *
 * Set multiple keys to multiple values, only if none of the keys exist.
 *
 * @see http://redis.io/commands/msetnx
 * @since 1.0.1
 */
Commands.prototype.msetnx = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("MSETNX: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "MSETNX", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "MSETNX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * MULTI -
 *
 * (noscript, fast)
 * (arity 1, first key 0, last key 0)
 *
 * Mark the start of a transaction block.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/multi
 * @since 1.2.0
 */
Commands.prototype.multi = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "MULTI"]);
    }
    else
    {
        this._c([0x0, "MULTI", callback]);
    }
};

/**
 * OBJECT subcommand [arguments [arguments ...]]
 *
 * (readonly)
 * (arity 3, first key 2, last key 2)
 *
 * Inspect the internals of Redis objects.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/object
 * @since 2.2.3
 */
Commands.prototype.object = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x10002, "OBJECT", arg0, arg1]);
    }
    else
    {
        this._c([0x10002, "OBJECT", arg0, arg1, callback]);
    }
};

/**
 * PERSIST key
 *
 * (write, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Remove the expiration from a key.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/persist
 * @since 2.2.0
 */
Commands.prototype.persist = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "PERSIST", arg0]);
    }
    else
    {
        this._c([0x20001, "PERSIST", arg0, callback]);
    }
};

/**
 * PEXPIRE key milliseconds
 *
 * (write, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Set a key's time to live in milliseconds.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/pexpire
 * @since 2.6.0
 */
Commands.prototype.pexpire = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "PEXPIRE", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "PEXPIRE", arg0, arg1, callback]);
    }
};

/**
 * PEXPIREAT key milliseconds-timestamp
 *
 * (write, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Set the expiration for a key as a UNIX timestamp specified in milliseconds.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/pexpireat
 * @since 2.6.0
 */
Commands.prototype.pexpireat = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "PEXPIREAT", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "PEXPIREAT", arg0, arg1, callback]);
    }
};

/**
 * PFADD key element [element ...]
 *
 * (write, denyoom, fast)
 * (arity -2, first key 1, last key 1)
 *
 * Adds the specified elements to the specified HyperLogLog.
 *
 * @see http://redis.io/commands/pfadd
 * @since 2.8.9
 */
Commands.prototype.pfadd = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("PFADD: wrong number of arguments");
        }
        case 1:
        {
            args = [0x20001, "PFADD", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20001, "PFADD", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "PFADD";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * PFCOUNT key [key ...]
 *
 * (readonly)
 * (arity -2, first key 1, last key -1)
 *
 * Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
 *
 * @see http://redis.io/commands/pfcount
 * @since 2.8.9
 */
Commands.prototype.pfcount = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("PFCOUNT: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10001, "PFCOUNT", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10001, "PFCOUNT", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "PFCOUNT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * PFDEBUG arg arg arg ...options...
 *
 * (write)
 * (arity -3, first key 0, last key 0)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/pfdebug
 * @since not known
 */
Commands.prototype.pfdebug = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("PFDEBUG: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20000, "PFDEBUG", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "PFDEBUG";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * PFMERGE destkey sourcekey [sourcekey ...]
 *
 * (write, denyoom)
 * (arity -2, first key 1, last key -1)
 *
 * Merge N different HyperLogLogs into a single one.
 *
 * @see http://redis.io/commands/pfmerge
 * @since 2.8.9
 */
Commands.prototype.pfmerge = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("PFMERGE: wrong number of arguments");
        }
        case 1:
        {
            args = [0x20001, "PFMERGE", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20001, "PFMERGE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "PFMERGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * PFSELFTEST arg
 *
 * (admin)
 * (arity 1, first key 0, last key 0)
 *
 * Help not available.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/pfselftest
 * @since not known
 */
Commands.prototype.pfselftest = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "PFSELFTEST"]);
    }
    else
    {
        this._c([0x0, "PFSELFTEST", callback]);
    }
};

/*class P extends Promise
{
    constructor()
    {
        let a;
        let b;
        super((resolve, reject) =>
        {
            a = resolve;
            b = reject;
        });
        this.resolver = a;
        this.rejector = b;
    }
}*/

/**
 * PING [message]
 *
 * (stale, fast)
 * (arity -1, first key 0, last key 0)
 *
 * Ping the server.
 *
 * @see http://redis.io/commands/ping
 * @since 1.0.0
 */
Commands.prototype.ping = function(done)
{
    if(done instanceof Function)
    {
        this._c([0x0, "PING", done]);
    }
    else
    {
        return new Promise((resolve, reject) => this._c([0x0, "PING", (err, result) =>
        {
            if(err === null)
            {
                resolve(result);
            }
            else
            {
                reject(err);
            }
        }]));
    }
};

/**
 * POST arg ...options...
 *
 * (loading, stale)
 * (arity -1, first key 0, last key 0)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/post
 * @since not known
 */
Commands.prototype.post = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x0, "POST"];
            break;
        }
        case 1:
        {
            args = [0x0, "POST", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "POST", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "POST";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * PSETEX key milliseconds value
 *
 * (write, denyoom)
 * (arity 4, first key 1, last key 1)
 *
 * Set the value and expiration in milliseconds of a key.
 *
 * @see http://redis.io/commands/psetex
 * @since 2.6.0
 */
Commands.prototype.psetex = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("PSETEX: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "PSETEX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * PSUBSCRIBE pattern [pattern ...]
 *
 * (pubsub, noscript, loading, stale)
 * (arity -2, first key 0, last key 0)
 *
 * Listen for messages published to channels matching the given patterns.
 *
 * @see http://redis.io/commands/psubscribe
 * @since 2.0.0
 */
Commands.prototype.psubscribe = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("PSUBSCRIBE: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "PSUBSCRIBE", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "PSUBSCRIBE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "PSUBSCRIBE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * PSYNC arg arg arg
 *
 * (readonly, admin, noscript)
 * (arity 3, first key 0, last key 0)
 *
 * Help not available.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/psync
 * @since not known
 */
Commands.prototype.psync = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "PSYNC", arg0, arg1]);
    }
    else
    {
        this._c([0x0, "PSYNC", arg0, arg1, callback]);
    }
};

/**
 * PTTL key
 *
 * (readonly, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Get the time to live for a key in milliseconds.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/pttl
 * @since 2.6.0
 */
Commands.prototype.pttl = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "PTTL", arg0]);
    }
    else
    {
        this._c([0x10001, "PTTL", arg0, callback]);
    }
};

/**
 * PUBLISH channel message
 *
 * (pubsub, loading, stale, fast)
 * (arity 3, first key 0, last key 0)
 *
 * Post a message to a channel.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/publish
 * @since 2.0.0
 */
Commands.prototype.publish = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "PUBLISH", arg0, arg1]);
    }
    else
    {
        this._c([0x0, "PUBLISH", arg0, arg1, callback]);
    }
};

/**
 * PUBSUB subcommand [argument [argument ...]]
 *
 * (pubsub, random, loading, stale)
 * (arity -2, first key 0, last key 0)
 *
 * Inspect the state of the Pub/Sub subsystem.
 *
 * @see http://redis.io/commands/pubsub
 * @since 2.8.0
 */
Commands.prototype.pubsub = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("PUBSUB: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "PUBSUB", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "PUBSUB", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "PUBSUB";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * PUNSUBSCRIBE [pattern [pattern ...]]
 *
 * (pubsub, noscript, loading, stale)
 * (arity -1, first key 0, last key 0)
 *
 * Stop listening for messages posted to channels matching the given patterns.
 *
 * @see http://redis.io/commands/punsubscribe
 * @since 2.0.0
 */
Commands.prototype.punsubscribe = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x0, "PUNSUBSCRIBE"];
            break;
        }
        case 1:
        {
            args = [0x0, "PUNSUBSCRIBE", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "PUNSUBSCRIBE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "PUNSUBSCRIBE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * QUIT -
 *
 * ()
 * (arity 0, first key NaN, last key NaN)
 *
 * Close the connection.
 *
 * @see http://redis.io/commands/quit
 * @since 1.0.0
 */
Commands.prototype.quit = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 1:
        {
            args = [0x0, "QUIT", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "QUIT", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "QUIT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * RANDOMKEY -
 *
 * (readonly, random)
 * (arity 1, first key 0, last key 0)
 *
 * Return a random key from the keyspace.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/randomkey
 * @since 1.0.0
 */
Commands.prototype.randomkey = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x10000, "RANDOMKEY"]);
    }
    else
    {
        this._c([0x10000, "RANDOMKEY", callback]);
    }
};

/**
 * READONLY -
 *
 * (fast)
 * (arity 1, first key 0, last key 0)
 *
 * Enables read queries for a connection to a cluster slave node.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/readonly
 * @since 3.0.0
 */
Commands.prototype.readonly = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "READONLY"]);
    }
    else
    {
        this._c([0x0, "READONLY", callback]);
    }
};

/**
 * READWRITE -
 *
 * (fast)
 * (arity 1, first key 0, last key 0)
 *
 * Disables read queries for a connection to a cluster slave node.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/readwrite
 * @since 3.0.0
 */
Commands.prototype.readwrite = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "READWRITE"]);
    }
    else
    {
        this._c([0x0, "READWRITE", callback]);
    }
};

/**
 * RENAME key newkey
 *
 * (write)
 * (arity 3, first key 1, last key 2)
 *
 * Rename a key.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/rename
 * @since 1.0.0
 */
Commands.prototype.rename = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "RENAME", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "RENAME", arg0, arg1, callback]);
    }
};

/**
 * RENAMENX key newkey
 *
 * (write, fast)
 * (arity 3, first key 1, last key 2)
 *
 * Rename a key, only if the new key does not exist.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/renamenx
 * @since 1.0.0
 */
Commands.prototype.renamenx = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "RENAMENX", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "RENAMENX", arg0, arg1, callback]);
    }
};

/**
 * REPLCONF arg ...options...
 *
 * (admin, noscript, loading, stale)
 * (arity -1, first key 0, last key 0)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/replconf
 * @since not known
 */
Commands.prototype.replconf = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x0, "REPLCONF"];
            break;
        }
        case 1:
        {
            args = [0x0, "REPLCONF", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "REPLCONF", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "REPLCONF";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * RESTORE key ttl serialized-value [REPLACE]
 *
 * (write, denyoom)
 * (arity -4, first key 1, last key 1)
 *
 * Create a key using the provided serialized value, previously obtained using DUMP.
 *
 * @see http://redis.io/commands/restore
 * @since 2.6.0
 */
Commands.prototype.restore = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("RESTORE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "RESTORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * RESTORE-ASKING key arg arg arg ...options...
 *
 * (write, denyoom, asking)
 * (arity -4, first key 1, last key 1)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/restore-asking
 * @since not known
 */
Commands.prototype.restore_asking = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("RESTORE-ASKING: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "RESTORE-ASKING";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ROLE -
 *
 * (noscript, loading, stale)
 * (arity 1, first key 0, last key 0)
 *
 * Return the role of the instance in the context of replication.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/role
 * @since 2.8.12
 */
Commands.prototype.role = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "ROLE"]);
    }
    else
    {
        this._c([0x0, "ROLE", callback]);
    }
};

/**
 * RPOP key
 *
 * (write, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Remove and get the last element in a list.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/rpop
 * @since 1.0.0
 */
Commands.prototype.rpop = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "RPOP", arg0]);
    }
    else
    {
        this._c([0x20001, "RPOP", arg0, callback]);
    }
};

/**
 * RPOPLPUSH source destination
 *
 * (write, denyoom)
 * (arity 3, first key 1, last key 2)
 *
 * Remove the last element in a list, prepend it to another list and return it.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/rpoplpush
 * @since 1.2.0
 */
Commands.prototype.rpoplpush = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "RPOPLPUSH", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "RPOPLPUSH", arg0, arg1, callback]);
    }
};

/**
 * RPUSH key value [value ...]
 *
 * (write, denyoom, fast)
 * (arity -3, first key 1, last key 1)
 *
 * Append one or multiple values to a list.
 *
 * @see http://redis.io/commands/rpush
 * @since 1.0.0
 */
Commands.prototype.rpush = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("RPUSH: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "RPUSH", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "RPUSH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * RPUSHX key value
 *
 * (write, denyoom, fast)
 * (arity -3, first key 1, last key 1)
 *
 * Append a value to a list, only if the list exists.
 *
 * @see http://redis.io/commands/rpushx
 * @since 2.2.0
 */
Commands.prototype.rpushx = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("RPUSHX: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "RPUSHX", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "RPUSHX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SADD key member [member ...]
 *
 * (write, denyoom, fast)
 * (arity -3, first key 1, last key 1)
 *
 * Add one or more members to a set.
 *
 * @see http://redis.io/commands/sadd
 * @since 1.0.0
 */
Commands.prototype.sadd = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("SADD: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "SADD", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SADD";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SAVE -
 *
 * (admin, noscript)
 * (arity 1, first key 0, last key 0)
 *
 * Synchronously save the dataset to disk.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/save
 * @since 1.0.0
 */
Commands.prototype.save = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "SAVE"]);
    }
    else
    {
        this._c([0x0, "SAVE", callback]);
    }
};

/**
 * SCAN cursor [MATCH pattern] [COUNT count]
 *
 * (readonly, random)
 * (arity -2, first key 0, last key 0)
 *
 * Incrementally iterate the keys space.
 *
 * @see http://redis.io/commands/scan
 * @since 2.8.0
 */
Commands.prototype.scan = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("SCAN: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10000, "SCAN", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "SCAN", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "SCAN";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SCARD key
 *
 * (readonly, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Get the number of members in a set.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/scard
 * @since 1.0.0
 */
Commands.prototype.scard = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "SCARD", arg0]);
    }
    else
    {
        this._c([0x10001, "SCARD", arg0, callback]);
    }
};

/**
 * SCRIPT DEBUG YES|SYNC|NO
 *
 * (noscript)
 * (arity -2, first key 0, last key 0)
 *
 * Set the debug mode for executed scripts.
 *
 * @see http://redis.io/commands/script
 * @since 3.2.0
 *
 * ----
 *
 * SCRIPT EXISTS script [script ...]
 *
 * (noscript)
 * (arity -2, first key 0, last key 0)
 *
 * Check existence of scripts in the script cache.
 *
 * @see http://redis.io/commands/script
 * @since 2.6.0
 *
 * ----
 *
 * SCRIPT FLUSH -
 *
 * (noscript)
 * (arity -2, first key 0, last key 0)
 *
 * Remove all the scripts from the script cache.
 *
 * @see http://redis.io/commands/script
 * @since 2.6.0
 *
 * ----
 *
 * SCRIPT KILL -
 *
 * (noscript)
 * (arity -2, first key 0, last key 0)
 *
 * Kill the script currently in execution.
 *
 * @see http://redis.io/commands/script
 * @since 2.6.0
 *
 * ----
 *
 * SCRIPT LOAD script
 *
 * (noscript)
 * (arity -2, first key 0, last key 0)
 *
 * Load the specified Lua script into the script cache.
 *
 * @see http://redis.io/commands/script
 * @since 2.6.0
 */
Commands.prototype.script = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("SCRIPT: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "SCRIPT", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "SCRIPT", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "SCRIPT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SDIFF key [key ...]
 *
 * (readonly, sort_for_script)
 * (arity -2, first key 1, last key -1)
 *
 * Subtract multiple sets.
 *
 * @see http://redis.io/commands/sdiff
 * @since 1.0.0
 */
Commands.prototype.sdiff = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("SDIFF: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10001, "SDIFF", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10001, "SDIFF", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "SDIFF";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SDIFFSTORE destination key [key ...]
 *
 * (write, denyoom)
 * (arity -3, first key 1, last key -1)
 *
 * Subtract multiple sets and store the resulting set in a key.
 *
 * @see http://redis.io/commands/sdiffstore
 * @since 1.0.0
 */
Commands.prototype.sdiffstore = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("SDIFFSTORE: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "SDIFFSTORE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SDIFFSTORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SELECT index
 *
 * (loading, fast)
 * (arity 2, first key 0, last key 0)
 *
 * Change the selected database for the current connection.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/select
 * @since 1.0.0
 */
Commands.prototype.select = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "SELECT", arg0]);
    }
    else
    {
        this._c([0x0, "SELECT", arg0, callback]);
    }
};

/**
 * SET key value [EX seconds] [PX milliseconds] [NX|XX]
 *
 * (write, denyoom)
 * (arity -3, first key 1, last key 1)
 *
 * Set the string value of a key.
 *
 * @see http://redis.io/commands/set
 * @since 1.0.0
 */
Commands.prototype.set = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("SET: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "SET", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SETBIT key offset value
 *
 * (write, denyoom)
 * (arity 4, first key 1, last key 1)
 *
 * Sets or clears the bit at offset in the string value stored at key.
 *
 * @see http://redis.io/commands/setbit
 * @since 2.2.0
 */
Commands.prototype.setbit = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("SETBIT: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SETBIT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SETEX key seconds value
 *
 * (write, denyoom)
 * (arity 4, first key 1, last key 1)
 *
 * Set the value and expiration of a key.
 *
 * @see http://redis.io/commands/setex
 * @since 2.0.0
 */
Commands.prototype.setex = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("SETEX: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SETEX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SETNX key value
 *
 * (write, denyoom, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Set the value of a key, only if the key does not exist.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/setnx
 * @since 1.0.0
 */
Commands.prototype.setnx = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20001, "SETNX", arg0, arg1]);
    }
    else
    {
        this._c([0x20001, "SETNX", arg0, arg1, callback]);
    }
};

/**
 * SETRANGE key offset value
 *
 * (write, denyoom)
 * (arity 4, first key 1, last key 1)
 *
 * Overwrite part of a string at key starting at the specified offset.
 *
 * @see http://redis.io/commands/setrange
 * @since 2.2.0
 */
Commands.prototype.setrange = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("SETRANGE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SETRANGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SHUTDOWN [NOSAVE|SAVE]
 *
 * (admin, loading, stale)
 * (arity -1, first key 0, last key 0)
 *
 * Synchronously save the dataset to disk and then shut down the server.
 *
 * @see http://redis.io/commands/shutdown
 * @since 1.0.0
 */
Commands.prototype.shutdown = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x0, "SHUTDOWN"];
            break;
        }
        case 1:
        {
            args = [0x0, "SHUTDOWN", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "SHUTDOWN", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "SHUTDOWN";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SINTER key [key ...]
 *
 * (readonly, sort_for_script)
 * (arity -2, first key 1, last key -1)
 *
 * Intersect multiple sets.
 *
 * @see http://redis.io/commands/sinter
 * @since 1.0.0
 */
Commands.prototype.sinter = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("SINTER: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10001, "SINTER", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10001, "SINTER", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "SINTER";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SINTERSTORE destination key [key ...]
 *
 * (write, denyoom)
 * (arity -3, first key 1, last key -1)
 *
 * Intersect multiple sets and store the resulting set in a key.
 *
 * @see http://redis.io/commands/sinterstore
 * @since 1.0.0
 */
Commands.prototype.sinterstore = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("SINTERSTORE: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "SINTERSTORE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SINTERSTORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SISMEMBER key member
 *
 * (readonly, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Determine if a given value is a member of a set.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/sismember
 * @since 1.0.0
 */
Commands.prototype.sismember = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "SISMEMBER", arg0, arg1]);
    }
    else
    {
        this._c([0x10001, "SISMEMBER", arg0, arg1, callback]);
    }
};

/**
 * SLAVEOF host port
 *
 * (admin, noscript, stale)
 * (arity 3, first key 0, last key 0)
 *
 * Make the server a slave of another instance, or promote it as master.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/slaveof
 * @since 1.0.0
 */
Commands.prototype.slaveof = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "SLAVEOF", arg0, arg1]);
    }
    else
    {
        this._c([0x0, "SLAVEOF", arg0, arg1, callback]);
    }
};

/**
 * SLOWLOG subcommand [argument]
 *
 * (admin)
 * (arity -2, first key 0, last key 0)
 *
 * Manages the Redis slow queries log.
 *
 * @see http://redis.io/commands/slowlog
 * @since 2.2.12
 */
Commands.prototype.slowlog = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("SLOWLOG: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "SLOWLOG", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "SLOWLOG", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "SLOWLOG";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SMEMBERS key
 *
 * (readonly, sort_for_script)
 * (arity 2, first key 1, last key 1)
 *
 * Get all the members in a set.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/smembers
 * @since 1.0.0
 */
Commands.prototype.smembers = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "SMEMBERS", arg0]);
    }
    else
    {
        this._c([0x10001, "SMEMBERS", arg0, callback]);
    }
};

/**
 * SMOVE source destination member
 *
 * (write, fast)
 * (arity 4, first key 1, last key 2)
 *
 * Move a member from one set to another.
 *
 * @see http://redis.io/commands/smove
 * @since 1.0.0
 */
Commands.prototype.smove = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("SMOVE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SMOVE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]
 *
 * (write, denyoom, movablekeys)
 * (arity -2, first key 1, last key 1)
 *
 * Sort the elements in a list, set or sorted set.
 *
 * @see http://redis.io/commands/sort
 * @since 1.0.0
 */
Commands.prototype.sort = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("SORT: wrong number of arguments");
        }
        case 1:
        {
            args = [0x20001, "SORT", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20001, "SORT", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SORT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SPOP key [count]
 *
 * (write, random, fast)
 * (arity -2, first key 1, last key 1)
 *
 * Remove and return one or multiple random members from a set.
 *
 * @see http://redis.io/commands/spop
 * @since 1.0.0
 */
Commands.prototype.spop = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("SPOP: wrong number of arguments");
        }
        case 1:
        {
            args = [0x20001, "SPOP", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20001, "SPOP", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SPOP";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SRANDMEMBER key [count]
 *
 * (readonly, random)
 * (arity -2, first key 1, last key 1)
 *
 * Get one or multiple random members from a set.
 *
 * @see http://redis.io/commands/srandmember
 * @since 1.0.0
 */
Commands.prototype.srandmember = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("SRANDMEMBER: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10001, "SRANDMEMBER", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10001, "SRANDMEMBER", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "SRANDMEMBER";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SREM key member [member ...]
 *
 * (write, fast)
 * (arity -3, first key 1, last key 1)
 *
 * Remove one or more members from a set.
 *
 * @see http://redis.io/commands/srem
 * @since 1.0.0
 */
Commands.prototype.srem = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("SREM: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "SREM", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SREM";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SSCAN key cursor [MATCH pattern] [COUNT count]
 *
 * (readonly, random)
 * (arity -3, first key 1, last key 1)
 *
 * Incrementally iterate Set elements.
 *
 * @see http://redis.io/commands/sscan
 * @since 2.8.0
 */
Commands.prototype.sscan = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("SSCAN: wrong number of arguments");
        }
        case 2:
        {
            args = [0x10001, "SSCAN", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "SSCAN";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * STRLEN key
 *
 * (readonly, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Get the length of the value stored in a key.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/strlen
 * @since 2.2.0
 */
Commands.prototype.strlen = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "STRLEN", arg0]);
    }
    else
    {
        this._c([0x10001, "STRLEN", arg0, callback]);
    }
};

/**
 * SUBSCRIBE channel [channel ...]
 *
 * (pubsub, noscript, loading, stale)
 * (arity -2, first key 0, last key 0)
 *
 * Listen for messages published to the given channels.
 *
 * @see http://redis.io/commands/subscribe
 * @since 2.0.0
 */
Commands.prototype.subscribe = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("SUBSCRIBE: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "SUBSCRIBE", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "SUBSCRIBE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "SUBSCRIBE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SUBSTR key arg arg arg
 *
 * (readonly)
 * (arity 4, first key 1, last key 1)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/substr
 * @since not known
 */
Commands.prototype.substr = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("SUBSTR: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "SUBSTR";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SUNION key [key ...]
 *
 * (readonly, sort_for_script)
 * (arity -2, first key 1, last key -1)
 *
 * Add multiple sets.
 *
 * @see http://redis.io/commands/sunion
 * @since 1.0.0
 */
Commands.prototype.sunion = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("SUNION: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10001, "SUNION", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10001, "SUNION", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "SUNION";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SUNIONSTORE destination key [key ...]
 *
 * (write, denyoom)
 * (arity -3, first key 1, last key -1)
 *
 * Add multiple sets and store the resulting set in a key.
 *
 * @see http://redis.io/commands/sunionstore
 * @since 1.0.0
 */
Commands.prototype.sunionstore = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("SUNIONSTORE: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "SUNIONSTORE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "SUNIONSTORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * SWAPDB arg arg arg
 *
 * (write, fast)
 * (arity 3, first key 0, last key 0)
 *
 * Help not available.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/swapdb
 * @since not known
 */
Commands.prototype.swapdb = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x20000, "SWAPDB", arg0, arg1]);
    }
    else
    {
        this._c([0x20000, "SWAPDB", arg0, arg1, callback]);
    }
};

/**
 * SYNC -
 *
 * (readonly, admin, noscript)
 * (arity 1, first key 0, last key 0)
 *
 * Internal command used for replication.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/sync
 * @since 1.0.0
 */
Commands.prototype.sync = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "SYNC"]);
    }
    else
    {
        this._c([0x0, "SYNC", callback]);
    }
};

/**
 * TIME -
 *
 * (random, fast)
 * (arity 1, first key 0, last key 0)
 *
 * Return the current server time.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/time
 * @since 2.6.0
 */
Commands.prototype.time = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "TIME"]);
    }
    else
    {
        this._c([0x0, "TIME", callback]);
    }
};

/**
 * TOUCH key arg ...options...
 *
 * (readonly, fast)
 * (arity -2, first key 1, last key 1)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/touch
 * @since not known
 */
Commands.prototype.touch = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("TOUCH: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10001, "TOUCH", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10001, "TOUCH", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "TOUCH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * TTL key
 *
 * (readonly, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Get the time to live for a key.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/ttl
 * @since 1.0.0
 */
Commands.prototype.ttl = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "TTL", arg0]);
    }
    else
    {
        this._c([0x10001, "TTL", arg0, callback]);
    }
};

/**
 * TYPE key
 *
 * (readonly, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Determine the type stored at key.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/type
 * @since 1.0.0
 */
Commands.prototype.type = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "TYPE", arg0]);
    }
    else
    {
        this._c([0x10001, "TYPE", arg0, callback]);
    }
};

/**
 * UNLINK key arg ...options...
 *
 * (write, fast)
 * (arity -2, first key 1, last key -1)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/unlink
 * @since not known
 */
Commands.prototype.unlink = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("UNLINK: wrong number of arguments");
        }
        case 1:
        {
            args = [0x20001, "UNLINK", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20001, "UNLINK", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "UNLINK";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * UNSUBSCRIBE [channel [channel ...]]
 *
 * (pubsub, noscript, loading, stale)
 * (arity -1, first key 0, last key 0)
 *
 * Stop listening for messages posted to the given channels.
 *
 * @see http://redis.io/commands/unsubscribe
 * @since 2.0.0
 */
Commands.prototype.unsubscribe = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x0, "UNSUBSCRIBE"];
            break;
        }
        case 1:
        {
            args = [0x0, "UNSUBSCRIBE", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "UNSUBSCRIBE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "UNSUBSCRIBE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * UNWATCH -
 *
 * (noscript, fast)
 * (arity 1, first key 0, last key 0)
 *
 * Forget about all watched keys.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/unwatch
 * @since 2.2.0
 */
Commands.prototype.unwatch = function(callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "UNWATCH"]);
    }
    else
    {
        this._c([0x0, "UNWATCH", callback]);
    }
};

/**
 * WAIT numslaves timeout
 *
 * (noscript)
 * (arity 3, first key 0, last key 0)
 *
 * Wait for the synchronous replication of all the write commands sent in the context of the current connection.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/wait
 * @since 3.0.0
 */
Commands.prototype.wait = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x0, "WAIT", arg0, arg1]);
    }
    else
    {
        this._c([0x0, "WAIT", arg0, arg1, callback]);
    }
};

/**
 * WATCH key [key ...]
 *
 * (noscript, fast)
 * (arity -2, first key 1, last key -1)
 *
 * Watch the given keys to determine execution of the MULTI/EXEC block.
 *
 * @see http://redis.io/commands/watch
 * @since 2.2.0
 */
Commands.prototype.watch = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("WATCH: wrong number of arguments");
        }
        case 1:
        {
            args = [0x1, "WATCH", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x1, "WATCH", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x1;
            args[1] = "WATCH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZADD key [NX|XX] [CH] [INCR] score member [score member ...]
 *
 * (write, denyoom, fast)
 * (arity -4, first key 1, last key 1)
 *
 * Add one or more members to a sorted set, or update its score if it already exists.
 *
 * @see http://redis.io/commands/zadd
 * @since 1.2.0
 */
Commands.prototype.zadd = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZADD: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "ZADD";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZCARD key
 *
 * (readonly, fast)
 * (arity 2, first key 1, last key 1)
 *
 * Get the number of members in a sorted set.
 *
 * @param {Object} arg0 the first argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/zcard
 * @since 1.2.0
 */
Commands.prototype.zcard = function(arg0, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "ZCARD", arg0]);
    }
    else
    {
        this._c([0x10001, "ZCARD", arg0, callback]);
    }
};

/**
 * ZCOUNT key min max
 *
 * (readonly, fast)
 * (arity 4, first key 1, last key 1)
 *
 * Count the members in a sorted set with scores within the given values.
 *
 * @see http://redis.io/commands/zcount
 * @since 2.0.0
 */
Commands.prototype.zcount = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZCOUNT: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "ZCOUNT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZINCRBY key increment member
 *
 * (write, denyoom, fast)
 * (arity 4, first key 1, last key 1)
 *
 * Increment the score of a member in a sorted set.
 *
 * @see http://redis.io/commands/zincrby
 * @since 1.2.0
 */
Commands.prototype.zincrby = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZINCRBY: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "ZINCRBY";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight] [AGGREGATE SUM|MIN|MAX]
 *
 * (write, denyoom, movablekeys)
 * (arity -4, first key 0, last key 0)
 *
 * Intersect multiple sorted sets and store the resulting sorted set in a new key.
 *
 * @see http://redis.io/commands/zinterstore
 * @since 2.0.0
 */
Commands.prototype.zinterstore = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZINTERSTORE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "ZINTERSTORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZLEXCOUNT key min max
 *
 * (readonly, fast)
 * (arity 4, first key 1, last key 1)
 *
 * Count the number of members in a sorted set between a given lexicographical range.
 *
 * @see http://redis.io/commands/zlexcount
 * @since 2.8.9
 */
Commands.prototype.zlexcount = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZLEXCOUNT: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "ZLEXCOUNT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZRANGE key start stop [WITHSCORES]
 *
 * (readonly)
 * (arity -4, first key 1, last key 1)
 *
 * Return a range of members in a sorted set, by index.
 *
 * @see http://redis.io/commands/zrange
 * @since 1.2.0
 */
Commands.prototype.zrange = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZRANGE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "ZRANGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZRANGEBYLEX key min max [LIMIT offset count]
 *
 * (readonly)
 * (arity -4, first key 1, last key 1)
 *
 * Return a range of members in a sorted set, by lexicographical range.
 *
 * @see http://redis.io/commands/zrangebylex
 * @since 2.8.9
 */
Commands.prototype.zrangebylex = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZRANGEBYLEX: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "ZRANGEBYLEX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]
 *
 * (readonly)
 * (arity -4, first key 1, last key 1)
 *
 * Return a range of members in a sorted set, by score.
 *
 * @see http://redis.io/commands/zrangebyscore
 * @since 1.0.5
 */
Commands.prototype.zrangebyscore = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZRANGEBYSCORE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "ZRANGEBYSCORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZRANK key member
 *
 * (readonly, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Determine the index of a member in a sorted set.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/zrank
 * @since 2.0.0
 */
Commands.prototype.zrank = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "ZRANK", arg0, arg1]);
    }
    else
    {
        this._c([0x10001, "ZRANK", arg0, arg1, callback]);
    }
};

/**
 * ZREM key member [member ...]
 *
 * (write, fast)
 * (arity -3, first key 1, last key 1)
 *
 * Remove one or more members from a sorted set.
 *
 * @see http://redis.io/commands/zrem
 * @since 1.2.0
 */
Commands.prototype.zrem = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("ZREM: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20001, "ZREM", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "ZREM";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZREMRANGEBYLEX key min max
 *
 * (write)
 * (arity 4, first key 1, last key 1)
 *
 * Remove all members in a sorted set between the given lexicographical range.
 *
 * @see http://redis.io/commands/zremrangebylex
 * @since 2.8.9
 */
Commands.prototype.zremrangebylex = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZREMRANGEBYLEX: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "ZREMRANGEBYLEX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZREMRANGEBYRANK key start stop
 *
 * (write)
 * (arity 4, first key 1, last key 1)
 *
 * Remove all members in a sorted set within the given indexes.
 *
 * @see http://redis.io/commands/zremrangebyrank
 * @since 2.0.0
 */
Commands.prototype.zremrangebyrank = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZREMRANGEBYRANK: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "ZREMRANGEBYRANK";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZREMRANGEBYSCORE key min max
 *
 * (write)
 * (arity 4, first key 1, last key 1)
 *
 * Remove all members in a sorted set within the given scores.
 *
 * @see http://redis.io/commands/zremrangebyscore
 * @since 1.2.0
 */
Commands.prototype.zremrangebyscore = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZREMRANGEBYSCORE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20001;
            args[1] = "ZREMRANGEBYSCORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZREVRANGE key start stop [WITHSCORES]
 *
 * (readonly)
 * (arity -4, first key 1, last key 1)
 *
 * Return a range of members in a sorted set, by index, with scores ordered from high to low.
 *
 * @see http://redis.io/commands/zrevrange
 * @since 1.2.0
 */
Commands.prototype.zrevrange = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZREVRANGE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "ZREVRANGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZREVRANGEBYLEX key max min [LIMIT offset count]
 *
 * (readonly)
 * (arity -4, first key 1, last key 1)
 *
 * Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.
 *
 * @see http://redis.io/commands/zrevrangebylex
 * @since 2.8.9
 */
Commands.prototype.zrevrangebylex = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZREVRANGEBYLEX: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "ZREVRANGEBYLEX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]
 *
 * (readonly)
 * (arity -4, first key 1, last key 1)
 *
 * Return a range of members in a sorted set, by score, with scores ordered from high to low.
 *
 * @see http://redis.io/commands/zrevrangebyscore
 * @since 2.2.0
 */
Commands.prototype.zrevrangebyscore = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZREVRANGEBYSCORE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "ZREVRANGEBYSCORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZREVRANK key member
 *
 * (readonly, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Determine the index of a member in a sorted set, with scores ordered from high to low.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/zrevrank
 * @since 2.0.0
 */
Commands.prototype.zrevrank = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "ZREVRANK", arg0, arg1]);
    }
    else
    {
        this._c([0x10001, "ZREVRANK", arg0, arg1, callback]);
    }
};

/**
 * ZSCAN key cursor [MATCH pattern] [COUNT count]
 *
 * (readonly, random)
 * (arity -3, first key 1, last key 1)
 *
 * Incrementally iterate sorted sets elements and associated scores.
 *
 * @see http://redis.io/commands/zscan
 * @since 2.8.0
 */
Commands.prototype.zscan = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("ZSCAN: wrong number of arguments");
        }
        case 2:
        {
            args = [0x10001, "ZSCAN", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10001;
            args[1] = "ZSCAN";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};

/**
 * ZSCORE key member
 *
 * (readonly, fast)
 * (arity 3, first key 1, last key 1)
 *
 * Get the score associated with the given member in a sorted set.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/zscore
 * @since 1.2.0
 */
Commands.prototype.zscore = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        this._c([0x10001, "ZSCORE", arg0, arg1]);
    }
    else
    {
        this._c([0x10001, "ZSCORE", arg0, arg1, callback]);
    }
};

/**
 * ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight] [AGGREGATE SUM|MIN|MAX]
 *
 * (write, denyoom, movablekeys)
 * (arity -4, first key 0, last key 0)
 *
 * Add multiple sorted sets and store the resulting sorted set in a new key.
 *
 * @see http://redis.io/commands/zunionstore
 * @since 2.0.0
 */
Commands.prototype.zunionstore = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        case 2:
        {
            throw new Error("ZUNIONSTORE: wrong number of arguments");
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "ZUNIONSTORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    this._c(args);
};