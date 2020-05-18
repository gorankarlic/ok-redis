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

/**
 * ACL CAT [categoryname]
 *
 * (admin, noscript, loading, stale, skip_slowlog, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * List the ACL categories or the commands inside a category.
 *
 * @see http://redis.io/commands/acl
 * @since 6.0.0
 *
 * ----
 *
 * ACL DELUSER username [username ...]
 *
 * (admin, noscript, loading, stale, skip_slowlog, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Remove the specified ACL users and the associated rules.
 *
 * @see http://redis.io/commands/acl
 * @since 6.0.0
 *
 * ----
 *
 * ACL GENPASS [bits]
 *
 * (admin, noscript, loading, stale, skip_slowlog, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Generate a pseudorandom secure password to use for ACL users.
 *
 * @see http://redis.io/commands/acl
 * @since 6.0.0
 *
 * ----
 *
 * ACL LIST -
 *
 * (admin, noscript, loading, stale, skip_slowlog, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * List the current ACL rules in ACL config file format.
 *
 * @see http://redis.io/commands/acl
 * @since 6.0.0
 *
 * ----
 *
 * ACL LOAD -
 *
 * (admin, noscript, loading, stale, skip_slowlog, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Reload the ACLs from the configured ACL file.
 *
 * @see http://redis.io/commands/acl
 * @since 6.0.0
 *
 * ----
 *
 * ACL LOG [count or RESET]
 *
 * (admin, noscript, loading, stale, skip_slowlog, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * List latest events denied because of ACLs in place.
 *
 * @see http://redis.io/commands/acl
 * @since 6.0.0
 *
 * ----
 *
 * ACL SAVE -
 *
 * (admin, noscript, loading, stale, skip_slowlog, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Save the current ACL rules in the configured ACL file.
 *
 * @see http://redis.io/commands/acl
 * @since 6.0.0
 *
 * ----
 *
 * ACL SETUSER rule [rule ...]
 *
 * (admin, noscript, loading, stale, skip_slowlog, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Modify or create the rules for a specific ACL user.
 *
 * @see http://redis.io/commands/acl
 * @since 6.0.0
 *
 * ----
 *
 * ACL USERS -
 *
 * (admin, noscript, loading, stale, skip_slowlog, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * List the username of all the configured ACL rules.
 *
 * @see http://redis.io/commands/acl
 * @since 6.0.0
 *
 * ----
 *
 * ACL WHOAMI -
 *
 * (admin, noscript, loading, stale, skip_slowlog, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Return the name of the user associated to the current connection.
 *
 * @see http://redis.io/commands/acl
 * @since 6.0.0
 */
Commands.prototype.acl = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("ACL: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "ACL", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "ACL", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "ACL";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * APPEND key value
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "APPEND", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "APPEND", arg0, arg1, callback]);
    }
};

/**
 * ASKING
 *
 * (fast, 0, 0)
 * (arity 1, first key 0, last key NaN)
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
        return this._cp([0x0, "ASKING"]);
    }
    else
    {
        this._cc([0x0, "ASKING", callback]);
    }
};

/**
 * AUTH password
 *
 * (noscript, loading, stale, skip_monitor, skip_slowlog, fast, no_auth, 0, 0)
 * (arity -2, first key 0, last key NaN)
 *
 * Authenticate to the server.
 *
 * @see http://redis.io/commands/auth
 * @since 1.0.0
 */
Commands.prototype.auth = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("AUTH: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "AUTH", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "AUTH", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "AUTH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * BGREWRITEAOF -
 *
 * (admin, noscript, 0, 0, 0)
 * (arity 1, first key NaN, last key NaN)
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
        return this._cp([0x0, "BGREWRITEAOF"]);
    }
    else
    {
        this._cc([0x0, "BGREWRITEAOF", callback]);
    }
};

/**
 * BGSAVE [SCHEDULE]
 *
 * (admin, noscript, 0, 0, 0)
 * (arity -1, first key NaN, last key NaN)
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
    return this._c(args);
};

/**
 * BITCOUNT key [start end]
 *
 * (readonly, 1, 1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x10000, "BITCOUNT", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "BITCOUNT", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "BITCOUNT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]
 *
 * (write, denyoom, 1, 1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x20000, "BITFIELD", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20000, "BITFIELD", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "BITFIELD";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * BITFIELD_RO key ...options...
 *
 * (readonly, fast, 1, 1, 1)
 * (arity -2, first key NaN, last key NaN)
 *
 * Help not available.
 *
 * @see http://redis.io/commands/bitfield_ro
 * @since not known
 */
