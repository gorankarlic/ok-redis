"use strict";

const assert = require("assert");
const HashTag = require("../../main/redis/HashTag");

describe("HashTag", function()
{
    describe("constructor", function()
    {
        it("should throw an error", function()
        {
            assert.throws(() => new HashTag(), Error);
        });
    });

    describe("slotForKey", function()
    {
        it("should compute slot for key buffer", function()
        { 
            assert.strictEqual(HashTag.slotFor(Buffer.from("foobar")), 12325);
            assert.strictEqual(HashTag.slotFor(Buffer.from("{foobar}")), 12325);
            assert.strictEqual(HashTag.slotFor(Buffer.from("{foobar}a")), 12325);
            assert.strictEqual(HashTag.slotFor(Buffer.from("a{foobar}")), 12325);
            assert.strictEqual(HashTag.slotFor(Buffer.from("{foobar")), 16235);
            assert.strictEqual(HashTag.slotFor("foobar"), 12325);
        });
    });
});