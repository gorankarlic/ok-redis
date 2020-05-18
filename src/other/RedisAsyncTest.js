"use strict";

const assert = require("assert");
const RedisClient = require("../../main/redis/RedisClient");

describe("RedisAsync", function()
{
    let client;

    beforeEach(function(done)
    {
        client = new RedisClient(6379);
        client.connect(done);
    });

    afterEach(function(done)
    {
        client.quit(done);
    });

    describe("connect with server", function()
    {
        it("should connect", async function()
        {
            let result = await client.async_flushdb();
            assert.strictEqual(result, "OK");
            result = await client.async_set("foo", "bar");
            assert.strictEqual(result, "OK");
            result = await client.async_get("foo");
            assert.deepStrictEqual(result, Buffer.from("bar"));
        });
    });
});