"use strict";

Buffer.poolSize = 256 * 1024 * 1024;

const matcha = require("matcha");
//const ioredis = require("ioredis");
const Redis = require("../../main/redis/Redis");
//const redis = require("redis");

const BATCH = 1000;
const MINTIME = 2000;
const CONCURRENCY = 4000;
const PAYLOAD_KEY = 1;
const PAYLOAD_VALUE = 1;
const STRING_KEY = new Array(PAYLOAD_KEY + 1).join('a');
const STRING_KEY_2 = `{${STRING_KEY}}`;
const STRING_VALUE = new Array(PAYLOAD_VALUE + 1).join('a');
const BUFFER_KEY = Buffer.alloc(PAYLOAD_KEY);
const BUFFER_VALUE = Buffer.alloc(PAYLOAD_VALUE);
const NODES =
[
    {host: "127.0.0.1", port: 30001},
    {host: "127.0.0.1", port: 30002},
    {host: "127.0.0.1", port: 30003},
    {host: "127.0.0.1", port: 30004},
    {host: "127.0.0.1", port: 30005},
    {host: "127.0.0.1", port: 30006}
];

suite('okredis cluster (TCP/IP)', function()
{
    set('mintime', MINTIME);
    set('concurrency', CONCURRENCY);

    var client = Redis.connectCluster({host: "127.0.0.1", port: 30001});

    before(function(done)
    {
        client.flushdb((err, result) =>
        {
            console.log(err, result);
            client.set(BUFFER_KEY, BUFFER_VALUE, (err, result) =>
            {
                console.log(err, result);
                client.ping((err, result) =>
                {
                    console.log(err, result);
                    done();
                });
            });
        });
    });

    after(function()
    {
        client.quit();
    });

    bench("ping", function(next)
    {
        client.ping(next);
    });

    bench("ping", function(next)
    {
        client.ping(next);
    });

    bench("set foo bar (buffer)", function(next)
    {
        client.set(BUFFER_KEY, BUFFER_VALUE, next);
    });

    let n = 0;
    bench("set foo bar (string)", function(next)
    {
        client.set(String(n++), STRING_VALUE, next);
    });

    bench("get foo (string)", function(next)
    {
        client.get(STRING_KEY, next);
    });

    bench("mget foo {foo} (string)", function(next)
    {
        client.mget(STRING_KEY, STRING_KEY_2, next);
    });

    bench("set foo bar (buffer, batch " + BATCH + ")", function(next)
    {
        var batch = client.batch();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(BUFFER_KEY, BUFFER_VALUE);
        }
        batch.exec(next);
    });

    bench("set foo bar (string, batch " + BATCH + ")", function(next)
    {
        var batch = client.batch();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(STRING_KEY, STRING_VALUE);
        }
        batch.exec(next);
    });
});

suite('okredis (TCP/IP)', function()
{
    set('mintime', MINTIME);
    set('concurrency', CONCURRENCY);

    var client = Redis.connect({host: "127.0.0.1", port: 6379});

    before(function(done)
    {
        client.flushdb(done);
    });

    after(function(done)
    {
        client.quit(done);
    });

    bench("ping (1)", function(next)
    {
        client.ping(next);
    });

    bench("ping (2)", function(next)
    {
        client.ping(next);
    });

    bench("set foo bar (buffer)", function(next)
    {
        client.set(BUFFER_KEY, BUFFER_VALUE, next);
    });

    bench("set bar foo (string)", function(next)
    {
        client.set(STRING_KEY, STRING_VALUE, next);
    });

    bench("get foo (string)", function(next)
    {
        client.get(STRING_KEY, next);
    });

    bench("mget foo {foo} (string)", function(next)
    {
        client.mget(STRING_KEY, STRING_KEY_2, next);
    });

    bench("set foo bar (buffer, batch " + BATCH + ")", function(next)
    {
        var batch = client.batch();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(BUFFER_KEY, BUFFER_VALUE);
        }
        batch.exec(next);
    });

    bench("set foo bar (string, batch " + BATCH + ")", function(next)
    {
        var batch = client.batch();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(STRING_KEY, STRING_VALUE);
        }
        batch.exec(next);
    });

    bench("ping (1)", function(next)
    {
        client.ping(next);
    });
});