Commands.prototype.bitfield_ro = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("BITFIELD_RO: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10000, "BITFIELD_RO", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "BITFIELD_RO", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "BITFIELD_RO";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * BITOP operation destkey key [key ...]
 *
 * (write, denyoom, 2, -1, 1)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "BITOP";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * BITPOS key bit [start] [end]
 *
 * (readonly, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x10000, "BITPOS", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "BITPOS";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * BLPOP key [key ...] timeout
 *
 * (write, noscript, 1, -2, 1, @write)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "BLPOP", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "BLPOP";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * BRPOP key [key ...] timeout
 *
 * (write, noscript, 1, -2, 1, @write)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "BRPOP", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "BRPOP";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * BRPOPLPUSH source destination timeout
 *
 * (write, denyoom, noscript, 1, 2, 1, @write)
 * (arity 4, first key NaN, last key NaN)
 *
 * Pop an element from a list, push it to another list and return it; or block until one is available.
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
            args[0] = 0x20000;
            args[1] = "BRPOPLPUSH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * BZPOPMAX key [key ...] timeout
 *
 * (write, noscript, fast, 1, -2, 1, @write)
 * (arity -3, first key NaN, last key NaN)
 *
 * Remove and return the member with the highest score from one or more sorted sets, or block until one is available.
 *
 * @see http://redis.io/commands/bzpopmax
 * @since 5.0.0
 */
Commands.prototype.bzpopmax = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("BZPOPMAX: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20000, "BZPOPMAX", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "BZPOPMAX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * BZPOPMIN key [key ...] timeout
 *
 * (write, noscript, fast, 1, -2, 1, @write)
 * (arity -3, first key NaN, last key NaN)
 *
 * Remove and return the member with the lowest score from one or more sorted sets, or block until one is available.
 *
 * @see http://redis.io/commands/bzpopmin
 * @since 5.0.0
 */
Commands.prototype.bzpopmin = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        case 1:
        {
            throw new Error("BZPOPMIN: wrong number of arguments");
        }
        case 2:
        {
            args = [0x20000, "BZPOPMIN", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "BZPOPMIN";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * CLIENT CACHING YES|NO
 *
 * (admin, noscript, random, loading, stale, 0, 0, 0, @admin)
 * (arity -2, first key NaN, last key NaN)
 *
 * Instruct the server about tracking or not keys in the next request.
 *
 * @see http://redis.io/commands/client
 * @since 6.0.0
 *
 * ----
 *
 * CLIENT GETNAME -
 *
 * (admin, noscript, random, loading, stale, 0, 0, 0, @admin)
 * (arity -2, first key NaN, last key NaN)
 *
 * Get the current connection name.
 *
 * @see http://redis.io/commands/client
 * @since 2.6.9
 *
 * ----
 *
 * CLIENT GETREDIR -
 *
 * (admin, noscript, random, loading, stale, 0, 0, 0, @admin)
 * (arity -2, first key NaN, last key NaN)
 *
 * Get tracking notifications redirection client ID if any.
 *
 * @see http://redis.io/commands/client
 * @since 6.0.0
 *
 * ----
 *
 * CLIENT ID -
 *
 * (admin, noscript, random, loading, stale, 0, 0, 0, @admin)
 * (arity -2, first key NaN, last key NaN)
 *
 * Returns the client ID for the current connection.
 *
 * @see http://redis.io/commands/client
 * @since 5.0.0
 *
 * ----
 *
 * CLIENT KILL [ip:port] [ID client-id] [TYPE normal|master|slave|pubsub] [ADDR ip:port] [SKIPME yes/no]
 *
 * (admin, noscript, random, loading, stale, 0, 0, 0, @admin)
 * (arity -2, first key NaN, last key NaN)
 *
 * Kill the connection of a client.
 *
 * @see http://redis.io/commands/client
 * @since 2.4.0
 *
 * ----
 *
 * CLIENT LIST [TYPE normal|master|replica|pubsub]
 *
 * (admin, noscript, random, loading, stale, 0, 0, 0, @admin)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, noscript, random, loading, stale, 0, 0, 0, @admin)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, noscript, random, loading, stale, 0, 0, 0, @admin)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, noscript, random, loading, stale, 0, 0, 0, @admin)
 * (arity -2, first key NaN, last key NaN)
 *
 * Set the current connection name.
 *
 * @see http://redis.io/commands/client
 * @since 2.6.9
 *
 * ----
 *
 * CLIENT TRACKING ON|OFF [REDIRECT client-id] [PREFIX prefix] [BCAST] [OPTIN] [OPTOUT] [NOLOOP]
 *
 * (admin, noscript, random, loading, stale, 0, 0, 0, @admin)
 * (arity -2, first key NaN, last key NaN)
 *
 * Enable or disable server assisted client side caching support.
 *
 * @see http://redis.io/commands/client
 * @since 6.0.0
 *
 * ----
 *
 * CLIENT UNBLOCK client-id [TIMEOUT|ERROR]
 *
 * (admin, noscript, random, loading, stale, 0, 0, 0, @admin)
 * (arity -2, first key NaN, last key NaN)
 *
 * Unblock a client blocked in a blocking command from a different connection.
 *
 * @see http://redis.io/commands/client
 * @since 5.0.0
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
    return this._c(args);
};

/**
 * CLUSTER ADDSLOTS slot [slot ...]
 *
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Assign new hash slots to receiving node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER BUMPEPOCH -
 *
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Advance the cluster config epoch.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER COUNT-FAILURE-REPORTS node-id
 *
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Forces a replica to perform a manual failover of its master.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER FLUSHSLOTS -
 *
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Delete a node's own slots information.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER FORGET node-id
 *
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Force a node cluster to handshake with another node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER MYID -
 *
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Return the node id.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER NODES -
 *
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Get Cluster config for the node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER REPLICAS node-id
 *
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * List replica nodes of the specified master node.
 *
 * @see http://redis.io/commands/cluster
 * @since 5.0.0
 *
 * ----
 *
 * CLUSTER REPLICATE node-id
 *
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Reconfigure a node as a replica of the specified master node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER RESET [HARD|SOFT]
 *
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * List replica nodes of the specified master node.
 *
 * @see http://redis.io/commands/cluster
 * @since 3.0.0
 *
 * ----
 *
 * CLUSTER SLOTS -
 *
 * (admin, random, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
    return this._c(args);
};

/**
 * COMMAND -
 *
 * (random, loading, stale, 0, 0)
 * (arity -1, first key 0, last key NaN)
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
 * (random, loading, stale, 0, 0)
 * (arity -1, first key 0, last key NaN)
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
 * (random, loading, stale, 0, 0)
 * (arity -1, first key 0, last key NaN)
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
 * (random, loading, stale, 0, 0)
 * (arity -1, first key 0, last key NaN)
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
        case 0:
        {
            args = [0x0, "COMMAND"];
            break;
        }
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
    return this._c(args);
};

/**
 * CONFIG GET parameter
 *
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
    return this._c(args);
};

/**
 * DBSIZE -
 *
 * (readonly, fast, 0, 0, 0)
 * (arity 1, first key NaN, last key NaN)
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
        return this._cp([0x10000, "DBSIZE"]);
    }
    else
    {
        this._cc([0x10000, "DBSIZE", callback]);
    }
};

/**
 * DEBUG OBJECT key
 *
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
            throw new Error("DEBUG: wrong number of arguments");
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
    return this._c(args);
};

/**
 * DECR key
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x20000, "DECR", arg0]);
    }
    else
    {
        this._cc([0x20000, "DECR", arg0, callback]);
    }
};

/**
 * DECRBY key decrement
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "DECRBY", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "DECRBY", arg0, arg1, callback]);
    }
};

/**
 * DEL key [key ...]
 *
 * (write, 1, -1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x20000, "DEL", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20000, "DEL", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "DEL";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * DISCARD -
 *
 * (noscript, loading, stale, fast, 0, 0)
 * (arity 1, first key 0, last key NaN)
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
        return this._cp([0x0, "DISCARD"]);
    }
    else
    {
        this._cc([0x0, "DISCARD", callback]);
    }
};

/**
 * DUMP key
 *
 * (readonly, random, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "DUMP", arg0]);
    }
    else
    {
        this._cc([0x10000, "DUMP", arg0, callback]);
    }
};

/**
 * ECHO message
 *
 * (readonly, fast, 0, 0, 0)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "ECHO", arg0]);
    }
    else
    {
        this._cc([0x10000, "ECHO", arg0, callback]);
    }
};

/**
 * EVAL script numkeys key [key ...] arg [arg ...]
 *
 * (noscript, movablekeys, 0, 0)
 * (arity -3, first key 0, last key NaN)
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
    return this._c(args);
};

/**
 * EVALSHA sha1 numkeys key [key ...] arg [arg ...]
 *
 * (noscript, movablekeys, 0, 0)
 * (arity -3, first key 0, last key NaN)
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
    return this._c(args);
};

/**
 * EXEC -
 *
 * (noscript, loading, stale, skip_monitor, skip_slowlog, 0, 0)
 * (arity 1, first key 0, last key NaN)
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
        return this._cp([0x0, "EXEC"]);
    }
    else
    {
        this._cc([0x0, "EXEC", callback]);
    }
};

/**
 * EXISTS key [key ...]
 *
 * (readonly, fast, 1, -1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x10000, "EXISTS", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "EXISTS", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "EXISTS";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * EXPIRE key seconds
 *
 * (write, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "EXPIRE", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "EXPIRE", arg0, arg1, callback]);
    }
};

/**
 * EXPIREAT key timestamp
 *
 * (write, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "EXPIREAT", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "EXPIREAT", arg0, arg1, callback]);
    }
};

/**
 * FLUSHALL [ASYNC]
 *
 * (write, 0, 0, 0, @keyspace)
 * (arity -1, first key NaN, last key NaN)
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
    return this._c(args);
};

/**
 * FLUSHDB [ASYNC]
 *
 * (write, 0, 0, 0, @keyspace)
 * (arity -1, first key NaN, last key NaN)
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
    return this._c(args);
};

/**
 * GEOADD key longitude latitude member [longitude latitude member ...]
 *
 * (write, denyoom, 1, 1, 1)
 * (arity -5, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "GEOADD";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * GEODIST key member1 member2 [m|km|ft|mi]
 *
 * (readonly, 1, 1, 1)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "GEODIST";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * GEOHASH key member [member ...]
 *
 * (readonly, 1, 1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x10000, "GEOHASH", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "GEOHASH", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "GEOHASH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * GEOPOS key member [member ...]
 *
 * (readonly, 1, 1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x10000, "GEOPOS", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "GEOPOS", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "GEOPOS";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
 *
 * (write, movablekeys, 1, 1, 1)
 * (arity -6, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "GEORADIUS";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * GEORADIUS_RO key arg arg arg arg ...options...
 *
 * (readonly, movablekeys, 1, 1, 1)
 * (arity -6, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "GEORADIUS_RO";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]
 *
 * (write, movablekeys, 1, 1, 1)
 * (arity -5, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "GEORADIUSBYMEMBER";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * GEORADIUSBYMEMBER_RO key arg arg arg ...options...
 *
 * (readonly, movablekeys, 1, 1, 1)
 * (arity -5, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "GEORADIUSBYMEMBER_RO";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * GET key
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "GET", arg0]);
    }
    else
    {
        this._cc([0x10000, "GET", arg0, callback]);
    }
};

/**
 * GETBIT key offset
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x10000, "GETBIT", arg0, arg1]);
    }
    else
    {
        this._cc([0x10000, "GETBIT", arg0, arg1, callback]);
    }
};

/**
 * GETRANGE key start end
 *
 * (readonly, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "GETRANGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * GETSET key value
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "GETSET", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "GETSET", arg0, arg1, callback]);
    }
};

/**
 * HDEL key field [field ...]
 *
 * (write, fast, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "HDEL", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "HDEL";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * HELLO protover [AUTH username password] [SETNAME clientname]
 *
 * (noscript, loading, stale, skip_monitor, skip_slowlog, fast, no_auth, 0, 0)
 * (arity -2, first key 0, last key NaN)
 *
 * switch Redis protocol.
 *
 * @see http://redis.io/commands/hello
 * @since 6.0.0
 */
Commands.prototype.hello = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("HELLO: wrong number of arguments");
        }
        case 1:
        {
            args = [0x0, "HELLO", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "HELLO", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "HELLO";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * HEXISTS key field
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x10000, "HEXISTS", arg0, arg1]);
    }
    else
    {
        this._cc([0x10000, "HEXISTS", arg0, arg1, callback]);
    }
};

