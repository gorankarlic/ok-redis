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

### Return a UTF-8 string instead of a buffer for specific commands

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(6379);
const client = await Redis.connect(opts);
await client.set("foo", "bar");
const string = await client.string().get("foo");
console.log(string); //prints "bar"
await client.quit();
```

### Return a buffer instead of a UTF-8 string for specific commands

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(6379);
const redis = await Redis.connect(opts);
const client = redis.string();
await client.set("foo", "bar");
const buffer = await client.buffer().get("foo");
console.log(buffer); //prints <Buffer 62 61 72>
await client.quit();
```

### Return a UTF-8 string instead of a buffer for all commands

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(6379).returns(String);
const client = Redis.connect(opts);
await client.set("foo", "bar");
const string = await client.get("foo");
console.log(string); //prints "bar"
await client.quit();
```