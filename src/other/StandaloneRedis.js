"use strict";

const assert = require("assert");
const Client = require("../../main/redis/Client");
const Format = require('../../main/util/Format');
const Redis = require("../../main/redis/Redis");

require('measurestuff')({port: 12345, verbose: true});

const ITERATIONS = 12000;
const PAYLOAD = 1;
const KEY = Buffer.from("{00}A:");
const VALUE = Buffer.alloc(PAYLOAD).fill(0x62);

let ops = 0;
let cpu0 = process.cpuUsage();
let t0 = process.hrtime();
let l0;
let l1;
const report = function()
{
    const t1 = process.hrtime(t0);
    const cpu1 = process.cpuUsage(cpu0);
    const mem = process.memoryUsage();
    const dt = t1[0] + t1[1] / 1e9;
    const lt = l1[0] + l1[1] / 1e9;
    const cpuusr = cpu1.user / 1e6;
    const cpusys = cpu1.system / 1e6;
    const cpups = cpuusr + cpusys;
    const bps = Math.round(PAYLOAD * ops / dt);
    const opsps = Math.round(ops / dt);
    console.log(Format.SI(opsps, "ops/s"), Format.SI(bps, "B/s"), Format.SI(lt, "s lat."), Format.percent(cpups), Format.percent(cpuusr), Format.percent(cpusys), Format.SI(mem.rss, "B"), Format.SI(mem.heapTotal, "B"), Format.SI(mem.heapUsed, "B"));
    ops = 0;
    cpu0 = process.cpuUsage();
    t0 = process.hrtime();
};
const interval = setInterval(report, 1000);

//const client = Redis.connectCluster(30001);
const client = Redis.connect(6379);
client.ping((err, result) =>
{
    assert.strictEqual(err, null);
    assert.strictEqual(result, "PONG");
    let doAgain;
    let runs = 0;
    const reply = () =>
    {
        if(++runs === ITERATIONS)
        {
            l1 = process.hrtime(l0);
            runs = 0;
            doAgain();
        }
        ops++;
    };
    doAgain = function()
    {
        l0 = process.hrtime();
        for(var k = 0; k < ITERATIONS; k++)
        {
            client.ping(reply);
        }
    };
    doAgain();
});

setTimeout(() =>
{
    clearInterval(interval);
    process.exit();
}, 60000);