/**
 * HGET key field
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x10000, "HGET", arg0, arg1]);
    }
    else
    {
        this._cc([0x10000, "HGET", arg0, arg1, callback]);
    }
};

/**
 * HGETALL key
 *
 * (readonly, random, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "HGETALL", arg0]);
    }
    else
    {
        this._cc([0x10000, "HGETALL", arg0, callback]);
    }
};

/**
 * HINCRBY key field increment
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "HINCRBY";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * HINCRBYFLOAT key field increment
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "HINCRBYFLOAT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * HKEYS key
 *
 * (readonly, sort_for_script, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "HKEYS", arg0]);
    }
    else
    {
        this._cc([0x10000, "HKEYS", arg0, callback]);
    }
};

/**
 * HLEN key
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "HLEN", arg0]);
    }
    else
    {
        this._cc([0x10000, "HLEN", arg0, callback]);
    }
};

/**
 * HMGET key field [field ...]
 *
 * (readonly, fast, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x10000, "HMGET", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "HMGET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * HMSET key field value [field value ...]
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "HMSET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * HOST: ...options...
 *
 * (readonly, loading, stale, 0, 0)
 * (arity -1, first key 0, last key NaN)
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
            args = [0x10000, "HOST:"];
            break;
        }
        case 1:
        {
            args = [0x10000, "HOST:", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "HOST:", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "HOST:";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * HSCAN key cursor [MATCH pattern] [COUNT count]
 *
 * (readonly, random, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x10000, "HSCAN", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "HSCAN";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * HSET key field value [field value ...]
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "HSET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * HSETNX key field value
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "HSETNX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * HSTRLEN key field
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x10000, "HSTRLEN", arg0, arg1]);
    }
    else
    {
        this._cc([0x10000, "HSTRLEN", arg0, arg1, callback]);
    }
};

/**
 * HVALS key
 *
 * (readonly, sort_for_script, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "HVALS", arg0]);
    }
    else
    {
        this._cc([0x10000, "HVALS", arg0, callback]);
    }
};

/**
 * INCR key
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x20000, "INCR", arg0]);
    }
    else
    {
        this._cc([0x20000, "INCR", arg0, callback]);
    }
};

/**
 * INCRBY key increment
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "INCRBY", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "INCRBY", arg0, arg1, callback]);
    }
};

/**
 * INCRBYFLOAT key increment
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "INCRBYFLOAT", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "INCRBYFLOAT", arg0, arg1, callback]);
    }
};

/**
 * INFO [section]
 *
 * (random, loading, stale, 0, 0)
 * (arity -1, first key 0, last key NaN)
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
    return this._c(args);
};

/**
 * KEYS pattern
 *
 * (readonly, sort_for_script, 0, 0, 0, @keyspace)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "KEYS", arg0]);
    }
    else
    {
        this._cc([0x10000, "KEYS", arg0, callback]);
    }
};

/**
 * LASTSAVE -
 *
 * (readonly, random, loading, stale, fast, 0, 0, 0, @read)
 * (arity 1, first key NaN, last key NaN)
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
        return this._cp([0x10000, "LASTSAVE"]);
    }
    else
    {
        this._cc([0x10000, "LASTSAVE", callback]);
    }
};

/**
 * LATENCY DOCTOR -
 *
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Return a human readable latency analysis report.
 *
 * @see http://redis.io/commands/latency
 * @since 2.8.13
 *
 * ----
 *
 * LATENCY GRAPH event
 *
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Return a latency graph for the event.
 *
 * @see http://redis.io/commands/latency
 * @since 2.8.13
 *
 * ----
 *
 * LATENCY HELP -
 *
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Show helpful text about the different subcommands.
 *
 * @see http://redis.io/commands/latency
 * @since 2.8.13
 *
 * ----
 *
 * LATENCY HISTORY event
 *
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Return timestamp-latency samples for the event.
 *
 * @see http://redis.io/commands/latency
 * @since 2.8.13
 *
 * ----
 *
 * LATENCY LATEST -
 *
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Return the latest latency samples for all events.
 *
 * @see http://redis.io/commands/latency
 * @since 2.8.13
 *
 * ----
 *
 * LATENCY RESET [event]
 *
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Reset latency data for one or more events.
 *
 * @see http://redis.io/commands/latency
 * @since 2.8.13
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
    return this._c(args);
};

/**
 * LINDEX key index
 *
 * (readonly, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x10000, "LINDEX", arg0, arg1]);
    }
    else
    {
        this._cc([0x10000, "LINDEX", arg0, arg1, callback]);
    }
};

/**
 * LINSERT key BEFORE|AFTER pivot element
 *
 * (write, denyoom, 1, 1, 1)
 * (arity 5, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "LINSERT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * LLEN key
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "LLEN", arg0]);
    }
    else
    {
        this._cc([0x10000, "LLEN", arg0, callback]);
    }
};

/**
 * LOLWUT [VERSION version]
 *
 * (readonly, fast, 0, 0)
 * (arity -1, first key 0, last key NaN)
 *
 * Display some computer art and the Redis version.
 *
 * @see http://redis.io/commands/lolwut
 * @since 5.0.0
 */
