"use strict";

const Redis = require("../main/redis/Redis");

suite("okredis (TCP/IP)", async function()
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

    bench("ping (1000 pipeline)", async function()
    {
        const pipeline = client.pipeline();
        for(let i = 0; i < 1000; i++)
        {
            pipeline.ping();
        }
        return new Promise((resolve) => pipeline.exec(resolve));
    });

    after(async function()
    {
        await client.quit();
    });
});