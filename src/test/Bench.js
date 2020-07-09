"use strict";

const glob = require("glob");

const AsyncFunction = (async () => void null).constructor;

function selectRunner(f)
{
    return f.length === 1 ? runCallback : f instanceof AsyncFunction ? runAsync : runSync;
};

async function runAsync(n, f)
{
    const a = new Array(n);
    const t = process.hrtime.bigint();
    for(let i = 0; i < n; i++)
    {
        a[i] = f();
    }
    await Promise.all(a);
    return Number(process.hrtime.bigint() - t);
}

async function runCallback(n, f)
{
    return new Promise((resolve) =>
    {
        let a = 0;
        const t = process.hrtime.bigint();
        for(let i = 0; i < n; i++)
        {
            f(() => ++a === n ? resolve(Number(process.hrtime.bigint() - t)) : 0);
        }
    });
}

function runSync(n, f)
{
    const t = process.hrtime.bigint();
    for(let i = 0; i < n; i++)
    {
        f();
    }
    return Number(process.hrtime.bigint() - t);
}

async function run(runner, f)
{
    let d = 0;
    let n = 1;
    while(true)
    {
        d = await runner(n, f);
        if(d < 100e6)
        {
            n *= 10;
        }
        else
        {
            n = Math.round((1e9 / d) * n);
            break;
        }
    }
    d = await runner(n, f);
    return [d / 1e9, n];
}

async function runSuite(only, name, after, before, bench)
{
    process.stdout.write(`\t${only ? "Only run " : ""}${name}\n`);
    for(const f of before)
    {
        const runner = selectRunner(f);
        await runner(1, f);
    }
    let onlies = bench.filter(([only]) => only);
    if(onlies.length === 0)
    {
        onlies = bench;
    }
    onlies = [...onlies, ...onlies];
    for(const [only, name, f] of onlies)
    {
        process.stdout.write(`\t\t${only ? "Only run " : ""}${name}\n`);
        const runner = selectRunner(f);
        const [d, n] = await run(runner, f);
        const q = Math.round(n / d);
        process.stdout.cursorTo(0);
        process.stdout.write(`\t\t${q.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").padStart(15)} ops/s\n`);
    }
    for(const f of after)
    {
        const runner = selectRunner(f);
        await runner(1, f);
    }
}

async function main(suites)
{
    if(suites.length === 0)
    {
        process.stderr.write("No test suites found.\n");
        process.exit(1);
    }
    try
    {
        await runAsync(1e6, async () => Promise.resolve(1));
        await runCallback(1e6, (f) => f());
        await runSync(1e6, () => 1);

        let onlies = suites.filter(([only]) => only);
        if(onlies.length === 0)
        {
            onlies = suites;
        }
        for(const suite of onlies)
        {
            await runSuite(...suite);
        }
    }
    catch(e)
    {
        process.stderr.write(`\t\t${e.stack}\n`);
        process.exit(1);
    }
}

async function suite(only, name, f)
{
    const after = [];
    const before = [];
    const bench = [];
    global.after = (f) => after.push(f);
    global.before = (f) => before.push(f);
    global.bench = (name, f) => bench.push([false, name, f]);
    global.bench.only = (name, f) => bench.push([true, name, f]);
    suites.push([only, name, after, before, bench]);
    await f();
}

const suites = [];
global.suite = async (name, f) => await suite(false, name, f);
global.suite.only = async (name, f) => await suite(true, name, f);

const pattern = process.argv[process.argv.length - 1];
const files = glob.sync(pattern);
if(files.length === 0)
{
    process.stderr.write(`No files matching ${pattern}\n`);
    process.exit(1);
}
else
{
    for(const file of files)
    {
        const path = `${process.cwd()}/${file}`;
        require(path);
    }
}
main(suites);