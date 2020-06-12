"use strict";

const Channel = require("./Channel");

/**
 * Redis channel API.
 */
class RedisChannel
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Object} opts the connection options.
     */
    constructor(opts)
    {
        this._client = new Channel(opts, this._dispatch.bind(this));
        this._listener = this._dispatchChannel.bind(this);
        this._listeners = new Map();
    }

    /**
     * Connects the client.
     *
     * @param {Function} done the function to call when connected.
     */
    connect(done)
    {
        if(done === void null)
        {
            return new Promise((resolve, reject) => this._client.connect((err, result) => err === null ? resolve(result) : reject(err)));
        }
        else
        {
            this._client.connect(done);
        }
    }

    /**
     * Adds a listener for a channel.
     *
     * @param {String} channel the channel name.
     * @param {Function} listener the function to call on an incoming message.
     */
    addListener(channel, listener)
    {
        this._listeners.set(channel, listener);
    }

    /**
     * Removes the listener for a channel.
     *
     * @param {String} channel the channel name.
     */
    removeListener(channel)
    {
        this._listeners.delete(channel);
    }

    /**
     * Sets the listener that will receive messages for all channels.
     *
     * @param {Function} listener the function to call on an incoming message.
     */
    dispatch(listener)
    {
        this._listener = listener;
    }

    /**
     * Dispatches the message to the listener.
     *
     * @param {Buffer} channel the channel name.
     * @param {Buffer} message the received message.
     */
    _dispatch(channel, message)
    {
        this._listener(channel, message);
    }

    /**
     * Dispatches the message to the corresponding listener by channel name.
     *
     * @param {Buffer} channel the channel name.
     * @param {Buffer} message the received message.
     */
    _dispatchChannel(channel, message)
    {
        const listener = this._listeners.get(channel.toString());
        if(listener !== void(null))
        {
            listener(channel, message);
        }
    }

    /**
     * PSUBSCRIBE pattern [pattern ...]
     *
     * Listen for messages published to channels matching the given patterns.
     *
     * @see http://redis.io/commands/psubscribe
     * @since 2.0.0
     */
    psubscribe()
    {
        this._client.command([0, "PSUBSCRIBE", ...arguments]);
    }

    /**
     * PUNSUBSCRIBE [pattern [pattern ...]]
     *
     * Stop listening for messages posted to channels matching the given patterns.
     *
     * @see http://redis.io/commands/punsubscribe
     * @since 2.0.0
     */
    punsubscribe()
    {
        this._client.command([0, "PUNSUBSCRIBE", ...arguments]);
    }

    /**
     * SUBSCRIBE channel [channel ...]
     *
     * Listen for messages published to the given channels.
     *
     * @see http://redis.io/commands/subscribe
     * @since 2.0.0
     */
    subscribe()
    {
        this._client.command([0, "SUBSCRIBE", ...arguments]);
    }

    /**
     * Quits the client connection gracefully.
     *
     * @see http://redis.io/commands/quit
     * @param {Function} done the function to call when the client quits.
     */
    quit(done)
    {
        if(done === void null)
        {
            return new Promise((resolve, reject) => this._client.quit((err, result) => err === null ? resolve(result) : reject(err)));
        }
        else
        {
            this._client.quit(done);
        }
    }

    /**
     * UNSUBSCRIBE [channel [channel ...]]
     *
     * Stop listening for messages posted to the given channels.
     *
     * @see http://redis.io/commands/unsubscribe
     * @since 2.0.0
     */
    unsubscribe()
    {
        this._client.command([0, "UNSUBSCRIBE", ...arguments]);
    }
}

module.exports = RedisChannel;