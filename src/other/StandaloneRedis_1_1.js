"use strict";

const Client = require("../main/redis/Client");
const Redis = require("../main/redis/Redis");

const ITERATIONS = 100000;
const KEY = Buffer.from("A");
const VALUE = Buffer.alloc(1).fill(0x62);

async function main()
{
    const client = await Redis.connect();
    let runs = 0;
    const reply = async () =>
    {
        if(++runs === ITERATIONS)
        {
            await client.quit();
        }
    };
    for(var k = 0; k < ITERATIONS; k++)
    {
        client.ping(reply);
    }
};

main();