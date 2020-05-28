"use strict";

const Random = require("../main/util/Random");

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

    bench("range", function()
    {
        return 1;
    });

    bench("function", function()
    {
    });

    bench("function", function()
    {
    });

    bench("function", function()
    {
    });
});