"use strict";

const assert = require("assert");
const RedisClient = require("../../main/redis/RedisClient");

describe("RedisClient", function()
{
    describe("constructor", function()
    {
        it("should connect and quit", function(done)
        {
            const client = new RedisClient(6379);
            client.connect((error) =>
            {
                assert.strictEqual(error, null);
                client.quit(done);
            });
        });
    });
    
    /*describe("batch", function()
    {
        it("should connect, do batch command and quit", function(done)
        {
            const client = new RedisClient(6379);
            client.connect(() =>
            {
                const batch = client.batch();
                batch.echo("test", () =>
                {
                    client.quit(done);
                });
            });
        });
    });*/
    
    /*beforeEach(function(done)
    {
        client = new RedisClient(6379);
        client.connect(done);
    });

    afterEach(function(done)
    {
        client.quit(done);
    });

    describe("constructor", function()
    {
        it("should connect", function(done)
        {
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
                        done();
                    });
                });
            });
        });
    });

    describe("MULTI", function()
    {
        it("should be able to use MULTI", function(done)
        {
            const multi = client.multi();
            multi.set("a", "b");
            multi.exec(done);
        });
    });

    describe("Pipeline", function()
    {
        it("should be able to use pipeline", function(done)
        {
            const batch = client.pipeline();
            batch.ping();
            batch.exec((err, result) =>
            {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, ['PONG']);
                done();
            });
        });
    });*/
});