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
    _p(args)
    {
        return new Promise((resolve, reject) =>
        {
            args.push((err, result) => err === null ? resolve(result) : reject(err));
            this._c(args);
        });
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
    }

    /**
     * ACL CAT [categoryname]
     *
     * (admin, noscript, loading, stale, skip_slowlog)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale, skip_slowlog)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale, skip_slowlog)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale, skip_slowlog)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale, skip_slowlog)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale, skip_slowlog)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale, skip_slowlog)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale, skip_slowlog)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale, skip_slowlog)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale, skip_slowlog)
     * (arity -2, first key 0, last key 0)
     *
     * Return the name of the user associated to the current connection.
     *
     * @see http://redis.io/commands/acl
     * @since 6.0.0
     */
    acl()
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
        return this._r(args);
    }

    /**
     * APPEND key value
     *
     * (write, denyoom, fast)
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
    append(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "APPEND", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "APPEND", arg0, arg1, callback]);
        }
    }

    /**
     * ASKING 
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
    asking(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "ASKING"]);
        }
        else
        {
            this._c([0x0, "ASKING", callback]);
        }
    }

    /**
     * AUTH password
     *
     * (noscript, loading, stale, skip_monitor, skip_slowlog, fast, no_auth)
     * (arity -2, first key 0, last key 0)
     *
     * Authenticate to the server.
     *
     * @see http://redis.io/commands/auth
     * @since 1.0.0
     */
    auth()
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
        return this._r(args);
    }

    /**
     * BGREWRITEAOF -
     *
     * (admin, noscript)
     * (arity 1, first key 0, last key 0)
     *
     * Asynchronously rewrite the append-only file.
     *
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/bgrewriteaof
     * @since 1.0.0
     */
    bgrewriteaof(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "BGREWRITEAOF"]);
        }
        else
        {
            this._c([0x0, "BGREWRITEAOF", callback]);
        }
    }

    /**
     * BGSAVE [SCHEDULE]
     *
     * (admin, noscript)
     * (arity -1, first key 0, last key 0)
     *
     * Asynchronously save the dataset to disk.
     *
     * @see http://redis.io/commands/bgsave
     * @since 1.0.0
     */
    bgsave()
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
        return this._r(args);
    }

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
    bitcount()
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
        return this._r(args);
    }

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
    bitfield()
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
        return this._r(args);
    }

    /**
     * BITFIELD_RO key ...options...
     *
     * (readonly, fast)
     * (arity -2, first key 1, last key 1)
     *
     * Help not available.
     *
     * @see http://redis.io/commands/bitfield_ro
     * @since not known
     */
    bitfield_ro()
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
                args = [0x10001, "BITFIELD_RO", arguments[0]];
                break;
            }
            case 2:
            {
                args = [0x10001, "BITFIELD_RO", arguments[0], arguments[1]];
                break;
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x10001;
                args[1] = "BITFIELD_RO";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

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
    bitop()
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
        return this._r(args);
    }

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
    bitpos()
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
        return this._r(args);
    }

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
    blpop()
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
        return this._r(args);
    }

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
    brpop()
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
        return this._r(args);
    }

    /**
     * BRPOPLPUSH source destination timeout
     *
     * (write, denyoom, noscript)
     * (arity 4, first key 1, last key 2)
     *
     * Pop an element from a list, push it to another list and return it; or block until one is available.
     *
     * @see http://redis.io/commands/brpoplpush
     * @since 2.2.0
     */
    brpoplpush()
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
        return this._r(args);
    }

    /**
     * BZPOPMAX key [key ...] timeout
     *
     * (write, noscript, fast)
     * (arity -3, first key 1, last key -2)
     *
     * Remove and return the member with the highest score from one or more sorted sets, or block until one is available.
     *
     * @see http://redis.io/commands/bzpopmax
     * @since 5.0.0
     */
    bzpopmax()
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
                args = [0x20001, "BZPOPMAX", arguments[0], arguments[1]];
                break;
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x20001;
                args[1] = "BZPOPMAX";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * BZPOPMIN key [key ...] timeout
     *
     * (write, noscript, fast)
     * (arity -3, first key 1, last key -2)
     *
     * Remove and return the member with the lowest score from one or more sorted sets, or block until one is available.
     *
     * @see http://redis.io/commands/bzpopmin
     * @since 5.0.0
     */
    bzpopmin()
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
                args = [0x20001, "BZPOPMIN", arguments[0], arguments[1]];
                break;
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x20001;
                args[1] = "BZPOPMIN";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * CLIENT CACHING YES|NO
     *
     * (admin, noscript, random, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, random, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, random, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, random, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, random, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, random, loading, stale)
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
     * (admin, noscript, random, loading, stale)
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
     * (admin, noscript, random, loading, stale)
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
     * (admin, noscript, random, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, random, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, random, loading, stale)
     * (arity -2, first key 0, last key 0)
     *
     * Unblock a client blocked in a blocking command from a different connection.
     *
     * @see http://redis.io/commands/client
     * @since 5.0.0
     */
    client()
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
        return this._r(args);
    }

    /**
     * CLUSTER ADDSLOTS slot [slot ...]
     *
     * (admin, random, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, random, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, random, stale)
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
     * (admin, random, stale)
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
     * (admin, random, stale)
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
     * (admin, random, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, random, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, random, stale)
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
     * (admin, random, stale)
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
     * (admin, random, stale)
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
     * (admin, random, stale)
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
     * (admin, random, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, random, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, random, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, random, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, random, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, random, stale)
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
     * (admin, random, stale)
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
     * (admin, random, stale)
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
     * (admin, random, stale)
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
     * (admin, random, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, random, stale)
     * (arity -2, first key 0, last key 0)
     *
     * Get array of Cluster slot to node mappings.
     *
     * @see http://redis.io/commands/cluster
     * @since 3.0.0
     */
    cluster()
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
        return this._r(args);
    }

    /**
     * COMMAND -
     *
     * (random, loading, stale)
     * (arity -1, first key 0, last key 0)
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
     * (random, loading, stale)
     * (arity -1, first key 0, last key 0)
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
     * (random, loading, stale)
     * (arity -1, first key 0, last key 0)
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
     * (random, loading, stale)
     * (arity -1, first key 0, last key 0)
     *
     * Get array of specific Redis command details.
     *
     * @see http://redis.io/commands/command
     * @since 2.8.13
     */
    command()
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
        return this._r(args);
    }

    /**
     * CONFIG GET parameter
     *
     * (admin, noscript, loading, stale)
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
     * (admin, noscript, loading, stale)
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
     * (admin, noscript, loading, stale)
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
     * (admin, noscript, loading, stale)
     * (arity -2, first key 0, last key 0)
     *
     * Set a configuration parameter to the given value.
     *
     * @see http://redis.io/commands/config
     * @since 2.0.0
     */
    config()
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
        return this._r(args);
    }

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
    dbsize(callback)
    {
        if(callback === void null)
        {
            return this._p([0x10000, "DBSIZE"]);
        }
        else
        {
            this._c([0x10000, "DBSIZE", callback]);
        }
    }

    /**
     * DEBUG OBJECT key
     *
     * (admin, noscript, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale)
     * (arity -2, first key 0, last key 0)
     *
     * Make the server crash.
     *
     * @see http://redis.io/commands/debug
     * @since 1.0.0
     */
    debug()
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
        return this._r(args);
    }

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
    decr(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "DECR", arg0]);
        }
        else
        {
            this._c([0x20001, "DECR", arg0, callback]);
        }
    }

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
    decrby(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "DECRBY", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "DECRBY", arg0, arg1, callback]);
        }
    }

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
    del()
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
        return this._r(args);
    }

    /**
     * DISCARD -
     *
     * (noscript, loading, stale, fast)
     * (arity 1, first key 0, last key 0)
     *
     * Discard all commands issued after MULTI.
     *
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/discard
     * @since 2.0.0
     */
    discard(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "DISCARD"]);
        }
        else
        {
            this._c([0x0, "DISCARD", callback]);
        }
    }

    /**
     * DUMP key
     *
     * (readonly, random)
     * (arity 2, first key 1, last key 1)
     *
     * Return a serialized version of the value stored at the specified key.
     *
     * @param {Object} arg0 the first argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/dump
     * @since 2.6.0
     */
    dump(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "DUMP", arg0]);
        }
        else
        {
            this._c([0x10001, "DUMP", arg0, callback]);
        }
    }

    /**
     * ECHO message
     *
     * (readonly, fast)
     * (arity 2, first key 0, last key 0)
     *
     * Echo the given string.
     *
     * @param {Object} arg0 the first argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/echo
     * @since 1.0.0
     */
    echo(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10000, "ECHO", arg0]);
        }
        else
        {
            this._c([0x10000, "ECHO", arg0, callback]);
        }
    }

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
    eval()
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
        return this._r(args);
    }

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
    evalsha()
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
        return this._r(args);
    }

    /**
     * EXEC -
     *
     * (noscript, loading, stale, skip_monitor, skip_slowlog)
     * (arity 1, first key 0, last key 0)
     *
     * Execute all commands issued after MULTI.
     *
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/exec
     * @since 1.2.0
     */
    exec(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "EXEC"]);
        }
        else
        {
            this._c([0x0, "EXEC", callback]);
        }
    }

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
    exists()
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
        return this._r(args);
    }

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
    expire(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "EXPIRE", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "EXPIRE", arg0, arg1, callback]);
        }
    }

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
    expireat(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "EXPIREAT", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "EXPIREAT", arg0, arg1, callback]);
        }
    }

    /**
     * FLUSHALL [ASYNC]
     *
     * (write)
     * (arity -1, first key 0, last key 0)
     *
     * Remove all keys from all databases.
     *
     * @see http://redis.io/commands/flushall
     * @since 1.0.0
     */
    flushall()
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
        return this._r(args);
    }

    /**
     * FLUSHDB [ASYNC]
     *
     * (write)
     * (arity -1, first key 0, last key 0)
     *
     * Remove all keys from the current database.
     *
     * @see http://redis.io/commands/flushdb
     * @since 1.0.0
     */
    flushdb()
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
        return this._r(args);
    }

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
    geoadd()
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
        return this._r(args);
    }

    /**
     * GEODIST key member1 member2 [m|km|ft|mi]
     *
     * (readonly)
     * (arity -4, first key 1, last key 1)
     *
     * Returns the distance between two members of a geospatial index.
     *
     * @see http://redis.io/commands/geodist
     * @since 3.2.0
     */
    geodist()
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
        return this._r(args);
    }

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
    geohash()
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
        return this._r(args);
    }

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
    geopos()
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
        return this._r(args);
    }

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
    georadius()
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
        return this._r(args);
    }

    /**
     * GEORADIUS_RO key arg arg arg arg ...options...
     *
     * (readonly, movablekeys)
     * (arity -6, first key 1, last key 1)
     *
     * Help not available.
     *
     * @see http://redis.io/commands/georadius_ro
     * @since not known
     */
    georadius_ro()
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
        return this._r(args);
    }

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
    georadiusbymember()
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
        return this._r(args);
    }

    /**
     * GEORADIUSBYMEMBER_RO key arg arg arg ...options...
     *
     * (readonly, movablekeys)
     * (arity -5, first key 1, last key 1)
     *
     * Help not available.
     *
     * @see http://redis.io/commands/georadiusbymember_ro
     * @since not known
     */
    georadiusbymember_ro()
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
        return this._r(args);
    }

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
    get(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "GET", arg0]);
        }
        else
        {
            this._c([0x10001, "GET", arg0, callback]);
        }
    }

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
    getbit(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "GETBIT", arg0, arg1]);
        }
        else
        {
            this._c([0x10001, "GETBIT", arg0, arg1, callback]);
        }
    }

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
    getrange()
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
        return this._r(args);
    }

    /**
     * GETSET key value
     *
     * (write, denyoom, fast)
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
    getset(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "GETSET", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "GETSET", arg0, arg1, callback]);
        }
    }

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
    hdel()
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
        return this._r(args);
    }

    /**
     * HELLO protover [AUTH username password] [SETNAME clientname]
     *
     * (noscript, loading, stale, skip_monitor, skip_slowlog, fast, no_auth)
     * (arity -2, first key 0, last key 0)
     *
     * switch Redis protocol.
     *
     * @see http://redis.io/commands/hello
     * @since 6.0.0
     */
    hello()
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
        return this._r(args);
    }

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
    hexists(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "HEXISTS", arg0, arg1]);
        }
        else
        {
            this._c([0x10001, "HEXISTS", arg0, arg1, callback]);
        }
    }

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
    hget(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "HGET", arg0, arg1]);
        }
        else
        {
            this._c([0x10001, "HGET", arg0, arg1, callback]);
        }
    }

    /**
     * HGETALL key
     *
     * (readonly, random)
     * (arity 2, first key 1, last key 1)
     *
     * Get all the fields and values in a hash.
     *
     * @param {Object} arg0 the first argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/hgetall
     * @since 2.0.0
     */
    hgetall(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "HGETALL", arg0]);
        }
        else
        {
            this._c([0x10001, "HGETALL", arg0, callback]);
        }
    }

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
    hincrby()
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
        return this._r(args);
    }

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
    hincrbyfloat()
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
        return this._r(args);
    }

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
    hkeys(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "HKEYS", arg0]);
        }
        else
        {
            this._c([0x10001, "HKEYS", arg0, callback]);
        }
    }

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
    hlen(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "HLEN", arg0]);
        }
        else
        {
            this._c([0x10001, "HLEN", arg0, callback]);
        }
    }

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
    hmget()
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
        return this._r(args);
    }

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
    hmset()
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
        return this._r(args);
    }

    /**
     * HOST: ...options...
     *
     * (readonly, loading, stale)
     * (arity -1, first key 0, last key 0)
     *
     * Help not available.
     *
     * @see http://redis.io/commands/host:
     * @since not known
     */
    host()
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
        return this._r(args);
    }

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
    hscan()
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
        return this._r(args);
    }

    /**
     * HSET key field value [field value ...]
     *
     * (write, denyoom, fast)
     * (arity -4, first key 1, last key 1)
     *
     * Set the string value of a hash field.
     *
     * @see http://redis.io/commands/hset
     * @since 2.0.0
     */
    hset()
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
        return this._r(args);
    }

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
    hsetnx()
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
        return this._r(args);
    }

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
    hstrlen(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "HSTRLEN", arg0, arg1]);
        }
        else
        {
            this._c([0x10001, "HSTRLEN", arg0, arg1, callback]);
        }
    }

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
    hvals(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "HVALS", arg0]);
        }
        else
        {
            this._c([0x10001, "HVALS", arg0, callback]);
        }
    }

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
    incr(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "INCR", arg0]);
        }
        else
        {
            this._c([0x20001, "INCR", arg0, callback]);
        }
    }

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
    incrby(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "INCRBY", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "INCRBY", arg0, arg1, callback]);
        }
    }

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
    incrbyfloat(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "INCRBYFLOAT", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "INCRBYFLOAT", arg0, arg1, callback]);
        }
    }

    /**
     * INFO [section]
     *
     * (random, loading, stale)
     * (arity -1, first key 0, last key 0)
     *
     * Get information and statistics about the server.
     *
     * @see http://redis.io/commands/info
     * @since 1.0.0
     */
    info()
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
        return this._r(args);
    }

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
    keys(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10000, "KEYS", arg0]);
        }
        else
        {
            this._c([0x10000, "KEYS", arg0, callback]);
        }
    }

    /**
     * LASTSAVE -
     *
     * (readonly, random, loading, stale, fast)
     * (arity 1, first key 0, last key 0)
     *
     * Get the UNIX time stamp of the last successful save to disk.
     *
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/lastsave
     * @since 1.0.0
     */
    lastsave(callback)
    {
        if(callback === void null)
        {
            return this._p([0x10000, "LASTSAVE"]);
        }
        else
        {
            this._c([0x10000, "LASTSAVE", callback]);
        }
    }

    /**
     * LATENCY DOCTOR -
     *
     * (admin, noscript, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript, loading, stale)
     * (arity -2, first key 0, last key 0)
     *
     * Reset latency data for one or more events.
     *
     * @see http://redis.io/commands/latency
     * @since 2.8.13
     */
    latency()
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
        return this._r(args);
    }

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
    lindex(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "LINDEX", arg0, arg1]);
        }
        else
        {
            this._c([0x10001, "LINDEX", arg0, arg1, callback]);
        }
    }

    /**
     * LINSERT key BEFORE|AFTER pivot element
     *
     * (write, denyoom)
     * (arity 5, first key 1, last key 1)
     *
     * Insert an element before or after another element in a list.
     *
     * @see http://redis.io/commands/linsert
     * @since 2.2.0
     */
    linsert()
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
        return this._r(args);
    }

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
    llen(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "LLEN", arg0]);
        }
        else
        {
            this._c([0x10001, "LLEN", arg0, callback]);
        }
    }

    /**
     * LOLWUT [VERSION version]
     *
     * (readonly, fast)
     * (arity -1, first key 0, last key 0)
     *
     * Display some computer art and the Redis version.
     *
     * @see http://redis.io/commands/lolwut
     * @since 5.0.0
     */
    lolwut()
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
        return this._r(args);
    }

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
    lpop(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "LPOP", arg0]);
        }
        else
        {
            this._c([0x20001, "LPOP", arg0, callback]);
        }
    }

    /**
     * LPUSH key element [element ...]
     *
     * (write, denyoom, fast)
     * (arity -3, first key 1, last key 1)
     *
     * Prepend one or multiple elements to a list.
     *
     * @see http://redis.io/commands/lpush
     * @since 1.0.0
     */
    lpush()
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
        return this._r(args);
    }

    /**
     * LPUSHX key element [element ...]
     *
     * (write, denyoom, fast)
     * (arity -3, first key 1, last key 1)
     *
     * Prepend an element to a list, only if the list exists.
     *
     * @see http://redis.io/commands/lpushx
     * @since 2.2.0
     */
    lpushx()
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
        return this._r(args);
    }

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
    lrange()
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
        return this._r(args);
    }

    /**
     * LREM key count element
     *
     * (write)
     * (arity 4, first key 1, last key 1)
     *
     * Remove elements from a list.
     *
     * @see http://redis.io/commands/lrem
     * @since 1.0.0
     */
    lrem()
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
        return this._r(args);
    }

    /**
     * LSET key index element
     *
     * (write, denyoom)
     * (arity 4, first key 1, last key 1)
     *
     * Set the value of an element in a list by its index.
     *
     * @see http://redis.io/commands/lset
     * @since 1.0.0
     */
    lset()
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
        return this._r(args);
    }

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
    ltrim()
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
        return this._r(args);
    }

    /**
     * MEMORY DOCTOR -
     *
     * (readonly, random, movablekeys)
     * (arity -2, first key 0, last key 0)
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
     * (readonly, random, movablekeys)
     * (arity -2, first key 0, last key 0)
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
     * (readonly, random, movablekeys)
     * (arity -2, first key 0, last key 0)
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
     * (readonly, random, movablekeys)
     * (arity -2, first key 0, last key 0)
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
     * (readonly, random, movablekeys)
     * (arity -2, first key 0, last key 0)
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
     * (readonly, random, movablekeys)
     * (arity -2, first key 0, last key 0)
     *
     * Estimate the memory usage of a key.
     *
     * @see http://redis.io/commands/memory
     * @since 4.0.0
     */
    memory()
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
        return this._r(args);
    }

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
    mget()
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
        return this._r(args);
    }

    /**
     * MIGRATE host port key| destination-db timeout [COPY] [REPLACE] [AUTH password] [KEYS key]
     *
     * (write, random, movablekeys)
     * (arity -6, first key 0, last key 0)
     *
     * Atomically transfer a key from a Redis instance to another one.
     *
     * @see http://redis.io/commands/migrate
     * @since 2.6.0
     */
    migrate()
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
        return this._r(args);
    }

    /**
     * MODULE LIST -
     *
     * (admin, noscript)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript)
     * (arity -2, first key 0, last key 0)
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
     * (admin, noscript)
     * (arity -2, first key 0, last key 0)
     *
     * Unload a module.
     *
     * @see http://redis.io/commands/module
     * @since 4.0.0
     */
    module()
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
        return this._r(args);
    }

    /**
     * MONITOR -
     *
     * (admin, noscript, loading, stale)
     * (arity 1, first key 0, last key 0)
     *
     * Listen for all requests received by the server in real time.
     *
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/monitor
     * @since 1.0.0
     */
    monitor(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "MONITOR"]);
        }
        else
        {
            this._c([0x0, "MONITOR", callback]);
        }
    }

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
    move(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "MOVE", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "MOVE", arg0, arg1, callback]);
        }
    }

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
    mset()
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
        return this._r(args);
    }

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
    msetnx()
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
        return this._r(args);
    }

    /**
     * MULTI -
     *
     * (noscript, loading, stale, fast)
     * (arity 1, first key 0, last key 0)
     *
     * Mark the start of a transaction block.
     *
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/multi
     * @since 1.2.0
     */
    multi(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "MULTI"]);
        }
        else
        {
            this._c([0x0, "MULTI", callback]);
        }
    }

    /**
     * OBJECT subcommand [arguments [arguments ...]]
     *
     * (readonly, random)
     * (arity -2, first key 2, last key 2)
     *
     * Inspect the internals of Redis objects.
     *
     * @see http://redis.io/commands/object
     * @since 2.2.3
     */
    object()
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
                args = [0x10002, "OBJECT", arguments[0]];
                break;
            }
            case 2:
            {
                args = [0x10002, "OBJECT", arguments[0], arguments[1]];
                break;
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x10002;
                args[1] = "OBJECT";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

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
    persist(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "PERSIST", arg0]);
        }
        else
        {
            this._c([0x20001, "PERSIST", arg0, callback]);
        }
    }

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
    pexpire(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "PEXPIRE", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "PEXPIRE", arg0, arg1, callback]);
        }
    }

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
    pexpireat(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "PEXPIREAT", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "PEXPIREAT", arg0, arg1, callback]);
        }
    }

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
    pfadd()
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
        return this._r(args);
    }

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
    pfcount()
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
        return this._r(args);
    }

    /**
     * PFDEBUG arg arg ...options...
     *
     * (write, admin)
     * (arity -3, first key 0, last key 0)
     *
     * Help not available.
     *
     * @see http://redis.io/commands/pfdebug
     * @since not known
     */
    pfdebug()
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
        return this._r(args);
    }

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
    pfmerge()
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
        return this._r(args);
    }

    /**
     * PFSELFTEST 
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
    pfselftest(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "PFSELFTEST"]);
        }
        else
        {
            this._c([0x0, "PFSELFTEST", callback]);
        }
    }

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
    ping()
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
        return this._r(args);
    }

    /**
     * POST ...options...
     *
     * (readonly, loading, stale)
     * (arity -1, first key 0, last key 0)
     *
     * Help not available.
     *
     * @see http://redis.io/commands/post
     * @since not known
     */
    post()
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
        return this._r(args);
    }

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
    psetex()
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
        return this._r(args);
    }

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
    psubscribe()
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
        return this._r(args);
    }

    /**
     * PSYNC replicationid offset
     *
     * (admin, noscript)
     * (arity 3, first key 0, last key 0)
     *
     * Internal command used for replication.
     *
     * @param {Object} arg0 the first argument.
     * @param {Object} arg1 the second argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/psync
     * @since 2.8.0
     */
    psync(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "PSYNC", arg0, arg1]);
        }
        else
        {
            this._c([0x0, "PSYNC", arg0, arg1, callback]);
        }
    }

    /**
     * PTTL key
     *
     * (readonly, random, fast)
     * (arity 2, first key 1, last key 1)
     *
     * Get the time to live for a key in milliseconds.
     *
     * @param {Object} arg0 the first argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/pttl
     * @since 2.6.0
     */
    pttl(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "PTTL", arg0]);
        }
        else
        {
            this._c([0x10001, "PTTL", arg0, callback]);
        }
    }

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
    publish(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "PUBLISH", arg0, arg1]);
        }
        else
        {
            this._c([0x0, "PUBLISH", arg0, arg1, callback]);
        }
    }

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
    pubsub()
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
        return this._r(args);
    }

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
    punsubscribe()
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
        return this._r(args);
    }

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
    quit()
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
        return this._r(args);
    }

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
    randomkey(callback)
    {
        if(callback === void null)
        {
            return this._p([0x10000, "RANDOMKEY"]);
        }
        else
        {
            this._c([0x10000, "RANDOMKEY", callback]);
        }
    }

    /**
     * READONLY -
     *
     * (fast)
     * (arity 1, first key 0, last key 0)
     *
     * Enables read queries for a connection to a cluster replica node.
     *
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/readonly
     * @since 3.0.0
     */
    readonly(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "READONLY"]);
        }
        else
        {
            this._c([0x0, "READONLY", callback]);
        }
    }

    /**
     * READWRITE -
     *
     * (fast)
     * (arity 1, first key 0, last key 0)
     *
     * Disables read queries for a connection to a cluster replica node.
     *
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/readwrite
     * @since 3.0.0
     */
    readwrite(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "READWRITE"]);
        }
        else
        {
            this._c([0x0, "READWRITE", callback]);
        }
    }

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
    rename(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "RENAME", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "RENAME", arg0, arg1, callback]);
        }
    }

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
    renamenx(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "RENAMENX", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "RENAMENX", arg0, arg1, callback]);
        }
    }

    /**
     * REPLCONF ...options...
     *
     * (admin, noscript, loading, stale)
     * (arity -1, first key 0, last key 0)
     *
     * Help not available.
     *
     * @see http://redis.io/commands/replconf
     * @since not known
     */
    replconf()
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
        return this._r(args);
    }

    /**
     * REPLICAOF host port
     *
     * (admin, noscript, stale)
     * (arity 3, first key 0, last key 0)
     *
     * Make the server a replica of another instance, or promote it as master.
     *
     * @param {Object} arg0 the first argument.
     * @param {Object} arg1 the second argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/replicaof
     * @since 5.0.0
     */
    replicaof(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "REPLICAOF", arg0, arg1]);
        }
        else
        {
            this._c([0x0, "REPLICAOF", arg0, arg1, callback]);
        }
    }

    /**
     * RESTORE key ttl serialized-value [REPLACE] [ABSTTL] [IDLETIME seconds] [FREQ frequency]
     *
     * (write, denyoom)
     * (arity -4, first key 1, last key 1)
     *
     * Create a key using the provided serialized value, previously obtained using DUMP.
     *
     * @see http://redis.io/commands/restore
     * @since 2.6.0
     */
    restore()
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
        return this._r(args);
    }

    /**
     * RESTORE-ASKING key arg arg ...options...
     *
     * (write, denyoom, asking)
     * (arity -4, first key 1, last key 1)
     *
     * Help not available.
     *
     * @see http://redis.io/commands/restore-asking
     * @since not known
     */
    restore_asking()
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
        return this._r(args);
    }

    /**
     * ROLE -
     *
     * (readonly, noscript, loading, stale, fast)
     * (arity 1, first key 0, last key 0)
     *
     * Return the role of the instance in the context of replication.
     *
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/role
     * @since 2.8.12
     */
    role(callback)
    {
        if(callback === void null)
        {
            return this._p([0x10000, "ROLE"]);
        }
        else
        {
            this._c([0x10000, "ROLE", callback]);
        }
    }

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
    rpop(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "RPOP", arg0]);
        }
        else
        {
            this._c([0x20001, "RPOP", arg0, callback]);
        }
    }

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
    rpoplpush(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "RPOPLPUSH", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "RPOPLPUSH", arg0, arg1, callback]);
        }
    }

    /**
     * RPUSH key element [element ...]
     *
     * (write, denyoom, fast)
     * (arity -3, first key 1, last key 1)
     *
     * Append one or multiple elements to a list.
     *
     * @see http://redis.io/commands/rpush
     * @since 1.0.0
     */
    rpush()
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
        return this._r(args);
    }

    /**
     * RPUSHX key element [element ...]
     *
     * (write, denyoom, fast)
     * (arity -3, first key 1, last key 1)
     *
     * Append an element to a list, only if the list exists.
     *
     * @see http://redis.io/commands/rpushx
     * @since 2.2.0
     */
    rpushx()
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
        return this._r(args);
    }

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
    sadd()
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
        return this._r(args);
    }

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
    save(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "SAVE"]);
        }
        else
        {
            this._c([0x0, "SAVE", callback]);
        }
    }

    /**
     * SCAN cursor [MATCH pattern] [COUNT count] [TYPE type]
     *
     * (readonly, random)
     * (arity -2, first key 0, last key 0)
     *
     * Incrementally iterate the keys space.
     *
     * @see http://redis.io/commands/scan
     * @since 2.8.0
     */
    scan()
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
        return this._r(args);
    }

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
    scard(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "SCARD", arg0]);
        }
        else
        {
            this._c([0x10001, "SCARD", arg0, callback]);
        }
    }

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
     * SCRIPT EXISTS sha1 [sha1 ...]
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
    script()
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
        return this._r(args);
    }

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
    sdiff()
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
        return this._r(args);
    }

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
    sdiffstore()
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
        return this._r(args);
    }

    /**
     * SELECT index
     *
     * (loading, stale, fast)
     * (arity 2, first key 0, last key 0)
     *
     * Change the selected database for the current connection.
     *
     * @param {Object} arg0 the first argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/select
     * @since 1.0.0
     */
    select(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "SELECT", arg0]);
        }
        else
        {
            this._c([0x0, "SELECT", arg0, callback]);
        }
    }

    /**
     * SET key value [EX seconds|PX milliseconds] [NX|XX] [KEEPTTL]
     *
     * (write, denyoom)
     * (arity -3, first key 1, last key 1)
     *
     * Set the string value of a key.
     *
     * @see http://redis.io/commands/set
     * @since 1.0.0
     */
    set()
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
        return this._r(args);
    }

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
    setbit()
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
        return this._r(args);
    }

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
    setex()
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
        return this._r(args);
    }

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
    setnx(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "SETNX", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "SETNX", arg0, arg1, callback]);
        }
    }

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
    setrange()
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
        return this._r(args);
    }

    /**
     * SHUTDOWN [NOSAVE|SAVE]
     *
     * (admin, noscript, loading, stale)
     * (arity -1, first key 0, last key 0)
     *
     * Synchronously save the dataset to disk and then shut down the server.
     *
     * @see http://redis.io/commands/shutdown
     * @since 1.0.0
     */
    shutdown()
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
        return this._r(args);
    }

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
    sinter()
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
        return this._r(args);
    }

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
    sinterstore()
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
        return this._r(args);
    }

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
    sismember(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "SISMEMBER", arg0, arg1]);
        }
        else
        {
            this._c([0x10001, "SISMEMBER", arg0, arg1, callback]);
        }
    }

    /**
     * SLAVEOF host port
     *
     * (admin, noscript, stale)
     * (arity 3, first key 0, last key 0)
     *
     * Make the server a replica of another instance, or promote it as master. Deprecated starting with Redis 5. Use REPLICAOF instead.
     *
     * @param {Object} arg0 the first argument.
     * @param {Object} arg1 the second argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/slaveof
     * @since 1.0.0
     */
    slaveof(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "SLAVEOF", arg0, arg1]);
        }
        else
        {
            this._c([0x0, "SLAVEOF", arg0, arg1, callback]);
        }
    }

    /**
     * SLOWLOG subcommand [argument]
     *
     * (admin, random, loading, stale)
     * (arity -2, first key 0, last key 0)
     *
     * Manages the Redis slow queries log.
     *
     * @see http://redis.io/commands/slowlog
     * @since 2.2.12
     */
    slowlog()
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
        return this._r(args);
    }

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
    smembers(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "SMEMBERS", arg0]);
        }
        else
        {
            this._c([0x10001, "SMEMBERS", arg0, callback]);
        }
    }

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
    smove()
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
        return this._r(args);
    }

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
    sort()
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
        return this._r(args);
    }

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
    spop()
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
        return this._r(args);
    }

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
    srandmember()
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
        return this._r(args);
    }

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
    srem()
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
        return this._r(args);
    }

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
    sscan()
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
        return this._r(args);
    }

    /**
     * STRALGO LCS algo-specific-argument [algo-specific-argument ...]
     *
     * (readonly, movablekeys)
     * (arity -2, first key 0, last key 0)
     *
     * Run algorithms (currently LCS) against strings.
     *
     * @see http://redis.io/commands/stralgo
     * @since 6.0.0
     */
    stralgo()
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
        return this._r(args);
    }

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
    strlen(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "STRLEN", arg0]);
        }
        else
        {
            this._c([0x10001, "STRLEN", arg0, callback]);
        }
    }

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
    subscribe()
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
        return this._r(args);
    }

    /**
     * SUBSTR key arg arg 
     *
     * (readonly)
     * (arity 4, first key 1, last key 1)
     *
     * Help not available.
     *
     * @see http://redis.io/commands/substr
     * @since not known
     */
    substr()
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
        return this._r(args);
    }

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
    sunion()
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
        return this._r(args);
    }

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
    sunionstore()
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
        return this._r(args);
    }

    /**
     * SWAPDB index1 index2
     *
     * (write, fast)
     * (arity 3, first key 0, last key 0)
     *
     * Swaps two Redis databases.
     *
     * @param {Object} arg0 the first argument.
     * @param {Object} arg1 the second argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/swapdb
     * @since 4.0.0
     */
    swapdb(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20000, "SWAPDB", arg0, arg1]);
        }
        else
        {
            this._c([0x20000, "SWAPDB", arg0, arg1, callback]);
        }
    }

    /**
     * SYNC -
     *
     * (admin, noscript)
     * (arity 1, first key 0, last key 0)
     *
     * Internal command used for replication.
     *
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/sync
     * @since 1.0.0
     */
    sync(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "SYNC"]);
        }
        else
        {
            this._c([0x0, "SYNC", callback]);
        }
    }

    /**
     * TIME -
     *
     * (readonly, random, loading, stale, fast)
     * (arity 1, first key 0, last key 0)
     *
     * Return the current server time.
     *
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/time
     * @since 2.6.0
     */
    time(callback)
    {
        if(callback === void null)
        {
            return this._p([0x10000, "TIME"]);
        }
        else
        {
            this._c([0x10000, "TIME", callback]);
        }
    }

    /**
     * TOUCH key [key ...]
     *
     * (readonly, fast)
     * (arity -2, first key 1, last key -1)
     *
     * Alters the last access time of a key(s). Returns the number of existing keys specified.
     *
     * @see http://redis.io/commands/touch
     * @since 3.2.1
     */
    touch()
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
        return this._r(args);
    }

    /**
     * TTL key
     *
     * (readonly, random, fast)
     * (arity 2, first key 1, last key 1)
     *
     * Get the time to live for a key.
     *
     * @param {Object} arg0 the first argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/ttl
     * @since 1.0.0
     */
    ttl(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "TTL", arg0]);
        }
        else
        {
            this._c([0x10001, "TTL", arg0, callback]);
        }
    }

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
    type(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "TYPE", arg0]);
        }
        else
        {
            this._c([0x10001, "TYPE", arg0, callback]);
        }
    }

    /**
     * UNLINK key [key ...]
     *
     * (write, fast)
     * (arity -2, first key 1, last key -1)
     *
     * Delete a key asynchronously in another thread. Otherwise it is just as DEL, but non blocking.
     *
     * @see http://redis.io/commands/unlink
     * @since 4.0.0
     */
    unlink()
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
        return this._r(args);
    }

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
    unsubscribe()
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
        return this._r(args);
    }

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
    unwatch(callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "UNWATCH"]);
        }
        else
        {
            this._c([0x0, "UNWATCH", callback]);
        }
    }

    /**
     * WAIT numreplicas timeout
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
    wait(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x0, "WAIT", arg0, arg1]);
        }
        else
        {
            this._c([0x0, "WAIT", arg0, arg1, callback]);
        }
    }

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
    watch()
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
        return this._r(args);
    }

    /**
     * XACK key group ID [ID ...]
     *
     * (write, random, fast)
     * (arity -4, first key 1, last key 1)
     *
     * Marks a pending message as correctly processed, effectively removing it from the pending entries list of the consumer group. Return value of the command is the number of messages successfully acknowledged, that is, the IDs we were actually able to resolve in the PEL.
     *
     * @see http://redis.io/commands/xack
     * @since 5.0.0
     */
    xack()
    {
        let args;
        const len = arguments.length;
        switch(len)
        {
            case 0:
            case 1:
            case 2:
            {
                throw new Error("XACK: wrong number of arguments");
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x20001;
                args[1] = "XACK";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * XADD key ID field value [field value ...]
     *
     * (write, denyoom, random, fast)
     * (arity -5, first key 1, last key 1)
     *
     * Appends a new entry to a stream.
     *
     * @see http://redis.io/commands/xadd
     * @since 5.0.0
     */
    xadd()
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
                throw new Error("XADD: wrong number of arguments");
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x20001;
                args[1] = "XADD";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * XCLAIM key group consumer min-idle-time ID [ID ...] [IDLE ms] [TIME ms-unix-time] [RETRYCOUNT count] [force] [justid]
     *
     * (write, random, fast)
     * (arity -6, first key 1, last key 1)
     *
     * Changes (or acquires) ownership of a message in a consumer group, as if the message was delivered to the specified consumer.
     *
     * @see http://redis.io/commands/xclaim
     * @since 5.0.0
     */
    xclaim()
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
                throw new Error("XCLAIM: wrong number of arguments");
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x20001;
                args[1] = "XCLAIM";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * XDEL key ID [ID ...]
     *
     * (write, fast)
     * (arity -3, first key 1, last key 1)
     *
     * Removes the specified entries from the stream. Returns the number of items actually deleted, that may be different from the number of IDs passed in case certain IDs do not exist.
     *
     * @see http://redis.io/commands/xdel
     * @since 5.0.0
     */
    xdel()
    {
        let args;
        const len = arguments.length;
        switch(len)
        {
            case 0:
            case 1:
            {
                throw new Error("XDEL: wrong number of arguments");
            }
            case 2:
            {
                args = [0x20001, "XDEL", arguments[0], arguments[1]];
                break;
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x20001;
                args[1] = "XDEL";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * XGROUP [CREATE key groupname id-or-$] [SETID key groupname id-or-$] [DESTROY key groupname] [DELCONSUMER key groupname consumername]
     *
     * (write, denyoom)
     * (arity -2, first key 2, last key 2)
     *
     * Create, destroy, and manage consumer groups.
     *
     * @see http://redis.io/commands/xgroup
     * @since 5.0.0
     */
    xgroup()
    {
        let args;
        const len = arguments.length;
        switch(len)
        {
            case 0:
            {
                throw new Error("XGROUP: wrong number of arguments");
            }
            case 1:
            {
                args = [0x20002, "XGROUP", arguments[0]];
                break;
            }
            case 2:
            {
                args = [0x20002, "XGROUP", arguments[0], arguments[1]];
                break;
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x20002;
                args[1] = "XGROUP";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * XINFO [CONSUMERS key groupname] [GROUPS key] [STREAM key] [HELP]
     *
     * (readonly, random)
     * (arity -2, first key 2, last key 2)
     *
     * Get information on streams and consumer groups.
     *
     * @see http://redis.io/commands/xinfo
     * @since 5.0.0
     */
    xinfo()
    {
        let args;
        const len = arguments.length;
        switch(len)
        {
            case 0:
            {
                throw new Error("XINFO: wrong number of arguments");
            }
            case 1:
            {
                args = [0x10002, "XINFO", arguments[0]];
                break;
            }
            case 2:
            {
                args = [0x10002, "XINFO", arguments[0], arguments[1]];
                break;
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x10002;
                args[1] = "XINFO";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * XLEN key
     *
     * (readonly, fast)
     * (arity 2, first key 1, last key 1)
     *
     * Return the number of entires in a stream.
     *
     * @param {Object} arg0 the first argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/xlen
     * @since 5.0.0
     */
    xlen(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "XLEN", arg0]);
        }
        else
        {
            this._c([0x10001, "XLEN", arg0, callback]);
        }
    }

    /**
     * XPENDING key group [start end count] [consumer]
     *
     * (readonly, random)
     * (arity -3, first key 1, last key 1)
     *
     * Return information and entries from a stream consumer group pending entries list, that are messages fetched but never acknowledged.
     *
     * @see http://redis.io/commands/xpending
     * @since 5.0.0
     */
    xpending()
    {
        let args;
        const len = arguments.length;
        switch(len)
        {
            case 0:
            case 1:
            {
                throw new Error("XPENDING: wrong number of arguments");
            }
            case 2:
            {
                args = [0x10001, "XPENDING", arguments[0], arguments[1]];
                break;
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x10001;
                args[1] = "XPENDING";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * XRANGE key start end [COUNT count]
     *
     * (readonly)
     * (arity -4, first key 1, last key 1)
     *
     * Return a range of elements in a stream, with IDs matching the specified IDs interval.
     *
     * @see http://redis.io/commands/xrange
     * @since 5.0.0
     */
    xrange()
    {
        let args;
        const len = arguments.length;
        switch(len)
        {
            case 0:
            case 1:
            case 2:
            {
                throw new Error("XRANGE: wrong number of arguments");
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x10001;
                args[1] = "XRANGE";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * XREAD [COUNT count] [BLOCK milliseconds] STREAMS key [key ...] id [id ...]
     *
     * (readonly, movablekeys)
     * (arity -4, first key 1, last key 1)
     *
     * Return never seen elements in multiple streams, with IDs greater than the ones reported by the caller for each stream. Can block.
     *
     * @see http://redis.io/commands/xread
     * @since 5.0.0
     */
    xread()
    {
        let args;
        const len = arguments.length;
        switch(len)
        {
            case 0:
            case 1:
            case 2:
            {
                throw new Error("XREAD: wrong number of arguments");
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x10001;
                args[1] = "XREAD";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * XREADGROUP GROUP group consumer [COUNT count] [BLOCK milliseconds] [NOACK] STREAMS key [key ...] ID [ID ...]
     *
     * (write, movablekeys)
     * (arity -7, first key 1, last key 1)
     *
     * Return new entries from a stream using a consumer group, or access the history of the pending entries for a given consumer. Can block.
     *
     * @see http://redis.io/commands/xreadgroup
     * @since 5.0.0
     */
    xreadgroup()
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
            case 5:
            {
                throw new Error("XREADGROUP: wrong number of arguments");
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x20001;
                args[1] = "XREADGROUP";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * XREVRANGE key end start [COUNT count]
     *
     * (readonly)
     * (arity -4, first key 1, last key 1)
     *
     * Return a range of elements in a stream, with IDs matching the specified IDs interval, in reverse order (from greater to smaller IDs) compared to XRANGE.
     *
     * @see http://redis.io/commands/xrevrange
     * @since 5.0.0
     */
    xrevrange()
    {
        let args;
        const len = arguments.length;
        switch(len)
        {
            case 0:
            case 1:
            case 2:
            {
                throw new Error("XREVRANGE: wrong number of arguments");
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x10001;
                args[1] = "XREVRANGE";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * XSETID key arg 
     *
     * (write, denyoom, fast)
     * (arity 3, first key 1, last key 1)
     *
     * Help not available.
     *
     * @param {Object} arg0 the first argument.
     * @param {Object} arg1 the second argument.
     * @param {Function} callback the function to call when done.
     * @see http://redis.io/commands/xsetid
     * @since not known
     */
    xsetid(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x20001, "XSETID", arg0, arg1]);
        }
        else
        {
            this._c([0x20001, "XSETID", arg0, arg1, callback]);
        }
    }

    /**
     * XTRIM key MAXLEN [~] count
     *
     * (write, random)
     * (arity -2, first key 1, last key 1)
     *
     * Trims the stream to (approximately if '~' is passed) a certain size.
     *
     * @see http://redis.io/commands/xtrim
     * @since 5.0.0
     */
    xtrim()
    {
        let args;
        const len = arguments.length;
        switch(len)
        {
            case 0:
            {
                throw new Error("XTRIM: wrong number of arguments");
            }
            case 1:
            {
                args = [0x20001, "XTRIM", arguments[0]];
                break;
            }
            case 2:
            {
                args = [0x20001, "XTRIM", arguments[0], arguments[1]];
                break;
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x20001;
                args[1] = "XTRIM";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

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
    zadd()
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
        return this._r(args);
    }

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
    zcard(arg0, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "ZCARD", arg0]);
        }
        else
        {
            this._c([0x10001, "ZCARD", arg0, callback]);
        }
    }

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
    zcount()
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
        return this._r(args);
    }

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
    zincrby()
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
        return this._r(args);
    }

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
    zinterstore()
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
        return this._r(args);
    }

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
    zlexcount()
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
        return this._r(args);
    }

    /**
     * ZPOPMAX key [count]
     *
     * (write, fast)
     * (arity -2, first key 1, last key 1)
     *
     * Remove and return members with the highest scores in a sorted set.
     *
     * @see http://redis.io/commands/zpopmax
     * @since 5.0.0
     */
    zpopmax()
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
                args = [0x20001, "ZPOPMAX", arguments[0]];
                break;
            }
            case 2:
            {
                args = [0x20001, "ZPOPMAX", arguments[0], arguments[1]];
                break;
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x20001;
                args[1] = "ZPOPMAX";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

    /**
     * ZPOPMIN key [count]
     *
     * (write, fast)
     * (arity -2, first key 1, last key 1)
     *
     * Remove and return members with the lowest scores in a sorted set.
     *
     * @see http://redis.io/commands/zpopmin
     * @since 5.0.0
     */
    zpopmin()
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
                args = [0x20001, "ZPOPMIN", arguments[0]];
                break;
            }
            case 2:
            {
                args = [0x20001, "ZPOPMIN", arguments[0], arguments[1]];
                break;
            }
            default:
            {
                args = new Array(len + 2);
                args[0] = 0x20001;
                args[1] = "ZPOPMIN";
                for(let n = 0; n < len; n++)
                {
                    args[n+2] = arguments[n];
                }
            }
        }
        return this._r(args);
    }

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
    zrange()
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
        return this._r(args);
    }

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
    zrangebylex()
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
        return this._r(args);
    }

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
    zrangebyscore()
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
        return this._r(args);
    }

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
    zrank(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "ZRANK", arg0, arg1]);
        }
        else
        {
            this._c([0x10001, "ZRANK", arg0, arg1, callback]);
        }
    }

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
    zrem()
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
        return this._r(args);
    }

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
    zremrangebylex()
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
        return this._r(args);
    }

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
    zremrangebyrank()
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
        return this._r(args);
    }

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
    zremrangebyscore()
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
        return this._r(args);
    }

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
    zrevrange()
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
        return this._r(args);
    }

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
    zrevrangebylex()
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
        return this._r(args);
    }

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
    zrevrangebyscore()
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
        return this._r(args);
    }

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
    zrevrank(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "ZREVRANK", arg0, arg1]);
        }
        else
        {
            this._c([0x10001, "ZREVRANK", arg0, arg1, callback]);
        }
    }

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
    zscan()
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
        return this._r(args);
    }

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
    zscore(arg0, arg1, callback)
    {
        if(callback === void null)
        {
            return this._p([0x10001, "ZSCORE", arg0, arg1]);
        }
        else
        {
            this._c([0x10001, "ZSCORE", arg0, arg1, callback]);
        }
    }

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
    zunionstore()
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
        return this._r(args);
    }
}

module.exports = AbstractCommands;