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

    it("ping (callback)", async function()
    {
        return new Promise(async (resolve) =>
        {
            const client = await Redis.connect();
            client.ping(async (err, pong) =>
            {
                assert.strictEqual(err, null);
                assert.strictEqual(pong, "PONG");
                await client.quit();
                resolve();
            });
        });
    });

    it("echo as string (async)", async function()
    {
        const client = await Redis.connect();
        const echo = await client.strings().echo("Test");
        assert.strictEqual(echo, "Test");
        await client.quit();
    });
});