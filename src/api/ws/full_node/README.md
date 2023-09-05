# Websocket Message from Full Node service

### `on_message_from_full_node`
Capture all broadcast messages coming from `cactus_full_node` service.

#### Usage
You need to create Websocket connection before subscribing websocket messages.
```js
const {getDaemon} = require("cactus-agent");
const {on_message_from_full_node} = require("cactus-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

// Capture all messages from `cactus_full_node`
const unsubscribe = await on_message_from_full_node(daemon, (event) => {
  console.log(e.data);

  // Close connection if you don't need it anymore.
  if(...){
    unsubscribe(); // stop listening to this ws message.
  }
});
...
```

---

### `on_get_connections`
Capture broadcast message of command `get_connections` from `cactus_full_node` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_get_connections} = require("cactus-agent/api/ws/full_node");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_get_connections(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_full_node";
  command: "get_connections";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  connections: TConnectionFullNode[];
}
```
For content of `TConnectionFullNode`,  
see https://github.com/Cactus-Network/cactus-agent/blob/main/src/api/ws/full_node/index.ts

---

### `on_get_blockchain_state`
Capture broadcast message of command `get_blockchain_state` from `cactus_full_node` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_get_blockchain_state} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_get_blockchain_state(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_full_node";
  command: "get_blockchain_state";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui"|"metrics";
}
```
#### data:
```typescript
{
  blockchain_state: {
    peak: BlockRecord;
    genesis_challenge_initialized: bool;
    sync: {
      sync_mode: bool;
      synced: bool;
      sync_tip_height: uint32;
      sync_progress_height: uint32;
    };
    difficulty: uint64;
    sub_slot_iters: uint64;
    space: uint128;
    mempool_size: int;
    mempool_cost: int;
    "mempool_min_fees": {
      "cost_5000000": float,
    },
    "mempool_max_total_cost": int,
      "block_max_cost": int,
      "node_id": str,
  }
}
```

---

### `on_block`
Capture broadcast message of command `block` from `cactus_full_node` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_block} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_block(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_full_node";
  command: "block";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{} | {
  transaction_block: bool;
  k_size: uint8;
  header_hash: bytes32;
  height: uint32;
  block_cost?: uint64;
  block_fees?: uint64;
  timestamp?: uint64;
  transaction_generator_size_bytes?: int;
  transaction_generator_ref_list: uint32[];
  receive_block_result?: ReceiveBlockResult;
}
```
For content of `ReceiveBlockResult`,  
see https://github.com/Cactus-Network/cactus-agent/blob/main/src/api/cactus/consensus/blockchain.ts

---

### `on_signage_point`
Capture broadcast message of command `signage_point` from `cactus_full_node` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_signage_point} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_signage_point(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_full_node";
  command: "signage_point";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  broadcast_farmer: NewSignagePoint;
}
```
For content of `NewSignagePoint`,  
see https://github.com/Cactus-Network/cactus-agent/blob/main/src/api/cactus/protocols/farmer_protocol.ts
