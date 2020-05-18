"use strict";

var matcha = require("matcha");
var Client = require("../../main/redis/Client");
var redis = require("redis");

suite('buffer', function()
{
    var buffer = Buffer.alloc(16);
    var string = "END_123";

    bench("warmup", function(next)
    {
        process.nextTick(next);
    });

    bench("buffer.fill(11)", function()
    {
        buffer.fill(11);
    });

    bench("END_123.substring(3)", function()
    {
        return "END_123".substring(3);
    });

    bench("buffer.toString('ascii')", function()
    {
        return buffer.slice(1, 3).toString("ascii");;
    });

    bench("END_123.startsWith('END')", function()
    {
        return "END_123".startsWith('END');
    });

    bench("END_123.indexOf('_')", function()
    {
        return "END_123".indexOf('_');
    });

    bench("string.charCodeAt(i) === literal", function()
    {
        return string.charCodeAt(0) === 0x45 && string.charCodeAt(1) === 0x4E && string.charCodeAt(2) === 0x42;
    });

    bench("string[i] === literal", function()
    {
        return string[0] === 'E' && string[1] === 'N' && string[2] === 'D';
    });

    bench("buffer[i] === literal", function()
    {
        return buffer[0] === 11 && buffer[1] === 11 && buffer[2] === 11;
    });

    bench("buffer instanceof Buffer", function()
    {
        buffer instanceof Buffer;
    });

    bench("'string'.isAscii", function()
    {
        /^[\x00-\x7F]*$/.test("string")
    });

    bench("buffer.from('string')", function()
    {
        Buffer.from("string");
    });

    bench("Buffer.byteLength('string')", function()
    {
        Buffer.byteLength("string");
    });

    bench("buffer.readUInt8", function()
    {
        var s = 0;
        for(var n = 0; n < buffer.length; n++)
        {
            s += buffer.readUInt8(0);
        }
    });

    bench("buffer[index]", function()
    {
        var s = 0;
        for(var n = 0; n < buffer.length; n++)
        {
            s += buffer[n];
        }
    });

    bench("buffer.copy", function()
    {
        var b = Buffer.alloc(8);
        buffer.copy(b, 0, 0, 8);
    });

    bench("buffer.slice", function()
    {
        buffer.slice(0, 8);
    });

    bench("buffer.writeString(char, 'ascii')", function()
    {
        buffer.write("*", 0, 1, "ascii");
    });

    bench("buffer[index] = char", function()
    {
        buffer[0] = 0x2A;
    });

    bench("buffer.write(string, 'ascii')", function()
    {
        buffer.write("*TEST", 0, 5, "ascii");
    });

    bench("buffer.writeString('string', 'utf8')", function()
    {
        buffer.write("string", 0, 1, "utf8");
    });

    bench("buffer[index] = string[index]", function()
    {
        var s = "*TEST";
        for(var i = 0; i < s.length; i++)
        {
            buffer[i] = s.charCodeAt(i);
        }
        if(buffer[0] !== 0x2A)
        {
            console.log(buffer);
        }
    });
});