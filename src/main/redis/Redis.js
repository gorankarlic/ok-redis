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
     * @return {Redis} the newly created and connected Redis client.
     * @see https://nodejs.org/api/net.html#net_socket_connect_options_connectlistener
     */
    static async connect(opts = new RedisOpts())
    {
        const client = new RedisClient(opts.opts);
        await client.connect();
        return client;
    }

    /**
     * Connect with a Redis cluster.
     *
     * @public
     * @param {RedisOpts} opts the connection options.
     * @return {Redis} the newly created and connected Redis client.
     */
    static async connectCluster(opts = new RedisOpts())
    {
        const cluster = new RedisCluster(opts.opts);
        await cluster.connect();
        return cluster;
    }

    /**
     * Connect with a Redis channel for subscriptions.
     *
     * @public
     * @param {RedisOpts} opts the connection options.
     * @return {Redis} the newly created and connected Redis channel.
     */
    static async connectChannel(opts = new RedisOpts())
    {
        const channel = new RedisChannel(opts.opts);
        await channel.connect();
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