"use strict";

const assert = require("assert");
const child_process = require("child_process");
const Redis = require("../../main/redis/Redis");

describe("Redis", async function()
{
    before(function()
    {
        child_process.execSync(`redis-server --port 6379 --appendonly no --daemonize yes`, {stdio: "ignore"});
        child_process.execSync(`sleep 1`);
    });

    after(function()
    {
        child_process.execSync(`redis-cli -p 6379 shutdown nosave`);
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
        const client = Redis.connect(Redis.opts(), (err, result) =>
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
        const client = await Redis.connect().return(String);
        await client.lpush("test", "b", "a");
        const list = await client.lrange("test", 0, 1);
        assert.deepStrictEqual(list, ["a", "b"]);
        await client.quit();
    });

    it("multi (callback)", function(done)
    {
        const client = Redis.connect(Redis.opts(), (err, result) =>
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