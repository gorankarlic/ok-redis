# Redis client

Fast and efficient Redis client for Node without any dependencies.

## Basic usage

### Using callbacks

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(6379);
const client = Redis.connect(opts);
client.set("foo", "bar");
client.get("foo", (err, value) => console.log(value)); //prints <Buffer 62 61 72>
```

### Using promises

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(6379);
const client = await Redis.connect(opts);
await client.set("foo", "bar");
const value = await client.get("foo");
console.log(value); //prints <Buffer 62 61 72>
await client.quit();
```

### Switch between returning buffers or UTF-8 strings

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(6379);
const client = await Redis.connect(opts);
await client.set("foo", "bar");

client.return(String); //switch to string mode
const string = await client.get("foo");
console.log(string); //prints "bar"

client.return(Buffer); //switch to buffer mode
const string = await client.get("foo");
console.log(string); //prints <Buffer 62 61 72>

await client.quit();
```

### Return UTF-8 strings instead of buffers for all commands

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(6379).return(String);
const client = Redis.connect(opts);
await client.set("foo", "bar");

const string = await client.get("foo");
console.log(string); //prints "bar"

await client.quit();
```