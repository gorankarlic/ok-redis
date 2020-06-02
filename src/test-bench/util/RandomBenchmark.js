"use strict";

const Random = require("../../main/util/Random");

suite("Random", function()
{
    bench("range", function()
    {
        return Random.range(16384);
    });

    bench("Math.random", function()
    {
        return Math.floor(Math.random() * 16384);
    });
});