"use strict";

const assert = require("assert");
const child_process = require('child_process');
const redis = require("redis");

require('measurestuff')({port: 12345, verbose: true});

const ITERATIONS = 1000000;
const CHANNEL = Buffer.from("foo");
const MESSAGE = Buffer.from("bar");

let benchmark;
let n = 0;
let t0;
let client = redis.createClient({host: "localhost", port: 6379});
client.on("message", (channel, message) =>
{
    //assert.deepStrictEqual(channel, CHANNEL);
    //assert.deepStrictEqual(message, MESSAGE);
    if(n === 0)
    {
        t0 = process.hrtime();
    }
    if(++n === ITERATIONS)
    {
        let t1 = process.hrtime(t0);
        let dt = t1[0] * 1e3 + t1[1] / 1e6;
        console.log(Math.round(1000 * n / dt) + " ops/s");
    }
});
client.on("subscribe", (channel, count) =>
{
    assert.strictEqual(channel, "foo");
    assert.strictEqual(count, 1);
    benchmark = child_process.spawn('redis-benchmark',  ['-l', '-c', '1', '-n', ITERATIONS, '-P', '1000', 'PUBLISH', 'foo', 'bar']);
});
client.subscribe("foo");