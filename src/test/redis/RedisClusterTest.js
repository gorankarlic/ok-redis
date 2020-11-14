"use strict";

const assert = require("assert");
const child_process = require("child_process");
const sinon = require("sinon");
const Cluster = require("../../main/redis/Cluster");
const RedisCluster = require("../../main/redis/RedisCluster");

describe("RedisCluster", function()
{
    this.timeout(60000);

    before(function()
    {
        const path = "target/cluster-test";
        const host = [];
        child_process.execSync(`mkdir -p ${path}`);
        for(let node = 1; node <= 6; node++)
        {
            const port = 30000 + node;
            host.push(`127.0.0.1:${port}`);
            child_process.execSync(`redis-cli -p ${port} shutdown nosave || true`, {stdio: "ignore"});
            child_process.execSync(`rm -f ${path}/${port}.aof ${path}/${port}.conf ${path}/${port}.log ${path}/${port}.rdb`, {stdio: "ignore"});
            child_process.execSync(`cd ${path} && redis-server --port ${port} --cluster-enabled yes --cluster-config-file ${port}.conf --cluster-node-timeout 2000 --appendonly yes --appendfilename ${port}.aof --dbfilename ${port}.rdb --logfile ${port}.log --daemonize yes`, {stdio: "ignore"});
        }
        const hosts = host.join(" ");
        child_process.execSync(`printf "yes" | redis-cli --cluster create ${hosts} --cluster-replicas 1`, {stdio: "ignore"});
    });

    after(function()
    {
        for(let node = 1; node <= 6; node++)
        {
            const port = 30000 + node;
            const file = `target/cluster-test/${port}`;
            child_process.execSync(`redis-cli -p ${port} shutdown nosave`);
            child_process.execSync(`rm -f ${port}.aof ${port}.conf ${port}.log ${port}.rdb || mkdir -p target/cluster-test`);
        }
    });

    describe("connect with server", function()
    {
        it("should connect", async function()
        {
            const opts =
            {
                host: "localhost",
                port: 30001,
                type: Buffer
            };
            const client = new RedisCluster(opts);
            await client.connect();
            await client.set("foo", "bar");
            const value = await client.get("foo");
            await client.quit();
            assert.deepStrictEqual(value, Buffer.from("bar"));
        });
    });

    describe("fail to connect with server due to ECONNREFUSED", function()
    {
        let connectNode;
        
        before(function()
        {
            connectNode = sinon.stub(Cluster.prototype, "connectNode");
            connectNode.withArgs(sinon.match.array.contains([30001])).callsFake(function(hostPort)
            {
                return connectNode.wrappedMethod.call(this, [hostPort[0], 12345, hostPort[2]]);
            });
            connectNode.callThrough();
        });

        after(function()
        {
            connectNode.restore();
        });
        
        it("should fail to connect", async function()
        {
            const opts =
            {
                host: "localhost",
                port: 30001,
                type: Buffer
            };
            const client = new RedisCluster(opts);
            await assert.rejects(client.connect(), /^Error: connect ECONNREFUSED 127.0.0.1:12345/);
        });
    });

    describe("fail to connect with server due to ENETUNREACH", function()
    {
        let connectNode;
        
        before(function()
        {
            connectNode = sinon.stub(Cluster.prototype, "connectNode");
            connectNode.withArgs(sinon.match.array.contains([30001])).callsFake(function(hostPort)
            {
                return connectNode.wrappedMethod.call(this, ["10.123.123.123", hostPort[1], hostPort[2]]);
            });
            connectNode.callThrough();
        });

        after(function()
        {
            connectNode.restore();
        });
        
        it("should fail to connect", async function()
        {
            const opts =
            {
                host: "localhost",
                port: 30001,
                type: Buffer
            };
            const client = new RedisCluster(opts);
            await assert.rejects(client.connect(), /^Error: connect ENETUNREACH 10.123.123.123:30001/);
        });
    });


    describe("fail to connect with server due to ETIMEDOUT", function()
    {
        let connectNode;
        
        before(function()
        {
            connectNode = sinon.stub(Cluster.prototype, "connectNode");
            connectNode.withArgs(sinon.match.array.contains([30001])).callsFake(function(hostPort)
            {
                return connectNode.wrappedMethod.call(this, ["127.123.123.123", hostPort[1], hostPort[2]]);
            });
            connectNode.callThrough();
        });

        after(function()
        {
            connectNode.restore();
        });
        
        it("should fail to connect", async function()
        {
            const opts =
            {
                host: "localhost",
                port: 30001,
                type: Buffer
            };
            const client = new RedisCluster(opts);
            await assert.rejects(client.connect(), /^Error: connect ETIMEDOUT 127.123.123.123:30001/);
        });
    });

    describe("connect run batch operations", function()
    {
        it("should run batch", async function()
        {
            const opts =
            {
                host: "localhost",
                port: 30001,
                type: Buffer
            };
            const client = new RedisCluster(opts);
            await client.connect();
            const batch = client.batch();
            const set = batch.set("foo", "bar");
            const get = batch.get("foo");
            await batch.exec();
            await client.quit();
            assert.deepStrictEqual(await set, "OK");
            assert.deepStrictEqual(await get, Buffer.from("bar"));
        });
    });

    describe("run variable key operations", function()
    {
        it("should follow redirect", async function()
        {
            const opts =
            {
                host: "localhost",
                port: 30001,
                type: String
            };
            const client = new RedisCluster(opts);
            await client.connect();
            await client.masters().flushdb();
            await client.xadd("log", "41153-7", "name", "Picard");
            const log = await client.xread("STREAMS", "log", 0);
            await client.quit();
            const expected =
            [
                [
                    "log",
                    [
                        [
                            "41153-7",
                            [
                                "name",
                                "Picard"
                            ]
                        ]
                    ]
                ]
            ];
            assert.deepStrictEqual(log, expected);
        });
    });

    describe("run command all masters", function()
    {
        it("should run command", async function()
        {
            const opts =
            {
                host: "localhost",
                port: 30001,
                type: String
            };
            const client = new RedisCluster(opts);
            await client.connect();
            const status = await client.masters().ping("A");
            await client.quit();
            assert.deepStrictEqual(status, ["A", "A", "A"]);
        });
    });
});