Commands.prototype.lolwut = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x10000, "LOLWUT"];
            break;
        }
        case 1:
        {
            args = [0x10000, "LOLWUT", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "LOLWUT", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "LOLWUT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * LPOP key
 *
 * (write, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x20000, "LPOP", arg0]);
    }
    else
    {
        this._cc([0x20000, "LPOP", arg0, callback]);
    }
};

/**
 * LPUSH key element [element ...]
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
 *
 * Prepend one or multiple elements to a list.
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
            args = [0x20000, "LPUSH", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "LPUSH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * LPUSHX key element [element ...]
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
 *
 * Prepend an element to a list, only if the list exists.
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
            args = [0x20000, "LPUSHX", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "LPUSHX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * LRANGE key start stop
 *
 * (readonly, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "LRANGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * LREM key count element
 *
 * (write, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "LREM";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * LSET key index element
 *
 * (write, denyoom, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "LSET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * LTRIM key start stop
 *
 * (write, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "LTRIM";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * MEMORY DOCTOR -
 *
 * (readonly, random, movablekeys, 0, 0)
 * (arity -2, first key 0, last key NaN)
 *
 * Outputs memory problems report.
 *
 * @see http://redis.io/commands/memory
 * @since 4.0.0
 *
 * ----
 *
 * MEMORY HELP -
 *
 * (readonly, random, movablekeys, 0, 0)
 * (arity -2, first key 0, last key NaN)
 *
 * Show helpful text about the different subcommands.
 *
 * @see http://redis.io/commands/memory
 * @since 4.0.0
 *
 * ----
 *
 * MEMORY MALLOC-STATS -
 *
 * (readonly, random, movablekeys, 0, 0)
 * (arity -2, first key 0, last key NaN)
 *
 * Show allocator internal stats.
 *
 * @see http://redis.io/commands/memory
 * @since 4.0.0
 *
 * ----
 *
 * MEMORY PURGE -
 *
 * (readonly, random, movablekeys, 0, 0)
 * (arity -2, first key 0, last key NaN)
 *
 * Ask the allocator to release memory.
 *
 * @see http://redis.io/commands/memory
 * @since 4.0.0
 *
 * ----
 *
 * MEMORY STATS -
 *
 * (readonly, random, movablekeys, 0, 0)
 * (arity -2, first key 0, last key NaN)
 *
 * Show memory usage details.
 *
 * @see http://redis.io/commands/memory
 * @since 4.0.0
 *
 * ----
 *
 * MEMORY USAGE key [SAMPLES count]
 *
 * (readonly, random, movablekeys, 0, 0)
 * (arity -2, first key 0, last key NaN)
 *
 * Estimate the memory usage of a key.
 *
 * @see http://redis.io/commands/memory
 * @since 4.0.0
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
    return this._c(args);
};

/**
 * MGET key [key ...]
 *
 * (readonly, fast, 1, -1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x10000, "MGET", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "MGET", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "MGET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * MIGRATE host port key| destination-db timeout [COPY] [REPLACE] [AUTH password] [KEYS key]
 *
 * (write, random, movablekeys, 0, 0, 0, @keyspace)
 * (arity -6, first key NaN, last key NaN)
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
    return this._c(args);
};

/**
 * MODULE LIST -
 *
 * (admin, noscript, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * List all modules loaded by the server.
 *
 * @see http://redis.io/commands/module
 * @since 4.0.0
 *
 * ----
 *
 * MODULE LOAD path [arg]
 *
 * (admin, noscript, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Load a module.
 *
 * @see http://redis.io/commands/module
 * @since 4.0.0
 *
 * ----
 *
 * MODULE UNLOAD name
 *
 * (admin, noscript, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Unload a module.
 *
 * @see http://redis.io/commands/module
 * @since 4.0.0
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
            args = [0x0, "MODULE", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "MODULE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "MODULE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * MONITOR -
 *
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity 1, first key NaN, last key NaN)
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
        return this._cp([0x0, "MONITOR"]);
    }
    else
    {
        this._cc([0x0, "MONITOR", callback]);
    }
};

/**
 * MOVE key db
 *
 * (write, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "MOVE", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "MOVE", arg0, arg1, callback]);
    }
};

/**
 * MSET key value [key value ...]
 *
 * (write, denyoom, 1, -1, 2)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "MSET", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "MSET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * MSETNX key value [key value ...]
 *
 * (write, denyoom, 1, -1, 2)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "MSETNX", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "MSETNX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * MULTI -
 *
 * (noscript, loading, stale, fast, 0, 0)
 * (arity 1, first key 0, last key NaN)
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
        return this._cp([0x0, "MULTI"]);
    }
    else
    {
        this._cc([0x0, "MULTI", callback]);
    }
};

/**
 * OBJECT subcommand [arguments [arguments ...]]
 *
 * (readonly, random, 2, 2, 1)
 * (arity -2, first key NaN, last key NaN)
 *
 * Inspect the internals of Redis objects.
 *
 * @see http://redis.io/commands/object
 * @since 2.2.3
 */
