import {WalletInfo} from "../../chia/wallet/wallet_info";
import {Coin} from "../../chia/types/blockchain_format/coin";
import {
  bool,
  bytes,
  False,
  int,
  Optional,
  str,
  True,
  uint128,
  uint32,
  uint64,
  uint8
} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {TransactionRecord, TransactionRecordConvenience} from "../../chia/wallet/transaction_record";
import {SpendBundle} from "../../chia/types/spend_bundle";
import {TRPCAgent} from "../../../rpc";
import {PoolWalletInfo} from "../../chia/pools/pool_wallet_info";
import {TradeRecordConvenience} from "../../chia/wallet/trade_record";
import {CAT} from "../../chia/wallet/cat_wallet/cat_constants";

export const chia_wallet_service = "chia_wallet";
export type chia_wallet_service = typeof chia_wallet_service;

// # Key management

export const log_in_command = "log_in";
export type log_in_command = typeof log_in_command;
export type TLoginRequest = {
  fingerprint: int;
};
export type TLoginResponse = {
  fingerprint: int;
} | {
  success: False;
  error: "Unknown Error";
};
export async function log_in(agent: TRPCAgent, data: TLoginRequest){
  return agent.sendMessage<TLoginResponse>(chia_wallet_service, log_in_command, data);
}



export const get_logged_in_fingerprint_command = "get_logged_in_fingerprint";
export type get_logged_in_fingerprint_command = typeof get_logged_in_fingerprint_command;
export type TGetLoggedInFingerprintResponse = {
  fingerprint: Optional<int>;
};
export async function get_logged_in_fingerprint(agent: TRPCAgent){
  return agent.sendMessage<TGetLoggedInFingerprintResponse>(chia_wallet_service, get_logged_in_fingerprint_command);
}



export const get_public_keys_command = "get_public_keys";
export type get_public_keys_command = typeof get_public_keys_command;
export type TGetPublicKeysRequest = {
};
export type TGetPublicKeysResponse = {
  public_key_fingerprints: int[];
} | {
  keyring_is_locked: True;
};
export async function get_public_keys(agent: TRPCAgent){
  return agent.sendMessage<TGetPublicKeysResponse>(chia_wallet_service, get_public_keys_command);
}



export const get_private_key_command = "get_private_key";
export type get_private_key_command = typeof get_private_key_command;
export type TGetPrivateKeyRequest = {
  fingerprint: int; // https://github.com/Chia-Network/bls-signatures/blob/main/python-impl/ec.py#L164
};
export type TGetPrivateKeyResponse = {
  private_key: {
    fingerprint: int;
    sk: str;
    pk: str;
    farmer_pk: str;
    pool_pk: str;
    seed: Optional<str>;
  };
} | {
  success: False;
  private_key: {
    fingerprint: int;
  };
};
export async function get_private_key(agent: TRPCAgent, data: TGetPrivateKeyRequest){
  return agent.sendMessage<TGetPrivateKeyResponse>(chia_wallet_service, get_private_key_command, data);
}




export const generate_mnemonic_command = "generate_mnemonic";
export type generate_mnemonic_command = typeof generate_mnemonic_command;
export type TGenerateMnemonicRequest = {
};
export type TGenerateMnemonicResponse = {
  mnemonic: str[];
};
export async function generate_mnemonic(agent: TRPCAgent){
  return agent.sendMessage<TGenerateMnemonicResponse>(chia_wallet_service, generate_mnemonic_command);
}




export const add_key_command = "add_key";
export type add_key_command = typeof add_key_command;
export type TAddKeyRequest = {
  mnemonic: str[];
};
export type TAddKeyResponse = {
  success: false;
  error: str;
  word?: unknown; // `word` is e.args[0] where e = KeyError
} | {
  fingerprint: int;
};
export async function add_key(agent: TRPCAgent, data: TAddKeyRequest){
  return agent.sendMessage<TAddKeyResponse>(chia_wallet_service, add_key_command, data);
}




export const delete_key_command = "delete_key";
export type delete_key_command = typeof delete_key_command;
export type TDeleteKeyRequest = {
  fingerprint: int;
};
export type TDeleteKeyResponse = {
};
export async function delete_key(agent: TRPCAgent, data: TDeleteKeyRequest){
  return agent.sendMessage<TDeleteKeyResponse>(chia_wallet_service, delete_key_command, data);
}




