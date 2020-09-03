"use strict";

const net = require("net");
const Deque = require("../util/Deque");
const RespBuffer = require("./RespBuffer");
const RespReader = require("./RespReader");
const RespWriter = require("./RespWriter");

let terminate = false;
process.on("uncaughtExceptionMonitor", () => terminate = true);

/**
 * Creates a new instance of this class.
 *
 * @class
 * @classdesc Redis client implementation.
 * @param {Object} opts the connection options.
 */
class Client
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Object} opts the connection options.
     */
    constructor(opts)
    {
        this.opts = opts;
        this.queue = new Deque();
        this.rb = new RespBuffer(Buffer.allocUnsafe(0));
        this.reconnect = null;
        this.reader = RespReader.createReader(opts.type);
        this.ready = false;
        this.uncorked = true;
        this.uncorker = this.uncork.bind(this);
        this.writer = new RespWriter();

        this.socket = new net.Socket();
        this.socket.setNoDelay(true);
        this.socket.on("connect", this.onconnect.bind(this));
        this.socket.on("close", this.onclose.bind(this));
        this.socket.on("data", this.ondata.bind(this));
        this.socket.on("drain", this.ondrain.bind(this));
        this.socket.on("error", this.onerror.bind(this));
    }

    /**
     * Runs the the specified command arguments.
     *
     * @param {Array} args the command arguments.
     */
    command(args)
    {
        this.writer.write(args);
        this.queue.addLast(args);
        this.cork();
    }

    /**
     * Runs the queue with the command specified arguments.
     *
     * @param {Array} queue the command arguments queue.
     */
    commandPipeline(queue)
    {
        while(!queue.isEmpty())
        {
            const args = queue.removeFirst();
            this.queue.addLast(args);
            this.writer.write(args);
        }
        this.cork();
    }

    /**
     * Corks the socket stream for writing.
     */
    cork()
    {
        if(this.ready && this.uncorked)
        {
            this.uncorked = false;
            process.nextTick(this.uncorker);
        }
    }

    /**
     * Writes the remaining buffer to the socket stream.
     */
    uncork()
    {
        if(this.socket.write(this.writer.buffer()))
        {
            this.uncorked = true;
            this.writer.reset();
        }
        else
        {
            this.uncorked = false;
            this.writer.mark();
        }
    }

    /**
     * Connects the client.
     *
     * @param {Function} done the function to call when connected.
     */
    connect(done)
    {
        this.reconnect = null;
        this.socket.connect(this.opts, () => done === void null ? void null : done(null));
        this.socket.once("error", (err) => done === void null ? void null : done(err));
    }

    /**
     * Client socket has closed.
     */
    onclose()
    {
        this.ready = false;
        this.uncorked = true;
        if(this.reconnect === true && terminate === false)
        {
            this.socket.connect(this.opts);
        }
        else
        {
            this.writer.realloc(this.writer.n);
        }
    }

    /**
     * Client socket has connected.
     */
    onconnect()
    {
        if(this.reconnect === null)
        {
            this.reconnect = true;
        }
        this.onready();
    }

    /**
     * Client socket has received data.
     *
     * @param {Buffer} buffer the data buffer.
     */
    ondata(buffer)
    {
        const rb = this.rb;
        const reader = this.reader;
        rb.replace(buffer);
        while(rb.hasRemaining() && !reader.read(rb))
        {
            this.onreply(reader.result());
            reader.reset();
        }
    }

    /**
     * Client socket buffer has drained.
     */
    ondrain()
    {
        this.uncorked = true;
        this.writer.reset();
    }

    /**
     * Client socket has an error.
     *
     * @param {Error} error the error that occured.
     */
    onerror(error)
    {
        //process.stderr.write(`Redis client ${error.stack}\n`);
        //throw error;
    }

    /**
     * Client socket is connected and Redis may be ready.
     *
     * @param {Error} err the ping command error.
     */
    onready(err)
    {
        this.ready = true;
        this.uncork();
    }

    /**
     * Client has received a reply.
     *
     * @param {Object} result the command reply.
     */
    onreply(result)
    {
        const args = this.queue.removeFirst();
        const callback = RespWriter.callbackFromArgs(args);
        if(result instanceof Error)
        {
            this.retry(args, callback, result);
        }
        else if(callback !== void(null))
        {
            callback(null, result);
        }
    }

    /**
     * Client has received an error reply.
     *
     * @param {Array} args the command arguments.
     * @param {Function} callback the function to call with the command reply.
     * @param {Object} error the Redis error reply.
     */
    retry(args, callback, error)
    {
        if(callback === void(null))
        {
            throw error;
        }
        else
        {
            callback(error);
        }
    }

    /**
     * Quits the client connection gracefully.
     *
     * @param {Function} done the function to call when the client quits.
     */
    quit(done)
    {
        this.command([0, "QUIT", done]);
        this.reconnect = false;
        this.ready = false;
    }

    /**
     * Terminates the client connection forcefully.
     *
     * @param {Function} done the function to call when the connection terminates.
     */
    terminate(done)
    {
        this.reconnect = false;
        this.ready = false;
        this.socket.end(() => done(null));
    }
}

module.exports = Client;