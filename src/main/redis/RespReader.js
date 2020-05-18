"use strict";

const RedisAskError = require("./RedisAskError");
const RedisError = require("./RedisError");
const RedisLoadingError = require("./RedisLoadingError");
const RedisMovedError = require("./RedisMovedError");
const RedisTryAgainError = require("./RedisTryAgainError");

const ASCII_LF = 0x0A;
const ASCII_CR = 0x0D;
const ASCII_SP = 0x20;
const ASCII_CO = 0x3A;
const ASCII_A = 0x41;
const ASCII_B = 0x42;
const ASCII_C = 0x43;
const ASCII_D = 0x44;
const ASCII_E = 0x45;
const ASCII_F = 0x46;
const ASCII_G = 0x47;
const ASCII_H = 0x48;
const ASCII_I = 0x49;
const ASCII_J = 0x4A;
const ASCII_K = 0x4B;
const ASCII_L = 0x4C;
const ASCII_M = 0x4D;
const ASCII_N = 0x4E;
const ASCII_O = 0x4F;
const ASCII_P = 0x50;
const ASCII_Q = 0x51;
const ASCII_R = 0x52;
const ASCII_S = 0x53;
const ASCII_T = 0x54;
const ASCII_U = 0x55;
const ASCII_V = 0x56;
const ASCII_W = 0x57;
const ASCII_X = 0x58;
const ASCII_Y = 0x59;
const ASCII_Z = 0x5A;

/**
 * Redis Protocol (RESP) reader for highly fragmented messages.
 */
class RespReader
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        this.q = null;
        this.r = void null;
    }

    /**
     * Reads the next RESP reply from the buffer.
     *
     * @public
     * @param {Buffer} b the buffer to read from.
     * @returns {Number} the number of bytes needed to finish reading.
     */
    read(b)
    {
        if(b.remaining() === 0)
        {
            return true;
        }
        if(this.q === null)
        {
            return this.readNext(b);
        }
        return this.readQueued(b);
    }

    /**
     * Reads the next message from the buffer.
     *
     * @private
     * @param {Buffer} b the buffer to read from.
     * @returns {Number} the number of bytes needed to finish reading.
     */
    readNext(b)
    {
        const reader = this.readType(b);
        const needed = reader.read(b);
        if(needed)
        {
            this.q = reader;
        }
        else
        {
            this.r = reader.result();
        }
        return needed;
    }

    /**
     * Reads the next queued message from the buffer.
     *
     * @private
     * @param {Buffer} b the buffer to read from.
     * @returns {Boolean} indicates if more bytes are needed to finish reading.
     */
    readQueued(b)
    {
        const needed = this.q.read(b);
        if(needed === false)
        {
            this.r = this.q.result();
            this.q = null;
        }
        return needed;
    }

    /**
     * Reads the message type from the buffer.
     *
     * @private
     * @param {Buffer} b the buffer to read from.
     * @returns {RespReader} the newly created reader for the message type.
     */
    readType(b)
    {
        switch(b.readNext())
        {
            case 0x24:
            {
                return new Bulk();
            }
            case 0x2A:
            {
                return new Multi();
            }
            case 0x2B:
            {
                return new Status();
            }
            case 0x2D:
            {
                return new Failure();
            }
            case 0x3A:
            {
                return new Numeral();
            }
        }
        throw new Error("invalid RESP type");
    }

    /**
     * Resets this reader.
     *
     * @public
     */
    reset()
    {
        this.q = null;
        this.r = void(null);
    }

    /**
     * Gets the value that was read.
     *
     * @public
     * @returns {Object} the value that was read.
     */
    result()
    {
        return this.r;
    }
}

/**
 * RESP status reader ("+").
 */