export const check_delete_key_command = "check_delete_key";
export type check_delete_key_command = typeof check_delete_key_command;
export type TCheckDeleteKeyRequest = {
  fingerprint: int;
};
export type TCheckDeleteKeyResponse = {
  fingerprint: int;
  used_for_farmer_rewards: bool;
  used_for_pool_rewards: bool;
  wallet_balance: bool;
};
export async function check_delete_key(agent: TRPCAgent, data: TCheckDeleteKeyRequest){
  return agent.sendMessage<TCheckDeleteKeyResponse>(chia_wallet_service, check_delete_key_command, data);
}




export const delete_all_keys_command = "delete_all_keys";
export type delete_all_keys_command = typeof delete_all_keys_command;
export type TDeleteAllKeysRequest = {
  // no input
};
export type TDeleteAllKeysResponse = {} | {
  success: False;
  error: str;
};
export async function delete_all_keys(agent: TRPCAgent){
  return agent.sendMessage<TDeleteAllKeysResponse>(chia_wallet_service, delete_all_keys_command);
}




// # Wallet node
export const get_sync_status_command = "get_sync_status";
export type get_sync_status_command = typeof get_sync_status_command;
export type TGetSyncStatusRequest = {
};
export type TGetSyncStatusResponse = {
  synced: bool;
  syncing: bool;
  genesis_initialized: bool;
};
export async function get_sync_status(agent: TRPCAgent){
  return agent.sendMessage<TGetSyncStatusResponse>(chia_wallet_service, get_sync_status_command);
}



export const get_height_info_command = "get_height_info";
export type get_height_info_command = typeof get_height_info_command;
export type TGetHeightInfoRequest = {
};
export type TGetHeightInfoResponse = {
  height: uint32;
};
export async function get_height_info(agent: TRPCAgent){
  return agent.sendMessage<TGetHeightInfoResponse>(chia_wallet_service, get_height_info_command);
}



export const push_tx_command = "push_tx";
export type push_tx_command = typeof push_tx_command;
export type TPushTxRequest = {
  spend_bundle: str; // streamable binary in hex string 
};
export type TPushTxResponse = {};
export async function push_tx(agent: TRPCAgent, data: TPushTxRequest){
  return agent.sendMessage<TPushTxResponse>(chia_wallet_service, push_tx_command, data);
}



export const farm_block_command = "farm_block";
export type farm_block_command = typeof farm_block_command;
export type TFarmBlockRequest = {
  address: str;
};
export type TFarmBlockResponse = {
};
export async function farm_block(agent: TRPCAgent, data: TFarmBlockRequest){
  return agent.sendMessage<TFarmBlockResponse>(chia_wallet_service, farm_block_command, data);
}



export const get_initial_freeze_period_command_of_wallet = "get_initial_freeze_period";
export type get_initial_freeze_period_command_of_wallet = typeof get_initial_freeze_period_command_of_wallet;
export type TGetInitialFreezePeriodRequestOfWallet = {
};
export type TGetInitialFreezePeriodResponseOfWallet = {
  INITIAL_FREEZE_END_TIMESTAMP: 1620061200; // Mon May 03 2021 17:00:00 GMT+0000
};
export async function get_initial_freeze_period_of_wallet(agent: TRPCAgent){
  return agent.sendMessage<TGetInitialFreezePeriodResponseOfWallet>(chia_wallet_service, get_initial_freeze_period_command_of_wallet);
}



export const get_network_info_command_of_wallet = "get_network_info";
export type get_network_info_command_of_wallet = typeof get_network_info_command_of_wallet;
export type TGetNetworkInfoRequestOfWallet = {
};
export type TGetNetworkInfoResponseOfWallet = {
  network_name: str;
  network_prefix: str;
};
export async function get_network_info_of_wallet(agent: TRPCAgent){
  return agent.sendMessage<TGetNetworkInfoResponseOfWallet>(chia_wallet_service, get_network_info_command_of_wallet);
}



// # Wallet management
export const get_wallets_command = "get_wallets";
export type get_wallets_command = typeof get_wallets_command;
export type TGetWalletsRequest = {
  type?: int;
};
export type TGetWalletsResponse = {
  wallets: WalletInfo[];
};
export async function get_wallets(agent: TRPCAgent, data: TGetWalletsRequest){
  return agent.sendMessage<TGetWalletsResponse>(chia_wallet_service, get_wallets_command, data);
}



export type TCreate_New_CAT_WalletRequest = {
  fee?: uint64;
  wallet_type: "cat_wallet"
  mode: "new";
  amount: uint64;
} | {
  fee?: uint64;
  wallet_type: "cat_wallet"
  mode: "existing";
  asset_id: str;
};
export type TCreate_New_CAT_WalletResponse = {
  type: uint8;
  asset_id: str;
  wallet_id: uint32;
};

