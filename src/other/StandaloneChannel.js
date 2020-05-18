"use strict";

const assert = require("assert");
const child_process = require('child_process');
const RedisChannel = require("../../main/redis/RedisChannel");
const Format = require('../../main/util/Format');

require('measurestuff')({port: 12345, verbose: true});

const ITERATIONS = 10000000;
const CHANNEL = Buffer.from("foo");
const MESSAGE = Buffer.from("bar");

let benchmark;

let ops = 0;
let cpu0 = process.cpuUsage();
let t0 = process.hrtime();
setInterval(() =>
{
    let t1 = process.hrtime(t0);
    let cpu1 = process.cpuUsage(cpu0);
    let mem = process.memoryUsage();
    let dt = t1[0] + t1[1] / 1e9;
    let cpuusr = cpu1.user / 1e6;
    let cpusys = cpu1.system / 1e6;
    let cpups = cpuusr + cpusys;
    let opsps = Math.round(ops / dt);
    console.log(Format.SI(opsps, "ops/s"), Format.percent(cpups, dt), Format.percent(cpuusr, dt), Format.percent(cpusys, dt), Format.SI(mem.rss, "B"), Format.SI(mem.heapTotal, "B"), Format.SI(mem.heapUsed, "B"));
    ops = 0;
    cpu0 = process.cpuUsage();
    t0 = process.hrtime();
}, 1000);

let reply = () =>
{
    ops++;
};
let client = new RedisChannel(6379, reply);
client.connect();
client.subscribe("a", (err, result) =>
{
    assert.strictEqual(err, null);
    assert.deepStrictEqual(result, [Buffer.from("subscribe"), Buffer.from("a"), 1]);
    benchmark = child_process.spawn('redis-benchmark',  ['-c', '1', '-n', ITERATIONS, '-P', '1000', 'PUBLISH', 'a', 'b']);
});

setTimeout(() =>
{
    benchmark.kill();
    process.exit();
}, 60000);