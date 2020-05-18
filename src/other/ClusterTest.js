"use strict";

const assert = require("assert");
const RedisCluster = require("../../main/redis/RedisCluster");

describe("Cluster", function()
{
    describe("connect with server", function()
    {
        it("should connect", function(done)
        {
            const client = new RedisCluster(30001);
            client.connect();
            client.flushdb((err, result) =>
            {
                assert.strictEqual(err, null);
                assert.strictEqual(result, "OK");
                client.set("foo", "bar", (err, result) =>
                {
                    assert.strictEqual(err, null);
                    assert.strictEqual(result, "OK");
                    client.get("foo", (err, result) =>
                    {
                        assert.strictEqual(err, null);
                        assert.deepStrictEqual(result, Buffer.from("bar"));
                        client.quit(done);
                    });
                });
            });
        });
    });

    describe("Pipeline", function()
    {
        it("should be able to use pipeline", function(done)
        {
            const client = new RedisCluster(30001);
            const batch = client.batch();
            batch.zrangebyscore("map", 123, 345, "WITHSCORES");
            batch.exec((done));
            client.connect();
        });
    });
});