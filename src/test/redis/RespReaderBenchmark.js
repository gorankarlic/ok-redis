"use strict";

const RespBuffer = require("../../main/redis/RespBuffer");
const {RespReader} = require("../../main/redis/RespReader");

suite("RespReader", function()
{
    const reader = new RespReader();
    const OK = new RespBuffer(Buffer.from("+OK\r\n"));
    const NUMBER = new RespBuffer(Buffer.from(":123\r\n"));
    const BULK = new RespBuffer(Buffer.from("$3\r\nfoo\r\n"));
    const MULTI = new RespBuffer(Buffer.from("*3\r\n$7\r\nmessage\r\n$3\r\nfoo\r\n$3\r\nbar\r\n"));

    bench("RespReader.read +OK", function()
    {
        reader.read(OK);
        OK.p = 0;
    });

    bench("RespReader.read :123", function()
    {
        reader.read(NUMBER);
        NUMBER.p = 0;
    });

    bench("RespReader.read $3", function()
    {
        reader.read(BULK);
        BULK.p = 0;
    });

    bench("RespReader.read *3", function()
    {
        reader.read(MULTI);
        MULTI.p = 0;
    });
});