"use strict";

Buffer.poolSize = 256 * 1024 * 1024;

const mocha = require("mocha");
const Redis = require("../../main/redis/Redis");

describe("okredis (TCP/IP)", function()
{
    const client = Redis.connect({host: "127.0.0.1", port: 6379});

    /*before(function(done)
    {
        client.ping(done);
    });

    after(function(done)
    {
        client.ping(done);
    });*/

    it("ping", function(done)
    {
        client.get("test", (err, result) =>
        {
            console.log(err, result);
            done();
        });
        //process.nextTick(done);
    });
});