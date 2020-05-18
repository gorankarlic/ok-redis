"use strict";

const Client = require("./Client");
const RespWriter = require("./RespWriter");

/**
 * Subscription dedicated client instance.
 */
class Channel extends Client
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Object} opts the connection options.
     * @param {Function} callback the function that is called on incoming messages.
     */
    constructor(opts, callback)
    {
        super(opts);
        this.callback = callback;
    }

    /**
     * Tests if the buffer reads "MESSAGE".
     *
     * @param {Buffer} b the buffer to read.
     * @returns {Boolean} indicates if the buffer reads "MESSAGE".
     */
    static isMESSAGE(b)
    {
        return b.length === 7 &&
        b[0] === 0x6D &&
        b[1] === 0x65 &&
        b[2] === 0x73 &&
        b[3] === 0x73 &&
        b[4] === 0x61 &&
        b[5] === 0x67 &&
        b[6] === 0x65;
    };

    /**
     * Tests if the buffer reads "PMESSAGE".
     *
     * @param {Buffer} b the buffer to read.
     * @returns {Boolean} indicates if the buffer reads "PMESSAGE".
     */
    static isPMESSAGE(b)
    {
        return b.length === 8 &&
        b[0] === 0x70 &&
        b[1] === 0x6D &&
        b[2] === 0x65 &&
        b[3] === 0x73 &&
        b[4] === 0x73 &&
        b[5] === 0x61 &&
        b[6] === 0x67 &&
        b[7] === 0x65;
    };

    /**
     * Client has received a reply.
     *
     * @param {Object} result the command reply.
     */
    onreply(result)
    {
        if(Channel.isMESSAGE(result[0]))
        {
            this.callback(result[1], result[2]);
        }
        else if(Channel.isPMESSAGE(result[0]))
        {
            this.callback(result[1], result[2], result[3]);
        }
        else
        {
            let args = this.queue.removeFirst();
            let callback = RespWriter.callbackFromArgs(args);
            if(result instanceof Error)
            {
                if(callback === void(null))
                {
                    throw result;
                }
                else
                {
                    callback(result);
                }
            }
            else if(callback !== void(null))
            {
                callback(null, result);
            }
        }
    };
}

module.exports = Channel;