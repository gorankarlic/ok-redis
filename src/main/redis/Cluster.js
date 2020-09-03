"use strict";

const ClusterNode = require("./ClusterNode");
const Deque = require("../util/Deque");
const Random = require("../util/Random");
const RespWriter = require("./RespWriter");
const RedisAskError = require("./RedisAskError");
const RedisMovedError = require("./RedisMovedError");

/**
 * Creates a new instance of this class.
 *
 * @class
 * @classdesc Redis cluster implementation.
 * @param {Object} opts the connection options.
 */
class Cluster
{
    /**
     * Creates a new instance of this class.
     *
     * @param {Object} opts the connection options.
     */
    constructor(opts)
    {
        this.client = null;
        this.commands = new Deque();
        this.mode = Cluster.MODE.Mcrw;
        this.nodes = null;
        this.opts = opts;
        this.slots = null;
        this.stopped = true;
        this.writer = new RespWriter();
    }

    /**
     * Connects to all nodes in a cluster.
     *
     * @param {Function} done the function to call when connected.
     */
    connect(done)
    {
        if(this.client === null)
        {
            this.client = new ClusterNode(this, this.opts);
            this.client.connect(done);
            this.reconfigure();
            this.stopped = false;
        }
        else
        {
            throw new Error("already connected");
        }
    };

    /**
     * Connects a single node in the cluster.
     *
     * @private
     * @param {Array} hostPort the host and port for the node.
     * @returns {Client} the node client.
     */
    connectNode(hostPort)
    {
        const host = hostPort[0].toString("utf8");
        const port = hostPort[1];
        const opts = Object.assign({}, this.opts, {host: host, port: port});
        return new ClusterNode(this, opts);
    };

    /**
     * Runs the specified command.
     *
     * @public
     * @param {Array} args the command arguments.
     */
    command(args)
    {
        if(this.slots === null)
        {
            this.commands.addLast(args);
        }
        else
        {
            const type = args[0];
            const index = type & 0xFF;
            const rw = type >>> 16;
            const slot = index === 0 ? -1 : RespWriter.slotFromArgs(args, index);
            const node = this.nodeFor(slot, rw);
            node.command(args);
        }
    };

    /**
     * Runs the specified command on all master nodes.
     *
     * @public
     * @param {Array} args the command arguments.
     */
    commandMasters(args)
    {
        if(this.slots === null)
        {
            this.commands.addLast(args);
        }
        else
        {
            const callback = args[args.length - 1];
            if(callback instanceof Function)
            {
                const n = this.nodes.size;
                const results = [];
                args[args.length - 1] = (err, ...result) =>
                {
                    if(err === null)
                    {
                        results.push(...result);
                        if(results.length === n)
                        {
                            callback(null, results);
                        }
                    }
                    else
                    {
                        callback(err);
                    }
                };
            }
            for(const nodes of this.nodes.values())
            {
                nodes[0].command(args);
            }
        }
    };

    /**
     * Runs the specified queue with command arguments.
     *
     * @param {Array} queue the command arguments queue.
     * @param {Number} slot the cluster slot number.
     * @param {Number} rw the read/write operation flags.
     */
    commandPipeline(queue, slot, rw)
    {
        if(this.slots === null)
        {
            this.commands.appendAll(queue);
        }
        else
        {
            const node = this.nodeFor(slot, rw);
            node.commandPipeline(queue);
        }
    };

    /**
     * Determines the node to use for the operation.
     *
     * @private
     * @param {Number} slot the cluster slot number.
     * @param {Number} rw the read/write operation flags.
     * @returns {Client} the node to use for the operation.
     */
    nodeFor(slot, rw)
    {
        const sid = slot === -1 ? Cluster.random(16384) : slot;
        const nodes = this.slots[sid];
        const index = Cluster.nodeForOp(nodes.length, this.mode, rw);
        return nodes[index];
    };

    /**
     * Reconfigures the cluster nodes and updates the slots.
     */
    reconfigure()
    {
        this.nodes = null;
        this.slots = null;
        this.client.command([0, "CLUSTER", "SLOTS", this.reconnectNodes.bind(this)]);
    };

    /**
     * Connects with all nodes in the cluster and set up the slot-node mapping.
     *
     * @private
     * @param {Error} err the error that occured.
     * @param {Array} results the list of cluster slots and nodes.
     */
    reconnectNodes(err, results)
    {
        if(err)
        {
            throw err;
        }
        if(this.stopped)
        {
            return;
        }
        const nodes = new Map();
        const slots = new Array(16384);
        for(let n = 0; n < results.length; n++)
        {
            const result = results[n];
            const slot0 = result[0];
            const slot1 = result[1];
            const master = result[2];
            const masterUUID = master[2].toString("ascii");
            let nodeList = nodes.get(masterUUID);
            if(nodeList === void(null))
            {
                nodeList = [this.connectNode(master)];
                for(let j = 3; j < result.length; j++)
                {
                    let slave = result[j];
                    let slaveNode = this.connectNode(slave);
                    nodeList.push(slaveNode);
                }
                nodes.set(masterUUID, nodeList);
            }
            for(let k = slot0; k <= slot1; k++)
            {
                slots[k] = nodeList;
            }
        }
        const ordered = [];
        for(let slot = 0; slot < 16384; slot++)
        {
            ordered.push(slots[slot]);
        }
        for(let nodeList of nodes.values())
        {
            for(let n = 0; n < nodeList.length; n++)
            {
                const node = nodeList[n];
                node.connect();
                node.command([0, "READWRITE"]);
            }
        }
        this.nodes = nodes;
        this.slots = ordered;
        while(!this.commands.isEmpty())
        {
            const args = this.commands.removeFirst();
            if(args[0] === 0xFFFF)
            {
                this.commandMasters(args);
            }
            else
            {
                this.command(args);
            }
        }
    };

