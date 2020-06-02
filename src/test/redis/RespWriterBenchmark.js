"use strict";

const RespWriter = require("../../main/redis/RespWriter");

suite("RespWriter", function()
{
    const w = new RespWriter();

    const KEY = Buffer.from("foo");
    const VALUE = Buffer.from("bar");
    const BUFFER_15 = Buffer.alloc(15);
    const BUFFER_16 = Buffer.alloc(16);
    const STRING_63 = "a".repeat(63);
    const STRING_64 = "b".repeat(64);

    bench("write ASCII (bytewise)", function()
    {
        w.n = 0;
        w.writeUTF7(STRING_63);
    });

    bench("write ASCII (copy)", function()
    {
        w.n = 0;
        w.writeUTF7(STRING_64);
    });

    bench("write buffer bytewise", function()
    {
        w.n = 0;
        w.writeBuffer(BUFFER_15, BUFFER_15.length);
    });

    bench("write buffer by copy", function()
    {
        w.n = 0;
        w.writeBuffer(BUFFER_16, BUFFER_16.length);
    });

    bench("write('PING')", function()
    {
        w.n = 0;
        w.write("PING", null);
    });

    bench("write('SET', ['foo', 'bar']) (string)", function()
    {
        w.n = 0;
        w.write("SET", ["foo", "bar"]);
    });

    bench("write('SET', ['foo', 'bar']) (buffer)", function()
    {
        w.n = 0;
        w.write("SET", [KEY, VALUE]);
    });
});