export type TCreate_New_RL_WalletRequest = {
  fee?: uint64;
  wallet_type: "rl_wallet";
  rl_type: "admin";
  interval: int;
  limit: int;
  pubkey: str;
  amount: int;
} | {
  fee?: uint64;
  wallet_type: "rl_wallet";
  rl_type: "user";
};
export type TCreate_New_RL_WalletResponse = {
  success: bool;
  id: uint32;
  type: uint8;
  origin: Optional<Coin>;
  pubkey: str;
} | {
  id: uint32;
  type: uint8;
  pubkey: str;
};

export type TCreate_New_DID_WalletRequest = {
  fee?: uint64;
  wallet_type: "did_wallet";
  did_type: "new";
  backup_dids: str[];
  num_of_backup_ids_needed: uint64;
  amount: int;
} | {
  fee?: uint64;
  wallet_type: "did_wallet";
  did_type: "recovery";
  filename: str;
};
export type TCreate_New_DID_WalletResponse = {
  success: True;
  type: uint8;
  my_did: str;
  wallet_id: uint32;
} | {
  success: True;
  type: uint8;
  my_did: str;
  wallet_id: uint32;
  coin_name: str;
  coin_list: [bytes32, bytes32, uint64]; // Not Coin[]. See as_list function implementation.
  newpuzhash: str;
  pubkey: str;
  backup_dids: bytes[];
  num_verifications_required: uint64;
};

export type TCreate_New_Pool_WalletRequest = {
  fee?: uint64;
  wallet_type: "pool_wallet";
  mode: "new";
  initial_target_state: {
    state: "SELF_POOLING";
  } | {
    state: "FARMING_TO_POOL";
    target_puzzle_hash: str;
    pool_url: str;
    relative_lock_height: uint32;
  };
  p2_singleton_delayed_ph?: str;
  p2_singleton_delay_time?: uint64;
} | {
  fee?: uint64;
  wallet_type: "pool_wallet";
  mode: "recovery";
};

export type TCreate_New_Pool_WalletResponse = {
  total_fee: uint64;
  transaction: TransactionRecord;
  launcher_id: str;
  p2_singleton_puzzle_hash: str;
};

export const create_new_wallet_command = "create_new_wallet";
export type create_new_wallet_command = typeof create_new_wallet_command;
export type TCreateNewWalletRequest = TCreate_New_CAT_WalletRequest | TCreate_New_RL_WalletRequest | TCreate_New_DID_WalletRequest | TCreate_New_Pool_WalletRequest;
export type TCreateNewWalletResponse = TCreate_New_CAT_WalletResponse | TCreate_New_RL_WalletResponse | TCreate_New_DID_WalletResponse | TCreate_New_Pool_WalletResponse;
export async function create_new_wallet(agent: TRPCAgent, data: TCreateNewWalletRequest){
  return agent.sendMessage<TCreateNewWalletResponse>(chia_wallet_service, create_new_wallet_command, data);
}


// # Wallet
export const get_wallet_balance_command = "get_wallet_balance";
export type get_wallet_balance_command = typeof get_wallet_balance_command;
export type TGetWalletBalanceRequest = {
  wallet_id: int;
};
export type TGetWalletBalanceResponse = {
  wallet_balance: {
    wallet_id: uint32;
    confirmed_wallet_balance: uint128; // MEMO: cat_wallet, did_wallet and pool_wallet declare `uint64`. rl_wallet and standard_wallet declare uint128.
    unconfirmed_wallet_balance: uint128;
    spendable_balance: uint128;
    pending_change: uint64;
    max_send_amount: uint64;
    unspent_coin_count: int;
    pending_coin_removal_count: int;
    fingerprint?: int;
  };
};
export async function get_wallet_balance(agent: TRPCAgent, data: TGetWalletBalanceRequest){
  return agent.sendMessage<TGetWalletBalanceResponse>(chia_wallet_service, get_wallet_balance_command, data);
}



export const get_transaction_command = "get_transaction";
export type get_transaction_command = typeof get_transaction_command;
export type TGetTransactionRequest = {
  transaction_id: str;
};
export type TGetTransactionResponse = {
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecord["name"];
};
export async function get_transaction(agent: TRPCAgent, data: TGetTransactionRequest){
  return agent.sendMessage<TGetTransactionResponse>(chia_wallet_service, get_transaction_command, data);
}




