"use strict";

const assert = require("assert");
const Redis = require("../../main/redis/Redis");

describe("Redis", async function()
{
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
        const echo = await client.echo("Test");
        assert.deepStrictEqual(echo, Buffer.from("Test"));
        await client.quit();
    });

    it("echo string (async)", async function()
    {
        const client = await Redis.connect();
        const echo = await client.string().echo("Test");
        assert.strictEqual(echo, "Test");
        await client.quit();
    });

    it("list string (async)", async function()
    {
        const client = await Redis.connect();
        await client.string().lpush("test", "b", "a");
        const list = await client.string().lrange("test", 0, 1);
        assert.deepStrictEqual(list, ["a", "b"]);
        await client.quit();
    });

    it("multi (callback)", function(done)
    {
        const client = Redis.connect(Redis.opts(), (err, result) =>
        {
            assert.strictEqual(err, null);
            const multi = client.multi();
            multi.del("a");
            multi.lpush("a", "b");
            multi.lrange("a", 0, 1);
            multi.exec((err, result) =>
            {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, [1, 1, [Buffer.from("b")]]);
                client.quit(done);
            });
        });
    });
});