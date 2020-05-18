"use strict";

var assert = require("assert");
var matcha = require("matcha");
var ReplBuffer = require("../../main/redis/ReplBuffer");
var ReplReader = require("../../main/redis/ReplReader");

suite('ReplReader', function()
{
    var FOO = Buffer.from("foo");
    var OK = new ReplBuffer(Buffer.from("+OK\r\n"));
    var NUMBER = new ReplBuffer(Buffer.from(":123\r\n"));
    var BULK = new ReplBuffer(Buffer.from("$3\r\nfoo\r\n"));
    var MULTI = new ReplBuffer(Buffer.from("*3\r\n$7\r\nmessage\r\n$3\r\nfoo\r\n$3\r\nbar\r\n"));

    bench("ReplReader.read +OK", function()
    {
        assert.strictEqual(ReplReader.read(OK), "OK");
        OK.p = 0;
    });

    bench("ReplReader.read :123", function()
    {
        assert.strictEqual(ReplReader.read(NUMBER), 123);
        NUMBER.p = 0;
    });

    bench("ReplReader.read $3", function()
    {
        assert.deepStrictEqual(ReplReader.read(BULK), FOO);
        BULK.p = 0;
    });

    bench("ReplReader.read *3", function()
    {
        ReplReader.read(MULTI);
        MULTI.p = 0;
    });
});