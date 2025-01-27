# Daemon Websocket API

## Usage
You need to create Websocket connection before subscribing websocket messages.  
Unlike other websocket APIs, daemon websocket API is based on `request/response` style rather than `subscribe/listen`.  
Note: `subscribe/listen` style WebSocket API for daemon was introduced at `cactus-blockchain@1.2.8`. See detail [here](./#usagesubscription)
```js
const {getDaemon} = require("cactus-agent");
const {start_plotting, is_running} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response1 = await start_plotting(daemon, {...});
const response2 = await is_running(daemon, {...});
await daemon.close();

/*
 * You can connect to other than localhost when you specify websocket server url.
 */
await daemon.connect("wss://host.name:1234");
...
```

---


## `ping(daemon)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {ping} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await ping(daemon);
```
### response:
```typescript
{
  success: bool;
  value: str; // "pong"
}
```

---

## `start_service(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {start_service} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await start_service(daemon, {service: "..."});
```
### params:
```typescript
{
  service: TService;
  testing?: bool;
}
```
where `TService` is one of
```typescript
"cactus"|"cactus_wallet"|"cactus_full_node"|"cactus_harvester"|"cactus_farmer"
  |"cactus_introducer"|"cactus_timelord"|"cactus_timelord_launcher"|"cactus_full_node_simulator";
```
### response:
```typescript
{
  success: bool;
  service: str;
  error: Optional<str>;
}
```

---

## `start_plotting(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {start_plotting} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await start_plotting(daemon, params);
```
### params:
```typescript
{
  service: "cactus_plotter";
  delay?: int; // delay in seconds. Default: 0
  parallel?: bool; // parallel or serialize. Default: False
  k: int; // size. 32, 33, ...
  t: str; // tmp dir
  d: str; // final dir
  x?: bool; // exclude final dir. Skips adding [final dir] to harvester for farming. Default: False
  n?: int; // count of creating plot. Default: 1
  queue?: str; // queue name. Default: "default"
  r: int; // number of threads
  f?: str; // farmer public key.
  p?: str; // pool public key.
  c?: str; // pool contract address.
} & (chiapos_params | bladebit_ramplot_params | bladebit_diskplot_params | bladebit_cudaplot_params | madmax_params)
```
### chiapos_params:
```typescript
{
  plotter: "chiapos";
  t2?: str; // tmp dir 2
  b: int; // memory buffer size in MiB
  u: int; // number of buckets
  a?: int; // wallet private key fingerprint
  e: bool; // disable bitfield plotting
  overrideK: bool; // Set true only if you want to use k < 32
}
```
### bladebit_ramplot_params:
```typescript
{
  plotter: "bladebit";
  plot_type: "ramplot";
  w?: bool; // Warm start. Default: False
  m?: bool; // Disable NUMA. Default: False
  no_cpu_affinity?: bool; // Default: False
  compress?: int;
}
```
### bladebit_diskplot_params:
```typescript
{
  plotter: "bladebit";
  plot_type: "diskplot";
  w?: bool; // Warm start. Default: False
  m?: bool; // Disable NUMA. Default: False
  no_cpu_affinity?: bool; // Default: False
  compress?: int;
  t1: str; // Temp directory
  t2?: str; // Temp2 directory
  u?: int; // Buckets
  cache?: str;
  f1_threads?: int;
  fp_threads?: int;
  c_threads?: int;
  p2_threads?: int;
  p3_threads?: int;
  alternate?: bool; // Default: False
  no_t1_direct?: bool; // Default: False
  no_t2_direct?: bool; // Default: False
}
```
### bladebit_cudaplot_params:
```typescript
{
  plotter: "bladebit";
  plot_type: "cudaplot";
  w?: bool; // Warm start. Default: False
  m?: bool; // Disable NUMA. Default: False
  no_cpu_affinity?: bool; // Default: False
  compress?: int;
  device?: int;
  no_direct_downloads?: bool;
  t?: str; // Temp directory
  t2?: str; // Temp2 directory
}
```
### madmax_params:
```typescript
{
  plotter: "madmax";
  t2: str; // tmp dir 2
  b: int; // memory buffer size in MiB
  u: int; // number of buckets
  v: int; // number of buckets for phase 3 & 4
  K?: int; // Thread multiplier for phase 2. Default: 1
  G?: bool; // Alternate tmpdir/tmp2dir. Default: False
}
```
### response:
```typescript
{
  success: bool;
  ids: str[];
  service_name: str; // should be 'cactus_plotter'
}
```

---

## `stop_plotting(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {stop_plotting} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await stop_plotting(daemon, {id: "..."});
```
### params:
```typescript
{
  id: str;
}
```
### response:
```typescript
{
  success: bool;
}
```

---

## `stop_service(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {stop_service} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await stop_service(daemon, {service: "..."});
```
### params:
```typescript
{
  service: str; // "cactus_farmer", "cactus_full_node", "cactus_harvester", "cactus_wallet"
}
```
### response:
```typescript
{
  success: bool;
}
```

---

## `running_services(daemon)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {running_services} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await running_services(daemon);
```
### response:
```typescript
{
  success: bool;
  running_services: str[];
}
```

---

## `is_running(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {is_running} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await is_running(daemon, {service: "cactus_farmer"});
```
### params:
```typescript
{
  service: str; // "cactus_farmer", "cactus_full_node", "cactus_harvester", "cactus_wallet"
}
```
### response:
```typescript
{
  success: bool;
  service_name: str;
  is_running: bool;
}
```

---

## `add_private_key(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {add_private_key} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await add_private_key(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
  mnemonic?: str;
  label?: str;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  error_details?: {message: str};
}
```

---

## `check_keys(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {check_keys} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await check_keys(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
  root_path: str;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  error_details?: {message: str};
}
```

---

## `delete_all_keys(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {delete_all_keys} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await delete_all_keys(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  error_details?: {message: str};
}
```

---

## `delete_key_by_fingerprint(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {delete_key_by_fingerprint} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await delete_key_by_fingerprint(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
  fingerprint: int;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  error_details?: {message: str};
}
```

---

## `get_all_private_keys(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {get_all_private_keys} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_all_private_keys(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  private_keys: Array<{pk: str; entropy: str}>;
}
```

---

## `get_first_private_key(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {get_first_private_key} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_first_private_key(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  private_key: {pk: str; entropy: str};
}
```

---

## `get_key_for_fingerprint(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {get_key_for_fingerprint} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_key_for_fingerprint(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
  fingerprint?: int;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  pk: str;
  entropy: str;
}
```

---

## `get_key(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {get_key} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_key(daemon, params);
```
### params:
```typescript
{
  fingerprint: uint32;
  include_secrets?: bool;
}
```
### response:
```typescript
{
  success: True;
  key: KeyData;
} | {
  success: False;
  error: "keyring is locked" | "key not found" | "malformed request";
  error_details?: {message: str} | {fingerprint: int};
}
```
For content of `KeyData`,  
see https://github.com/Cactus-Network/cactus-agent/blob/main/src/api/cactus/util/keychain.ts

---

## `get_keys(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {get_keys} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_keys(daemon, params);
```
### params:
```typescript
{
  include_secrets?: bool;
}
```
### response:
```typescript
{
  success: True;
  keys: KeyData[];
} | {
  success: False;
  error: "keyring is locked" | "key not found" | "malformed request";
  error_details?: {message: str} | {fingerprint: int};
}
```
For content of `KeyData`,  
see https://github.com/Cactus-Network/cactus-agent/blob/main/src/api/cactus/util/keychain.ts

---

## `set_label(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {set_label} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await set_label(daemon, params);
```
### params:
```typescript
{
  fingerprint: uint32;
  label: str;
}
```
### response:
```typescript
{
  success: True;
} | {
  success: False;
  error: "keyring is locked" | "key not found" | "malformed request";
  error_details?: {message: str} | {fingerprint: int};
}
```

---

## `delete_label(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {delete_label} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await delete_label(daemon, params);
```
### params:
```typescript
{
  fingerprint: uint32;
}
```
### response:
```typescript
{
  success: True;
} | {
  success: False;
  error: "keyring is locked" | "key not found" | "malformed request";
  error_details?: {message: str} | {fingerprint: int};
}
```

---

## `is_keyring_locked(daemon)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {is_keyring_locked} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await is_keyring_locked(daemon);
```
### response:
```typescript
{
  success: bool;
  is_keyring_locked: bool;
}
```

---

## `keyring_status(daemon)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {keyring_status} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await keyring_status(daemon);
```
### response:
```typescript
{
  success: bool;
  is_keyring_locked: bool;
  passphrase_support_enabled: bool;
  can_save_passphrase: bool;
  user_passphrase_is_set: bool;
  can_set_passphrase_hint: bool;
  passphrase_hint: str;
  passphrase_requirements: {} | {
    is_optional: True;
    min_length: int;
  };
}
```

---

## `unlock_keyring(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {unlock_keyring} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await unlock_keyring(daemon, params);
```
### params:
```typescript
{
  key: string;
}
```
### response:
```typescript
{
  success: bool;
  error: string|None;
}
```

---

## `validate_keyring_passphrase(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {validate_keyring_passphrase} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await validate_keyring_passphrase(daemon, params);
```
### params:
```typescript
{
  key: string;
}
```
### response:
```typescript
{
  success: bool;
  error: string|None;
}
```

---

## `set_keyring_passphrase(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {set_keyring_passphrase} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await set_keyring_passphrase(daemon, params);
```
### params:
```typescript
{
  current_passphrase: string;
  new_passphrase: string;
  passphrase_hint?: str;
  save_passphrase?: bool;
}
```
### response:
```typescript
{
  success: bool;
  error: string;
}
```

---

## `remove_keyring_passphrase(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {remove_keyring_passphrase} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await remove_keyring_passphrase(daemon, params);
```
### params:
```typescript
{
  current_passphrase: str;
}
```
### response:
```typescript
{
  success: bool;
  error: string;
}
```

---

## `exit(daemon)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {exit} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await exit(daemon);
```
### response:
```typescript
{
  success: bool;
}
```

---

## `register_service(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {register_service} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await register_service(daemon, {service: "wallet_ui"});
```
### params:
```typescript
{
  service: str; // typically "wallet_ui" or "cactus_plotter"
}
```
### response:
```typescript
{
  success: bool;
} | {
  success: bool;
  service: str;
  queue: Array<{
    id: str;
    queue: str;
    size: int;
    parallel: bool;
    delay: int;
    state: str;
    error: Optional<str>;
    deleted: bool;
    log_new: str;
    log?: str;
  }>;
}
```

---

## `get_status(daemon)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {get_status} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_status(daemon);
```
### response:
```typescript
{
  success: bool;
  genesis_initialized: True;
}
```

---

## `get_version(daemon)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {get_version} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_version(daemon);
```
### response:
```typescript
{
  success: bool;
  version: string;
}
```

---

## `get_plotters(daemon)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {get_plotters} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_plotters(daemon);
```
### response:
```typescript
{
  success: bool;
  plotters: {
    chiapos?: chiapos_install_info;
    bladebit?: bladebit_install_info;
    madmax?: madmax_install_info;
  }
}
```
For content of `chiapos_install_info`, `bladebit_install_info`, `madmax_install_info`,  
see https://github.com/Cactus-Network/cactus-agent/blob/main/src/api/cactus/plotters/

---

## `get_routes(daemon)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {get_routes} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_routes(daemon);
```
### response:
```typescript
{
  success: bool;
  routes: str[];
}
```

---

## `get_wallet_addresses(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {get_wallet_addresses} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_wallet_addresses(daemon, params);
```
### params:
```typescript
{
  fingerprints?: uint32[];
  index?: int;
  count?: int;
  non_observer_derivation?: bool;
}
```
### response:
```typescript
{
  success: False;
  error: str;
} | {
  success: True;
  wallet_addresses: Record<str, Array<{ address: str; hd_path: str }>>;
}
```

---

## `get_keys_for_plotting(daemon, params)`
### Usage
```js
const {getDaemon} = require("cactus-agent");
const {get_keys_for_plotting} = require("cactus-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_keys_for_plotting(daemon, params);
```
### params:
```typescript
{
  fingerprints?: uint32[];
}
```
### response:
```typescript
{
  success: False;
  error: str;
} | {
  success: True;
  keys: Record<str, { farmer_public_key: str; pool_public_key: str }>;
}
```

---

## Usage(Subscription)
Starting from `cactus-blockchain@1.2.8`, `subscribe/listen` style WebSocket API was introduced to `daemon` service.  
Here's an example.
```js
const {getDaemon} = require("cactus-agent");
const {on_keyring_status_changed} = require("cactus-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

const unsubscribe = await on_keyring_status_changed(daemon, (event) => {
  console.log(e.data);
  
  // Close connection if you don't need it anymore.
  if(...){
    unsubscribe(); // stop listening to this ws message.
  }
});
...
```

---

### `on_keyring_status_changed`
Capture broadcast message of command `on_keyring_status_changed` from `daemon` service.

#### Usage
```typescript
const {getDaemon} = require("cactus-agent");
const {on_keyring_status_changed} = require("cactus-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_keyring_status_changed(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```
#### event:
```typescript
{
  origin: "daemon";
  command: "keyring_status_changed";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  success: bool;
  is_keyring_locked: bool;
  passphrase_support_enabled: bool;
  user_passphrase_is_set: bool;
  needs_migration: bool;
  passphrase_requirements: {} | {
    is_optional: True;
    min_length: int;
  };
}
```