suite('okredis (unix socket)', function()
{
    set('mintime', MINTIME);
    set('concurrency', CONCURRENCY);

    var client = Redis.connect("/tmp/redis.sock");

    before(function(done)
    {
        client.flushdb(done);
    });

    after(function(done)
    {
        client.quit(done);
    });

    bench("ping", function(next)
    {
        client.ping(next);
    });

    bench("set foo bar (buffer)", function(next)
    {
        client.set(BUFFER_KEY, BUFFER_VALUE, next);
    });

    bench("set foo bar (string)", function(next)
    {
        client.set(STRING_KEY, STRING_VALUE, next);
    });

    bench("get foo (string)", function(next)
    {
        client.get(STRING_KEY, next);
    });

    bench("mget foo {foo} (string)", function(next)
    {
        client.mget(STRING_KEY, STRING_KEY_2, next);
    });

    bench("set foo bar (buffer, batch " + BATCH + ")", function(next)
    {
        var batch = client.batch();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(BUFFER_KEY, BUFFER_VALUE);
        }
        batch.exec(next);
    });

    bench("set foo bar (string, batch " + BATCH + ")", function(next)
    {
        var batch = client.batch();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(STRING_KEY, STRING_VALUE);
        }
        batch.exec(next);
    });
});

/*suite('node_redis (unix socket)', function()
{
    set('mintime', MINTIME);
    set('concurrency', CONCURRENCY);

    var client = redis.createClient({path: "/tmp/redis.sock"});

    before(function(done)
    {
        client.flushdb(done);
    });

    after(function(done)
    {
        client.quit(done);
    });

    bench("ping", function(next)
    {
        client.ping(next);
    });

    bench("set foo bar (buffer)", function(next)
    {
        client.set(BUFFER_KEY, BUFFER_VALUE, next);
    });

    bench("set foo bar (string)", function(next)
    {
        client.set(STRING_KEY, STRING_VALUE, next);
    });

    bench("get foo (string)", function(next)
    {
        client.get(STRING_KEY, next);
    });

    bench("mget foo {foo} (string)", function(next)
    {
        client.mget(STRING_KEY, STRING_KEY_2, next);
    });

    bench("set foo bar (buffer, batch " + BATCH + ")", function(next)
    {
        var batch = client.batch();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(BUFFER_KEY, BUFFER_VALUE);
        }
        batch.exec(next);
    });

    bench("set foo bar (string, batch " + BATCH + ")", function(next)
    {
        var batch = client.batch();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(STRING_KEY, STRING_VALUE);
        }
        batch.exec(next);
    });
});

suite('node_redis (TCP/IP)', function()
{
    set('mintime', MINTIME);
    set('concurrency', CONCURRENCY);

    var client = redis.createClient({host: "localhost", port: 6379});

    before(function(done)
    {
        client.flushdb(done);
    });

    after(function()
    {
        client.quit();
    });

    bench("ping", function(next)
    {
        client.ping(next);
    });

    bench("set foo bar (buffer)", function(next)
    {
        client.set(BUFFER_KEY, BUFFER_VALUE, next);
    });

    bench("set foo bar (string)", function(next)
    {
        client.set(STRING_KEY, STRING_VALUE, next);
    });

    bench("get foo (string)", function(next)
    {
        client.get(STRING_KEY, next);
    });

    bench("mget foo {foo} (string)", function(next)
    {
        client.mget(STRING_KEY, STRING_KEY_2, next);
    });

    bench("set foo bar (buffer, batch " + BATCH + ")", function(next)
    {
        var batch = client.batch();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(BUFFER_KEY, BUFFER_VALUE);
        }
        batch.exec(next);
    });

    bench("set foo bar (string, batch " + BATCH + ")", function(next)
    {
        var batch = client.batch();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(STRING_KEY, STRING_VALUE);
        }
        batch.exec(next);
    });
});

suite('ioredis cluster (TCP/IP)', function()
{
    set('mintime', MINTIME);
    set('concurrency', CONCURRENCY);

    var client = new ioredis.Cluster(NODES, {redisOptions: {dropBufferSupport: false}});

    before(function(done)
    {
        client.flushdb((err, result) =>
        {
            console.log(err, result);
            client.set(STRING_KEY, BUFFER_VALUE, (err, result) =>
            {
                console.log(err, result);
                done();
            });
        });
    });

    after(function()
    {
        client.quit();
    });

    bench("ping", function(next)
    {
        client.ping(next);
    });

    bench("set foo bar (buffer)", function(next)
    {
        client.set(STRING_KEY, BUFFER_VALUE, next);
    });

    bench("set foo bar (string)", function(next)
    {
        client.set(STRING_KEY, STRING_VALUE, next);
    });

    bench("get foo (string)", function(next)
    {
        client.get(STRING_KEY, next);
    });

    bench("mget foo {foo} (string)", function(next)
    {
        client.mget(STRING_KEY, STRING_KEY_2, next);
    });

    bench("set foo bar (string, batch " + BATCH + ")", function(next)
    {
        var batch = client.pipeline();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(STRING_KEY, STRING_VALUE);
        }
        batch.exec(next);
    });
});

suite('ioredis (TCP/IP)', function()
{
    set('mintime', MINTIME);
    set('concurrency', CONCURRENCY);

    var client = new ioredis({dropBufferSupport: false});

    before(function(done)
    {
        client.flushdb(done);
    });

    after(function()
    {
        client.quit();
    });

    bench("ping", function(next)
    {
        client.ping(next);
    });

    bench("set foo bar (buffer)", function(next)
    {
        client.set(BUFFER_KEY, BUFFER_VALUE, next);
    });

    bench("set foo bar (string)", function(next)
    {
        client.set(STRING_KEY, STRING_VALUE, next);
    });

    bench("get foo (string)", function(next)
    {
        client.get(STRING_KEY, next);
    });

    bench("mget foo {foo} (string)", function(next)
    {
        client.mget(STRING_KEY, STRING_KEY_2, next);
    });

    bench("set foo bar (buffer, batch " + BATCH + ")", function(next)
    {
        var batch = client.pipeline();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(BUFFER_KEY, BUFFER_VALUE);
        }
        batch.exec(next);
    });

    bench("set foo bar (string, batch " + BATCH + ")", function(next)
    {
        var batch = client.pipeline();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(STRING_KEY, STRING_VALUE);
        }
        batch.exec(next);
    });
});

suite('ioredis (unix socket)', function()
{
    set('mintime', MINTIME);
    set('concurrency', CONCURRENCY);

    var client = new ioredis({dropBufferSupport: false, path: "/tmp/redis.sock"});

    before(function(done)
    {
        client.flushdb(done);
    });

    after(function()
    {
        client.quit();
    });

    bench("ping", function(next)
    {
        client.ping(next);
    });

    bench("set foo bar (buffer)", function(next)
    {
        client.set(BUFFER_KEY, BUFFER_VALUE, next);
    });

    bench("set foo bar (string)", function(next)
    {
        client.set(STRING_KEY, STRING_VALUE, next);
    });

    bench("get foo (string)", function(next)
    {
        client.get(STRING_KEY, next);
    });

    bench("mget foo {foo} (string)", function(next)
    {
        client.mget(STRING_KEY, STRING_KEY_2, next);
    });

    bench("set foo bar (buffer, batch " + BATCH + ")", function(next)
    {
        var batch = client.pipeline();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(BUFFER_KEY, BUFFER_VALUE);
        }
        batch.exec(next);
    });

    bench("set foo bar (string, batch " + BATCH + ")", function(next)
    {
        var batch = client.pipeline();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(STRING_KEY, STRING_VALUE);
        }
        batch.exec(next);
    });
});*/