Commands.prototype.object = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("OBJECT: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10000, "OBJECT", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "OBJECT", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "OBJECT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * PERSIST key
 *
 * (write, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x20000, "PERSIST", arg0]);
    }
    else
    {
        this._cc([0x20000, "PERSIST", arg0, callback]);
    }
};

/**
 * PEXPIRE key milliseconds
 *
 * (write, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "PEXPIRE", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "PEXPIRE", arg0, arg1, callback]);
    }
};

/**
 * PEXPIREAT key milliseconds-timestamp
 *
 * (write, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "PEXPIREAT", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "PEXPIREAT", arg0, arg1, callback]);
    }
};

/**
 * PFADD key element [element ...]
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x20000, "PFADD", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20000, "PFADD", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "PFADD";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * PFCOUNT key [key ...]
 *
 * (readonly, 1, -1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x10000, "PFCOUNT", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "PFCOUNT", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "PFCOUNT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * PFDEBUG arg arg ...options...
 *
 * (write, admin, 0, 0, 0, @write)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x0, "PFDEBUG", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "PFDEBUG";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * PFMERGE destkey sourcekey [sourcekey ...]
 *
 * (write, denyoom, 1, -1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x20000, "PFMERGE", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20000, "PFMERGE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "PFMERGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * PFSELFTEST
 *
 * (admin, 0, 0, 0, @hyperloglog)
 * (arity 1, first key NaN, last key NaN)
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
        return this._cp([0x0, "PFSELFTEST"]);
    }
    else
    {
        this._cc([0x0, "PFSELFTEST", callback]);
    }
};

/**
 * PING [message]
 *
 * (stale, fast, 0, 0)
 * (arity -1, first key 0, last key NaN)
 *
 * Ping the server.
 *
 * @see http://redis.io/commands/ping
 * @since 1.0.0
 */
