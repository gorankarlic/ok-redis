"use strict";

const ioredis = require("ioredis");
const noderedis = require("redis");
const tedis = require("tedis");
const rfs = require("redis-fast-driver");
const Redis = require("../../main/redis/Redis");

suite("redis-fast-driver (TCP/IP)", async function()
{
    const PING = ["PING"];
    const SET = ["SET", "foo", "bar"];
    let client;

    before(function(done)
    {
        client = new rfs();
        client.rawCall(PING, done);
    });

    bench("ping (callback)", function(done)
    {
        client.rawCall(PING, done);
    });

    bench("ping (callback)", function(done)
    {
        client.rawCall(PING, done);
    });

    bench("ping (async)", async function()
    {
        await client.rawCallAsync(PING);
    });

    bench("ping (async)", async function()
    {
        await client.rawCallAsync(PING);
    });

    bench("set (callback)", function(done)
    {
        client.rawCall(SET, done);
    });

    bench("set (callback)", function(done)
    {
        client.rawCall(SET, done);
    });

    bench("set (async)", async function()
    {
        await client.rawCallAsync(SET);
    });

    bench("set (async)", async function()
    {
        await client.rawCallAsync(SET);
    });

    after(function(done)
    {
        client.once("disconnect", done);
        client.end();
    });
});

suite("tedis (TCP/IP)", async function()
{
    let client;

    before(async function()
    {
        client = new tedis.Tedis();
        await client.command("PING");
    });

    bench("ping (async)", async function()
    {
        await client.command("PING");
    });

    bench("ping (async)", async function()
    {
        await client.command("PING");
    });

    bench("set (async)", async function()
    {
        await client.command("SET", "foo", "bar");
    });

    bench("set (async)", async function()
    {
        await client.command("SET", "foo", "bar");
    });

    after(async function()
    {
       await client.command("QUIT");
    });
});

suite("ioredis (TCP/IP)", async function()
{
    let client;

    before(function(done)
    {
        client = new ioredis();
        client.ping(done);
    });

    bench("ping (callback)", function(done)
    {
        client.ping(done);
    });

    bench("ping (callback)", function(done)
    {
        client.ping(done);
    });

    bench("set (callback)", function(done)
    {
        client.set("foo", "bar", done);
    });

    after(function(done)
    {
        client.quit(done);
    });
});

suite("noderedis (TCP/IP)", async function()
{
    let client;

    before(function(done)
    {
        client = noderedis.createClient();
        client.on("ready", done);
    });

    bench("ping (callback)", function(done)
    {
        client.ping(done);
    });

    bench("ping (callback)", function(done)
    {
        client.ping(done);
    });

    bench("set (callback)", function(done)
    {
        client.set("foo", "bar", done);
    });

    after(function(done)
    {
        client.quit(done);
    });
});

suite("OK-Redis (TCP/IP)", async function()
{
    let client;

    before(async function()
    {
        client = await Redis.connect();
    });

    bench("ping (callback)", function(done)
    {
        client.ping(done);
    });

    bench("ping (callback)", function(done)
    {
        client.ping(done);
    });

    bench("ping (async)", async function()
    {
        await client.ping();
    });

    bench("ping (async)", async function()
    {
        await client.ping();
    });

    bench("set (callback)", function(done)
    {
        client.set("foo", "bar", done);
    });

    bench("set (callback)", function(done)
    {
        client.set("foo", "bar", done);
    });

    bench("set (async)", async function()
    {
        await client.set("foo", "bar");
    });

    bench("set (async)", async function()
    {
        await client.set("foo", "bar");
    });

    after(async function()
    {
        await client.quit();
    });
});