class Status
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        this.s = 2;
        this.r = null;
    }

    read(rb)
    {
        const b = rb.b;
        const p = rb.p;
        if(this.r === null)
        {
            if(Status.isOK(b, p))
            {
                rb.p = p + 4;
                this.r = "OK";
                return false;
            }
            if(Status.isPONG(b, p))
            {
                rb.p = p + 6;
                this.r = "PONG";
                return false;
            }
            if(Status.isQUEUED(b, p))
            {
                rb.p = p + 8;
                this.r = "QUEUED";
                return false;
            }
        }
        const s = rb.findCRLF(this.s === 1);
        const p1 = rb.p - 2 + s;
        if(p <= p1)
        {
            const r = b.slice(p, p1).toString("ascii");
            if(this.r === null)
            {
                this.r = r;
            }
            else
            {
                this.r += r;
            }
        }
        this.s = s;
        return s > 0;
    }
    
    result()
    {
        return this.r;
    }

    /**
     * Tests if the buffer reads "OK".
     *
     * @param {Buffer} b the buffer to read.
     * @param {Number} p the position to read from.
     * @returns {Boolean} indicates if the buffer reads "OK" at the position.
     */
    static isOK(b, p)
    {
        return p + 3 < b.length &&
        b[p+0] === ASCII_O &&
        b[p+1] === ASCII_K &&
        b[p+2] === ASCII_CR &&
        b[p+3] === ASCII_LF;
    }

    /**
     * Tests if the buffer reads "PONG".
     *
     * @param {Buffer} b the buffer to read.
     * @param {Number} p the position to read from.
     * @returns {Boolean} indicates if the buffer reads "PONG" at the position.
     */
    static isPONG(b, p)
    {
        return p + 5 < b.length &&
        b[p+0] === ASCII_P &&
        b[p+1] === ASCII_O &&
        b[p+2] === ASCII_N &&
        b[p+3] === ASCII_G &&
        b[p+4] === ASCII_CR &&
        b[p+5] === ASCII_LF;
    }

    /**
     * Tests if the buffer reads "QUEUED".
     *
     * @param {Buffer} b the buffer to read.
     * @param {Number} p the position to read from.
     * @returns {Boolean} indicates if the buffer reads "QUEUED" at the position.
     */
    static isQUEUED(b, p)
    {
        return p + 7 < b.length &&
        b[p+0] === ASCII_Q &&
        b[p+1] === ASCII_U &&
        b[p+2] === ASCII_E &&
        b[p+3] === ASCII_U &&
        b[p+4] === ASCII_E &&
        b[p+5] === ASCII_D &&
        b[p+6] === ASCII_CR &&
        b[p+7] === ASCII_LF;
    }
}

/**
 * RESP error reader ("-").
 */
class Failure extends Status
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        super();
        this.s = 2;
        this.r = null;
    }
    
    result()
    {
        return Failure.resultFromString(this.r);
    }
    
    /**
     * Parses a REPL error reply string.
     *
     * @private
     * @param {String} s the string to parse.
     * @returns {Error} the error reply.
     */
    static resultFromString(s)
    {
        if(s.startsWith("ERR "))
        {
            return new RedisError(s);
        }
        else if(s.startsWith("ASK "))
        {
            let s1 = s.indexOf(" ", 4);
            let s2 = s.indexOf(":", s1);
            let slot = Number(s.substring(4, s1));
            let host = s.substring(s1 + 1, s2);
            let port = Number(s.substring(s2 + 1, s.length));
            return new RedisAskError(s, slot, host, port);
        }
        else if(s.startsWith("LOADING "))
        {
            return new RedisLoadingError(s);
        }
        else if(s.startsWith("MOVED "))
        {
            let s1 = s.indexOf(" ", 6);
            let s2 = s.indexOf(":", s1);
            let slot = Number(s.substring(6, s1));
            let host = s.substring(s1 + 1, s2);
            let port = Number(s.substring(s2 + 1, s.length));
            return new RedisMovedError(s, slot, host, port);
        }
        else if(s.startsWith("TRYAGAIN "))
        {
            return new RedisTryAgainError(s);
        }
        else
        {
            return new RedisError(s);
        }
    }
}

/**
 * RESP numeral reader (":").
 */
