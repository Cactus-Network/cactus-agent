# Fullnode RPC API

## Usage
You need to create RPC connection before actually sending rpc request to the service.  
Please remember that all rpc API is provided as an async function.
```js
const {RPCAgent} = require("chia-agent");
const {get_block} = require("chia-agent/api/rpc");
const agent = new RPCAgent({
  service: "full_node", // connect to local full_node service using config file.
});
// Then call RPC function
const response = await get_block(agent, {...});



/*
 * You can instantiate `agent` with hostname/port.
 * See https://github.com/Chia-Mine/chia-agent/blob/main/src/rpc/index.ts
 */
const agent = new RPCAgent({
  protocol: "https",
  host: "aaa.bbb.ccc",
  port: 8559,
  ca_cert: fs.readFileSync(...),
  client_cert: fs.readFileSync(...),
  client_key: fs.readFileSync(...),
});
```

---

## `get_blockchain_state(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_blockchain_state} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_blockchain_state(agent);
```
### response:
```typescript
{
  blockchain_state: {
    peak: Optional<BlockRecord>;
    genesis_challenge_initialized: bool;
    sync: {
      sync_mode: bool;
      synced: bool;
      sync_tip_height: Optional<uint32>;
      sync_progress_height: uint32;
    },
    difficulty: uint64;
    sub_slot_iters: uint64;
    space: uint128;
    mempool_size: int;
  };
}
```
For content of `BlockRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/consensus/block_record.ts

---

## `get_block(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_block} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_block(agent, {header_hash: "..."});
```
### params
```typescript
{
  header_hash: str;
}
```
### response
```typescript
{
  block: FullBlock;
}
```
For content of `FullBlock`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/full_block.ts

---

## `get_blocks(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_blocks} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_blocks(agent, {...});
```
### params
```typescript
{
  start: int;
  end: int;
  exclude_header_hash?: bool;
}
```
### response
```typescript
{
  blocks: FullBlock[] | Array<FullBlock & {header_hash: str}>;
}
```
For content of `FullBlock`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/full_block.ts

---

## `get_block_record_by_height(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_block_record_by_height} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_block_record_by_height(agent, {height: 300000});
```
### params
```typescript
{
  height: int;
}
```
### response
```typescript
{
  block_record: Optional<BlockRecord>;
}
```
For content of `BlockRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/consensus/block_record.ts

---

## `get_block_record(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_block_record} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_block_record(agent, {header_hash: "..."});
```
### params
```typescript
{
  header_hash: str;
}
```
### response
```typescript
{
  block_record: BlockRecord;
}
```
For content of `BlockRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/consensus/block_record.ts

---

## `get_block_records(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_block_records} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_block_records(agent, {...});
```
### params
```typescript
{
  start: int;
  end: int;
}
```
### response
```typescript
{
  block_records: BlockRecord[];
}
```
For content of `BlockRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/consensus/block_record.ts

---

## `get_unfinished_block_headers(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_unfinished_block_headers} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_unfinished_block_headers(agent);
```
### response
```typescript
{
  headers: UnfinishedHeaderBlock[];
}
```
For content of `UnfinishedHeaderBlock`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/unfinished_header_block.ts

---

## `get_network_space(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_network_space} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_network_space(agent, {...});
```
### params
```typescript
{
  newer_block_header_hash: str;
  older_block_header_hash: str;
}
```
### response
```typescript
{
  space: uint128;
}
```

---

## `get_additions_and_removals(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_additions_and_removals} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_additions_and_removals(agent, {header_hash: "..."});
```
### params
```typescript
{
  header_hash: str;
}
```
### response
```typescript
{
  additions: CoinRecord[];
  removals: CoinRecord[];
}
```
For content of `CoinRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/coin_record.ts

---

## `get_initial_freeze_period_of_full_node(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_initial_freeze_period_of_full_node} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_initial_freeze_period_of_full_node(agent);
```
### response
```typescript
{
  INITIAL_FREEZE_END_TIMESTAMP: uint64;
}
```

---

## `get_network_info_of_full_node(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_network_info_of_full_node} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_network_info_of_full_node(agent);
```
### response
```typescript
{
  network_name: str;
  network_prefix: str;
}
```

---

## `get_coin_records_by_puzzle_hash(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_coin_records_by_puzzle_hash} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_coin_records_by_puzzle_hash(agent, {...});
```
### params
```typescript
  puzzle_hash: str;
  start_height: uint32;
  end_height: uint32;
  include_spent_coins: bool;
```
### response
```typescript
{
  coin_records: CoinRecord[];
}
```
For content of `CoinRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/coin_record.ts

---

## `get_coin_records_by_puzzle_hashes(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_coin_records_by_puzzle_hashes} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_coin_records_by_puzzle_hashes(agent, {...});
```
### params
```typescript
{
  puzzle_hashes: str[];
  start_height: uint32;
  end_height: uint32;
  include_spent_coins: bool;
}
```
### response
```typescript
{
  coin_records: CoinRecord[];
}
```
For content of `CoinRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/coin_record.ts

---

## `get_coin_record_by_name(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_coin_record_by_name} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_coin_record_by_name(agent, {name: "..."});
```
### params
```typescript
{
  name: str;
}
```
### response
```typescript
{
  coin_record: CoinRecord;
}
```
For content of `CoinRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/coin_record.ts

---

## `push_tx(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {push_tx} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await push_tx(agent, {spend_bundle: {...}});
```
### params
```typescript
{
  spend_bundle: SpendBundle;
}
```
### response
```typescript
{
  status: str;
}
```
For content of `SpendBundle`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/spend_bundle.ts

---

## `get_all_mempool_tx_ids(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_all_mempool_tx_ids} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_all_mempool_tx_ids(agent);
```
### response
```typescript
{
  tx_ids: bytes32[];
}
```

---

## `get_all_mempool_items(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_all_mempool_items} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_all_mempool_items(agent);
```
### response
```typescript
{
  mempool_items: Record<string, MempoolItem>;
}
```
For content of `MempoolItem`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/mempool_item.ts

---

## `get_mempool_item_by_tx_id(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_mempool_item_by_tx_id} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "full_node"});
const response = await get_mempool_item_by_tx_id(agent, {tx_id: "..."});
```
### params
```typescript
{
  tx_id: str;
}
```
### response
```typescript
{
  mempool_item: MempoolItem;
}
```
For content of `MempoolItem`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/mempool_item.ts