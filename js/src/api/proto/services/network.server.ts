// @generated by protobuf-ts 2.9.0 with parameter long_type_bigint,server_generic
// @generated from protobuf file "services/network.proto" (package "ubt.services", syntax proto3)
// tslint:disable
import { RpcInputStream } from "@protobuf-ts/runtime-rpc";
import { ListChainsRequest } from "./network";
import { Chain } from "../models";
import { ChainId } from "../models";
import { ServerCallContext } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service ubt.services.UbtChainService
 */
export interface IUbtChainService<T = ServerCallContext> {
    /**
     * @generated from protobuf rpc: getChain(ubt.ChainId) returns (ubt.Chain);
     */
    getChain(request: ChainId, context: T): Promise<Chain>;
    /**
     * rpc getChainStatus(ChainId) returns (ChainStatus);
     *
     * @generated from protobuf rpc: listChains(ubt.services.ListChainsRequest) returns (stream ubt.Chain);
     */
    listChains(request: ListChainsRequest, responses: RpcInputStream<Chain>, context: T): Promise<void>;
}