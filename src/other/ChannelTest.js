"use strict";

const assert = require("assert");
const RedisChannel = require("../../main/redis/RedisChannel");
const RedisClient = require("../../main/redis/RedisClient");

describe("Channel", function()
{
    describe("connect with server", function()
    {
        it("should connect, subscribe and receive message", function(done)
        {
            const channel = new RedisChannel(6379);
            channel.dispatch("foo", (channel, message) =>
            {
                assert.deepStrictEqual(channel, Buffer.from("foo"));
                assert.deepStrictEqual(message, Buffer.from("bar"));
                done();
            });
            channel.subscribe("foo", (err, result) =>
            {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, [Buffer.from("subscribe"), Buffer.from("foo"), 1]);          
                const client = new RedisClient(6379);
                client.connect();
                client.publish("foo", "bar");
                client.quit();
            });
            channel.connect();
        });
    });
});