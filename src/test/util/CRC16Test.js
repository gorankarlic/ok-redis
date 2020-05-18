"use strict";

const assert = require("assert");
const CRC16 = require("../../main/util/CRC16");

describe("CRC16", function()
{
    describe("constructor", function()
    {
        it("should throw an error", function()
        {
            assert.throws(() => new CRC16(), Error);
        });
    });

    describe("hash", function()
    {
        it("should compute CRC16 hash", function()
        {
            assert.strictEqual(CRC16.hash(Buffer.from(""), 0, 0), 0x0000);
            assert.strictEqual(CRC16.hash(Buffer.from("a"), 0, 1), 0x7C87);
            assert.strictEqual(CRC16.hash(Buffer.from("b"), 0, 1), 0x4CE4);
            assert.strictEqual(CRC16.hash(Buffer.from("foobar"), 0, 6), 0xB025);
            assert.strictEqual(CRC16.hash(Buffer.from("123456789"), 0, 9), 0x31C3);
            assert.strictEqual(CRC16.hash(Buffer.from("Горан"), 0, 10), 50112);
        });
    });
});