"use strict";

const RedisChannel = require("./RedisChannel");
const RedisClient = require("./RedisClient");
const RedisCluster = require("./RedisCluster");
const RedisOpts = require("./RedisOpts");

/**
 * Open Konspiracy Redis Client API.
 */
class Redis
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        throw new Error("can not create an instance of this class");
    }

    /**
     * Connect with a single Redis instance.
     *
     * @public
     * @param {RedisOpts} opts the connection options.
     * @param {Function} done the function to call when connected.
     * @return {Redis} the newly created and connected Redis client.
     * @see https://nodejs.org/api/net.html#net_socket_connect_options_connectlistener
     */
    static connect(opts = new RedisOpts(), done = void null)
    {
        const client = new RedisClient(opts.opts);
        client.connect(done);
        return client;
    }

    /**
     * Connect with a Redis cluster.
     *
     * @public
     * @param {RedisOpts} opts the connection options.
     * @param {Function} done the function to call when connected.
     * @return {Redis} the newly created and connected Redis client.
     */
    static async connectCluster(opts = new RedisOpts(), done = void null)
    {
        const cluster = new RedisCluster(opts.opts);
        cluster.connect(done);
        return cluster;
    }

    /**
     * Connect with a Redis channel for subscriptions.
     *
     * @public
     * @param {RedisOpts} opts the connection options.
     * @param {Function} done the function to call when connected.
     * @return {Redis} the newly created and connected Redis channel.
     */
    static async connectChannel(opts = new RedisOpts(), done = void null)
    {
        const channel = new RedisChannel(opts.opts);
        channel.connect(done);
        return channel;
    }

    /**
     * Creates a new instance of Redis options.
     *
     * @returns {RedisOpts} the newly created instance of Redis options.
     */
    static opts()
    {
        return new RedisOpts();
    }
}

module.exports = Redis;