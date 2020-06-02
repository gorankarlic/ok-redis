# Redis client

Fast and efficient Redis client for Node.

## Basic usage

### Using callbacks

```js
const Redis = require("Redis");

const client = Redis.connect("localhost", 6379);
client.set("key", "value");
client.get("key", (err, value) => console.log("key has value", value));
```

### Using promises

```js
const Redis = require("Redis");

const client = await Redis.connect("localhost", 6379);
await client.set("key", "value");
const value = await client.get("key");
console.log("key has value", value));
await client.quit();
```