export const get_transactions_command = "get_transactions";
export type get_transactions_command = typeof get_transactions_command;
export type TGetTransactionsRequest = {
  wallet_id: int;
  start?: int;
  end?: int;
  sort_key?: str;
  reverse?: bool;
  to_address?: str;
};
export type TGetTransactionsResponse = {
  transactions: TransactionRecordConvenience[];
  wallet_id: int;
};
export async function get_transactions(agent: TRPCAgent, data: TGetTransactionsRequest){
  return agent.sendMessage<TGetTransactionsResponse>(chia_wallet_service, get_transactions_command, data);
}




export const get_next_address_command = "get_next_address";
export type get_next_address_command = typeof get_next_address_command;
export type TGetNextAddressRequest = {
  new_address: bool;
  wallet_id: int;
};
export type TGetNextAddressResponse = {
  wallet_id: uint32; // wallet_id in request is int, but response is uint32
  address: str;
};
export async function get_next_address(agent: TRPCAgent, data: TGetNextAddressRequest){
  return agent.sendMessage<TGetNextAddressResponse>(chia_wallet_service, get_next_address_command, data);
}




export const send_transaction_command = "send_transaction";
export type send_transaction_command = typeof send_transaction_command;
export type TSendTransactionRequest = {
  wallet_id: int;
  amount: int;
  fee: int;
  address: str;
  memos?: str[];
};
export type TSendTransactionResponse = {
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecord["name"];
};
export async function send_transaction(agent: TRPCAgent, data: TSendTransactionRequest){
  return agent.sendMessage<TSendTransactionResponse>(chia_wallet_service, send_transaction_command, data);
}




export const send_transaction_multi_command = "send_transaction_multi";
export type send_transaction_multi_command = typeof send_transaction_multi_command;
export type TSendTransactionMultiRequest = {
  wallet_id: uint32;
  additions: TAdditions[];
  fee?: uint64;
  coins?: Coin[];
  coin_announcements?: TCoinAnnouncement[];
  puzzle_announcements?: TPuzzleAnnouncement[];
};
export type TSendTransactionMultiResponse = {
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecordConvenience["name"];
};
export async function send_transaction_multi(agent: TRPCAgent, data: TSendTransactionMultiRequest){
  return agent.sendMessage<TSendTransactionMultiResponse>(chia_wallet_service, send_transaction_multi_command, data);
}




export const get_transaction_count_command = "get_transaction_count";
export type get_transaction_count_command = typeof get_transaction_count_command;
export type TGetTransactionCountRequest = {
  wallet_id: int;
};
export type TGetTransactionCountResponse = {
  count: int;
  wallet_id: int;
};
export async function get_transaction_count(agent: TRPCAgent, data: TGetTransactionCountRequest){
  return agent.sendMessage<TGetTransactionCountResponse>(chia_wallet_service, get_transaction_count_command, data);
}




export const get_farmed_amount_command = "get_farmed_amount";
export type get_farmed_amount_command = typeof get_farmed_amount_command;
export type TGetFarmedAmountRequest = {
};
export type TGetFarmedAmountResponse = {
  farmed_amount: int;
  pool_reward_amount: int;
  farmer_reward_amount: int;
  fee_amount: int;
  last_height_farmed: int;
};
export async function get_farmed_amount(agent: TRPCAgent){
  return agent.sendMessage<TGetFarmedAmountResponse>(chia_wallet_service, get_farmed_amount_command);
}




export type TAdditions = {
  amount: uint64;
  puzzle_hash: str;
  memos?: str[];
};
export type TCoinAnnouncement = {
  coin_id: str;
  message: str;
  morph_bytes?: str;
};
export type TPuzzleAnnouncement = {
  puzzle_hash: str;
  message: str;
  morph_bytes?: str;
};
export const create_signed_transaction_command = "create_signed_transaction";
export type create_signed_transaction_command = typeof create_signed_transaction_command;
export type TCreateSignedTransactionRequest = {
  additions: TAdditions[];
  fee?: uint64;
  coins?: Coin[];
  coin_announcements?: TCoinAnnouncement[];
  puzzle_announcements?: TPuzzleAnnouncement[];
};
export type TCreateSignedTransactionResponse = {
  signed_tx: TransactionRecordConvenience;
};
export async function create_signed_transaction(agent: TRPCAgent, data: TCreateSignedTransactionRequest){
  return agent.sendMessage<TCreateSignedTransactionResponse>(chia_wallet_service, create_signed_transaction_command, data);
}




