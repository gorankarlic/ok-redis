"use strict";

const assert = require("assert");
const crypto = require("crypto");
const child_process = require("child_process");
const Redis = require("../../main/redis/Redis");

describe("Redis", async function()
{
    this.timeout(10000);

    before(function()
    {
        child_process.execSync(`redis-server --port 6379 --appendonly no --daemonize yes`, {stdio: "ignore"});
        child_process.execSync(`sleep 1`);
    });

    after(function()
    {
        child_process.execSync(`redis-cli -p 6379 shutdown nosave`);
    });

    it("write very large random size buffers", async function()
    {
        const client1 = await Redis.connect();
        const client2 = await Redis.connect();
        const p = [];
        for(let n = 0; n < 1024; n++)
        {
            const key = crypto.randomBytes(32);
            const client = Math.random() > 0.5 ? client1 : client2;
            p.push(client.set(key, crypto.randomBytes(Math.round(Math.random() * 8192))));
            if(Math.random() > 0.5)
            {
                await new Promise((r) => setTimeout(r, 10));
                await Promise.all(p);
                p.length = 0;
            }
        }
        await Promise.all(p);
        await client1.quit();
        await client2.quit();
    });

    it("ping (async)", async function()
    {
        const client = await Redis.connect();
        const pong = await client.ping();
        assert.strictEqual(pong, "PONG");
        await client.quit();
    });

    it("ping (callback)", function(done)
    {
        Redis.connect(Redis.opts(), (err, client) =>
        {
            assert.strictEqual(err, null);
            client.ping(async (err, pong) =>
            {
                assert.strictEqual(err, null);
                assert.strictEqual(pong, "PONG");
                client.quit(done);
            });
        });
    });

    it("echo buffer (async)", async function()
    {
        const client = await Redis.connect();
        const echo = await client.return(Buffer).echo("Test");
        assert.deepStrictEqual(echo, Buffer.from("Test"));
        await client.quit();
    });

    it("echo string (async)", async function()
    {
        const client = await Redis.connect();
        const echo = await client.return(String).echo("Test");
        assert.strictEqual(echo, "Test");
        await client.quit();
    });

    it("list string (async)", async function()
    {
        const opts = Redis.opts().return(String);
        const client = await Redis.connect(opts);
        await client.lpush("test", "b", "a");
        const list = await client.lrange("test", 0, 1);
        assert.deepStrictEqual(list, ["a", "b"]);
        await client.quit();
    });

    it("multi (callback)", function(done)
    {
        Redis.connect(Redis.opts(), (err, client) =>
        {
            assert.strictEqual(err, null);
            const multi = client.multi();
            multi.flushdb();
            multi.lpush("a", "b");
            multi.lrange("a", 0, 1);
            multi.exec((err, result) =>
            {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, ["OK", 1, [Buffer.from("b")]]);
                client.quit(done);
            });
        });
    });

    it("should throw error with tracable stack (async)", async function()
    {
        const client = await Redis.connect();
        await client.set("a", "b");
        try
        {
            await client.lrange("a", 0, 1);
            assert.fail();
        }
        catch(e)
        {
            assert.match(e.stack, /^RedisError: WRONGTYPE/);
            assert.match(e.stack, /RedisTest\.js/);
        }
        finally
        {
            await client.quit();
        }
    });
});