"use strict";

var assert = require("assert");
var redis = require("redis");

var ITERATIONS = 100;
var BATCH = 5000;
var RUNS = ITERATIONS * BATCH;

var client = redis.createClient({return_buffers: true});
client.flushdb(() =>
{
    var t0 = process.hrtime();
    var runs = 0;
    for(var k = 0; k < ITERATIONS; k++)
    {
        var batch = client.batch();
        for(var n = 0; n < BATCH; n++)
        {
            batch.set(Buffer.from(String(k * ITERATIONS + n)), Buffer.from(String(n)));
        }
        batch.exec((err) =>
        {
            if(err)
            {
                throw err;
            }
            if(runs === 0)
            {
                t0 = process.hrtime();
            }
            if(++runs === ITERATIONS)
            {
                var t1 = process.hrtime(t0);
                var dt = t1[0] * 1e3 + t1[1] / 1e6;
                console.log("node_redis (2)", Math.round(dt), "ms", runs, t1);
                client.quit();
            }
        });
    }
    var t1 = process.hrtime(t0);
    var dt = t1[0] * 1e3 + t1[1] / 1e6;
    console.log("node_redis (1)", Math.round(dt), "ms", runs, t1);
});