class Numeral
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        this.m = false;
        this.n = 0;
        this.s = 3;
    }

    /**
     * Reads the numeral message.
     *
     * 1. Read minus or digit, at least 3 bytes needed.
     * 2. Read digit, at least 2 bytes needed.
     * 3. Read CR, 1 byte needed.
     * 4. Read LF, no further bytes needed.
     *
     * @param {RespBuffer} b the RESP buffer.
     * @returns {Boolean} indicates if any more bytes are needed to finish reading.
     */
    read(b)
    {
        return this.readNumber(b);
    }

    readNumber(rb)
    {
        let s = this.s;
        if(s === 0)
        {
            return false;
        }
        const b = rb.b;
        const len = b.length;
        let p = rb.p;
        let n = this.n;
        while(s > 0 && p < len)
        {
            let char = b[p++];
            switch(char)
            {
                case 0x0A:
                {
                    s = 0;
                    break;
                }
                case 0x0D:
                {
                    s = 1;
                    break;
                }
                case 0x2D:
                {
                    this.m = true;
                    break;
                }
                default:
                {
                    n = n * 10 + (char - 0x30);
                }
            }
        }
        rb.p = p;
        this.n = n;
        this.s = s;
        return s > 0;
    }
    result()
    {
        return this.m ? -this.n : this.n;
    }
}

/**
 * RESP bulk reply reader ("$").
 */
class Bulk extends Numeral
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        super();
        this.r = null;
    }

    /**
     * Reads the bulk message ("$").
     *
     * 1. Read number of bytes followed by CRLF, at least 4 bytes needed.
     * 2. Return if number of bytes is -1, no further bytes needed.
     * 3. Read until number of bytes is zero, number of bytes plus 2 needed.
     * 4. Read CR, 1 byte needed.
     * 5. Read LF, no further bytes needed.
     *
     * @param {RespBuffer} rb the RESP buffer.
     * @returns {Boolean} indicates if any more bytes are needed to finish reading.
     */
    read(rb)
    {
        if(this.readNumber(rb))
        {
            return true;
        }
        if(this.m)
        {
            return false;
        }
        const b = rb.b;
        const len = b.length;
        let p = rb.p;
        let n = this.n;
        let r = this.r;
        if(r === null)
        {
            if(n > 0 && n <= len - p)
            {
                r = b.slice(p, p + n);
                p += n;
                n = 0;
            }
            else
            {
                r = Buffer.allocUnsafe(n);
            }
        }
        if(n > 0)
        {
            let l = len - p;
            if(l > n)
            {
                l = n;
            }
            b.copy(r, r.length - n, p, p + l);
            n -= l;
            p += l;
        }
        if(n === 0 && Bulk.isCRLF(b, p))
        {
            p += 2;
            n = -2;
        }
        else
        {
            if(n === 0 && p < len)
            {
                p++;
                n = -1;
            }
            if(n === -1 && p < len)
            {
                p++;
                n = -2;
            }
        }
        rb.p = p;
        this.r = r;
        this.n = n;
        return n > -2;
    }
    
    result()
    {
        return this.r;
    }

    /**
     * Tests if the buffer reads CRLF.
     *
     * @param {Buffer} b the buffer to read.
     * @param {Number} p the position to read from.
     * @returns {Boolean} indicates if the buffer reads CRLF at the position.
     */
    static isCRLF(b, p)
    {
        return p + 1 < b.length && b[p] === ASCII_CR && b[p+1] === ASCII_LF;
    }
}

/**
 * RESP multi reply ("*")
 */
class Multi extends Numeral
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        super();
        this.r = null;
        this.q = null;
    }

    /**
     * Reads the bulk message.
     *
     * 1. Read number of replies followed by CRLF, at least 4 bytes needed.
     * 2. Return if number of replies is -1 or 0, no further bytes needed.
     * 3. Read until number of replies is zero, at least 3 bytes needed per reply.
     *
     * @param {RespBuffer} rb the RESP buffer.
     * @returns {Boolean} indicates if any more bytes are needed to finish reading.
     */
    read(rb)
    {
        let n;
        let q;
        if(this.s > 0)
        {
            if(this.readNumber(rb))
            {
                return true;
            }
            if(this.m)
            {
                return false;
            }
            this.r = [];
            n = this.n;
            if(n === 0)
            {
                return false;
            }
            q = new RespReader();
        }
        else
        {
            n = this.n;
            q = this.q;
        }
        const r = this.r;
        while(n > 0 && !q.read(rb))
        {
            r.push(q.result());
            q.reset();
            n--;
        }
        if(n > 0)
        {
            this.n = n;
            this.q = q;
            return true;
        }
        return false;
    }
    
    result()
    {
        return this.r;
    }
}

module.exports = RespReader;