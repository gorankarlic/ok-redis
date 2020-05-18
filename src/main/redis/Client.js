"use strict";

const net = require("net");
const Deque = require("../util/Deque");
const RespBuffer = require("./RespBuffer");
const RespReader = require("./RespReader");
const RespWriter = require("./RespWriter");

/**
 * Creates a new instance of this class.
 *
 * @class
 * @classdesc Redis client implementation.
 * @param {Object} opts the connection options.
 */
class Client
{
    constructor(opts)
    {
        this.opts = opts;
        this.queue = new Deque();
        this.rb = new RespBuffer(Buffer.allocUnsafe(0));
        this.reconnect = true;
        this.reader = new RespReader();
        this.ready = false;
        this.socket = null;
        this.uncorked = true;
        this.uncorker = this.uncork.bind(this);
        this.writer = new RespWriter();
    }

    /**
     * Runs the the specified command arguments.
     *
     * @param {Array} args the command arguments.
     */
    command(args)
    {
        this.queue.addLast(args);
        this.writer.write(args);
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
            this.writer.reset();
        }
        else
        {
            this.writer.mark();
        }
        this.uncorked = true;
    }

    /**
     * Connects the client.
     *
     * @param {Function} done the function to call when connected.
     */
    connect(done)
    {
        if(this.socket !== null)
        {
            throw new Error("already connected");
        }
        this.reconnect = false;
        this.socket = net.createConnection(this.opts, this.onconnect.bind(this));
        if(done !== void null)
        {
            this.socket.once("connect", () => void done(null));
            this.socket.once("error", (err) => void done(err));
        }
        this.socket.on("close", this.onclose.bind(this));
        this.socket.on("data", this.ondata.bind(this));
        this.socket.on("drain", this.ondrain.bind(this));
        this.socket.on("error", this.onerror.bind(this));
        this.socket.setNoDelay(true);
        this.socket.unref();
    }

    /**
     * Client socket has closed.
     */
    onclose()
    {
        this.ready = false;
        this.socket = null;
        this.uncorked = true;
        this.writer.realloc(this.writer.n);
        if(this.reconnect)
        {
            this.connect();
        }
    }

    /**
     * Client socket has connected.
     */
    onconnect()
    {
        this.reconnect = true;
        this.queue.addFirst([0, "PING", this.onready.bind(this)]);
        this.socket.write(Buffer.from("*1\r\n$4\r\nPING\r\n", "ascii"));
    }

    /**
     * Client socket has received data.
     *
     * @param {Buffer} buffer the data buffer.
     */
    ondata(buffer)
    {
        let rb = this.rb;
        let reader = this.reader;
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
        this.writer.reset();
    }

    /**
     * Client socket has an error.
     *
     * @param {Error} error the error that occured.
     */
    onerror(error)
    {
        //console.error("Redis client %s", error.stack);
        throw error;
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
        console.log(error);
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
        if(this.socket === null)
        {
            throw new Error("not connected");
        }
        this.command([0, "QUIT", done]);
        this.ready = false;
        this.reconnect = false;
    }
}

module.exports = Client;