Commands.prototype.ping = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            args = [0x0, "PING"];
            break;
        }
        case 1:
        {
            args = [0x0, "PING", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x0, "PING", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x0;
            args[1] = "PING";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * POST ...options...
 *
 * (readonly, loading, stale, 0, 0)
 * (arity -1, first key 0, last key NaN)
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
            args = [0x10000, "POST"];
            break;
        }
        case 1:
        {
            args = [0x10000, "POST", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "POST", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "POST";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * PSETEX key milliseconds value
 *
 * (write, denyoom, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "PSETEX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * PSUBSCRIBE pattern [pattern ...]
 *
 * (pubsub, noscript, loading, stale, 0, 0)
 * (arity -2, first key 0, last key NaN)
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
    return this._c(args);
};

/**
 * PSYNC replicationid offset
 *
 * (admin, noscript, 0, 0, 0)
 * (arity 3, first key NaN, last key NaN)
 *
 * Internal command used for replication.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/psync
 * @since 2.8.0
 */
Commands.prototype.psync = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        return this._cp([0x0, "PSYNC", arg0, arg1]);
    }
    else
    {
        this._cc([0x0, "PSYNC", arg0, arg1, callback]);
    }
};

/**
 * PTTL key
 *
 * (readonly, random, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "PTTL", arg0]);
    }
    else
    {
        this._cc([0x10000, "PTTL", arg0, callback]);
    }
};

/**
 * PUBLISH channel message
 *
 * (pubsub, loading, stale, fast, 0, 0)
 * (arity 3, first key 0, last key NaN)
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
        return this._cp([0x0, "PUBLISH", arg0, arg1]);
    }
    else
    {
        this._cc([0x0, "PUBLISH", arg0, arg1, callback]);
    }
};

/**
 * PUBSUB subcommand [argument [argument ...]]
 *
 * (pubsub, random, loading, stale, 0, 0)
 * (arity -2, first key 0, last key NaN)
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
    return this._c(args);
};

/**
 * PUNSUBSCRIBE [pattern [pattern ...]]
 *
 * (pubsub, noscript, loading, stale, 0, 0)
 * (arity -1, first key 0, last key NaN)
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
    return this._c(args);
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
    return this._c(args);
};

/**
 * RANDOMKEY -
 *
 * (readonly, random, 0, 0, 0)
 * (arity 1, first key NaN, last key NaN)
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
        return this._cp([0x10000, "RANDOMKEY"]);
    }
    else
    {
        this._cc([0x10000, "RANDOMKEY", callback]);
    }
};

/**
 * READONLY -
 *
 * (fast, 0, 0)
 * (arity 1, first key 0, last key NaN)
 *
 * Enables read queries for a connection to a cluster replica node.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/readonly
 * @since 3.0.0
 */
Commands.prototype.readonly = function(callback)
{
    if(callback === void(0))
    {
        return this._cp([0x0, "READONLY"]);
    }
    else
    {
        this._cc([0x0, "READONLY", callback]);
    }
};

/**
 * READWRITE -
 *
 * (fast, 0, 0)
 * (arity 1, first key 0, last key NaN)
 *
 * Disables read queries for a connection to a cluster replica node.
 *
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/readwrite
 * @since 3.0.0
 */
Commands.prototype.readwrite = function(callback)
{
    if(callback === void(0))
    {
        return this._cp([0x0, "READWRITE"]);
    }
    else
    {
        this._cc([0x0, "READWRITE", callback]);
    }
};

/**
 * RENAME key newkey
 *
 * (write, 1, 2, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "RENAME", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "RENAME", arg0, arg1, callback]);
    }
};

/**
 * RENAMENX key newkey
 *
 * (write, fast, 1, 2, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "RENAMENX", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "RENAMENX", arg0, arg1, callback]);
    }
};

/**
 * REPLCONF ...options...
 *
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -1, first key NaN, last key NaN)
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
    return this._c(args);
};

/**
 * REPLICAOF host port
 *
 * (admin, noscript, stale, 0, 0, 0)
 * (arity 3, first key NaN, last key NaN)
 *
 * Make the server a replica of another instance, or promote it as master.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/replicaof
 * @since 5.0.0
 */
Commands.prototype.replicaof = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        return this._cp([0x0, "REPLICAOF", arg0, arg1]);
    }
    else
    {
        this._cc([0x0, "REPLICAOF", arg0, arg1, callback]);
    }
};

/**
 * RESTORE key ttl serialized-value [REPLACE] [ABSTTL] [IDLETIME seconds] [FREQ frequency]
 *
 * (write, denyoom, 1, 1, 1, @keyspace)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "RESTORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * RESTORE-ASKING key arg arg ...options...
 *
 * (write, denyoom, asking, 1, 1, 1, @keyspace)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "RESTORE-ASKING";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ROLE -
 *
 * (readonly, noscript, loading, stale, fast, 0, 0, 0)
 * (arity 1, first key NaN, last key NaN)
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
        return this._cp([0x10000, "ROLE"]);
    }
    else
    {
        this._cc([0x10000, "ROLE", callback]);
    }
};

/**
 * RPOP key
 *
 * (write, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x20000, "RPOP", arg0]);
    }
    else
    {
        this._cc([0x20000, "RPOP", arg0, callback]);
    }
};

/**
 * RPOPLPUSH source destination
 *
 * (write, denyoom, 1, 2, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "RPOPLPUSH", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "RPOPLPUSH", arg0, arg1, callback]);
    }
};

/**
 * RPUSH key element [element ...]
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
 *
 * Append one or multiple elements to a list.
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
            args = [0x20000, "RPUSH", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "RPUSH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * RPUSHX key element [element ...]
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
 *
 * Append an element to a list, only if the list exists.
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
            args = [0x20000, "RPUSHX", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "RPUSHX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SADD key member [member ...]
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "SADD", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "SADD";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SAVE -
 *
 * (admin, noscript, 0, 0, 0)
 * (arity 1, first key NaN, last key NaN)
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
        return this._cp([0x0, "SAVE"]);
    }
    else
    {
        this._cc([0x0, "SAVE", callback]);
    }
};

/**
 * SCAN cursor [MATCH pattern] [COUNT count] [TYPE type]
 *
 * (readonly, random, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
    return this._c(args);
};

/**
 * SCARD key
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "SCARD", arg0]);
    }
    else
    {
        this._cc([0x10000, "SCARD", arg0, callback]);
    }
};

/**
 * SCRIPT DEBUG YES|SYNC|NO
 *
 * (noscript, 0, 0)
 * (arity -2, first key 0, last key NaN)
 *
 * Set the debug mode for executed scripts.
 *
 * @see http://redis.io/commands/script
 * @since 3.2.0
 *
 * ----
 *
 * SCRIPT EXISTS sha1 [sha1 ...]
 *
 * (noscript, 0, 0)
 * (arity -2, first key 0, last key NaN)
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
 * (noscript, 0, 0)
 * (arity -2, first key 0, last key NaN)
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
 * (noscript, 0, 0)
 * (arity -2, first key 0, last key NaN)
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
 * (noscript, 0, 0)
 * (arity -2, first key 0, last key NaN)
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
    return this._c(args);
};

/**
 * SDIFF key [key ...]
 *
 * (readonly, sort_for_script, 1, -1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x10000, "SDIFF", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "SDIFF", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "SDIFF";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SDIFFSTORE destination key [key ...]
 *
 * (write, denyoom, 1, -1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "SDIFFSTORE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "SDIFFSTORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SELECT index
 *
 * (loading, stale, fast, 0, 0)
 * (arity 2, first key 0, last key NaN)
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
        return this._cp([0x0, "SELECT", arg0]);
    }
    else
    {
        this._cc([0x0, "SELECT", arg0, callback]);
    }
};

/**
 * SET key value [EX seconds|PX milliseconds] [NX|XX] [KEEPTTL]
 *
 * (write, denyoom, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "SET", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "SET";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SETBIT key offset value
 *
 * (write, denyoom, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "SETBIT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SETEX key seconds value
 *
 * (write, denyoom, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "SETEX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SETNX key value
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x20000, "SETNX", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "SETNX", arg0, arg1, callback]);
    }
};

/**
 * SETRANGE key offset value
 *
 * (write, denyoom, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "SETRANGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SHUTDOWN [NOSAVE|SAVE]
 *
 * (admin, noscript, loading, stale, 0, 0, 0)
 * (arity -1, first key NaN, last key NaN)
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
    return this._c(args);
};

/**
 * SINTER key [key ...]
 *
 * (readonly, sort_for_script, 1, -1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x10000, "SINTER", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "SINTER", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "SINTER";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SINTERSTORE destination key [key ...]
 *
 * (write, denyoom, 1, -1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "SINTERSTORE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "SINTERSTORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SISMEMBER key member
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x10000, "SISMEMBER", arg0, arg1]);
    }
    else
    {
        this._cc([0x10000, "SISMEMBER", arg0, arg1, callback]);
    }
};

/**
 * SLAVEOF host port
 *
 * (admin, noscript, stale, 0, 0, 0)
 * (arity 3, first key NaN, last key NaN)
 *
 * Make the server a replica of another instance, or promote it as master. Deprecated starting with Redis 5. Use REPLICAOF instead.
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
        return this._cp([0x0, "SLAVEOF", arg0, arg1]);
    }
    else
    {
        this._cc([0x0, "SLAVEOF", arg0, arg1, callback]);
    }
};

/**
 * SLOWLOG subcommand [argument]
 *
 * (admin, random, loading, stale, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
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
    return this._c(args);
};

/**
 * SMEMBERS key
 *
 * (readonly, sort_for_script, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "SMEMBERS", arg0]);
    }
    else
    {
        this._cc([0x10000, "SMEMBERS", arg0, callback]);
    }
};

/**
 * SMOVE source destination member
 *
 * (write, fast, 1, 2, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "SMOVE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC|DESC] [ALPHA] [STORE destination]
 *
 * (write, denyoom, movablekeys, 1, 1, 1, @write, @set, @sortedset)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x20000, "SORT", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20000, "SORT", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "SORT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SPOP key [count]
 *
 * (write, random, fast, 1, 1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x20000, "SPOP", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20000, "SPOP", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "SPOP";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SRANDMEMBER key [count]
 *
 * (readonly, random, 1, 1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x10000, "SRANDMEMBER", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "SRANDMEMBER", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "SRANDMEMBER";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SREM key member [member ...]
 *
 * (write, fast, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "SREM", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "SREM";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SSCAN key cursor [MATCH pattern] [COUNT count]
 *
 * (readonly, random, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x10000, "SSCAN", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "SSCAN";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * STRALGO LCS algo-specific-argument [algo-specific-argument ...]
 *
 * (readonly, movablekeys, 0, 0, 0)
 * (arity -2, first key NaN, last key NaN)
 *
 * Run algorithms (currently LCS) against strings.
 *
 * @see http://redis.io/commands/stralgo
 * @since 6.0.0
 */
