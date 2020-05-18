"use strict";

const assert = require("assert");
const fs = require('fs');
const PNG = require('pngjs').PNG;
const Random = require("../../main/util/Random");

describe("Random", function()
{
    describe("seed", function()
    {
        it("should seed", function()
        {
            Random.seed(123);
        });
    });
    
    describe("nextFloat", function()
    {
        it("should generate image", function()
        {
            const SX = 256;
            const SY = 256;
            const png = new PNG({colorType: 0, height: SY, width: SX});
            for(let y = 0; y < SY; y++)
            {
                for(let x = 0; x < SX; x++)
                {
                    const idx = (SX * y + x) << 2;
                    png.data[idx+0] = 255;
                    png.data[idx+1] = 255;
                    png.data[idx+2] = 255;
                    png.data[idx+3] = 255;
                }
            }

            for(let y = 0; y < SY / 2; y++)
            {
                for(let x = 0; x < SX; x++)
                {
                    const r = Math.random();
                    const rgb = Math.floor(r * 256);
                    const idx = (SX * y + x) << 2;
                    png.data[idx+0] = rgb;
                    png.data[idx+1] = rgb;
                    png.data[idx+2] = rgb;
                }
            }

            for(let y = SY / 2; y < SY; y++)
            {
                for(let x = 0; x < SX; x++)
                {
                    const rgb = Random.range(256);
                    const idx = (SX * y + x) << 2;
                    png.data[idx+0] = rgb;
                    png.data[idx+1] = rgb;
                    png.data[idx+2] = rgb;
                }
            }

            const buffer = PNG.sync.write(png);
            fs.writeFileSync(__dirname + '/Random.png', buffer);
        });
    });
});