export const delete_unconfirmed_transactions_command = "delete_unconfirmed_transactions";
export type delete_unconfirmed_transactions_command = typeof delete_unconfirmed_transactions_command;
export type TDeleteUnconfirmedTransactionsRequest = {
  wallet_id: uint32;
};
export type TDeleteUnconfirmedTransactionsResponse = {
};
export async function delete_unconfirmed_transactions(agent: TRPCAgent, data: TDeleteUnconfirmedTransactionsRequest){
  return agent.sendMessage<TDeleteUnconfirmedTransactionsResponse>(chia_wallet_service, delete_unconfirmed_transactions_command, data);
}




export const select_coins_command = "select_coins";
export type select_coins_command = typeof select_coins_command;
export type TSelectCoinsRequest = {
  amount: uint64;
  wallet_id: uint32;
};
export type TSelectCoinsResponse = {
  coins: Coin[];
};
export async function select_coins(agent: TRPCAgent, data: TSelectCoinsRequest){
  return agent.sendMessage<TSelectCoinsResponse>(chia_wallet_service, select_coins_command, data);
}




// # CATs and Trading
export const cat_set_name_command = "cat_set_name";
export type cat_set_name_command = typeof cat_set_name_command;
export type TCatSetNameRequest = {
  wallet_id: int;
  name: str;
};
export type TCatSetNameResponse = {
  wallet_id: int;
};
export async function cat_set_name(agent: TRPCAgent, data: TCatSetNameRequest){
  return agent.sendMessage<TCatSetNameResponse>(chia_wallet_service, cat_set_name_command, data);
}




export const cat_asset_id_to_name_command = "cat_asset_id_to_name";
export type cat_asset_id_to_name_command = typeof cat_asset_id_to_name_command;
export type TCatAssetIdToNameRequest = {
  asset_id: str;
};
export type TCatAssetIdToNameResponse = {
  wallet_id: Optional<uint32>;
  name: str;
};
export async function cat_asset_id_to_name(agent: TRPCAgent, data: TCatAssetIdToNameRequest){
  return agent.sendMessage<TCatAssetIdToNameResponse>(chia_wallet_service, cat_asset_id_to_name_command, data);
}




export const cat_get_name_command = "cat_get_name";
export type cat_get_name_command = typeof cat_get_name_command;
export type TCatGetNameRequest = {
  wallet_id: int;
};
export type TCatGetNameResponse = {
  wallet_id: int;
  name: str;
};
export async function cat_get_name(agent: TRPCAgent, data: TCatGetNameRequest){
  return agent.sendMessage<TCatGetNameResponse>(chia_wallet_service, cat_get_name_command, data);
}




export const get_stray_cats_command = "get_stray_cats";
export type get_stray_cats_command = typeof get_stray_cats_command;
export type TGetStrayCatsResponse = {
  stray_cats: Array<{
    asset_id: str;
    name: str;
    first_seen_height: int;
    sender_puzzle_hash: str;
  }>;
};
export async function get_stray_cats(agent: TRPCAgent){
  return agent.sendMessage<TGetStrayCatsResponse>(chia_wallet_service, get_stray_cats_command);
}




export const cat_spend_command = "cat_spend";
export type cat_spend_command = typeof cat_spend_command;
export type TCatSpendRequest = {
  wallet_id: int;
  inner_address: str;
  memos?: str[];
  amount: uint64;
  fee: uint64;
};
export type TCatSpendResponse = {
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecord["name"];
};
export async function cat_spend(agent: TRPCAgent, data: TCatSpendRequest){
  return agent.sendMessage<TCatSpendResponse>(chia_wallet_service, cat_spend_command, data);
}




export const cat_get_asset_id_command = "cat_get_asset_id";
export type cat_get_asset_id_command = typeof cat_get_asset_id_command;
export type TCatGetAssetIdRequest = {
  wallet_id: int;
};
export type TCatGetAssetIdResponse = {
  asset_id: str;
  wallet_id: int;
};
export async function cat_get_asset_id(agent: TRPCAgent, data: TCatGetAssetIdRequest){
  return agent.sendMessage<TCatGetAssetIdResponse>(chia_wallet_service, cat_get_asset_id_command, data);
}




export const create_offer_for_ids_command = "create_offer_for_ids";
export type create_offer_for_ids_command = typeof create_offer_for_ids_command;
export type TCreateOfferForIdsRequest = {
  offer: Record<int, int>;
  fee?: uint64;
  validate_only?: bool;
};
export type TCreateOfferForIdsResponse = {
  offer: str;
  trade_record: TradeRecordConvenience;
};
export async function create_offer_for_ids(agent: TRPCAgent, data: TCreateOfferForIdsRequest){
  return agent.sendMessage<TCreateOfferForIdsResponse>(chia_wallet_service, create_offer_for_ids_command, data);
}




