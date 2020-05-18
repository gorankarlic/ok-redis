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

### Using async/await promise

```js
const Redis = require("Redis");

const client = Redis.connect("localhost", 6379).async();
client.set("key", "value");
const value = await client.get("key");
console.log("key has value", value));
```