# Redis client

Fast and efficient Redis standalone client for Node without any dependencies.

## Basic usage

### Connect to localhost

```js
const Redis = require("Redis");

const client = await Redis.connect(opts);
const pong = await client.ping();
console.log(pong); //prints "PONG"
```

### Connect to a Redis cluster

Connect to any replica - other replicas are automatically discovered and connected.

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(30001);
const cluster = await Redis.connectCluster(opts);
await cluster.set("foo", "bar");
await cluster.quit();
```

### Use promises

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(6379);
const client = await Redis.connect(opts);
await client.set("foo", "bar");
const bar = await client.get("foo");
console.log(bar); //prints <Buffer 62 61 72>
await client.quit();
```

### Use callbacks

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(6379);
Redis.connect(opts, (err, client) =>
{
    client.set("foo", "bar");
    client.get("foo", (err, value) => console.log(value)); //prints <Buffer 62 61 72>
});
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
const buffer = await client.get("foo");
console.log(buffer); //prints <Buffer 62 61 72>

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

### Issue commands immediately

Create an unconnected instance to issue commands before a connection has been established.

```js
const Redis = require("Redis");

const opts = Redis.opts().host("localhost").port(30001);
const client = Redis.create(opts);
const promises = [];
promises.push(cluster.connect());
promises.push(cluster.set("foo", "bar"));
promises.push(cluster.quit());
await Promise.all(promises);
```
