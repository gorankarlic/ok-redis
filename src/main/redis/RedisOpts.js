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
            returns: Buffer
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

    returns(returns)
    {
        this.opts.returns = returns;
        return this;
    }
}

module.exports = RedisOpts;