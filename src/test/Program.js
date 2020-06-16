"use strict";

const Redis = require("../main/redis/Redis");

async function main(next)
{
    const client = await Redis.connect();
    const done = async ([s, m]) =>
    {
        const n = Math.round(1000000 / (s + m / 1e9)).toString().padStart(10);
        process.stdout.write(`${n}\n`);
        await client.quit();
        next(next);
    };
    let ops = 0;
    const t = process.hrtime();
    for(let i = 0; i < 1000000; i++)
    {
        client.ping(() =>
        {
            if(++ops === 1000000)
            {
                done(process.hrtime(t));
            }
        });
    }
}
main(main);