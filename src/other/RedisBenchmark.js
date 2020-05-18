"use strict";

Buffer.poolSize = 256 * 1024 * 1024;

const matcha = require("matcha");
const os = require("os");
const Redis = require("../../main/redis/Redis");

const MINTIME = 2000;
const CONCURRENCY = 1000;

suite("okredis (TCP/IP)", function()
{
    set("concurrency", CONCURRENCY);
    set("delay", 100);
    set("mintime", MINTIME);
    set("iterations", 1000);
    set("type", "adaptive");

    const client = Redis.connect({host: "127.0.0.1", port: 6379});

    before(function(done)
    {
        client.flushdb(done);
    });

    after(function(done)
    {
        client.flushdb(done);
    });

    bench("done", function(done)
    {
        process.nextTick(done);
    });

    bench("ping", function(done)
    {
        client.ping(done);
    });

    bench("ping", function(done)
    {
        client.ping(done);
    });

    bench("await", async function()
    {
        await void null;
    });

    bench("await", async function()
    {
        await void null;
    });

    bench("await", async function()
    {
        await void null;
    });

    bench("await ping", async function(done)
    {
        await client.ping();
        process.nextTick(done);
    });

    bench("await ping", async function(done)
    {
        await client.ping();
        process.nextTick(done);
    });

    bench("await ping", async function(done)
    {
        await client.ping();
        process.nextTick(done);
    });
});