Commands.prototype.stralgo = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("STRALGO: wrong number of arguments");
        }
        case 1:
        {
            args = [0x10000, "STRALGO", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "STRALGO", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "STRALGO";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * STRLEN key
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "STRLEN", arg0]);
    }
    else
    {
        this._cc([0x10000, "STRLEN", arg0, callback]);
    }
};

/**
 * SUBSCRIBE channel [channel ...]
 *
 * (pubsub, noscript, loading, stale, 0, 0)
 * (arity -2, first key 0, last key NaN)
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
    return this._c(args);
};

/**
 * SUBSTR key arg arg
 *
 * (readonly, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "SUBSTR";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SUNION key [key ...]
 *
 * (readonly, sort_for_script, 1, -1, 1)
 * (arity -2, first key NaN, last key NaN)
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
            args = [0x10000, "SUNION", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "SUNION", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "SUNION";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SUNIONSTORE destination key [key ...]
 *
 * (write, denyoom, 1, -1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "SUNIONSTORE", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "SUNIONSTORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * SWAPDB index1 index2
 *
 * (write, fast, 0, 0, 0, @keyspace)
 * (arity 3, first key NaN, last key NaN)
 *
 * Swaps two Redis databases.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/swapdb
 * @since 4.0.0
 */
Commands.prototype.swapdb = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        return this._cp([0x20000, "SWAPDB", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "SWAPDB", arg0, arg1, callback]);
    }
};

/**
 * SYNC -
 *
 * (admin, noscript, 0, 0, 0)
 * (arity 1, first key NaN, last key NaN)
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
        return this._cp([0x0, "SYNC"]);
    }
    else
    {
        this._cc([0x0, "SYNC", callback]);
    }
};

/**
 * TIME -
 *
 * (readonly, random, loading, stale, fast, 0, 0)
 * (arity 1, first key 0, last key NaN)
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
        return this._cp([0x10000, "TIME"]);
    }
    else
    {
        this._cc([0x10000, "TIME", callback]);
    }
};

/**
 * TOUCH key [key ...]
 *
 * (readonly, fast, 1, -1, 1)
 * (arity -2, first key NaN, last key NaN)
 *
 * Alters the last access time of a key(s). Returns the number of existing keys specified.
 *
 * @see http://redis.io/commands/touch
 * @since 3.2.1
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
            args = [0x10000, "TOUCH", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x10000, "TOUCH", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "TOUCH";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * TTL key
 *
 * (readonly, random, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "TTL", arg0]);
    }
    else
    {
        this._cc([0x10000, "TTL", arg0, callback]);
    }
};

/**
 * TYPE key
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "TYPE", arg0]);
    }
    else
    {
        this._cc([0x10000, "TYPE", arg0, callback]);
    }
};

/**
 * UNLINK key [key ...]
 *
 * (write, fast, 1, -1, 1)
 * (arity -2, first key NaN, last key NaN)
 *
 * Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.
 *
 * @see http://redis.io/commands/unlink
 * @since 4.0.0
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
            args = [0x20000, "UNLINK", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20000, "UNLINK", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "UNLINK";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * UNSUBSCRIBE [channel [channel ...]]
 *
 * (pubsub, noscript, loading, stale, 0, 0)
 * (arity -1, first key 0, last key NaN)
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
    return this._c(args);
};

/**
 * UNWATCH -
 *
 * (noscript, fast, 0, 0)
 * (arity 1, first key 0, last key NaN)
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
        return this._cp([0x0, "UNWATCH"]);
    }
    else
    {
        this._cc([0x0, "UNWATCH", callback]);
    }
};

/**
 * WAIT numreplicas timeout
 *
 * (noscript, 0, 0)
 * (arity 3, first key 0, last key NaN)
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
        return this._cp([0x0, "WAIT", arg0, arg1]);
    }
    else
    {
        this._cc([0x0, "WAIT", arg0, arg1, callback]);
    }
};

/**
 * WATCH key [key ...]
 *
 * (noscript, fast, 1, -1)
 * (arity -2, first key 1, last key NaN)
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
    return this._c(args);
};

/**
 * XSETID key arg
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
 *
 * Help not available.
 *
 * @param {Object} arg0 the first argument.
 * @param {Object} arg1 the second argument.
 * @param {Function} callback the function to call when done.
 * @see http://redis.io/commands/xsetid
 * @since not known
 */
