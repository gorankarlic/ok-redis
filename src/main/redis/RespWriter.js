"use strict";

const HashTag = require("./HashTag");
const OutputBuffer = require("../util/OutputBuffer");

/**
 * Redis Protocol (RESP) writer.
 */
class RespWriter extends OutputBuffer
{
    /**
     * Creates a new instance of this class.
     */
    constructor()
    {
        super(Buffer.alloc(4 * 1024 * 1024));
    }

    /**
     * Extracts the callback function from the command arguments.
     *
     * @public
     * @param {Array} args the command arguments.
     */
    static callbackFromArgs(args)
    {
        const callback = args[args.length-1];
        if(callback === void null || callback instanceof Function)
        {
            return callback;
        }
        return void null;
    }

    /**
     * Determines the cluster slot from the command arguments.
     *
     * @param {Array} args the command arguments.
     * @param {Number} index the index of the first key argument.
     * @returns {Number} the slot for the command.
     */
    static slotFromArgs(args, index)
    {
        return HashTag.slotFor(args[index + 1]);
    }

    /**
     * Writes the specified command.
     *
     * @public
     * @param {Array} args the command arguments.
     * @return {Buffer} the written RESP command.
     */
    static write(args)
    {
        const r = new RespWriter();
        r.write(args);
        return r.buffer();
    }

    /**
     * Writes the specified command.
     *
     * @public
     * @param {Array} args the command arguments.
     * @return {Buffer} the written RESP command.
     */
    writeFast(args)
    {
        this.mark();
        this.write(args);
        return this.buffer();
    }

    /**
     * Writes the specified command arguments.
     *
     * @param {Array} args the command arguments.
     */
    write(args)
    {
        let argsLen = args.length;
        const command = args[1];
        const callback = args[argsLen-1];
        if(callback === void null || callback instanceof Function)
        {
            argsLen--;
        }
        this.writeChar(0x2A);
        this.writeInteger(argsLen - 1);
        this.writeCRLF$();
        this.writeInteger(command.length);
        this.writeCRLF();
        this.writeUTF7(command);
        for(let n = 2; n < argsLen; n++)
        {
            const arg = args[n];
            if(arg === void null)
            {
                throw new Error(`${command} argument ${n - 1} must not be undefined`);
            }
            this.writeCRLF$();
            if(arg instanceof Buffer)
            {
                const len = arg.length;
                this.writeInteger(len);
                this.writeCRLF();
                this.writeBuffer(arg, len);
            }
            else
            {
                const s = String(arg);
                const len = Buffer.byteLength(s);
                this.writeInteger(len);
                this.writeCRLF();
                this.writeUTF8(s, len);
            }
        }
        this.writeCRLF();
    }

    /**
     * Writes the specified buffer.
     *
     * @private
     * @param {Buffer} s the buffer to write.
     * @param {Number} len the buffer length, in bytes.
     */
    writeBuffer(s, len)
    {
        let n = this.p(len);
        const b = this.b;
        if(len <= 32)
        {
            let p = 0;
            while(p < len)
            {
                b[n++] = s[p++];
            }
        }
        else
        {
            s.copy(b, n, 0, len);
        }
    }

    /**
     * Writes the specified UTF7 character.
     *
     * @private
     * @param {Number} c the character to write.
     */
    writeChar(c)
    {
        const n = this.p(1);
        this.b[n] = c;
    }

    /**
     * Writes a CRLF string.
     *
     * @private
     */
    writeCRLF()
    {
        const n = this.p(2);
        this.b[n+0] = 0x0D;
        this.b[n+1] = 0x0A;
    }

    /**
     * Writes a CRLF$ string.
     *
     * @private
     */
    writeCRLF$()
    {
        const n = this.p(3);
        this.b[n+0] = 0x0D;
        this.b[n+1] = 0x0A;
        this.b[n+2] = 0x24;
    }

    /**
     * Writes the specified integer as a decimal string.
     *
     * @private
     * @param {Number} i the integer to write.
     */
    writeInteger(i)
    {
        if(i < 10)
        {
            this.writeChar(0x30 + i);
        }
        else if(i < 100)
        {
            this.writeInteger2(i);
        }
        else
        {
            this.writeUTF7(String(i));
        }
    }

    /**
     * Writes the specified integer as a decimal string with 2 characters.
     *
     * @private
     * @param {Number} i the integer to write, must be within the interval [10, 99].
     */
    writeInteger2(i)
    {
        const n = this.p(2);
        this.b[n+0] = 0x30 + Math.floor(i / 10);
        this.b[n+1] = 0x30 + i % 10;
    }

    /**
     * Writes the specified UTF7 string.
     *
     * @private
     * @param {String} s the string to write.
     */
    writeUTF7(s)
    {
        this.writeUTF7Len(s, s.length);
    }

    /**
     * Writes the specified UTF7 string.
     *
     * @private
     * @param {String} s the string to write.
     * @param {Number} len the string length, in bytes.
     */
    writeUTF7Len(s, len)
    {
        let n = this.p(len);
        const b = this.b;
        if(len <= 64)
        {
            let p = 0;
            while(p < len)
            {
                b[n++] = s.charCodeAt(p++);
            }
        }
        else
        {
            b.write(s, n, len, "ascii");
        }
    }

    /**
     * Writes the specified UTF8 string.
     *
     * @private
     * @param {String} s the string to write.
     * @param {Number} len the string length, in bytes.
     */
    writeUTF8(s, len)
    {
        if(s.length === len)
        {
            this.writeUTF7Len(s, len);
        }
        else
        {
            const n = this.p(len);
            this.b.write(s, n, len, "utf8");
        }
    }
}

module.exports = RespWriter;