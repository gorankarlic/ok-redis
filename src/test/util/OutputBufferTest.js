"use strict";

const assert = require("assert");
const OutputBuffer = require("../../main/util/OutputBuffer");

describe("OutputBuffer", function()
{
    describe("constructor", function()
    {
        it("should create new buffer", function()
        {
            const o = new OutputBuffer(Buffer.alloc(0));
            assert.strictEqual(o.remaining(), 0);
        });
    });

    describe("alloc", function()
    {
        it("should allocate new buffer if size not suficient", function()
        {
            const o = new OutputBuffer(Buffer.from([23]));
            o.p(1);
            o.alloc(2);
            assert.deepStrictEqual(o.b, Buffer.from([23, 0, 0, 0]));
        });
        
        it("should not allocate new buffer if size sufficient", function()
        {
            const o = new OutputBuffer(Buffer.from([23]));
            o.alloc(1);
            assert.deepStrictEqual(o.b, Buffer.from([23]));
        });
    });

    describe("buffer", function()
    {
        it("should slice buffer from mark to position", function()
        {
            const o = new OutputBuffer(Buffer.from([23, 45, 67]));
            o.p(1);
            o.mark();
            o.p(1);
            assert.deepStrictEqual(o.buffer(), Buffer.from([45]));
        });
    });

    describe("hasRemaining", function()
    {
        it("should indicate remaining bytes", function()
        {
            const o = new OutputBuffer(Buffer.alloc(1));
            o.mark();
            o.p(1);
            assert.deepStrictEqual(o.hasRemaining(), true);
        });
    });
    
    describe("p", function()
    {
        it("should advance the buffer position", function()
        {
            const o = new OutputBuffer(Buffer.alloc(1));
            assert.deepStrictEqual(o.p(1), 0);
            assert.deepStrictEqual(o.p(1), 1);
        });
    });

    describe("realloc", function()
    {
        it("should reallocate buffer", function()
        {
            const o = new OutputBuffer(Buffer.from([123]));
            o.p(1);
            o.realloc(2);
            assert.deepStrictEqual(o.b, Buffer.from([123, 0, 0, 0]));
        });
    });
    
    describe("remaining", function()
    {
        it("should get the number of remaining bytes", function()
        {
            const o = new OutputBuffer(Buffer.alloc(1));
            o.mark();
            o.p(1);
            assert.deepStrictEqual(o.remaining(), 1);
        });
    });
    
    describe("mark", function()
    {
        it("should mark the buffer position", function()
        {
            const o = new OutputBuffer(Buffer.alloc(1));
            o.p(1);
            o.mark();
            assert.deepStrictEqual(o.m, 1);
        });
    });
    
    describe("reset", function()
    {
        it("should reset the buffer position and mark", function()
        {
            const o = new OutputBuffer(Buffer.alloc(1));
            o.p(1);
            o.mark();
            o.reset();
            assert.deepStrictEqual(o.n, 0);
            assert.deepStrictEqual(o.m, 0);
        });
    });
});