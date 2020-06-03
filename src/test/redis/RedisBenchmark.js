"use strict";

const Redis = require("../../main/redis/Redis");

suite("Redis (TCP/IP)", async function()
{
    let client;

    before(async function()
    {
        client = await Redis.connect();
    });

    bench("ping (async)", async function()
    {
        await client.ping();
    });

    bench("ping (callback)", function(done)
    {
        client.ping(done);
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

    after(async function()
    {
        await client.quit();
    });
});