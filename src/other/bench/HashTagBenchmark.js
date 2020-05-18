"use strict";

var matcha = require("matcha");
var CRC16 = require("../../main/util/CRC16");
var HashTag = require("../../main/redis/HashTag");
var redis = require("redis");

suite("HashTag", function()
{
    var b1 = Buffer.from("test");
    var b2 = Buffer.from("{ab}test");

    bench("warmup", function()
    {
    });

    bench("slotForKey('test')", function()
    {
        var n = HashTag.slotForKey(b1);
        if(n === 0)
        {
            console.log(n);
        }
    });

    bench("slotForKey('{ab}test')", function()
    {
        var n = HashTag.slotForKey(b2);
        if(n === 0)
        {
            console.log(n);
        }
    });
});