"use strict";

const HashTag = require("../../main/redis/HashTag");

suite("HashTag", function()
{
    const b1 = Buffer.from("test");
    const b2 = Buffer.from("{ab}test");

    bench("slotFor('test')", function()
    {
        HashTag.slotFor(b1);
    });

    bench("slotFor('{ab}test')", function()
    {
        HashTag.slotFor(b2);
    });
});