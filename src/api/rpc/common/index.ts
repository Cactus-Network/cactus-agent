import {False, str, True, uint16} from "../../cactus/types/_python_types_";
import {TRPCAgent} from "../../../rpc/index";
import {GetMessageType, ResType, TConnectionGeneral} from "../../types";
import {TConnectionFullNode} from "../../ws/full_node/index";
import {TDaemon} from "../../../daemon/index";

export const cactus_common_service = "";
export type cactus_common_service = typeof cactus_common_service;

export const get_connections_command = "get_connections";
export type get_connections_command = typeof get_connections_command;
export type TGetConnectionsRequest = {
  node_type?: str;
};
export type TGetConnectionsResponse = {
  connections: TConnectionGeneral[] | TConnectionFullNode[];
};
export type WsGetConnectionsMessage = GetMessageType<cactus_common_service, get_connections_command, TGetConnectionsResponse>;
export async function get_connections<T extends TRPCAgent|TDaemon>(agent: T, params: TGetConnectionsRequest) {
  type R = ResType<T, TGetConnectionsResponse, WsGetConnectionsMessage>;
  return agent.sendMessage<R>(cactus_common_service, get_connections_command, params);
}


export const open_connection_command = "open_connection";
export type open_connection_command = typeof open_connection_command;
export type TOpenConnectionRequest = {
  host: str;
  port: uint16;
};
export type TOpenConnectionResponse = {
  success: False;
  error: str;
} | {
  success: True;
};
export type WsOpenConnectionMessage = GetMessageType<cactus_common_service, open_connection_command, TOpenConnectionResponse>;
export async function open_connection<T extends TRPCAgent|TDaemon>(agent: T, params: TOpenConnectionRequest) {
  type R = ResType<T, TOpenConnectionResponse, WsOpenConnectionMessage>;
  return agent.sendMessage<R>(cactus_common_service, open_connection_command, params);
}


export const close_connection_command = "close_connection";
export type close_connection_command = typeof close_connection_command;
export type TCloseConnectionRequest = {
  node_id: str;
};
export type TCloseConnectionResponse = {};
export type WsCloseConnectionMessage = GetMessageType<cactus_common_service, close_connection_command, TCloseConnectionResponse>;
export async function close_connection<T extends TRPCAgent|TDaemon>(agent: T, params: TCloseConnectionRequest) {
  type R = ResType<T, TCloseConnectionResponse, WsCloseConnectionMessage>;
  return agent.sendMessage<R>(cactus_common_service, close_connection_command, params);
}


export const stop_node_command = "stop_node";
export type stop_node_command = typeof stop_node_command;
export type TStopNodeResponse = {};
export type WsStopNodeMessage = GetMessageType<cactus_common_service, stop_node_command, TStopNodeResponse>;
export async function stop_node<T extends TRPCAgent|TDaemon>(agent: T) {
  type R = ResType<T, TStopNodeResponse, WsStopNodeMessage>;
  return agent.sendMessage<R>(cactus_common_service, stop_node_command);
}


export const get_routes_command = "get_routes";
export type get_routes_command = typeof get_routes_command;
export type TGetRoutesResponse = {
  success: True;
  routes: str[];
};
export type WsGetRoutesMessage = GetMessageType<cactus_common_service, get_routes_command, TGetRoutesResponse>;
export async function get_routes<T extends TRPCAgent|TDaemon>(agent: T) {
  type R = ResType<T, TGetRoutesResponse, WsGetRoutesMessage>;
  return agent.sendMessage<R>(cactus_common_service, get_routes_command);
}


export const healthz_command = "healthz";
export type healthz_command = typeof healthz_command;
export type THealthzResponse = {
  success: True;
};
export type WsHealthzMessage = GetMessageType<cactus_common_service, healthz_command, THealthzResponse>;
export async function healthz<T extends TRPCAgent|TDaemon>(agent: T) {
  type R = ResType<T, THealthzResponse, WsHealthzMessage>;
  return agent.sendMessage<R>(cactus_common_service, healthz_command);
}

export type RpcCommonMessage =
  TGetConnectionsResponse
  | TOpenConnectionResponse
  | TCloseConnectionResponse
  | TStopNodeResponse
  | TGetRoutesResponse
  | THealthzResponse
;

export type RpcCommonMessageOnWs =
  WsGetConnectionsMessage
  | WsOpenConnectionMessage
  | WsCloseConnectionMessage
  | WsStopNodeMessage
  | WsGetRoutesMessage
  | WsHealthzMessage
;
