"use strict";

/**
 * Open Konspiracy Redis Client API options.
 */
class RedisOpts
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        this.opts =
        {
            host: "localhost",
            port: 6379,
            type: Buffer
        };
    }

    host(host)
    {
        this.opts.host = host;
        return this;
    }

    port(port)
    {
        this.opts.port = port;
        return this;
    }

    return(type)
    {
        switch(type)
        {
            case Buffer:
            {
                this.opts.type = type;
                return this;
            }
            case String:
            {
                this.opts.type = type;
                return this;
            }
            default:
            {
                throw new Error("return type must be Buffer or String");
            }
        }
    }
}

module.exports = RedisOpts;