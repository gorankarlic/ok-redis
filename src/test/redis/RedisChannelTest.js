"use strict";

const assert = require("assert");
const child_process = require("child_process");
const RedisChannel = require("../../main/redis/RedisChannel");
const RedisClient = require("../../main/redis/RedisClient");

describe("RedisChannel", function()
{
    before(function()
    {
        child_process.execSync(`redis-server --port 6379 --appendonly no --daemonize yes`, {stdio: "ignore"});
    });

    after(function()
    {
        child_process.execSync(`redis-cli -p 6379 shutdown nosave`);
    });

    describe("connect with server", function()
    {
        it("should connect, subscribe and receive message", function(done)
        {
            const opts =
            {
                port: 6379,
                type: Buffer
            };
            const subscriber = new RedisChannel(opts);
            subscriber.dispatch((channel, message) =>
            {
                assert.deepStrictEqual(channel, Buffer.from("foo"));
                assert.deepStrictEqual(message, Buffer.from("bar"));
                subscriber.quit((err, result) =>
                {
                    assert.strictEqual(err, null);
                    assert.strictEqual(result, "OK");
                    done();
                });
            });
            subscriber.connect((err) =>  assert.strictEqual(err, null));
            subscriber.subscribe("foo", (err, result) =>
            {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, [Buffer.from("subscribe"), Buffer.from("foo"), 1]);

                const publisher = new RedisClient(opts);
                publisher.connect((err) =>
                {
                    assert.strictEqual(err, null);
                });
                publisher.publish("foo", "bar", (err, result) =>
                {
                    assert.strictEqual(err, null);
                    assert.strictEqual(result, 1);
                });
                publisher.quit((err, result) =>
                {
                    assert.strictEqual(err, null);
                    assert.strictEqual(result, "OK");
                });
            });
        });
    });
});