"use strict";

const RedisChannel = require("./RedisChannel");
const RedisClient = require("./RedisClient");
const RedisCluster = require("./RedisCluster");

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
     * @param {Object} opts the connection options.
     * @return {Redis} the newly created and connected Redis client.
     * @see https://nodejs.org/api/net.html#net_socket_connect_options_connectlistener
     */
    static async connect(opts)
    {
        const client = new RedisClient(opts === void(null) ? Redis.OPTS : opts);
        await client.connect();
        return client;
    }

    /**
     * Connect with a Redis cluster.
     *
     * @public
     * @param {Object} opts the connection options.
     * @return {Redis} the newly created and connected Redis client.
     */
    static async connectCluster(opts)
    {
        const cluster = new RedisCluster(opts === void(null) ? Redis.OPTS : opts);
        await cluster.connect();
        return cluster;
    }

    /**
     * Connect with a Redis channel for subscriptions.
     *
     * @public
     * @param {Object} opts the connection options.
     * @param {Function} callback the function to be called on incoming messages.
     * @return {Redis} the newly created and connected Redis channel.
     */
    static async connectChannel(opts, callback)
    {
        const channel = new RedisChannel(opts === void(null) ? Redis.OPTS : opts, callback);
        await channel.connect();
        return channel;
    }
}

/**
 * Default redis options.
 *
 * @private
 * @type Object
 */
Redis.OPTS =
{
    host: String(process.env.REDIS_HOST || "localhost"),
    port: Number(process.env.REDIS_PORT || 6379)
};

module.exports = Redis;