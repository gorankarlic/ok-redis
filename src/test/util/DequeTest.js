"use strict";

const assert = require("assert");
const Deque = require("../../main/util/Deque");

describe("Deque", function()
{
    describe("addFirst", function()
    {
        it("should add head, remove head", function()
        {
            const d = new Deque();
            d.addFirst(1);
            d.addFirst(2);
            d.addFirst(3);
            assert.strictEqual(d.removeFirst(), 3);
            assert.strictEqual(d.removeFirst(), 2);
            assert.strictEqual(d.removeFirst(), 1);
            assert.strictEqual(d.isEmpty(), true);
        });
        
        it("should add head, remove tail", function()
        {
            const d = new Deque();
            d.addFirst(1);
            d.addFirst(2);
            d.addFirst(3);
            assert.strictEqual(d.removeLast(), 1);
            assert.strictEqual(d.removeLast(), 2);
            assert.strictEqual(d.removeLast(), 3);
            assert.strictEqual(d.isEmpty(), true);
        });
    });
    
    describe("addLast", function()
    {
        it("should add tail, remove tail", function()
        {
            const d = new Deque();
            d.addLast(1);
            d.addLast(2);
            d.addLast(3);
            assert.strictEqual(d.removeLast(), 3);
            assert.strictEqual(d.removeLast(), 2);
            assert.strictEqual(d.removeLast(), 1);
            assert.strictEqual(d.isEmpty(), true);
        });
        
        it("should add tail, remove head", function()
        {
            const d = new Deque();
            d.addLast(1);
            d.addLast(2);
            d.addLast(3);
            assert.strictEqual(d.removeFirst(), 1);
            assert.strictEqual(d.removeFirst(), 2);
            assert.strictEqual(d.removeFirst(), 3);
            assert.strictEqual(d.isEmpty(), true);
        });
        
        it("should add head and tail, remove head and tail", function()
        {
            const d = new Deque();
            d.addFirst(1);
            d.addLast(2);
            d.addFirst(3);
            d.addLast(4);
            d.addLast(5);
            d.addFirst(6);
            d.addFirst(7);
            assert.strictEqual(d.removeFirst(), 7);
            assert.strictEqual(d.removeFirst(), 6);
            assert.strictEqual(d.removeLast(), 5);
            assert.strictEqual(d.removeLast(), 4);
            assert.strictEqual(d.removeFirst(), 3);
            assert.strictEqual(d.removeLast(), 2);
            assert.strictEqual(d.isSingleton(), true);
            assert.strictEqual(d.removeFirst(), 1);
            assert.strictEqual(d.isEmpty(), true);
        });
    });
    
    describe("appendAll", function()
    {
        it("should append empty and singleton", function()
        {
            const a = new Deque();
            const b = new Deque();
            b.addLast(1);
            a.appendAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.isEmpty(), true);
        });
        
        it("should append singleton and empty", function()
        {
            const a = new Deque();
            a.addLast(1);
            const b = new Deque();
            a.appendAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.isEmpty(), true);
        });

        it("should append singleton and singleton", function()
        {
            const a = new Deque();
            a.addLast(1);
            const b = new Deque();
            b.addLast(2);
            a.appendAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.peekFirst(), 1);
            assert.strictEqual(a.peekLast(), 2);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.removeFirst(), 2);
            assert.strictEqual(a.isEmpty(), true);
        });

        it("should append singleton and multiton", function()
        {
            const a = new Deque();
            a.addLast(1);
            const b = new Deque();
            b.addLast(2);
            b.addLast(3);
            a.appendAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.peekFirst(), 1);
            assert.strictEqual(a.peekLast(), 3);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.removeFirst(), 2);
            assert.strictEqual(a.removeFirst(), 3);
            assert.strictEqual(a.isEmpty(), true);
        });

        it("should append multiton and singleton", function()
        {
            const a = new Deque();
            a.addLast(1);
            a.addLast(2);
            const b = new Deque();
            b.addLast(3);
            a.appendAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.peekFirst(), 1);
            assert.strictEqual(a.peekLast(), 3);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.removeFirst(), 2);
            assert.strictEqual(a.removeFirst(), 3);
            assert.strictEqual(a.isEmpty(), true);
        });

        it("should append multiton to multiton", function()
        {
            const a = new Deque();
            a.addLast(1);
            a.addLast(2);
            a.addLast(3);
            const b = new Deque();
            b.addLast(4);
            b.addLast(5);
            b.addLast(6);
            a.appendAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.peekFirst(), 1);
            assert.strictEqual(a.peekLast(), 6);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.removeFirst(), 2);
            assert.strictEqual(a.removeFirst(), 3);
            assert.strictEqual(a.removeFirst(), 4);
            assert.strictEqual(a.removeFirst(), 5);
            assert.strictEqual(a.removeFirst(), 6);
            assert.strictEqual(a.isEmpty(), true);
        });
    });
    
    describe("peekFirst", function()
    {
        it("should fail if empty", function()
        {
            const a = new Deque();
            assert.throws(() => a.peekFirst(), Error);
        });
    });
    
    describe("peekLast", function()
    {
        it("should fail if empty", function()
        {
            const a = new Deque();
            assert.throws(() => a.peekLast(), Error);
        });
    });

    describe("prependAll", function()
    {
        it("should prepend empty and singleton", function()
        {
            const a = new Deque();
            const b = new Deque();
            b.addFirst(1);
            a.prependAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.isEmpty(), true);
        });
        
        it("should prepend singleton and empty", function()
        {
            const a = new Deque();
            a.addFirst(1);
            const b = new Deque();
            a.prependAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.isEmpty(), true);
        });

        it("should prepend singleton and singleton", function()
        {
            const a = new Deque();
            a.addFirst(1);
            const b = new Deque();
            b.addFirst(2);
            a.prependAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.peekFirst(), 2);
            assert.strictEqual(a.peekLast(), 1);
            assert.strictEqual(a.removeFirst(), 2);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.isEmpty(), true);
        });

        it("should prepend singleton and multiton", function()
        {
            const a = new Deque();
            a.addFirst(1);
            const b = new Deque();
            b.addFirst(2);
            b.addFirst(3);
            a.prependAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.peekFirst(), 3);
            assert.strictEqual(a.peekLast(), 1);
            assert.strictEqual(a.removeFirst(), 3);
            assert.strictEqual(a.removeFirst(), 2);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.isEmpty(), true);
        });

        it("should prepend multiton and singleton", function()
        {
            const a = new Deque();
            a.addFirst(1);
            a.addFirst(2);
            const b = new Deque();
            b.addFirst(3);
            a.prependAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.peekFirst(), 3);
            assert.strictEqual(a.peekLast(), 1);
            assert.strictEqual(a.removeFirst(), 3);
            assert.strictEqual(a.removeFirst(), 2);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.isEmpty(), true);
        });

        it("should prepend multiton to multiton", function()
        {
            const a = new Deque();
            a.addFirst(1);
            a.addFirst(2);
            a.addFirst(3);
            const b = new Deque();
            b.addFirst(4);
            b.addFirst(5);
            b.addFirst(6);
            a.prependAll(b);
            assert.strictEqual(b.isEmpty(), true);
            assert.strictEqual(a.peekFirst(), 6);
            assert.strictEqual(a.peekLast(), 1);
            assert.strictEqual(a.removeFirst(), 6);
            assert.strictEqual(a.removeFirst(), 5);
            assert.strictEqual(a.removeFirst(), 4);
            assert.strictEqual(a.removeFirst(), 3);
            assert.strictEqual(a.removeFirst(), 2);
            assert.strictEqual(a.removeFirst(), 1);
            assert.strictEqual(a.isEmpty(), true);
        });
    });

    describe("removeAll", function()
    {
        it("should remove all elements", function()
        {
            const d = new Deque();
            d.addLast(1);
            d.addLast(2);
            d.addLast(3);
            d.removeAll();
            assert.strictEqual(d.isEmpty(), true);
        });
    });

    describe("removeFirst", function()
    {
        it("should fail if empty", function()
        {
            const a = new Deque();
            assert.throws(() => a.removeFirst(), Error);
        });
    });
    
    describe("removeLast", function()
    {
        it("should fail if empty", function()
        {
            const a = new Deque();
            assert.throws(() => a.removeLast(), Error);
        });
    });
});