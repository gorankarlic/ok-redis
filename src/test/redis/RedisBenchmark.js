"use strict";

const Redis = require("../../main/redis/Redis");

suite("Redis (TCP/IP)", async function()
{
    let client;

    before(async function()
    {
        client = await Redis.connect();
        await client.set("foo", "bar");
    });

    bench("get (async)", async function()
    {
        await client.get("foo");
    });

    bench("get (callback)", function(done)
    {
        client.get("foo", done);
    });

    bench("get (string, async)", async function()
    {
        await client.string().get("foo");
    });

    bench("get (string, callback)", function(done)
    {
        client.string().get("foo", done);
    });

    bench("ping (async)", async function()
    {
        await client.ping();
    });

    bench("ping (callback)", function(done)
    {
        client.ping(done);
    });

    bench("ping (1000 pipeline, async)", async function()
    {
        const pipeline = client.pipeline();
        for(let i = 0; i < 1000; i++)
        {
            pipeline.ping();
        }
        return await pipeline.exec();
    });

    bench("ping (1000 pipeline, callback)", function(done)
    {
        const pipeline = client.pipeline();
        for(let i = 0; i < 1000; i++)
        {
            pipeline.ping();
        }
        pipeline.exec(done);
    });

    bench("set (async)", async function()
    {
        await client.set("foo", "bar");
    });

    bench("set (callback)", function(done)
    {
        client.set("foo", "bar", done);
    });

    after(async function()
    {
        await client.quit();
    });
});