export const get_offer_summary_command = "get_offer_summary";
export type get_offer_summary_command = typeof get_offer_summary_command;
export type TGetOfferSummaryRequest = {
  offer: str;
};
export type TGetOfferSummaryResponse = {
  summary: {
    offered: Record<str, int>;
    requested: Record<str, int>;
    fees: int;
  };
};
export async function get_offer_summary(agent: TRPCAgent, data: TGetOfferSummaryRequest){
  return agent.sendMessage<TGetOfferSummaryResponse>(chia_wallet_service, get_offer_summary_command, data);
}




export const check_offer_validity_command = "check_offer_validity";
export type check_offer_validity_command = typeof check_offer_validity_command;
export type TCheckOfferValidityRequest = {
  offer: str;
};
export type TCheckOfferValidityResponse = {
  valid: bool;
};
export async function check_offer_validity(agent: TRPCAgent, data: TCheckOfferValidityRequest){
  return agent.sendMessage<TCheckOfferValidityResponse>(chia_wallet_service, check_offer_validity_command, data);
}




export const take_offer_command = "take_offer";
export type take_offer_command = typeof take_offer_command;
export type TTakeOfferRequest = {
  offer: str;
  fee?: uint64;
};
export type TTakeOfferResponse = {
  trade_record: TradeRecordConvenience;
};
export async function take_offer(agent: TRPCAgent, data: TTakeOfferRequest){
  return agent.sendMessage<TTakeOfferResponse>(chia_wallet_service, take_offer_command, data);
}




export const get_offer_command = "get_offer";
export type get_offer_command = typeof get_offer_command;
export type TGetOfferRequest = {
  trade_id: str;
  file_contents?: bool;
};
export type TGetOfferResponse = {
  trade_record: TradeRecordConvenience;
  offer: Optional<str>;
};
export async function get_offer(agent: TRPCAgent, data: TGetOfferRequest){
  return agent.sendMessage<TGetOfferResponse>(chia_wallet_service, get_offer_command, data);
}




export const get_all_offers_command = "get_all_offers";
export type get_all_offers_command = typeof get_all_offers_command;
export type TGetAllOffersRequest = {
  start?: int;
  end?: int;
  exclude_my_offers?: bool;
  exclude_taken_offers?: bool;
  include_completed?: bool;
  sort_key?: str;
  reverse?: bool;
  file_contents?: bool;
};
export type TGetAllOffersResponse = {
  trade_records: TradeRecordConvenience[];
  offers: Optional<str[]>;
};
export async function get_all_offers(agent: TRPCAgent, data: TGetAllOffersRequest){
  return agent.sendMessage<TGetAllOffersResponse>(chia_wallet_service, get_all_offers_command, data);
}




export const get_offers_count_command = "get_offers_count";
export type get_offers_count_command = typeof get_offers_count_command;
export type TGetOffersCountResponse = {
  total: int;
  my_offers_count: int;
  taken_offers_count: int;
};
export async function get_offers_count(agent: TRPCAgent){
  return agent.sendMessage<TGetOffersCountResponse>(chia_wallet_service, get_offers_count_command);
}




export const cancel_offer_command = "cancel_offer";
export type cancel_offer_command = typeof cancel_offer_command;
export type TCancelOfferRequest = {
  secure: bool;
  trade_id: str;
  fee?: uint64;
};
export type TCancelOfferResponse = {};
export async function cancel_offer(agent: TRPCAgent, data: TCancelOfferRequest){
  return agent.sendMessage<TCancelOfferResponse>(chia_wallet_service, cancel_offer_command, data);
}




export const get_cat_list_command = "get_cat_list";
export type get_cat_list_command = typeof get_cat_list_command;
export type TGetCatListResponse = {
  cat_list: CAT[];
};
export async function get_cat_list(agent: TRPCAgent){
  return agent.sendMessage<TGetCatListResponse>(chia_wallet_service, get_cat_list_command);
}




// # DID Wallet
export const did_update_recovery_ids_command = "did_update_recovery_ids";
export type did_update_recovery_ids_command = typeof did_update_recovery_ids_command;
export type TDidUpdateRecoveryIdsRequest = {
  wallet_id: int;
  new_list: str[];
  num_verifications_required?: uint64;
};
export type TDidUpdateRecoveryIdsResponse = {
  success: bool;
};
export async function did_update_recovery_ids(agent: TRPCAgent, data: TDidUpdateRecoveryIdsRequest){
  return agent.sendMessage<TDidUpdateRecoveryIdsResponse>(chia_wallet_service, did_update_recovery_ids_command, data);
}




