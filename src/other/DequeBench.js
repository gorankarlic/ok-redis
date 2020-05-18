"use strict";

const assert = require("assert");
const matcha = require("matcha");
const Deque = require("../../main/util/Deque");

suite("Deque", function()
{
    const d = new Deque();

    bench("addFirst", function()
    {
        d.addFirst(1);
    });

    bench("addFirst, removeFirst", function()
    {
        d.addFirst(1);
        d.removeFirst();
    });
});