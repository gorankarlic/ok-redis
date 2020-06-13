"use strict";

const assert = require("assert");
const child_process = require("child_process");
const RedisCluster = require("../../main/redis/RedisCluster");

describe("RedisCluster", function()
{
    this.timeout(10000);

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
                returns: Buffer
            };
            const client = new RedisCluster(opts);
            await client.connect();
            await client.flushdb();
            await client.set("foo", "bar");
            const value = await client.get("foo");
            await client.quit();
            assert.deepStrictEqual(value, Buffer.from("bar"));
        });
    });

    describe("connect run batch operations", function()
    {
        it("should connect", async function()
        {
            const opts =
            {
                host: "localhost",
                port: 30001,
                returns: Buffer
            };
            const client = new RedisCluster(opts);
            await client.connect();
            await client.flushdb();
            const batch = client.batch();
            const set = batch.set("foo", "bar");
            const get = batch.get("foo");
            await batch.exec();
            await client.quit();
            assert.deepStrictEqual(await set, "OK");
            assert.deepStrictEqual(await get, Buffer.from("bar"));
        });
    });
});