    /**
     * Retries the command after an error.
     *
     * @param {Array} args the command arguments.
     * @param {Function} callback the callback method for the command.
     * @param {Error} error the error that occured.
     */
    retry(args, callback, error)
    {
        if(error instanceof RedisAskError)
        {
            let hostPort = error.hostPort;
            let node = this.nodeForHostPort(hostPort);
            node.command([0, "*1\r\n$6\r\nASKING\r\n"]);
            node.command(args);
        }
        else if(error instanceof RedisMovedError)
        {
            const slot = error.slot;
            const node = this.nodeFor(slot);
            node.command(args);
        }
        else if(callback !== void(null))
        {
            callback(error);
        }
        else
        {
            throw error;
        }
    };

    /**
     * Sets the cluster mode.
     *
     * @param {Number} mode the new cluster mode.
     */
    setMode(mode)
    {
        if((this.mode & 8) !== (mode & 8))
        {
            const readonly = (mode & 8) !== 0 ? "READONLY" : "READWRITE";
            for(let nodeList of this.nodes.values())
            {
                for(let n = 1; n < nodeList.length; n++)
                {
                    nodeList[n].command(readonly, null);
                }
            }
        }
        this.mode = mode;
    };

    /**
     * Quits all cluster connections gracefully.
     *
     * @param {Function} done the function to call when all client have quit.
     */
    quit(done)
    {
        if(this.client === null)
        {
            throw new Error("not yet connected");
        }
        this.terminateCluster(done, false);
    };

    /**
     * Terminates all cluster connections forcefully.
     *
     * @param {Function} done the function to call when all connections have been closed.
     */
    terminate(done)
    {
        if(this.client === null)
        {
            done(null);
            return;
        }
        this.terminateCluster(done, true);
    }

    /**
     * Stops all cluster connections.
     *
     * @param {Function} done the function to call when all client have stopped.
     * @param {Boolean} terminate indicates if to use forceful termination.
     */
    terminateCluster(done, terminate)
    {
        let run = 0;
        let runs = 1;
        const ran = () =>
        {
            if(++run === runs)
            {
                if(done !== void null)
                {
                    done(null);
                }
            }
        };
        if(this.nodes !== null)
        {
            for(let nodeList of this.nodes.values())
            {
                for(let n = 0; n < nodeList.length; n++)
                {
                    const node = nodeList[n];
                    if(terminate)
                    {
                        node.terminate(ran);
                    }
                    else
                    {
                        node.quit(ran);
                    }
                    runs++;
                }
            }
        }
        if(terminate)
        {
            this.client.terminate(ran);
        }
        else
        {
            this.client.quit(ran);
        }
        this.client = null;
        this.nodes = null;
        this.slots = null;
        this.stopped = true;
    };

    /**
     * Determines the node to use for the operation.
     *
     * @private
     * @param {Number} nodes the number of master and slave nodes.
     * @param {Number} mode the operation mode flags.
     * @param {Number} rw the read/write operation flags (0: none, 1: read, 2: write).
     * @returns {Number} the index of the node to use (master has index 0).
     */
    static nodeForOp(nodes, mode, rw)
    {
        switch(rw)
        {
            case 0:
            {
                switch(mode & 5)
                {
                    case 1: return 0;
                    case 4: return Cluster.random(nodes - 1) + 1;
                    default: return Cluster.random(nodes);
                }
            }
            case 1:
            {
                switch(mode & 10)
                {
                    case 2: return 0;
                    case 8: return Cluster.random(nodes - 1) + 1;
                    default: return Cluster.random(nodes);
                }
            }
            default:
            {
                return 0;
            }
        }
    };

    /**
     * Generates a new random number.
     *
     * @param {Number} range the maximum number to generate.
     * @returns {Number} the newly generated random number.
     */
    static random(range)
    {
        return Math.floor(Math.random() * range);
    };
}

/**
 * Cluster operation mode.
 */
Cluster.MODE =
{
    /**
     * Master: command, read, write; slaves: nothing.
     */
    Mcrw: 1 + 2 + 0 + 0,

    /**
     * Master: command, read, write; slaves: command.
     */
    McrwSc: 1 + 2 + 4 + 0,

    /**
     * Master: command, write; slaves: read.
     */
    McwSr: 1 + 0 + 0 + 8,

    /**
     * Master: command, read, write; slaves: read.
     */
    McrwSr: 1 + 2 + 0 + 8,

    /**
     * Master: write; slaves: command, read.
     */
    MwScr: 0 + 0 + 4 + 8,

    /**
     * Master: command, write; slaves: command, read.
     */
    McwScr: 1 + 0 + 4 + 8,

    /**
     * Master: command, read, write; slaves: command, read.
     */
    McrwScr: 1 + 2 + 4 + 8
};

module.exports = Cluster;