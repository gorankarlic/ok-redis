"use strict";

var matcha = require("matcha");
var Client = require("../../main/redis/Client");
var redis = require("redis");

suite('Array', function()
{
    var a = new Array(2);

    bench("warmup", function()
    {
    });
    
    bench("iterate with for-loop", function()
    {
        var l = a.length;
        for(var n = 0; n < l; n++)
        {
            a[n] = true;
        }
    });

    bench("iterate with for-loop", function()
    {
        for(var n = 0; n < a.length; n++)
        {
            a[n] = true;
        }
    });

    bench("iterate with for-in", function()
    {
        for(var n in a)
        {
            a[n] = true;
        }
    });
});