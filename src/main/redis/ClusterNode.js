"use strict";

const Client = require("./Client");

/**
 * Redis cluster node.
 */
class ClusterNode extends Client
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Cluster} cluster the cluster this node belongs to.
     * @param {Object} opts the connection options.
     */
    constructor(cluster, opts)
    {
        super(opts);
        this.cluster = cluster;
    }

    retry(args, callback, error)
    {
        this.cluster.retry(args, callback, error);
    };
}

module.exports = ClusterNode;