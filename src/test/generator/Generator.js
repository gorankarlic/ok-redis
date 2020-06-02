/* global __dirname */

"use strict";

const assert = require("assert");
const child_process = require('child_process');
const fs = require("fs");

const opts = {cwd: __dirname};
child_process.execSync("printf \"HELP @generic\" | redis-cli > Redis.txt", opts);
child_process.execSync("printf \"HELP @string\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @list\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @set\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @sorted_set\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @hash\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @pubsub\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @transactions\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @connection\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @server\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @scripting\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @hyperloglog\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @cluster\" | redis-cli >> Redis.txt", opts);
child_process.execSync("printf \"HELP @geo\" | redis-cli >> Redis.txt", opts);

let out = fs.readFileSync(__dirname + "/Redis.txt", "ascii");
out = out.replace(/  \[1m/g, "");
out = out.replace(/  \[33msummary:\[0m /g, "");
out = out.replace(/  \[33msince:\[0m \r\n/g, "3.2.0\n");
out = out.replace(/  \[33msince:\[0m /g, "");
out = out.replace(/\[0m \[90m/g, " ");
out = out.replace(/\[0m/g, "");
out = out.replace(/\r\n/g, "\n");
out = out.replace(/\n\n\n/g, "\n");
out = out.replace(/\n\n/g, "\n");
out = out.replace(/^\n/g, "");
out = out.replace(/\n$/g, "");
fs.writeFileSync(__dirname + "/Redis.txt", out, opts);

const lines = out.split("\n");
const commands = [];
for(let n = 0; n < lines.length; )
{
    commands.push([lines[n++], lines[n++], lines[n++]]);
}
commands.sort((a, b) =>
{
    return a[0].localeCompare(b[0]);
});
const map = new Map();
for(let n = 0; n < commands.length; n++)
{
    let command = commands[n];
    let args = command[0].split(" ");
    let name = args[0];
    let array = map.get(name);
    if(array === void(0))
    {
        map.set(name, [command]);
    }
    else
    {
        array.push(command);
    }
}

let code = fs.readFileSync(__dirname + "/GeneratorTemplate.js", "ascii");
for(let commands of map.values())
{
    let command = commands[0];
    let args = command[0].split(" ");
    let name = args[0];
    if(args[args.length-1] === "" || args[args.length-1] === "-")
    {
        args.pop();
    }
    let info = child_process.execSync("redis-cli --raw COMMAND INFO " + name, opts);
    let infos = info.toString().split("\n");
    let arity = Number(infos[1]);
    let modes = infos.slice(2, infos.length - 4);
    let rw;
    let index = Number(infos[infos.length - 4]);
    let index2 = Number(infos[infos.length - 3]);
    if(modes.indexOf("admin") !== -1)
    {
        rw = 0;
    }
    else if(modes.indexOf("write") !== -1)
    {
        rw = 2;
    }
    else if(modes.indexOf("readonly") !== -1)
    {
        rw = 1;
    }
    else
    {
        rw = 0;
    }
    let flags = '0x' + Number((rw << 16) | index).toString(16);
    let paramsArg0 = ""
    + "\n * @param {Function} callback the function to call when done.";
    let commandArg0 = "function(callback)"
    + "\n{"
    + "\n    if(callback === void(0))"
    + "\n    {"
    + "\n        return this._cp([" + flags + ", \"" + name + "\"]);"
    + "\n    }"
    + "\n    else"
    + "\n    {"
    + "\n        this._cc([" + flags + ", \"" + name + "\", callback]);"
    + "\n    }"
    + "\n}";

    let paramsArg1 = ""
    + "\n * @param {Object} arg0 the first argument."
    + "\n * @param {Function} callback the function to call when done.";
    let commandArg1 = "function(arg0, callback)"
    + "\n{"
    + "\n    if(callback === void(0))"
    + "\n    {"
    + "\n        return this._cp([" + flags + ", \"" + name + "\", arg0]);"
    + "\n    }"
    + "\n    else"
    + "\n    {"
    + "\n        this._cc([" + flags + ", \"" + name + "\", arg0, callback]);"
    + "\n    }"
    + "\n}";

    let paramsArg2 = ""
    + "\n * @param {Object} arg0 the first argument."
    + "\n * @param {Object} arg1 the second argument."
    + "\n * @param {Function} callback the function to call when done.";
    let commandArg2 = "function(arg0, arg1, callback)"
    + "\n{"
    + "\n    if(callback === void(0))"
    + "\n    {"
    + "\n        return this._cp([" + flags + ", \"" + name + "\", arg0, arg1]);"
    + "\n    }"
    + "\n    else"
    + "\n    {"
    + "\n        this._cc([" + flags + ", \"" + name + "\", arg0, arg1, callback]);"
    + "\n    }"
    + "\n}";

    let paramsComplex = "";
    let commandComplex = "function()"
    + "\n{"
    + "\n    let args;"
    + "\n    const len = arguments.length;"
    + "\n    switch(len)"
    + "\n    {";

    for(let n = 0; n < Math.abs(arity) - 1; n++)
    {
        commandComplex = commandComplex
        + "\n        case " + n + ":";
    }
    if(Math.abs(arity) > 1)
    {
        commandComplex = commandComplex
        + "\n        {"
        + "\n            throw new Error(\"" + name + ": wrong number of arguments\");"
        + "\n        }";
    }
    if(Math.abs(arity) === 1)
    {
        commandComplex = commandComplex
        + "\n        case 0:"
        + "\n        {"
        + "\n            args = [" + flags + ", \"" + name + "\"];"
        + "\n            break;"
        + "\n        }";
    }
    if(Math.abs(arity) <= 2)
    {
        commandComplex = commandComplex
        + "\n        case 1:"
        + "\n        {"
        + "\n            args = [" + flags + ", \"" + name + "\", arguments[0]];"
        + "\n            break;"
        + "\n        }";
    }
    if(Math.abs(arity) <= 3)
    {
        commandComplex = commandComplex
        + "\n        case 2:"
        + "\n        {"
        + "\n            args = [" + flags + ", \"" + name + "\", arguments[0], arguments[1]];"
        + "\n            break;"
        + "\n        }";
    }

    commandComplex = commandComplex
    + "\n        default:"
    + "\n        {"
    + "\n            args = new Array(len + 2);"
    + "\n            args[0] = " + flags + ";"
    + "\n            args[1] = \"" + name + "\";"
    + "\n            for(let n = 0; n < len; n++)"
    + "\n            {"
    + "\n                args[n+2] = arguments[n];"
    + "\n            }"
    + "\n        }"
    + "\n    }"
    + "\n    return this._c(args);"
    + "\n}";

    let paramsImpl;
    let commandImpl;
    if(arity === 1)
    {
        commandImpl = commandArg0;
        paramsImpl = paramsArg0;
    }
    else if(arity === 2)
    {
        commandImpl = commandArg1;
        paramsImpl = paramsArg1;
    }
    else if(arity === 3)
    {
        commandImpl = commandArg2;
        paramsImpl = paramsArg2;
    }
    else
    {
        commandImpl = commandComplex;
        paramsImpl = paramsComplex;
    }

    const methodName = name.toLowerCase().replace('-', '_').replace(':', '');
    let method = ""
    + "\n"
    + "\n/**";
    for(let n = 0; n < commands.length; n++)
    {
        let command = commands[n];
        let args = command[0].split(" ");
        let name = args[0];
        let subname = /^[A-Z]$/.test(args[1]) ? args[1] : null;
        let url = subname === null ? name : name + "-" + subname;
        method = method
        + "\n * " + command[0]
        + "\n *"
        + "\n * (" + modes.join(", ") + ")"
        + "\n * (arity " + arity + ", first key " + index + ", last key " + index2 + ")"
        + "\n *"
        + "\n * " + command[1] + (command[1].endsWith(".") ? "" : ".")
        + "\n *"
        + paramsImpl
        + "\n * @see http://redis.io/commands/" + url.toLowerCase()
        + "\n * @since " + command[2];
        if(n !== commands.length - 1)
        {
            method = method
            + "\n *"
            + "\n * ----"
            + "\n *";
        }
    }
    method = method
    + "\n */"
    + "\nCommands.prototype." + methodName + " = "
    + commandImpl
    + ";";
    code += method;

    let async = ""
    + "\n"
    + "\n/**";
    for(let n = 0; n < commands.length; n++)
    {
        let command = commands[n];
        let args = command[0].split(" ");
        let name = args[0];
        let subname = /^[A-Z]$/.test(args[1]) ? args[1] : null;
        let url = subname === null ? name : name + "-" + subname;
        async = async
        + "\n * " + command[0]
        + "\n *"
        + "\n * (" + modes.join(", ") + ")"
        + "\n * (arity " + arity + ", first key " + index + ", last key " + index2 + ")"
        + "\n *"
        + "\n * " + command[1] + (command[1].endsWith(".") ? "" : ".")
        + "\n *"
        + paramsImpl
        + "\n * @see http://redis.io/commands/" + url.toLowerCase()
        + "\n * @since " + command[2];
        if(n !== commands.length - 1)
        {
            async = async
            + "\n *"
            + "\n * ----"
            + "\n *";
        }
    }
    async = async
    + "\n */"
    + "\nCommands.prototype.async_" + methodName + " = function(...args)"
    + "\n{"
    + "\n    return new Promise((resolve, reject) =>"
    + "\n    {"
    + "\n        args.push((err, result) =>"
    + "\n        {"
    + "\n            if(err)"
    + "\n            {"
    + "\n               reject(err);"
    + "\n            }"
    + "\n            else"
    + "\n            {"
    + "\n               resolve(result);"
    + "\n            }"
    + "\n        });"
    + "\n        this." + methodName + ".apply(this, args);"
    + "\n    });"
    + "\n}"
    + ";";
    //code += async;
}
fs.writeFileSync(__dirname + "/Commands.js", code, opts);
console.log("Generated", map.size, "methods for", commands.length, "commands.");