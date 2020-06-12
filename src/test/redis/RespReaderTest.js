"use strict";

const assert = require("assert");
const RedisAskError = require("../../main/redis/RedisAskError");
const RedisError = require("../../main/redis/RedisError");
const RedisLoadingError = require("../../main/redis/RedisLoadingError");
const RedisMovedError = require("../../main/redis/RedisMovedError");
const RedisTryAgainError = require("../../main/redis/RedisTryAgainError");
const RespBuffer = require("../../main/redis/RespBuffer");
const {RespReader} = require("../../main/redis/RespReader");

describe("RespReader", function()
{
    let reader;

    beforeEach(function()
    {
        reader = new RespReader();
    });

    const test = function(command, expected)
    {
        const b = new RespBuffer(Buffer.from(command));
        const r = new RespReader();
        const needs = r.read(b);
        const result = r.result();
        assert.strictEqual(b.p, b.b.length);
        assert.strictEqual(needs, false);
        if(expected instanceof Error)
        {
            assert.deepStrictEqual(result, expected);
        }
        else
        {
            assert.deepStrictEqual(result, expected);
        }
    };

    const testFragmented = function(command, needed, expected)
    {
        const b = new RespBuffer(Buffer.from(command));
        const needs = reader.read(b);
        const result = reader.result();
        assert.strictEqual(b.p, b.b.length);
        assert.strictEqual(needs, needed > 0);
        if(expected instanceof Error)
        {
            assert.deepStrictEqual(result.message, expected.message);
        }
        else
        {
            assert.deepStrictEqual(result, expected);
        }
    };

    describe("RespReader", function()
    {
        it("read invalid type", function()
        {
            assert.throws(() => test("="), /^Error: invalid RESP type$/);
        });
        
        it("read queued", function()
        {
            testFragmented("+", 2, void null);
            testFragmented("A", 2, void null);
            testFragmented("\r\n", 0, "A");
        });
    });

    describe("Multi", function()
    {
        it("read empty", function()
        {
            test("*0\r\n", []);
        });

        it("read null array", function()
        {
            test("*-1\r\n", null);
        });

        it("read reply 1", function()
        {
            test("*1\r\n+A\r\n", ["A"]);
        });

        it("read reply 2", function()
        {
            test("*2\r\n+A\r\n+B\r\n", ["A", "B"]);
        });

        it("read reply 3", function()
        {
            test("*3\r\n+A\r\n+B\r\n+C\r\n", ["A", "B", "C"]);
        });

        it("read nested", function()
        {
            test("*2\r\n*1\r\n+A\r\n*2\r\n*1\r\n+B\r\n*1\r\n+C\r\n", [["A"], [["B"], ["C"]]]);
        });

        it("read fragmented before numeral", function()
        {
            testFragmented("*", 3, void null);
            testFragmented("2\r\n+A\r\n+B\r\n", 0, ["A", "B"]);
        });

        it("read fragmented inside numeral", function()
        {
            testFragmented("*1", 5, void null);
            testFragmented("2\r\n+A\r\n+B\r\n+C\r\n+D\r\n+E\r\n+F\r\n+G\r\n+H\r\n+I\r\n+J\r\n+K\r\n+L\r\n", 0, ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]);
        });

        it("read fragmented before first CRLF", function()
        {
            testFragmented("*2", 8, void null);
            testFragmented("\r\n+A\r\n+B\r\n", 0, ["A", "B"]);
        });

        it("read fragmented inside first CRLF", function()
        {
            testFragmented("*2\r", 7, void null);
            testFragmented("\n+A\r\n+B\r\n", 0, ["A", "B"]);
        });

        it("read fragmented after first CRLF", function()
        {
            testFragmented("*2\r\n", 6, void null);
            testFragmented("+A\r\n+B\r\n", 0, ["A", "B"]);
        });

        it("read fragmented inside first element", function()
        {
            testFragmented("*2\r\n+", 5, void null);
            testFragmented("A\r\n+B\r\n", 0, ["A", "B"]);
        });

        it("read fragmented before first element CRLF", function()
        {
            testFragmented("*2\r\n+A", 5, void null);
            testFragmented("\r\n+B\r\n", 0, ["A", "B"]);
        });

        it("read fragmented inside first element CRLF", function()
        {
            testFragmented("*2\r\n+A\r", 4, void null);
            testFragmented("\n+B\r\n", 0, ["A", "B"]);
        });

        it("read fragmented, after first element CRLF", function()
        {
            testFragmented("*2\r\n+A\r\n", 3, void null);
            testFragmented("+B\r\n", 0, ["A", "B"]);
        });

        it("read fragmented inside second element", function()
        {
            testFragmented("*2\r\n+A\r\n+", 2, void null);
            testFragmented("B\r\n", 0, ["A", "B"]);
        });

        it("read fragmented before second element CRLF", function()
        {
            testFragmented("*2\r\n+A\r\n+B", 2, void null);
            testFragmented("\r\n", 0, ["A", "B"]);
        });

        it("read fragmented inside second element CRLF", function()
        {
            testFragmented("*2\r\n+A\r\n+B\r", 1, void null);
            testFragmented("\n", 0, ["A", "B"]);
        });
    });

    describe("Bulk", function()
    {
        it("read null", function()
        {
            test("$-1\r\n", null);
        });

        it("read empty", function()
        {
            test("$0\r\n\r\n", Buffer.from(""));
        });

        it("read reply 1", function()
        {
            test("$1\r\nA\r\n", Buffer.from("A"));
        });

        it("read reply 2", function()
        {
            test("$2\r\nAB\r\n", Buffer.from("AB"));
        });

        it("read reply 3", function()
        {
            test("$3\r\nABC\r\n", Buffer.from("ABC"));
        });

        it("read reply 12", function()
        {
            test("$12\r\nABCDEFGHIJKL\r\n", Buffer.from("ABCDEFGHIJKL"));
        });

        it("read fragmented null before minus", function()
        {
            testFragmented("$", 4, void null);
            testFragmented("-1\r\n", 0, null);
        });

        it("read fragmented null after minus", function()
        {
            testFragmented("$-", 3, void null);
            testFragmented("1\r\n", 0, null);
        });

        it("read fragmented null before CRLF", function()
        {
            testFragmented("$-1", 2, void null);
            testFragmented("\r\n", 0, null);
        });

        it("read fragmented null inside CRLF", function()
        {
            testFragmented("$-1\r", 1, void null);
            testFragmented("\n", 0, null);
        });

        it("read fragmented before numeral", function()
        {
            testFragmented("$", 4, void null);
            testFragmented("12\r\nABCDEFGHIJKL\r\n", 0, Buffer.from("ABCDEFGHIJKL"));
        });

        it("read fragmented inside numeral", function()
        {
            testFragmented("$1", 5, void null);
            testFragmented("2\r\nABCDEFGHIJKL\r\n", 0, Buffer.from("ABCDEFGHIJKL"));
        });

        it("read fragmented before first CRLF", function()
        {
            testFragmented("$12", 16, void null);
            testFragmented("\r\nABCDEFGHIJKL\r\n", 0, Buffer.from("ABCDEFGHIJKL"));
        });

        it("read fragmented inside first CRLF", function()
        {
            testFragmented("$12\r", 15, void null);
            testFragmented("\nABCDEFGHIJKL\r\n", 0, Buffer.from("ABCDEFGHIJKL"));
        });

        it("read fragmented after first CRLF", function()
        {
            testFragmented("$12\r\n", 14, void null);
            testFragmented("ABCDEFGHIJKL\r\n", 0, Buffer.from("ABCDEFGHIJKL"));
        });

        it("read fragmented inside data", function()
        {
            testFragmented("$12\r\nA", 13, void null);
            testFragmented("BCDEFGHIJKL\r\n", 0, Buffer.from("ABCDEFGHIJKL"));
        });

        it("read fragmented before second CRLF", function()
        {
            testFragmented("$12\r\nABCDEFGHIJKL", 2, void null);
            testFragmented("\r\n", 0, Buffer.from("ABCDEFGHIJKL"));
        });

        it("read fragmented before second CRLF", function()
        {
            testFragmented("$12\r\nABCDEFGHIJKL\r\n", 0, Buffer.from("ABCDEFGHIJKL"));
        });

        it("read fragmented inside second CRLF", function()
        {
            testFragmented("$12\r\nABCDEFGHIJKL\r", 1, void null);
            testFragmented("\n", 0, Buffer.from("ABCDEFGHIJKL"));
        });
    });

    describe("Status", function()
    {
        it("read empty", function()
        {
            test("+\r\n", "");
        });

        it("read string 1", function()
        {
            test("+E\r\n", "E");
        });

        it("read string 2", function()
        {
            test("+ER\r\n", "ER");
        });

        it("read string 3", function()
        {
            test("+ERR\r\n", "ERR");
        });

        it("read fragmented at start", function()
        {
            testFragmented("+", 2, void null);
            testFragmented("ERR\r\n", 0, "ERR");
        });

        it("read fragmented in the middle 1", function()
        {
            testFragmented("+E", 2, void null);
            testFragmented("RR\r\n", 0, "ERR");
        });

        it("read fragmented in the middle 2", function()
        {
            testFragmented("+ER", 2, void null);
            testFragmented("R\r\n", 0, "ERR");
        });

        it("read fragmented before CRLF", function()
        {
            testFragmented("+ERR", 2, void null);
            testFragmented("\r\n", 0, "ERR");
        });

        it("read fragmented inside CRLF", function()
        {
            testFragmented("+ERR\r", 1, void null);
            testFragmented("\n", 0, "ERR");
        });
        
        it("read OK", function()
        {
            test("+OK\r\n", "OK");
        });
        
        it("read PONG", function()
        {
            test("+PONG\r\n", "PONG");
        });
        
        it("read QUEUED", function()
        {
            test("+QUEUED\r\n", "QUEUED");
        });
    });


    describe("Failure", function()
    {
        it("read empty", function()
        {
            test("-\r\n", new RedisError(""));
        });
        
        it("read error", function()
        {
            test("-ERR test\r\n", new RedisError("ERR test"));
        });
        
        it("read ASK error", function()
        {
            test("-ASK 12345 127.0.0.1:9876\r\n", new RedisAskError("ASK 12345 127.0.0.1:9876", 12345, "127.0.0.1", 9876));
        });
        
        it("read LOADING error", function()
        {
            test("-LOADING test\r\n", new RedisLoadingError("LOADING test"));
        });
        
        it("read MOVED error", function()
        {
            test("-MOVED 12345 127.0.0.1:9876\r\n", new RedisMovedError("MOVED 12345 127.0.0.1:9876", 12345, "127.0.0.1", 9876));
        });
        
        it("read TRYAGAIN error", function()
        {
            test("-TRYAGAIN later\r\n", new RedisTryAgainError("TRYAGAIN later"));
        });
    });
    
    describe("Numeral", function()
    {
        it("read 0 to 9", function()
        {
            test(":0\r\n", 0);
            test(":1\r\n", 1);
            test(":2\r\n", 2);
            test(":3\r\n", 3);
            test(":4\r\n", 4);
            test(":5\r\n", 5);
            test(":6\r\n", 6);
            test(":7\r\n", 7);
            test(":8\r\n", 8);
            test(":9\r\n", 9);
        });

        it("read 123", function()
        {
            test(":123\r\n", 123);
        });

        it("read negative", function()
        {
            test(":-0\r\n", -0);
            test(":-1\r\n", -1);
            test(":-2\r\n", -2);
            test(":-3\r\n", -3);
            test(":-4\r\n", -4);
            test(":-5\r\n", -5);
            test(":-6\r\n", -6);
            test(":-7\r\n", -7);
            test(":-8\r\n", -8);
            test(":-9\r\n", -9);
            test(":-123\r\n", -123);
        });

        it("read fragmented at start", function()
        {
            testFragmented(":", 3, void null);
            testFragmented("123\r\n", 0, 123);
        });

        it("read fragmented in the middle 1", function()
        {
            testFragmented(":1", 2, void null);
            testFragmented("23\r\n", 0, 123);
        });

        it("read fragmented in the middle 2", function()
        {
            testFragmented(":12", 2, void null);
            testFragmented("3\r\n", 0, 123);
        });

        it("read fragmented before minus", function()
        {
            testFragmented(":", 3, void null);
            testFragmented("-123\r\n", 0, -123);
        });

        it("read fragmented after minus", function()
        {
            testFragmented(":-", 3, void null);
            testFragmented("123\r\n", 0, -123);
        });

        it("read fragmented inside negative number", function()
        {
            testFragmented(":-1", 2, void null);
            testFragmented("23\r\n", 0, -123);
        });

        it("read fragmented after negative number", function()
        {
            testFragmented(":-123", 2, void null);
            testFragmented("\r\n", 0, -123);
        });

        it("read fragmented before CRLF", function()
        {
            testFragmented(":123", 2, void null);
            testFragmented("\r\n", 0, 123);
        });

        it("read fragmented inside CRLF", function()
        {
            testFragmented(":123\r", 1, void null);
            testFragmented("\n", 0, 123);
        });
    });
});