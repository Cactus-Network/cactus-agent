import {ProofOfSpace} from "../../chia/types/blockchain_format/proof_of_space";
import {bool, Optional, str, uint16, uint64, uint8} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {TRPCAgent} from "../../../rpc/index";
import {RespondPlots} from "../../chia/protocols/harvester_protocol";
import {PoolState} from "../../chia/farmer/farmer";

export const chia_farmer_service = "chia_farmer";
export type chia_farmer_service = typeof chia_farmer_service;

export const get_signage_point_command = "get_signage_point";
export type get_signage_point_command = typeof get_signage_point_command;
export type TGetSignagePointRequest = {
  sp_hash: str;
};
export type TGetSignagePointResponse = {
  signage_point: {
    challenge_hash: bytes32;
    challenge_chain_sp: bytes32;
    reward_chain_sp: bytes32;
    difficulty: uint64;
    sub_slot_iters: uint64;
    signage_point_index: uint8;
  };
  proofs: [string, ProofOfSpace];
};
export async function get_signage_point(agent: TRPCAgent, params: TGetSignagePointRequest) {
  return agent.sendMessage<TGetSignagePointResponse>(chia_farmer_service, get_signage_point_command, params);
}


export const get_signage_points_command = "get_signage_points";
export type get_signage_points_command = typeof get_signage_points_command;
export type TGetSignagePointsRequest = {
};
export type TGetSignagePointsResponse = {
  signage_points: TGetSignagePointResponse[];
};
export async function get_signage_points(agent: TRPCAgent){
  return agent.sendMessage<TGetSignagePointsResponse>(chia_farmer_service, get_signage_points_command);
}



export const get_reward_targets_command = "get_reward_targets";
export type get_reward_targets_command = typeof get_reward_targets_command;
export type TGetRewardTargetRequest = {
  search_for_private_key: bool;
};
export type TGetRewardTargetResponse = {
  farmer_target: str;
  pool_target: str;
  have_farmer_sk: bool;
  have_pool_sk: bool;
} | {
  farmer_target: str;
  pool_target: str;
};
export async function get_reward_targets(agent: TRPCAgent, params: TGetRewardTargetRequest){
  return agent.sendMessage<TGetRewardTargetResponse>(chia_farmer_service, get_reward_targets_command, params);
}



export const set_reward_targets_command = "set_reward_targets";
export type set_reward_targets_command = typeof set_reward_targets_command;
export type TSetRewardTargetRequest = {
  farmer_target?: str;
  pool_target?: str;
};
export type TSetRewardTargetResponse = {
};
export async function set_reward_targets(agent: TRPCAgent, params: TSetRewardTargetRequest){
  return agent.sendMessage<TSetRewardTargetResponse>(chia_farmer_service, set_reward_targets_command, params);
}



export const get_pool_state_command = "get_pool_state";
export type get_pool_state_command = typeof get_pool_state_command;
export type TGetPoolStateRequest = {
};
export type TGetPoolStateResponse = {
  pool_state: PoolState[];
};
export async function get_pool_state(agent: TRPCAgent){
  return agent.sendMessage<TSetRewardTargetResponse>(chia_farmer_service, get_pool_state_command);
}



export const set_payout_instructions_command = "set_payout_instructions";
export type set_payout_instructions_command = typeof set_payout_instructions_command;
export type TSetPayoutInstructionsRequest = {
  launcher_id: str;
  payout_instructions: str;
};
export type TSetPayoutInstructionsResponse = {
};
export async function set_pool_payout_instructions(agent: TRPCAgent, params: TSetPayoutInstructionsRequest){
  return agent.sendMessage<TSetPayoutInstructionsResponse>(chia_farmer_service, set_payout_instructions_command, params);
}



export type RequestPlotsResponse = {
  type: 68;
  id: Optional<uint16>;
  data: str; //RespondPlots; Serialized as a byte stream.  // See how it is serialized by https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/harvester_protocol.py
};
export const get_plots_command = "get_plots";
export type get_plots_command = typeof get_plots_command;
export type TGetPlotsRequest = {
};
export type TGetPlotsResponse = {
  [peer_host_port: string]: RequestPlotsResponse;
};
export async function get_plots(agent: TRPCAgent){
  return agent.sendMessage<TGetPlotsResponse>(chia_farmer_service, get_plots_command);
}
