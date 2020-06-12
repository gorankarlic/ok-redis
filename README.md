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
const client = Redis.connect(opts);
await client.set("foo", "bar");
const value = await client.get("foo");
console.log(value); //prints <Buffer 62 61 72>
await client.quit();
```

### Return buffers as UTF-8 strings for some commands

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(6379);
const client = Redis.connect(opts);
await client.set("foo", "bar");
const value = await client.strings().get("foo");
console.log(value); //prints "bar"
await client.quit();
```

### Return buffers as UTF-8 strings for all commands

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(6379).returns(String);
const client = Redis.connect(opts);
await client.set("foo", "bar");
const value = await client.get("foo");
console.log(value); //prints "bar"
await client.quit();
```