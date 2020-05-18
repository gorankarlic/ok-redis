"use strict";

var matcha = require("matcha");
var ReplWriter = require("../../main/redis/ReplWriter");

suite('ReplWriter', function()
{
    var KEY_1 = Buffer.from("foo");
    var VALUE_1 = Buffer.from("bar");
    var w = new ReplWriter();

    var BUFFER = Buffer.alloc(32);
    var STRING = new Array(64 + 1).join('a');

    bench("write ASCII bytewise", function()
    {
        w.n = 0;
        w.writeUTF7(STRING, STRING.length);
    });

    bench("write ASCII by copy", function()
    {
        w.n = 0;
        w.writeUTF72(STRING, STRING.length);
    });

    bench("write buffer bytewise", function()
    {
        w.n = 0;
        w.writeBuffer(BUFFER, BUFFER.length);
    });

    bench("write buffer by copy", function()
    {
        w.n = 0;
        w.writeBuffer2(BUFFER, BUFFER.length);
    });

    bench('ReplWriter.write("PING")', function()
    {
        ReplWriter.write("PING", null);
    });

    bench('ReplWriter.write(SET, ["foo", "bar"]) (string)', function()
    {
        ReplWriter.write("SET", ["foo", "bar"]);
    });

    bench('ReplWriter.write(SET, ["foo", "bar"]) (buffer)', function()
    {
        ReplWriter.write("SET", [KEY_1, VALUE_1]);
    });

    bench("SET foo bar (buffer)", function()
    {
        w.n = 0;
        w.write("SET", [KEY_1, VALUE_1]);
    });

    bench("SET foo bar (string)", function()
    {
        w.n = 0;
        w.write("SET", ["foo", "bar"]);
    });

    bench("SET foo bar (buffer)", function()
    {
        var w = new ReplWriter();
        w.write("SET", [KEY_1, VALUE_1]);
    });

    bench("SET foo bar (string)", function()
    {
        var w = new ReplWriter();
        w.write("SET", ["foo", "bar"]);
    });
});