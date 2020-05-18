"use strict";

const assert = require("assert");
const RespWriter = require("../../main/redis/RespWriter");

describe("RespWriter", function()
{
    describe("writer", function()
    {
        it("write command with string argument", function()
        {
            const s = RespWriter.write([0, "FLUSH"]);
            assert.deepStrictEqual(s, Buffer.from("*1\r\n$5\r\nFLUSH\r\n"));
        });

        it("write command with 2 string arguments", function()
        {
            const s = RespWriter.write([0, "GET", "foo"]);
            assert.deepStrictEqual(s, Buffer.from("*2\r\n$3\r\nGET\r\n$3\r\nfoo\r\n"));
        });

        it("write command with 3 string arguments", function()
        {
            const s = RespWriter.write([0, "SET", "foo", "bar"]);
            assert.deepStrictEqual(s, Buffer.from("*3\r\n$3\r\nSET\r\n$3\r\nfoo\r\n$3\r\nbar\r\n"));
        });

        it("write command with buffer arguments (valid UTF8)", function()
        {
            const s = RespWriter.write([0, "SET", Buffer.from("foo"), Buffer.from("bar")]);
            assert.strictEqual(s.length, 31);
            assert.deepStrictEqual(s, Buffer.from("2a330d0a24330d0a5345540d0a24330d0a666f6f0d0a24330d0a6261720d0a", "hex"));
        });

        it("write command with buffer arguments (semi-valid UTF8)", function()
        {
            const s = RespWriter.write([0, "SET", Buffer.alloc(3), Buffer.from("bar")]);
            assert.strictEqual(s.length, 31);
            assert.deepStrictEqual(s, Buffer.from("2a330d0a24330d0a5345540d0a24330d0a0000000d0a24330d0a6261720d0a", "hex"));
        });

        it("write command with buffer arguments (invalid UTF8)", function()
        {
            const s = RespWriter.write([0, "SET", Buffer.from("fefeffff", "hex"), Buffer.from("bar")]);
            assert.strictEqual(s.length, 32);
            assert.deepStrictEqual(s, Buffer.from("2a330d0a24330d0a5345540d0a24340d0afefeffff0d0a24330d0a6261720d0a", "hex"));
        });

        it("write command with slot", function()
        {
            const s = RespWriter.slotFromArgs([0, "GET", "foo"], 1);
            assert.strictEqual(s, 12182);
        });
    });
});
