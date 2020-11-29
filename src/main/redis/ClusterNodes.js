"use strict";

const Commands = require("./Commands");

/**
 * Redis cluster operation that runs on all nodes.
 */
class ClusterNodes extends Commands
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Cluster} client the redis client that will execute this batch.
     */
    constructor(client)
    {
        super(client);
    }

    _c(args)
    {
        args[0] = 0xFFFF;
        this._client.commandAll(args);
    }
}

module.exports = ClusterNodes;