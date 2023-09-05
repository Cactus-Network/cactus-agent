# Websocket Message from Harvester service

### `on_message_from_harvester`
Capture all broadcast messages coming from `cactus_harvester` service.

#### Usage
You need to create Websocket connection before subscribing websocket messages.
```js
const {getDaemon} = require("cactus-agent");
const {on_message_from_harvester} = require("cactus-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

// Capture all messages from `cactus_harvester`
const unsubscribe = await on_message_from_harvester(daemon, (event) => {
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
Capture broadcast message of command `get_connections` from `cactus_harvester` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_get_connections} = require("cactus-agent/api/ws/harvester");

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
  origin: "cactus_harvester";
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
see https://github.com/Cactus-Mine/cactus-agent/blob/main/src/api/types.ts

---

### `on_get_plots`
Capture broadcast message of command `get_plots` from `cactus_harvester` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_get_plots} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_get_plots(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "cactus_harvester";
  command: "get_plots";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  plots: Plot[];
  failed_to_open_filenames: string[];
  not_found_filenames: string[];
}
```
For content of `Plot`,  
see https://github.com/Cactus-Mine/cactus-agent/blob/main/src/api/cactus/harvester/harvester.ts

---

### `on_farming_info`
Capture broadcast message of command `farming_info` from `cactus_harvester` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_farming_info} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_farming_info(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```
#### event:
```typescript
{
  origin: "cactus_harvester";
  command: "farming_info";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  challenge_hash: str;
  total_plots: int;
  found_proofs: int;
  eligible_plots: int;
  time: float;
}
```

---

### `on_add_connection`
Capture broadcast message of command `add_connection` from `cactus_harvester` service.

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
  origin: "cactus_harvester";
  command: "add_connection";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
None
```

---

### `on_close_connection`
Capture broadcast message of command `close_connection` from `cactus_harvester` service.

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
  origin: "cactus_harvester";
  command: "close_connection";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
None
```
