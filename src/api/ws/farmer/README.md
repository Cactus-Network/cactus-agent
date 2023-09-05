# Websocket Message from Farmer service

### `on_message_from_farmer`
Capture all broadcast messages coming from `cactus_farmer` service.

#### Usage
You need to create Websocket connection before subscribing websocket messages.
```js
const {getDaemon} = require("cactus-agent");
const {on_message_from_farmer} = require("cactus-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

// Capture all messages from `cactus_farmer`
const unsubscribe = await on_message_from_farmer(daemon, (event) => {
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
Capture broadcast message of command `get_connections` from `cactus_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_get_connections} = require("cactus-agent/api/ws/farmer");

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
  origin: "cactus_farmer";
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
  connections: TConnectionGeneral[];
}
```
For content of `TConnectionGeneral`,  
see https://github.com/Cactus-Network/cactus-agent/blob/main/src/api/types.ts

---

### `on_new_farming_info`
Capture broadcast message of command `new_farming_info` from `cactus_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_new_farming_info} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_new_farming_info(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_farmer";
  command: "new_farming_info";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  farming_info: {
    challenge_hash: bytes32;
    signage_point: bytes32;
    passed_filter: uint32;
    proofs: uint32;
    total_plots: uint32;
    timestamp: uint64;
    node_id: bytes32;
    lookup_time: uint64;
  }
}
```

---

### `on_new_signage_point`
Capture broadcast message of command `new_signage_point` from `cactus_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_new_signage_point} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_new_signage_point(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_farmer";
  command: "new_signage_point";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  proofs: ProofOfSpace[];
  signage_point: NewSignagePoint;
  missing_signage_points: Optional<[uint64, uint32]>;
}
```
For content of `ProofOfSpace`,  
see https://github.com/Cactus-Network/cactus-agent/blob/main/src/api/cactus/types/blockchain_format/proof_of_space.ts  
For content of `NewSignagePoint`  
see https://github.com/Cactus-Network/cactus-agent/blob/main/src/api/cactus/protocols/farmer_protocol.ts

---

### `on_harvester_update`
Capture broadcast message of command `on_harvester_update` from `cactus_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_harvester_update} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_harvester_update(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_farmer";
  command: "harvester_update";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  connection: {
    node_id: bytes32;
    host: str;
    port: int;
  };
  plots: int;
  failed_to_open_filenames: int;
  no_key_filenames: int;
  duplicates: int;
  total_plot_size: int;
  syncing: {
    initial: bool;
    plot_files_processed: uint32;
    plot_files_total: uint32;
  } | None;
  last_sync_time: Optional<float>;
}
```
For content of `Plot`,  
see https://github.com/Cactus-Network/cactus-agent/blob/main/src/api/cactus/protocols/harvester_protocol.ts

---

### `on_harvester_removed`
Capture broadcast message of command `on_harvester_removed` from `cactus_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_harvester_removed} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_harvester_removed(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_farmer";
  command: "harvester_removed";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  node_id: bytes32;
}
```

---

### `on_proof`
Capture broadcast message of command `on_proof` from `cactus_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_proof} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_proof(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_farmer";
  command: "proof";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  proof: DeclareProofOfSpace;
  passed_filter: bool;
}
```
For content of `DeclareProofOfSpace`,  
see https://github.com/Cactus-Network/cactus-agent/blob/main/src/api/cactus/protocols/farmer_protocol.ts

---

### `on_submitted_partial`
Capture broadcast message of command `on_submitted_partial` from `cactus_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_submitted_partial} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_submitted_partial(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_farmer";
  command: "submitted_partial";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui" | "metrics";
}
```
#### data:
```typescript
{
  launcher_id: str;
  pool_url: str;
  current_difficulty: uint64;
  points_acknowledged_since_start: uint64;
  points_acknowledged_24h: Array<[float, uint64]>; // [(time.time(), new_difficulty)]
}
```

---

### `on_failed_partial`
Capture broadcast message of command `on_failed_partial` from `cactus_farmer` service.
#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_failed_partial} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_failed_partial(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```
#### event:
```typescript
{
  origin: "cactus_farmer";
  command: "failed_partial";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  p2_singleton_puzzle_hash: str;
}
```

---

### `on_add_connection`
Capture broadcast message of command `on_add_connection` from `cactus_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_add_connection} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_add_connection(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_farmer";
  command: "on_add_connection";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```

#### data:
```typescript
{}
```

---

### `on_close_connection`
Capture broadcast message of command `on_close_connection` from `cactus_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_close_connection} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_close_connection(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_farmer";
  command: "on_close_connection";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```

#### data:
```typescript
{}
```