export const did_spend_command = "did_spend";
export type did_spend_command = typeof did_spend_command;
export type TDidSpendRequest = {
  wallet_id: int;
  puzzlehash: bytes32;
};
export type TDidSpendResponse = {
  success: bool;
};
export async function did_spend(agent: TRPCAgent, data: TDidSpendRequest){
  console.warn("did_spend was deprecated at chia-blockchain@1.2.8.");
  return agent.sendMessage<TDidSpendResponse>(chia_wallet_service, did_spend_command, data);
}




export const did_get_pubkey_command = "did_get_pubkey";
export type did_get_pubkey_command = typeof did_get_pubkey_command;
export type TDidGetPubkeyRequest = {
  wallet_id: int;
};
export type TDidGetPubkeyResponse = {
  success: bool;
  pubkey: bytes;
};
export async function did_get_pubkey(agent: TRPCAgent){
  return agent.sendMessage<TDidGetPubkeyResponse>(chia_wallet_service, did_get_pubkey_command);
}




export const did_get_did_command = "did_get_did";
export type did_get_did_command = typeof did_get_did_command;
export type TDidGetDidRequest = {
  wallet_id: int;
};
export type TDidGetDidResponse = {
  success: bool;
  wallet_id: int;
  my_did: str;
  coin_id?: bytes32;
};
export async function did_get_did(agent: TRPCAgent, data: TDidGetDidRequest){
  return agent.sendMessage<TDidGetDidResponse>(chia_wallet_service, did_get_did_command, data);
}




export const did_recovery_spend_command = "did_recovery_spend";
export type did_recovery_spend_command = typeof did_recovery_spend_command;
export type TDidRecoverySpendRequest = {
  wallet_id: int;
  attest_filenames: str[];
  pubkey?: str;
  puzhash?: str;
};
export type TDidRecoverySpendResponse = {
  success: SpendBundle;
};
export async function did_recovery_spend(agent: TRPCAgent, data: TDidRecoverySpendRequest){
  return agent.sendMessage<TDidRecoverySpendResponse>(chia_wallet_service, did_recovery_spend_command, data);
}




export const did_get_recovery_list_command = "did_get_recovery_list";
export type did_get_recovery_list_command = typeof did_get_recovery_list_command;
export type TDidGetRecoveryListRequest = {
  wallet_id: int;
};
export type TDidGetRecoveryListResponse = {
  success: bool;
  wallet_id: int;
  recover_list: str[];
  num_required: uint64;
};
export async function did_get_recovery_list(agent: TRPCAgent, data: TDidGetRecoveryListRequest){
  return agent.sendMessage<TDidGetRecoveryListResponse>(chia_wallet_service, did_get_recovery_list_command, data);
}




export const did_create_attest_command = "did_create_attest";
export type did_create_attest_command = typeof did_create_attest_command;
export type TDidCreateAttestRequest = {
  wallet_id: int;
  coin_name: str;
  puzhash: str;
  filename: str;
};
export type TDidCreateAttestResponse = {
  success: True;
  message_spend_bundle: str;
  info: [str, str, uint64];
} | {
  success: False;
};
export async function did_create_attest(agent: TRPCAgent, data: TDidCreateAttestRequest){
  return agent.sendMessage<TDidCreateAttestResponse>(chia_wallet_service, did_create_attest_command, data);
}



export const did_get_information_needed_for_recovery_command = "did_get_information_needed_for_recovery";
export type did_get_information_needed_for_recovery_command = typeof did_get_information_needed_for_recovery_command;
export type TDidGetInformationNeededForRecoveryRequest = {
  wallet_id: int;
};
export type TDidGetInformationNeededForRecoveryResponse = {
  success: bool;
  wallet_id: int;
  my_did: str;
  coin_name: str;
  newpuzhash: Optional<bytes32>;
  pubkey: Optional<bytes>;
  backup_dids: bytes[];
};
export async function did_get_information_needed_for_recovery(agent: TRPCAgent, data: TDidGetInformationNeededForRecoveryRequest){
  return agent.sendMessage<TDidGetInformationNeededForRecoveryResponse>(chia_wallet_service, did_get_information_needed_for_recovery_command, data);
}




export const did_create_backup_file_command = "did_create_backup_file";
export type did_create_backup_file_command = typeof did_create_backup_file_command;
export type TDidCreateBackupFileRequest = {
  wallet_id: int;
  filename: str;
};
export type TDidCreateBackupFileResponse = {
  wallet_id: int;
  success: bool;
};
export async function did_create_backup_file(agent: TRPCAgent, data: TDidCreateBackupFileRequest){
  return agent.sendMessage<TDidCreateBackupFileResponse>(chia_wallet_service, did_create_backup_file_command, data);
}




