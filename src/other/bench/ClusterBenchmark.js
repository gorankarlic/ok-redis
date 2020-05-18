"use strict";

const assert = require("assert");
const RedisCluster = require("../../../main/redis/RedisCluster");

require('measurestuff')({port: 12345, verbose: true});

function run()
{
    const ITERATIONS = 10000;
    const KEY = Buffer.from("foo");
    const VALUE = Buffer.from("bar");

    let client = new RedisCluster(30001);
    client.connect();
    client.flushdb((err, result) =>
    {
        assert.strictEqual(err, null);
        assert.strictEqual(result, "OK");
        let ops = 0;
        let t0 = process.hrtime();
        setInterval(() =>
        {
            let t1 = process.hrtime(t0);
            let dt = t1[0] + t1[1] / 1e9;
            console.log(Math.round(ops / dt) + " ops/s");
            ops = 0;
            t0 = process.hrtime();
        }, 1000);
        let runs = 0;
        let doAgain = function()
        {
            for(let k = 0; k < ITERATIONS; k++)
            {
                client.set(KEY, VALUE, () =>
                {
                    if(++runs === ITERATIONS)
                    {
                        runs = 0;
                        process.nextTick(doAgain);
                    }
                    ops++;
                });
            }
        };
        doAgain();
    });
    setTimeout(() =>
    {
        process.exit(0);
    }, 30000);
}
run();