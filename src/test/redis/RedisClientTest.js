"use strict";

const assert = require("assert");
const RedisClient = require("../../main/redis/RedisClient");

describe("RedisClient", function()
{
    describe("connect", function()
    {
        it("should connect and quit", function(done)
        {
            const opts =
            {
                port: 6379,
                returns: Buffer
            };
            const client = new RedisClient(opts);
            client.connect((err) =>
            {
                assert.strictEqual(err, null);
                client.quit(done);
            });
        });

        it("should not reconnect if no connected once", function(done)
        {
            const opts =
            {
                port: 6380,
                returns: Buffer
            };
            const client = new RedisClient(opts);
            client.connect((err) =>
            {
                assert.match(String(err), /^Error: connect ECONNREFUSED/);
                done();
            });
        });

        it("should reconnect if connected once", function(done)
        {
            const opts =
            {
                port: 6379,
                returns: Buffer
            };
            let ponged = false;
            const client = new RedisClient(opts);
            client.ping((err, result) =>
            {
                assert.strictEqual(err, null);
                assert.strictEqual(result, "PONG");
                ponged = true;
            });
            client.connect((err) =>
            {
                assert.strictEqual(err, null);
                client.client("ID", (err, result) =>
                {
                    assert.strictEqual(err, null);
                    assert.strictEqual(ponged, true);
                    client.client("KILL", "ID", result, "SKIPME", "NO", (err, result) =>
                    {
                        assert.strictEqual(err, null);
                        assert.strictEqual(result, 1);
                        const ping = () => client.ping((err, result) =>
                        {
                            assert.strictEqual(err, null);
                            assert.strictEqual(result, "PONG");
                            client.quit(done);
                        });
                        setTimeout(ping, 500);
                    });
                });
            });
        });
    });

    describe("option to return buffers or strings", function()
    {
        it("should return buffer", function(done)
        {
            const opts =
            {
                port: 6379,
                returns: Buffer
            };
            const client = new RedisClient(opts);
            client.connect((err) =>
            {
                assert.strictEqual(err, null);
                client.echo("test", (err, result) =>
                {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(result, Buffer.from("test"));
                    client.quit(done);
                });
            });
        });

        it("should return string", function(done)
        {
            const opts =
            {
                port: 6379,
                returns: String
            };
            const client = new RedisClient(opts);
            client.connect((err) =>
            {
                assert.strictEqual(err, null);
                client.echo("test", (err, result) =>
                {
                    assert.strictEqual(err, null);
                    assert.strictEqual(result, "test");
                    client.quit(done);
                });
            });
        });
    });

    describe("commands", function()
    {
        let client;

        beforeEach(function(done)
        {
            const opts =
            {
                port: 6379,
                returns: Buffer
            };
            client = new RedisClient(opts);
            client.connect(done);
        });

        afterEach(function(done)
        {
            client.quit(done);
        });

        it("should get and set", function(done)
        {
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

        it("should use MULTI", function(done)
        {
            const multi = client.multi();
            multi.set("a", "b");
            multi.exec(done);
        });

        it("should use batch", function(done)
        {
            const batch = client.batch();
            batch.echo("test", (err, result) =>
            {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, Buffer.from("test"));
            });
            batch.exec((err, result) =>
            {
                assert.strictEqual(err, null);
                assert.strictEqual(result, "PONG");
                done();
            });
        });

        it("should use pipeline", function(done)
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
    });
});