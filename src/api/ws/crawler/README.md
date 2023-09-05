# Websocket Message from Crawler service

### `on_message_from_crawler`
Capture all broadcast messages coming from `cactus_crawler` service.

#### Usage
You need to create Websocket connection before subscribing websocket messages.
```js
const {getDaemon} = require("cactus-agent");
const {on_message_from_crawler} = require("cactus-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

// Capture all messages from `cactus_crawler`
const unsubscribe = await on_message_from_crawler(daemon, (event) => {
  console.log(e.data);

  // Close connection if you don't need it anymore.
  if(...){
    unsubscribe(); // stop listening to this ws message.
  }
});
...
```

---

### `on_loaded_initial_peers`
Capture broadcast message of command `loaded_initial_peers` from `cactus_crawler` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_loaded_initial_peers} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_loaded_initial_peers(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_crawler";
  command: "loaded_initial_peers";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  peer_counts: {
    total_last_5_days: int;
    reliable_nodes: int;
    ipv4_last_5_days: bytes32;
    ipv6_last_5_days: uint64;
    versions: Record<str, int>;
  };
}
```

---

### `on_crawl_batch_completed`
Capture broadcast message of command `crawl_batch_completed` from `cactus_crawler` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_crawl_batch_completed} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_crawl_batch_completed(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_crawler";
  command: "crawl_batch_completed";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  peer_counts: {
    total_last_5_days: int;
    reliable_nodes: int;
    ipv4_last_5_days: bytes32;
    ipv6_last_5_days: uint64;
    versions: Record<str, int>;
  };
}
```
