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
     * Creates a Redis instance client.
     *
     * @public
     * @param {RedisOpts} opts the connection options.
     * @return {Redis} the newly created Redis client.
     */
    static create(opts = Redis.opts())
    {
        return new RedisClient(opts.opts);
    }

    /**
     * Creates a Redis subscriber channel.
     *
     * @public
     * @param {RedisOpts} opts the connection options.
     * @return {Redis} the newly created Redis channel.
     */
    static createChannel(opts = Redis.opts())
    {
        return new RedisChannel(opts.opts);
    }

    /**
     * Creates a Redis cluster client.
     *
     * @public
     * @param {RedisOpts} opts the connection options.
     * @return {Redis} the newly created Redis cluster client.
     */
    static createCluster(opts = Redis.opts())
    {
        return new RedisCluster(opts.opts);
    }

    /**
     * Creates and connects a Redis instance client.
     *
     * @public
     * @param {RedisOpts} opts the connection options.
     * @param {Function} done the function to call when connected.
     * @return {Redis} the newly created and connected Redis client.
     */
    static connect(opts = Redis.opts(), done = void null)
    {
        const client = new RedisClient(opts.opts);
        if(done === void null)
        {
            return new Promise((resolve, reject) => client.connect((err) => err === null ? resolve(client) : reject(err)));
        }
        else
        {
            client.connect((err) => err === null ? done(null, client) : done(err));
        }
    }

    /**
     * Creates and connects a Redis subscriber channel.
     *
     * @public
     * @param {RedisOpts} opts the connection options.
     * @param {Function} done the function to call when connected.
     * @return {Redis} the newly created and connected Redis subscriber channel.
     */
    static connectChannel(opts = new RedisOpts(), done = void null)
    {
        const channel = new RedisChannel(opts.opts);
        if(done === void null)
        {
            return new Promise((resolve, reject) => channel.connect((err) => err === null ? resolve(channel) : reject(err)));
        }
        else
        {
            channel.connect((err) => err === null ? done(null, channel) : done(err));
        }
    }


    /**
     * Creates and connects a Redis cluster client.
     *
     * @public
     * @param {RedisOpts} opts the connection options.
     * @param {Function} done the function to call when connected.
     * @return {Redis} the newly created and connected Redis cluster client.
     */
    static connectCluster(opts = new RedisOpts(), done = void null)
    {
        const cluster = new RedisCluster(opts.opts);
        if(done === void null)
        {
            return new Promise((resolve, reject) => cluster.connect((err) => err === null ? resolve(cluster) : (console.log(err), reject(err))));
        }
        else
        {
            cluster.connect((err) => err === null ? done(null, cluster) : done(err));
        }
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