// # RL wallet
export const rl_set_user_info_command = "rl_set_user_info";
export type rl_set_user_info_command = typeof rl_set_user_info_command;
export type TRlSetUserInfoRequest = {
  wallet_id: int;
  origin: {
    parent_coin_info: str;
    puzzle_hash: str;
    amount: uint64;
  };
  interval: uint64;
  limit: uint64;
  admin_pubkey: str;
};
export type TRlSetUserInfoResponse = {
};
export async function rl_set_user_info(agent: TRPCAgent, data: TRlSetUserInfoRequest){
  return agent.sendMessage<TRlSetUserInfoResponse>(chia_wallet_service, rl_set_user_info_command, data);
}




export const send_clawback_transaction_command = "send_clawback_transaction:";
export type send_clawback_transaction_command = typeof send_clawback_transaction_command;
export type TSendClawbackTransactionRequest = {
  wallet_id: int;
  fee: int;
};
export type TSendClawbackTransactionResponse = {
  transaction: TransactionRecord;
  transaction_id: TransactionRecord["name"];
};
export async function send_clawback_transaction(agent: TRPCAgent, data: TSendClawbackTransactionRequest){
  return agent.sendMessage<TSendClawbackTransactionResponse>(chia_wallet_service, send_clawback_transaction_command, data);
}




export const add_rate_limited_funds_command = "add_rate_limited_funds:";
export type add_rate_limited_funds_command = typeof add_rate_limited_funds_command;
export type TAddRateLimitedFundsRequest = {
  wallet_id: uint32;
  amount: uint64;
  fee: uint64;
};
export type TAddRateLimitedFundsResponse = {
  status: "SUCCESS";
};
export async function add_rate_limited_funds(agent: TRPCAgent, data: TAddRateLimitedFundsRequest){
  return agent.sendMessage<TAddRateLimitedFundsResponse>(chia_wallet_service, add_rate_limited_funds_command, data);
}




export const pw_join_pool_command = "pw_join_pool";
export type pw_join_pool_command = typeof pw_join_pool_command;
export type TPwJoinPoolRequest = {
  fee?: uint64;
  wallet_id: uint32;
  target_puzzlehash?: string;
  pool_url?: str;
  relative_lock_height: uint32;
};
export type TPwJoinPoolResponse = {
  total_fee: uint64;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
} | {
  success: False;
  error: "not_initialized";
};
export async function pw_join_pool(agent: TRPCAgent, data: TPwJoinPoolRequest){
  return agent.sendMessage<TPwJoinPoolResponse>(chia_wallet_service, pw_join_pool_command, data);
}




export const pw_self_pool_command = "pw_self_pool";
export type pw_self_pool_command = typeof pw_self_pool_command;
export type TPwSelfPoolRequest = {
  wallet_id: uint32;
  fee?: uint64;
};
export type TPwSelfPoolResponse = {
  total_fee: uint64;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
} | {
  success: False;
  error: "not_initialized";
};
export async function pw_self_pool(agent: TRPCAgent, data: TPwSelfPoolRequest){
  return agent.sendMessage<TPwSelfPoolResponse>(chia_wallet_service, pw_self_pool_command, data);
}




export const pw_absorb_rewards_command = "pw_absorb_rewards";
export type pw_absorb_rewards_command = typeof pw_absorb_rewards_command;
export type TPwAbsorbRewardsRequest = {
  wallet_id: uint32;
  fee?: uint64;
  max_spends_in_tx?: int;
};
export type TPwAbsorbRewardsResponse = {
  state: PoolWalletInfo;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
} | {
  success: False;
  error: "not_initialized";
};
export async function pw_absorb_rewards(agent: TRPCAgent, data: TPwAbsorbRewardsRequest){
  return agent.sendMessage<TPwAbsorbRewardsResponse>(chia_wallet_service, pw_absorb_rewards_command, data);
}




export const pw_status_command = "pw_status";
export type pw_status_command = typeof pw_status_command;
export type TPwStatusRequest = {
  wallet_id: uint32;
};
export type TPwStatusResponse = {
  state: PoolWalletInfo;
  unconfirmed_transactions: TransactionRecord[];
} | {
  success: False;
  error: "not_initialized";
};
export async function pw_status(agent: TRPCAgent, data: TPwStatusRequest){
  return agent.sendMessage<TPwStatusResponse>(chia_wallet_service, pw_status_command, data);
}