Commands.prototype.xsetid = function(arg0, arg1, callback)
{
    if(callback === void(0))
    {
        return this._cp([0x20000, "XSETID", arg0, arg1]);
    }
    else
    {
        this._cc([0x20000, "XSETID", arg0, arg1, callback]);
    }
};

/**
 * ZADD key [NX|XX] [CH] [INCR] score member [score member ...]
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "ZADD";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZCARD key
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 2, first key NaN, last key NaN)
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
        return this._cp([0x10000, "ZCARD", arg0]);
    }
    else
    {
        this._cc([0x10000, "ZCARD", arg0, callback]);
    }
};

/**
 * ZCOUNT key min max
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "ZCOUNT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZINCRBY key increment member
 *
 * (write, denyoom, fast, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "ZINCRBY";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight] [AGGREGATE SUM|MIN|MAX]
 *
 * (write, denyoom, movablekeys, 0, 0, 0)
 * (arity -4, first key NaN, last key NaN)
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
    return this._c(args);
};

/**
 * ZLEXCOUNT key min max
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "ZLEXCOUNT";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZPOPMAX key [count]
 *
 * (write, fast, 1, 1, 1)
 * (arity -2, first key NaN, last key NaN)
 *
 * Remove and return members with the highest scores in a sorted set.
 *
 * @see http://redis.io/commands/zpopmax
 * @since 5.0.0
 */
Commands.prototype.zpopmax = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("ZPOPMAX: wrong number of arguments");
        }
        case 1:
        {
            args = [0x20000, "ZPOPMAX", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20000, "ZPOPMAX", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "ZPOPMAX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZPOPMIN key [count]
 *
 * (write, fast, 1, 1, 1)
 * (arity -2, first key NaN, last key NaN)
 *
 * Remove and return members with the lowest scores in a sorted set.
 *
 * @see http://redis.io/commands/zpopmin
 * @since 5.0.0
 */
Commands.prototype.zpopmin = function()
{
    let args;
    const len = arguments.length;
    switch(len)
    {
        case 0:
        {
            throw new Error("ZPOPMIN: wrong number of arguments");
        }
        case 1:
        {
            args = [0x20000, "ZPOPMIN", arguments[0]];
            break;
        }
        case 2:
        {
            args = [0x20000, "ZPOPMIN", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "ZPOPMIN";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZRANGE key start stop [WITHSCORES]
 *
 * (readonly, 1, 1, 1)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "ZRANGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZRANGEBYLEX key min max [LIMIT offset count]
 *
 * (readonly, 1, 1, 1)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "ZRANGEBYLEX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]
 *
 * (readonly, 1, 1, 1)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "ZRANGEBYSCORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZRANK key member
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x10000, "ZRANK", arg0, arg1]);
    }
    else
    {
        this._cc([0x10000, "ZRANK", arg0, arg1, callback]);
    }
};

/**
 * ZREM key member [member ...]
 *
 * (write, fast, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x20000, "ZREM", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x20000;
            args[1] = "ZREM";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZREMRANGEBYLEX key min max
 *
 * (write, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "ZREMRANGEBYLEX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZREMRANGEBYRANK key start stop
 *
 * (write, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "ZREMRANGEBYRANK";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZREMRANGEBYSCORE key min max
 *
 * (write, 1, 1, 1)
 * (arity 4, first key NaN, last key NaN)
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
            args[0] = 0x20000;
            args[1] = "ZREMRANGEBYSCORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZREVRANGE key start stop [WITHSCORES]
 *
 * (readonly, 1, 1, 1)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "ZREVRANGE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZREVRANGEBYLEX key max min [LIMIT offset count]
 *
 * (readonly, 1, 1, 1)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "ZREVRANGEBYLEX";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]
 *
 * (readonly, 1, 1, 1)
 * (arity -4, first key NaN, last key NaN)
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
            args[0] = 0x10000;
            args[1] = "ZREVRANGEBYSCORE";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZREVRANK key member
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x10000, "ZREVRANK", arg0, arg1]);
    }
    else
    {
        this._cc([0x10000, "ZREVRANK", arg0, arg1, callback]);
    }
};

/**
 * ZSCAN key cursor [MATCH pattern] [COUNT count]
 *
 * (readonly, random, 1, 1, 1)
 * (arity -3, first key NaN, last key NaN)
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
            args = [0x10000, "ZSCAN", arguments[0], arguments[1]];
            break;
        }
        default:
        {
            args = new Array(len + 2);
            args[0] = 0x10000;
            args[1] = "ZSCAN";
            for(let n = 0; n < len; n++)
            {
                args[n+2] = arguments[n];
            }
        }
    }
    return this._c(args);
};

/**
 * ZSCORE key member
 *
 * (readonly, fast, 1, 1, 1)
 * (arity 3, first key NaN, last key NaN)
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
        return this._cp([0x10000, "ZSCORE", arg0, arg1]);
    }
    else
    {
        this._cc([0x10000, "ZSCORE", arg0, arg1, callback]);
    }
};

/**
 * ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight] [AGGREGATE SUM|MIN|MAX]
 *
 * (write, denyoom, movablekeys, 0, 0, 0)
 * (arity -4, first key NaN, last key NaN)
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
    return this._c(args);
};